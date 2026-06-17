---
title: "Grupos e Projetos de Portfólio — hmantovani.com"
type: project-catalog
status: brainstorm-expandido
created: 2026-06-17
tags: [learning, portfolio, football, power-bi, python, data-analysis, data-engineering, data-science]
related: [plano-de-estudos, football-vault, club-league-simulator]
---

# Grupos e Projetos de Portfólio — hmantovani.com

## Como ler este documento

Catálogo expandido de ideias de projeto para a seção de portfólio do site, organizado em 8 grupos sob 3 macro-áreas de dados — **Data Analysis**, **Data Engineering** e **Data Science**. O objetivo desta fase é variedade: 20 ideias por grupo, sem compromisso de execução. A consolidação para um número menor de grupos/projetos efetivamente construídos acontece depois, buscando denominadores comuns entre as ideias escolhidas.

Cada projeto é descrito com: URL prevista no site (`hmantovani.com/grupo/projeto`), resumo, dados necessários e onde coletar, resultado esperado, skills envolvidas, e o motivo pelo qual pode atrair atenção de recrutadores internacionais (EUA, Canadá, Europa) e nacionais.

Marcação de viabilidade atual:
- 🟢 **executável hoje**, sem adquirir nenhuma skill nova
- 🟡 **gap pontual** — uma skill específica nova, de baixo custo de aprendizado
- 🔴 **gap relevante** — stack nova mais pesada, alinhada ao roadmap de `plano-de-estudos.md`

Cada grupo contém ao menos um projeto 🟢.

Posicionamento estratégico: o site já se apresenta como "Data Professional" multidisciplinar (não apenas Analyst, Engineer ou Scientist), com experiência prévia em IBM, Keyence e Thermo Fisher Scientific. A divisão em 3 macro-áreas reforça essa narrativa de pipeline completo — da extração ao modelo preditivo — em vez de especialização prematura em um único cargo, ampliando o leque de oportunidades de freelance e contrato sem perder credibilidade técnica em nenhuma camada.

Todo o site e os notebooks/visualizações de cada projeto serão bilíngues (PT-BR / EN), reforçando marca pessoal no Brasil e empregabilidade internacional simultaneamente.

---

# MACRO-ÁREA: DATA ANALYSIS

## Grupo 1 — `/football` (Data Analysis aplicada a domínio esportivo)

**1. 🟢 `/football/world-cup-2026-predictor`**
Previsão da Copa do Mundo 2026 por fases, com data de corte móvel — a cada rodada concluída, os resultados reais entram como dado de treino e o modelo prevê a fase seguinte (8 momentos de predição: R1, R2, R3, 16-avos, oitavas, quartas, semi, final/3º lugar), comparando ao final quão antecipadamente cada resultado foi acertado.
**Dados**: Kaggle international football results, Elo ratings de international-football.net, odds via The Odds API.
**Resultado esperado**: site com histórico de predições por fase e gráfico de calibração (acerto vs. antecedência da previsão).
**Skills**: Python, pandas, modelagem probabilística (Poisson/Elo), visualização de dados.
**Atrai recrutador porque**: é o projeto-bandeira do portfólio — combina rigor estatístico, consumo de dados em tempo real e autoavaliação honesta do modelo, algo raro mesmo em portfólios mais avançados.

**2. 🟡 `/football/club-league-simulator`**
Simulação de "realidade alternativa" de uma liga de clubes já encerrada, via Monte Carlo (Dixon-Coles + Rue-Salvesen), com Live Sim navegável rodada a rodada e Distribution View estatística.
**Dados**: Transfermarkt (elenco e estatísticas por competição) ou dataset Kaggle equivalente.
**Resultado esperado**: site estático servindo milhares de iterações pré-computadas em Parquet, consumidas client-side.
**Skills**: Python, estatística avançada (Dixon-Coles, Rue-Salvesen), DuckDB-WASM, arquitetura zero-backend.
**Gap**: DuckDB-WASM no front-end para servir Parquet sem servidor — curva curta para quem já programa.
**Atrai recrutador porque**: modelagem de nível "paper acadêmico" combinada com arquitetura de custo zero de hospedagem — sinaliza maturidade de engenharia, não só ciência de dados.

**3. 🟢 `/football/elo-explorer`**
Visualizador histórico interativo da curva de Elo de uma seleção ao longo do tempo, com eventos marcados (Copas, eliminações, zebras), permitindo comparação entre duas seleções.
**Dados**: reaproveita o dataset do projeto 1.
**Resultado esperado**: gráfico interativo com narrativa histórica.
**Skills**: visualização de dados (D3/Recharts), storytelling com dados.
**Atrai recrutador porque**: produção rápida que demonstra capacidade de extrair narrativa de dado bruto — bom projeto de entrada antes dos mais pesados.

**4. 🟡 `/football/knockout-bracketology`**
Re-simulação Monte Carlo de uma fase de mata-mata real (Champions League, Libertadores, Copa do Mundo), gerando heatmap de cruzamentos prováveis e probabilidade de cada time chegar à final.
**Dados**: chaveamento real + Elo/Dixon-Coles já calculado no projeto 1.
**Resultado esperado**: heatmap interativo + "caminho mais fácil/difícil" do chaveamento.
**Skills**: Monte Carlo, visualização de dados.
**Atrai recrutador porque**: alto impacto visual por baixo esforço de produção — bom material de thumbnail/primeira impressão do portfólio.

**5. 🟡 `/football/transfer-market-trends`**
Análise exploratória de tendências do mercado de transferências (inflação de valores por posição/idade/liga ao longo dos anos), com dashboards interativos.
**Dados**: Transfermarkt (valores de mercado históricos).
**Resultado esperado**: relatório analítico com visualizações de tendência temporal.
**Skills**: análise exploratória, visualização, storytelling.
**Gap**: nenhum técnico crítico — gap está na disponibilidade/coleta de dados históricos em escala.
**Atrai recrutador porque**: aplica análise de séries temporais e inflação de mercado, transferível diretamente para análise de preços em qualquer setor.

**6. 🟢 `/football/home-advantage-study`**
Estudo estatístico sobre a magnitude do "fator casa" no futebol mundial — comparando ligas, décadas, e o efeito da ausência de público (período de pandemia como experimento natural).
**Dados**: Kaggle international/club football results.
**Resultado esperado**: relatório com testes de hipótese e visualização comparativa entre contextos.
**Skills**: estatística inferencial, testes de hipótese, Python.
**Atrai recrutador porque**: mostra raciocínio causal e não apenas correlação — habilidade analítica valorizada em entrevistas de Data Analyst/Scientist.

**7. 🟡 `/football/referee-bias-dashboard`**
Dashboard analisando padrões de arbitragem (cartões, pênaltis, tempo de jogo adicionado) por árbitro e por contexto de jogo.
**Dados**: dados de eventos de partida (Kaggle, ou fontes abertas de estatísticas de jogo).
**Resultado esperado**: dashboard interativo com ranking e padrões por árbitro.
**Skills**: agregação de dados de evento, visualização interativa.
**Gap**: granularidade dos dados de evento pode exigir tratamento mais cuidadoso de fontes incompletas.
**Atrai recrutador porque**: tema com apelo de mídia esportiva, bom para demonstrar capacidade de comunicar achados sensíveis com responsabilidade estatística.

**8. 🟢 `/football/squad-age-curve`**
Análise de curva de desempenho por idade de jogador (pico de performance por posição), comparando dados históricos e atuais.
**Dados**: Transfermarkt ou dataset Kaggle de estatísticas de jogador.
**Resultado esperado**: gráfico de curva de idade x performance por posição, com intervalo de confiança.
**Skills**: regressão não-linear, visualização estatística.
**Atrai recrutador porque**: aplica modelagem estatística clássica (curvas de envelhecimento) usada também em People Analytics e RH — ponte para outro setor.

**9. 🟡 `/football/expected-goals-explainer`**
Implementação própria (simplificada) de um modelo de Expected Goals (xG) a partir de dados de eventos de chute, com explicação didática do modelo, bilíngue.
**Dados**: dataset público de eventos de chute (StatsBomb open data ou equivalente).
**Resultado esperado**: modelo de xG próprio + comparação com xG oficial divulgado por fontes públicas.
**Skills**: machine learning (classificação probabilística), feature engineering.
**Gap**: granularidade dos dados de evento exige tratamento mais cuidadoso.
**Atrai recrutador porque**: xG é o modelo mais conhecido de analytics esportivo no mercado — implementar do zero (não só consumir) prova entendimento profundo, não familiaridade superficial.

**10. 🟢 `/football/world-cup-historical-atlas`**
Atlas interativo de todas as Copas do Mundo já disputadas — sedes, campeões, artilheiros, evolução de formato — como peça de storytelling de dados histórico.
**Dados**: Kaggle international football (histórico de Copas).
**Resultado esperado**: linha do tempo interativa navegável.
**Skills**: visualização de dados, storytelling, design de interface.
**Atrai recrutador porque**: projeto visualmente atrativo e de produção relativamente rápida, bom complemento "leve" ao lado dos projetos mais pesados de modelagem.

**11. 🟡 `/football/league-competitive-balance-index`**
Índice próprio de equilíbrio competitivo entre ligas (quão previsível é o campeão/rebaixamento em cada liga, comparado entre países e décadas).
**Dados**: Kaggle club football results, múltiplas ligas.
**Resultado esperado**: ranking de ligas por equilíbrio competitivo, com metodologia documentada.
**Skills**: criação de índice/score próprio, estatística comparativa.
**Gap**: nenhum técnico crítico — gap está em desenhar metodologia de índice defensável.
**Atrai recrutador porque**: criar uma métrica própria e defendê-la metodologicamente é exatamente o tipo de exercício que aparece em case de entrevista de Data Scientist.

**12. 🟡 `/football/injury-impact-analysis`**
Análise do impacto de lesões de jogadores-chave no desempenho do time (antes/durante/depois da lesão), com grupo de controle estatístico.
**Dados**: combinação de dados de lesão (fontes esportivas abertas) com resultados de partida.
**Resultado esperado**: relatório com análise de impacto causal (diferença em diferenças ou método similar).
**Skills**: inferência causal aplicada, design quase-experimental.
**Gap**: dados de lesão são mais esparsos e exigem curadoria manual maior.
**Atrai recrutador porque**: inferência causal é habilidade de maior nível, frequentemente diferenciadora em vagas de Data Scientist sênior.

**13. 🟢 `/football/national-team-elo-rankings-explorer`**
Ranking interativo Elo de todas as seleções, navegável por data, com filtro por confederação/continente.
**Dados**: international-football.net Elo ratings.
**Resultado esperado**: tabela/gráfico interativo navegável no tempo.
**Skills**: visualização interativa, manipulação de séries temporais.
**Atrai recrutador porque**: reaproveita dado já coletado para outros projetos, ótima relação esforço/resultado para preencher o grid rapidamente.

**14. 🟡 `/football/playing-style-clustering`**
Clusterização de times por estilo de jogo (posse, pressing, transição) usando estatísticas agregadas de partida.
**Dados**: dataset de estatísticas avançadas de partida (StatsBomb open data ou equivalente).
**Resultado esperado**: mapa de clusters de estilo de jogo, com times próximos visualmente agrupados.
**Skills**: aprendizado não-supervisionado (k-means, PCA), redução de dimensionalidade.
**Gap**: nenhum técnico crítico, mas exige dataset com granularidade tática.
**Atrai recrutador porque**: clusterização aplicada a domínio compreensível (estilo de jogo) é mais fácil de explicar em entrevista do que clusterização sobre dado abstrato.

**15. 🔴 `/football/multiverse-engine`**
Encadeamento de múltiplas temporadas simuladas com estado persistente entre elas (promoção/queda, valorização de elenco afetando a simulação seguinte).
**Dados**: extensão direta do projeto 2.
**Resultado esperado**: "universo" navegável ano a ano.
**Skills**: arquitetura de estado persistente, banco de dados gerenciado, AWS Lambda/S3.
**Gap**: é o único projeto do grupo que exige backend leve persistente — alinhado à Fase 4/5 do roadmap.
**Atrai recrutador porque**: sinaliza pensamento de sistemas de longo prazo, não apenas scripts isolados.

**16. 🟢 `/football/world-cup-qualifiers-tracker`**
Painel acompanhando eliminatórias continentais em andamento, com probabilidade de classificação calculada a partir do modelo Elo.
**Dados**: Kaggle/Elo (mesmos do projeto 1), atualizado periodicamente.
**Resultado esperado**: painel atualizável com probabilidades por seleção.
**Skills**: Python, automação de atualização de dados, visualização.
**Atrai recrutador porque**: projeto "vivo" que se atualiza com a realidade, mostra capacidade de manter um produto de dados funcionando ao longo do tempo, não só entregar uma vez.

**17. 🟡 `/football/manager-tenure-performance`**
Estudo da relação entre tempo de permanência de treinador e desempenho do time, identificando padrões de "efeito lua de mel" e declínio.
**Dados**: dados históricos de técnicos por clube (fontes esportivas abertas) cruzados com resultados.
**Resultado esperado**: visualização de performance por mês de mandato, agregada entre múltiplos casos.
**Skills**: alinhamento de séries temporais com eventos (mudança de técnico), estatística descritiva.
**Gap**: curadoria de dados de mandato de técnico exige trabalho manual de coleta.
**Atrai recrutador porque**: tema de interesse popular com rigor estatístico por trás — bom para portfólio público com potencial de compartilhamento.

**18. 🟢 `/football/goal-timing-patterns`**
Análise de padrões temporais de gols dentro da partida (minutos mais prováveis, efeito de gols no início vs. final, comeback patterns).
**Dados**: Kaggle club/international football com timestamp de gol.
**Resultado esperado**: histograma e análise de distribuição temporal de gols.
**Skills**: análise de distribuição, visualização estatística.
**Atrai recrutador porque**: projeto simples e rápido de produzir, bom para "encher" o grid inicial com qualidade sem grande esforço.

**19. 🔴 `/football/video-highlight-classifier`**
Classificador de eventos relevantes (gol, cartão, falta perigosa) a partir de metadados de transmissão ou narrativa textual de jogo, sem necessariamente processar vídeo bruto.
**Dados**: textos de narração/live blog de partidas (fontes esportivas abertas).
**Resultado esperado**: classificador de evento a partir de texto, com métricas de precisão/recall.
**Skills**: NLP, processamento de texto, classificação supervisionada.
**Gap**: NLP aplicado é stack adicional não coberta no roadmap atual — entra como ampliação futura.
**Atrai recrutador porque**: aproxima o portfólio de NLP/IA aplicada, área de demanda crescente, sem depender de visão computacional pesada.

**20. 🟡 `/football/competitive-balance-world-cup-history`**
Estudo de como o nível de competitividade da Copa do Mundo evoluiu historicamente (diferença de gols, zebras, distância de Elo entre confrontos), conectando com o projeto 1 como contexto histórico de calibração do modelo.
**Dados**: reaproveita datasets dos projetos 1 e 13.
**Resultado esperado**: relatório histórico complementar ao predictor principal.
**Skills**: análise histórica de séries, visualização comparativa.
**Atrai recrutador porque**: funciona como peça de contexto/autoridade ao lado do projeto-bandeira, reforçando profundidade de domínio no tema.

