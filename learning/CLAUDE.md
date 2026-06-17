# CLAUDE.md

Este arquivo define o protocolo operacional do Claude Code neste repositório.
Leia-o por completo no início de toda sessão, antes de qualquer outra ação.

## Visão geral do sistema

Este projeto é documentado e versionado de forma que qualquer dispositivo
possa retomar o trabalho exatamente de onde ficou, apenas clonando o repo.
Toda a "memória" do projeto vive em arquivos markdown e json dentro deste
repositório — não existe estado oculto fora do Git.

Estrutura de diretórios:

```
.
├── CLAUDE.md                  # este arquivo
├── README.md                  # apresentação pública do projeto
├── CONTEXT.md                 # estado atual em 1 página — fonte de verdade rápida
├── ARCHITECTURE.md            # specs técnicas, stack, decisões de design
├── tasks/
│   ├── tasks.json             # status e dependências de todas as tarefas
│   └── NNN-nome-da-tarefa/
│       ├── task.md            # objetivo e critérios de aceite
│       ├── session.md         # log da interação: prompts + respostas + timestamps
│       └── result.md          # síntese final: o que foi feito, decisões, output
├── decisions/
│   └── NNNN-titulo-da-decisao.md   # ADRs (Architecture Decision Records)
└── src/                        # código do projeto
```

## Protocolo: início de qualquer sessão

1. Leia `CONTEXT.md` primeiro. É o resumo do estado atual — onde o projeto
   está, qual a próxima tarefa, qualquer alerta urgente.
2. Leia `tasks/tasks.json` para identificar a próxima tarefa com
   `"status": "pending"` cujas `depends_on` estejam todas `"done"`.
3. Leia `ARCHITECTURE.md` se for a primeira sessão neste dispositivo, ou se
   `CONTEXT.md` indicar mudança arquitetural desde a última sessão.
4. NÃO leia todos os `result.md` do projeto por padrão — leia apenas os das
   tarefas listadas em `depends_on` da tarefa atual. Isso evita consumir
   contexto com informação irrelevante para o trabalho imediato.

## Protocolo: antes de iniciar a tarefa N

1. Leia `task.md` e `result.md` (se existir) de cada tarefa em `depends_on`.
2. Avalie se o plano mudou em função do que essas tarefas revelaram:
   - Se `tasks.json` precisa de tarefas novas, reordenação, ou mudança de
     escopo: edite `tasks.json` e comite como `plan(update): <resumo>`.
   - Se `ARCHITECTURE.md` ficou desatualizado: edite o arquivo, crie um
     ADR correspondente em `decisions/`, e comite como
     `decision(NNNN): <resumo>`.
3. Crie a pasta `tasks/NNN-nome-da-tarefa/` (NNN com zero à esquerda,
   sequencial) com `task.md` descrevendo objetivo e critérios de aceite.
4. Atualize `tasks.json`: status da tarefa N para `"in_progress"`.

## Protocolo: durante a tarefa N

1. Registre cada interação relevante em `session.md`, em ordem cronológica,
   usando o formato abaixo. "Relevante" inclui qualquer prompt que mude
   direção, peça ajuste, ou contenha decisão — não é necessário registrar
   trocas puramente mecânicas (ex: "ok, continue").
2. O registro deve conter o texto integral do prompt e da resposta, não
   resumos. Resumir é função do `result.md`, não do `session.md`.
3. Comite progresso incremental com mensagens no formato:
   `task(NNN): progress — <resumo de uma linha>`

Formato do `session.md`:

```markdown
---
task_id: "NNN"
started: 2026-06-17T14:32:00-03:00
device: "nome-do-dispositivo"
---

## [2026-06-17T14:32:00-03:00] Prompt

<texto integral do prompt do usuário>

## [2026-06-17T14:33:45-03:00] Resposta

<texto integral da resposta textual do Claude — não apenas o código
gerado, mas o raciocínio e explicação que acompanharam>
```

## Protocolo: ao finalizar a tarefa N

1. Escreva `result.md` com:
   - O que foi feito (síntese, não o histórico bruto)
   - Decisões tomadas durante a execução e por quê
   - Desvios em relação ao `task.md` original, se houver
   - O que a próxima tarefa precisa saber (contexto que será lido por N+1)
2. Atualize `tasks/tasks.json`: status → `"done"`, e adicione os hashes de
   commit relevantes no campo `"commits"`.
3. Atualize `CONTEXT.md`: qual é a próxima tarefa, e qualquer alerta.
4. Comite: `task(NNN): done — <resumo de uma linha>`

## Convenção de commits

```
task(NNN): start — <resumo>
task(NNN): progress — <resumo>
task(NNN): done — <resumo>
plan(update): <resumo>
decision(NNNN): <resumo>
context: <resumo>
```

Use `--grep="task(NNN)"` no `git log` para reconstruir o histórico completo
de uma tarefa específica. Granularidade importa: commits frequentes e
pequenos são preferíveis a um commit grande ao final do dia, pois permitem
reconstruir a evolução do projeto com precisão a partir do histórico do Git.

## Regras gerais

- Nunca commite segredos, tokens ou chaves de API. Verifique `.gitignore`
  antes de cada commit caso novos arquivos de configuração tenham sido
  criados.
- Nunca edite `result.md` de tarefas já concluídas para "corrigir" o
  registro histórico. Se uma decisão passada precisa ser revista, registre
  isso como uma nova entrada em `decisions/`, referenciando a tarefa
  original.
- `tasks.json` é a fonte de verdade estruturada do status do projeto — toda
  vez que o status de uma tarefa muda, esse arquivo é atualizado no mesmo
  commit que a mudança real.
- `CONTEXT.md` deve ser sempre curto (uma página). Não é um log — é um
  retrato do presente. Histórico vive em `tasks/` e no Git, não aqui.
- Este repositório pode ser público ou privado dependendo do projeto.
  Trate todo conteúdo de `session.md`, `task.md` e `result.md` como se
  pudesse se tornar público — não inclua informação sensível mesmo em
  repositórios atualmente privados.
