---
title: "Study Plan — SQL → Docker → dbt → Applied AWS → Airflow/Prefect"
type: study-plan
status: active
created: 2026-06-17
dedication: "10h/week"
total_duration: "21 weeks (~210h)"
tags: [learning, roadmap, sql, docker, dbt, aws, airflow, data-engineering]
related: [project-groups-and-ideas, hmantovani-com]
---

# Study Plan — SQL → Docker → dbt → Applied AWS → Airflow/Prefect

## Overview

A sequential roadmap covering 5 technical skills, designed as a chain of real dependencies — each skill unlocks the next — rather than just a list ranked by market popularity. Assumed dedication: 10h/week, consistently. Estimated total duration: 21 weeks (~210h).

Each phase follows the same 3-step structure: **fundamentals** guided by an external course + Claude Code, a real **applied project** (drawn from the portfolio grid in `project-groups-and-ideas.md`), and **consolidation/documentation** in the vault before moving on to the next phase.

The order was deliberately chosen as a dependency chain, not as a ranking of isolated market demand:

- **SQL** is a literal prerequisite for everything that follows (dbt is "SQL with superpowers"; Athena is "SQL over files"; Power BI connected to a real database depends on it).
- **Docker** comes before dbt and Airflow because it makes any new tool testable locally without cluttering the machine — it unlocks the speed at which everything else is learned.
- **dbt** comes before Airflow because it's already productive on its own (simple transformation pipelines don't need an orchestrator yet).
- **Applied AWS** comes after SQL is solid because the phase's biggest payoff (Athena) is literally SQL over S3 — without fluent SQL, the value of this phase drops significantly.
- **Airflow/Prefect** comes last because orchestration only makes sense once there are 2+ real pipelines to coordinate — learning it without anything to orchestrate is abstract and forgotten quickly.

## AI usage and knowledge base methodology

External course material/transcripts are brought in section by section into the corresponding skill's vault folder. From that material, the AI (Claude Code or Claude.ai) generates: section-by-section course tracking, learning exercises applied to the user's own data (football dataset, personal finances), documentation of conversations and decisions made, and consolidation markdowns at the end of each phase.

At the end of each phase, three types of documents are generated in the skill's folder:

1. **Quick reference** — syntax/commands likely to be forgotten, for future lookup.
2. **Decisions and troubleshooting** — real errors encountered and how they were resolved. This is the material that most often converts into a strong technical interview answer.
3. **Skill → project mapping** — which portfolio project the skill was actually applied to, so the AI can answer "what can you do with X" by citing a concrete example, not a theoretical one.

---

## Phase 1 — SQL (Weeks 1–4, ~40h)

### Week 1 — Syntax fundamentals and relational modeling
`SELECT`, `WHERE`, all types of `JOIN`, `GROUP BY`, aggregate functions. Since the star schema modeling foundation (fact/dimension) is already familiar via Power BI/DAX, the time savings here come from mapping that prior knowledge onto the equivalent SQL syntax, instead of learning data modeling from scratch.

**Practical action**: bring the first section of the chosen external course into the skill's folder. Ask the AI to generate exercises on a personal dataset instead of generic course exercises.

### Week 2 — Subqueries, CTEs, window functions
This is the leap that separates basic SQL from analyst-level SQL — `ROW_NUMBER`, `RANK`, `LAG`/`LEAD` show up constantly in technical interviews and in real ranking/time-sequence problems.

**Practical action**: apply window functions directly to the football dataset (e.g., ranking top scorers by matchday using `RANK() OVER (PARTITION BY ... ORDER BY ...)`), since this type of query will be needed in the Football group projects.

### Week 3 — Schema modeling + local Postgres
First bridge to Phase 2 (Docker), even before it formally begins: spin up a local Postgres via Docker Compose just to have a practice environment without installing anything directly on the operating system. Migrate relevant personal data (e.g., financial history) from spreadsheet to real relational tables.

### Week 4 — Applied project + consolidation
Connect a BI/visualization tool directly to the local Postgres via SQL (not via static import). Document in the vault: reusable model queries, common errors encountered, and the phase's consolidation markdown.

---

## Phase 2 — Docker (Weeks 5–7, ~30h)

### Week 5 — Concepts + first container
Image vs. container, basic `Dockerfile`, volumes, `docker-compose.yml`.

**Practical action**: use the AI to explain every real error encountered while running containers — Docker is learned faster by debugging real errors than by reading isolated theory.

### Week 6 — Multi-service compose
Spin up Postgres + a simple Python application together via `docker-compose`, with a persistent volume so data isn't lost between restarts. This step lays direct groundwork for Phase 3 (dbt needs a database) and Phase 4 (testing locally before deploying to AWS).

### Week 7 — Apply to a real project + consolidation
Containerize an already-existing integration/automation script, validating the full build, run, and persistence cycle before moving on. Document in the vault: a model Dockerfile, common troubleshooting, and design decisions (why a given volume, why a given network).