---

## Grupo 2 — `/power-bi` (Data Analysis com foco em ferramenta de BI)

**1. 🟢 `/power-bi/personal-finance-cockpit`**
Dashboard pessoal de finanças (gastos, investimentos, metas), alimentado por extratos exportados manualmente ou Open Finance.
**Dados**: extratos próprios (CSV) ou API de Open Finance brasileira.
**Resultado esperado**: relatório com DAX avançado (médias móveis, metas vs. realizado).
**Skills**: Power BI, DAX, modelagem de dados em estrela.
**Atrai recrutador porque**: cobre os fundamentos que praticamente toda vaga júnior/pleno de BI exige — DAX para inteligência temporal e modelagem financeira.

**2. 🟡 `/power-bi/wc2026-fan-analytics`**
Dashboard público sobre a Copa do Mundo 2026 — estatísticas de seleções, comparação histórica, favoritismo segundo os números — reaproveitando dados do grupo Football em formato BI tradicional.
**Dados**: reaproveita datasets do grupo `/football`.
**Resultado esperado**: relatório publicável, eventualmente embedável no site.
**Skills**: DAX avançado (time intelligence, what-if parameters), Power BI Embedded.
**Gap**: parâmetros what-if e embedding exigem prática adicional pontual.
**Atrai recrutador porque**: mesma fonte de dados do projeto-bandeira de Futebol, demonstrando fluência na ferramenta mais pedida em vagas de Data Analyst — duplo proveito do mesmo trabalho de coleta.

**3. 🟢 `/power-bi/job-market-tracker`**
Dashboard de acompanhamento do próprio mercado de trabalho-alvo (vagas remotas em Data, por país/skill/faixa salarial), atualizado periodicamente.
**Dados**: agregação manual ou semi-automatizada de portais de vaga públicos.
**Resultado esperado**: painel de inteligência de mercado pessoal, reutilizável na busca de oportunidades.
**Skills**: Power Query, modelagem de dados, DAX.
**Atrai recrutador porque**: meta-projeto interessante de se mencionar em entrevista — "construí um dashboard para entender o próprio mercado que estou buscando" comunica proatividade.

**4. 🟢 `/power-bi/personal-productivity-dashboard`**
Dashboard de hábitos e produtividade pessoal (horas de estudo, commits, progresso no roadmap de aprendizado), conectado ao GitHub e a registros manuais.
**Dados**: GitHub API, registros próprios de tempo de estudo.
**Resultado esperado**: painel de acompanhamento do próprio roadmap de aprendizado.
**Skills**: Power BI, APIs REST, DAX.
**Atrai recrutador porque**: projeto curto e genuinamente útil (você usaria de fato), demonstra automação de auto-acompanhamento e disciplina.

**5. 🟡 `/power-bi/sales-funnel-simulator`**
Dashboard simulado de funil de vendas B2B (lead → qualificação → proposta → fechamento), com dados sintéticos realistas, para demonstrar fluência em métricas de negócio clássicas.
**Dados**: dados sintéticos gerados proceduralmente (sem empresa real envolvida).
**Resultado esperado**: dashboard de funil com taxas de conversão por etapa, cohort analysis.
**Skills**: DAX (cohort analysis), modelagem de funil.
**Gap**: cohort analysis em DAX exige prática específica de fórmulas mais avançadas.
**Atrai recrutador porque**: funil de vendas é o tipo de dashboard mais pedido em entrevista prática de BI para vagas comerciais/SaaS — projeto direcionado a esse público específico.

**6. 🔴 `/power-bi/realtime-ops-dashboard`**
Dashboard operacional simulando dados de operação em quase tempo real, usando DirectQuery ou streaming dataset.
**Dados**: fonte simulada de eventos em tempo real (gerador próprio de dados sintéticos).
**Resultado esperado**: dashboard que se atualiza automaticamente, não apenas relatório estático.
**Skills**: Power BI streaming dataset, arquitetura de dados em tempo real, possivelmente AWS Kinesis/Lambda.
**Gap**: arquitetura de streaming é stack adicional, alinhada à Fase 4 do roadmap (AWS aplicado).
**Atrai recrutador porque**: a maioria dos portfólios de BI mostra apenas dashboards estáticos — demonstrar streaming é diferenciação real para vagas que mencionam pipelines de dados em tempo real.

**7. 🔴 `/power-bi/databricks-lakehouse-demo`**
Power BI conectado a um lakehouse Databricks (camadas bronze/silver/gold), usando um dos datasets de futebol como fonte.
**Dados**: reaproveita datasets do grupo `/football`.
**Resultado esperado**: case completo "do dado bruto ao dashboard" passando por arquitetura medallion.
**Skills**: Databricks, arquitetura medallion, Power BI.
**Gap**: Databricks foi explicitamente deixado fora do roadmap atual — projeto de ampliação futura, não prioritário agora.
**Atrai recrutador porque**: Databricks aparece constantemente em vagas de data engineer pesquisadas — credencial rara em quem vem do mundo Excel/Power BI puro.

**8. 🟢 `/power-bi/sql-vs-dax-comparison-notebook`**
Material didático bilíngue comparando como resolver o mesmo problema analítico em SQL puro vs. DAX, lado a lado, como peça de ensino e prova de fluência cruzada entre as duas linguagens.
**Dados**: dataset pequeno e didático (ex.: vendas fictícias ou dados públicos simples).
**Resultado esperado**: notebook/artigo comparativo publicável.
**Skills**: SQL, DAX, didática técnica.
**Atrai recrutador porque**: conteúdo educacional é ótimo sinal de domínio profundo — quem ensina bem demonstra que entende de verdade, não só executa.

**9. 🟡 `/power-bi/customer-churn-dashboard`**
Dashboard preditivo de churn de clientes (com modelo de propensão simples integrado via Power BI + Python visual), usando dataset público de churn.
**Dados**: dataset público de churn (ex.: telecom churn dataset, amplamente disponível).
**Resultado esperado**: dashboard com score de risco de churn por cliente.
**Skills**: Power BI, integração com Python (visual de script Python), modelagem preditiva simples.
**Gap**: integração Power BI + Python exige configuração específica de ambiente.
**Atrai recrutador porque**: churn é um dos cases mais pedidos em entrevista de Analytics/BI para SaaS — projeto direcionado a esse nicho de vaga.

**10. 🟢 `/power-bi/world-football-kpi-scorecard`**
Scorecard executivo de KPIs do futebol mundial (gols por jogo por liga, idade média de elenco, valor de mercado agregado), em formato de relatório gerencial.
**Dados**: reaproveita datasets do grupo `/football`.
**Resultado esperado**: relatório estilo "executive scorecard", didático e direto.
**Skills**: Power BI, design de dashboard executivo.
**Atrai recrutador porque**: demonstra capacidade de simplificar dado complexo para audiência não-técnica — habilidade frequentemente subestimada e muito valorizada.

**11. 🟡 `/power-bi/inventory-supply-chain-demo`**
Dashboard de cadeia de suprimentos/estoque (giro de estoque, ruptura, lead time de fornecedor), com dados sintéticos realistas.
**Dados**: dados sintéticos gerados proceduralmente.
**Resultado esperado**: dashboard operacional de supply chain.
**Skills**: DAX, modelagem de dados operacionais.
**Gap**: modelagem de supply chain exige entendimento de domínio específico (lead time, reorder point).
**Atrai recrutador porque**: setor industrial (alinhado à experiência prévia em Keyence/Thermo Fisher) é forte ponto de conexão com histórico profissional real.

**12. 🟢 `/power-bi/personal-investment-vs-benchmark`**
Dashboard comparando performance de carteira de investimentos pessoal contra benchmarks (CDI, IBOVESPA, S&P 500).
**Dados**: dados próprios de carteira + APIs públicas de cotação (Yahoo Finance, Brapi.dev).
**Resultado esperado**: relatório de performance relativa com gráfico de drawdown.
**Skills**: Power BI, DAX, APIs financeiras.
**Atrai recrutador porque**: ponte direta com o grupo `/quant`, reforçando consistência de domínio (finanças pessoais) através de duas ferramentas diferentes.

**13. 🔴 `/power-bi/multi-source-data-warehouse-demo`**
Dashboard alimentado por um pequeno data warehouse próprio (Postgres + dbt + Power BI), consolidando múltiplas fontes (futebol, finanças, produtividade) em um modelo único.
**Dados**: consolidação de múltiplos datasets já existentes nos outros grupos.
**Resultado esperado**: case de "single source of truth" pessoal.
**Skills**: dbt, Postgres, Power BI, modelagem dimensional.
**Gap**: depende da Fase 3 do roadmap (dbt) estar madura.
**Atrai recrutador porque**: demonstra entendimento de arquitetura de dados de ponta a ponta, não apenas a camada de visualização — projeto de síntese de todo o roadmap.

**14. 🟢 `/power-bi/excel-to-power-bi-migration-case`**
Case documentado de migração de uma planilha Excel complexa (com fórmulas e tabelas dinâmicas) para um modelo Power BI equivalente, explicando ganhos de performance e manutenibilidade.
**Dados**: planilha própria já existente como ponto de partida.
**Resultado esperado**: artigo/case comparativo antes-depois.
**Skills**: Excel avançado, Power BI, comunicação técnica.
**Atrai recrutador porque**: muitas empresas (especialmente PMEs) ainda vivem nessa transição — case prático de migração é argumento de venda direto para clientes freelance.

**15. 🟡 `/power-bi/geospatial-analysis-demo`**
Dashboard com análise geoespacial (mapas de calor, densidade) aplicado a um tema de interesse (ex.: distribuição geográfica de clubes de futebol, ou de investidores por região).
**Dados**: dados próprios geocodificados ou dataset público com coordenadas.
**Resultado esperado**: mapa interativo com camadas de densidade.
**Skills**: Power BI (visual de mapa, ArcGIS integration), geocodificação básica.
**Gap**: visuais geoespaciais avançados exigem prática específica.
**Atrai recrutador porque**: análise geoespacial é frequentemente subutilizada em portfólios de BI — diferenciação visual e técnica.

**16. 🟢 `/power-bi/ab-test-results-dashboard`**
Dashboard de apresentação de resultados de teste A/B (significância estatística, intervalo de confiança, recomendação de decisão), com dados sintéticos de exemplo didático.
**Dados**: dados sintéticos gerados proceduralmente simulando um experimento.
**Resultado esperado**: template reutilizável de relatório de teste A/B.
**Skills**: DAX, estatística inferencial básica, design de dashboard de decisão.
**Atrai recrutador porque**: testes A/B são linguagem comum entre produto, marketing e dados — mostrar fluência nessa interface amplia o leque de vagas elegíveis.

**17. 🟡 `/power-bi/hr-people-analytics-demo`**
Dashboard de People Analytics (turnover, tempo médio de permanência, distribuição salarial por senioridade), com dados sintéticos.
**Dados**: dados sintéticos gerados proceduralmente.
**Resultado esperado**: dashboard de RH executivo.
**Skills**: DAX, modelagem de dados de RH.
**Gap**: modelagem de domínio de RH exige entendimento de métricas específicas (turnover, headcount).
**Atrai recrutador porque**: People Analytics é nicho crescente com poucos profissionais de Power BI especializados — diferenciação de nicho.

**18. 🟢 `/power-bi/dax-pattern-library`**
Biblioteca pessoal documentada de padrões DAX reutilizáveis (time intelligence, ranking dinâmico, what-if parameters), em formato de referência bilíngue.
**Dados**: nenhum dado externo — é material de referência técnica.
**Resultado esperado**: repositório/artigo de referência de padrões DAX.
**Skills**: DAX avançado, documentação técnica.
**Atrai recrutador porque**: material de referência bem documentado funciona como prova de profundidade e também gera tráfego orgânico de busca (SEO técnico) para o site.

**19. 🔴 `/power-bi/embedded-analytics-saas-demo`**
Demonstração de Power BI Embedded dentro de uma aplicação web própria (ex.: embutido no app React do `club-league-simulator`), simulando um produto de analytics白-label.
**Dados**: reaproveita datasets do grupo `/football`.
**Resultado esperado**: aplicação web com dashboard Power BI embutido.
**Skills**: Power BI Embedded, desenvolvimento web, autenticação de API.
**Gap**: Power BI Embedded exige licenciamento e configuração mais avançada de API.
**Atrai recrutador porque**: embedded analytics é competência de alto valor para vagas de "Analytics Engineer" em produtos SaaS — combina BI com desenvolvimento de produto.

**20. 🟡 `/power-bi/world-cup-betting-odds-fairness-study`**
*(Renomeado e redirecionado — ver nota)* Estudo de eficiência de mercado comparando probabilidades implícitas de diferentes fontes de odds com o modelo Elo próprio, com enquadramento puramente acadêmico/estatístico de eficiência de mercado, sem operação de apostas.
**Dados**: The Odds API (consulta de odds públicas) + modelo Elo do grupo `/football`.
**Resultado esperado**: relatório acadêmico sobre eficiência/calibração de mercados de previsão esportiva.
**Skills**: estatística de calibração, DAX, visualização comparativa.
**Gap**: nenhum técnico crítico.
**Atrai recrutador porque**: mercados de previsão são tema de pesquisa econométrica legítima — desde que o enquadramento seja estritamente analítico/acadêmico (eficiência de mercado, calibração de probabilidade), conecta com vagas de risco/pricing sem qualquer associação a operação de apostas.

> **Nota de revisão**: este último item foi mantido apenas como estudo de eficiência de mercado/calibração estatística. Caso o enquadramento ainda pareça próximo demais do tema de apostas, recomenda-se substituí-lo por uma variação como "estudo de calibração de modelos preditivos esportivos comparando múltiplas fontes públicas de probabilidade implícita" ou removê-lo da lista final na consolidação.

---

# MACRO-ÁREA: DATA ENGINEERING

## Grupo 3 — `/data-pipelines` (ETL, ingestão, automação)

**1. 🟢 `/data-pipelines/api-sync-bridge`**
Documentação pública, como case de portfólio, de uma sincronização bidirecional entre dois sistemas via webhook + AWS Lambda (já implementada previamente em contexto real), generalizada para não expor dados sensíveis de cliente.
**Dados**: nenhum a coletar — lógica já existe e validada em produção.
**Resultado esperado**: diagrama de arquitetura + código + explicação de idempotência, retry e tratamento de webhook.
**Skills**: AWS Lambda, webhooks, design de sincronização bidirecional.
**Atrai recrutador porque**: prova real, já em produção, do tipo de problema de integração de sistemas que aparece constantemente em vagas de Data/Integration Engineer.

