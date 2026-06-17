---
title: "Plano de Estudos — SQL → Docker → dbt → AWS Aplicado → Airflow/Prefect"
type: study-plan
status: active
created: 2026-06-17
dedication: "10h/semana"
total_duration: "21 semanas (~210h)"
tags: [learning, roadmap, sql, docker, dbt, aws, airflow, data-engineering]
related: [grupos-e-projetos, hmantovani-com]
---

# Plano de Estudos — SQL → Docker → dbt → AWS Aplicado → Airflow/Prefect

## Visão geral

Roadmap sequencial de 5 competências técnicas, pensado como cadeia de dependências reais — cada skill destrava a próxima — e não apenas como lista de popularidade de mercado. Dedicação assumida: 10h semanais, integral. Duração total estimada: 21 semanas (~210h).

Cada fase segue a mesma estrutura de 3 etapas: **fundamentos** guiados por curso externo + Claude Code, **projeto aplicado** real (extraído do grid de portfólio em `grupos-e-projetos.md`), e **consolidação/documentação** no vault antes de avançar para a próxima fase.

A ordem foi escolhida deliberadamente como cadeia de dependência, não como ranking de demanda de mercado isolado:

- **SQL** é pré-requisito literal de tudo que vem depois (dbt é "SQL com superpoderes"; Athena é "SQL sobre arquivos"; Power BI conectado a banco real depende disso).
- **Docker** vem antes de dbt e Airflow porque torna qualquer ferramenta nova testável localmente sem sujar a máquina — destrava a velocidade de aprender o resto.
- **dbt** vem antes de Airflow porque já é produtivo isoladamente (pipelines de transformação simples não precisam de orquestrador ainda).
- **AWS aplicado** entra depois de SQL maduro porque o maior ganho da fase (Athena) é literalmente SQL sobre S3 — sem SQL fluente, o valor da fase cai bastante.
- **Airflow/Prefect** vem por último porque orquestração só faz sentido quando já existem 2+ pipelines reais para coordenar — aprender isso sem ter o que orquestrar é abstrato e esquece rápido.

## Metodologia de uso de IA e knowledge base

Cursos externos são trazidos em transcrição/material por seção para a pasta da skill correspondente. A partir desse material, a IA (Claude Code ou Claude.ai) gera: acompanhamento do curso seção a seção, exercícios de aprendizado aplicados aos próprios dados do usuário (dataset de futebol, finanças pessoais), documentação das conversas e decisões tomadas, e markdowns de consolidação ao final de cada fase.

Cada fase, ao final, gera três tipos de documento na pasta da skill:

1. **Referência rápida** — sintaxe/comandos prováveis de esquecer, para consulta futura.
2. **Decisões e troubleshooting** — erros reais enfrentados e como foram resolvidos. Esse é o material que mais se converte em resposta forte de entrevista técnica.
3. **Mapeamento skill → projeto** — em qual projeto do portfólio a skill foi aplicada de fato, para que a IA consiga responder "o que você sabe fazer com X" citando exemplo concreto, não teórico.

---

## Fase 1 — SQL (Semanas 1–4, ~40h)

### Semana 1 — Fundamentos de sintaxe e modelagem relacional
`SELECT`, `WHERE`, todos os tipos de `JOIN`, `GROUP BY`, funções de agregação. Como a base de modelagem estrela (fato/dimensão) já é familiar via Power BI/DAX, o ganho de tempo aqui está em mapear esse conhecimento prévio para a sintaxe SQL equivalente, em vez de aprender modelagem de dados do zero.

**Ação prática**: trazer a primeira seção do curso externo escolhido para a pasta da skill. Pedir à IA para gerar exercícios sobre um dataset próprio em vez de exercícios genéricos do curso.

### Semana 2 — Subqueries, CTEs, window functions
Este é o salto que separa SQL básico de SQL de analista — `ROW_NUMBER`, `RANK`, `LAG`/`LEAD` aparecem constantemente em entrevista técnica e em problemas reais de ranking/sequência temporal.

