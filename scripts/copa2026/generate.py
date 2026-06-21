"""
Copa 2026 — Moment 1 prediction pipeline.

Snapshot: pre-tournament (training cutoff 2026-06-11).
Predicts all 72 group-stage matches, then runs a Monte Carlo to produce
final group standings and advancement probabilities.

Model = ensemble of:
  A) Poisson + Elo regression  (full history, time-decayed)        weight 0.40
  B) Poisson GLM, team fixed effects (2010+, time-decayed, neutral) weight 0.60

Outputs (written into ../../src/data/copa2026/):
  teams.json    — per-team Elo, group, iso2, confederation, attack/defense
  moment1.json  — 72 match predictions + final standings + advancement odds
"""

import json
import sys
import warnings
from pathlib import Path

# Windows consoles default to cp1252; force UTF-8 so team names / glyphs print.
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
# Config
# ----------------------------------------------------------------------------
HERE = Path(__file__).resolve().parent
DATA_PARQUET = HERE / "matches.parquet"
GROUPS_JSON  = HERE / "groups.json"
KNOCKOUT_JSON = HERE / "knockout.json"
OUT_DIR = HERE.parent.parent / "src" / "data" / "copa2026"
OUT_DIR.mkdir(parents=True, exist_ok=True)

TRAIN_CUTOFF = "2026-06-11"           # train on everything strictly before this
REF_DATE = pd.Timestamp(TRAIN_CUTOFF)  # decay measured back from kickoff

XI_A = 0.0010      # Model A decay (slow — uses full history)
XI_B = 0.0030      # Model B decay (~230-day half-life)
GLM_FROM = "2010-01-01"
MIN_WEIGHT = 0.01  # drop rows whose decay weight underflows GLM IRLS

W_A, W_B = 0.40, 0.60   # ensemble weights
MAX_GOALS = 10          # scoreline matrix dimension
N_SIMS = 20000          # Monte Carlo runs
RNG = np.random.default_rng(42)

RHO = -0.05        # low-score correlation (Dixon-Coles style adjustment)

# ----------------------------------------------------------------------------
# Load
# ----------------------------------------------------------------------------
print("Loading data...")
with open(GROUPS_JSON, encoding="utf-8") as f:
    cfg = json.load(f)

GROUPS = cfg["groups"]
FIXTURES = cfg["fixtures"]   # explicit r1/r2/r3 per group
TEAM_META = cfg["team_meta"]
TEAM_TO_GROUP = {t: g for g, teams in GROUPS.items() for t in teams}
COPA_TEAMS = list(TEAM_META.keys())

with open(KNOCKOUT_JSON, encoding="utf-8") as f:
    ko_cfg = json.load(f)

KO_R32    = ko_cfg["ro32"]["matches"]
KO_COMBOS = ko_cfg["ro32"]["combinations"]
KO_R16    = ko_cfg["ro16"]["matches"]
KO_QF     = ko_cfg["qf"]["matches"]
KO_SF     = ko_cfg["sf"]["matches"]
KO_FINAL  = next(m for m in ko_cfg["final"]["matches"] if m["id"] == "F_01")

df = pd.read_parquet(DATA_PARQUET)
df["date"] = pd.to_datetime(df["date"])

train = df[df["date"] < TRAIN_CUTOFF].dropna(
    subset=["home_score", "away_score", "home_elo_pre", "away_elo_pre"]
).copy()
train["home_score"] = train["home_score"].astype(int)
train["away_score"] = train["away_score"].astype(int)
train["days_ago"] = (REF_DATE - train["date"]).dt.days
train["elo_diff"] = train["home_elo_pre"] - train["away_elo_pre"]

wc = df[(df["date"] >= TRAIN_CUTOFF) & (df["tournament"] == "FIFA World Cup")].reset_index(drop=True)
print(f"  train: {len(train):,} matches   |   copa fixtures: {len(wc)}")

# Validate: config groups must equal the round-robin components in the fixtures.
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
        "groups.json does not match the fixture draw. Offending fixture groups:\n  "
        + "\n  ".join(sorted(", ".join(sorted(g)) for g in missing))
    )