**2. 🟡 `/data-pipelines/football-data-etl-pipeline`**
Pipeline de coleta e transformação documentado como caso de estudo, usando os dados do grupo `/football`, com camada de staging e marts via dbt.
**Dados**: Transfermarkt / Kaggle (mesmos do grupo `/football`).
**Resultado esperado**: pipeline reproduzível, dado bruto → Parquet limpo → pronto para consumo.
**Skills**: dbt, SQL, Python, Parquet.
**Gap**: depende da Fase 3 do roadmap (dbt).
**Atrai recrutador porque**: dbt aparece constantemente junto de Airflow/Snowflake/BigQuery em vagas de data engineer — é a ferramenta-ponte entre perfil de analista e engenheiro.

**3. 🟢 `/data-pipelines/personal-data-aggregator`**
Pipeline de agregação de dados pessoais espalhados (extratos bancários, GitHub, calendário) em um único repositório estruturado, com atualização periódica via script agendado.
**Dados**: fontes próprias (export de extratos, GitHub API, Google Calendar API).
**Resultado esperado**: repositório de dados pessoais centralizados, atualizado automaticamente.
**Skills**: Python, APIs REST, automação de agendamento (cron).
**Atrai recrutador porque**: demonstra automação de ponta a ponta com ferramentas simples — bom projeto introdutório para quem está migrando de analista para engenheiro.

**4. 🔴 `/data-pipelines/orchestrated-multi-source-pipeline`**
Orquestração via Airflow de dois ou mais pipelines existentes, com dependência entre eles (ex.: pipeline B só roda após conclusão e validação do pipeline A).
**Dados**: reaproveita pipelines já existentes em outros projetos do grupo.
**Resultado esperado**: DAGs visíveis, histórico de execução, retry automático documentado.
**Skills**: Airflow, Docker Compose, design de dependência entre DAGs.
**Gap**: depende da Fase 5 do roadmap.
**Atrai recrutador porque**: Airflow aparece como "top skill" em praticamente toda vaga de data engineer remota pesquisada — provavelmente a peça que mais separa "sabe Python" de "é engenheiro de dados" no mercado internacional.

**5. 🟡 `/data-pipelines/cloud-native-ingestion-demo`**
Pipeline batch rodando em serviços gerenciados AWS (S3 + Glue ou Lambda agendado + Athena), processando um dataset de futebol em escala.
**Dados**: reaproveita datasets do grupo `/football`.
**Resultado esperado**: pipeline serverless documentado, com arquitetura e custos explicados.
**Skills**: AWS S3, Glue, Athena, Lambda.
**Gap**: depende da Fase 4 do roadmap.
**Atrai recrutador porque**: caminha junto da experiência prática que mais aparece em vagas remotas de data engineering pesquisadas — ingestão e transformação em nuvem.

**6. 🟢 `/data-pipelines/web-scraping-toolkit`**
Toolkit próprio (biblioteca reutilizável) de scraping respeitando rate limit e termos de uso, com tratamento de erro, retry exponencial e logging estruturado.
**Dados**: fontes públicas diversas, a depender do projeto consumidor.
**Resultado esperado**: biblioteca Python documentada e testada, reutilizável em outros projetos do portfólio.
**Skills**: Python, requests/httpx, design de biblioteca reutilizável, boas práticas de scraping ético.
**Atrai recrutador porque**: ferramenta de uso transversal a quase todos os outros grupos — mostra pensamento de reuso de código, não apenas scripts descartáveis.

**7. 🟡 `/data-pipelines/data-quality-monitoring-dashboard`**
Painel de monitoramento de qualidade de dados (taxa de nulos, duplicatas, drift de schema) aplicado a um dos pipelines já existentes, com alertas automáticos.
**Dados**: reaproveita pipelines existentes como fonte de telemetria.
**Resultado esperado**: dashboard de observabilidade de dados com histórico de qualidade ao longo do tempo.
**Skills**: dbt tests, Python, alerting básico.
**Gap**: depende parcialmente da Fase 3 (dbt tests).
**Atrai recrutador porque**: observabilidade de dados é tema em ascensão nas vagas de data engineering — poucos portfólios juniores/plenos cobrem isso explicitamente.

**8. 🟢 `/data-pipelines/csv-to-database-migration-tool`**
Ferramenta de linha de comando que migra arquivos CSV/Excel desorganizados para um schema relacional limpo, com inferência automática de tipo e validação.
**Dados**: arquivos próprios desorganizados como caso de teste (ex.: planilhas antigas).
**Resultado esperado**: CLI reutilizável, documentada, publicável como ferramenta open-source pequena.
**Skills**: Python, SQL, design de CLI, validação de dados.
**Atrai recrutador porque**: resolve um problema extremamente comum em empresas pequenas/médias que ainda vivem em planilha — forte argumento de venda para clientes freelance.

**9. 🟡 `/data-pipelines/incremental-load-pattern-demo`**
Demonstração documentada de padrão de carga incremental (incremental load) em dbt, comparando full refresh vs. incremental em termos de custo e tempo de execução.
**Dados**: reaproveita dataset do grupo `/football` em escala crescente simulada.
**Resultado esperado**: artigo/case comparando estratégias de carga com métricas reais.
**Skills**: dbt (materializations incrementais), SQL.
**Gap**: depende da Fase 3 do roadmap.
**Atrai recrutador porque**: carga incremental é tópico técnico específico frequentemente perguntado em entrevista de Analytics Engineer — material de referência prova domínio prático, não só teórico.

**10. 🟢 `/data-pipelines/notification-automation-bot`**
Bot de automação que monitora uma fonte de dados (ex.: atualização de resultado de jogo, novo dado de mercado) e envia notificação estruturada (email, Slack, Telegram) quando uma condição é atendida.
**Dados**: qualquer fonte de dados já monitorada em outros projetos.
**Resultado esperado**: bot funcional rodando em schedule, com histórico de notificações enviadas.
**Skills**: Python, APIs de notificação, automação de agendamento.
**Atrai recrutador porque**: combina dados + automação + integração de sistemas em um projeto curto e demonstrável — bom para mostrar versatilidade rapidamente.

**11. 🔴 `/data-pipelines/change-data-capture-demo`**
Demonstração de Change Data Capture (CDC) simplificado entre dois bancos, capturando alterações incrementais sem reprocessar a base inteira.
**Dados**: bancos próprios de teste (Postgres local via Docker).
**Resultado esperado**: pipeline de CDC funcional documentado, com explicação de trade-offs frente a full load.
**Skills**: Postgres, Docker, conceitos de CDC (logical replication ou ferramenta como Debezium).
**Gap**: CDC é stack adicional não coberta diretamente no roadmap atual — ampliação futura.
**Atrai recrutador porque**: CDC apareceu nas vagas de data engineer pesquisadas como skill de maior senioridade — diferenciação para vagas acima de nível júnior.

**12. 🟢 `/data-pipelines/etl-error-handling-patterns`**
Material de referência documentando padrões de tratamento de erro em pipelines de ETL (retry, dead-letter queue conceitual, idempotência), aplicados nos próprios pipelines do portfólio.
**Dados**: nenhum dado externo — é material de referência técnica baseado nos próprios projetos.
**Resultado esperado**: guia de boas práticas bilíngue, publicável como artigo técnico.
**Skills**: Python, design de sistemas resilientes, comunicação técnica.
**Atrai recrutador porque**: artigos técnicos de boas práticas têm bom potencial de engajamento e demonstram maturidade de engenharia além do código em si.

**13. 🟡 `/data-pipelines/api-rate-limit-handler`**
Biblioteca/case de estudo sobre lidar corretamente com rate limiting de APIs externas (backoff exponencial, fila de requisições, cache local), aplicado a uma das APIs já usadas no portfólio.
**Dados**: nenhum dado externo novo — reaproveita integrações já existentes.
**Resultado esperado**: biblioteca reutilizável + documentação de decisões de design.
**Skills**: Python, design de sistemas distribuídos em pequena escala, caching.
**Gap**: nenhum técnico crítico, mas exige boa fundamentação teórica de rate limiting.
**Atrai recrutador porque**: lidar bem com rate limit é detalhe que separa código amador de profissional — prova maturidade em integração de APIs externas.

**14. 🟢 `/data-pipelines/scheduled-report-generator`**
Gerador automático de relatório periódico (PDF/HTML) a partir de uma fonte de dados, enviado por email em horário agendado, sem intervenção manual.
**Dados**: reaproveita qualquer dataset já existente no portfólio.
**Resultado esperado**: relatório automatizado funcional, gerado e distribuído sem ação humana.
**Skills**: Python, geração de documento (PDF/HTML), automação de agendamento, envio de email.
**Atrai recrutador porque**: automação de relatório é tarefa extremamente comum solicitada por clientes freelance de pequenas empresas — alto potencial comercial direto.

**15. 🔴 `/data-pipelines/data-lake-architecture-case-study`**
Case de estudo arquitetural completo (não necessariamente implementado em escala real) descrevendo como um data lake seria desenhado para consolidar todos os datasets do portfólio, com camadas raw/staging/curated.
**Dados**: conceitual, baseado nos datasets já existentes no portfólio.
**Resultado esperado**: documento de arquitetura detalhado, com diagramas, justificativas de decisão e estimativa de custo.
**Skills**: arquitetura de dados, AWS S3, design de data lake.
**Gap**: depende de domínio combinado de AWS aplicado (Fase 4) e visão de arquitetura mais ampla.
**Atrai recrutador porque**: documentos de arquitetura bem escritos são frequentemente o que diferencia candidatos sênior de pleno em entrevista — demonstra visão de sistema, não apenas execução pontual.

**16. 🟢 `/data-pipelines/git-based-data-versioning-demo`**
Demonstração de versionamento de dados (não apenas código) usando Git + DVC ou estratégia equivalente simples, aplicada a um dos datasets Parquet do portfólio.
**Dados**: reaproveita Parquets já existentes.
**Resultado esperado**: repositório demonstrando histórico de versões de um dataset, com diffs significativos documentados.
**Skills**: Git avançado, versionamento de dados, Parquet.
**Atrai recrutador porque**: versionamento de dados é prática crescente em MLOps/DataOps — poucos portfólios juniores demonstram isso explicitamente.

**17. 🟡 `/data-pipelines/dead-simple-feature-store`**
Implementação simplificada do conceito de feature store (repositório centralizado de features reutilizáveis entre modelos), usando as features já calculadas para os modelos do grupo `/football` e `/quant`.
**Dados**: reaproveita features já calculadas em outros projetos.
**Resultado esperado**: pequeno serviço/biblioteca que centraliza e versiona features reutilizáveis.
**Skills**: Python, design de API simples, Postgres/Parquet como storage.
**Gap**: nenhum técnico crítico, mas exige desenho cuidadoso de interface.
**Atrai recrutador porque**: feature store é conceito central em MLOps moderno — implementar uma versão simplificada prova entendimento de arquitetura de ML em produção, não apenas notebook isolado.

**18. 🟢 `/data-pipelines/multi-format-data-converter`**
Ferramenta de conversão entre formatos de dados (CSV, JSON, Parquet, Excel) com benchmarking de performance e tamanho entre eles, como peça didática.
**Dados**: datasets já existentes no portfólio, em múltiplos formatos.
**Resultado esperado**: ferramenta CLI + artigo comparativo de performance entre formatos.
**Skills**: Python, pandas, Parquet, benchmarking.
**Atrai recrutador porque**: artigo comparativo bem feito (ex.: "por que Parquet é X vezes mais rápido que CSV para este caso") é conteúdo técnico de alto engajamento e prova entendimento de fundamentos de armazenamento.

**19. 🔴 `/data-pipelines/streaming-ingestion-prototype`**
Prototipagem de ingestão de dados em streaming (não apenas batch), usando uma fonte simulada de eventos em tempo real.
**Dados**: gerador próprio de eventos sintéticos em tempo real.
**Resultado esperado**: pipeline simples de ingestão streaming documentado, com discussão de trade-offs frente a batch.
**Skills**: conceitos de streaming (Kafka ou alternativa leve), Python.
**Gap**: streaming é stack adicional não coberta no roadmap atual — ampliação futura clara.
**Atrai recrutador porque**: streaming aparece nas vagas mais avançadas/seniores pesquisadas — projeto de fronteira que sinaliza ambição de crescimento técnico contínuo.

**20. 🟢 `/data-pipelines/portfolio-pipeline-meta-dashboard`**
Dashboard "meta" mostrando o status de saúde de todos os pipelines do próprio portfólio (última execução, taxa de sucesso, tempo médio), como prova de que os projetos não são apenas demonstrações estáticas, mas sistemas vivos mantidos.
**Dados**: telemetria dos próprios pipelines do portfólio.
**Resultado esperado**: painel único de observabilidade de todo o ecossistema de projetos.
**Skills**: Python, agregação de logs, visualização.
**Atrai recrutador porque**: é a prova definitiva de que o portfólio é mantido ativamente, não um conjunto de projetos abandonados após a primeira entrega — sinal raro e muito valorizado por quem revisa portfólio técnico.

---

## Grupo 4 — `/cloud-infrastructure` (AWS aplicado, arquitetura)

**1. 🟢 `/cloud-infrastructure/lambda-webhook-bridge-writeup`**
Documentação técnica detalhada e didática (não apenas o case, mas o "como fazer") de como construir uma ponte de sincronização via Lambda + webhook do zero, como artigo tutorial bilíngue.
**Dados**: nenhum — baseado na experiência prática já validada.
**Resultado esperado**: tutorial publicável, com diagramas de arquitetura e trechos de código reutilizáveis.
**Skills**: AWS Lambda, webhooks, comunicação técnica.
**Atrai recrutador porque**: conteúdo tutorial de qualidade é o tipo de material que gera autoridade técnica via SEO/compartilhamento, além de provar a competência diretamente.

**2. 🟡 `/cloud-infrastructure/s3-data-lake-foundations`**
Estruturação de um pequeno data lake pessoal em S3 (camadas raw/processed/curated) hospedando todos os datasets dos demais projetos do portfólio.
**Dados**: consolidação de datasets já existentes.
**Resultado esperado**: estrutura de bucket documentada, com políticas de lifecycle e nomenclatura consistente.
**Skills**: AWS S3, organização de data lake.
**Gap**: depende da Fase 4 do roadmap.
**Atrai recrutador porque**: é a base de infraestrutura que sustenta múltiplos outros projetos — eficiente em esforço por ser reutilizada amplamente.

**3. 🟡 `/cloud-infrastructure/athena-query-cost-optimization-study`**
Estudo prático de otimização de custo de consultas Athena (particionamento, formato colunar, compressão), com medições reais de antes/depois.
**Dados**: datasets Parquet já existentes em S3.
**Resultado esperado**: artigo com métricas reais de economia de custo e tempo de consulta.
**Skills**: AWS Athena, particionamento de dados, otimização de custo em nuvem.
**Gap**: depende da Fase 4 do roadmap.
**Atrai recrutador porque**: otimização de custo em nuvem (FinOps básico) é habilidade cada vez mais valorizada — artigo com números reais é prova concreta, não teórica.

