---
title: Alternate Football
status: design-complete, pre-implementation
created: 2026-06-17
tags: [football-vault, simulation, dixon-coles, rue-salvesen, monte-carlo]
---

# Alternate Football

## 1. Visão geral

Simulador de "realidades alternativas" para campeonatos de clubes (ligas nacionais, começando pela Premier League). Diferente de outros projetos que tentam prever o futuro, este projeto re-simula competições **que já aconteceram**, usando dados reais da própria temporada + decaimento temporal sobre histórico, para gerar um universo plausível mas distinto do que de fato ocorreu.

Objetivo final: criar um aplicativo que simula temporadas passadas sob demanda. Por exemplo que eu possa "Sim Season" e aí escolho uma liga e uma temporada (Premier League 2025-26). Poderei também editar ou conferir temporadas já simuladas já que toda simulação Montecarlo exporta resultados ricos. Paralelamente pensar também em como manter uma "Wikia" local que roda como um site (localhost), com páginas HTML que linkam entre si e etc. Teremos páginas para clubes, para competições, para temporada, para jogadores... Tudo feito com scripts que coletam outros dados. Exemplo: simulamos a Premier League 2025-26 e salvamos os resultados em bases/pastas organizadas. O script importa esses resultados, coleta o que precisa e insere no template de página da Premier League. Como temos os dados reais podemos sempre comparar universo alternativo com a vida real. Com tudo isso a manutenção fica fácil, os dados se incrementam automaticamente e é fácil resimular em peso se necessário. Um dia isso pode virar um site público e por isso eu quero desde já poder simular como ele ficaria.

Visão de longo prazo (fora de escopo agora, mas a arquitetura deve permitir): usuários do site rodando suas próprias simulações e baixando a "Iteração" escolhida para compor um universo alternativo multi-temporada próprio.

---

## 2. Diferença em relação a um projeto de predição comum

| | predictor | alternate-football |
|---|---|---|
| Direção temporal | Prospectivo (prevê o futuro) | Retrospectivo (re-simula o passado) |
| Granularidade de saída | Uma previsão por jogo | Milhares de realidades alternativas (Monte Carlo) |
| Atualização | Por rodada, conforme resultados reais chegam | Tudo de uma vez, simulação já fechada |
| Hosting | Estático, mas gerado incrementalmente | Estático, gerado em lote (batch) |

Modelo estatístico (Dixon-Coles, Poisson, Elo) é compartilhado em espírito entre os dois.
---

## 3. Disponibilidade de dados por fonte e por época

### 3.1 Cenário geral (futebol mundial, todas as décadas)

| Década | Disponibilidade | Estratégia |
|---|---|---|
| 2000s–hoje | Elenco completo, minutos, gols, assistências, às vezes xG | Atribuição de jogador completa (ver seção 5) |
| 1980s–2000s | Elenco e gols geralmente disponíveis, minutos esparsos | Atribuição por gols/jogos disputados, sem depender de minutos |
| 1950s–1980s | Gols e artilheiros documentados, elenco incompleto | Atribuição só para artilheiros conhecidos + "outros" agrupado |
| 1900s–1950s | Só placar, eventualmente lista de quem marcou | Sem atribuição de jogador — fica só no nível de time |

### 3.2 Cenário específico: 5 grandes ligas europeias (via Transfermarkt)

Elenco está disponível em **qualquer temporada**, mesmo pré-2000, o que muda a tabela acima: o "degrau" de elenco incompleto praticamente desaparece. O que regride com o tempo é só a granularidade estatística:

| Período | Elenco | Estatística disponível | Nível de atribuição |
|---|---|---|---|
| 1990s+ | Completo | Gols, assistências, minutos | Ponderação por taxa (gols/90min) |
| 1980s | Completo | Gols geralmente sim, assistências inconsistentes, minutos raros | Ponderação por gols/jogos disputados |
| 1970s e antes | Completo | Gols disponíveis, assistências praticamente inexistentes | Atribuição de gol; assistência cai para categoria "não atribuída" |

### 3.3 Estrutura de dados confirmada (Transfermarkt)

Confirmado via inspeção de páginas reais (Arsenal FC, jogador Gabriel — ID 435338):

