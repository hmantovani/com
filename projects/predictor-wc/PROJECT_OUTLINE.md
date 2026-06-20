# predictor-wc — Project Outline

## Folder Structure

```
world-cup/
└── predictor-wc/
    ├── data/
    │   └── matches.parquet          # single source: all international matches + Copa 2026 group stage
    ├── pipeline/
    │   ├── model.py                 # Poisson + GLM, outputs JSON predictions
    │   ├── form.py                  # recent form analysis per team
    │   └── generate.py              # master script: runs model → writes all HTML
    ├── templates/
    │   ├── base.html                # shared layout, nav, CSS
    │   ├── home.html                # project intro + group stage overview
    │   ├── round.html               # round predictions template (reused per round)
    │   └── knockout.html            # knockout bracket template
    ├── static/
    │   ├── flags/                   # country flag SVGs/PNGs (one per team)
    │   ├── style.css
    │   └── charts.js                # Chart.js or D3 for visualizations
    ├── output/                      # generated HTML files (what gets deployed)
    │   ├── index.html
    │   ├── round1.html
    │   ├── round2.html              # generated only after R1 results come in
    │   └── ...
    ├── copa2026_groups.json         # 12 groups (A–L), 48 teams, R1 pairings, iso2 codes
    └── Simulation.ipynb             # central modeling and prediction notebook
```

---

## Pages

| Page | Trigger | Content |
|------|---------|---------|
| `index.html` | Now | Project intro, tech stack, 12 group cards with team analysis (48 teams) |
| `round1.html` | Now | 24 match predictions |
| `round2.html` | After R1 ends + results entered | 24 match predictions |
| `round3.html` | After R2 ends | 24 match predictions |
| `ro32.html` | After groups end | 32 match bracket (top 2 per group + 8 best 3rd-place) |
| `ro16.html` | After RO32 | 16 matches |
| `qf.html` | After RO16 | 8 matches |
| `sf.html` | After QF | 4 matches |
| `final.html` | After SF | Final + 3rd place |

---

## Index Page (`index.html`) — Group Stage Hub

**Section 1 — About the Project**
- What it is, methodology summary (Elo + Poisson GLM), data sources (Kaggle results, eloratings.net)
- Short disclaimer: probabilistic model, not tips

**Section 2 — Group Cards (×12, A through L) — 48 teams total**
Each card contains:
- 4 team rows with: flag, team name, current Elo, Elo rank among all 48 Copa teams, last 10 results form bar (W/D/L colored dots), goals scored/conceded in last 10
- Group "favorite" badge (highest Elo in group)
- Predicted group winner + runner-up (model probabilities of advancing)

---

## Round Pages (`round1.html`, etc.)

**Per match card:**
- Header: flag + team name vs flag + team name, date, venue, city
- Elo bar: side-by-side Elo ratings with visual bar
- Outcome probabilities: horizontal stacked bar (Home Win / Draw / Away Win) + percentages
- Most likely scorelines: top 5 scorelines with their probabilities as a mini table
- Over/Under 2.5: model probability
- BTTS: model probability
- Form strip: last 10 results for each team (W/D/L dots, opponent, score)
- Short text blurb: 2–3 sentences auto-generated from model outputs

**Round summary at top:** total matches, date range, quick navigation to other rounds

---

## Model

- **Model A**: Poisson + Elo (full history, time-decayed)
- **Model B**: Poisson GLM with team fixed effects (2010+, time-decayed)
- **Ensemble**: 40% A + 60% B
- Outputs per match: 1X2 probs, top-N scorelines, O/U 2.5, BTTS
- Group advancement probabilities via Monte Carlo simulation (10k runs)

---

## Tech Stack

- **Python** (`Simulation.ipynb` → JSON exports → `generate.py`) — Jinja2 for templating
- **HTML/CSS** — clean, dark-themed, mobile-friendly
- **Chart.js** — outcome probability bars, Elo comparison charts
- **Flag images** — flagcdn.com (free CDN, no download needed, ISO 3166-1 alpha-2 codes)
- **No JS framework** — pure HTML files, deployable anywhere (GitHub Pages, Netlify, etc.)

---

## Data

- **Single file**: `data/matches.parquet` — 49,477 rows from 1872 to 2026-06-27
- **Columns**: date, home_team, away_team, home_score, away_score, tournament, city, country, neutral, home_elo_pre, away_elo_pre, home_elo_post, away_elo_post, elo_diff
- **Train split**: `date < 2026-06-11` → ~49,405 matches with scores
- **Test split**: `date >= 2026-06-11` + `tournament == "FIFA World Cup"` → 72 Copa 2026 group-stage matches (scores NaN until played, ELO pre-populated)

---

## Workflow for Each Round

1. Real results come in → update `data/matches.parquet` (fill in scores for completed matches)
2. Re-run `Simulation.ipynb` — model retrains on the new results automatically
3. Re-export JSONs (Section 7)
4. Re-run `generate.py` → new HTML pages written to `output/`
5. Deploy

---

## Simulation Notebook (`Simulation.ipynb`)

Central modeling hub. Sections:
- **S0** Config & Data — loads `matches.parquet`, defines train/test split, loads group config
- **S1** Team Arrival Profiles — ELO snapshot, ELO trajectory, recent form
- **S2** Group Overview — group tables ranked by ELO, competitiveness chart
- **S3** Model — Model A (Poisson+Elo), Model B (Poisson GLM with team fixed effects, 2010+), Ensemble (40%A + 60%B)
- **S4** Round 1 Predictions — scoreline heatmaps, outcome bars, per-match tables
- **S5** Monte Carlo — 10,000 group-stage simulations, advancement probabilities
- **S6** Tournament Simulation — full bracket simulation (RO32 → Final)
- **S7** JSON Export — writes prediction data for HTML generation