**4. 🟢 `/cloud-infrastructure/serverless-cost-calculator`**
Calculadora própria (aplicação simples) que estima custo mensal de uma arquitetura serverless (Lambda + S3 + Athena) com base em parâmetros de uso informados pelo usuário.
**Dados**: tabelas de preço públicas da AWS.
**Resultado esperado**: ferramenta interativa de estimativa de custo, útil também para planejamento de outros projetos do portfólio.
**Skills**: Python ou JavaScript, conhecimento de modelo de precificação AWS.
**Atrai recrutador porque**: ferramenta prática que demonstra entendimento de custo de nuvem além de apenas uso técnico — relevante para qualquer vaga que envolva responsabilidade orçamentária de infraestrutura.

**5. 🔴 `/cloud-infrastructure/infrastructure-as-code-intro`**
Primeira experiência com Infraestrutura como Código (Terraform ou AWS CDK) para provisionar a infraestrutura de um dos projetos já existentes (ex.: o S3 + Lambda do `api-sync-bridge`), em vez de criar manualmente via console.
**Dados**: nenhum — reaproveita infraestrutura já existente, agora versionada como código.
**Resultado esperado**: repositório com infraestrutura completamente reproduzível via código.
**Skills**: Terraform ou AWS CDK, versionamento de infraestrutura.
**Gap**: IaC não está no roadmap atual — ampliação natural após a Fase 4, mas fora do escopo combinado por ora.
**Atrai recrutador porque**: IaC é frequentemente citado como diferencial entre "sabe usar a nuvem" e "sabe operar a nuvem como engenheiro" — mencionado constantemente em vagas de DevOps/Cloud Engineer.

**6. 🟡 `/cloud-infrastructure/glue-catalog-metadata-explainer`**
Material didático explicando o papel do Glue Data Catalog na arquitetura de data lake, com exemplo prático aplicado a um dos datasets do portfólio.
**Dados**: datasets já existentes em S3.
**Resultado esperado**: artigo didático bilíngue + exemplo funcional de catálogo.
**Skills**: AWS Glue, metadados de data lake.
**Gap**: depende da Fase 4 do roadmap.
**Atrai recrutador porque**: Glue é mencionado constantemente em vagas remotas pesquisadas de data engineering — material didático sobre ele soma autoridade técnica.

**7. 🟢 `/cloud-infrastructure/lambda-cold-start-benchmark`**
Estudo experimental próprio sobre cold start de funções Lambda (impacto de linguagem, tamanho de pacote, memória configurada), com dados reais coletados.
**Dados**: experimentos próprios executados na própria conta AWS.
**Resultado esperado**: artigo com benchmark e recomendações práticas.
**Skills**: AWS Lambda, design de experimento, análise estatística.
**Atrai recrutador porque**: artigo de benchmark com dados reais (não apenas teoria) é conteúdo técnico raro e de alto valor percebido — prova de curiosidade técnica genuína.

**8. 🟡 `/cloud-infrastructure/multi-account-aws-organization-explainer`**
Material explicativo (conceitual, sem necessariamente implementar em escala) sobre como uma organização estruturaria múltiplas contas AWS (dev/staging/prod) com boas práticas de governança.
**Dados**: nenhum — conteúdo conceitual/didático.
**Resultado esperado**: artigo de referência sobre governança de múltiplas contas AWS.
**Skills**: AWS Organizations, governança de nuvem (conceitual).
**Gap**: aplicação prática em escala real está fora do alcance de conta pessoal — mantido como conteúdo majoritariamente didático.
**Atrai recrutador porque**: demonstra visão de maturidade organizacional de nuvem, relevante para conversas de entrevista sobre governança, mesmo sem implementação em escala real.

**9. 🟢 `/cloud-infrastructure/aws-free-tier-project-tracker`**
Painel próprio de acompanhamento de uso/custo dentro do AWS Free Tier, alertando antes de qualquer limite ser excedido nos projetos do portfólio.
**Dados**: AWS Cost Explorer API / Billing API da própria conta.
**Resultado esperado**: painel de controle de custo pessoal, com alertas automáticos.
**Skills**: AWS Billing API, Python, automação de alerta.
**Atrai recrutador porque**: prova responsabilidade financeira e operacional sobre a própria infraestrutura — detalhe que recrutadores técnicos sêniores valorizam bastante.

**10. 🔴 `/cloud-infrastructure/disaster-recovery-tabletop-exercise`**
Exercício documentado (conceitual + parcialmente implementado) de plano de recuperação de desastre para um dos pipelines do portfólio — o que aconteceria se o S3 ficasse indisponível, como recuperar.
**Dados**: nenhum — conceitual, com testes pontuais reais quando possível.
**Resultado esperado**: documento de plano de contingência + teste real de backup/restore.
**Skills**: backup/restore AWS, pensamento de resiliência de sistemas.
**Gap**: tema avançado, normalmente associado a perfis sêniores — ampliação natural de longo prazo.
**Atrai recrutador porque**: pensamento de resiliência e disaster recovery é tópico recorrente em entrevistas de Data/Cloud Engineer mais sêniores — sinaliza visão alem do "fazer funcionar".

**11. 🟡 `/cloud-infrastructure/lambda-vs-container-cost-comparison`**
Comparação prática de custo e performance entre rodar uma mesma carga de trabalho via Lambda vs. container (Fargate/ECS), com dados reais.
**Dados**: experimento próprio replicando uma carga de trabalho já existente no portfólio.
**Resultado esperado**: artigo comparativo com números reais de custo/latência.
**Skills**: AWS Lambda, containers (ECS/Fargate básico), benchmarking.
**Gap**: ECS/Fargate não coberto diretamente no roadmap — extensão natural do conhecimento de Docker já adquirido.
**Atrai recrutador porque**: decisão "serverless vs. container" é debate técnico real e recorrente em entrevista de arquitetura — ter dados próprios para defender uma posição é diferencial.

**12. 🟢 `/cloud-infrastructure/iam-least-privilege-case-study`**
Case prático de aplicação do princípio de menor privilégio (least privilege) nas políticas IAM de um dos projetos já existentes, documentando antes/depois.
**Dados**: política IAM já existente no projeto `api-sync-bridge`, revisada e refinada.
**Resultado esperado**: artigo/case com política IAM revisada e justificativa de cada permissão.
**Skills**: AWS IAM, segurança de nuvem básica.
**Atrai recrutador porque**: segurança de nuvem é frequentemente negligenciada em portfólios — mostrar atenção a least privilege é diferencial de maturidade profissional, mesmo em projeto pessoal pequeno.

**13. 🟡 `/cloud-infrastructure/event-driven-architecture-demo`**
Demonstração de arquitetura orientada a eventos simples (S3 trigger → Lambda → processamento), sem polling, aplicada a um caso real de ingestão de dados.
**Dados**: arquivo simulando chegada de novo dado, disparando o pipeline automaticamente.
**Resultado esperado**: pipeline reativo funcional, documentado com diagrama de evento.
**Skills**: AWS S3 Event Notifications, Lambda, design orientado a eventos.
**Gap**: conceito de triggers de evento não coberto diretamente no roadmap — extensão natural da Fase 4.
**Atrai recrutador porque**: arquitetura orientada a eventos é padrão moderno citado com frequência em vagas de Cloud/Data Engineer — implementação prática prova mais que apenas conhecimento teórico do conceito.

**14. 🟢 `/cloud-infrastructure/aws-architecture-diagrams-portfolio`**
Coleção visual de diagramas de arquitetura (estilo C4 ou AWS icons oficiais) de todos os projetos do portfólio que envolvem nuvem, como peça de comunicação técnica.
**Dados**: nenhum — síntese visual dos próprios projetos já existentes.
**Resultado esperado**: galeria de diagramas de arquitetura, navegável e bem documentada.
**Skills**: design de diagrama de arquitetura, comunicação visual técnica.
**Atrai recrutador porque**: muitos candidatos sabem implementar mas não sabem comunicar arquitetura visualmente — essa coleção isolada já funciona como prova de capacidade de comunicação técnica.

**15. 🔴 `/cloud-infrastructure/multi-region-latency-experiment`**
Experimento próprio medindo latência de acesso a dados (S3/Lambda) entre diferentes regiões AWS, relevante para decisão de onde hospedar dado consumido globalmente.
**Dados**: experimentos próprios executados na própria conta AWS.
**Resultado esperado**: artigo com medições reais de latência multi-região.
**Skills**: AWS multi-region, design de experimento, análise estatística.
**Gap**: exige custo adicional de testar múltiplas regiões — fora do escopo imediato, mas viável como projeto pontual.
**Atrai recrutador porque**: decisões de latência multi-região são tema de entrevista de arquitetura para produtos com usuários internacionais — relevante dado o objetivo de atrair vagas fora do Brasil.

**16. 🟡 `/cloud-infrastructure/secrets-management-demo`**
Demonstração de gerenciamento seguro de credenciais (AWS Secrets Manager ou Parameter Store) substituindo variáveis de ambiente expostas em um dos projetos existentes.
**Dados**: nenhum — refatoração de projeto já existente.
**Resultado esperado**: projeto refatorado com gerenciamento de segredo apropriado, documentado com antes/depois.
**Skills**: AWS Secrets Manager / Parameter Store, segurança básica de credenciais.
**Gap**: ferramenta específica não coberta diretamente no roadmap, mas de baixo custo de aprendizado dado o contexto AWS já em construção.
**Atrai recrutador porque**: gerenciamento de segredo é checklist item comum em revisão de código sênior — mostrar atenção a isso eleva a percepção de qualidade de todo o portfólio.

**17. 🟢 `/cloud-infrastructure/aws-well-architected-self-review`**
Autoavaliação documentada de um dos projetos do portfólio frente aos pilares do AWS Well-Architected Framework (excelência operacional, segurança, confiabilidade, eficiência de performance, otimização de custo).
**Dados**: nenhum — avaliação qualitativa do próprio projeto já existente.
**Resultado esperado**: relatório de autoavaliação com pontos fortes e gaps identificados honestamente.
**Skills**: conhecimento conceitual de Well-Architected Framework, autocrítica técnica.
**Atrai recrutador porque**: usar o framework oficial da própria AWS para autoavaliação é sinal de alinhamento com práticas de mercado e maturidade de autoanálise, sem custo de implementação adicional.

**18. 🟡 `/cloud-infrastructure/lambda-layer-shared-code-demo`**
Demonstração de uso de Lambda Layers para compartilhar código/dependências comuns entre múltiplas funções Lambda do portfólio.
**Dados**: nenhum — refatoração de funções já existentes.
**Resultado esperado**: arquitetura de Lambda mais limpa e modular, documentada com antes/depois.
**Skills**: AWS Lambda Layers, modularização de código serverless.
**Gap**: feature específica do Lambda não citada diretamente no roadmap, mas natural extensão do conhecimento já existente.
**Atrai recrutador porque**: Lambda Layers é detalhe que sinaliza experiência prática além do básico — diferencia quem só fez tutorial de quem já mantém múltiplas funções reais.

**19. 🟢 `/cloud-infrastructure/cost-anomaly-detection-alert`**
Sistema simples de detecção de anomalia de custo na própria conta AWS (gasto muito acima do padrão histórico), com alerta automático.
**Dados**: AWS Cost Explorer API da própria conta.
**Resultado esperado**: sistema de alerta funcional, com histórico de gasto e limites configuráveis.
**Skills**: AWS Cost Explorer API, Python, automação de alerta.
**Atrai recrutador porque**: combina FinOps com automação prática — tema crescente em organizações que adotam nuvem em escala, demonstrável mesmo em conta pessoal pequena.

**20. 🟢 `/cloud-infrastructure/portfolio-cloud-architecture-overview`**
Documento-síntese (página própria do site) consolidando visualmente toda a infraestrutura de nuvem usada através de todos os projetos do portfólio, como "mapa geral" para quem revisa o trabalho.
**Dados**: nenhum — síntese de todos os projetos já existentes.
**Resultado esperado**: página de overview de arquitetura, navegável, conectando cada peça aos projetos correspondentes.
**Skills**: comunicação técnica, design de informação.
**Atrai recrutador porque**: recrutadores técnicos raramente têm tempo de explorar 20+ projetos em profundidade — uma página-síntese bem feita aumenta drasticamente a chance de a real extensão do trabalho ser percebida.

---

# MACRO-ÁREA: DATA SCIENCE

## Grupo 5 — `/quant` (modelagem financeira e quantitativa)

**1. 🟢 `/quant/portfolio-tracker`**
Aplicativo de análise de investimentos pessoais multi-fonte (ações BR/US, FIIs, cripto, renda fixa), com criação, edição, importação e exportação de carteiras.
**Dados**: Yahoo Finance, Brapi.dev (B3), CoinGecko (cripto).
**Resultado esperado**: aplicativo funcional com carteira editável e métricas de retorno/volatilidade/alocação.
**Skills**: Python, APIs financeiras, modelagem de carteira.
**Atrai recrutador porque**: é o projeto mais "produto" do grupo — algo de uso pessoal genuíno, prova de pensamento de UX além do modelo estatístico em si.

**2. 🟡 `/quant/efficient-frontier-optimizer`**
Otimizador de carteira via simulação Monte Carlo / Markowitz, plotando a fronteira eficiente a partir dos ativos do `portfolio-tracker`.
**Dados**: reaproveita dados do projeto 1.
**Resultado esperado**: visualização da fronteira eficiente + sugestão de pesos por perfil de risco.
**Skills**: Monte Carlo, matemática financeira (covariância, Sharpe ratio).
**Gap**: camada extra de matemática financeira formal, de baixo custo de aprendizado dado o domínio prévio de Monte Carlo no grupo `/football`.
**Atrai recrutador porque**: mostra que o raciocínio Monte Carlo já aplicado a futebol é transferível entre domínios — sinaliza pensamento estatístico genuíno, não apenas familiaridade com uma biblioteca.

**3. 🟡 `/quant/backtesting-engine`**
Motor de backtest para estratégias simples (médias móveis, momentum) sobre os dados do `portfolio-tracker`, incluindo custos de transação e slippage realistas.
**Dados**: reaproveita dados do projeto 1.
**Resultado esperado**: relatório de performance histórica de estratégia com métricas honestas (drawdown, Sharpe, win rate).
**Skills**: backtesting rigoroso, prevenção de look-ahead bias, walk-forward validation.
**Gap**: rigor metodológico mais do que ferramenta nova.
**Atrai recrutador porque**: backtesting malfeito é red flag clássica em entrevista quantitativa — fazer corretamente e explicar as armadilhas evitadas é prova de maturidade rara nesse nível de portfólio.

**4. 🔴 `/quant/risk-var-dashboard`**
Dashboard de risco de carteira (Value at Risk, stress testing com cenários históricos como 2008 e 2020) sobre o `portfolio-tracker`.
**Dados**: reaproveita dados do projeto 1 + dados históricos de crise para stress test.
**Resultado esperado**: relatório de risco no estilo usado por mesas de operação reais.
**Skills**: VaR (histórico, paramétrico, Monte Carlo), stress testing.
**Gap**: estatística mais avançada, densa de estudo, ainda que sem ferramenta nova.
**Atrai recrutador porque**: conecta diretamente com contexto profissional de trading já existente — é o projeto que mais aproxima o portfólio público do trabalho real.