- **Página de clube** (`/squad`, performance data): lista todos os jogadores de uma temporada lado a lado — idade, nacionalidade, jogos no elenco, jogos disputados, gols, assistências, cartões, entradas/saídas como substituto, **PPG (points per game)** quando em campo, minutos totais.
- **Página de jogador** (`/detaillierteleistungsdaten`): granularidade temporada × competição (ex: "25/26 Premier League", "24/25 EFL Cup", separados). Mesmas colunas de stats que a página de clube, mas por competição isolada — essencial porque liga e copa nacional têm dinâmicas de gols diferentes.
- **Agregados de carreira do jogador**: "Performance by Competition" (todas competições, todos os clubes, somado) e "Stats by Club" (todas competições, por clube, somado) — úteis como cache/validação, mas não como fonte primária (a fonte primária é a tabela temporada×competição).

ID do jogador no Transfermarkt funciona como chave única cross-clube e cross-temporada — resolve nativamente o problema de transferências no meio da temporada e de nomes ambíguos, sem necessidade de entity resolution por nome.

---

## 4. Motor de resultado (Camada 0)

Foco declarado: Dixon-Coles + Rue-Salvesen, não dependência pesada de janela de anos vizinhos para estimar "nível de gols da época" — clubes têm volume suficiente de jogos na própria temporada-base para isso. A janela de anos serve para reduzir ruído (times com poucos jogos, ex: promovidos) e para gerar um universo plausível mas distinto do que de fato ocorreu.

### Poisson básico (baseline)
```
λ_casa = ataque_casa * defesa_fora * vantagem_casa * média_liga
λ_fora = ataque_fora * defesa_casa * média_liga
```
Parâmetros via MLE sobre os jogos da temporada-base.

### Dixon-Coles (1997)
- Corrige a assunção de independência entre gols casa/fora (subestimação de empates 0-0, 1-1 sob Poisson puro) via parâmetro de correlação `ρ`.
- Introduz **time-decay**: peso exponencial `exp(-ξ·Δt)` sobre jogos históricos. Isso resolve elegantemente a mistura "temporada-base + anos vizinhos" sem cutoff arbitrário — o decaimento natural substitui a escolha de "uso 2-3 anos vizinhos".
- `ξ` é parametrizável: controla quanto peso cai por unidade de tempo. Janela efetiva maior (~4-5 anos) pode ser necessária pré-1990 só por volume de jogos disponível para estimação estável.

### Rue-Salvesen (1999, extensão do Dixon-Coles)
- Adiciona parâmetro `γ` que corrige a tendência do Dixon-Coles puro de subestimar a diferença de gols em confrontos muito desbalanceados (grande vs pequeno) — relevante em copas nacionais e mata-matas.

### Granularidade por competição
Modelo deve ser ajustado **isolado por competição** (liga ≠ copa nacional ≠ continental), já que a composição de titulares/reservas e a dinâmica de gols difere.

---

## 5. Atribuição de jogador (Camada 1)

Uma vez decidido o placar simulado de um jogo (Camada 0), atribui-se a autoria de cada gol/assistência via distribuição categórica condicionada ao time.

### Lógica de atribuição de gol
```python
# conceitual
peso_jogador = gols_marcados_pelo_jogador_90min / soma_pesos_do_time
autor = sorteio_categorico(jogadores_do_time, pesos=pesos_normalizados)
```
Ponderar por **taxa por 90 minutos**, não apenas contagem total — evita que um jogador com poucos minutos mas presença na temporada tenha peso igual a um titular.

### Lógica de atribuição de assistência
Distribuição categórica condicionada a "dado que X marcou, quem assistiu", excluindo o próprio autor. Inclui categoria obrigatória "sem assistência" (chute de longe, pênalti, gol contra, etc).

### Fallback gracioso por era
`era_config` (mapeamento ano/competição → nível de dado disponível) determina qual nível de atribuição é usado, com fallback automático:
1. Taxa por 90min (quando minutos disponíveis)
2. Taxa por jogo disputado (quando só gols/jogos disponíveis)
3. Atribuição só de gol, assistência vira "não atribuída" (quando assistências não existem na fonte)
4. Sem atribuição de jogador, fica só no nível de time (quando elenco não existe — não se aplica ao cenário das 5 grandes ligas via Transfermarkt, onde elenco está sempre disponível)

---

## 6. Sistema de notas/rating de jogador

Scoring modular por categoria de posição, aplicável tanto a dados reais quanto simulados (necessário para o toggle real/simulado funcionar de forma comparável).