**Ação prática**: aplicar window functions diretamente no dataset de futebol (ex.: ranking de artilheiros por rodada usando `RANK() OVER (PARTITION BY ... ORDER BY ...)`), já que esse tipo de consulta será necessário nos projetos do grupo de Futebol.

### Semana 3 — Modelagem de schema + Postgres local
Primeira ponte com a Fase 2 (Docker), mesmo antes dela começar formalmente: subir um Postgres local via Docker Compose apenas para ter ambiente de prática sem instalar nada direto no sistema operacional. Migrar dados pessoais relevantes (ex.: histórico financeiro) de planilha para tabelas relacionais reais.

### Semana 4 — Projeto aplicado + consolidação
Conectar uma ferramenta de BI/visualização diretamente ao Postgres local via SQL (não via import estático). Documentar no vault: queries-modelo reutilizáveis, erros comuns enfrentados, e o markdown de consolidação da fase.

---

## Fase 2 — Docker (Semanas 5–7, ~30h)

### Semana 5 — Conceitos + primeiro container
Imagem vs. container, `Dockerfile` básico, volumes, `docker-compose.yml`.

**Ação prática**: usar a IA para explicar cada erro real encontrado ao rodar containers — Docker se aprende mais rápido depurando erro real do que lendo teoria isolada.

### Semana 6 — Compose multi-serviço
Subir Postgres + uma aplicação Python simples juntos via `docker-compose`, com volume persistente para não perder dados entre reinícios. Essa etapa prepara terreno direto para a Fase 3 (dbt precisa de um banco) e a Fase 4 (testar localmente antes de subir para AWS).

### Semana 7 — Aplicar em projeto real + consolidação
Containerizar um script de integração/automação já existente, validando o ciclo completo de build, run e persistência antes de seguir adiante. Documentar no vault: Dockerfile-modelo, troubleshooting comum, decisões de design (por que determinado volume, por que determinada rede).

---

## Fase 3 — dbt (Semanas 8–11, ~40h)

### Semana 8 — Fundamentos dbt + setup
Models, sources, materializations (view/table/incremental). Setup do dbt conectado ao Postgres já disponível via Docker.

**Ação prática**: trazer o curso de dbt em seções para a pasta correspondente; pedir à IA para cruzar cada seção com o conhecimento de SQL já consolidado, já que dbt é fundamentalmente "SQL com disciplina de engenharia de software".

### Semana 9 — Testes, documentação, modularidade
`dbt tests` (`unique`, `not_null`, `relationships`), `dbt docs generate`, macros básicas com Jinja. Esta é a camada de rigor que separa script solto de pipeline profissional.

### Semana 10 — Projeto aplicado: pipeline de dados de futebol (parte 1)
Modelar a primeira camada (staging) dos dados de futebol já coletados — bruto → limpo → pronto para consumo — com testes dbt garantindo qualidade de dados desde a entrada.

### Semana 11 — Projeto aplicado (parte 2) + consolidação
Camada de marts (agregações finais consumíveis por dashboard ou aplicação). Documentar no vault: estrutura de projeto dbt-modelo, convenções de nomenclatura adotadas, e testes que efetivamente capturaram um problema real nos dados — esse tipo de história é material valioso para entrevista.

---

## Fase 4 — AWS Aplicado: S3 / Athena / Glue (Semanas 12–16, ~50h)

### Semana 12 — S3 a fundo
Buckets, políticas de acesso, lifecycle rules, versionamento. A familiaridade prévia com o console AWS (via experiência anterior com Lambda) acelera esta etapa — o ganho real está em entender S3 como camada de data lake, não apenas como armazenamento de arquivo avulso.

**Ação prática**: migrar os arquivos Parquet gerados nos projetos de simulação/futebol do armazenamento local para o S3.