**5. 🔴 `/quant/ml-price-direction-classifier`**
Classificador de ML para direção de preço (sobe/desce/lateral, não preço exato) de um ativo, com feature engineering sobre indicadores técnicos, comparado contra baseline ingênuo.
**Dados**: dados históricos de preço (Yahoo Finance ou Brapi.dev).
**Resultado esperado**: relatório honesto mostrando se o modelo bate ou não um baseline simples.
**Skills**: scikit-learn, validação temporal cuidadosa, métricas além de acurácia.
**Gap**: ML supervisionado completo — salto mais "data science clássico" do grupo.
**Atrai recrutador porque**: ML aplicado a finanças aparece constantemente em vagas de Data Scientist — fazer com honestidade sobre limitação (mercado quase eficiente) é mais impressionante que prometer previsão de preço.

**6. 🟢 `/quant/inflation-adjusted-returns-calculator`**
Calculadora de retorno real (ajustado pela inflação) de diferentes classes de ativo ao longo do tempo, comparando poder de compra nominal vs. real.
**Dados**: dados históricos de inflação (IPCA, CPI) + dados de preço de ativos.
**Resultado esperado**: ferramenta interativa de comparação de retorno real entre ativos.
**Skills**: Python, séries temporais, ajuste por inflação.
**Atrai recrutador porque**: ferramenta simples e didática, mas tecnicamente correta em um ponto que muita gente erra (comparar retorno nominal sem ajustar por inflação) — demonstra rigor conceitual.

**7. 🟡 `/quant/factor-investing-explainer`**
Material didático explicando e implementando fatores de investimento clássicos (value, momentum, quality, low volatility) sobre um universo de ações da B3 ou S&P 500.
**Dados**: dados de preço e fundamentos (Yahoo Finance, Brapi.dev).
**Resultado esperado**: artigo didático + backtest simplificado de cada fator.
**Skills**: factor investing (conceitual), Python, estatística.
**Gap**: fundamentos de factor investing exigem leitura/estudo dedicado.
**Atrai recrutador porque**: factor investing é linguagem comum entre gestoras quantitativas — mostrar fluência nesse vocabulário amplia empregabilidade no setor financeiro especificamente.

**8. 🟢 `/quant/currency-correlation-explorer`**
Explorador interativo de correlação entre moedas, commodities e índices ao longo do tempo, com matriz de correlação dinâmica por período selecionado.
**Dados**: Yahoo Finance (câmbio, commodities, índices).
**Resultado esperado**: visualização interativa de matriz de correlação navegável no tempo.
**Skills**: Python, estatística de correlação, visualização interativa.
**Atrai recrutador porque**: ferramenta de exploração rápida e visualmente atrativa, boa para "encher" o grid do grupo com baixo esforço relativo.

**9. 🟡 `/quant/options-pricing-visualizer`**
Visualizador interativo de precificação de opções (Black-Scholes) mostrando como o preço teórico varia com volatilidade, tempo até expiração e preço do ativo-base.
**Dados**: nenhum dado externo necessário — é uma ferramenta de simulação paramétrica.
**Resultado esperado**: ferramenta interativa educacional de precificação de opções.
**Skills**: matemática financeira (Black-Scholes), visualização interativa.
**Gap**: fundamentos de precificação de derivativos exigem estudo dedicado, ainda que a implementação seja direta.
**Atrai recrutador porque**: derivativos são tema valorizado em vagas de quant/risk no setor financeiro — ferramenta educacional bem feita prova domínio conceitual claro.

**10. 🟢 `/quant/dividend-income-projector`**
Projetor de renda passiva futura baseado em histórico de dividendos/proventos de uma carteira (especialmente relevante para FIIs e ações de dividendo).
**Dados**: histórico de proventos via Brapi.dev ou fonte equivalente.
**Resultado esperado**: ferramenta de projeção de renda passiva com cenários conservador/moderado/otimista.
**Skills**: Python, projeção de série temporal simples.
**Atrai recrutador porque**: ferramenta com forte apelo de uso pessoal real no contexto brasileiro (FIIs, dividendos) — bom para construir audiência local mesmo visando vaga internacional.

**11. 🔴 `/quant/sector-rotation-model`**
Modelo de rotação setorial baseado em indicadores macroeconômicos (juros, inflação, ciclo econômico), sugerindo sobre/sub-peso por setor.
**Dados**: dados macroeconômicos públicos (Banco Central, FRED) + dados setoriais de mercado.
**Resultado esperado**: modelo com backtest histórico de performance da estratégia de rotação.
**Skills**: macroeconomia aplicada, modelagem de regime, backtesting.
**Gap**: combinação de macroeconomia com modelagem é o salto mais avançado e interdisciplinar do grupo.
**Atrai recrutador porque**: modelos macro-aware são bem vistos em vagas de asset management quantitativo — demonstra capacidade de combinar múltiplas fontes de informação heterogêneas.

**12. 🟡 `/quant/tax-efficient-rebalancing-simulator`**
Simulador de rebalanceamento de carteira considerando eficiência tributária (ex.: impacto de IR sobre ganho de capital no contexto brasileiro).
**Dados**: regras tributárias públicas + dados de carteira do projeto 1.
**Resultado esperado**: simulador comparando rebalanceamento ingênuo vs. tax-aware.
**Skills**: Python, modelagem de regras tributárias, otimização simples.
**Gap**: modelagem de regras tributárias específicas exige pesquisa cuidadosa de legislação.
**Atrai recrutador porque**: combina rigor quantitativo com aplicabilidade prática imediata ao contexto brasileiro — bom projeto-ponte entre marca pessoal local e competência técnica internacional.

**13. 🟢 `/quant/monte-carlo-retirement-planner`**
Planejador de aposentadoria via simulação Monte Carlo, mostrando probabilidade de sucesso de um plano de poupança/retirada ao longo de décadas sob diferentes cenários de retorno.
**Dados**: parâmetros do próprio usuário + distribuições históricas de retorno de mercado.
**Resultado esperado**: ferramenta interativa de planejamento financeiro de longo prazo.
**Skills**: Monte Carlo, planejamento financeiro, visualização de probabilidade.
**Atrai recrutador porque**: ferramenta com altíssimo potencial de uso real e compartilhamento — projeto de "produto" completo que reaproveita a competência Monte Carlo já dominada no grupo `/football`.

**14. 🟡 `/quant/credit-risk-scoring-demo`**
Modelo simplificado de credit scoring (probabilidade de inadimplência) usando dataset público de crédito, com explicação de cada variável (interpretabilidade).
**Dados**: dataset público de crédito (ex.: German Credit Dataset ou equivalente amplamente disponível).
**Resultado esperado**: modelo de scoring com relatório de interpretabilidade (SHAP ou equivalente).
**Skills**: classificação supervisionada, interpretabilidade de modelo (SHAP).
**Gap**: interpretabilidade de modelo (SHAP) é técnica adicional, de aprendizado relativamente rápido dado conhecimento prévio de ML.
**Atrai recrutador porque**: credit scoring é um dos cases mais clássicos de Data Science em fintech — interpretabilidade é frequentemente exigida por questões regulatórias, então demonstrá-la é diferencial real.

**15. 🟢 `/quant/asset-allocation-by-life-stage`**
Recomendador de alocação de ativos por estágio de vida (idade, tolerância a risco, horizonte), baseado em regras de glide path conhecidas da literatura financeira.
**Dados**: nenhum dado externo necessário além de literatura pública de referência.
**Resultado esperado**: ferramenta interativa de recomendação de alocação personalizada.
**Skills**: Python, regras de glide path, design de interface simples.
**Atrai recrutador porque**: projeto rápido de produzir com forte clareza de proposta de valor — bom exemplo de "produto financeiro simples bem executado".

**16. 🔴 `/quant/regime-switching-volatility-model`**
Modelo de mudança de regime de volatilidade (ex.: Markov Switching ou GARCH) aplicado a um índice de mercado, identificando períodos de alta/baixa volatilidade.
**Dados**: dados históricos de índice de mercado (Yahoo Finance).
**Resultado esperado**: visualização de regimes de volatilidade identificados ao longo do histórico.
**Skills**: modelos de série temporal avançados (GARCH, Markov Switching).
**Gap**: estatística de série temporal avançada, fora do que já é dominado pelo Monte Carlo/Elo do grupo `/football`.
**Atrai recrutador porque**: modelos de volatilidade são centrais em risk management quantitativo — projeto de maior densidade técnica do grupo, voltado a vagas mais seniores.

**17. 🟢 `/quant/personal-net-worth-tracker`**
Acompanhamento de patrimônio líquido pessoal ao longo do tempo (ativos menos passivos), com decomposição por classe de ativo.
**Dados**: dados próprios consolidados (mesma fonte do `portfolio-tracker`, mais dívidas/passivos se houver).
**Resultado esperado**: gráfico de evolução de patrimônio líquido com decomposição visual.
**Skills**: Python, agregação de dados financeiros pessoais.
**Atrai recrutador porque**: projeto simples e genuinamente pessoal, bom complemento "leve" ao lado dos projetos mais densos do grupo, e reaproveita infraestrutura de dados já existente.

**18. 🟡 `/quant/correlation-breakdown-crisis-study`**
Estudo de como correlações entre classes de ativo se comportam (e frequentemente "quebram") durante crises financeiras, com visualização comparativa entre períodos normais e de crise.
**Dados**: dados históricos de múltiplas classes de ativo, incluindo períodos de crise conhecidos (2008, 2020).
**Resultado esperado**: relatório com visualização de correlação condicional por regime de mercado.
**Skills**: estatística condicional, visualização comparativa.
**Gap**: nenhum técnico crítico, mas exige cuidado na seleção e tratamento dos períodos de crise.
**Atrai recrutador porque**: "correlação que quebra em crise" é insight clássico de risk management — estudo bem feito demonstra entendimento profundo de por que diversificação simples às vezes falha exatamente quando mais se precisa dela.

**19. 🔴 `/quant/reinforcement-learning-portfolio-agent`**
Agente de aprendizado por reforço simplificado que aprende a alocar entre poucas classes de ativo, comparado contra estratégias de alocação fixa (buy-and-hold, rebalanceamento periódico).
**Dados**: dados históricos de preço de poucas classes de ativo (Yahoo Finance).
**Resultado esperado**: relatório comparando performance do agente RL contra baselines simples, com discussão honesta de limitações.
**Skills**: aprendizado por reforço (RL), simulação de ambiente de mercado.
**Gap**: RL é stack avançada e fora do roadmap combinado atualmente — projeto de fronteira/aspiracional.
**Atrai recrutador porque**: RL aplicado a finanças é tema de ponta, ainda raro em portfólios — mesmo uma implementação simples e honesta sobre limitações sinaliza apetite por aprendizado contínuo em fronteira de conhecimento.

**20. 🟢 `/quant/macro-dashboard-brazil-vs-world`**
Dashboard comparativo de indicadores macroeconômicos do Brasil frente a outras economias (juros, inflação, câmbio, crescimento), atualizado periodicamente.
**Dados**: Banco Central do Brasil (API pública), FRED (dados macro internacionais).
**Resultado esperado**: painel comparativo navegável, atualizado com frequência regular.
**Skills**: Python, APIs de dados públicos macroeconômicos, visualização comparativa.
**Atrai recrutador porque**: painel macro comparativo internacional é exatamente o tipo de contexto que recrutadores de fora do Brasil apreciam — mostra fluência em colocar o contexto local em perspectiva global.

---

## Grupo 6 — `/machine-learning` (modelagem preditiva e ML aplicado, fora do domínio financeiro)

**1. 🟢 `/machine-learning/personal-time-series-forecasting`**
Previsão de série temporal pessoal (ex.: gasto mensal futuro, horas de estudo necessárias para atingir uma meta) usando modelos clássicos (ARIMA, Prophet).
**Dados**: dados próprios já coletados em outros projetos (finanças pessoais, produtividade).
**Resultado esperado**: previsão com intervalo de confiança, validada contra dado real observado posteriormente.
**Skills**: Python, séries temporais (ARIMA/Prophet), validação de previsão.
**Atrai recrutador porque**: forecasting de série temporal é habilidade central em Data Science aplicada a negócios — aplicar a dado próprio é forma rápida e honesta de demonstrar competência.

**2. 🟡 `/machine-learning/image-classification-football-jerseys`**
Classificador de imagem simples identificando times de futebol a partir de fotos de camisas/uniformes, como projeto introdutório de visão computacional.
**Dados**: imagens públicas de uniformes de times (coletadas respeitando direitos de uso, ou geradas/simuladas).
**Resultado esperado**: classificador funcional com relatório de acurácia por classe.
**Skills**: visão computacional básica (CNN simples ou transfer learning), PyTorch/TensorFlow.
**Gap**: visão computacional não está no roadmap atual — introdução de baixo custo via transfer learning.
**Atrai recrutador porque**: conecta o domínio de paixão pessoal (futebol) com uma área de ML (visão computacional) ainda não representada no portfólio, ampliando o leque de vagas elegíveis.

**3. 🟢 `/machine-learning/recommendation-system-demo`**
Sistema de recomendação simples (filtragem colaborativa ou baseada em conteúdo) aplicado a um domínio de interesse pessoal (ex.: recomendação de jogos históricos de futebol para assistir, baseado em preferência declarada).
**Dados**: dataset próprio ou público pequeno, com metadados suficientes para similaridade.
**Resultado esperado**: sistema de recomendação funcional com exemplos de saída explicados.
**Skills**: sistemas de recomendação (collaborative/content-based filtering), Python.
**Atrai recrutador porque**: sistemas de recomendação aparecem em quase todo produto digital moderno — projeto compacto que cobre uma área de ML de altíssima aplicabilidade comercial.

**4. 🟡 `/machine-learning/anomaly-detection-personal-spending`**
Detector de anomalia em gastos pessoais (transações fora do padrão usual), usando os mesmos dados do `personal-finance-cockpit`.
**Dados**: reaproveita dados do grupo `/power-bi`.
**Resultado esperado**: sistema de alerta de transação anômala, com explicação do motivo da flag.
**Skills**: detecção de anomalia (isolation forest, z-score, ou equivalente), Python.
**Gap**: nenhum técnico crítico, mas exige calibração cuidadosa para evitar excesso de falsos positivos.
**Atrai recrutador porque**: detecção de anomalia é aplicação real e direta de ML usada em finanças, segurança e operações — projeto pequeno com proposta de valor evidente.

**5. 🔴 `/machine-learning/nlp-sentiment-football-news`**
Análise de sentimento de notícias de futebol em português e inglês, comparando como diferentes veículos cobrem o mesmo evento, como peça de NLP bilíngue.
**Dados**: títulos/resumos de notícias públicas (respeitando direitos de uso, sem reprodução de texto integral).
**Resultado esperado**: dashboard de sentimento comparado por veículo/idioma ao longo do tempo.
**Skills**: NLP, análise de sentimento, processamento bilíngue de texto.
**Gap**: NLP não está no roadmap atual combinado — projeto de ampliação futura natural, dado o foco bilíngue do site.
**Atrai recrutador porque**: combina exatamente os dois eixos estratégicos do portfólio (futebol + bilinguismo) em uma aplicação de NLP, área de forte demanda atual de mercado.