```python
# conceitual, pesos ilustrativos — calibrar empiricamente
RATING_WEIGHTS = {
    "GK":  {"clean_sheet_pct": 0.4, "goals_conceded_per90": -0.3, ...},
    "DEF": {"clean_sheet_pct": 0.3, "goals_per90": 0.1, "cards_per90": -0.1, ...},
    "MID": {"assists_per90": 0.3, "goals_per90": 0.2, ...},
    "FWD": {"goals_per90": 0.4, "assists_per90": 0.2, ...},
}
```

Usado para: Time da Rodada/Mês, leaderboards, "jogadores em destaque" durante o Live Sim (forma recente = rating calculado sobre janela de últimas N rodadas).

---

## 7. Motor de simulação Monte Carlo

### Fluxo
1. Fit do Dixon-Coles + Rue-Salvesen uma única vez, usando todo histórico disponível até o ponto da simulação, com time-decay.
2. Roda N iterações independentes (1.000–10.000) da temporada inteira, cada uma sorteando todos os jogos da competição a partir dos parâmetros ajustados.
3. Para cada iteração: calcula classificação final, artilheiros, etc.
4. Calcula **distância** entre a classificação de cada iteração e a classificação real.
5. Usa a distância como peso (inversamente proporcional) para sortear, via RNG, qual iteração é a "realidade definitiva" do universo.

### Métrica de distância (classificação simulada vs real)
Evitar cosine similarity pura sobre pontos (mistura ordem com magnitude). Preferir:
- **Distância de Spearman** (correlação de postos) — mede diretamente diferença de ranking.
- **Kendall tau** — conta inversões de pares na ordem relativa.
- Opcionalmente combinar com distância de pontos para capturar magnitude além de ordem.

### Peso de seleção
```python
peso_i = exp(-k * distancia_i)   # k controla o quão punitivo é divergir da realidade
realidade_escolhida = random.choices(iteracoes, weights=pesos, k=1)
```
`k` é um parâmetro de calibração reutilizável em todas as temporadas futuras do "universo" maior (fora de escopo atual, mas a mecânica de seleção é a mesma peça que vai unir todas as temporadas simuladas num dia).

---

## 8. Estrutura de dados (revisão final — tabela longa, sem fragmentação por rodada)

Decisão de design: **não** fragmentar em arquivos por rodada/iteração. Uma tabela longa e larga, filtrável via agregação sob demanda, é superior em simplicidade e manutenção — qualquer derivação (tabela de classificação, artilheiros, forma recente) é uma função de agregação aplicada com filtro, nunca um arquivo separado a manter sincronizado.

```
simulations/
└── premier-league_2025-26/
    ├── manifest.json                  # liga, temporada, modelo, seed, N iterações, k
    ├── matches.parquet                # TODAS as iterações, TODOS os jogos
    │   # colunas: iteration, round, date, home_club, away_club,
    │   #          home_goals, away_goals
    ├── player_events.parquet          # TODOS os eventos, todas as iterações
    │   # colunas: iteration, round, match_id, player_id, event_type
    │   #          (goal/assist/yellow/red), minute (opcional)
    ├── iterations_summary.parquet     # 1 linha por iteração: standings final
    │   # (cache derivado de matches.parquet — recalculável, não fonte primária)
    ├── distances_and_weights.parquet  # iteration, spearman_dist, kendall_dist, weight
    └── selected_iteration_id.json     # iteração escolhida + distância dela
```

Apenas `matches.parquet` e `player_events.parquet` são fontes primárias. Todo o resto é cache derivado, regenerável a qualquer momento se a lógica de agregação mudar (ex: critério de desempate).

### Formato: Parquet
Colunar, comprimido — 380 jogos × 1.000 iterações = 380.000 linhas cabem em poucos MB. Compatível com leitura client-side via DuckDB-WASM (ou similar), permitindo filtragem direto no navegador sem backend — essencial para o possível requisito futuro de hospedagem 100% estática ("sem PC ligado").

### Exemplos de agregação sob demanda
```python
jogos_da_realidade = matches[matches.iteration == selected_iteration]

def get_standings_up_to(round_n):
    subset = jogos_da_realidade[jogos_da_realidade.round <= round_n]
    return calcular_tabela(subset)

def get_round_matches(round_n):
    return jogos_da_realidade[jogos_da_realidade.round == round_n]

def get_top_scorers_up_to(round_n):
    eventos = player_events[(player_events.iteration == selected_iteration) &
                              (player_events.round <= round_n) &
                              (player_events.event_type == "goal")]
    return eventos.groupby("player_id").size().sort_values(ascending=False)
```

