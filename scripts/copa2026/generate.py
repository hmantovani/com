"""
Copa 2026 — prediction pipeline.

Run with --moment N to generate the corresponding snapshot:
  1 — Pre-tournament:        all 72 matches simulated
  2 — After Matchday 1:      matchday 1 locked in, rest simulated
  3 — After Matchday 2:      matchdays 1–2 locked in, matchday 3 + KO simulated
  4 — After Group Stage:     all 48 group results locked in, only KO simulated
  5 — After Round of 32:     group + R32 locked in, R16 → Final simulated
  6 — After Round of 16:     group + R32 + R16 locked in, QF → Final simulated
  7 — After Quarter-Finals:  group + R32 + R16 + QF locked in, SF + Final simulated
  8 — After Semi-Finals:     group + R32 + R16 + QF + SF locked in, 3rd place + Final simulated

Model = ensemble of:
  A) Poisson + Elo regression  (full history, time-decayed)        weight 0.40
  B) Poisson GLM, team fixed effects (2010+, time-decayed, neutral) weight 0.60

Outputs (written into ../../src/data/copa2026/):
  teams.json     — per-team Elo, group, iso2, confederation, attack/defense (moment 1 only)
  moment{N}.json — match predictions + standings + KO advancement odds
"""

import argparse
import json
import sys
import warnings
from itertools import groupby
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf
from scipy.stats import poisson

warnings.filterwarnings("ignore")

# ----------------------------------------------------------------------------
# CLI
# ----------------------------------------------------------------------------
parser = argparse.ArgumentParser(description="Copa 2026 prediction pipeline")
parser.add_argument("--moment", type=int, default=1, choices=range(1, 9),
                    help="Which snapshot to produce (1=pre-tournament … 8=post-SF)")
args = parser.parse_args()
MOMENT = args.moment

KNOWN_ROUNDS = {
    1: set(), 2: {1}, 3: {1, 2},
    4: {1, 2, 3}, 5: {1, 2, 3}, 6: {1, 2, 3}, 7: {1, 2, 3}, 8: {1, 2, 3},
}[MOMENT]

KNOWN_KO_ROUNDS = {
    1: set(), 2: set(), 3: set(), 4: set(),
    5: {"R32"}, 6: {"R32", "R16"}, 7: {"R32", "R16", "QF"},
    8: {"R32", "R16", "QF", "SF"},
}[MOMENT]

MOMENT_LABELS = {
    1: "Pre-tournament",      2: "After Matchday 1",
    3: "After Matchday 2",    4: "After Group Stage",
    5: "After Round of 32",   6: "After Round of 16",
    7: "After Quarter-Finals", 8: "After Semi-Finals",
}
MOMENT_PREDICTS = {
    1: "All 72 group-stage matches + full knockout bracket",
    2: "Matchdays 2–3 + full knockout bracket",
    3: "Matchday 3 + full knockout bracket",
    4: "Full knockout bracket",
    5: "Round of 16 → Final",
    6: "Quarter-Finals → Final",
    7: "Semi-Finals + 3rd place + Final",
    8: "3rd place match + Final",
}

print(f"=== Moment {MOMENT}: {MOMENT_LABELS[MOMENT]} ===")

# ----------------------------------------------------------------------------
# Config
# ----------------------------------------------------------------------------
HERE          = Path(__file__).resolve().parent
DATA_PARQUET  = HERE / "matches.parquet"
GROUPS_JSON   = HERE / "groups.json"
KNOCKOUT_JSON = HERE / "knockout.json"
WC_GROUP_CSV  = HERE / "wc_group_stage.csv"
WC_KO_CSV     = HERE / "wc_knockout.csv"
OUT_DIR       = HERE.parent.parent / "src" / "data" / "copa2026"
OUT_DIR.mkdir(parents=True, exist_ok=True)

TRAIN_CUTOFF = "2026-06-11"
REF_DATE     = pd.Timestamp(TRAIN_CUTOFF)

XI_A      = 0.0010
XI_B      = 0.0030
GLM_FROM  = "2010-01-01"
MIN_WEIGHT = 0.01

W_A, W_B  = 0.60, 0.40
MAX_GOALS = 10
N_SIMS    = 20000
RNG       = np.random.default_rng(42)
RHO       = -0.0558

# ----------------------------------------------------------------------------
# Host-nation venue sets (for home-advantage logic in KO rounds)
# ----------------------------------------------------------------------------
HOST_VENUES = {
    "United States": {
        "Inglewood", "Foxborough", "Houston", "East Rutherford", "Arlington",
        "Santa Clara", "Seattle", "Atlanta", "Miami Gardens", "Kansas City",
        "Philadelphia", "Boston",
    },
    "Mexico":  {"Mexico City", "Guadalupe", "Zapopan"},
    "Canada":  {"Toronto", "Vancouver"},
}


def venue_is_home(home_team: str, away_team: str, venue: str) -> float:
    """Return +1 if home_team is a host at this venue, -1 if away_team is, else 0."""
    if venue in HOST_VENUES.get(home_team, set()):
        return 1.0
    if venue in HOST_VENUES.get(away_team, set()):
        return -1.0
    return 0.0


# ----------------------------------------------------------------------------
# Dynamic Elo — World Football Elo rating system (eloratings.net formula)
# ----------------------------------------------------------------------------
K_WORLD_CUP = 60.0


def elo_expected(home_elo: float, away_elo: float, is_home: float) -> float:
    dr = (home_elo - away_elo) + 100.0 * is_home
    return 1.0 / (10.0 ** (-dr / 400.0) + 1.0)


def elo_goal_multiplier(goal_diff: int) -> float:
    gd = abs(goal_diff)
    if gd <= 1:
        return 1.0
    if gd == 2:
        return 1.5
    return (11.0 + gd) / 8.0


