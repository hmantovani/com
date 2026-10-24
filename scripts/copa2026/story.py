"""
Copa 2026 — story data.

Reads the eight moment snapshots plus the real results and writes
src/data/copa2026/story.json, which the project pages use to tell the
"what did the model think, and was it right?" story.

Honesty rule: the odds shown for a match that has been played are the ones
from the LAST moment at which that match was still unplayed (group round r ->
moment r; R32 -> 4; R16 -> 5; QF -> 6; SF -> 7; 3rd place and Final -> 8).
Later snapshots recompute the same match with ratings that already contain
the tournament, which would be hindsight.

Run after generate.py has produced moment1..8.json:
    python story.py
"""

import csv
import json
import math
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

HERE = Path(__file__).resolve().parent
DATA = HERE.parent.parent / "src" / "data" / "copa2026"
KO_CSV = HERE / "wc_knockout.csv"

EPS = 1e-9
STAGES = ["G1", "G2", "G3", "R32", "R16", "QF", "SF", "3RD", "F"]
STAGE_MOMENT = {"G1": 1, "G2": 2, "G3": 3, "R32": 4, "R16": 5, "QF": 6, "SF": 7, "3RD": 8, "F": 8}
# which stage becomes real when moving INTO moment n
STAGE_LOCKED_AT = {2: "G1", 3: "G2", 4: "G3", 5: "R32", 6: "R16", 7: "QF", 8: "SF"}
CSV_ROUND = {"R32": "R32", "R16": "R16", "QF": "QF", "SF": "SF", "3RD": "3RD", "FINAL": "F"}
BRACKET_KEY = {"R32": "r32", "R16": "r16", "QF": "qf", "SF": "sf", "3RD": "third_place", "F": "final"}

moments = [json.load(open(DATA / f"moment{n}.json", encoding="utf-8")) for n in range(1, 9)]
teams = {t["team"]: t for t in json.load(open(DATA / "teams.json", encoding="utf-8"))["teams"]}


def outcome(hg, ag):
    return "H" if hg > ag else ("A" if hg < ag else "D")


def slim(pred):
    keep = ["home_elo", "away_elo", "p_home", "p_draw", "p_away", "p_adv_home", "top_scores",
            "over25", "btts_yes", "exp_home_goals", "exp_away_goals", "grid"]
    return {k: pred[k] for k in keep if k in pred}


# ── 1. Every real match with its honest pre-match prediction ────────────────
matches = []

final_group = moments[7]["matches"]  # moment 8 carries every real group score
for m8 in final_group:
    rnd = m8["round"]
    pm = moments[rnd - 1]
    pre = next(x for x in pm["matches"] if x["home"] == m8["home"] and x["away"] == m8["away"])
    assert pre.get("actual_home") is None, "honest odds must come from a moment where the match was unplayed"
    if m8.get("actual_home") is None:
        continue
    pred = {k: pre[k] for k in ["home_elo", "away_elo", "p_home", "p_draw", "p_away", "top_scores",
                                "over25", "btts_yes", "exp_home_goals", "exp_away_goals", "grid"]}
    matches.append({
        "id": f"GS|{m8['home']}|{m8['away']}",
        "stage": f"G{rnd}", "group": m8["group"], "date": m8["date"],
        "home": m8["home"], "away": m8["away"], "home_iso": m8["home_iso"], "away_iso": m8["away_iso"],
        "home_score": m8["actual_home"], "away_score": m8["actual_away"], "duration": "FT",
        "home_pens": None, "away_pens": None,
        "pred_moment": rnd, "pred": pred,
    })

with open(KO_CSV, encoding="utf-8-sig", newline="") as f:
    ko_rows = list(csv.DictReader(f))
for row in ko_rows:
    if row["home_score"] == "":
        continue
    stage = CSV_ROUND[row["round"]]
    pm = moments[STAGE_MOMENT[stage] - 1]
    b = next(x for x in pm["bracket"][BRACKET_KEY[stage]] if x["id"] == row["match_id"])
    if (b["home"], b["away"]) != (row["home_team"], row["away_team"]):
        sys.exit(f"{row['match_id']}: moment {pm['moment']} pairing {b['home']} v {b['away']} "
                 f"!= real {row['home_team']} v {row['away_team']}")
    hg, ag = int(row["home_score"]), int(row["away_score"])
    hp = int(row["home_pens"]) if row["home_pens"] else None
    ap = int(row["away_pens"]) if row["away_pens"] else None
    matches.append({
        "id": row["match_id"], "stage": stage, "group": None, "date": b["date"], "venue": b["venue"],
        "home": b["home"], "away": b["away"], "home_iso": b["home_iso"], "away_iso": b["away_iso"],
        "home_score": hg, "away_score": ag, "duration": row["duration"],
        "home_pens": hp, "away_pens": ap,
        "pred_moment": pm["moment"], "pred": slim(b["pred"]),
    })

