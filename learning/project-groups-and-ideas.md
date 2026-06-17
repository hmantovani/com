---
title: "Portfolio Project Groups and Ideas — hmantovani.com"
type: project-catalog
status: expanded-brainstorm
created: 2026-06-17
tags: [learning, portfolio, football, power-bi, python, data-analysis, data-engineering, data-science]
related: [study-plan, football-vault, club-league-simulator]
---

# Portfolio Project Groups and Ideas — hmantovani.com

## How to read this document

An expanded catalog of project ideas for the portfolio section of the site, organized into 8 groups under 3 data macro-areas — **Data Analysis**, **Data Engineering**, and **Data Science**. The goal at this stage is variety: 20 ideas per group, with no commitment to execution. Consolidating down to a smaller number of groups/projects that actually get built happens later, by looking for common denominators among the chosen ideas.

Each project is described with: expected site URL (`hmantovani.com/group/project`), summary, data sources and where to collect them, expected output, skills involved, and why it could catch the attention of international (US, Canada, Europe) and domestic recruiters.

Current viability marking:
- 🟢 **executable today**, with no new skill required
- 🟡 **specific gap** — one specific new skill, low learning cost
- 🔴 **relevant gap** — heavier new stack, aligned with the `study-plan.md` roadmap

Every group contains at least one 🟢 project.

Strategic positioning: the site already presents itself as a multidisciplinary "Data Professional" (not just an Analyst, Engineer, or Scientist), with prior experience at IBM, Keyence, and Thermo Fisher Scientific. The split into 3 macro-areas reinforces this full-pipeline narrative — from extraction to predictive model — instead of premature specialization in a single role, widening the range of freelance and contract opportunities without losing perceived technical depth in any layer.

The entire site and each project's notebooks/visualizations will be bilingual (PT-BR / EN), reinforcing personal brand in Brazil and international employability simultaneously.

---

# MACRO-AREA: DATA ANALYSIS

## Group 1 — `/football` (Data Analysis applied to a sports domain)

**1. 🟢 `/football/world-cup-2026-predictor`**
2026 World Cup prediction by phase, with a moving cutoff date — after each completed matchday, the real results feed back in as training data and the model predicts the next phase (8 prediction moments: R1, R2, R3, round of 32, round of 16, quarterfinals, semifinals, final/3rd place), comparing at the end how early each result was correctly called.
**Data**: Kaggle international football results, Elo ratings from international-football.net, odds via The Odds API.
**Expected output**: a site with prediction history by phase and a calibration chart (accuracy vs. how far in advance the prediction was made).
**Skills**: Python, pandas, probabilistic modeling (Poisson/Elo), data visualization.
**Appeals to recruiters because**: it's the flagship project of the portfolio — it combines statistical rigor, real-time data consumption, and honest model self-evaluation, something rare even in more advanced portfolios.

**2. 🟡 `/football/club-league-simulator`**
"Alternate reality" simulation of an already-finished club league, via Monte Carlo (Dixon-Coles + Rue-Salvesen), with a matchday-by-matchday navigable Live Sim and a statistical Distribution View.
**Data**: Transfermarkt (squad and competition stats) or an equivalent Kaggle dataset.
**Expected output**: a static site serving thousands of pre-computed iterations in Parquet, consumed client-side.
**Skills**: Python, advanced statistics (Dixon-Coles, Rue-Salvesen), DuckDB-WASM, zero-backend architecture.
**Gap**: DuckDB-WASM on the frontend to serve Parquet with no server — a short curve for someone who already codes.
**Appeals to recruiters because**: "academic paper"-level modeling combined with zero-hosting-cost architecture — signals engineering maturity, not just data science.

**3. 🟢 `/football/elo-explorer`**
Interactive historical viewer of a national team's Elo curve over time, with marked events (World Cups, eliminations, upsets), allowing comparison between two national teams.
**Data**: reuses the dataset from project 1.
**Expected output**: an interactive chart with historical narrative.
**Skills**: data visualization (D3/Recharts), data storytelling.
**Appeals to recruiters because**: a quick production piece that demonstrates the ability to extract narrative from raw data — a good entry-level project before the heavier ones.

**4. 🟡 `/football/knockout-bracketology`**
Monte Carlo re-simulation of a real knockout stage (Champions League, Copa Libertadores, World Cup), generating a heatmap of likely matchups and the probability of each team reaching the final.
**Data**: real bracket + Elo/Dixon-Coles already calculated in project 1.
**Expected output**: interactive heatmap + "easiest/hardest path" through the bracket.
**Skills**: Monte Carlo, data visualization.
**Appeals to recruiters because**: high visual impact for low production effort — good thumbnail/first-impression material for the portfolio.

**5. 🟡 `/football/transfer-market-trends`**
Exploratory analysis of transfer market trends (value inflation by position/age/league over the years), with interactive dashboards.
**Data**: Transfermarkt (historical market values).
**Expected output**: an analytical report with time-trend visualizations.
**Skills**: exploratory analysis, visualization, storytelling.
**Gap**: no critical technical gap — the gap is in the availability/collection of historical data at scale.
**Appeals to recruiters because**: it applies time-series analysis and market inflation reasoning, directly transferable to price analysis in any industry.

**6. 🟢 `/football/home-advantage-study`**
Statistical study on the magnitude of "home advantage" in world football — comparing leagues, decades, and the effect of empty stadiums (the pandemic period as a natural experiment).
**Data**: Kaggle international/club football results.
**Expected output**: a report with hypothesis tests and comparative visualization across contexts.
**Skills**: inferential statistics, hypothesis testing, Python.
**Appeals to recruiters because**: it shows causal reasoning, not just correlation — an analytical skill valued in Data Analyst/Scientist interviews.

**7. 🟡 `/football/referee-bias-dashboard`**
Dashboard analyzing referee patterns (cards, penalties, added time) by referee and by game context.
**Data**: match event data (Kaggle, or open sports statistics sources).
**Expected output**: an interactive dashboard with rankings and patterns by referee.
**Skills**: match event data aggregation, interactive visualization.
**Gap**: the granularity of event data may require more careful handling of incomplete sources.
**Appeals to recruiters because**: a topic with sports-media appeal, good for demonstrating the ability to communicate sensitive findings with statistical responsibility.

**8. 🟢 `/football/squad-age-curve`**
Analysis of player performance-by-age curves (peak performance by position), comparing historical and current data.
**Data**: Transfermarkt or a Kaggle player statistics dataset.
**Expected output**: an age-vs-performance curve chart by position, with confidence intervals.
**Skills**: nonlinear regression, statistical visualization.
**Appeals to recruiters because**: it applies classic statistical modeling (aging curves) also used in People Analytics and HR — a bridge to another industry.

**9. 🟡 `/football/expected-goals-explainer`**
Own (simplified) implementation of an Expected Goals (xG) model from shot event data, with a didactic, bilingual explanation of the model.
**Data**: public shot event dataset (StatsBomb open data or equivalent).
**Expected output**: a custom xG model + comparison against officially published xG from public sources.
**Skills**: machine learning (probabilistic classification), feature engineering.
**Gap**: the granularity of event data requires more careful handling.
**Appeals to recruiters because**: xG is the best-known sports analytics model on the market — implementing it from scratch (not just consuming it) proves deep understanding, not surface familiarity.

**10. 🟢 `/football/world-cup-historical-atlas`**
Interactive atlas of every World Cup ever played — hosts, champions, top scorers, format evolution — as a historical data storytelling piece.
**Data**: Kaggle international football (World Cup history).
**Expected output**: a navigable interactive timeline.
**Skills**: data visualization, storytelling, interface design.
**Appeals to recruiters because**: a visually attractive project with relatively fast production, a good "light" complement alongside the heavier modeling projects.

**11. 🟡 `/football/league-competitive-balance-index`**
A custom index of competitive balance between leagues (how predictable the champion/relegation outcome is in each league, compared across countries and decades).
**Data**: Kaggle club football results, multiple leagues.
**Expected output**: a ranking of leagues by competitive balance, with documented methodology.
**Skills**: building a custom index/score, comparative statistics.
**Gap**: no critical technical gap — the gap is in designing a defensible index methodology.
**Appeals to recruiters because**: creating a custom metric and defending it methodologically is exactly the kind of exercise that shows up in Data Scientist interview case studies.

**12. 🟡 `/football/injury-impact-analysis`**
Analysis of the impact of key player injuries on team performance (before/during/after the injury), with a statistical control group.
**Data**: a combination of injury data (open sports sources) with match results.
**Expected output**: a report with causal impact analysis (difference-in-differences or a similar method).
**Skills**: applied causal inference, quasi-experimental design.
**Gap**: injury data is sparser and requires more manual curation.
**Appeals to recruiters because**: causal inference is a higher-level skill, often a differentiator in senior Data Scientist roles.

**13. 🟢 `/football/national-team-elo-rankings-explorer`**
Interactive Elo ranking of all national teams, navigable by date, filterable by confederation/continent.
**Data**: international-football.net Elo ratings.
**Expected output**: a navigable interactive table/chart over time.
**Skills**: interactive visualization, time-series manipulation.
**Appeals to recruiters because**: it reuses data already collected for other projects, an excellent effort-to-output ratio for filling out the grid quickly.

**14. 🟡 `/football/playing-style-clustering`**
Clustering of teams by playing style (possession, pressing, transition) using aggregated match statistics.
**Data**: advanced match statistics dataset (StatsBomb open data or equivalent).
**Expected output**: a playing-style cluster map, with visually similar teams grouped together.
**Skills**: unsupervised learning (k-means, PCA), dimensionality reduction.
**Gap**: no critical technical gap, but requires a dataset with tactical granularity.
**Appeals to recruiters because**: clustering applied to an understandable domain (playing style) is easier to explain in an interview than clustering over an abstract dataset.

**15. 🔴 `/football/multiverse-engine`**
Chaining multiple simulated seasons with persistent state between them (promotion/relegation, squad value changes affecting the next simulation).
**Data**: direct extension of project 2.
**Expected output**: a navigable "universe," year by year.
**Skills**: persistent state architecture, managed database, AWS Lambda/S3.
**Gap**: the only project in the group that requires a lightweight persistent backend — aligned with Phase 4/5 of the roadmap.
**Appeals to recruiters because**: it signals long-term systems thinking, not just isolated scripts.

**16. 🟢 `/football/world-cup-qualifiers-tracker`**
A panel tracking ongoing continental qualifiers, with qualification probability calculated from the Elo model.
**Data**: Kaggle/Elo (same as project 1), updated periodically.
**Expected output**: an updatable panel with probabilities per national team.
**Skills**: Python, data update automation, visualization.
**Appeals to recruiters because**: a "living" project that updates with reality, showing the ability to keep a data product running over time, not just deliver it once.

**17. 🟡 `/football/manager-tenure-performance`**
A study of the relationship between coaching tenure length and team performance, identifying "honeymoon effect" and decline patterns.
**Data**: historical coach-by-club data (open sports sources) cross-referenced with results.
**Expected output**: a visualization of performance by month of tenure, aggregated across multiple cases.
**Skills**: aligning time series with events (coaching change), descriptive statistics.
**Gap**: curating coaching tenure data requires manual collection work.
**Appeals to recruiters because**: a topic of popular interest backed by statistical rigor — good for a public portfolio with sharing potential.

**18. 🟢 `/football/goal-timing-patterns`**
Analysis of within-match goal timing patterns (most likely minutes, the effect of early vs. late goals, comeback patterns).
**Data**: Kaggle club/international football with goal timestamps.
**Expected output**: a histogram and distribution analysis of goal timing.
**Skills**: distribution analysis, statistical visualization.
**Appeals to recruiters because**: a simple, fast-to-produce project, good for "filling out" the initial grid with quality at low effort.

**19. 🔴 `/football/video-highlight-classifier`**
A classifier for relevant events (goal, card, dangerous foul) from broadcast metadata or text match commentary, without necessarily processing raw video.
**Data**: match commentary/live-blog text (open sports sources).
**Expected output**: a text-based event classifier, with precision/recall metrics.
**Skills**: NLP, text processing, supervised classification.
**Gap**: applied NLP is an additional stack not covered in the current roadmap — a future expansion.
**Appeals to recruiters because**: it brings the portfolio closer to NLP/applied AI, an area of growing demand, without relying on heavy computer vision.