print("  group config validated against fixtures ✓")

# Current Elo per team = pre-match Elo from its first Copa fixture
elo_now = {}
for t in COPA_TEAMS:
    h = wc[wc["home_team"] == t]["home_elo_pre"]
    a = wc[wc["away_team"] == t]["away_elo_pre"]
    vals = pd.concat([h, a]).dropna()
    elo_now[t] = float(vals.iloc[0]) if len(vals) else 1500.0

# ----------------------------------------------------------------------------
# Model A — Poisson + Elo regression
# ----------------------------------------------------------------------------
print("Fitting Model A (Poisson + Elo)...")
train["w_a"] = np.exp(-XI_A * train["days_ago"])

# Long format: one row per (team, opponent, goals_for), with is_home flag.
a_home = pd.DataFrame({
    "goals": train["home_score"],
    "elo_diff": train["elo_diff"],       # from scorer's perspective
    "is_home": 1.0 - train["neutral"].astype(float),
    "w": train["w_a"],
})
a_away = pd.DataFrame({
    "goals": train["away_score"],
    "elo_diff": -train["elo_diff"],
    "is_home": -(1.0 - train["neutral"].astype(float)),
    "w": train["w_a"],
})
a_long = pd.concat([a_home, a_away], ignore_index=True)
a_long = a_long[np.isfinite(a_long["w"]) & (a_long["w"] > 0)]

model_a = smf.glm(
    "goals ~ elo_diff + is_home",
    data=a_long,
    family=sm.families.Poisson(),
    freq_weights=a_long["w"],
).fit()
A_INT = model_a.params["Intercept"]
A_ELO = model_a.params["elo_diff"]
A_HOME = model_a.params["is_home"]
print(f"  intercept={A_INT:.3f}  elo={A_ELO:.5f}  home={A_HOME:.3f}")


def lambda_a(elo_diff, is_home):
    return np.exp(A_INT + A_ELO * elo_diff + A_HOME * is_home)


# ----------------------------------------------------------------------------
# Model B — Poisson GLM with team fixed effects (2010+, neutral venue)
# ----------------------------------------------------------------------------
print("Fitting Model B (GLM team fixed effects)...")
glm_train = train[train["date"] >= GLM_FROM].copy()
glm_train["w_b"] = np.exp(-XI_B * glm_train["days_ago"])
glm_train = glm_train[glm_train["w_b"] >= MIN_WEIGHT].copy()

# Long format: attack of scoring team, defense of conceding team, home flag.
b_home = pd.DataFrame({
    "goals": glm_train["home_score"],
    "attack": glm_train["home_team"],
    "defense": glm_train["away_team"],
    "is_home": 1.0 - glm_train["neutral"].astype(float),
    "w": glm_train["w_b"],
})
b_away = pd.DataFrame({
    "goals": glm_train["away_score"],
    "attack": glm_train["away_team"],
    "defense": glm_train["home_team"],
    "is_home": 0.0,
    "w": glm_train["w_b"],
})
b_long = pd.concat([b_home, b_away], ignore_index=True)
b_long = b_long[np.isfinite(b_long["w"]) & (b_long["w"] > 0)].copy()

# Reference team = France (strong, always present) so coefficients are anchored.
all_teams = sorted(set(b_long["attack"]) | set(b_long["defense"]))
ref_team = "France" if "France" in all_teams else all_teams[0]
b_long["attack"] = pd.Categorical(b_long["attack"], categories=[ref_team] + [t for t in all_teams if t != ref_team])
b_long["defense"] = pd.Categorical(b_long["defense"], categories=[ref_team] + [t for t in all_teams if t != ref_team])

model_b = smf.glm(
    "goals ~ C(attack) + C(defense) + is_home",
    data=b_long,
    family=sm.families.Poisson(),
    freq_weights=b_long["w"].values,
).fit()

B_INT = model_b.params["Intercept"]
B_HOME = model_b.params["is_home"]


def _coef(prefix, team):
    key = f"C({prefix})[T.{team}]"
    return model_b.params.get(key, 0.0)


