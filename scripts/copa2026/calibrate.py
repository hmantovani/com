"""
Copa 2026 — one-off calibration script.

Fits two constants used by generate.py's ensemble model:
  1. RHO   — Dixon-Coles low-score correlation adjustment, via MLE on Model B's
             lambda predictions across the full training set.
  2. W_A   — ensemble blend weight for Model A (Poisson+Elo). W_B = 1 - W_A.
             Chosen via grid search minimizing Ranked Probability Score (RPS)
             on held-out World Cups 2014, 2018, 2022.

This script does not modify generate.py or any data file. It only prints the
two constants; paste them into generate.py's RHO / W_A / W_B manually after
reviewing.
"""

import sys
import warnings
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf
from scipy.optimize import minimize_scalar
from scipy.stats import poisson

warnings.filterwarnings("ignore")

HERE = Path(__file__).resolve().parent
DATA_PARQUET = HERE / "matches.parquet"

TRAIN_CUTOFF = "2026-06-11"
REF_DATE = pd.Timestamp(TRAIN_CUTOFF)

XI_A = 0.0010
XI_B = 0.0030
GLM_FROM = "2010-01-01"
MIN_WEIGHT = 0.01
MAX_GOALS = 10

HOLDOUT_YEARS = ["2014", "2018", "2022"]

print("Loading data...")
df = pd.read_parquet(DATA_PARQUET)
df["date"] = pd.to_datetime(df["date"])

train = df[df["date"] < TRAIN_CUTOFF].dropna(
    subset=["home_score", "away_score", "home_elo_pre", "away_elo_pre"]
).copy()
train["home_score"] = train["home_score"].astype(int)
train["away_score"] = train["away_score"].astype(int)
train["days_ago"] = (REF_DATE - train["date"]).dt.days
train["elo_diff"] = train["home_elo_pre"] - train["away_elo_pre"]

print(f"  train: {len(train):,} matches")

# ----------------------------------------------------------------------------
# Fit Model A — Poisson + Elo regression (needed later for ensemble RPS grid)
# ----------------------------------------------------------------------------
print("Fitting Model A (Poisson + Elo)...")
train["w_a"] = np.exp(-XI_A * train["days_ago"])

a_home = pd.DataFrame({
    "goals": train["home_score"], "elo_diff": train["elo_diff"],
    "is_home": 1.0 - train["neutral"].astype(float), "w": train["w_a"],
})
a_away = pd.DataFrame({
    "goals": train["away_score"], "elo_diff": -train["elo_diff"],
    "is_home": -(1.0 - train["neutral"].astype(float)), "w": train["w_a"],
})
a_long = pd.concat([a_home, a_away], ignore_index=True)
a_long = a_long[np.isfinite(a_long["w"]) & (a_long["w"] > 0)]

model_a = smf.glm(
    "goals ~ elo_diff + is_home", data=a_long,
    family=sm.families.Poisson(), freq_weights=a_long["w"],
).fit()
A_INT, A_ELO, A_HOME = model_a.params["Intercept"], model_a.params["elo_diff"], model_a.params["is_home"]
print(f"  intercept={A_INT:.3f}  elo={A_ELO:.5f}  home={A_HOME:.3f}")


def lambda_a(elo_diff, is_home):
    return np.exp(A_INT + A_ELO * elo_diff + A_HOME * is_home)


# ----------------------------------------------------------------------------
# Fit Model B — Poisson GLM, team fixed effects (2010+)
# ----------------------------------------------------------------------------
print("Fitting Model B (GLM team fixed effects)...")
glm_train = train[train["date"] >= GLM_FROM].copy()
glm_train["w_b"] = np.exp(-XI_B * glm_train["days_ago"])
glm_train = glm_train[glm_train["w_b"] >= MIN_WEIGHT].copy()

b_home = pd.DataFrame({
    "goals": glm_train["home_score"], "attack": glm_train["home_team"],
    "defense": glm_train["away_team"], "is_home": 1.0 - glm_train["neutral"].astype(float),
    "w": glm_train["w_b"],
})
b_away = pd.DataFrame({
    "goals": glm_train["away_score"], "attack": glm_train["away_team"],
    "defense": glm_train["home_team"], "is_home": 0.0, "w": glm_train["w_b"],
})
b_long = pd.concat([b_home, b_away], ignore_index=True)
b_long = b_long[np.isfinite(b_long["w"]) & (b_long["w"] > 0)].copy()