---

## 9. Estrutura do app

Linguagem principal: **inglês**.

### 9.1 Navegação principal
```
Home
├── New Simulation
├── View Simulation (saved sims)
├── Search competition
├── Search club
├── Search player
└── Settings
```

### 9.2 Fluxo de New Simulation
```
New Simulation
├── Select Continent → Country → League (ex: Europe > England > Premier League)
├── Select Season (somente temporadas com dados suficientes aparecem)
├── Pre-simulation view: coeficientes do modelo, projeções, elenco atual
├── Set iteration count (1,000–10,000)
├── Run Monte Carlo
│    → processa N iterações, calcula distâncias, calcula pesos
├── Weighted RNG seleciona a iteração "definitiva"
└── Big reveal: "Iteration #845 of 1,000" + botão "Live Sim"
```

### 9.3 Live Sim (vivência cronológica da iteração escolhida)
Não recalcula nada — apenas percorre, rodada a rodada, dados já existentes em `matches.parquet`/`player_events.parquet` filtrados pela iteração escolhida.

```
Live Sim
├── Round-by-round playback (next round / autoplay)
├── Standings table evolving        [toggle: simulated / real]
├── Top scorers evolving
├── "Players on fire" — forma recente (rating sobre janela de N rodadas)
└── Ao fim da última rodada → transição para Recap
```

### 9.4 Recap (final da temporada simulada)
```
Recap
├── Classificação final: simulada vs real, lado a lado
├── "Maiores zebras" — times com maior divergência de posição final
├── Melhores jogadores: simulado vs real
└── Resumo narrativo (texto gerado a partir dos dados agregados)
```

### 9.5 Distribution View (visão estatística das N iterações — não só a escolhida)
```
Distribution View
├── "Em X% das simulações, o time Y foi campeão"
├── Histograma de posição final por time, across todas as iterações
└── Visualização de distância/peso de cada iteração
```
Esta seção é o conteúdo mais "vendável" para portfólio — visualiza sofisticação estatística (Monte Carlo) de forma direta.

### 9.6 View Simulation (sims salvas)
```
View Simulation
├── Lista de simulações salvas
└── Ao abrir uma:
    ├── Rever Live Sim do zero (replay completo)
    ├── Checar Recap
    ├── Checar Distribution View
    ├── Editar tags
    ├── Editar notas
    └── Deletar
```

---

## 10. Hospedagens

Objetivo inicial: local, rodando em localhost. Todos os Parquet/JSON já processados podem ser importados e agregados para gerar todo tipo de base. Arquivos que se conectam entre si como uma Wikia, (onde posso procurar a página da Premier League 2025-26 e já terei link de clubes, dos jogadores, das outras temporadas da Premier League, etc) e poder também navegar por esse universo com um app também local que dá uma GUI pro processo de simulação e etc.

Objetivo futuro: www.hmantovani.com, **sem servidor rodando continuamente**.

- Toda computação pesada (fit do modelo, Monte Carlo, cálculo de distâncias) acontece offline/local antes do deploy.
- Site consome apenas os arquivos Parquet/JSON já processados — leitura estática.
- Filtragem e agregação (standings por rodada, artilheiros, etc.) podem rodar client-side via engine tipo DuckDB-WASM, eliminando necessidade de backend mesmo para as consultas interativas do Live Sim.
- Visão de longo prazo (fora de escopo atual): permitir que usuários do site rodem suas próprias simulações e baixem a Iteração escolhida — a estrutura de dados acima já é compatível com isso sem refatoração estrutural.

---

## 11. Decisões em aberto / próximos passos

- [ ] Calibrar `ξ` (time-decay) e `k` (punição de distância na seleção de iteração) empiricamente
- [ ] Decidir stack de frontend (compatível com Parquet + DuckDB-WASM client-side)
- [ ] Calibrar pesos do sistema de rating por posição (seção 6) com dados reais antes de aplicar a simulações
- [ ] Definir critério de desempate na tabela de classificação (afeta `calcular_tabela` e depende de input manual pois cada liga tem o seu)