**20. 🟡 `/football/competitive-balance-world-cup-history`**
A study of how the competitiveness level of the World Cup has evolved historically (goal difference, upsets, Elo gap between matchups), connecting to project 1 as historical context for model calibration.
**Data**: reuses datasets from projects 1 and 13.
**Expected output**: a historical report complementing the main predictor.
**Skills**: historical time-series analysis, comparative visualization.
**Appeals to recruiters because**: it functions as a context/authority piece alongside the flagship project, reinforcing depth of domain knowledge on the topic.

---

## Group 2 — `/power-bi` (Data Analysis focused on BI tooling)

**1. 🟢 `/power-bi/personal-finance-cockpit`**
A personal finance dashboard (spending, investments, goals), fed by manually exported statements or Open Finance.
**Data**: personal statements (CSV) or Brazilian Open Finance API.
**Expected output**: a report with advanced DAX (moving averages, goal vs. actual).
**Skills**: Power BI, DAX, star-schema data modeling.
**Appeals to recruiters because**: it covers the fundamentals that practically every junior/mid BI role requires — DAX for time intelligence and financial modeling.

**2. 🟡 `/power-bi/wc2026-fan-analytics`**
A public dashboard about the 2026 World Cup — national team statistics, historical comparison, favoritism according to the numbers — reusing data from the Football group in traditional BI format.
**Data**: reuses datasets from the `/football` group.
**Expected output**: a publishable report, eventually embeddable on the site.
**Skills**: advanced DAX (time intelligence, what-if parameters), Power BI Embedded.
**Gap**: what-if parameters and embedding require some additional practice.
**Appeals to recruiters because**: same data source as the Football flagship project, demonstrating fluency in the most-requested tool in Data Analyst job postings — double the value from the same data-collection work.

**3. 🟢 `/power-bi/job-market-tracker`**
A tracking dashboard for one's own target job market (remote Data roles, by country/skill/salary range), updated periodically.
**Data**: manual or semi-automated aggregation from public job boards.
**Expected output**: a personal market-intelligence panel, reusable during the job search.
**Skills**: Power Query, data modeling, DAX.
**Appeals to recruiters because**: an interesting meta-project to mention in an interview — "I built a dashboard to understand the very market I'm targeting" communicates proactiveness.