**6. 🟢 `/machine-learning/synthetic-data-generator-toolkit`**
Ferramenta própria de geração de dados sintéticos realistas (vendas, RH, operações) para alimentar os demos do grupo `/power-bi` sem depender de dados reais sensíveis.
**Dados**: nenhum dado real — é a própria ferramenta geradora.
**Resultado esperado**: biblioteca reutilizável de geração de dados sintéticos, documentada e usada por outros projetos do portfólio.
**Skills**: Python, modelagem estatística de distribuições realistas.
**Atrai recrutador porque**: ferramenta de infraestrutura transversal que sustenta múltiplos outros projetos — prova de pensamento de reuso e eficiência, não apenas entrega pontual.

**7. 🟡 `/machine-learning/model-monitoring-drift-demo`**
Demonstração de monitoramento de drift de modelo (mudança de distribuição de dados de entrada ao longo do tempo) aplicado a um dos modelos já existentes no portfólio.
**Dados**: reaproveita dados/modelo de outro projeto já existente.
**Resultado esperado**: painel de monitoramento mostrando quando o modelo precisaria ser retreinado.
**Skills**: MLOps básico, estatística de drift (PSI, KS test).
**Gap**: conceitos de MLOps não cobertos diretamente no roadmap — extensão natural após ter modelos em produção.
**Atrai recrutador porque**: monitoramento de modelo em produção é exatamente o que separa "fez um notebook de ML" de "entende ML em produção" — tema central de MLOps, área de forte crescimento de vagas.

**8. 🟢 `/machine-learning/ab-test-power-analysis-calculator`**
Calculadora de tamanho de amostra e poder estatístico para planejamento de testes A/B, como ferramenta de referência.
**Dados**: nenhum dado externo — é uma ferramenta paramétrica.
**Resultado esperado**: calculadora interativa de power analysis.
**Skills**: estatística inferencial (power analysis), design de experimento.
**Atrai recrutador porque**: power analysis é etapa frequentemente esquecida ou malfeita em testes A/B reais — ferramenta de referência bem construída demonstra rigor experimental genuíno.

**9. 🟡 `/machine-learning/explainable-ai-showcase`**
Showcase comparando diferentes técnicas de interpretabilidade de modelo (SHAP, LIME, feature importance) aplicadas ao mesmo modelo, como material de referência didático.
**Dados**: reaproveita modelo já existente (ex.: do grupo `/quant`).
**Resultado esperado**: artigo/notebook comparativo entre técnicas de explicabilidade.
**Skills**: SHAP, LIME, comunicação de resultado de ML para audiência não-técnica.
**Gap**: técnicas específicas de interpretabilidade, de custo de aprendizado relativamente baixo.
**Atrai recrutador porque**: explicabilidade de modelo é cada vez mais exigida (inclusive por regulação em setores como crédito e saúde) — domínio dessas técnicas é diferencial crescente em vagas de Data Scientist.

**10. 🟢 `/machine-learning/baseline-first-methodology-showcase`**
Peça didática/manifesto técnico demonstrando, com exemplos reais de outros projetos do portfólio, por que sempre comparar modelo complexo contra baseline simples antes de celebrar performance.
**Dados**: reaproveita resultados já existentes de outros projetos (ex.: `ml-price-direction-classifier`).
**Resultado esperado**: artigo de metodologia bem fundamentado, citando exemplos concretos do próprio portfólio.
**Skills**: comunicação técnica, rigor metodológico.
**Atrai recrutador porque**: esse tipo de honestidade metodológica é exatamente o que distingue cientista de dados maduro de quem apenas treina modelos sem questionar se eles realmente agregam valor sobre algo simples.

**11. 🔴 `/machine-learning/graph-network-analysis-transfers`**
Análise de rede (grafo) do mercado de transferências de futebol — clubes como nós, transferências como arestas — identificando clusters de mercado e hubs de intermediação.
**Dados**: Transfermarkt (histórico de transferências).
**Resultado esperado**: visualização de grafo interativo com métricas de centralidade.
**Skills**: análise de grafos/redes (NetworkX), visualização de rede.
**Gap**: análise de grafo não coberta diretamente no roadmap — ampliação natural, tecnicamente acessível.
**Atrai recrutador porque**: análise de rede é ferramenta poderosa e visualmente impressionante, pouco representada na maioria dos portfólios de Data Science — boa peça de diferenciação visual e analítica.

**12. 🟢 `/machine-learning/feature-engineering-cookbook`**
Cookbook documentado de técnicas de feature engineering aplicadas através dos diferentes datasets do portfólio (futebol, finanças, dados pessoais), como material de referência reutilizável.
**Dados**: reaproveita datasets já existentes em múltiplos grupos.
**Resultado esperado**: repositório de referência com padrões de feature engineering documentados e testados.
**Skills**: feature engineering, documentação técnica.
**Atrai recrutador porque**: feature engineering de qualidade é frequentemente o que mais impacta performance de modelo na prática — material de referência prova domínio prático sólido, transversal a todos os outros projetos de ML.

**13. 🟡 `/machine-learning/synthetic-control-method-demo`**
Demonstração do método de controle sintético (técnica de inferência causal usada para avaliar impacto de eventos sem grupo de controle randomizado), aplicado a um caso do domínio de futebol (ex.: impacto de mudança de técnico).
**Dados**: reaproveita dados do grupo `/football`.
**Resultado esperado**: estudo de caso aplicando a técnica com discussão de validade e limitações.
**Skills**: inferência causal (synthetic control), estatística avançada.
**Gap**: técnica específica de inferência causal exige estudo dedicado, ainda que sem nova ferramenta de software.
**Atrai recrutador porque**: synthetic control é técnica usada em economia aplicada e em times de Data Science de produto avançados (ex.: avaliação de impacto de feature) — pouco comum em portfólios, forte diferenciador.

**14. 🟢 `/machine-learning/data-storytelling-portfolio-piece`**
Peça de data storytelling pura (sem necessariamente modelo novo) contando uma história completa a partir de um dos datasets já existentes, com foco em narrativa visual e texto, não em técnica.
**Dados**: reaproveita qualquer dataset já existente no portfólio.
**Resultado esperado**: artigo/ensaio visual publicável, bilíngue.
**Skills**: storytelling de dados, design de informação, escrita técnica acessível.
**Atrai recrutador porque**: muitos times de dados sofrem mais com comunicação de insight do que com técnica em si — essa peça prova competência de comunicação, frequentemente o fator decisivo em processo seletivo após a etapa técnica.

**15. 🔴 `/machine-learning/automl-benchmark-study`**
Estudo comparativo entre uma solução AutoML (ex.: PyCaret, AutoGluon) e modelagem manual cuidadosa, sobre o mesmo problema e dataset, discutindo trade-offs de tempo vs. controle vs. performance.
**Dados**: reaproveita dataset já existente em outro projeto (ex.: `quant/credit-risk-scoring-demo`).
**Resultado esperado**: artigo comparativo honesto sobre quando AutoML compensa e quando não compensa.
**Skills**: AutoML (ferramenta específica), modelagem manual, análise crítica de trade-off.
**Gap**: ferramenta de AutoML específica não coberta no roadmap — ampliação natural de exploração de ferramentas.
**Atrai recrutador porque**: opinião fundamentada e baseada em experimento próprio sobre AutoML é tema de debate real em times de dados modernos — mostra maturidade de julgamento técnico, não apenas execução.

**16. 🟡 `/machine-learning/cross-validation-pitfalls-demo`**
Material didático/experimento demonstrando armadilhas comuns de validação cruzada (data leakage, vazamento temporal) usando casos propositalmente errados e corrigidos lado a lado.
**Dados**: reaproveita dataset já existente (ex.: dado de série temporal do grupo `/quant`).
**Resultado esperado**: artigo didático com exemplos de erro comum e a correção correspondente.
**Skills**: validação cruzada avançada, rigor metodológico.
**Gap**: nenhuma ferramenta nova, mas exige entendimento aprofundado de armadilhas estatísticas sutis.
**Atrai recrutador porque**: data leakage é um dos erros mais comuns e mais caros em modelagem real — material didático sobre isso prova rigor metodológico de nível avançado, frequentemente testado em entrevista técnica.

**17. 🟢 `/machine-learning/exploratory-data-analysis-template`**
Template/checklist reutilizável de análise exploratória de dados (EDA), aplicado e demonstrado sobre um dataset novo a cada vez que o template é usado em outro projeto do portfólio.
**Dados**: qualquer dataset novo do portfólio.
**Resultado esperado**: template padronizado de EDA, com exemplo de uso real documentado.
**Skills**: análise exploratória, padronização de processo, Python.
**Atrai recrutador porque**: ter um processo padronizado e replicável de EDA é sinal de maturidade de processo, não apenas habilidade técnica pontual — relevante para quem avalia capacidade de trabalhar de forma consistente em equipe.

**18. 🟡 `/machine-learning/active-learning-labeling-demo`**
Demonstração de active learning (estratégia de selecionar quais exemplos rotular primeiro para maximizar ganho de um modelo com orçamento de rotulagem limitado), em um problema de classificação pequeno.
**Dados**: dataset público pequeno de classificação, parcialmente "des-rotulado" artificialmente para a demonstração.
**Resultado esperado**: comparação entre active learning e amostragem aleatória de rotulagem, mostrando ganho de eficiência.
**Skills**: active learning (conceitual e prático), classificação supervisionada.
**Gap**: técnica específica não coberta no roadmap, mas conceitualmente acessível com base de ML já existente.
**Atrai recrutador porque**: active learning é tema relevante em contextos onde rotulagem é cara (ex.: dados médicos, jurídicos) — pouco comum em portfólio, boa peça de diferenciação técnica.

**19. 🟢 `/machine-learning/model-card-documentation-standard`**
Adoção do padrão de "model card" (documentação estruturada de modelo: propósito, dados de treino, limitações, métricas) aplicado retroativamente a todos os modelos já existentes no portfólio.
**Dados**: nenhum — documentação de modelos já existentes.
**Resultado esperado**: conjunto de model cards padronizados, um por modelo do portfólio.
**Skills**: documentação de ML responsável, comunicação técnica.
**Atrai recrutador porque**: model cards são prática recomendada por times de ML responsável em empresas maduras (incluindo grandes players de tecnologia) — adotar isso voluntariamente sinaliza alinhamento com práticas de ponta de governança de IA.

**20. 🟢 `/machine-learning/portfolio-ml-model-registry`**
Registro centralizado (catálogo navegável) de todos os modelos de ML construídos através do portfólio, com link para o projeto, dataset usado, e model card correspondente.
**Dados**: síntese de todos os projetos de ML já existentes no portfólio.
**Resultado esperado**: página de catálogo único, navegável, conectando todos os modelos do portfólio.
**Skills**: organização de informação, comunicação técnica.
**Atrai recrutador porque**: assim como o `portfolio-cloud-architecture-overview` do grupo de infraestrutura, esse catálogo funciona como ponto de entrada único para quem revisa o portfólio rapidamente, aumentando a chance de o trabalho ser de fato avaliado em sua totalidade.

---

## Grupo 7 — `/experimentation` (estatística aplicada, causalidade, design de experimento)

**1. 🟢 `/experimentation/sample-size-and-power-toolkit`**
Toolkit completo (não apenas calculadora isolada) de planejamento de experimento — tamanho de amostra, poder estatístico, duração mínima de teste — documentado com exemplos reais de uso.
**Dados**: nenhum dado externo necessário.
**Resultado esperado**: ferramenta + guia de uso, bilíngue.
**Skills**: estatística inferencial, design de experimento.
**Atrai recrutador porque**: planejamento de experimento é etapa frequentemente pulada por pressa — ferramenta robusta sobre isso é prova de rigor científico aplicado a produto.

**2. 🟡 `/experimentation/simpsons-paradox-explainer`**
Material didático interativo demonstrando o Paradoxo de Simpson com exemplos reais extraídos de outros datasets do portfólio (ex.: dados de futebol ou finanças), mostrando como agregações podem enganar.
**Dados**: reaproveita datasets já existentes.
**Resultado esperado**: artigo/visualização interativa didática.
**Skills**: estatística, visualização interativa, didática técnica.
**Gap**: nenhuma ferramenta nova, mas exige cuidado didático na escolha de exemplo claro e correto.
**Atrai recrutador porque**: capacidade de explicar conceitos estatísticos sutis com clareza é diferencial forte em entrevista comportamental/técnica combinada — prova de profundidade sem jargão inacessível.

**3. 🟢 `/experimentation/correlation-vs-causation-gallery`**
Galeria curada de correlações espúrias reais (ou geradas a partir de dados próprios do portfólio) como peça educacional sobre a diferença entre correlação e causalidade.
**Dados**: reaproveita datasets já existentes, buscando correlações espúrias genuínas dentro deles.
**Resultado esperado**: galeria interativa e divertida, com explicação estatística de cada caso.
**Skills**: estatística, comunicação acessível, design de conteúdo.
**Atrai recrutador porque**: conteúdo com potencial de viralização/compartilhamento amplo, ao mesmo tempo que demonstra profundo entendimento estatístico por trás da apresentação leve.

**4. 🟡 `/experimentation/bayesian-vs-frequentist-ab-test`**
Comparação lado a lado de abordagem bayesiana vs. frequentista para análise do mesmo teste A/B simulado, discutindo quando cada uma é mais apropriada.
**Dados**: dados sintéticos de teste A/B simulado.
**Resultado esperado**: artigo/notebook comparativo com implementação de ambas as abordagens.
**Skills**: estatística bayesiana, estatística frequentista, Python.
**Gap**: estatística bayesiana exige estudo dedicado adicional.
**Atrai recrutador porque**: debate bayesiano vs. frequentista é tema clássico de entrevista de Data Scientist sênior — ter implementação prática de ambos, não apenas opinião teórica, é diferencial concreto.

**5. 🟢 `/experimentation/multiple-testing-correction-demo`**
Demonstração prática do problema de comparações múltiplas (p-hacking acidental) e como corrigi-lo (Bonferroni, FDR), usando exemplo simulado com muitas métricas testadas simultaneamente.
**Dados**: dados sintéticos simulando múltiplas métricas de teste A/B.
**Resultado esperado**: artigo didático mostrando taxa de falso positivo inflada sem correção, e corrigida com método apropriado.
**Skills**: estatística, correção de múltiplas comparações.
**Atrai recrutador porque**: esse erro é extremamente comum em times de produto que rodam muitos testes simultâneos — domínio claro do tema é diferencial de rigor estatístico real.