# ── 2. Per-match evaluation ─────────────────────────────────────────────────
for m in matches:
    hg, ag, p = m["home_score"], m["away_score"], m["pred"]
    is_ko = not m["stage"].startswith("G")
    if hg != ag:
        winner_side = "H" if hg > ag else "A"
    elif is_ko:
        winner_side = "H" if m["home_pens"] > m["away_pens"] else "A"
    else:
        winner_side = None  # group-stage draw
    m["winner"] = "" if winner_side is None else (m["home"] if winner_side == "H" else m["away"])
    if is_ko:
        pa = p["p_adv_home"]
        p_win = pa if winner_side == "H" else 1 - pa
        m["p_winner_adv"] = round(p_win, 4)
        m["called_adv"] = (pa >= 0.5) == (winner_side == "H")
    ninety = m["duration"] == "FT"  # score is a 90-minute score
    m["ninety"] = ninety
    if ninety:
        res = outcome(hg, ag)
        p_res = {"H": p["p_home"], "D": p["p_draw"], "A": p["p_away"]}[res]
        m["result"] = res
        m["p_result"] = round(p_res, 4)
        probs = {"H": p["p_home"], "D": p["p_draw"], "A": p["p_away"]}
        m["called_result"] = max(probs, key=probs.get) == res
        top = p["top_scores"]
        m["top_score_hit"] = top[0]["score"] == f"{hg}-{ag}"
        m["score_rank"] = next((i + 1 for i, s in enumerate(top) if s["score"] == f"{hg}-{ag}"), None)
        m["p_score"] = p["grid"][hg][ag] if hg < 6 and ag < 6 else None
        m["total_goals"] = hg + ag
        m["over_hit"] = (hg + ag > 2.5) == (p["over25"] >= 0.5)
        m["btts_hit"] = (hg > 0 and ag > 0) == (p["btts_yes"] >= 0.5)


# ── 3. Scorecard ────────────────────────────────────────────────────────────
def mean(xs):
    xs = list(xs)
    return sum(xs) / len(xs) if xs else None


def r4(x):
    return None if x is None else round(x, 4)


def scorecard(ms):
    n = len(ms)
    ninety = [m for m in ms if m["ninety"]]
    ko = [m for m in ms if "p_winner_adv" in m]
    out = {"n": n}
    if ko:
        # knockout: who advanced
        out["adv_accuracy"] = r4(mean(1.0 if m["called_adv"] else 0.0 for m in ko))
        out["adv_logloss"] = r4(mean(-math.log(max(m["p_winner_adv"], EPS)) for m in ko))
        out["adv_brier"] = r4(mean((1 - m["p_winner_adv"]) ** 2 for m in ko))
        out["mean_p_winner"] = r4(mean(m["p_winner_adv"] for m in ko))
    if ninety:
        out["n_ninety"] = len(ninety)
        out["accuracy"] = r4(mean(1.0 if m["called_result"] else 0.0 for m in ninety))
        out["logloss"] = r4(mean(-math.log(max(m["p_result"], EPS)) for m in ninety))
        out["brier"] = r4(mean(
            sum(((1.0 if k == m["result"] else 0.0) - {"H": m["pred"]["p_home"], "D": m["pred"]["p_draw"],
                                                       "A": m["pred"]["p_away"]}[k]) ** 2 for k in "HDA")
            for m in ninety))
        out["mean_p_result"] = r4(mean(m["p_result"] for m in ninety))
        out["pred_goals"] = r4(mean(m["pred"]["exp_home_goals"] + m["pred"]["exp_away_goals"] for m in ninety))
        out["actual_goals"] = r4(mean(m["total_goals"] for m in ninety))
        out["top_score_rate"] = r4(mean(1.0 if m["top_score_hit"] else 0.0 for m in ninety))
        ps = [m["p_score"] for m in ninety if m["p_score"] is not None]
        out["mean_p_score"] = r4(mean(ps))
        out["over_rate"] = r4(mean(1.0 if m["over_hit"] else 0.0 for m in ninety))
        out["btts_rate"] = r4(mean(1.0 if m["btts_hit"] else 0.0 for m in ninety))
    return out


stage_cards = {s: scorecard([m for m in matches if m["stage"] == s]) for s in STAGES}
groups_all = [m for m in matches if m["stage"].startswith("G")]
ko_all = [m for m in matches if not m["stage"].startswith("G")]
overall = {"groups": scorecard(groups_all), "knockouts": scorecard(ko_all)}

# does updating ratings during the tournament help? (rounds 2-3: moment-1 odds vs moment-r odds)
update_effect = {}
for rnd in (2, 3):
    ms = [m for m in matches if m["stage"] == f"G{rnd}"]
    ll_new, ll_old, br_new, br_old = [], [], [], []
    for m in ms:
        old = next(x for x in moments[0]["matches"] if x["home"] == m["home"] and x["away"] == m["away"])
        for pr, ll, br in (({"H": m["pred"]["p_home"], "D": m["pred"]["p_draw"], "A": m["pred"]["p_away"]}, ll_new, br_new),
                           ({"H": old["p_home"], "D": old["p_draw"], "A": old["p_away"]}, ll_old, br_old)):
            ll.append(-math.log(max(pr[m["result"]], EPS)))
            br.append(sum(((1.0 if k == m["result"] else 0.0) - pr[k]) ** 2 for k in "HDA"))
    update_effect[f"G{rnd}"] = {
        "n": len(ms),
        "frozen_logloss": r4(mean(ll_old)), "updated_logloss": r4(mean(ll_new)),
        "frozen_brier": r4(mean(br_old)), "updated_brier": r4(mean(br_new)),
    }