**4. 🟢 `/power-bi/personal-productivity-dashboard`**
A personal habits and productivity dashboard (study hours, commits, progress on the learning roadmap), connected to GitHub and manual logs.
**Data**: GitHub API, personal study-time logs.
**Expected output**: a panel tracking one's own learning roadmap.
**Skills**: Power BI, REST APIs, DAX.
**Appeals to recruiters because**: a short and genuinely useful project (one you'd actually use), demonstrating self-tracking automation and discipline.

**5. 🟡 `/power-bi/sales-funnel-simulator`**
A simulated B2B sales funnel dashboard (lead → qualification → proposal → close), with realistic synthetic data, to demonstrate fluency in classic business metrics.
**Data**: procedurally generated synthetic data (no real company involved).
**Expected output**: a funnel dashboard with conversion rates by stage, cohort analysis.
**Skills**: DAX (cohort analysis), funnel modeling.
**Gap**: cohort analysis in DAX requires specific practice with more advanced formulas.
**Appeals to recruiters because**: a sales funnel is the type of dashboard most often requested in practical BI interviews for commercial/SaaS roles — a project targeted at that specific audience.

**6. 🔴 `/power-bi/realtime-ops-dashboard`**
An operational dashboard simulating near-real-time data, using DirectQuery or a streaming dataset.
**Data**: a simulated real-time event source (a custom synthetic data generator).
**Expected output**: a dashboard that updates automatically, not just a static report.
**Skills**: Power BI streaming dataset, real-time data architecture, possibly AWS Kinesis/Lambda.
**Gap**: streaming architecture is an additional stack, aligned with Phase 4 of the roadmap (Applied AWS).
**Appeals to recruiters because**: most BI portfolios only show static dashboards — demonstrating streaming is a real differentiator for roles that mention real-time data pipelines.

**7. 🔴 `/power-bi/databricks-lakehouse-demo`**
Power BI connected to a Databricks lakehouse (bronze/silver/gold layers), using one of the football datasets as the source.
**Data**: reuses datasets from the `/football` group.
**Expected output**: a complete "raw data to dashboard" case study passing through medallion architecture.
**Skills**: Databricks, medallion architecture, Power BI.
**Gap**: Databricks was explicitly left out of the current roadmap — a future expansion project, not a current priority.
**Appeals to recruiters because**: Databricks shows up constantly in researched data engineer job postings — a rare credential for someone coming from a pure Excel/Power BI background.

**8. 🟢 `/power-bi/sql-vs-dax-comparison-notebook`**
Bilingual didactic material comparing how to solve the same analytical problem in plain SQL vs. DAX, side by side, as a teaching piece and proof of cross-fluency between the two languages.
**Data**: a small, didactic dataset (e.g., fictional sales or simple public data).
**Expected output**: a publishable comparative notebook/article.
**Skills**: SQL, DAX, technical teaching.
**Appeals to recruiters because**: educational content is a great signal of deep mastery — those who teach well prove they truly understand, not just execute.

**9. 🟡 `/power-bi/customer-churn-dashboard`**
A predictive customer churn dashboard (with a simple propensity model integrated via a Power BI + Python visual), using a public churn dataset.
**Data**: a public churn dataset (e.g., the widely available telecom churn dataset).
**Expected output**: a dashboard with a churn risk score per customer.
**Skills**: Power BI, Python integration (Python script visual), simple predictive modeling.
**Gap**: Power BI + Python integration requires specific environment configuration.
**Appeals to recruiters because**: churn is one of the most requested case studies in Analytics/BI interviews for SaaS — a project targeted at that specific job niche.

**10. 🟢 `/power-bi/world-football-kpi-scorecard`**
An executive KPI scorecard for world football (goals per game by league, average squad age, aggregate market value), in management-report format.
**Data**: reuses datasets from the `/football` group.
**Expected output**: an "executive scorecard"-style report, didactic and direct.
**Skills**: Power BI, executive dashboard design.
**Appeals to recruiters because**: it demonstrates the ability to simplify complex data for a non-technical audience — a frequently underestimated and highly valued skill.

**11. 🟡 `/power-bi/inventory-supply-chain-demo`**
A supply chain/inventory dashboard (inventory turnover, stockouts, supplier lead time), with realistic synthetic data.
**Data**: procedurally generated synthetic data.
**Expected output**: an operational supply chain dashboard.
**Skills**: DAX, operational data modeling.
**Gap**: supply chain modeling requires specific domain understanding (lead time, reorder point).
**Appeals to recruiters because**: the industrial sector (aligned with prior Keyence/Thermo Fisher experience) is a strong connection point to real professional history.

**12. 🟢 `/power-bi/personal-investment-vs-benchmark`**
A dashboard comparing personal investment portfolio performance against benchmarks (CDI, IBOVESPA, S&P 500).
**Data**: personal portfolio data + public quote APIs (Yahoo Finance, Brapi.dev).
**Expected output**: a relative performance report with a drawdown chart.
**Skills**: Power BI, DAX, financial APIs.
**Appeals to recruiters because**: a direct bridge to the `/quant` group, reinforcing domain consistency (personal finance) across two different tools.

**13. 🔴 `/power-bi/multi-source-data-warehouse-demo`**
A dashboard fed by a small personal data warehouse (Postgres + dbt + Power BI), consolidating multiple sources (football, finance, productivity) into a single model.
**Data**: consolidation of multiple datasets already existing in other groups.
**Expected output**: a personal "single source of truth" case study.
**Skills**: dbt, Postgres, Power BI, dimensional modeling.
**Gap**: depends on Phase 3 of the roadmap (dbt) being mature.
**Appeals to recruiters because**: it demonstrates end-to-end data architecture understanding, not just the visualization layer — a synthesis project for the entire roadmap.

**14. 🟢 `/power-bi/excel-to-power-bi-migration-case`**
A documented case study migrating a complex Excel spreadsheet (with formulas and pivot tables) to an equivalent Power BI model, explaining performance and maintainability gains.
**Data**: an already-existing personal spreadsheet as the starting point.
**Expected output**: a before/after comparative article/case study.
**Skills**: advanced Excel, Power BI, technical communication.
**Appeals to recruiters because**: many companies (especially SMBs) still live through this transition — a practical migration case study is a direct sales argument for freelance clients.

**15. 🟡 `/power-bi/geospatial-analysis-demo`**
A dashboard with geospatial analysis (heatmaps, density) applied to a topic of interest (e.g., geographic distribution of football clubs, or of investors by region).
**Data**: own geocoded data or a public dataset with coordinates.
**Expected output**: an interactive map with density layers.
**Skills**: Power BI (map visual, ArcGIS integration), basic geocoding.
**Gap**: advanced geospatial visuals require specific practice.
**Appeals to recruiters because**: geospatial analysis is often underused in BI portfolios — visual and technical differentiation.

**16. 🟢 `/power-bi/ab-test-results-dashboard`**
A dashboard presenting A/B test results (statistical significance, confidence interval, decision recommendation), with synthetic example data for a didactic experiment.
**Data**: procedurally generated synthetic data simulating an experiment.
**Expected output**: a reusable A/B test report template.
**Skills**: DAX, basic inferential statistics, decision-dashboard design.
**Appeals to recruiters because**: A/B tests are a common language across product, marketing, and data — showing fluency at that interface widens the range of eligible roles.

**17. 🟡 `/power-bi/hr-people-analytics-demo`**
A People Analytics dashboard (turnover, average tenure, salary distribution by seniority), with synthetic data.
**Data**: procedurally generated synthetic data.
**Expected output**: an executive HR dashboard.
**Skills**: DAX, HR data modeling.
**Gap**: HR domain modeling requires understanding specific metrics (turnover, headcount).
**Appeals to recruiters because**: People Analytics is a growing niche with few specialized Power BI professionals — niche differentiation.

**18. 🟢 `/power-bi/dax-pattern-library`**
A personal documented library of reusable DAX patterns (time intelligence, dynamic ranking, what-if parameters), in bilingual reference format.
**Data**: no external data — it's technical reference material.
**Expected output**: a DAX pattern reference repository/article.
**Skills**: advanced DAX, technical documentation.
**Appeals to recruiters because**: well-documented reference material works as proof of depth and also generates organic search traffic (technical SEO) for the site.

**19. 🔴 `/power-bi/embedded-analytics-saas-demo`**
A demonstration of Power BI Embedded inside a custom web application (e.g., embedded in the `club-league-simulator` React app), simulating a white-label analytics product.
**Data**: reuses datasets from the `/football` group.
**Expected output**: a web application with an embedded Power BI dashboard.
**Skills**: Power BI Embedded, web development, API authentication.
**Gap**: Power BI Embedded requires licensing and more advanced API configuration.
**Appeals to recruiters because**: embedded analytics is a high-value skill for "Analytics Engineer" roles in SaaS products — combines BI with product development.

**20. 🟡 `/power-bi/prediction-market-calibration-study`**
*(Renamed and reframed — see note)* A market efficiency study comparing implied probabilities from different public odds sources against the custom Elo model, framed purely as an academic/statistical market-efficiency exercise, with no betting operation involved.
**Data**: The Odds API (public odds lookup) + the Elo model from the `/football` group.
**Expected output**: an academic-style report on the efficiency/calibration of sports prediction markets.
**Skills**: calibration statistics, DAX, comparative visualization.
**Gap**: no critical technical gap.
**Appeals to recruiters because**: prediction markets are a legitimate econometric research topic — as long as the framing stays strictly analytical/academic (market efficiency, probability calibration), it connects with risk/pricing roles without any association with betting operations.

> **Review note**: this last item was kept only as a market-efficiency/statistical-calibration study. If the framing still feels too close to betting, it's recommended to either replace it with a variation such as "a calibration study comparing multiple public implied-probability sources for sports prediction models," or to remove it from the final consolidated list.

---

# MACRO-AREA: DATA ENGINEERING

## Group 3 — `/data-pipelines` (ETL, ingestion, automation)

**1. 🟢 `/data-pipelines/api-sync-bridge`**
Public documentation, as a portfolio case study, of a bidirectional sync between two systems via webhook + AWS Lambda (already implemented in a real context previously), generalized so as not to expose any sensitive client data.
**Data**: nothing to collect — the logic already exists and has been validated in production.
**Expected output**: an architecture diagram + code + an explanation of idempotency, retries, and webhook handling.
**Skills**: AWS Lambda, webhooks, bidirectional sync design.
**Appeals to recruiters because**: real, already-in-production proof of the kind of system-integration problem that constantly shows up in Data/Integration Engineer roles.

**2. 🟡 `/data-pipelines/football-data-etl-pipeline`**
A collection and transformation pipeline documented as a case study, using data from the `/football` group, with a staging and marts layer via dbt.
**Data**: Transfermarkt / Kaggle (same as the `/football` group).
**Expected output**: a reproducible pipeline, raw data → clean Parquet → ready for consumption.
**Skills**: dbt, SQL, Python, Parquet.
**Gap**: depends on Phase 3 of the roadmap (dbt).
**Appeals to recruiters because**: dbt constantly shows up alongside Airflow/Snowflake/BigQuery in data engineer job postings — it's the bridge tool between an analyst profile and an engineer profile.

**3. 🟢 `/data-pipelines/personal-data-aggregator`**
A pipeline aggregating scattered personal data (bank statements, GitHub, calendar) into a single structured repository, with periodic updates via a scheduled script.
**Data**: personal sources (statement exports, GitHub API, Google Calendar API).
**Expected output**: a repository of personal data, automatically and centrally kept up to date.
**Skills**: Python, REST APIs, scheduling automation (cron).
**Appeals to recruiters because**: it demonstrates end-to-end automation with simple tools — a good entry project for someone moving from an analyst to an engineer profile.

**4. 🔴 `/data-pipelines/orchestrated-multi-source-pipeline`**
Airflow orchestration of two or more existing pipelines, with dependencies between them (e.g., pipeline B only runs after pipeline A completes and is validated).
**Data**: reuses pipelines already existing in other projects in the group.
**Expected output**: visible DAGs, execution history, documented automatic retry.
**Skills**: Airflow, Docker Compose, cross-DAG dependency design.
**Gap**: depends on Phase 5 of the roadmap.
**Appeals to recruiters because**: Airflow shows up as a "top skill" in practically every remote data engineer job posting researched — likely the single skill that most separates "knows Python" from "is a data engineer" in the international market.

**5. 🟡 `/data-pipelines/cloud-native-ingestion-demo`**
A batch pipeline running on managed AWS services (S3 + Glue, or scheduled Lambda + Athena), processing a football dataset at scale.
**Data**: reuses datasets from the `/football` group.
**Expected output**: a documented serverless pipeline, with architecture and costs explained.
**Skills**: AWS S3, Glue, Athena, Lambda.
**Gap**: depends on Phase 4 of the roadmap.
**Appeals to recruiters because**: it aligns directly with the practical experience that shows up most in researched remote data engineering job postings — ingestion and transformation in the cloud.

**6. 🟢 `/data-pipelines/web-scraping-toolkit`**
A custom toolkit (reusable library) for scraping that respects rate limits and terms of use, with error handling, exponential retry, and structured logging.
**Data**: various public sources, depending on the consuming project.
**Expected output**: a documented and tested Python library, reusable across other portfolio projects.
**Skills**: Python, requests/httpx, reusable library design, ethical scraping best practices.
**Appeals to recruiters because**: a cross-cutting tool used across almost every other group — shows code-reuse thinking, not just throwaway scripts.

**7. 🟡 `/data-pipelines/data-quality-monitoring-dashboard`**
A data quality monitoring panel (null rate, duplicates, schema drift) applied to one of the already-existing pipelines, with automatic alerts.
**Data**: reuses existing pipelines as the telemetry source.
**Expected output**: a data observability dashboard with quality history over time.
**Skills**: dbt tests, Python, basic alerting.
**Gap**: partially depends on Phase 3 (dbt tests).
**Appeals to recruiters because**: data observability is a rising topic in data engineering roles — few junior/mid portfolios explicitly cover it.

**8. 🟢 `/data-pipelines/csv-to-database-migration-tool`**
A command-line tool that migrates disorganized CSV/Excel files into a clean relational schema, with automatic type inference and validation.
**Data**: personal disorganized files as a test case (e.g., old spreadsheets).
**Expected output**: a reusable, documented CLI, publishable as a small open-source tool.
**Skills**: Python, SQL, CLI design, data validation.
**Appeals to recruiters because**: it solves an extremely common problem at small/mid-size companies still living in spreadsheets — a strong sales argument for freelance clients.

**9. 🟡 `/data-pipelines/incremental-load-pattern-demo`**
A documented demonstration of the incremental load pattern in dbt, comparing full refresh vs. incremental in terms of cost and execution time.
**Data**: reuses the `/football` group dataset at simulated increasing scale.
**Expected output**: an article/case study comparing load strategies with real metrics.
**Skills**: dbt (incremental materializations), SQL.
**Gap**: depends on Phase 3 of the roadmap.
**Appeals to recruiters because**: incremental loading is a specific technical topic frequently asked about in Analytics Engineer interviews — reference material proves practical, not just theoretical, mastery.

**10. 🟢 `/data-pipelines/notification-automation-bot`**
An automation bot that monitors a data source (e.g., a match result update, new market data) and sends a structured notification (email, Slack, Telegram) when a condition is met.
**Data**: any data source already monitored in other projects.
**Expected output**: a functional bot running on a schedule, with a history of notifications sent.
**Skills**: Python, notification APIs, scheduling automation.
**Appeals to recruiters because**: it combines data + automation + system integration in a short, demonstrable project — good for quickly showing versatility.

**11. 🔴 `/data-pipelines/change-data-capture-demo`**
A demonstration of simplified Change Data Capture (CDC) between two databases, capturing incremental changes without reprocessing the entire base.
**Data**: personal test databases (local Postgres via Docker).
**Expected output**: a documented, functional CDC pipeline, explaining trade-offs versus a full load.
**Skills**: Postgres, Docker, CDC concepts (logical replication or a tool like Debezium).
**Gap**: CDC is an additional stack not directly covered in the current roadmap — a future expansion.
**Appeals to recruiters because**: CDC showed up in researched data engineer job postings as a more senior-level skill — differentiation for roles above junior level.

**12. 🟢 `/data-pipelines/etl-error-handling-patterns`**
Reference material documenting error-handling patterns in ETL pipelines (retry, conceptual dead-letter queue, idempotency), applied to the portfolio's own pipelines.
**Data**: no external data — reference material based on the projects themselves.
**Expected output**: a bilingual best-practices guide, publishable as a technical article.
**Skills**: Python, resilient systems design, technical communication.
**Appeals to recruiters because**: best-practices articles tend to engage well and demonstrate engineering maturity beyond the code itself.

**13. 🟡 `/data-pipelines/api-rate-limit-handler`**
A library/case study on correctly handling external API rate limiting (exponential backoff, request queueing, local caching), applied to one of the APIs already used in the portfolio.
**Data**: no new external data — reuses existing integrations.
**Expected output**: a reusable library + documentation of design decisions.
**Skills**: Python, small-scale distributed systems design, caching.
**Gap**: no critical technical gap, but requires solid theoretical grounding in rate limiting.
**Appeals to recruiters because**: handling rate limits well is the kind of detail that separates amateur from professional code — proof of maturity in external API integration.

**14. 🟢 `/data-pipelines/scheduled-report-generator`**
An automatic generator of periodic reports (PDF/HTML) from a data source, emailed on a scheduled time, with no manual intervention.
**Data**: reuses any dataset already existing in the portfolio.
**Expected output**: a functional automated report, generated and distributed without human action.
**Skills**: Python, document generation (PDF/HTML), scheduling automation, email sending.
**Appeals to recruiters because**: report automation is an extremely common task requested by small-business freelance clients — high direct commercial potential.

**15. 🔴 `/data-pipelines/data-lake-architecture-case-study`**
A complete architectural case study (not necessarily implemented at real scale) describing how a data lake would be designed to consolidate all the portfolio's datasets, with raw/staging/curated layers.
**Data**: conceptual, based on datasets already existing in the portfolio.
**Expected output**: a detailed architecture document, with diagrams, decision justifications, and cost estimates.
**Skills**: data architecture, AWS S3, data lake design.
**Gap**: depends on combined mastery of Applied AWS (Phase 4) and a broader architectural view.
**Appeals to recruiters because**: well-written architecture documents are often what separates senior from mid-level candidates in interviews — it demonstrates system vision, not just one-off execution.

**16. 🟢 `/data-pipelines/git-based-data-versioning-demo`**
A demonstration of versioning data (not just code) using Git + DVC or an equivalent simple strategy, applied to one of the portfolio's Parquet datasets.
**Data**: reuses already-existing Parquet files.
**Expected output**: a repository demonstrating a dataset's version history, with meaningful documented diffs.
**Skills**: advanced Git, data versioning, Parquet.
**Appeals to recruiters because**: data versioning is a growing practice in MLOps/DataOps — few junior portfolios explicitly demonstrate it.

**17. 🟡 `/data-pipelines/dead-simple-feature-store`**
A simplified implementation of the feature store concept (a centralized repository of reusable features across models), using features already computed for the models in the `/football` and `/quant` groups.
**Data**: reuses features already computed in other projects.
**Expected output**: a small service/library that centralizes and versions reusable features.
**Skills**: Python, simple API design, Postgres/Parquet as storage.
**Gap**: no critical technical gap, but requires careful interface design.
**Appeals to recruiters because**: feature stores are a central concept in modern MLOps — implementing a simplified version proves understanding of production ML architecture, not just an isolated notebook.

**18. 🟢 `/data-pipelines/multi-format-data-converter`**
A data format conversion tool (CSV, JSON, Parquet, Excel) with performance and size benchmarking between them, as a didactic piece.
**Data**: datasets already existing in the portfolio, in multiple formats.
**Expected output**: a CLI tool + a comparative performance article between formats.
**Skills**: Python, pandas, Parquet, benchmarking.
**Appeals to recruiters because**: a well-done comparative article (e.g., "why Parquet is X times faster than CSV for this case") is high-engagement technical content and proves an understanding of storage fundamentals.

**19. 🔴 `/data-pipelines/streaming-ingestion-prototype`**
Prototyping streaming data ingestion (not just batch), using a simulated real-time event source.
**Data**: a custom generator of synthetic real-time events.
**Expected output**: a documented simple streaming ingestion pipeline, with a discussion of trade-offs versus batch.
**Skills**: streaming concepts (Kafka or a lightweight alternative), Python.
**Gap**: streaming is an additional stack not covered in the current roadmap — a clear future expansion.
**Appeals to recruiters because**: streaming shows up in the more advanced/senior job postings researched — a frontier project that signals an ambition for continuous technical growth.

**20. 🟢 `/data-pipelines/portfolio-pipeline-meta-dashboard`**
A "meta" dashboard showing the health status of every pipeline in the portfolio itself (last run, success rate, average runtime), as proof that the projects aren't just static demos but living, maintained systems.
**Data**: telemetry from the portfolio's own pipelines.
**Expected output**: a single observability panel for the entire project ecosystem.
**Skills**: Python, log aggregation, visualization.
**Appeals to recruiters because**: it's the definitive proof that the portfolio is actively maintained, not a set of projects abandoned after the first delivery — a rare and highly valued signal for anyone reviewing a technical portfolio.

---

## Group 4 — `/cloud-infrastructure` (Applied AWS, architecture)

**1. 🟢 `/cloud-infrastructure/lambda-webhook-bridge-writeup`**
Detailed, didactic technical documentation (not just the case study, but the "how to do it") of how to build a sync bridge via Lambda + webhook from scratch, as a bilingual tutorial article.
**Data**: none — based on already-validated practical experience.
**Expected output**: a publishable tutorial, with architecture diagrams and reusable code snippets.
**Skills**: AWS Lambda, webhooks, technical communication.
**Appeals to recruiters because**: quality tutorial content is the kind of material that builds technical authority via SEO/sharing, in addition to directly proving competence.

**2. 🟡 `/cloud-infrastructure/s3-data-lake-foundations`**
Structuring a small personal data lake in S3 (raw/processed/curated layers) hosting all the datasets from the other portfolio projects.
**Data**: consolidation of already-existing datasets.
**Expected output**: a documented bucket structure, with lifecycle policies and consistent naming.
**Skills**: AWS S3, data lake organization.
**Gap**: depends on Phase 4 of the roadmap.
**Appeals to recruiters because**: it's the infrastructure foundation that supports multiple other projects — efficient in effort because it's widely reused.

**3. 🟡 `/cloud-infrastructure/athena-query-cost-optimization-study`**
A practical study of Athena query cost optimization (partitioning, columnar format, compression), with real before/after measurements.
**Data**: Parquet datasets already existing in S3.
**Expected output**: an article with real measurements of cost and query-time savings.
**Skills**: AWS Athena, data partitioning, cloud cost optimization.
**Gap**: depends on Phase 4 of the roadmap.
**Appeals to recruiters because**: cloud cost optimization (basic FinOps) is an increasingly valued skill — an article with real numbers is concrete, not theoretical, proof.

**4. 🟢 `/cloud-infrastructure/serverless-cost-calculator`**
A custom calculator (a simple application) that estimates the monthly cost of a serverless architecture (Lambda + S3 + Athena) based on usage parameters provided by the user.
**Data**: public AWS pricing tables.
**Expected output**: an interactive cost-estimation tool, also useful for planning other portfolio projects.
**Skills**: Python or JavaScript, knowledge of the AWS pricing model.
**Appeals to recruiters because**: a practical tool that demonstrates understanding of cloud cost beyond just technical use — relevant for any role involving budget responsibility for infrastructure.

**5. 🔴 `/cloud-infrastructure/infrastructure-as-code-intro`**
A first experience with Infrastructure as Code (Terraform or AWS CDK) to provision the infrastructure of an already-existing project (e.g., the S3 + Lambda from `api-sync-bridge`), instead of creating it manually via the console.
**Data**: none — reuses already-existing infrastructure, now versioned as code.
**Expected output**: a repository with fully reproducible infrastructure via code.
**Skills**: Terraform or AWS CDK, infrastructure versioning.
**Gap**: IaC is not in the current roadmap — a natural expansion after Phase 4, but outside the currently agreed scope.
**Appeals to recruiters because**: IaC is frequently cited as the differentiator between "knows how to use the cloud" and "knows how to operate the cloud as an engineer" — constantly mentioned in DevOps/Cloud Engineer job postings.

**6. 🟡 `/cloud-infrastructure/glue-catalog-metadata-explainer`**
Didactic material explaining the role of the Glue Data Catalog in data lake architecture, with a practical example applied to one of the portfolio's datasets.
**Data**: datasets already existing in S3.
**Expected output**: a bilingual didactic article + a working catalog example.
**Skills**: AWS Glue, data lake metadata.
**Gap**: depends on Phase 4 of the roadmap.
**Appeals to recruiters because**: Glue is constantly mentioned in researched remote data engineering job postings — didactic material about it adds technical authority.

**7. 🟢 `/cloud-infrastructure/lambda-cold-start-benchmark`**
A self-run experimental study on Lambda cold starts (impact of language, package size, configured memory), with real collected data.
**Data**: experiments run on the author's own AWS account.
**Expected output**: an article with benchmark results and practical recommendations.
**Skills**: AWS Lambda, experiment design, statistical analysis.
**Appeals to recruiters because**: a benchmark article with real data (not just theory) is rare, high-perceived-value technical content — proof of genuine technical curiosity.

**8. 🟡 `/cloud-infrastructure/multi-account-aws-organization-explainer`**
Explanatory material (conceptual, without necessarily implementing it at scale) on how an organization would structure multiple AWS accounts (dev/staging/prod) with governance best practices.
**Data**: none — conceptual/didactic content.
**Expected output**: a reference article on multi-account AWS governance.
**Skills**: AWS Organizations, cloud governance (conceptual).
**Gap**: practical implementation at real scale is beyond the reach of a personal account — kept mostly as didactic content.
**Appeals to recruiters because**: it demonstrates organizational maturity in cloud thinking, relevant for interview conversations about governance, even without real-scale implementation.

**9. 🟢 `/cloud-infrastructure/aws-free-tier-project-tracker`**
A personal tracking panel for usage/cost within the AWS Free Tier, alerting before any limit is exceeded across the portfolio's projects.
**Data**: AWS Cost Explorer API / Billing API from the author's own account.
**Expected output**: a personal cost-control panel, with automatic alerts.
**Skills**: AWS Billing API, Python, alert automation.
**Appeals to recruiters because**: it proves financial and operational responsibility over one's own infrastructure — a detail that senior technical recruiters value highly.

**10. 🔴 `/cloud-infrastructure/disaster-recovery-tabletop-exercise`**
A documented exercise (conceptual + partially implemented) of a disaster recovery plan for one of the portfolio's pipelines — what would happen if S3 became unavailable, how to recover.
**Data**: none — conceptual, with real spot tests where possible.
**Expected output**: a contingency plan document + a real backup/restore test.
**Skills**: AWS backup/restore, resilience thinking.
**Gap**: an advanced topic usually associated with senior profiles — a natural long-term expansion.
**Appeals to recruiters because**: resilience and disaster recovery thinking is a recurring topic in more senior Data/Cloud Engineer interviews — it signals vision beyond "making it work."

**11. 🟡 `/cloud-infrastructure/lambda-vs-container-cost-comparison`**
A practical comparison of cost and performance between running the same workload via Lambda vs. a container (Fargate/ECS), with real data.
**Data**: a self-run experiment replicating an already-existing portfolio workload.
**Expected output**: a comparative article with real cost/latency numbers.
**Skills**: AWS Lambda, basic containers (ECS/Fargate), benchmarking.
**Gap**: ECS/Fargate is not directly covered in the roadmap — a natural extension of the Docker knowledge already acquired.
**Appeals to recruiters because**: the "serverless vs. container" decision is a real, recurring architectural debate in interviews — having real data to defend a position is a differentiator.

**12. 🟢 `/cloud-infrastructure/iam-least-privilege-case-study`**
A practical case study applying the principle of least privilege to the IAM policies of an already-existing project, documenting before/after.
**Data**: the existing IAM policy from the `api-sync-bridge` project, reviewed and refined.
**Expected output**: an article/case study with a revised IAM policy and justification for each permission.
**Skills**: AWS IAM, basic cloud security.
**Appeals to recruiters because**: cloud security is frequently neglected in portfolios — showing attention to least privilege is a sign of professional maturity, even in a small personal project.

**13. 🟡 `/cloud-infrastructure/event-driven-architecture-demo`**
A demonstration of a simple event-driven architecture (S3 trigger → Lambda → processing), with no polling, applied to a real data ingestion case.
**Data**: a simulated file arrival, automatically triggering the pipeline.
**Expected output**: a functional reactive pipeline, documented with an event diagram.
**Skills**: AWS S3 Event Notifications, Lambda, event-driven design.
**Gap**: event-trigger concepts are not directly covered in the roadmap — a natural extension of Phase 4.
**Appeals to recruiters because**: event-driven architecture is a modern pattern frequently cited in Cloud/Data Engineer job postings — a practical implementation proves more than just theoretical knowledge of the concept.

**14. 🟢 `/cloud-infrastructure/aws-architecture-diagrams-portfolio`**
A visual collection of architecture diagrams (C4-style or official AWS icons) for every portfolio project involving the cloud, as a piece of technical communication.
**Data**: none — a visual synthesis of already-existing projects.
**Expected output**: a navigable, well-documented gallery of architecture diagrams.
**Skills**: architecture diagram design, technical visual communication.
**Appeals to recruiters because**: many candidates can implement but can't visually communicate architecture — this collection alone already serves as proof of technical communication ability.

**15. 🔴 `/cloud-infrastructure/multi-region-latency-experiment`**
A self-run experiment measuring data access latency (S3/Lambda) between different AWS regions, relevant for deciding where to host data consumed globally.
**Data**: experiments run on the author's own AWS account.
**Expected output**: an article with real multi-region latency measurements.
**Skills**: AWS multi-region, experiment design, statistical analysis.
**Gap**: requires extra cost to test multiple regions — outside the immediate scope, but feasible as a one-off project.
**Appeals to recruiters because**: multi-region latency decisions are an architecture interview topic for products with international users — relevant given the goal of attracting roles outside Brazil.

**16. 🟡 `/cloud-infrastructure/secrets-management-demo`**
A demonstration of secure credential management (AWS Secrets Manager or Parameter Store) replacing exposed environment variables in one of the existing projects.
**Data**: none — refactoring of an already-existing project.
**Expected output**: a refactored project with appropriate secrets management, documented with before/after.
**Skills**: AWS Secrets Manager / Parameter Store, basic credential security.
**Gap**: a specific tool not directly covered in the roadmap, but low learning cost given the AWS context already being built.
**Appeals to recruiters because**: secrets management is a common checklist item in senior code reviews — showing attention to it raises the perceived quality of the entire portfolio.

**17. 🟢 `/cloud-infrastructure/aws-well-architected-self-review`**
A documented self-assessment of one of the portfolio's projects against the pillars of the AWS Well-Architected Framework (operational excellence, security, reliability, performance efficiency, cost optimization).
**Data**: none — a qualitative review of an already-existing project.
**Expected output**: a self-assessment report with honestly identified strengths and gaps.
**Skills**: conceptual knowledge of the Well-Architected Framework, technical self-criticism.
**Appeals to recruiters because**: using AWS's own official framework for self-assessment signals alignment with market practices and self-analysis maturity, at no additional implementation cost.

**18. 🟡 `/cloud-infrastructure/lambda-layer-shared-code-demo`**
A demonstration of using Lambda Layers to share common code/dependencies across multiple portfolio Lambda functions.
**Data**: none — refactoring of already-existing functions.
**Expected output**: a cleaner, more modular Lambda architecture, documented with before/after.
**Skills**: AWS Lambda Layers, serverless code modularization.
**Gap**: a specific Lambda feature not directly mentioned in the roadmap, but a natural extension of existing knowledge.
**Appeals to recruiters because**: Lambda Layers is a detail that signals practical experience beyond the basics — it differentiates someone who only did a tutorial from someone who already maintains multiple real functions.

**19. 🟢 `/cloud-infrastructure/cost-anomaly-detection-alert`**
A simple cost anomaly detection system for one's own AWS account (spending well above the historical baseline), with automatic alerting.
**Data**: AWS Cost Explorer API from the author's own account.
**Expected output**: a functional alert system, with spending history and configurable thresholds.
**Skills**: AWS Cost Explorer API, Python, alert automation.
**Appeals to recruiters because**: it combines FinOps with practical automation — a growing topic at organizations adopting cloud at scale, demonstrable even on a small personal account.

**20. 🟢 `/cloud-infrastructure/portfolio-cloud-architecture-overview`**
A synthesis document (a dedicated site page) visually consolidating all the cloud infrastructure used across every portfolio project, as a "general map" for anyone reviewing the work.
**Data**: none — a synthesis of all already-existing projects.
**Expected output**: a navigable architecture overview page, connecting each piece to its corresponding projects.
**Skills**: technical communication, information design.
**Appeals to recruiters because**: technical recruiters rarely have time to explore 20+ projects in depth — a well-made synthesis page dramatically increases the chance the real extent of the work gets noticed.

---

# MACRO-AREA: DATA SCIENCE

## Group 5 — `/quant` (financial and quantitative modeling)

**1. 🟢 `/quant/portfolio-tracker`**
A multi-source personal investment tracking application (BR/US stocks, REITs, crypto, fixed income), with portfolio creation, editing, import, and export.
**Data**: Yahoo Finance, Brapi.dev (B3), CoinGecko (crypto).
**Expected output**: a functional application with an editable portfolio and return/volatility/allocation metrics.
**Skills**: Python, financial APIs, portfolio modeling.
**Appeals to recruiters because**: it's the most "product-like" project in the group — something of genuine personal use, proof of UX thinking beyond the statistical model itself.

**2. 🟡 `/quant/efficient-frontier-optimizer`**
A portfolio optimizer via Monte Carlo / Markowitz simulation, plotting the efficient frontier from the assets in `portfolio-tracker`.
**Data**: reuses data from project 1.
**Expected output**: a visualization of the efficient frontier + suggested weights by risk profile.
**Skills**: Monte Carlo, financial mathematics (covariance, Sharpe ratio).
**Gap**: an extra layer of formal financial mathematics, low learning cost given the prior Monte Carlo experience from the `/football` group.
**Appeals to recruiters because**: it shows that the Monte Carlo reasoning already applied to football is transferable across domains — signals genuine statistical thinking, not just familiarity with a library.

**3. 🟡 `/quant/backtesting-engine`**
A backtesting engine for simple strategies (moving averages, momentum) over the `portfolio-tracker` data, including realistic transaction costs and slippage.
**Data**: reuses data from project 1.
**Expected output**: a historical strategy performance report with honest metrics (drawdown, Sharpe, win rate).
**Skills**: rigorous backtesting, look-ahead bias prevention, walk-forward validation.
**Gap**: methodological rigor more than a new tool.
**Appeals to recruiters because**: poorly done backtesting is a classic red flag in quantitative interviews — doing it correctly and explaining the avoided pitfalls is rare proof of maturity at this portfolio level.

**4. 🔴 `/quant/risk-var-dashboard`**
A portfolio risk dashboard (Value at Risk, stress testing with historical scenarios like 2008 and 2020) over the `portfolio-tracker`.
**Data**: reuses data from project 1 + historical crisis data for stress testing.
**Expected output**: a risk report in the style used by real trading desks.
**Skills**: VaR (historical, parametric, Monte Carlo), stress testing.
**Gap**: more advanced statistics, dense to study, even without a new tool.
**Appeals to recruiters because**: it connects directly to existing professional trading context — the project that most closely brings the public portfolio in line with the actual real work.

**5. 🔴 `/quant/ml-price-direction-classifier`**
An ML classifier for price direction (up/down/sideways, not exact price) of an asset, with feature engineering over technical indicators, compared against a naive baseline.
**Data**: historical price data (Yahoo Finance or Brapi.dev).
**Expected output**: an honest report showing whether the model beats a simple baseline or not.
**Skills**: scikit-learn, careful temporal validation, metrics beyond accuracy.
**Gap**: full supervised ML — the most "classic data science" leap in the group.
**Appeals to recruiters because**: ML applied to finance shows up constantly in Data Scientist job postings — doing it with honesty about limitations (near-efficient markets) is more impressive than promising price prediction.

**6. 🟢 `/quant/inflation-adjusted-returns-calculator`**
A real (inflation-adjusted) return calculator for different asset classes over time, comparing nominal vs. real purchasing power.
**Data**: historical inflation data (IPCA, CPI) + asset price data.
**Expected output**: an interactive tool comparing real returns across assets.
**Skills**: Python, time series, inflation adjustment.
**Appeals to recruiters because**: a simple, didactic tool, but technically correct on a point many people get wrong (comparing nominal returns without adjusting for inflation) — demonstrates conceptual rigor.

**7. 🟡 `/quant/factor-investing-explainer`**
Didactic material explaining and implementing classic investment factors (value, momentum, quality, low volatility) over a universe of B3 or S&P 500 stocks.
**Data**: price and fundamentals data (Yahoo Finance, Brapi.dev).
**Expected output**: a didactic article + a simplified backtest of each factor.
**Skills**: factor investing (conceptual), Python, statistics.
**Gap**: factor investing fundamentals require dedicated reading/study.
**Appeals to recruiters because**: factor investing is common vocabulary among quantitative asset managers — showing fluency in that vocabulary widens employability specifically in the financial sector.

**8. 🟢 `/quant/currency-correlation-explorer`**
An interactive explorer of correlation between currencies, commodities, and indices over time, with a dynamic correlation matrix by selected period.
**Data**: Yahoo Finance (FX, commodities, indices).
**Expected output**: a navigable interactive correlation matrix visualization over time.
**Skills**: Python, correlation statistics, interactive visualization.
**Appeals to recruiters because**: a fast and visually attractive exploration tool, good for "filling out" the group's grid at relatively low effort.

**9. 🟡 `/quant/options-pricing-visualizer`**
An interactive options pricing visualizer (Black-Scholes) showing how the theoretical price varies with volatility, time to expiration, and underlying asset price.
**Data**: no external data required — it's a parametric simulation tool.
**Expected output**: an interactive educational options pricing tool.
**Skills**: financial mathematics (Black-Scholes), interactive visualization.
**Gap**: derivatives pricing fundamentals require dedicated study, even though the implementation itself is straightforward.
**Appeals to recruiters because**: derivatives are a valued topic in quant/risk roles in the financial sector — a well-made educational tool proves clear conceptual mastery.

**10. 🟢 `/quant/dividend-income-projector`**
A future passive income projector based on a portfolio's dividend/distribution history (especially relevant for Brazilian REITs and dividend stocks).
**Data**: distribution history via Brapi.dev or an equivalent source.
**Expected output**: a passive income projection tool with conservative/moderate/optimistic scenarios.
**Skills**: Python, simple time-series projection.
**Appeals to recruiters because**: a tool with strong genuine personal-use appeal in the Brazilian context (REITs, dividends) — good for building a local audience even while targeting an international role.

**11. 🔴 `/quant/sector-rotation-model`**
A sector rotation model based on macroeconomic indicators (interest rates, inflation, economic cycle), suggesting sector over/underweighting.
**Data**: public macroeconomic data (Central Bank, FRED) + sector market data.
**Expected output**: a model with a historical backtest of the rotation strategy's performance.
**Skills**: applied macroeconomics, regime modeling, backtesting.
**Gap**: combining macroeconomics with modeling is the most advanced, interdisciplinary leap in the group.
**Appeals to recruiters because**: macro-aware models are well regarded in quantitative asset management roles — demonstrates the ability to combine multiple heterogeneous information sources.

**12. 🟡 `/quant/tax-efficient-rebalancing-simulator`**
A portfolio rebalancing simulator accounting for tax efficiency (e.g., the impact of capital gains tax in the Brazilian context).
**Data**: public tax rules + portfolio data from project 1.
**Expected output**: a simulator comparing naive vs. tax-aware rebalancing.
**Skills**: Python, tax-rule modeling, simple optimization.
**Gap**: modeling specific tax rules requires careful legislation research.
**Appeals to recruiters because**: it combines quantitative rigor with immediate practical applicability to the Brazilian context — a good bridge project between local personal brand and international technical competence.

**13. 🟢 `/quant/monte-carlo-retirement-planner`**
A retirement planner via Monte Carlo simulation, showing the probability of success of a savings/withdrawal plan over decades under different return scenarios.
**Data**: user-provided parameters + historical market return distributions.
**Expected output**: an interactive long-term financial planning tool.
**Skills**: Monte Carlo, financial planning, probability visualization.
**Appeals to recruiters because**: a tool with very high real-use and sharing potential — a complete "product" project that reuses the Monte Carlo competence already mastered in the `/football` group.

**14. 🟡 `/quant/credit-risk-scoring-demo`**
A simplified credit scoring model (default probability) using a public credit dataset, with an explanation of each variable (interpretability).
**Data**: a public credit dataset (e.g., the widely available German Credit Dataset or equivalent).
**Expected output**: a scoring model with an interpretability report (SHAP or equivalent).
**Skills**: supervised classification, model interpretability (SHAP).
**Gap**: model interpretability (SHAP) is an additional technique, relatively quick to learn given prior ML knowledge.
**Appeals to recruiters because**: credit scoring is one of the most classic Data Science case studies in fintech — interpretability is often required for regulatory reasons, so demonstrating it is a real differentiator.

**15. 🟢 `/quant/asset-allocation-by-life-stage`**
An asset allocation recommender by life stage (age, risk tolerance, horizon), based on well-known glide path rules from financial literature.
**Data**: no external data required beyond public reference literature.
**Expected output**: an interactive personalized allocation recommendation tool.
**Skills**: Python, glide path rules, simple interface design.
**Appeals to recruiters because**: a quick-to-produce project with a strong, clear value proposition — a good example of a "simple, well-executed financial product."

**16. 🔴 `/quant/regime-switching-volatility-model`**
A volatility regime-switching model (e.g., Markov Switching or GARCH) applied to a market index, identifying periods of high/low volatility.
**Data**: historical market index data (Yahoo Finance).
**Expected output**: a visualization of volatility regimes identified across the historical record.
**Skills**: advanced time-series models (GARCH, Markov Switching).
**Gap**: advanced time-series statistics, beyond what's already mastered via the `/football` group's Monte Carlo/Elo work.
**Appeals to recruiters because**: volatility models are central to quantitative risk management — the most technically dense project in the group, aimed at more senior roles.

**17. 🟢 `/quant/personal-net-worth-tracker`**
Tracking of personal net worth over time (assets minus liabilities), with a breakdown by asset class.
**Data**: consolidated personal data (same source as `portfolio-tracker`, plus debts/liabilities if any).
**Expected output**: a net worth evolution chart with a visual breakdown.
**Skills**: Python, personal financial data aggregation.
**Appeals to recruiters because**: a simple and genuinely personal project, a good "light" complement alongside the group's denser projects, and reuses already-existing data infrastructure.

**18. 🟡 `/quant/correlation-breakdown-crisis-study`**
A study of how correlations between asset classes behave (and frequently "break down") during financial crises, with comparative visualization between normal and crisis periods.
**Data**: historical data across multiple asset classes, including known crisis periods (2008, 2020).
**Expected output**: a report with conditional correlation visualization by market regime.
**Skills**: conditional statistics, comparative visualization.
**Gap**: no critical technical gap, but requires care in selecting and handling the crisis periods.
**Appeals to recruiters because**: "correlation that breaks down in a crisis" is a classic risk management insight — a well-done study demonstrates deep understanding of why simple diversification sometimes fails exactly when it's needed most.

**19. 🔴 `/quant/reinforcement-learning-portfolio-agent`**
A simplified reinforcement learning agent that learns to allocate among a few asset classes, compared against fixed allocation strategies (buy-and-hold, periodic rebalancing).
**Data**: historical price data for a few asset classes (Yahoo Finance).
**Expected output**: a report comparing the RL agent's performance against simple baselines, with an honest discussion of limitations.
**Skills**: reinforcement learning (RL), market environment simulation.
**Gap**: RL is an advanced stack outside the currently agreed roadmap — a frontier/aspirational project.
**Appeals to recruiters because**: RL applied to finance is a cutting-edge topic, still rare in portfolios — even a simple implementation, honest about its limitations, signals an appetite for continuous learning at the frontier of knowledge.

**20. 🟢 `/quant/macro-dashboard-brazil-vs-world`**
A comparative dashboard of macroeconomic indicators for Brazil against other economies (interest rates, inflation, exchange rate, growth), updated periodically.
**Data**: Central Bank of Brazil (public API), FRED (international macro data).
**Expected output**: a navigable comparative panel, updated on a regular schedule.
**Skills**: Python, public macroeconomic data APIs, comparative visualization.
**Appeals to recruiters because**: a comparative international macro panel is exactly the kind of context recruiters outside Brazil appreciate — it shows fluency in putting the local context into global perspective.

---

## Group 6 — `/machine-learning` (predictive modeling and applied ML, outside the financial domain)

**1. 🟢 `/machine-learning/personal-time-series-forecasting`**
Personal time-series forecasting (e.g., future monthly spending, study hours needed to reach a goal) using classic models (ARIMA, Prophet).
**Data**: personal data already collected in other projects (personal finance, productivity).
**Expected output**: a forecast with a confidence interval, validated against the real value observed afterward.
**Skills**: Python, time series (ARIMA/Prophet), forecast validation.
**Appeals to recruiters because**: time-series forecasting is a core skill in business-applied Data Science — applying it to one's own data is a fast and honest way to demonstrate competence.

**2. 🟡 `/machine-learning/image-classification-football-jerseys`**
A simple image classifier identifying football teams from photos of jerseys/kits, as an introductory computer vision project.
**Data**: public images of team kits (collected respecting usage rights, or generated/simulated).
**Expected output**: a functional classifier with an accuracy report by class.
**Skills**: basic computer vision (simple CNN or transfer learning), PyTorch/TensorFlow.
**Gap**: computer vision is not in the current roadmap — a low-cost introduction via transfer learning.
**Appeals to recruiters because**: it connects a personal passion domain (football) with an ML area (computer vision) not yet represented in the portfolio, widening the range of eligible roles.

**3. 🟢 `/machine-learning/recommendation-system-demo`**
A simple recommendation system (collaborative or content-based filtering) applied to a domain of personal interest (e.g., recommending historical football matches to watch, based on stated preference).
**Data**: a personal or small public dataset, with enough metadata for similarity.
**Expected output**: a functional recommendation system with explained output examples.
**Skills**: recommendation systems (collaborative/content-based filtering), Python.
**Appeals to recruiters because**: recommendation systems show up in almost every modern digital product — a compact project covering an area of ML with very high commercial applicability.

**4. 🟡 `/machine-learning/anomaly-detection-personal-spending`**
An anomaly detector for personal spending (transactions outside the usual pattern), using the same data as `personal-finance-cockpit`.
**Data**: reuses data from the `/power-bi` group.
**Expected output**: an anomalous-transaction alert system, with an explanation for each flag.
**Skills**: anomaly detection (isolation forest, z-score, or equivalent), Python.
**Gap**: no critical technical gap, but requires careful calibration to avoid excessive false positives.
**Appeals to recruiters because**: anomaly detection is a real and direct ML application used in finance, security, and operations — a small project with an obvious value proposition.

**5. 🔴 `/machine-learning/nlp-sentiment-football-news`**
Sentiment analysis of football news in Portuguese and English, comparing how different outlets cover the same event, as a bilingual NLP piece.
**Data**: public news headlines/summaries (respecting usage rights, without reproducing full text).
**Expected output**: a dashboard of sentiment compared by outlet/language over time.
**Skills**: NLP, sentiment analysis, bilingual text processing.
**Gap**: NLP is not in the currently agreed roadmap — a natural future expansion, given the site's bilingual focus.
**Appeals to recruiters because**: it combines exactly the portfolio's two strategic axes (football + bilingualism) in an NLP application, an area of strong current market demand.

**6. 🟢 `/machine-learning/synthetic-data-generator-toolkit`**
A custom realistic synthetic data generation tool (sales, HR, operations) to feed the `/power-bi` group demos without depending on sensitive real data.
**Data**: no real data — it's the generator tool itself.
**Expected output**: a reusable library for generating synthetic data, documented and used by other portfolio projects.
**Skills**: Python, realistic distribution statistical modeling.
**Appeals to recruiters because**: a cross-cutting infrastructure tool that supports multiple other projects — proof of reuse-oriented thinking, not just one-off delivery.

**7. 🟡 `/machine-learning/model-monitoring-drift-demo`**
A demonstration of model drift monitoring (input data distribution shift over time) applied to one of the models already existing in the portfolio.
**Data**: reuses data/model from another already-existing project.
**Expected output**: a monitoring panel showing when the model would need retraining.
**Skills**: basic MLOps, drift statistics (PSI, KS test).
**Gap**: MLOps concepts are not directly covered in the roadmap — a natural extension once models are in production.
**Appeals to recruiters because**: monitoring a model in production is exactly what separates "built an ML notebook" from "understands ML in production" — a central MLOps topic, an area of strong job growth.

**8. 🟢 `/machine-learning/ab-test-power-analysis-calculator`**
A sample-size and statistical power calculator for A/B test planning, as a reference tool.
**Data**: no external data — it's a parametric tool.
**Expected output**: an interactive power-analysis calculator.
**Skills**: inferential statistics (power analysis), experiment design.
**Appeals to recruiters because**: power analysis is a step often skipped or poorly done in real A/B tests — a well-built reference tool demonstrates genuine experimental rigor.

**9. 🟡 `/machine-learning/explainable-ai-showcase`**
A showcase comparing different model interpretability techniques (SHAP, LIME, feature importance) applied to the same model, as didactic reference material.
**Data**: reuses an already-existing model (e.g., from the `/quant` group).
**Expected output**: a comparative article/notebook between explainability techniques.
**Skills**: SHAP, LIME, communicating ML results to a non-technical audience.
**Gap**: specific interpretability techniques, relatively low learning cost.
**Appeals to recruiters because**: model explainability is increasingly required (including by regulation in sectors like credit and healthcare) — mastery of these techniques is a growing differentiator in Data Scientist roles.

**10. 🟢 `/machine-learning/baseline-first-methodology-showcase`**
A didactic piece/technical manifesto demonstrating, with real examples from other portfolio projects, why a complex model should always be compared against a simple baseline before celebrating its performance.
**Data**: reuses results already existing in other projects (e.g., `ml-price-direction-classifier`).
**Expected output**: a well-grounded methodology article, citing concrete examples from the portfolio itself.
**Skills**: technical communication, methodological rigor.
**Appeals to recruiters because**: this kind of methodological honesty is exactly what distinguishes a mature data scientist from someone who just trains models without questioning whether they actually add value over something simple.

**11. 🔴 `/machine-learning/graph-network-analysis-transfers`**
A network (graph) analysis of the football transfer market — clubs as nodes, transfers as edges — identifying market clusters and intermediation hubs.
**Data**: Transfermarkt (transfer history).
**Expected output**: an interactive graph visualization with centrality metrics.
**Skills**: graph/network analysis (NetworkX), network visualization.
**Gap**: graph analysis is not directly covered in the roadmap — a natural, technically accessible expansion.
**Appeals to recruiters because**: network analysis is a powerful and visually striking tool, underrepresented in most Data Science portfolios — a strong visual and analytical differentiator.

**12. 🟢 `/machine-learning/feature-engineering-cookbook`**
A documented cookbook of feature engineering techniques applied across the portfolio's different datasets (football, finance, personal data), as reusable reference material.
**Data**: reuses already-existing datasets across multiple groups.
**Expected output**: a reference repository with documented and tested feature engineering patterns.
**Skills**: feature engineering, technical documentation.
**Appeals to recruiters because**: good feature engineering is often what most impacts model performance in practice — reference material proves solid practical mastery, applicable across all the other ML projects.

**13. 🟡 `/machine-learning/synthetic-control-method-demo`**
A demonstration of the synthetic control method (a causal inference technique used to evaluate the impact of an event without a randomized control group), applied to a case in the football domain (e.g., the impact of a coaching change).
**Data**: reuses data from the `/football` group.
**Expected output**: a complete case study applying the technique, with a discussion of validity and limitations.
**Skills**: causal inference (synthetic control), advanced statistics.
**Gap**: a specific causal inference technique that requires dedicated study, even without a new software tool.
**Appeals to recruiters because**: synthetic control is used in applied economics and in advanced product Data Science teams (e.g., feature impact evaluation) — uncommon in portfolios, a strong differentiator.

**14. 🟢 `/machine-learning/data-storytelling-portfolio-piece`**
A pure data storytelling piece (not necessarily a new model) telling a complete story from one of the already-existing datasets, focused on visual narrative and writing, not technique.
**Data**: reuses any dataset already existing in the portfolio.
**Expected output**: a publishable, bilingual visual essay/article.
**Skills**: data storytelling, information design, accessible technical writing.
**Appeals to recruiters because**: many data teams struggle more with communicating insight than with the technique itself — this piece proves communication competence, often the decisive factor after the technical stage of a hiring process.

**15. 🔴 `/machine-learning/automl-benchmark-study`**
A comparative study between an AutoML solution (e.g., PyCaret, AutoGluon) and careful manual modeling, on the same problem and dataset, discussing trade-offs of time vs. control vs. performance.
**Data**: reuses an already-existing dataset from another project (e.g., `quant/credit-risk-scoring-demo`).
**Expected output**: an honest comparative article about when AutoML pays off and when it doesn't.
**Skills**: AutoML (specific tool), manual modeling, critical trade-off analysis.
**Gap**: a specific AutoML tool not covered in the roadmap — a natural extension of tool exploration.
**Appeals to recruiters because**: a well-grounded, experiment-based opinion on AutoML is a real debate topic in modern data teams — it shows technical judgment maturity, not just execution.

**16. 🟡 `/machine-learning/cross-validation-pitfalls-demo`**
Didactic material/experiment demonstrating common cross-validation pitfalls (data leakage, temporal leakage), using deliberately wrong cases corrected side by side.
**Data**: reuses an already-existing dataset (e.g., time-series data from the `/quant` group).
**Expected output**: a didactic article with examples of common errors and their corresponding fixes.
**Skills**: advanced cross-validation, methodological rigor.
**Gap**: no new tool, but requires deep understanding of subtle statistical pitfalls.
**Appeals to recruiters because**: data leakage is one of the most common and most costly errors in real-world modeling — didactic material on it proves advanced-level methodological rigor, frequently tested in technical interviews.

**17. 🟢 `/machine-learning/exploratory-data-analysis-template`**
A reusable exploratory data analysis (EDA) template/checklist, applied and demonstrated on a new dataset each time the template is used in another portfolio project.
**Data**: any new portfolio dataset.
**Expected output**: a standardized EDA template, with a documented real usage example.
**Skills**: exploratory analysis, process standardization, Python.
**Appeals to recruiters because**: having a standardized, repeatable EDA process is a sign of process maturity, not just one-off technical skill — relevant for assessing the ability to work consistently within a team.

**18. 🟡 `/machine-learning/active-learning-labeling-demo`**
A demonstration of active learning (the strategy of selecting which examples to label first to maximize a model's gain under a limited labeling budget), in a small classification problem.
**Data**: a small public classification dataset, artificially "unlabeled" for the demonstration.
**Expected output**: a comparison between active learning and random labeling sampling, showing the efficiency gain.
**Skills**: active learning (conceptual and practical), supervised classification.
**Gap**: a specific technique not covered in the roadmap, but conceptually accessible given existing ML foundations.
**Appeals to recruiters because**: active learning is relevant in contexts where labeling is expensive (e.g., medical, legal data) — uncommon in portfolios, a good technical differentiator.

**19. 🟢 `/machine-learning/model-card-documentation-standard`**
Adoption of the "model card" standard (structured model documentation: purpose, training data, limitations, metrics) applied retroactively to every model already existing in the portfolio.
**Data**: none — documentation of already-existing models.
**Expected output**: a set of standardized model cards, one per portfolio model.
**Skills**: responsible ML documentation, technical communication.
**Appeals to recruiters because**: model cards are a best practice recommended by responsible ML teams at mature companies (including major tech players) — voluntarily adopting this signals alignment with cutting-edge AI governance practices.

**20. 🟢 `/machine-learning/portfolio-ml-model-registry`**
A centralized (navigable catalog) registry of every ML model built across the portfolio, linking to the project, the dataset used, and the corresponding model card.
**Data**: a synthesis of all ML projects already existing in the portfolio.
**Expected output**: a single catalog page, navigable, connecting every model in the portfolio.
**Skills**: information organization, technical communication.
**Appeals to recruiters because**: like the `portfolio-cloud-architecture-overview` in the infrastructure group, this catalog works as a single entry point for anyone quickly reviewing the portfolio, increasing the chance the work gets fully assessed.

---

## Group 7 — `/experimentation` (applied statistics, causality, experiment design rigor)

**1. 🟢 `/experimentation/sample-size-and-power-toolkit`**
A complete experiment-planning toolkit (not just an isolated calculator) — sample size, statistical power, minimum test duration — documented with real usage examples.
**Data**: no external data required.
**Expected output**: a tool + a usage guide, bilingual.
**Skills**: inferential statistics, experiment design.
**Appeals to recruiters because**: experiment planning is a step often skipped due to time pressure — a robust tool for it proves applied scientific rigor.

**2. 🟡 `/experimentation/simpsons-paradox-explainer`**
Interactive didactic material demonstrating Simpson's Paradox with real examples drawn from other portfolio datasets (e.g., football or finance data), showing how aggregations can be misleading.
**Data**: reuses already-existing datasets.
**Expected output**: a didactic article/interactive visualization.
**Skills**: statistics, interactive visualization, technical teaching.
**Gap**: no new tool, but requires didactic care in choosing a clear and correct example.
**Appeals to recruiters because**: the ability to explain subtle statistical concepts clearly is a strong differentiator in combined behavioral/technical interviews — proof of depth without inaccessible jargon.

**3. 🟢 `/experimentation/correlation-vs-causation-gallery`**
A curated gallery of real spurious correlations (or generated from the portfolio's own data) as an educational piece on the difference between correlation and causation.
**Data**: reuses already-existing datasets, searching for genuine spurious correlations within them.
**Expected output**: an interactive, engaging gallery, with a statistical explanation for each case.
**Skills**: statistics, accessible communication, content design.
**Appeals to recruiters because**: content with strong sharing/virality potential, while also demonstrating deep statistical understanding behind the light presentation.

**4. 🟡 `/experimentation/bayesian-vs-frequentist-ab-test`**
A side-by-side comparison of Bayesian vs. frequentist approaches to analyzing the same simulated A/B test, discussing when each is more appropriate.
**Data**: synthetic simulated A/B test data.
**Expected output**: a comparative article/notebook implementing both approaches.
**Skills**: Bayesian statistics, frequentist statistics, Python.
**Gap**: Bayesian statistics requires additional dedicated study.
**Appeals to recruiters because**: the Bayesian vs. frequentist debate is a classic senior Data Scientist interview topic — having a practical implementation of both, not just a theoretical opinion, is a concrete differentiator.

**5. 🟢 `/experimentation/multiple-testing-correction-demo`**
A practical demonstration of the multiple comparisons problem (accidental p-hacking) and how to correct it (Bonferroni, FDR), using a simulated example with many metrics tested simultaneously.
**Data**: synthetic data simulating multiple A/B test metrics.
**Expected output**: a didactic article showing the inflated false-positive rate without correction, and corrected with an appropriate method.
**Skills**: statistics, multiple comparisons correction.
**Appeals to recruiters because**: this error is extremely common in product teams running many simultaneous tests — clear mastery of the topic is a real differentiator of statistical rigor.

**6. 🔴 `/experimentation/causal-inference-diff-in-diff-football`**
Applying difference-in-differences to a real event in the football domain (e.g., a rule change, the pandemic's impact on performance), with well-defined treatment and control groups.
**Data**: reuses data from the `/football` group.
**Expected output**: a complete applied causal inference case study, with a discussion of assumptions (parallel trends) and their limitations.
**Skills**: causal inference (diff-in-diff), applied econometrics.
**Gap**: a more advanced causal inference technique, requiring dedicated econometrics study.
**Appeals to recruiters because**: diff-in-diff is a classic applied-economics technique also used in product Data Science — combining it with a personal passion domain (football) makes the case study memorable and well-grounded at the same time.

**7. 🟡 `/experimentation/survivorship-bias-gallery`**
A collection of survivorship bias cases identified or simulated from personal data (e.g., teams that "survived" in the top division vs. those relegated, and how ignoring this distorts analysis).
**Data**: reuses data from the `/football` group.
**Expected output**: an educational article with concrete cases.
**Skills**: identifying selection bias, applied statistics.
**Gap**: no new tool, but requires conceptual care in constructing the examples.
**Appeals to recruiters because**: survivorship bias is one of the most cited (and most misunderstood) biases in business analysis — a well-constructed example with real data is strong educational portfolio material.

**8. 🟢 `/experimentation/regression-to-mean-sports-study`**
A study of regression to the mean applied to sports performance (e.g., why a player with an exceptional start to the season tends to "normalize" afterward), with real data from the `/football` group.
**Data**: reuses data from the `/football` group.
**Expected output**: a study with a clear visualization of the phenomenon of regression to the mean.
**Skills**: statistics, time series, explanatory visualization.
**Appeals to recruiters because**: regression to the mean is a fundamental statistical concept frequently misapplied in business decisions (e.g., recent performance "luck") — a study applied to an understandable domain proves solid, communicable understanding.

**9. 🟡 `/experimentation/confidence-interval-misinterpretation-demo`**
Didactic material correcting common misinterpretations of confidence intervals (e.g., "95% chance the true value is in this interval" is not the correct interpretation), with a visual simulation showing the real meaning via repeated sampling.
**Data**: synthetic data generated via repeated simulation.
**Expected output**: an interactive visualization showing the interval's coverage frequency across many simulated samples.
**Skills**: inferential statistics, simulation, interactive visualization.
**Gap**: no new tool, but requires careful conceptual precision in the explanation.
**Appeals to recruiters because**: this is one of the most common conceptual errors, even among experienced professionals — correcting it clearly and with visual simulation is proof of genuine statistical mastery, not just formula memorization.

**10. 🟢 `/experimentation/effect-size-vs-significance-explainer`**
Material explaining the difference between statistical significance and practical relevance (effect size), with an example where a result is statistically significant but practically irrelevant, and vice versa.
**Data**: synthetic data or data reused from other projects.
**Expected output**: a didactic article with clear numerical examples.
**Skills**: statistics, communicating results for decision-making.
**Appeals to recruiters because**: confusing "statistically significant" with "practically important" is a recurring, poorly understood business decision point — clarity about it is exactly what's expected from a mature senior analyst.

**11. 🟡 `/experimentation/sequential-testing-peeking-problem`**
A demonstration of the "peeking" problem (analyzing an A/B test result before the planned sample size is reached) and how sequential tests correctly address it.
**Data**: synthetic simulated A/B test data, with multiple intermediate checkpoints.
**Expected output**: an article showing the inflated false-positive rate from "peeking" too early, and the fix via an appropriate sequential test.
**Skills**: sequential testing, inferential statistics.
**Gap**: sequential tests require dedicated study of a specific method.
**Appeals to recruiters because**: "peeking" is an extremely common error in product teams under pressure to decide quickly — demonstrating mastery of the proper correction is a concrete, applicable technical differentiator.

**12. 🟢 `/experimentation/observational-vs-experimental-data-case-studies`**
A collection of case studies comparing what can and cannot be concluded from observational data vs. controlled experimental data, using real examples from the portfolio itself (e.g., football data is observational; a simulated A/B test is experimental).
**Data**: reuses data from multiple portfolio groups.
**Expected output**: a structured comparative article, with applicable lessons.
**Skills**: data epistemology, technical communication.
**Appeals to recruiters because**: understanding the limits of what observational data can (and cannot) answer is exactly the difference between naive and mature analysis — a transversal synthesis of the entire portfolio in a single reflective piece.

**13. 🔴 `/experimentation/instrumental-variables-intro`**
An applied introduction to the instrumental variables technique (one of the most advanced causal inference tools), with a simplified, well-documented case.
**Data**: depending on the chosen case, possibly reusing data from another group.
**Expected output**: an introductory case study, emphasizing when and why the technique is necessary.
**Skills**: advanced econometrics, causal inference.
**Gap**: probably the most advanced statistical technique on the entire list — a significant study investment.
**Appeals to recruiters because**: instrumental variables rarely appear in Data Science portfolios outside of people with an economics background — a strong niche differentiator for roles that value genuine causal rigor (e.g., combined Economics/Data Science roles).

**14. 🟢 `/experimentation/percentile-vs-average-misleading-metrics`**
Material explaining why the average can be a misleading metric in skewed distributions (e.g., response time, transaction value), advocating for percentiles (p50, p95, p99) with real examples.
**Data**: reuses any already-existing skewed-distribution dataset from the portfolio.
**Expected output**: a didactic article with a comparative visualization between the average and percentiles on the same dataset.
**Skills**: descriptive statistics, distribution visualization.
**Appeals to recruiters because**: using percentiles instead of the average is standard practice in mature engineering/product teams (e.g., p99 latency SLAs) — clear mastery of this connects directly with the technical vocabulary of product and engineering teams.

**15. 🟡 `/experimentation/network-effects-experiment-design-challenges`**
Material discussing the challenges of designing controlled experiments when there are network effects between units (e.g., contamination between treatment and control groups), with a proposed mitigation (e.g., cluster randomization).
**Data**: conceptual, with a possibly simulated illustrative example.
**Expected output**: an article explaining the problem and known practical solutions (cluster randomization, switchback design).
**Skills**: advanced experiment design, critical thinking about internal validity.
**Gap**: a relatively advanced experimental design topic, requiring dedicated reading.
**Appeals to recruiters because**: network effects in experimentation are a real challenge in social/marketplace products — discussing this in depth signals senior-level critical thinking about the limitations of standard methods.

**16. 🟢 `/experimentation/data-quality-checklist-before-analysis`**
A documented and applied data quality checklist to run before starting any analysis (duplicates, outliers, schema consistency, missing values), demonstrated on a real portfolio dataset with deliberately identified problems.
**Data**: any portfolio dataset, with real or deliberately inserted problems for didactic purposes.
**Expected output**: a reusable checklist + an applied example showing problems found and how they were handled.
**Skills**: data quality, Python, procedural rigor.
**Appeals to recruiters because**: skipping data quality checks is a root cause of many real-world analysis errors — a robust, well-exemplified checklist proves procedural discipline, often underrated as a technical skill.

**17. 🟡 `/experimentation/historical-data-survivorship-in-market-indices`**
A study of how market indices (e.g., the historical composition of the Ibovespa or the S&P 500) suffer from survivorship bias by removing companies that went bankrupt/exited the index, distorting perceived historical returns.
**Data**: historical index composition data (public sources, where available) + price data.
**Expected output**: a study quantifying the size of the bias where identifiable in the available data.
**Skills**: statistics applied to finance, careful handling of incomplete historical data.
**Gap**: historical index composition data can be hard to obtain completely — the project depends on real source availability.
**Appeals to recruiters because**: this bias is frequently ignored even by financial market professionals — a natural bridge between the `/experimentation` and `/quant` groups, reinforcing consistency of critical reasoning across areas.

**18. 🟢 `/experimentation/pre-registration-template-and-rationale`**
A hypothesis and analysis-plan pre-registration template (specifying what will be tested and how, before looking at the result), demonstratively applied to one of the upcoming portfolio projects before it's executed.
**Data**: no external data — it's a methodological process.
**Expected output**: a pre-registration document published before the corresponding analysis is done, allowing later comparison between what was planned and what was executed.
**Skills**: methodological rigor, open/reproducible science.
**Appeals to recruiters because**: pre-registration is an open-science practice increasingly valued even outside academia (e.g., serious product experimentation) — voluntarily adopting it is a rare and strong signal of analytical integrity.

**19. 🔴 `/experimentation/heterogeneous-treatment-effects-uplift-modeling`**
Heterogeneous treatment effect modeling (uplift modeling) — identifying which subgroups respond more to an intervention, not just the overall average effect — applied to a realistic simulated case.
**Data**: synthetic data simulating an experiment with a deliberate heterogeneous effect.
**Expected output**: a model identifying the most responsive subgroups, with validation of the approach.
**Skills**: uplift modeling, causal machine learning.
**Gap**: an advanced technique combining ML with causal inference — one of the most sophisticated topics on the entire list.
**Appeals to recruiters because**: uplift modeling is exactly the kind of technique used by growth/marketing teams at mature products to personalize intervention — highly valued and rare in a mid-level candidate's portfolio.

**20. 🟢 `/experimentation/methodology-portfolio-index`**
An index page consolidating every project in the `/experimentation` group as a "methodological rigor manifesto" for the entire portfolio, explaining the common philosophy behind all of them.
**Data**: none — a synthesis of the already-existing projects in the group.
**Expected output**: a navigable synthesis page, with the group's unifying narrative.
**Skills**: technical communication, conceptual synthesis.
**Appeals to recruiters because**: like the other groups' synthesis catalogs, this page compactly communicates exactly what would normally require reading all 20 individual projects to notice — communication efficiency for anyone reviewing quickly.

---

## Group 8 — `/bilingual-data-storytelling` (technical communication, content, personal brand)

**1. 🟢 `/bilingual-data-storytelling/portfolio-meta-narrative`**
A page/article telling the story of how the portfolio itself was built — why the group structure was chosen, how the learning roadmap connects to the projects, and what was learned in the process — in Portuguese and English.
**Data**: none — it's meta-content about the portfolio itself.
**Expected output**: a publishable bilingual article, possibly the recommended first entry point for site visitors.
**Skills**: storytelling, bilingual communication, synthesis.
**Appeals to recruiters because**: recruiters often decide within a few minutes whether it's worth exploring further — a clear, honest opening narrative about the process (not just the result) humanizes and contextualizes everything else in the portfolio.

**2. 🟡 `/bilingual-data-storytelling/data-engineer-vs-analyst-vs-scientist-explainer`**
An article explaining, with concrete examples drawn from the portfolio itself, the practical difference between the three profiles (Analyst, Engineer, Scientist) and why mastering all three is an advantage in certain market contexts (freelance, scale-ups, consultancies).
**Data**: reuses examples from every portfolio group.
**Expected output**: a bilingual strategic-positioning article.
**Skills**: strategic communication, career synthesis.
**Gap**: no technical gap — requires a clearly articulated personal positioning.
**Appeals to recruiters because**: this article essentially "explains to the recruiter how to hire you" — it reduces the friction of understanding the why behind a multidisciplinary profile, instead of leaving that interpretation up to whoever is reviewing it.

**3. 🟢 `/bilingual-data-storytelling/glossary-data-terms-pt-en`**
A bilingual glossary of technical data terms (e.g., "data drift" = "deriva de dados"), built organically from the terms used across every other portfolio project.
**Data**: none — a terminological synthesis of the projects themselves.
**Expected output**: a navigable glossary, cross-linked with the projects where each term appears.
**Skills**: bilingual technical terminology, content organization.
**Appeals to recruiters because**: reference content like this has good organic search traffic potential, while also reinforcing the "bilingual bridge" brand in the data niche — targeting both domestic and international audiences simultaneously.

**4. 🟡 `/bilingual-data-storytelling/technical-writing-before-after-case`**
A case study showing the evolution of a technical text from a confusing first version to a clear final version, with annotations explaining each rewriting decision.
**Data**: none — didactic material about communication.
**Expected output**: a before/after didactic article with pedagogical commentary.
**Skills**: technical writing, editing, teaching.
**Gap**: no technical gap, but requires the discipline of critical self-review of one's own writing.
**Appeals to recruiters because**: clear written communication is constantly cited as a gap in technical candidates — explicit proof of this skill is a competitive differentiator, especially for asynchronous remote work (where writing replaces much of verbal communication).

**5. 🟢 `/bilingual-data-storytelling/interactive-resume-data-driven`**
A "data-driven" interactive resume — not a static PDF, but a page that presents the professional trajectory as a small navigable dashboard (experience, skills, projects related to each target role).
**Data**: data from the actual professional trajectory.
**Expected output**: an interactive bilingual resume page, linked from the site's main page.
**Skills**: web development, information design, career synthesis.
**Appeals to recruiters because**: a "resume that is itself a data project" is living, immediate proof of competence — it communicates skill through the format itself, not just the content.

**6. 🟡 `/bilingual-data-storytelling/conference-talk-style-deep-dive`**
One of the portfolio's more robust projects (e.g., `club-league-simulator`) rewritten in the format of a technical conference talk (PyData/PyCon style) — with a script, conceptual slides, and presentation narrative, even without an actual talk delivered yet.
**Data**: reuses an already-existing project.
**Expected output**: complete presentation material, ready for eventual submission to a real conference.
**Skills**: technical presentation, storytelling, slide design.
**Gap**: no technical gap — requires practice in oral/presentational communication.
**Appeals to recruiters because**: having "stage-ready" material signals an ambition for visibility in the technical community, and even without an actual talk delivered yet, it demonstrates the ability to structure a long technical narrative in an engaging way.

**7. 🟢 `/bilingual-data-storytelling/open-source-contribution-log`**
A public, documented log of contributions to open-source projects related to the portfolio's stack (even small ones: documentation, simple bug fixes, translation).
**Data**: none — it's a log of real activity in third-party projects.
**Expected output**: a bilingual page listing contributions with context and links.
**Skills**: collaborative Git/GitHub, communication within the international technical community.
**Appeals to recruiters because**: open-source contribution, even small, is a strong signal of genuine engagement with the international technical community — frequently cited as a differentiator for remote roles outside Brazil.

**8. 🟡 `/bilingual-data-storytelling/case-study-client-simulation`**
A simulated consulting case (fictional client, realistic business problem) documented from start to finish — diagnosis, proposed solution, implementation, result — as a piece aimed specifically at freelance clients.
**Data**: no real client data — a fictional but technically realistic case, possibly reusing synthetic data already generated in other projects.
**Expected output**: a complete consulting case study, in well-written commercial proposal format.
**Skills**: technical consulting, business-oriented communication, process synthesis.
**Gap**: no technical gap — requires practice in business-outcome-oriented communication, not just technical communication.
**Appeals to recruiters because**: it's exactly the kind of material a potential freelance client looks for before hiring — proof of the ability to translate technical competence into understandable business value.

**9. 🟢 `/bilingual-data-storytelling/learning-in-public-log`**
A public, chronological log of the learning process for the skill roadmap (SQL → Docker → dbt → AWS → Airflow), published as progress unfolds, including real difficulties encountered.
**Data**: directly reuses the content generated in `study-plan.md` and its real execution.
**Expected output**: a chronological, bilingual series of posts/pages documenting the learning process transparently.
**Skills**: ongoing communication, publishing consistency.
**Appeals to recruiters because**: "learning in public" is well regarded by the international technical community — it shows a real, continuous growth trajectory, not just a static portfolio frozen at a single moment.

**10. 🟢 `/bilingual-data-storytelling/faq-for-recruiters`**
An FAQ page aimed specifically at recruiters and hiring managers, answering practical questions (availability, time zone, preferred contract model, main stack) directly and bilingually.
**Data**: none — direct professional positioning information.
**Expected output**: a straightforward FAQ page, reducing friction at first contact.
**Skills**: direct communication, professional positioning.
**Appeals to recruiters because**: recruiters evaluating multiple candidates greatly value having basic logistical information (time zone, availability, contract type) already answered without needing to ask — it reduces friction and speeds up decisions.

**11. 🟡 `/bilingual-data-storytelling/translation-quality-self-audit`**
A self-audit of the quality of the site's and projects' translation/localization (not just literal translation, but cultural adaptation of examples, date/number formats), documented as a process.
**Data**: none — an audit of content already published.
**Expected output**: a localization improvement report applied to the site itself.
**Skills**: localization (not just translation), attention to cultural detail (date, currency, number format).
**Gap**: no new tool, but requires systematic review discipline.
**Appeals to recruiters because**: good localization (not just automatic translation) signals genuine attention to international audience experience — a subtle but noticeable detail that communicates professionalism.

**12. 🟢 `/bilingual-data-storytelling/visual-identity-rationale`**
An article explaining the site's own visual identity decisions (color palette, typography, chosen design motifs) and how they relate to the intended personal brand positioning.
**Data**: none — a reflection on already-implemented design decisions.
**Expected output**: a bilingual "design rationale" article.
**Skills**: design thinking, design-decision communication.
**Appeals to recruiters because**: for roles that involve some interface with product/design (increasingly common in Data/Analytics Engineering), showing design reasoning is an unexpected and well-received differentiator.

**13. 🟡 `/bilingual-data-storytelling/remote-work-readiness-checklist`**
A checklist/article demonstrating practical readiness for asynchronous international remote work (communication tools, time-zone management, documentation as a habit), with examples from the workflow already adopted in the portfolio.
**Data**: none — a reflection on one's own work process.
**Expected output**: an article/checklist with concrete examples of habits already practiced.
**Skills**: asynchronous communication, remote process organization.
**Gap**: no technical gap — requires real, documented consistency of habit, not just intention.
**Appeals to recruiters because**: international remote work requires asynchronous communication maturity — proving this with concrete habits (not just claiming "I have remote experience") is more convincing to a foreign recruiter.

**14. 🟢 `/bilingual-data-storytelling/project-retrospectives-collection`**
A collection of short, honest retrospectives on the portfolio's own projects — what worked, what didn't, what would be done differently with current knowledge — for each major already-completed project.
**Data**: none — a reflection on already-existing projects.
**Expected output**: a retrospective section linked to each project, bilingual.
**Skills**: technical self-criticism, honest communication.
**Appeals to recruiters because**: most portfolios only show the polished final result — honest retrospectives about what didn't work well on the first attempt communicate maturity and continuous learning ability, frequently asked about directly in behavioral interviews.

**15. 🟡 `/bilingual-data-storytelling/data-ethics-position-statement`**
A personal positioning article on data ethics (privacy, responsible AI use, model transparency), applied concretely to decisions already made in the portfolio (e.g., why synthetic data was used instead of sensitive real data in certain projects).
**Data**: none — positioning and justification of decisions already made.
**Expected output**: a bilingual positioning article, with concrete examples from the portfolio itself.
**Skills**: applied data ethics, technical principle communication.
**Gap**: no technical gap — requires genuine, consistent reflection, not just a generic statement.
**Appeals to recruiters because**: data ethics is a growing evaluation topic in hiring processes at mature companies — a concrete (not generic) position, anchored in real decisions already made, is far more convincing than an abstract statement of principle.

**16. 🟢 `/bilingual-data-storytelling/skill-progression-timeline`**
A visual, interactive timeline showing the real evolution of skills throughout the execution of the learning roadmap, updated as progress advances.
**Data**: directly reuses the content of `study-plan.md` and its real tracking.
**Expected output**: a live, updated interactive visualization of technical career progress.
**Skills**: data visualization, personal progress synthesis.
**Appeals to recruiters because**: visualizing real, ongoing progress (not just a static skill list) is living proof that the learning roadmap is taken seriously and actually executed — it reinforces the credibility of the rest of the portfolio.

**17. 🟡 `/bilingual-data-storytelling/comparative-job-market-report-pt-en`**
A comparative report (in small white-paper format) on how the data job market compares between Brazil and the target markets (US, Canada, Europe) — salary range, most-requested skills, contract model — using public sources.
**Data**: public job-market sources (job boards, public industry reports).
**Expected output**: a publishable bilingual white paper, with good repercussion potential in Brazilian data communities.
**Skills**: market research, analytical synthesis, bilingual communication.
**Gap**: no technical gap — requires careful, honest source research.
**Appeals to recruiters because**: this kind of content has good authority and sharing potential, while also demonstrating that the professional deeply understands the market they're positioning themselves in — a natural complement to the already-mentioned `power-bi/job-market-tracker`.

**18. 🟢 `/bilingual-data-storytelling/code-review-philosophy-showcase`**
An article/showcase explaining one's own code review and code quality philosophy, with real before/after examples of review applied to the portfolio's own projects.
**Data**: none — reuses code already existing in other projects.
**Expected output**: an article with concrete refactoring examples and the justification for each improvement.
**Skills**: code quality, code review, technical communication.
**Appeals to recruiters because**: the ability to critically and articulately review and improve one's own code is exactly what's sought in any technical interview involving pair programming or real code review.

**19. 🔴 `/bilingual-data-storytelling/video-walkthrough-series`**
A series of short walkthrough videos explaining the portfolio's most robust projects, bilingual (a Portuguese version and an English version), as an audiovisual complement to the written content.
**Data**: no external data — audiovisual content production about the projects themselves.
**Expected output**: a series of short videos, hosted and linked from the corresponding site pages.
**Skills**: video production, editing, bilingual oral communication.
**Gap**: video production is entirely outside the technical scope of the current roadmap, with a separate investment of time and equipment.
**Appeals to recruiters because**: audiovisual content dramatically increases engagement and retention for portfolio visitors, especially time-constrained recruiters — a higher-effort format, but also higher differentiation potential if well executed.

**20. 🟢 `/bilingual-data-storytelling/portfolio-changelog`**
A public changelog of the portfolio itself — a chronological, versioned record of every new project added, relevant update made, and new skill incorporated — as proof of continuous evolution and active maintenance.
**Data**: none — a personal record of the site's evolution.
**Expected output**: a navigable changelog page, updated with every relevant addition to the portfolio.
**Skills**: versioning, process documentation, maintenance consistency.
**Appeals to recruiters because**: like the `data-pipelines/portfolio-pipeline-meta-dashboard`, this changelog is concrete proof that the portfolio is a living, maintained system, not a static snapshot frozen at a single moment — it strengthens the credibility of all 159 other projects listed in this document.

---

## Synthesis: why this split into 8 groups under 3 macro-areas

The structure deliberately reinforces the multidisciplinary "Data Professional" narrative already present in the site's current positioning, avoiding the risk of appearing prematurely specialized in a single role (Analyst, Engineer, or Scientist) — which widens the range of freelance and contract opportunities in the short term, without compromising perceived technical depth in any of the three layers.

**Data Analysis** (`/football`, `/power-bi`) covers the insight-extraction and visual communication layer — where SQL, DAX, and data storytelling are central, and where personal passion for football works as an engagement differentiator.

**Data Engineering** (`/data-pipelines`, `/cloud-infrastructure`) covers the layer of building and maintaining reliable data infrastructure — where the SQL → Docker → dbt → AWS → Airflow roadmap gains direct practical application, and where prior real experience with AWS Lambda already offers a concrete starting point.

**Data Science** (`/quant`, `/machine-learning`, `/experimentation`) covers the predictive modeling and statistical rigor layer — where Monte Carlo, causal inference, and applied ML demonstrate quantitative reasoning transferable across domains (football, finance, product).

The eighth group, `/bilingual-data-storytelling`, is transversal by design — it doesn't compete with the other seven for technical content, but synthesizes, communicates, and extends the reach of all of them, reinforcing the project's second explicit strategic axis: bilingual personal brand growth in both Brazil and the international market simultaneously.

## Suggested next steps

With 160 ideas cataloged (20 per group × 8 groups), the natural next step is the consolidation phase: identifying common denominators among the ideas most aligned with genuine interest and available time, narrowing the catalog down to an executable number of projects per group (likely between 3 and 6 per group in the first wave), and then mapping each chosen project against the `study-plan.md` roadmap timeline for realistic execution sequencing.