attack_b = {t: _coef("attack", t) for t in COPA_TEAMS}
defense_b = {t: _coef("defense", t) for t in COPA_TEAMS}


def lambda_b(scorer, conceder, is_home):
    return np.exp(B_INT + attack_b.get(scorer, 0.0) + defense_b.get(conceder, 0.0) + B_HOME * is_home)


# ----------------------------------------------------------------------------
# Scoreline matrix + ensemble
# ----------------------------------------------------------------------------
def dc_tau(i, j, lh, la, rho):
    """Dixon-Coles low-score correlation adjustment."""
    if i == 0 and j == 0:
        return 1 - lh * la * rho
    if i == 0 and j == 1:
        return 1 + lh * rho
    if i == 1 and j == 0:
        return 1 + la * rho
    if i == 1 and j == 1:
        return 1 - rho
    return 1.0


def score_matrix(lh, la):
    h = poisson.pmf(np.arange(MAX_GOALS + 1), lh)
    a = poisson.pmf(np.arange(MAX_GOALS + 1), la)
    mat = np.outer(h, a)
    for i in range(2):
        for j in range(2):
            mat[i, j] *= dc_tau(i, j, lh, la, RHO)
    return mat / mat.sum()


def predict_match(home, away):
    """Ensemble scoreline matrix for home vs away (neutral venue — no host bonus)."""
    ed = elo_now[home] - elo_now[away]
    # Neutral venue for all Copa matches -> is_home = 0
    lh_a, la_a = lambda_a(ed, 0.0), lambda_a(-ed, 0.0)
    lh_b, la_b = lambda_b(home, away, 0.0), lambda_b(away, home, 0.0)
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
    out = []
    for h, a in idx[:n]:
        out.append({"score": f"{h}-{a}", "prob": round(float(mat[h, a]), 4)})
    return out


def over_under(mat, line=2.5):
    over = 0.0
    for i in range(mat.shape[0]):
        for j in range(mat.shape[1]):
            if i + j > line:
                over += mat[i, j]
    return float(over), float(1 - over)


def btts(mat):
    yes = mat[1:, 1:].sum()
    return float(yes), float(1 - yes)


# ----------------------------------------------------------------------------
# Predict all 72 group matches
# ----------------------------------------------------------------------------
print("Predicting 72 group-stage matches...")

# Build a date lookup from the parquet fixtures: (home, away) -> date
fixture_dates = {}
for _, row in wc.iterrows():
    fixture_dates[(row["home_team"], row["away_team"])] = row["date"].strftime("%Y-%m-%d")

matches = []
match_matrices = {}
for g, rounds in FIXTURES.items():
    for rnd_key, pairs in [("r1", 1), ("r2", 2), ("r3", 3)]:
        for home, away in rounds[rnd_key]:
            mat = predict_match(home, away)
            match_matrices[(home, away)] = mat
            ph, pdr, pa = outcome_probs(mat)
            ou_over, ou_under = over_under(mat)
            by, bn = btts(mat)
            date_str = fixture_dates.get((home, away), fixture_dates.get((away, home), ""))
            matches.append({
                "round": pairs,
                "group": g,
                "date": date_str,
                "home": home,
                "away": away,
                "home_iso": TEAM_META[home]["iso2"],
                "away_iso": TEAM_META[away]["iso2"],
                "home_elo": round(elo_now[home]),
                "away_elo": round(elo_now[away]),
                "p_home": round(ph, 4),
                "p_draw": round(pdr, 4),
                "p_away": round(pa, 4),
                "top_scores": top_scorelines(mat),
                "over25": round(ou_over, 4),
                "under25": round(ou_under, 4),
                "btts_yes": round(by, 4),
                "btts_no": round(bn, 4),
                "exp_home_goals": round(float((mat.sum(axis=1) * np.arange(MAX_GOALS + 1)).sum()), 2),
                "exp_away_goals": round(float((mat.sum(axis=0) * np.arange(MAX_GOALS + 1)).sum()), 2),
            })