def apply_elo_updates(elo: dict, results: list) -> None:
    """Replay real match results chronologically, updating `elo` in place.

    Matches on the same date are batched: every game that day is scored off
    that day's pre-match ratings and the resulting deltas are applied all at
    once afterward, so same-day results can't affect each other — matching
    the eloratings.net convention.

    Each result dict needs: date, home, away, home_goals, away_goals,
    is_home (+1/0/-1 from the home team's perspective), win (1.0/0.5/0.0 —
    the actual W used for the update, which for penalty shoot-outs is the
    shoot-out winner, not the 0.5 implied by the drawn scoreline).
    """
    results = sorted(results, key=lambda r: r["date"])
    for _, day_matches in groupby(results, key=lambda r: r["date"]):
        deltas = {}
        for r in day_matches:
            h, a = r["home"], r["away"]
            we = elo_expected(elo[h], elo[a], r["is_home"])
            g  = elo_goal_multiplier(r["home_goals"] - r["away_goals"])
            delta = K_WORLD_CUP * g * (r["win"] - we)
            deltas[h] = deltas.get(h, 0.0) + delta
            deltas[a] = deltas.get(a, 0.0) - delta
        for t, d in deltas.items():
            elo[t] += d


# ----------------------------------------------------------------------------
# Load config files
# ----------------------------------------------------------------------------
print("Loading data...")
with open(GROUPS_JSON, encoding="utf-8") as f:
    cfg = json.load(f)

GROUPS    = cfg["groups"]
FIXTURES  = cfg["fixtures"]
TEAM_META = cfg["team_meta"]
TEAM_TO_GROUP = {t: g for g, teams in GROUPS.items() for t in teams}
COPA_TEAMS    = list(TEAM_META.keys())

with open(KNOCKOUT_JSON, encoding="utf-8") as f:
    ko_cfg = json.load(f)

KO_R32    = ko_cfg["ro32"]["matches"]
KO_COMBOS = ko_cfg["ro32"]["combinations"]
KO_R16    = ko_cfg["ro16"]["matches"]
KO_QF     = ko_cfg["qf"]["matches"]
KO_SF     = ko_cfg["sf"]["matches"]
KO_FINAL  = next(m for m in ko_cfg["final"]["matches"] if m["id"] == "F_01")
KO_TPM    = next(m for m in ko_cfg["final"]["matches"] if m["id"] == "TPM_01")

# ----------------------------------------------------------------------------
# Load training data
# ----------------------------------------------------------------------------
df = pd.read_parquet(DATA_PARQUET)
df["date"] = pd.to_datetime(df["date"])

train = df[df["date"] < TRAIN_CUTOFF].dropna(
    subset=["home_score", "away_score", "home_elo_pre", "away_elo_pre"]
).copy()
train["home_score"] = train["home_score"].astype(int)
train["away_score"] = train["away_score"].astype(int)
train["days_ago"]   = (REF_DATE - train["date"]).dt.days
train["elo_diff"]   = train["home_elo_pre"] - train["away_elo_pre"]

wc = df[(df["date"] >= TRAIN_CUTOFF) & (df["tournament"] == "FIFA World Cup")].reset_index(drop=True)
print(f"  train: {len(train):,} matches   |   copa fixtures: {len(wc)}")

# Validate group config against fixtures
from collections import defaultdict
_adj = defaultdict(set)
for _, _r in wc.iterrows():
    _adj[_r["home_team"]].add(_r["away_team"])
    _adj[_r["away_team"]].add(_r["home_team"])
_config_groups = {frozenset(teams) for teams in GROUPS.values()}
_seen, _fixture_groups = set(), set()
for _t in _adj:
    if _t in _seen:
        continue
    _stack, _comp = [_t], set()
    while _stack:
        _x = _stack.pop()
        if _x in _seen:
            continue
        _seen.add(_x); _comp.add(_x); _stack.extend(_adj[_x] - _seen)
    _fixture_groups.add(frozenset(_comp))
if _config_groups != _fixture_groups:
    missing = _fixture_groups - _config_groups
    raise SystemExit(
        "groups.json does not match the fixture draw. Offending groups:\n  "
        + "\n  ".join(sorted(", ".join(sorted(g)) for g in missing))
    )
print("  group config validated against fixtures ✓")

# Elo per team from first Copa fixture
elo_now = {}
for t in COPA_TEAMS:
    h = wc[wc["home_team"] == t]["home_elo_pre"]
    a = wc[wc["away_team"] == t]["away_elo_pre"]
    vals = pd.concat([h, a]).dropna()
    elo_now[t] = float(vals.iloc[0]) if len(vals) else 1500.0

# Home-advantage flag per group-stage fixture (from neutral column in parquet)
fixture_is_home = {}
for _, row in wc.iterrows():
    fixture_is_home[(row["home_team"], row["away_team"])] = 1.0 - float(row["neutral"])

# Round number per fixture
fixture_round = {}
for g, rounds in FIXTURES.items():
    for rnd_num, rnd_key in [(1, "r1"), (2, "r2"), (3, "r3")]:
        for home, away in rounds[rnd_key]:
            fixture_round[(home, away)] = rnd_num

# ----------------------------------------------------------------------------
# Load real group-stage results (moments 2-7)
# ----------------------------------------------------------------------------
known_scores = {}
known_group_results = []
if KNOWN_ROUNDS:
    if not WC_GROUP_CSV.exists():
        raise SystemExit(f"Real-results file not found: {WC_GROUP_CSV}")
    gs_df = pd.read_csv(WC_GROUP_CSV, encoding="utf-8")
    gs_df["date"] = pd.to_datetime(gs_df["date"])
    for _, row in gs_df.iterrows():
        h, a = row["home_team"], row["away_team"]
        rnd = fixture_round.get((h, a))
        if rnd is None or rnd not in KNOWN_ROUNDS:
            continue
        if pd.notna(row["home_score"]) and pd.notna(row["away_score"]):
            hg, ag = int(row["home_score"]), int(row["away_score"])
            known_scores[(h, a)] = (hg, ag)
            known_group_results.append({
                "date": row["date"], "home": h, "away": a,
                "home_goals": hg, "away_goals": ag,
                "is_home": 1.0 - float(row["neutral"]),
                "win": 1.0 if hg > ag else (0.0 if hg < ag else 0.5),
            })
    print(f"  real group results loaded: {len(known_scores)} matches (rounds {sorted(KNOWN_ROUNDS)})")