**6. 🔴 `/experimentation/causal-inference-diff-in-diff-football`**
Aplicação de diferença em diferenças (diff-in-diff) a um evento real do domínio de futebol (ex.: mudança de regra, impacto de pandemia em desempenho), com grupo de controle e tratamento bem definidos.
**Dados**: reaproveita dados do grupo `/football`.
**Resultado esperado**: estudo de caso completo de inferência causal aplicada, com discussão de premissas (tendências paralelas) e suas limitações.
**Skills**: inferência causal (diff-in-diff), econometria aplicada.
**Gap**: técnica de inferência causal mais avançada, exige estudo dedicado de econometria.
**Atrai recrutador porque**: diff-in-diff é técnica clássica de economia aplicada usada também em Data Science de produto — combinar com domínio de paixão pessoal (futebol) torna o estudo de caso memorável e bem fundamentado simultaneamente.

**7. 🟡 `/experimentation/survivorship-bias-gallery`**
Coleção de casos de viés de sobrevivência (survivorship bias) identificados ou simulados a partir de dados próprios (ex.: times que "sobreviveram" em primeira divisão vs. os que caíram, e como isso distorce análise se ignorado).
**Dados**: reaproveita dados do grupo `/football`.
**Resultado esperado**: artigo educacional com casos concretos.
**Skills**: identificação de viés de seleção, estatística aplicada.
**Gap**: nenhuma ferramenta nova, exige cuidado conceitual na construção dos exemplos.
**Atrai recrutador porque**: survivorship bias é um dos vieses mais citados (e mais mal compreendidos) em análise de negócio — exemplo bem construído com dados reais é forte material de portfólio educacional.

**8. 🟢 `/experimentation/regression-to-mean-sports-study`**
Estudo de regressão à média aplicado a desempenho esportivo (ex.: por que um jogador com início de temporada excepcional tende a "normalizar" depois), com dados reais do grupo `/football`.
**Dados**: reaproveita dados do grupo `/football`.
**Resultado esperado**: estudo com visualização clara do fenômeno de regressão à média.
**Skills**: estatística, séries temporais, visualização explicativa.
**Atrai recrutador porque**: regressão à média é conceito estatístico fundamental frequentemente mal aplicado em decisões de negócio (ex.: "sorte" de desempenho recente) — estudo aplicado a domínio compreensível prova entendimento sólido e comunicável.

**9. 🟡 `/experimentation/confidence-interval-misinterpretation-demo`**
Material didático corrigindo interpretações equivocadas comuns de intervalo de confiança (ex.: "95% de chance de o valor verdadeiro estar nesse intervalo" não é a interpretação correta), com simulação visual mostrando o significado real via repetição de amostragem.
**Dados**: dados sintéticos gerados via simulação repetida.
**Resultado esperado**: visualização interativa mostrando frequência de cobertura do intervalo ao longo de muitas amostras simuladas.
**Skills**: estatística inferencial, simulação, visualização interativa.
**Gap**: nenhuma ferramenta nova, mas exige precisão conceitual cuidadosa na explicação.
**Atrai recrutador porque**: esse é um dos erros conceituais mais comuns mesmo entre profissionais experientes — corrigi-lo com clareza e simulação visual é prova de domínio estatístico genuíno, não apenas de memorização de fórmula.

**10. 🟢 `/experimentation/effect-size-vs-significance-explainer`**
Material explicando a diferença entre significância estatística e relevância prática (effect size), com exemplo onde um resultado é estatisticamente significativo mas praticamente irrelevante, e vice-versa.
**Dados**: dados sintéticos ou reaproveitados de outros projetos.
**Resultado esperado**: artigo didático com exemplos numéricos claros.
**Skills**: estatística, comunicação de resultado para tomada de decisão.
**Atrai recrutador porque**: a confusão entre "estatisticamente significativo" e "importante na prática" é decisão de negócio recorrente mal compreendida — clareza sobre isso é exatamente o que se espera de um analista sênior maduro.

**11. 🟡 `/experimentation/sequential-testing-peeking-problem`**
Demonstração do problema de "peeking" (analisar resultado de teste A/B antes do tamanho de amostra planejado) e como testes sequenciais corrigem isso adequadamente.
**Dados**: dados sintéticos de teste A/B simulado, com múltiplos pontos de checagem intermediária.
**Resultado esperado**: artigo mostrando inflação de falso positivo ao "espiar" resultado antes da hora, e a correção via teste sequencial apropriado.
**Skills**: testes sequenciais, estatística inferencial.
**Gap**: testes sequenciais exigem estudo dedicado de método específico.
**Atrai recrutador porque**: "peeking" é erro extremamente comum em times de produto sob pressão de decidir rápido — demonstrar domínio da correção apropriada é diferencial técnico concreto e aplicável.

**12. 🟢 `/experimentation/observational-vs-experimental-data-case-studies`**
Coleção de estudos de caso comparando o que se pode e o que não se pode concluir de dados observacionais vs. dados de experimento controlado, usando exemplos reais do próprio portfólio (ex.: dados de futebol são observacionais; um teste A/B simulado é experimental).
**Dados**: reaproveita dados de múltiplos grupos do portfólio.
**Resultado esperado**: artigo comparativo estruturado, com lições aplicáveis.
**Skills**: epistemologia de dados, comunicação técnica.
**Atrai recrutador porque**: entender os limites do que dado observacional pode (e não pode) responder é exatamente a diferença entre análise ingênua e análise madura — síntese transversal de todo o portfólio em uma única peça reflexiva.

**13. 🔴 `/experimentation/instrumental-variables-intro`**
Introdução aplicada à técnica de variáveis instrumentais (uma das ferramentas mais avançadas de inferência causal), com um caso simplificado e bem documentado.
**Dados**: a depender do caso escolhido, possivelmente reaproveitando dados de outro grupo.
**Resultado esperado**: estudo de caso introdutório, com ênfase em explicar quando e por que a técnica é necessária.
**Skills**: econometria avançada, inferência causal.
**Gap**: é provavelmente a técnica estatística mais avançada de toda a lista — investimento de estudo significativo.
**Atrai recrutador porque**: variáveis instrumentais raramente aparecem em portfólio de Data Science fora de quem tem formação em economia — diferenciador de nicho forte para vagas que valorizam rigor causal genuíno (ex.: Economics/Data Science combinados).

**14. 🟢 `/experimentation/percentile-vs-average-misleading-metrics`**
Material explicando por que média pode ser uma métrica enganosa em distribuições assimétricas (ex.: tempo de resposta, valor de transação), defendendo uso de percentis (p50, p95, p99) com exemplos reais.
**Dados**: reaproveita qualquer dataset com distribuição assimétrica já existente no portfólio.
**Resultado esperado**: artigo didático com visualização comparativa entre média e percentis no mesmo dataset.
**Skills**: estatística descritiva, visualização de distribuição.
**Atrai recrutador porque**: uso de percentis em vez de média é prática padrão em times de engenharia/produto maduros (ex.: SLA de latência em p99) — domínio claro disso conecta diretamente com vocabulário técnico de times de produto e engenharia.

**15. 🟡 `/experimentation/network-effects-experiment-design-challenges`**
Material discutindo os desafios de desenhar experimentos controlados quando há efeito de rede entre unidades (ex.: contaminação entre grupo de tratamento e controle), com proposta de mitigação (ex.: randomização por cluster).
**Dados**: conceitual, com exemplo ilustrativo possivelmente simulado.
**Resultado esperado**: artigo explicando o problema e soluções práticas conhecidas (cluster randomization, switchback design).
**Skills**: design de experimento avançado, pensamento crítico sobre validade interna.
**Gap**: tema relativamente avançado de design experimental, exige leitura dedicada.
**Atrai recrutador porque**: efeitos de rede em experimento são desafio real em produtos sociais/marketplace — discutir isso com profundidade sinaliza pensamento crítico de nível sênior sobre limitações de métodos padrão.

**16. 🟢 `/experimentation/data-quality-checklist-before-analysis`**
Checklist documentado e aplicado de verificação de qualidade de dado antes de iniciar qualquer análise (duplicatas, outliers, consistência de schema, valores ausentes), demonstrado sobre um dataset real do portfólio com problemas propositalmente identificados.
**Dados**: qualquer dataset do portfólio, com problemas reais ou propositalmente inseridos para fins didáticos.
**Resultado esperado**: checklist reutilizável + exemplo aplicado mostrando problemas encontrados e como foram tratados.
**Skills**: qualidade de dado, Python, rigor processual.
**Atrai recrutador porque**: pular verificação de qualidade de dado é causa raiz de boa parte dos erros de análise no mundo real — checklist robusto e exemplificado prova disciplina processual, frequentemente subestimada como habilidade técnica.

**17. 🟡 `/experimentation/historical-data-survivorship-in-market-indices`**
Estudo de como índices de mercado (ex.: composição do Ibovespa ou S&P 500 ao longo do tempo) sofrem de viés de sobrevivência ao remover empresas que faliram/saíram do índice, distorcendo retorno histórico percebido.
**Dados**: dados históricos de composição de índice (fontes públicas, quando disponíveis) + dados de preço.
**Resultado esperado**: estudo quantificando o tamanho do viés quando identificável nos dados disponíveis.
**Skills**: estatística aplicada a finanças, tratamento cuidadoso de dado histórico incompleto.
**Gap**: dados de composição histórica de índice podem ser difíceis de obter de forma completa — projeto depende de disponibilidade real de fonte.
**Atrai recrutador porque**: esse é um viés frequentemente ignorado mesmo por profissionais de mercado financeiro — ponte natural entre o grupo `/experimentation` e o grupo `/quant`, reforçando consistência de raciocínio crítico entre áreas.

**18. 🟢 `/experimentation/pre-registration-template-and-rationale`**
Template de pré-registro de hipótese e plano de análise (especificar o que será testado e como, antes de olhar o resultado), aplicado de forma demonstrativa a um dos próximos projetos do portfólio antes de sua execução.
**Dados**: nenhum dado externo — é processo metodológico.
**Resultado esperado**: documento de pré-registro publicado antes da análise correspondente ser feita, permitindo comparação posterior entre o planejado e o executado.
**Skills**: rigor metodológico, ciência aberta/reprodutível.
**Atrai recrutador porque**: pré-registro é prática de ciência aberta cada vez mais valorizada mesmo fora da academia (ex.: experimentação de produto séria) — adotar isso voluntariamente é sinal raro e forte de integridade analítica.

**19. 🔴 `/experimentation/heterogeneous-treatment-effects-uplift-modeling`**
Modelagem de efeito heterogêneo de tratamento (uplift modeling) — identificar quais subgrupos respondem mais a uma intervenção, não apenas o efeito médio geral — aplicada a um caso simulado realista.
**Dados**: dados sintéticos simulando um experimento com efeito heterogêneo deliberado.
**Resultado esperado**: modelo identificando os subgrupos de maior responsividade, com validação da abordagem.
**Skills**: uplift modeling, machine learning causal.
**Gap**: técnica avançada que combina ML com inferência causal — um dos tópicos mais sofisticados de toda a lista de projetos.
**Atrai recrutador porque**: uplift modeling é exatamente o tipo de técnica usada por times de growth/marketing de produtos maduros para personalizar intervenção — altamente valorizado e raro em portfólio de candidato pleno.

**20. 🟢 `/experimentation/methodology-portfolio-index`**
Página-índice consolidando todos os projetos do grupo `/experimentation` como um "manifesto de rigor metodológico" do portfólio inteiro, explicando a filosofia comum por trás de todos eles.
**Dados**: nenhum — síntese dos projetos já existentes no grupo.
**Resultado esperado**: página de síntese, navegável, com a narrativa unificadora do grupo.
**Skills**: comunicação técnica, síntese conceitual.
**Atrai recrutador porque**: assim como os outros catálogos-síntese de outros grupos, essa página comunica de forma compacta exatamente o que normalmente exige ler todos os 20 projetos individualmente para perceber — eficiência de comunicação para quem revisa rapidamente.

---

## Grupo 8 — `/bilingual-data-storytelling` (comunicação técnica, conteúdo, marca pessoal)

**1. 🟢 `/bilingual-data-storytelling/portfolio-meta-narrative`**
Página/artigo contando a história de construção do próprio portfólio — por que a estrutura de grupos foi escolhida, como o roadmap de aprendizado se conecta aos projetos, e o que foi aprendido no processo — em português e inglês.
**Dados**: nenhum — é meta-conteúdo sobre o próprio portfólio.
**Resultado esperado**: artigo bilíngue publicável, possivelmente o primeiro ponto de entrada recomendado para quem visita o site.
**Skills**: storytelling, comunicação bilíngue, síntese.
**Atrai recrutador porque**: recrutadores frequentemente decidem em poucos minutos se vale a pena explorar mais — uma narrativa de abertura clara e honesta sobre o processo (não só o resultado) humaniza e contextualiza todo o resto do portfólio.

**2. 🟡 `/bilingual-data-storytelling/data-engineer-vs-analyst-vs-scientist-explainer`**
Artigo explicando, com exemplos concretos extraídos do próprio portfólio, a diferença prática entre os três perfis (Analyst, Engineer, Scientist) e por que dominar os três é uma vantagem para certos contextos de mercado (freelance, scale-ups, consultorias).
**Dados**: reaproveita exemplos de todos os grupos do portfólio.
**Resultado esperado**: artigo de posicionamento estratégico, bilíngue.
**Skills**: comunicação estratégica, síntese de carreira.
**Gap**: nenhum técnico — exige clareza de posicionamento pessoal bem articulada.
**Atrai recrutador porque**: esse artigo praticamente "explica para o recrutador como te contratar" — reduz a fricção de entender o porquê de um perfil multidisciplinar, em vez de deixar essa interpretação a cargo de quem revisa.

**3. 🟢 `/bilingual-data-storytelling/glossary-data-terms-pt-en`**
Glossário bilíngue de termos técnicos de dados (ex.: "data drift" = "deriva de dados"), construído organicamente a partir dos termos usados em todos os outros projetos do portfólio.
**Dados**: nenhum — síntese terminológica dos próprios projetos.
**Resultado esperado**: glossário navegável, cross-linkado com os projetos onde cada termo aparece.
**Skills**: terminologia técnica bilíngue, organização de conteúdo.
**Atrai recrutador porque**: conteúdo de referência como esse tem bom potencial de tráfego orgânico de busca, além de reforçar a marca de "ponte bilíngue" no nicho de dados — público-alvo nacional e internacional simultaneamente.

**4. 🟡 `/bilingual-data-storytelling/technical-writing-before-after-case`**
Case mostrando a evolução de um texto técnico de uma primeira versão confusa para uma versão clara, com anotações explicando cada decisão de reescrita.
**Dados**: nenhum — material didático sobre comunicação.
**Resultado esperado**: artigo didático de antes/depois com comentário pedagógico.
**Skills**: escrita técnica, edição, didática.
**Gap**: nenhum técnico, mas exige disciplina de autoanálise crítica do próprio texto.
**Atrai recrutador porque**: comunicação escrita clara é constantemente citada como gap em candidatos técnicos — prova explícita dessa habilidade é diferencial competitivo, especialmente para trabalho remoto assíncrono (onde escrita substitui boa parte da comunicação verbal).