### Semana 13 — Athena
Athena é, em essência, SQL executado diretamente sobre arquivos no S3 — depois de 11 semanas de SQL fluente, esta é a etapa de maior retorno por menor esforço de toda a fase. Criar tabelas externas sobre os Parquets já existentes e rodar agregações sem mover dado nenhum.

### Semana 14 — Glue (catálogo + jobs simples)
Glue Catalog para metadados automáticos (que alimenta diretamente o Athena), e um Glue Job simples de transformação. Esta é a etapa menos intuitiva da fase — vale ir com calma e sem pressa de avançar antes de consolidar o conceito.

### Semana 15 — Integração: pipeline completo S3 → Glue → Athena
Migrar a camada de armazenamento/consulta de um pipeline já existente para esta stack AWS, mantendo dbt como camada de transformação sempre que possível (dbt também pode rodar sobre Athena).

### Semana 16 — Consolidação
Documentar no vault: arquitetura final do pipeline migrado, custos reais observados (AWS tem armadilhas de custo — vale registrar o que de fato foi gasto), e comparação antes/depois entre execução local e execução em nuvem.

---

## Fase 5 — Airflow ou Prefect (Semanas 17–21, ~50h)

**Decisão a tomar antes de iniciar a fase**: Airflow é mais consolidado como padrão de mercado (aparece com mais frequência em vagas de data engineering pesquisadas); Prefect é mais simples de aprender e mais ergonômico para projetos pessoais. Dado que Docker já estará consolidado nesse ponto do roadmap, a recomendação é **Airflow via Docker Compose oficial** — assim a prática reflete o modo como a ferramenta normalmente é implantada em ambiente corporativo real, em vez de uma versão simplificada de aprendizado.

### Semana 17 — Conceitos: DAGs, tasks, operators, scheduler
Subir Airflow local via Docker Compose (reaproveitando integralmente a Fase 2). Primeiro DAG simples apenas para validar o ciclo completo de execução.

### Semana 18 — Dependências, sensors, retries, alertas
Aqui entra a parte que de fato importa em produção: comportamento diante de falha de task, espera por chegada de arquivo, notificação de erro.

### Semana 19 — Orquestrar pipeline real (parte 1)
Colocar dois pipelines já existentes (ex.: ETL de futebol e algum outro processo de coleta) em DAGs separadas, cada uma rodando em schedule próprio.

### Semana 20 — Orquestrar com dependência entre pipelines (parte 2)
Construir uma DAG que depende da conclusão de outra — por exemplo, um processo de cálculo/análise que só roda depois que o ETL upstream terminou e atualizou os dados-base.

### Semana 21 — Consolidação final do roadmap
Documentar no vault: arquitetura completa do pipeline orquestrado, lições do roadmap inteiro (SQL → Airflow), e revisão do grid de portfólio em `grupos-e-projetos.md` para marcar quais projetos antes classificados como dependentes de skill nova já podem ser classificados como executáveis hoje.

---

## Resumo cronológico

| Fase | Semanas | Horas | Entregável principal |
|---|---|---|---|
| SQL | 1–4 | ~40h | Banco Postgres local populado + queries-modelo documentadas |
| Docker | 5–7 | ~30h | Ambiente containerizado reprodutível + script real containerizado |
| dbt | 8–11 | ~40h | Pipeline de dados de futebol com staging + marts + testes |
| AWS Aplicado | 12–16 | ~50h | Pipeline migrado para S3 + Athena + Glue, com custos documentados |
| Airflow/Prefect | 17–21 | ~50h | Dois ou mais pipelines orquestrados com dependência entre si |

**Total: 21 semanas, ~210h de estudo dedicado.**

## Critério de avanço entre fases

Antes de avançar para a fase seguinte, confirmar que a fase atual produziu: ao menos um projeto aplicado real e funcional (não apenas exercício de curso), os três tipos de documento de consolidação descritos na seção de metodologia, e clareza sobre qual lacuna de conhecimento, se houver, ficou para revisão futura — registrada explicitamente em vez de ignorada.