# ----------------------------------------------------------------------------
# Precompute KO scoreline matrices for all team pairs (C(48,2) = 1,128 pairs)
# ----------------------------------------------------------------------------
print("Precomputing knockout scoreline matrices...")
ko_flat = {}   # (home, away) -> (flat_prob_array, n_cols)
for i, t1 in enumerate(COPA_TEAMS):
    for t2 in COPA_TEAMS[i + 1:]:
        mat = predict_match(t1, t2)
        p1 = mat.ravel(); p1 = p1 / p1.sum()
        ko_flat[(t1, t2)] = (p1, mat.shape[1])
        p2 = mat.T.ravel(); p2 = p2 / p2.sum()
        ko_flat[(t2, t1)] = (p2, mat.shape[1])


def sim_ko_winner(home, away):
    """Simulate a KO match (neutral venue). Draw → 50-50 penalty coin."""
    p, ncols = ko_flat[(home, away)]
    idx = int(RNG.choice(len(p), p=p))
    hg, ag = divmod(idx, ncols)
    if hg > ag:
        return home
    elif ag > hg:
        return away
    else:
        return home if RNG.random() < 0.5 else away


def resolve_slot(slot_def, winner_of, runner_up_of, third_slot_assign):
    t = slot_def["type"]
    if t == "winner":
        return winner_of[slot_def["group"]]
    elif t == "runner_up":
        return runner_up_of[slot_def["group"]]
    else:  # third
        return third_slot_assign[slot_def["slot"]]


# ----------------------------------------------------------------------------
# Monte Carlo — final group standings + advancement
# ----------------------------------------------------------------------------
print(f"Running Monte Carlo ({N_SIMS:,} sims)...")

# Pre-sample flattened scoreline draws per fixture for speed.
fixture_list = list(match_matrices.keys())
flat = {}
for (h, a), mat in match_matrices.items():
    p = mat.ravel()
    p = p / p.sum()
    flat[(h, a)] = (p, mat.shape[1])

group_fixtures = {g: [] for g in GROUPS}
for (h, a) in fixture_list:
    group_fixtures[TEAM_TO_GROUP[h]].append((h, a))

# Accumulators — group stage
adv_top2   = {t: 0 for t in COPA_TEAMS}
adv_third  = {t: 0 for t in COPA_TEAMS}
win_group  = {t: 0 for t in COPA_TEAMS}
pts_sum    = {t: 0.0 for t in COPA_TEAMS}
gd_sum     = {t: 0.0 for t in COPA_TEAMS}
gf_sum     = {t: 0.0 for t in COPA_TEAMS}
rank_counts = {t: [0, 0, 0, 0] for t in COPA_TEAMS}
qualify    = {t: 0 for t in COPA_TEAMS}   # qualified for RO32

# Accumulators — knockout rounds
ro16_reach  = {t: 0 for t in COPA_TEAMS}  # won RO32 match
qf_reach    = {t: 0 for t in COPA_TEAMS}
sf_reach    = {t: 0 for t in COPA_TEAMS}
final_reach = {t: 0 for t in COPA_TEAMS}
champion    = {t: 0 for t in COPA_TEAMS}

# Track which teams appear in each R32 slot (for bracket visualization)
r32_slot_counts = {m["id"]: {"home": {}, "away": {}} for m in KO_R32}