# ----------------------------------------------------------------------------
# Load real KO results (moments 5-7)
# ----------------------------------------------------------------------------
ko_result_override = {}   # match_id -> winning team name
ko_actual_detail   = {}   # match_id -> score/duration detail for display
known_ko_results = []
if KNOWN_KO_ROUNDS:
    if not WC_KO_CSV.exists():
        raise SystemExit(f"KO results file not found: {WC_KO_CSV}")
    ko_df = pd.read_csv(WC_KO_CSV, encoding="utf-8-sig")
    ko_df["date"] = pd.to_datetime(ko_df["date"])
    for _, row in ko_df.iterrows():
        if row["round"] not in KNOWN_KO_ROUNDS:
            continue
        if pd.isna(row["home_score"]) or pd.isna(row["away_score"]):
            continue
        hg, ag   = int(row["home_score"]), int(row["away_score"])
        duration = str(row.get("duration", "FT")).strip()
        if duration == "AP":
            # Penalty shoot-outs: the drawn scoreline stands for the goal-diff
            # multiplier (weight index 1), but the shoot-out winner gets W=1
            # (not the 0.5 a real draw would give) — eloratings.net convention.
            hp, ap    = int(row["home_pens"]), int(row["away_pens"])
            winner    = row["home_team"] if hp > ap else row["away_team"]
            win_value = 1.0 if hp > ap else 0.0
        else:
            winner    = row["home_team"] if hg > ag else row["away_team"]
            win_value = 1.0 if hg > ag else (0.0 if hg < ag else 0.5)
        ko_result_override[row["match_id"]] = winner
        ko_actual_detail[row["match_id"]] = {
            "home_score": hg, "away_score": ag, "duration": duration,
            "home_pens": (int(row["home_pens"]) if duration == "AP" else None),
            "away_pens": (int(row["away_pens"]) if duration == "AP" else None),
        }
        known_ko_results.append({
            "date": row["date"], "home": row["home_team"], "away": row["away_team"],
            "home_goals": hg, "away_goals": ag,
            "is_home": 1.0 - float(row["neutral"]),
            "win": win_value,
        })
    print(f"  real KO results loaded: {len(ko_result_override)} matches (rounds {KNOWN_KO_ROUNDS})")

# ----------------------------------------------------------------------------
# Replay real Copa 2026 results through the Elo formula (chronological,
# same-day batched) so every prediction from here on uses ratings updated
# with what has actually happened in the tournament so far.
# ----------------------------------------------------------------------------
_known_results = known_group_results + known_ko_results
if _known_results:
    apply_elo_updates(elo_now, _known_results)
    print(f"  dynamic Elo: replayed {len(_known_results)} real results "
          f"({len(known_group_results)} group + {len(known_ko_results)} KO)")

# ----------------------------------------------------------------------------
# Model A — Poisson + Elo regression
# ----------------------------------------------------------------------------
print("Fitting Model A (Poisson + Elo)...")
train["w_a"] = np.exp(-XI_A * train["days_ago"])

a_home = pd.DataFrame({
    "goals":    train["home_score"],
    "elo_diff": train["elo_diff"],
    "is_home":  1.0 - train["neutral"].astype(float),
    "w":        train["w_a"],
})
a_away = pd.DataFrame({
    "goals":    train["away_score"],
    "elo_diff": -train["elo_diff"],
    "is_home":  -(1.0 - train["neutral"].astype(float)),
    "w":        train["w_a"],
})
a_long = pd.concat([a_home, a_away], ignore_index=True)
a_long = a_long[np.isfinite(a_long["w"]) & (a_long["w"] > 0)]

model_a = smf.glm(
    "goals ~ elo_diff + is_home", data=a_long,
    family=sm.families.Poisson(), freq_weights=a_long["w"],
).fit()
A_INT = model_a.params["Intercept"]
A_ELO = model_a.params["elo_diff"]
A_HOME = model_a.params["is_home"]
print(f"  intercept={A_INT:.3f}  elo={A_ELO:.5f}  home={A_HOME:.3f}")


def lambda_a(elo_diff, is_home):
    return np.exp(A_INT + A_ELO * elo_diff + A_HOME * is_home)


# ----------------------------------------------------------------------------
# Model B — Poisson GLM with team fixed effects (2010+)
# ----------------------------------------------------------------------------
print("Fitting Model B (GLM team fixed effects)...")
glm_train = train[train["date"] >= GLM_FROM].copy()
glm_train["w_b"] = np.exp(-XI_B * glm_train["days_ago"])
glm_train = glm_train[glm_train["w_b"] >= MIN_WEIGHT].copy()

b_home = pd.DataFrame({
    "goals":   glm_train["home_score"],
    "attack":  glm_train["home_team"],
    "defense": glm_train["away_team"],
    "is_home": 1.0 - glm_train["neutral"].astype(float),
    "w":       glm_train["w_b"],
})
b_away = pd.DataFrame({
    "goals":   glm_train["away_score"],
    "attack":  glm_train["away_team"],
    "defense": glm_train["home_team"],
    "is_home": 0.0,
    "w":       glm_train["w_b"],
})
b_long = pd.concat([b_home, b_away], ignore_index=True)
b_long = b_long[np.isfinite(b_long["w"]) & (b_long["w"] > 0)].copy()

all_teams = sorted(set(b_long["attack"]) | set(b_long["defense"]))
ref_team  = "France" if "France" in all_teams else all_teams[0]
b_long["attack"]  = pd.Categorical(b_long["attack"],  categories=[ref_team] + [t for t in all_teams if t != ref_team])
b_long["defense"] = pd.Categorical(b_long["defense"], categories=[ref_team] + [t for t in all_teams if t != ref_team])

model_b = smf.glm(
    "goals ~ C(attack) + C(defense) + is_home", data=b_long,
    family=sm.families.Poisson(), freq_weights=b_long["w"].values,
).fit()
B_INT  = model_b.params["Intercept"]
B_HOME = model_b.params["is_home"]