# ── 4. Title-odds trajectory and what changed at each step ──────────────────
final = next(m for m in matches if m["stage"] == "F")
third = next(m for m in matches if m["stage"] == "3RD")
champion = final["winner"]
runner_up = final["away"] if final["winner"] == final["home"] else final["home"]
third_team = third["winner"]
fourth_team = third["away"] if third["winner"] == third["home"] else third["home"]

all_teams = list(moments[0]["ko_probs"].keys())
moment_rows = []
for md in moments:
    pc = {t: md["ko_probs"][t]["p_champion"] for t in all_teams}
    pf = {t: md["ko_probs"][t]["p_final"] for t in all_teams}
    ranked = sorted(all_teams, key=lambda t: -pc[t])
    contenders = [t for t in ranked if pc[t] > 0]  # drop teams already eliminated
    moment_rows.append({
        "moment": md["moment"], "label": md["label"], "predicts": md["predicts"],
        "p_champion": pc, "p_final": pf,
        "favorites": [{"team": t, "iso2": teams[t]["iso2"], "p": pc[t]} for t in contenders[:5]],
        "champion_rank": ranked.index(champion) + 1,
    })

focus = []
for r in moment_rows:
    for f in r["favorites"][:4]:
        if f["team"] not in focus:
            focus.append(f["team"])
for t in (champion, runner_up, third_team, fourth_team):
    if t not in focus:
        focus.append(t)

movers = {}
for i in range(1, 8):
    prev, cur = moment_rows[i - 1]["p_champion"], moment_rows[i]["p_champion"]
    d = sorted(((t, round(cur[t] - prev[t], 1)) for t in all_teams), key=lambda x: x[1])
    movers[str(i + 1)] = {
        "up": [{"team": t, "iso2": teams[t]["iso2"], "from": prev[t], "to": cur[t], "delta": dl}
               for t, dl in reversed(d[-3:]) if dl > 0],
        "down": [{"team": t, "iso2": teams[t]["iso2"], "from": prev[t], "to": cur[t], "delta": dl}
                 for t, dl in d[:3] if dl < 0],
    }


# ── 5. Surprises and per-step summaries ─────────────────────────────────────
def p_actual(m):
    """Probability the model gave to what actually happened: the 90-minute result for group
    games, who advanced for knockout ties (the same measure for every knockout tie)."""
    return m["p_result"] if m["stage"].startswith("G") else m["p_winner_adv"]


ranked_surprises = sorted(matches, key=p_actual)
surprises = [{"id": m["id"], "p": round(p_actual(m), 4)} for m in ranked_surprises[:8]]

steps = {}
for n, stage in STAGE_LOCKED_AT.items():
    ms = [m for m in matches if m["stage"] == stage]
    if stage.startswith("G"):
        called = sum(1 for m in ms if m["called_result"])
    else:
        called = sum(1 for m in ms if m["called_adv"])
    worst = min(ms, key=p_actual)
    steps[str(n)] = {"stage": stage, "n": len(ms), "called": called,
                     "biggest_surprise": {"id": worst["id"], "p": round(p_actual(worst), 4)}}

story = {
    "champion": champion, "runner_up": runner_up, "third": third_team, "fourth": fourth_team,
    "champion_iso": teams[champion]["iso2"], "runner_up_iso": teams[runner_up]["iso2"],
    "third_iso": teams[third_team]["iso2"], "fourth_iso": teams[fourth_team]["iso2"],
    "final_score": {"home": final["home"], "away": final["away"], "hs": final["home_score"],
                    "as": final["away_score"], "duration": final["duration"]},
    "stages": STAGES,
    "stage_moment": STAGE_MOMENT,
    "moments": moment_rows,
    "focus_teams": focus,
    "movers": movers,
    "steps": steps,
    "scorecard": {"stages": stage_cards, **overall},
    "update_effect": update_effect,
    "surprises": surprises,
    "baselines": {"logloss_1x2": round(math.log(3), 4), "brier_1x2": round(2 / 3, 4),
                  "logloss_adv": round(math.log(2), 4), "brier_adv": 0.25},
    "matches": matches,
}

out = DATA / "story.json"
with open(out, "w", encoding="utf-8") as f:
    json.dump(story, f, ensure_ascii=False, separators=(",", ":"))
print(f"wrote {out} ({out.stat().st_size / 1024:.0f} KB): {len(matches)} real matches")
print("champion:", champion, "| runner-up:", runner_up, "| third:", third_team, "| fourth:", fourth_team)
for s in STAGES:
    c = stage_cards[s]
    print(s, c.get("n"), "acc", c.get("accuracy"), "ll", c.get("logloss"), "advacc", c.get("adv_accuracy"),
          "advll", c.get("adv_logloss"))
print("groups", overall["groups"])
print("ko", overall["knockouts"])
print("update", update_effect)
print("surprises", surprises[:4])