# Pre-draw all match outcomes for all sims at once per fixture
draws = {}
for (h, a), (p, ncols) in flat.items():
    idx = RNG.choice(len(p), size=N_SIMS, p=p)
    draws[(h, a)] = (idx // ncols, idx % ncols)  # home goals, away goals

for s in range(N_SIMS):
    third_place = []  # (group, team, pts, gd, gf) for best-third comparison
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
            if hg > ag:
                tbl[h]["pts"] += 3
            elif ag > hg:
                tbl[a]["pts"] += 3
            else:
                tbl[h]["pts"] += 1; tbl[a]["pts"] += 1
        ranked = sorted(
            GROUPS[g],
            key=lambda t: (tbl[t]["pts"], tbl[t]["gf"] - tbl[t]["ga"], tbl[t]["gf"], RNG.random()),
            reverse=True,
        )
        for pos, t in enumerate(ranked):
            rank_counts[t][pos] += 1
            pts_sum[t] += tbl[t]["pts"]
            gd_sum[t] += tbl[t]["gf"] - tbl[t]["ga"]
            gf_sum[t] += tbl[t]["gf"]
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

    # Best 8 of 12 third-placed teams advance
    third_place.sort(key=lambda x: (x[2], x[3], x[4], RNG.random()), reverse=True)
    for entry in third_place[:8]:
        qualify[entry[1]] += 1

    # ── Knockout bracket ─────────────────────────────────────────────────────
    # Determine which 8 groups' thirds advanced and look up slot assignments
    advancing_groups = sorted(e[0] for e in third_place[:8])
    combo_key = "".join(advancing_groups)
    slot_groups = KO_COMBOS.get(combo_key, {})   # {"1A": "E", ...}
    third_slot_assign = {slot: third_of[g] for slot, g in slot_groups.items()}

    # Fill R32 match teams
    r32_teams = {}
    for m in KO_R32:
        mid = m["id"]
        h = resolve_slot(m["home"], winner_of, runner_up_of, third_slot_assign)
        a = resolve_slot(m["away"], winner_of, runner_up_of, third_slot_assign)
        r32_teams[mid] = (h, a)
        r32_slot_counts[mid]["home"][h] = r32_slot_counts[mid]["home"].get(h, 0) + 1
        r32_slot_counts[mid]["away"][a] = r32_slot_counts[mid]["away"].get(a, 0) + 1

    # R32 → 16 winners
    r32_winners = {}
    for m in KO_R32:
        mid = m["id"]
        h, a = r32_teams[mid]
        w = sim_ko_winner(h, a)
        r32_winners[mid] = w
        ro16_reach[w] += 1

    # R16 → 8 winners
    r16_winners = {}
    for m in KO_R16:
        h = r32_winners[m["home_from"]]
        a = r32_winners[m["away_from"]]
        w = sim_ko_winner(h, a)
        r16_winners[m["id"]] = w
        qf_reach[w] += 1

    # QF → 4 winners
    qf_winners = {}
    for m in KO_QF:
        h = r16_winners[m["home_from"]]
        a = r16_winners[m["away_from"]]
        w = sim_ko_winner(h, a)
        qf_winners[m["id"]] = w
        sf_reach[w] += 1

    # SF → 2 winners + 2 losers
    sf_winners = {}
    sf_losers  = {}
    for m in KO_SF:
        h = qf_winners[m["home_from"]]
        a = qf_winners[m["away_from"]]
        w = sim_ko_winner(h, a)
        sf_winners[m["id"]] = w
        sf_losers[m["id"]]  = a if w == h else h
        final_reach[w] += 1

    # Final → champion
    h = sf_winners[KO_FINAL["home_from"]]
    a = sf_winners[KO_FINAL["away_from"]]
    champion[sim_ko_winner(h, a)] += 1

# ----------------------------------------------------------------------------
# Assemble KO probabilities per team
# ----------------------------------------------------------------------------
def pct(n):
    return round(100.0 * n / N_SIMS, 1)

ko_probs = {}
for t in COPA_TEAMS:
    ko_probs[t] = {
        "p_ro32":    pct(qualify[t]),
        "p_ro16":    pct(ro16_reach[t]),
        "p_qf":      pct(qf_reach[t]),
        "p_sf":      pct(sf_reach[t]),
        "p_final":   pct(final_reach[t]),
        "p_champion": pct(champion[t]),
    }

# R32 bracket slot candidates (top-3 most likely teams per slot side)
r32_bracket = []
for m in KO_R32:
    mid = m["id"]
    def top_cands(counts, n=3):
        return [
            {"team": t, "iso2": TEAM_META[t]["iso2"], "prob": pct(c)}
            for t, c in sorted(counts.items(), key=lambda x: -x[1])[:n]
        ]
    r32_bracket.append({
        "id":    mid,
        "date":  m["date"],
        "venue": m["venue"],
        "home_slot": m["home"],
        "away_slot": m["away"],
        "home_candidates": top_cands(r32_slot_counts[mid]["home"]),
        "away_candidates": top_cands(r32_slot_counts[mid]["away"]),
    })

# ----------------------------------------------------------------------------
# Assemble standings (ordered by qualification probability within group)
# ----------------------------------------------------------------------------
standings = {}
for g in GROUPS:
    rows = []
    for t in GROUPS[g]:
        rows.append({
            "team": t,
            "iso2": TEAM_META[t]["iso2"],
            "confederation": TEAM_META[t]["confederation"],
            "elo": round(elo_now[t]),
            "exp_pts": round(pts_sum[t] / N_SIMS, 2),
            "exp_gd": round(gd_sum[t] / N_SIMS, 2),
            "exp_gf": round(gf_sum[t] / N_SIMS, 2),
            "p_win_group": pct(win_group[t]),
            "p_top2": pct(adv_top2[t]),
            "p_qualify": pct(qualify[t]),
            "p_finish": [pct(rank_counts[t][i]) for i in range(4)],
        })
    # Order by expected finishing position (qualify prob, then exp pts)
    rows.sort(key=lambda r: (r["p_qualify"], r["exp_pts"], r["exp_gd"]), reverse=True)
    for i, r in enumerate(rows):
        r["proj_pos"] = i + 1
    standings[g] = rows

# ----------------------------------------------------------------------------
# Export
# ----------------------------------------------------------------------------
print("Writing JSON...")

teams_out = []
for t in COPA_TEAMS:
    teams_out.append({
        "team": t,
        "iso2": TEAM_META[t]["iso2"],
        "group": TEAM_TO_GROUP[t],
        "confederation": TEAM_META[t]["confederation"],
        "pot": TEAM_META[t]["pot"],
        "elo": round(elo_now[t]),
        "attack": round(attack_b.get(t, 0.0), 3),
        "defense": round(defense_b.get(t, 0.0), 3),
    })
teams_out.sort(key=lambda x: x["elo"], reverse=True)
for i, t in enumerate(teams_out):
    t["elo_rank"] = i + 1

with open(OUT_DIR / "teams.json", "w", encoding="utf-8") as f:
    json.dump({
        "generated_from_train_cutoff": TRAIN_CUTOFF,
        "teams": teams_out,
        "groups": GROUPS,
    }, f, ensure_ascii=False, indent=2)

moment1 = {
    "moment": 1,
    "label": "Pre-tournament",
    "train_cutoff": TRAIN_CUTOFF,
    "train_matches": int(len(train)),
    "n_sims": N_SIMS,
    "predicts": "All 72 group-stage matches + full knockout bracket",
    "model": {
        "ensemble": {"A_weight": W_A, "B_weight": W_B},
        "model_a": "Poisson + Elo regression (full history, time-decayed)",
        "model_b": "Poisson GLM with team fixed effects (2010+, time-decayed, neutral)",
    },
    "matches": matches,
    "standings": standings,
    "ko_probs": ko_probs,
    "r32_bracket": r32_bracket,
}
with open(OUT_DIR / "moment1.json", "w", encoding="utf-8") as f:
    json.dump(moment1, f, ensure_ascii=False, indent=2)

print(f"Done. Wrote {OUT_DIR / 'teams.json'} and {OUT_DIR / 'moment1.json'}")

# Quick sanity print
print("\nTop-10 by Elo:")
for t in teams_out[:10]:
    print(f"  {t['elo_rank']:2d}. {t['team']:24s} {t['elo']}  (grp {t['group']})")
print("\nGroup A projected standings:")
for r in standings["A"]:
    print(f"  {r['proj_pos']}. {r['team']:22s} qual={r['p_qualify']}%  top2={r['p_top2']}%  pts={r['exp_pts']}")

print("\nTop-10 champion odds:")
champ_sorted = sorted(COPA_TEAMS, key=lambda t: -champion[t])
for t in champ_sorted[:10]:
    kp = ko_probs[t]
    print(f"  {t:24s} RO32={kp['p_ro32']:5.1f}%  RO16={kp['p_ro16']:5.1f}%  "
          f"QF={kp['p_qf']:5.1f}%  SF={kp['p_sf']:5.1f}%  "
          f"Final={kp['p_final']:5.1f}%  Champion={kp['p_champion']:5.1f}%")