all_teams = sorted(set(b_long["attack"]) | set(b_long["defense"]))
ref_team = "France" if "France" in all_teams else all_teams[0]
b_long["attack"] = pd.Categorical(b_long["attack"], categories=[ref_team] + [t for t in all_teams if t != ref_team])
b_long["defense"] = pd.Categorical(b_long["defense"], categories=[ref_team] + [t for t in all_teams if t != ref_team])

model_b = smf.glm(
    "goals ~ C(attack) + C(defense) + is_home", data=b_long,
    family=sm.families.Poisson(), freq_weights=b_long["w"].values,
).fit()
B_INT, B_HOME = model_b.params["Intercept"], model_b.params["is_home"]


def _coef(prefix, team):
    return model_b.params.get(f"C({prefix})[T.{team}]", 0.0)


attack_b = {t: _coef("attack", t) for t in all_teams}
defense_b = {t: _coef("defense", t) for t in all_teams}


def lambda_b(scorer, conceder, is_home):
    if scorer not in attack_b or conceder not in defense_b:
        return None
    return np.exp(B_INT + attack_b[scorer] + defense_b[conceder] + B_HOME * is_home)


print("  Model B fit ✓")

# ----------------------------------------------------------------------------
# Step 1 — MLE fit RHO against Model B's lambdas, full training set
# ----------------------------------------------------------------------------
print("\n=== Step 1: fitting Dixon-Coles RHO via MLE on Model B ===")

rho_rows = []
for _, row in train.iterrows():
    h, a = row["home_team"], row["away_team"]
    ih = 1.0 - float(row["neutral"])
    lh = lambda_b(h, a, ih)
    la = lambda_b(a, h, 0.0)
    if lh is None or la is None:
        continue
    rho_rows.append((int(row["home_score"]), int(row["away_score"]), lh, la, row["w_a"]))

print(f"  usable matches for RHO fit: {len(rho_rows):,}")

hg_arr = np.array([r[0] for r in rho_rows])
ag_arr = np.array([r[1] for r in rho_rows])
lh_arr = np.array([r[2] for r in rho_rows])
la_arr = np.array([r[3] for r in rho_rows])
w_arr  = np.array([r[4] for r in rho_rows])


def dc_tau_vec(hg, ag, lh, la, rho):
    tau = np.ones_like(lh)
    m00 = (hg == 0) & (ag == 0)
    m01 = (hg == 0) & (ag == 1)
    m10 = (hg == 1) & (ag == 0)
    m11 = (hg == 1) & (ag == 1)
    tau[m00] = 1 - lh[m00] * la[m00] * rho
    tau[m01] = 1 + lh[m01] * rho
    tau[m10] = 1 + la[m10] * rho
    tau[m11] = 1 - rho
    return tau


def neg_log_lik(rho):
    tau = dc_tau_vec(hg_arr, ag_arr, lh_arr, la_arr, rho)
    tau = np.clip(tau, 1e-10, None)  # guard against invalid (negative) tau
    ll_h = poisson.logpmf(hg_arr, lh_arr)
    ll_a = poisson.logpmf(ag_arr, la_arr)
    ll = np.log(tau) + ll_h + ll_a
    return -np.sum(w_arr * ll)


result = minimize_scalar(neg_log_lik, bounds=(-0.2, 0.2), method="bounded")
RHO_OPTIMAL = float(result.x)
print(f"  RHO_OPTIMAL = {RHO_OPTIMAL:.5f}   (neg-log-lik = {result.fun:.1f})")
print(f"  [reference: hardcoded value in generate.py today = -0.05]")

# ----------------------------------------------------------------------------
# Step 2 — grid search ensemble weight W_A, minimizing RPS on held-out WCs
# ----------------------------------------------------------------------------
print("\n=== Step 2: grid search W_A (RPS on 2014/2018/2022 World Cups) ===")

holdout = df[
    (df["tournament"] == "FIFA World Cup")
    & (df["date"].astype(str).str[:4].isin(HOLDOUT_YEARS))
].dropna(subset=["home_score", "away_score", "home_elo_pre", "away_elo_pre"]).copy()
holdout["home_score"] = holdout["home_score"].astype(int)
holdout["away_score"] = holdout["away_score"].astype(int)
holdout["elo_diff"] = holdout["home_elo_pre"] - holdout["away_elo_pre"]
print(f"  holdout matches: {len(holdout)}")