---

## Phase 3 — dbt (Weeks 8–11, ~40h)

### Week 8 — dbt fundamentals + setup
Models, sources, materializations (view/table/incremental). Set up dbt connected to the Postgres instance already available via Docker.

**Practical action**: bring the dbt course in sections into the corresponding folder; ask the AI to cross-reference each section with the SQL knowledge already consolidated, since dbt is fundamentally "SQL with software engineering discipline."

### Week 9 — Tests, documentation, modularity
`dbt tests` (`unique`, `not_null`, `relationships`), `dbt docs generate`, basic macros with Jinja. This is the layer of rigor that separates a loose script from a professional pipeline.

### Week 10 — Applied project: football data pipeline (part 1)
Model the first layer (staging) of the football data already collected — raw → clean → ready for consumption — with dbt tests guaranteeing data quality from the point of entry.

### Week 11 — Applied project (part 2) + consolidation
Marts layer (final aggregations consumable by a dashboard or application). Document in the vault: a model dbt project structure, naming conventions adopted, and tests that actually caught a real problem in the data — this kind of story is valuable material for interviews.

---

## Phase 4 — Applied AWS: S3 / Athena / Glue (Weeks 12–16, ~50h)

### Week 12 — S3 in depth
Buckets, access policies, lifecycle rules, versioning. Prior familiarity with the AWS console (from previous Lambda experience) speeds up this step — the real gain here is understanding S3 as a data lake layer, not just as storage for loose files.

**Practical action**: migrate the Parquet files generated in the simulation/football projects from local storage to S3.

### Week 13 — Athena
Athena is, in essence, SQL executed directly over files in S3 — after 11 weeks of fluent SQL, this is the highest-return, lowest-effort step in the entire phase. Create external tables over the existing Parquet files and run aggregations without moving any data.

### Week 14 — Glue (catalog + simple jobs)
Glue Catalog for automatic metadata (which feeds directly into Athena), and a simple Glue Job for transformation. This is the least intuitive step of the phase — it's worth taking it slowly and not rushing ahead before the concept is consolidated.

### Week 15 — Integration: full S3 → Glue → Athena pipeline
Migrate the storage/query layer of an already-existing pipeline to this AWS stack, keeping dbt as the transformation layer whenever possible (dbt can also run on top of Athena).

### Week 16 — Consolidation
Document in the vault: the final architecture of the migrated pipeline, real observed costs (AWS has cost traps — it's worth recording what was actually spent), and a before/after comparison between local execution and cloud execution.

---

## Phase 5 — Airflow or Prefect (Weeks 17–21, ~50h)

**Decision to make before starting the phase**: Airflow is more established as a market standard (it appears more frequently in researched data engineering job postings); Prefect is simpler to learn and more ergonomic for personal projects. Since Docker will already be consolidated by this point in the roadmap, the recommendation is **Airflow via the official Docker Compose setup** — this way the practice reflects how the tool is normally deployed in a real corporate environment, rather than a simplified learning version.

### Week 17 — Concepts: DAGs, tasks, operators, scheduler
Spin up Airflow locally via Docker Compose (fully reusing Phase 2). First simple DAG just to validate the full execution cycle.

### Week 18 — Dependencies, sensors, retries, alerts
This is where what actually matters in production comes in: behavior when a task fails, waiting for a file to arrive, error notification.

### Week 19 — Orchestrate a real pipeline (part 1)
Put two already-existing pipelines (e.g., the football ETL and some other collection process) into separate DAGs, each running on its own schedule.

### Week 20 — Orchestrate with cross-pipeline dependency (part 2)
Build a DAG that depends on the completion of another — for example, a calculation/analysis process that only runs after an upstream ETL has finished and updated the base data.

### Week 21 — Final roadmap consolidation
Document in the vault: the complete architecture of the orchestrated pipeline, lessons from the entire roadmap (SQL → Airflow), and a review of the portfolio grid in `project-groups-and-ideas.md` to mark which projects previously classified as dependent on a new skill can now be classified as executable today.

---

## Chronological summary

| Phase | Weeks | Hours | Main deliverable |
|---|---|---|---|
| SQL | 1–4 | ~40h | Populated local Postgres database + documented model queries |
| Docker | 5–7 | ~30h | Reproducible containerized environment + a real containerized script |
| dbt | 8–11 | ~40h | Football data pipeline with staging + marts + tests |
| Applied AWS | 12–16 | ~50h | Pipeline migrated to S3 + Athena + Glue, with documented costs |
| Airflow/Prefect | 17–21 | ~50h | Two or more orchestrated pipelines with dependencies between them |

**Total: 21 weeks, ~210h of dedicated study.**

## Criteria for advancing between phases

Before moving on to the next phase, confirm that the current phase produced: at least one real, functioning applied project (not just a course exercise), the three types of consolidation documents described in the methodology section, and clarity about which knowledge gap, if any, was left for future review — explicitly recorded rather than ignored.