def _coef(prefix, team):
    return model_b.params.get(f"C({prefix})[T.{team}]", 0.0)


attack_b  = {t: _coef("attack",  t) for t in COPA_TEAMS}
defense_b = {t: _coef("defense", t) for t in COPA_TEAMS}


def lambda_b(scorer, conceder, is_home):
    return np.exp(B_INT + attack_b.get(scorer, 0.0) + defense_b.get(conceder, 0.0) + B_HOME * is_home)


# ----------------------------------------------------------------------------
# Scoreline matrix + ensemble
# ----------------------------------------------------------------------------
def dc_tau(i, j, lh, la, rho):
    if i == 0 and j == 0: return 1 - lh * la * rho
    if i == 0 and j == 1: return 1 + lh * rho
    if i == 1 and j == 0: return 1 + la * rho
    if i == 1 and j == 1: return 1 - rho
    return 1.0


def score_matrix(lh, la):
    h = poisson.pmf(np.arange(MAX_GOALS + 1), lh)
    a = poisson.pmf(np.arange(MAX_GOALS + 1), la)
    mat = np.outer(h, a)
    for i in range(2):
        for j in range(2):
            mat[i, j] *= dc_tau(i, j, lh, la, RHO)
    return mat / mat.sum()


def predict_match(home, away, is_home=0.0):
    """Ensemble scoreline matrix.
    is_home = +1.0  → home team is a host nation at their home venue
    is_home =  0.0  → neutral venue
    is_home = -1.0  → away team is a host nation at their home venue
    Model A: symmetric home effect (±A_HOME).
    Model B: home boost only for the team that is actually at home.
    """
    ed = elo_now[home] - elo_now[away]
    # Model A: symmetric
    lh_a = lambda_a(ed,  is_home)
    la_a = lambda_a(-ed, -is_home)
    # Model B: only the "home nation" team gets the boost
    lh_b = lambda_b(home, away, max(is_home,  0.0))
    la_b = lambda_b(away, home, max(-is_home, 0.0))
    mat_a = score_matrix(lh_a, la_a)
    mat_b = score_matrix(lh_b, la_b)
    return W_A * mat_a + W_B * mat_b


def outcome_probs(mat):
    home = np.tril(mat, -1).sum()
    draw = np.trace(mat)
    away = np.triu(mat, 1).sum()
    return float(home), float(draw), float(away)


def top_scorelines(mat, n=5):
    idx = np.dstack(np.unravel_index(np.argsort(mat.ravel())[::-1], mat.shape))[0]
    return [{"score": f"{h}-{a}", "prob": round(float(mat[h, a]), 4)} for h, a in idx[:n]]


def over_under(mat, line=2.5):
    over = sum(mat[i, j] for i in range(mat.shape[0]) for j in range(mat.shape[1]) if i + j > line)
    return float(over), float(1 - over)


GRID_N = 6  # exported scoreline grid covers 0..5 goals per side


def score_grid(mat, n=GRID_N):
    """Top-left n x n block of the scoreline matrix (rows = home goals,
    cols = away goals), rounded for compact JSON."""
    return [[round(float(mat[i, j]), 4) for j in range(n)] for i in range(n)]


def match_pred(mat, home, away):
    """Full prediction block for one match from its scoreline matrix."""
    ph, pdr, pa       = outcome_probs(mat)
    ou_over, ou_under = over_under(mat)
    by, bn            = btts(mat)
    return {
        "home_elo": round(elo_now[home]), "away_elo": round(elo_now[away]),
        "p_home": round(ph, 4), "p_draw": round(pdr, 4), "p_away": round(pa, 4),
        # knockout tie-break rule used by the simulation: draws are a coin flip
        "p_adv_home": round(ph + 0.5 * pdr, 4),
        "top_scores": top_scorelines(mat),
        "over25": round(ou_over, 4), "under25": round(ou_under, 4),
        "btts_yes": round(by, 4), "btts_no": round(bn, 4),
        "exp_home_goals": round(float((mat.sum(axis=1) * np.arange(MAX_GOALS + 1)).sum()), 2),
        "exp_away_goals": round(float((mat.sum(axis=0) * np.arange(MAX_GOALS + 1)).sum()), 2),
        "grid": score_grid(mat),
    }


def btts(mat):
    yes = mat[1:, 1:].sum()
    return float(yes), float(1 - yes)


# ----------------------------------------------------------------------------
# Predict all 72 group-stage matches (model always runs; real scores attached)
# ----------------------------------------------------------------------------
print("Predicting 72 group-stage matches...")

fixture_dates = {}
for _, row in wc.iterrows():
    fixture_dates[(row["home_team"], row["away_team"])] = row["date"].strftime("%Y-%m-%d")

matches        = []
match_matrices = {}

for g, rounds in FIXTURES.items():
    for rnd_key, rnd_num in [("r1", 1), ("r2", 2), ("r3", 3)]:
        for home, away in rounds[rnd_key]:
            ih  = fixture_is_home.get((home, away), 0.0)
            mat = predict_match(home, away, is_home=ih)
            match_matrices[(home, away)] = mat
            ph, pdr, pa       = outcome_probs(mat)
            ou_over, ou_under = over_under(mat)
            by, bn            = btts(mat)
            date_str = fixture_dates.get((home, away), fixture_dates.get((away, home), ""))
            entry = {
                "round": rnd_num, "group": g, "date": date_str,
                "home": home, "away": away,
                "home_iso": TEAM_META[home]["iso2"], "away_iso": TEAM_META[away]["iso2"],
                "home_elo": round(elo_now[home]),    "away_elo": round(elo_now[away]),
                "p_home": round(ph, 4), "p_draw": round(pdr, 4), "p_away": round(pa, 4),
                "top_scores": top_scorelines(mat),
                "over25": round(ou_over, 4), "under25": round(ou_under, 4),
                "btts_yes": round(by, 4),    "btts_no":  round(bn, 4),
                "exp_home_goals": round(float((mat.sum(axis=1) * np.arange(MAX_GOALS + 1)).sum()), 2),
                "exp_away_goals": round(float((mat.sum(axis=0) * np.arange(MAX_GOALS + 1)).sum()), 2),
                "grid": score_grid(mat),
            }
            if (home, away) in known_scores:
                hg, ag = known_scores[(home, away)]
                entry["actual_home"] = hg
                entry["actual_away"] = ag
            matches.append(entry)