**5. 🟢 `/bilingual-data-storytelling/interactive-resume-data-driven`**
Currículo interativo "data-driven" — não um PDF estático, mas uma página que apresenta a trajetória profissional como um pequeno dashboard navegável (experiência, skills, projetos relacionados a cada vaga-tipo).
**Dados**: dados da própria trajetória profissional.
**Resultado esperado**: página de currículo interativo bilíngue, linkada à página principal do site.
**Skills**: desenvolvimento web, design de informação, síntese de carreira.
**Atrai recrutador porque**: um "currículo que é em si um projeto de dados" é prova viva e imediata de competência — comunica habilidade através do próprio formato, não apenas do conteúdo.

**6. 🟡 `/bilingual-data-storytelling/conference-talk-style-deep-dive`**
Um dos projetos mais robustos do portfólio (ex.: `club-league-simulator`) reescrito no formato de "talk" de conferência técnica (estilo PyData/PyCon) — com roteiro, slides conceituais e narrativa de apresentação, mesmo sem apresentação real ainda realizada.
**Dados**: reaproveita projeto já existente.
**Resultado esperado**: material de apresentação completo, pronto para eventual submissão a conferência real.
**Skills**: apresentação técnica, storytelling, design de slide.
**Gap**: nenhum técnico — exige prática de comunicação oral/apresentacional.
**Atrai recrutador porque**: ter material "pronto para palco" sinaliza ambição de visibilidade na comunidade técnica, e mesmo sem apresentação real ainda, demonstra a capacidade de estruturar uma narrativa técnica longa de forma envolvente.

**7. 🟢 `/bilingual-data-storytelling/open-source-contribution-log`**
Registro público e documentado de contribuições a projetos open-source relacionados ao stack do portfólio (mesmo pequenas: documentação, correção de bug simples, tradução).
**Dados**: nenhum — é registro de atividade real em projetos de terceiros.
**Resultado esperado**: página listando contribuições com contexto e link, bilíngue.
**Skills**: Git/GitHub colaborativo, comunicação em comunidade técnica internacional.
**Atrai recrutador porque**: contribuição open-source, mesmo pequena, é sinal forte de engajamento genuíno com a comunidade técnica internacional — frequentemente citado como diferencial em vagas remotas fora do Brasil.

**8. 🟡 `/bilingual-data-storytelling/case-study-client-simulation`**
Case de consultoria simulado (cliente fictício, problema de negócio realista) documentado do início ao fim — diagnóstico, proposta de solução, implementação, resultado — como peça voltada especificamente a clientes freelance.
**Dados**: nenhum dado real de cliente — caso fictício mas tecnicamente realista, possivelmente reaproveitando dados sintéticos já gerados em outros projetos.
**Resultado esperado**: case de consultoria completo, em formato de proposta comercial bem escrita.
**Skills**: consultoria técnica, comunicação orientada a negócio, síntese de processo.
**Gap**: nenhum técnico — exige prática de comunicação orientada a resultado de negócio, não apenas técnica.
**Atrai recrutador porque**: é o material exato que um cliente freelance em potencial procura antes de contratar — prova de capacidade de traduzir competência técnica em valor de negócio compreensível.

**9. 🟢 `/bilingual-data-storytelling/learning-in-public-log`**
Registro público e cronológico do processo de aprendizado do roadmap de skills (SQL → Docker → dbt → AWS → Airflow), publicado conforme o progresso avança, incluindo dificuldades reais enfrentadas.
**Dados**: reaproveita diretamente o conteúdo gerado em `plano-de-estudos.md` e sua execução real.
**Resultado esperado**: série de posts/páginas cronológicas, bilíngues, documentando o processo de aprendizado de forma transparente.
**Skills**: comunicação contínua, consistência de publicação.
**Atrai recrutador porque**: "learning in public" é prática bem vista pela comunidade técnica internacional — mostra trajetória de crescimento real e contínua, não apenas um portfólio estático congelado em um momento só.

**10. 🟢 `/bilingual-data-storytelling/faq-for-recruiters`**
Página de FAQ direcionada especificamente a recrutadores e gestores de contratação, respondendo perguntas práticas (disponibilidade, fuso horário, modelo de contratação preferido, stack principal) de forma direta e bilíngue.
**Dados**: nenhum — informação de posicionamento profissional direto.
**Resultado esperado**: página de FAQ objetiva, reduzindo fricção do primeiro contato.
**Skills**: comunicação direta, posicionamento profissional.
**Atrai recrutador porque**: recrutadores avaliando múltiplos candidatos valorizam muito quando informações logísticas básicas (fuso horário, disponibilidade, tipo de contrato) já estão respondidas sem precisar perguntar — reduz fricção e acelera decisão.

**11. 🟡 `/bilingual-data-storytelling/translation-quality-self-audit`**
Auditoria própria da qualidade da tradução/localização do site e dos projetos (não apenas tradução literal, mas adaptação cultural de exemplos, formatos de data/número), documentada como processo.
**Dados**: nenhum — auditoria do próprio conteúdo já publicado.
**Resultado esperado**: relatório de melhoria de localização aplicado ao próprio site.
**Skills**: localização (não apenas tradução), atenção a detalhes culturais (formato de data, moeda, número).
**Gap**: nenhuma ferramenta nova, mas exige rigor de revisão sistemática.
**Atrai recrutador porque**: localização bem feita (não apenas tradução automática) sinaliza atenção genuína à experiência de audiências internacionais — detalhe que comunica profissionalismo de forma sutil mas perceptível.

**12. 🟢 `/bilingual-data-storytelling/visual-identity-rationale`**
Artigo explicando as decisões de identidade visual do próprio site (paleta de cor, tipografia, motivos de design escolhidos) e a relação delas com o posicionamento de marca pessoal pretendido.
**Dados**: nenhum — reflexão sobre as próprias decisões de design já implementadas.
**Resultado esperado**: artigo de "design rationale", bilíngue.
**Skills**: design thinking, comunicação de decisão de design.
**Atrai recrutador porque**: para vagas que envolvem alguma interface com produto/design (cada vez mais comuns em Data/Analytics Engineering), mostrar raciocínio de design é diferencial inesperado e bem recebido.

**13. 🟡 `/bilingual-data-storytelling/remote-work-readiness-checklist`**
Checklist/artigo demonstrando preparo prático para trabalho remoto assíncrono internacional (ferramentas de comunicação, gestão de fuso horário, documentação como hábito), com exemplos do próprio fluxo de trabalho já adotado no portfólio.
**Dados**: nenhum — reflexão sobre o próprio processo de trabalho.
**Resultado esperado**: artigo/checklist com exemplos concretos de hábitos já praticados.
**Skills**: comunicação assíncrona, organização de processo remoto.
**Gap**: nenhum técnico — exige consistência real de hábito documentado, não apenas intenção.
**Atrai recrutador porque**: trabalho remoto internacional exige maturidade de comunicação assíncrona — provar isso com hábitos concretos (não apenas afirmar "tenho experiência remota") é mais convincente para recrutador estrangeiro.

**14. 🟢 `/bilingual-data-storytelling/project-retrospectives-collection`**
Coleção de pequenas retrospectivas honestas sobre os próprios projetos do portfólio — o que funcionou, o que não funcionou, o que seria feito diferente com o conhecimento atual — para cada projeto principal já concluído.
**Dados**: nenhum — reflexão sobre os próprios projetos já existentes.
**Resultado esperado**: seção de retrospectiva conectada a cada projeto, bilíngue.
**Skills**: autocrítica técnica, comunicação honesta.
**Atrai recrutador porque**: a maioria dos portfólios mostra só o resultado final polido — retrospectivas honestas sobre o que não funcionou bem na primeira tentativa comunicam maturidade e capacidade de aprendizado contínuo, frequentemente perguntada diretamente em entrevista comportamental.

**15. 🟡 `/bilingual-data-storytelling/data-ethics-position-statement`**
Artigo de posicionamento pessoal sobre ética de dados (privacidade, uso responsável de IA, transparência de modelo), aplicado de forma concreta às próprias decisões já tomadas no portfólio (ex.: por que dados sintéticos foram usados em vez de dados reais sensíveis em determinados projetos).
**Dados**: nenhum — posicionamento e justificativa de decisões já tomadas.
**Resultado esperado**: artigo de posicionamento, bilíngue, com exemplos concretos do próprio portfólio.
**Skills**: ética de dados aplicada, comunicação de princípio técnico.
**Gap**: nenhum técnico — exige reflexão genuína e consistente, não apenas declaração genérica.
**Atrai recrutador porque**: ética de dados é tema crescente de avaliação em processos seletivos de empresas maduras — posicionamento concreto (não genérico) e ancorado em decisões reais já tomadas é muito mais convincente que afirmação abstrata de princípio.

**16. 🟢 `/bilingual-data-storytelling/skill-progression-timeline`**
Linha do tempo visual e interativa mostrando a evolução real de competências ao longo da execução do roadmap de aprendizado, atualizada conforme o progresso avança.
**Dados**: reaproveita diretamente o conteúdo de `plano-de-estudos.md` e seu acompanhamento real.
**Resultado esperado**: visualização interativa de progresso de carreira técnica, viva e atualizada.
**Skills**: visualização de dados, síntese de progresso pessoal.
**Atrai recrutador porque**: visualizar progresso real e contínuo (não apenas lista estática de skills) é prova viva de que o roadmap de aprendizado é levado a sério e executado de fato — reforça credibilidade do restante do portfólio.

**17. 🟡 `/bilingual-data-storytelling/comparative-job-market-report-pt-en`**
Relatório comparativo (em formato de pequeno white paper) sobre como o mercado de trabalho de dados se compara entre Brasil e os mercados-alvo (EUA, Canadá, Europa) — faixa salarial, skills mais pedidas, modelo de contratação — usando fontes públicas.
**Dados**: fontes públicas de mercado de trabalho (job boards, relatórios setoriais públicos).
**Resultado esperado**: white paper bilíngue publicável, com potencial de boa repercussão em comunidades de dados brasileiras.
**Skills**: pesquisa de mercado, síntese analítica, comunicação bilíngue.
**Gap**: nenhum técnico — exige pesquisa cuidadosa e honesta de fontes.
**Atrai recrutador porque**: conteúdo desse tipo tem bom potencial de autoridade e compartilhamento, além de demonstrar que o profissional já entende profundamente o mercado em que está se posicionando — natural complemento ao já citado `power-bi/job-market-tracker`.

**18. 🟢 `/bilingual-data-storytelling/code-review-philosophy-showcase`**
Artigo/showcase explicando a própria filosofia de code review e qualidade de código, com exemplos reais de antes/depois de revisão aplicada aos próprios projetos do portfólio.
**Dados**: nenhum — reaproveita código já existente em outros projetos.
**Resultado esperado**: artigo com exemplos concretos de refatoração e a justificativa de cada melhoria.
**Skills**: qualidade de código, code review, comunicação técnica.
**Atrai recrutador porque**: capacidade de revisar e melhorar o próprio código de forma crítica e articulada é exatamente o que se busca em qualquer processo de entrevista técnica que envolva pair programming ou revisão de código real.

**19. 🔴 `/bilingual-data-storytelling/video-walkthrough-series`**
Série de vídeos curtos (walkthrough) explicando os projetos mais robustos do portfólio, bilíngue (versão em português e versão em inglês), como complemento em formato audiovisual ao conteúdo escrito.
**Dados**: nenhum dado externo — produção de conteúdo audiovisual sobre os próprios projetos.
**Resultado esperado**: série de vídeos curtos, hospedados e linkados a partir das páginas correspondentes do site.
**Skills**: produção de vídeo, edição, comunicação oral bilíngue.
**Gap**: produção de vídeo é competência totalmente fora do escopo técnico do roadmap atual, com investimento de tempo e equipamento à parte.
**Atrai recrutador porque**: conteúdo audiovisual aumenta drasticamente o engajamento e a retenção de quem visita o portfólio, especialmente recrutadores com pouco tempo disponível — formato de maior esforço, mas também de maior potencial de diferenciação se bem executado.

**20. 🟢 `/bilingual-data-storytelling/portfolio-changelog`**
Changelog público do próprio portfólio — registro cronológico e versionado de cada novo projeto adicionado, atualização relevante feita, e skill nova incorporada — como prova de evolução contínua e manutenção ativa.
**Dados**: nenhum — registro próprio de evolução do site.
**Resultado esperado**: página de changelog navegável, atualizada a cada adição relevante ao portfólio.
**Skills**: versionamento, documentação de processo, consistência de manutenção.
**Atrai recrutador porque**: assim como o `data-pipelines/portfolio-pipeline-meta-dashboard`, esse changelog é prova concreta de que o portfólio é um sistema vivo e mantido, não uma fotografia estática de um único momento — fortalece a credibilidade de absolutamente todos os outros 159 projetos listados neste documento.

---

## Síntese: por que esta divisão em 8 grupos sob 3 macro-áreas

A estrutura reforça deliberadamente a narrativa de "Data Professional" multidisciplinar já presente no posicionamento atual do site, evitando o risco de parecer especializado prematuramente em um único cargo (Analyst, Engineer ou Scientist) — o que ampliaria o leque de oportunidades de freelance e contrato no curto prazo, sem comprometer a profundidade técnica percebida em nenhuma das três camadas.

**Data Analysis** (`/football`, `/power-bi`) cobre a camada de extração de insight e comunicação visual — onde SQL, DAX e storytelling de dados são centrais, e onde a paixão pessoal por futebol funciona como diferenciador de engajamento.

**Data Engineering** (`/data-pipelines`, `/cloud-infrastructure`) cobre a camada de construção e manutenção de infraestrutura de dados confiável — onde o roadmap de SQL → Docker → dbt → AWS → Airflow ganha aplicação prática direta, e onde a experiência prévia real com AWS Lambda já oferece um ponto de partida concreto.

**Data Science** (`/quant`, `/machine-learning`, `/experimentation`) cobre a camada de modelagem preditiva e rigor estatístico — onde Monte Carlo, inferência causal e ML aplicado demonstram raciocínio quantitativo transferível entre domínios (futebol, finanças, produto).

O oitavo grupo, `/bilingual-data-storytelling`, é transversal por design — não compete com os outros sete por conteúdo técnico, mas sintetiza, comunica e amplia o alcance de todos eles, reforçando o segundo eixo estratégico explícito do projeto: crescimento de marca pessoal bilíngue no Brasil e no mercado internacional simultaneamente.

## Próximos passos sugeridos

Com 160 ideias catalogadas (20 por grupo × 8 grupos), o próximo passo natural é a fase de consolidação: identificar denominadores comuns entre as ideias mais alinhadas ao interesse real e ao tempo disponível, reduzindo o catálogo para um número executável de projetos por grupo (provavelmente entre 3 e 6 por grupo na primeira leva), e then mapear cada projeto escolhido contra o cronograma do roadmap de skills em `plano-de-estudos.md` para sequenciamento realista de execução.