def dc_tau(i, j, lh, la, rho):
    if i == 0 and j == 0: return 1 - lh * la * rho
    if i == 0 and j == 1: return 1 + lh * rho
    if i == 1 and j == 0: return 1 + la * rho
    if i == 1 and j == 1: return 1 - rho
    return 1.0


def score_matrix(lh, la, rho):
    h = poisson.pmf(np.arange(MAX_GOALS + 1), lh)
    a = poisson.pmf(np.arange(MAX_GOALS + 1), la)
    mat = np.outer(h, a)
    for i in range(2):
        for j in range(2):
            mat[i, j] *= dc_tau(i, j, lh, la, rho)
    mat = np.clip(mat, 0, None)
    return mat / mat.sum()


def outcome_probs(mat):
    home = np.tril(mat, -1).sum()
    draw = np.trace(mat)
    away = np.triu(mat, 1).sum()
    return float(home), float(draw), float(away)


def rps_3(probs, actual_idx):
    # actual_idx: 0=home win, 1=draw, 2=away win (ordinal: home...draw...away)
    cum_p, cum_a, total = 0.0, 0.0, 0.0
    actual = [0, 0, 0]
    actual[actual_idx] = 1
    for i in range(3):
        cum_p += probs[i]
        cum_a += actual[i]
        total += (cum_p - cum_a) ** 2
    return total / 2  # normalize by (n_outcomes - 1)


# Precompute holdout lambdas from both models once (elo_diff / attack-defense
# do not depend on rho or W_A).
holdout_rows = []
for _, row in holdout.iterrows():
    h, a = row["home_team"], row["away_team"]
    ih = 1.0 - float(row["neutral"])
    ed = row["elo_diff"]
    lh_a = lambda_a(ed, ih)
    la_a = lambda_a(-ed, -ih)
    lh_b = lambda_b(h, a, max(ih, 0.0))
    la_b = lambda_b(a, h, max(-ih, 0.0))
    if lh_b is None or la_b is None:
        continue
    hg, ag = int(row["home_score"]), int(row["away_score"])
    actual_idx = 0 if hg > ag else (1 if hg == ag else 2)
    holdout_rows.append((lh_a, la_a, lh_b, la_b, actual_idx))

print(f"  usable holdout matches (both models resolvable): {len(holdout_rows)}")

best_wa, best_rps = None, np.inf
grid = np.round(np.arange(0.0, 1.0001, 0.05), 2)
for wa in grid:
    wb = 1 - wa
    total_rps = 0.0
    for lh_a, la_a, lh_b, la_b, actual_idx in holdout_rows:
        mat_a = score_matrix(lh_a, la_a, RHO_OPTIMAL)
        mat_b = score_matrix(lh_b, la_b, RHO_OPTIMAL)
        mat = wa * mat_a + wb * mat_b
        probs = outcome_probs(mat)
        total_rps += rps_3(probs, actual_idx)
    mean_rps = total_rps / len(holdout_rows)
    marker = ""
    if mean_rps < best_rps:
        best_rps, best_wa = mean_rps, wa
        marker = "  <-- best so far"
    print(f"  W_A={wa:.2f}  W_B={wb:.2f}   mean RPS={mean_rps:.5f}{marker}")

print(f"\n  W_A_OPTIMAL = {best_wa:.2f}   W_B_OPTIMAL = {1-best_wa:.2f}   (mean RPS = {best_rps:.5f})")
print(f"  [reference: hardcoded values in generate.py today = W_A=0.40, W_B=0.60]")

# Also report RPS at today's hardcoded weight for direct comparison
wa0, wb0 = 0.40, 0.60
total_rps0 = 0.0
for lh_a, la_a, lh_b, la_b, actual_idx in holdout_rows:
    mat_a = score_matrix(lh_a, la_a, RHO_OPTIMAL)
    mat_b = score_matrix(lh_b, la_b, RHO_OPTIMAL)
    mat = wa0 * mat_a + wb0 * mat_b
    probs = outcome_probs(mat)
    total_rps0 += rps_3(probs, actual_idx)
mean_rps0 = total_rps0 / len(holdout_rows)
print(f"  [current 40/60 weight on optimized RHO -> mean RPS = {mean_rps0:.5f}]")

print("\n=== DONE ===")
print(f"RHO_OPTIMAL = {RHO_OPTIMAL:.5f}")
print(f"W_A_OPTIMAL = {best_wa:.2f}")
print(f"W_B_OPTIMAL = {1-best_wa:.2f}")