# ----------------------------------------------------------------------------
# Precompute KO scoreline matrices — neutral venue for all pairs (C(48,2)=1128)
# Home-advantage matches are handled on-the-fly in sim_ko_winner.
# ----------------------------------------------------------------------------
print("Precomputing knockout scoreline matrices...")
ko_flat = {}
for i, t1 in enumerate(COPA_TEAMS):
    for t2 in COPA_TEAMS[i + 1:]:
        mat = predict_match(t1, t2)          # neutral
        p1  = mat.ravel(); p1 = p1 / p1.sum()
        ko_flat[(t1, t2)] = (p1, mat.shape[1])
        p2  = mat.T.ravel(); p2 = p2 / p2.sum()
        ko_flat[(t2, t1)] = (p2, mat.shape[1])


def sim_ko_winner(home, away, venue=""):
    """Simulate a KO match, respecting host-nation home advantage.
    Falls back to precomputed neutral matrix when venue is neutral.
    Computes on-the-fly for host-nation home matches (≤10 per sim).
    Ties → 50-50 coin flip (penalty shootout approximation).
    """
    ih = venue_is_home(home, away, venue)
    if ih == 0.0:
        p, ncols = ko_flat[(home, away)]
    else:
        mat  = predict_match(home, away, is_home=ih)
        p    = mat.ravel(); p = p / p.sum()
        ncols = mat.shape[1]
    idx = int(RNG.choice(len(p), p=p))
    hg, ag = divmod(idx, ncols)
    if hg > ag:   return home
    elif ag > hg: return away
    else:         return home if RNG.random() < 0.5 else away


def most_likely_ko_winner(home, away, venue=""):
    """Deterministic counterpart to sim_ko_winner: picks the side with the
    higher win probability instead of sampling (draws split 50/50, as a
    penalty shoot-out would be a coin flip on aggregate)."""
    ih = venue_is_home(home, away, venue)
    if ih == 0.0:
        p, ncols = ko_flat[(home, away)]
    else:
        mat  = predict_match(home, away, is_home=ih)
        p    = mat.ravel(); p = p / p.sum()
        ncols = mat.shape[1]
    mat2 = p.reshape(-1, ncols)
    p_home = np.tril(mat2, -1).sum() + 0.5 * np.trace(mat2)
    return home if p_home >= 0.5 else away


def resolve_slot(slot_def, winner_of, runner_up_of, third_slot_assign):
    t = slot_def["type"]
    if t == "winner":    return winner_of[slot_def["group"]]
    if t == "runner_up": return runner_up_of[slot_def["group"]]
    return third_slot_assign[slot_def["slot"]]   # third


# ----------------------------------------------------------------------------
# Monte Carlo setup — pre-sample group-stage draws
# ----------------------------------------------------------------------------
print(f"Running Monte Carlo ({N_SIMS:,} sims)...")

fixture_list   = list(match_matrices.keys())
flat           = {}
for (h, a), mat in match_matrices.items():
    p = mat.ravel(); p = p / p.sum()
    flat[(h, a)] = (p, mat.shape[1])

group_fixtures = {g: [] for g in GROUPS}
for (h, a) in fixture_list:
    group_fixtures[TEAM_TO_GROUP[h]].append((h, a))

draws = {}
for (h, a), (p, ncols) in flat.items():
    if (h, a) in known_scores:
        hg, ag = known_scores[(h, a)]
        draws[(h, a)] = (np.full(N_SIMS, hg, dtype=int), np.full(N_SIMS, ag, dtype=int))
    else:
        idx = RNG.choice(len(p), size=N_SIMS, p=p)
        draws[(h, a)] = (idx // ncols, idx % ncols)

# ----------------------------------------------------------------------------
# Accumulators
# ----------------------------------------------------------------------------
adv_top2    = {t: 0 for t in COPA_TEAMS}
adv_third   = {t: 0 for t in COPA_TEAMS}
win_group   = {t: 0 for t in COPA_TEAMS}
pts_sum     = {t: 0.0 for t in COPA_TEAMS}
gd_sum      = {t: 0.0 for t in COPA_TEAMS}
gf_sum      = {t: 0.0 for t in COPA_TEAMS}
rank_counts = {t: [0, 0, 0, 0] for t in COPA_TEAMS}
qualify     = {t: 0 for t in COPA_TEAMS}
ro16_reach  = {t: 0 for t in COPA_TEAMS}
qf_reach    = {t: 0 for t in COPA_TEAMS}
sf_reach    = {t: 0 for t in COPA_TEAMS}
final_reach = {t: 0 for t in COPA_TEAMS}
champion    = {t: 0 for t in COPA_TEAMS}
r32_slot_counts = {m["id"]: {"home": {}, "away": {}} for m in KO_R32}

# ----------------------------------------------------------------------------
# Moments 5-7: compute real group standings once, set accumulators
# ----------------------------------------------------------------------------
real_winner_of     = {}
real_runner_up_of  = {}
real_third_of      = {}
real_third_slot_assign = {}
real_r32_teams     = {}

if MOMENT >= 5:
    print("  Setting deterministic group stage results...")
    real_third_place_rows = []

    for g, fixtures in group_fixtures.items():
        tbl = {t: {"pts": 0, "gf": 0, "ga": 0} for t in GROUPS[g]}
        for (h, a) in fixtures:
            hg, ag = known_scores[(h, a)]
            tbl[h]["gf"] += hg; tbl[h]["ga"] += ag
            tbl[a]["gf"] += ag; tbl[a]["ga"] += hg
            if hg > ag:   tbl[h]["pts"] += 3
            elif ag > hg: tbl[a]["pts"] += 3
            else:         tbl[h]["pts"] += 1; tbl[a]["pts"] += 1

        ranked = sorted(
            GROUPS[g],
            key=lambda t: (tbl[t]["pts"], tbl[t]["gf"] - tbl[t]["ga"], tbl[t]["gf"]),
            reverse=True,
        )
        for pos, t in enumerate(ranked):
            rank_counts[t][pos] = N_SIMS
            pts_sum[t] = tbl[t]["pts"] * N_SIMS
            gd_sum[t]  = (tbl[t]["gf"] - tbl[t]["ga"]) * N_SIMS
            gf_sum[t]  = tbl[t]["gf"] * N_SIMS

        real_winner_of[g]    = ranked[0]
        real_runner_up_of[g] = ranked[1]
        real_third_of[g]     = ranked[2]
        win_group[ranked[0]] = N_SIMS
        adv_top2[ranked[0]] = N_SIMS
        adv_top2[ranked[1]] = N_SIMS
        adv_third[ranked[2]] = N_SIMS
        qualify[ranked[0]]  = N_SIMS
        qualify[ranked[1]]  = N_SIMS
        t3 = ranked[2]
        real_third_place_rows.append((
            g, t3, tbl[t3]["pts"],
            tbl[t3]["gf"] - tbl[t3]["ga"],
            tbl[t3]["gf"],
        ))

    real_third_place_rows.sort(key=lambda x: (x[2], x[3], x[4]), reverse=True)
    for entry in real_third_place_rows[:8]:
        qualify[entry[1]] = N_SIMS

    adv_real_groups        = sorted(e[0] for e in real_third_place_rows[:8])
    real_combo_key         = "".join(adv_real_groups)
    real_slot_grps         = KO_COMBOS.get(real_combo_key, {})
    real_third_slot_assign = {slot: real_third_of[g] for slot, g in real_slot_grps.items()}

    for m in KO_R32:
        h = resolve_slot(m["home"], real_winner_of, real_runner_up_of, real_third_slot_assign)
        a = resolve_slot(m["away"], real_winner_of, real_runner_up_of, real_third_slot_assign)
        real_r32_teams[m["id"]] = (h, a)

    print(f"  group stage standings set ✓  (advancing thirds from: {adv_real_groups})")

# ----------------------------------------------------------------------------
# Monte Carlo loop
# ----------------------------------------------------------------------------
for s in range(N_SIMS):

    # ── Group stage ──────────────────────────────────────────────────────────
    if MOMENT >= 5:
        winner_of         = real_winner_of
        runner_up_of      = real_runner_up_of
        third_of          = real_third_of
        third_slot_assign = real_third_slot_assign
        r32_teams         = real_r32_teams
    else:
        third_place  = []
        winner_of    = {}
        runner_up_of = {}
        third_of     = {}

        for g, fixtures in group_fixtures.items():
            tbl = {t: {"pts": 0, "gf": 0, "ga": 0} for t in GROUPS[g]}
            for (h, a) in fixtures:
                hg = int(draws[(h, a)][0][s])
                ag = int(draws[(h, a)][1][s])
                tbl[h]["gf"] += hg; tbl[h]["ga"] += ag
                tbl[a]["gf"] += ag; tbl[a]["ga"] += hg
                if hg > ag:   tbl[h]["pts"] += 3
                elif ag > hg: tbl[a]["pts"] += 3
                else:         tbl[h]["pts"] += 1; tbl[a]["pts"] += 1
            ranked = sorted(
                GROUPS[g],
                key=lambda t: (tbl[t]["pts"], tbl[t]["gf"] - tbl[t]["ga"], tbl[t]["gf"], RNG.random()),
                reverse=True,
            )
            for pos, t in enumerate(ranked):
                rank_counts[t][pos] += 1
                pts_sum[t] += tbl[t]["pts"]
                gd_sum[t]  += tbl[t]["gf"] - tbl[t]["ga"]
                gf_sum[t]  += tbl[t]["gf"]
            winner_of[g]    = ranked[0]
            runner_up_of[g] = ranked[1]
            third_of[g]     = ranked[2]
            win_group[ranked[0]] += 1
            adv_top2[ranked[0]] += 1
            adv_top2[ranked[1]] += 1
            adv_third[ranked[2]] += 1
            qualify[ranked[0]] += 1
            qualify[ranked[1]] += 1
            third_place.append((g, ranked[2], tbl[ranked[2]]["pts"],
                                tbl[ranked[2]]["gf"] - tbl[ranked[2]]["ga"],
                                tbl[ranked[2]]["gf"]))

        third_place.sort(key=lambda x: (x[2], x[3], x[4], RNG.random()), reverse=True)
        for entry in third_place[:8]:
            qualify[entry[1]] += 1

        advancing_groups  = sorted(e[0] for e in third_place[:8])
        combo_key         = "".join(advancing_groups)
        slot_groups       = KO_COMBOS.get(combo_key, {})
        third_slot_assign = {slot: third_of[g] for slot, g in slot_groups.items()}

        r32_teams = {}
        for m in KO_R32:
            mid = m["id"]
            h = resolve_slot(m["home"], winner_of, runner_up_of, third_slot_assign)
            a = resolve_slot(m["away"], winner_of, runner_up_of, third_slot_assign)
            r32_teams[mid] = (h, a)

    # ── R32 ──────────────────────────────────────────────────────────────────
    r32_winners = {}
    for m in KO_R32:
        mid  = m["id"]
        h, a = r32_teams[mid]
        r32_slot_counts[mid]["home"][h] = r32_slot_counts[mid]["home"].get(h, 0) + 1
        r32_slot_counts[mid]["away"][a] = r32_slot_counts[mid]["away"].get(a, 0) + 1
        w = ko_result_override.get(mid) or sim_ko_winner(h, a, m["venue"])
        r32_winners[mid] = w
        ro16_reach[w] += 1

    # ── R16 ──────────────────────────────────────────────────────────────────
    r16_winners = {}
    for m in KO_R16:
        h = r32_winners[m["home_from"]]
        a = r32_winners[m["away_from"]]
        w = ko_result_override.get(m["id"]) or sim_ko_winner(h, a, m["venue"])
        r16_winners[m["id"]] = w
        qf_reach[w] += 1

    # ── QF ───────────────────────────────────────────────────────────────────
    qf_winners = {}
    for m in KO_QF:
        h = r16_winners[m["home_from"]]
        a = r16_winners[m["away_from"]]
        w = ko_result_override.get(m["id"]) or sim_ko_winner(h, a, m["venue"])
        qf_winners[m["id"]] = w
        sf_reach[w] += 1

    # ── SF ───────────────────────────────────────────────────────────────────
    sf_winners = {}
    sf_losers  = {}
    for m in KO_SF:
        h = qf_winners[m["home_from"]]
        a = qf_winners[m["away_from"]]
        w = ko_result_override.get(m["id"]) or sim_ko_winner(h, a, m["venue"])
        sf_winners[m["id"]] = w
        sf_losers[m["id"]]  = a if w == h else h
        final_reach[w] += 1

    # ── Final ─────────────────────────────────────────────────────────────────
    h = sf_winners[KO_FINAL["home_from"]]
    a = sf_winners[KO_FINAL["away_from"]]
    champion[sim_ko_winner(h, a, KO_FINAL["venue"])] += 1

# ----------------------------------------------------------------------------
# Assemble outputs
# ----------------------------------------------------------------------------
def pct(n):
    return round(100.0 * n / N_SIMS, 1)


ko_probs = {
    t: {
        "p_ro32":     pct(qualify[t]),
        "p_ro16":     pct(ro16_reach[t]),
        "p_qf":       pct(qf_reach[t]),
        "p_sf":       pct(sf_reach[t]),
        "p_final":    pct(final_reach[t]),
        "p_champion": pct(champion[t]),
    }
    for t in COPA_TEAMS
}

r32_bracket = []
for m in KO_R32:
    mid = m["id"]
    def top_cands(counts, n=3):
        return [
            {"team": t, "iso2": TEAM_META[t]["iso2"], "prob": pct(c)}
            for t, c in sorted(counts.items(), key=lambda x: -x[1])[:n]
        ]
    r32_bracket.append({
        "id": mid, "date": m["date"], "venue": m["venue"],
        "home_slot": m["home"], "away_slot": m["away"],
        "home_candidates": top_cands(r32_slot_counts[mid]["home"]),
        "away_candidates": top_cands(r32_slot_counts[mid]["away"]),
    })

standings = {}
for g in GROUPS:
    rows = []
    for t in GROUPS[g]:
        rows.append({
            "team": t, "iso2": TEAM_META[t]["iso2"],
            "confederation": TEAM_META[t]["confederation"],
            "elo": round(elo_now[t]),
            "exp_pts": round(pts_sum[t] / N_SIMS, 2),
            "exp_gd":  round(gd_sum[t]  / N_SIMS, 2),
            "exp_gf":  round(gf_sum[t]  / N_SIMS, 2),
            "p_win_group": pct(win_group[t]),
            "p_top2":      pct(adv_top2[t]),
            "p_qualify":   pct(qualify[t]),
            "p_finish":    [pct(rank_counts[t][i]) for i in range(4)],
        })
    rows.sort(key=lambda r: (r["p_qualify"], r["exp_pts"], r["exp_gd"]), reverse=True)
    for i, r in enumerate(rows):
        r["proj_pos"] = i + 1
    standings[g] = rows

# ----------------------------------------------------------------------------
# Full bracket — actual results where already played, most-likely pick
# (single coherent path, not marginal probabilities) for everything after.
# ----------------------------------------------------------------------------
print("Building full bracket (actual + most-likely)...")


def resolve_bracket_group_stage():
    """(winner_of, runner_up_of, third_of, third_slot_assign) seeding the R32.
    Uses the real table once the group stage is finished (moment 4+);
    otherwise the most-likely (aggregate projection) outcome from `standings`.
    """
    winner_of, runner_up_of, third_of = {}, {}, {}
    third_rows = []
    if len(KNOWN_ROUNDS) == 3:
        for g, fixtures in group_fixtures.items():
            tbl = {t: {"pts": 0, "gf": 0, "ga": 0} for t in GROUPS[g]}
            for (h, a) in fixtures:
                hg, ag = known_scores[(h, a)]
                tbl[h]["gf"] += hg; tbl[h]["ga"] += ag
                tbl[a]["gf"] += ag; tbl[a]["ga"] += hg
                if hg > ag:   tbl[h]["pts"] += 3
                elif ag > hg: tbl[a]["pts"] += 3
                else:         tbl[h]["pts"] += 1; tbl[a]["pts"] += 1
            ranked = sorted(GROUPS[g],
                             key=lambda t: (tbl[t]["pts"], tbl[t]["gf"] - tbl[t]["ga"], tbl[t]["gf"]),
                             reverse=True)
            winner_of[g], runner_up_of[g], third_of[g] = ranked[0], ranked[1], ranked[2]
            t3 = ranked[2]
            third_rows.append((g, t3, tbl[t3]["pts"], tbl[t3]["gf"] - tbl[t3]["ga"], tbl[t3]["gf"]))
    else:
        for g in GROUPS:
            rows = sorted(standings[g], key=lambda r: r["proj_pos"])
            winner_of[g], runner_up_of[g] = rows[0]["team"], rows[1]["team"]
            t3row = rows[2]
            third_of[g] = t3row["team"]
            third_rows.append((g, t3row["team"], t3row["exp_pts"], t3row["exp_gd"], t3row["exp_gf"]))

    third_rows.sort(key=lambda x: (x[2], x[3], x[4]), reverse=True)
    adv_groups = sorted(e[0] for e in third_rows[:8])
    combo = KO_COMBOS.get("".join(adv_groups), {})
    third_slot_assign = {slot: third_of[g] for slot, g in combo.items()}
    return winner_of, runner_up_of, third_of, third_slot_assign


_bw, _bru, _bt, _bslots = resolve_bracket_group_stage()
bracket_r32_teams = {}
for m in KO_R32:
    bracket_r32_teams[m["id"]] = (
        resolve_slot(m["home"], _bw, _bru, _bslots),
        resolve_slot(m["away"], _bw, _bru, _bslots),
    )

bracket_winners = {}
bracket_losers  = {}


def resolve_bracket_from(ref):
    """Resolve a home_from/away_from reference: either a match id (winner)
    or '<match id>_loser' (the team knocked out of that match)."""
    if ref.endswith("_loser"):
        return bracket_losers[ref[:-len("_loser")]]
    return bracket_winners[ref]


def bracket_match(mid, home, away, venue, date, round_label):
    actual = ko_result_override.get(mid)
    if actual is not None:
        winner, status = actual, "actual"
    else:
        winner, status = most_likely_ko_winner(home, away, venue), "projected"
    bracket_winners[mid] = winner
    bracket_losers[mid]  = away if winner == home else home
    entry = {
        "id": mid, "round": round_label, "date": date, "venue": venue,
        "home": home, "away": away,
        "home_iso": TEAM_META[home]["iso2"], "away_iso": TEAM_META[away]["iso2"],
        "winner": winner, "winner_iso": TEAM_META[winner]["iso2"],
        "status": status,
    }
    if status == "actual":
        entry.update(ko_actual_detail.get(mid, {}))
    # Model prediction for this tie with the ratings in force at this moment
    # (host-nation venue advantage included, same rule the simulation uses).
    entry["pred"] = match_pred(predict_match(home, away, is_home=venue_is_home(home, away, venue)), home, away)
    return entry


bracket = {
    "r32": [bracket_match(m["id"], *bracket_r32_teams[m["id"]], m["venue"], m["date"], "R32") for m in KO_R32],
}
bracket["r16"] = [
    bracket_match(m["id"], resolve_bracket_from(m["home_from"]), resolve_bracket_from(m["away_from"]),
                  m["venue"], m["date"], "R16")
    for m in KO_R16
]
bracket["qf"] = [
    bracket_match(m["id"], resolve_bracket_from(m["home_from"]), resolve_bracket_from(m["away_from"]),
                  m["venue"], m["date"], "QF")
    for m in KO_QF
]
bracket["sf"] = [
    bracket_match(m["id"], resolve_bracket_from(m["home_from"]), resolve_bracket_from(m["away_from"]),
                  m["venue"], m["date"], "SF")
    for m in KO_SF
]
bracket["third_place"] = [
    bracket_match(KO_TPM["id"], resolve_bracket_from(KO_TPM["home_from"]), resolve_bracket_from(KO_TPM["away_from"]),
                  KO_TPM["venue"], KO_TPM["date"], "3rd")
]
bracket["final"] = [
    bracket_match(KO_FINAL["id"], resolve_bracket_from(KO_FINAL["home_from"]), resolve_bracket_from(KO_FINAL["away_from"]),
                  KO_FINAL["venue"], KO_FINAL["date"], "F")
]
print(f"  most-likely champion: {bracket['final'][0]['winner']}")

# ----------------------------------------------------------------------------
# Export
# ----------------------------------------------------------------------------
print("Writing JSON...")

if MOMENT == 1:
    teams_out = []
    for t in COPA_TEAMS:
        teams_out.append({
            "team": t, "iso2": TEAM_META[t]["iso2"],
            "group": TEAM_TO_GROUP[t],
            "confederation": TEAM_META[t]["confederation"],
            "pot":     TEAM_META[t]["pot"],
            "elo":     round(elo_now[t]),
            "attack":  round(attack_b.get(t, 0.0), 3),
            "defense": round(defense_b.get(t, 0.0), 3),
        })
    teams_out.sort(key=lambda x: x["elo"], reverse=True)
    for i, t in enumerate(teams_out):
        t["elo_rank"] = i + 1
    with open(OUT_DIR / "teams.json", "w", encoding="utf-8") as f:
        json.dump({"generated_from_train_cutoff": TRAIN_CUTOFF,
                   "teams": teams_out, "groups": GROUPS},
                  f, ensure_ascii=False, indent=2)
    print(f"  wrote {OUT_DIR / 'teams.json'}")

out_file   = OUT_DIR / f"moment{MOMENT}.json"
moment_out = {
    "moment":        MOMENT,
    "label":         MOMENT_LABELS[MOMENT],
    "train_cutoff":  TRAIN_CUTOFF,
    "train_matches": int(len(train)),
    "n_sims":        N_SIMS,
    "predicts":      MOMENT_PREDICTS[MOMENT],
    "known_rounds":  sorted(KNOWN_ROUNDS),
    "known_ko_rounds": sorted(KNOWN_KO_ROUNDS),
    "model": {
        "ensemble": {"A_weight": W_A, "B_weight": W_B},
        "model_a":  "Poisson + Elo regression (full history, time-decayed)",
        "model_b":  "Poisson GLM with team fixed effects (2010+, time-decayed, neutral)",
    },
    "matches":    matches,
    "standings":  standings,
    "ko_probs":   ko_probs,
    "r32_bracket": r32_bracket,
    "bracket":    bracket,
}
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(moment_out, f, ensure_ascii=False, indent=2)
print(f"  wrote {out_file}")
print(f"\nDone. Moment {MOMENT}: {MOMENT_LABELS[MOMENT]}")

# Sanity print
print("\nTop-10 champion odds:")
for t in sorted(COPA_TEAMS, key=lambda t: -champion[t])[:10]:
    kp = ko_probs[t]
    print(f"  {t:24s} RO32={kp['p_ro32']:5.1f}%  RO16={kp['p_ro16']:5.1f}%  "
          f"QF={kp['p_qf']:5.1f}%  SF={kp['p_sf']:5.1f}%  "
          f"Final={kp['p_final']:5.1f}%  Champion={kp['p_champion']:5.1f}%")
