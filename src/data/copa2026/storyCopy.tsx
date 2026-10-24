// Bilingual copy for the Copa 2026 "story" layer: the results banner, title-odds chart,
// scorecard, surprises, match explorer and per-snapshot narrative.
// Numbers always come from story.json / the moment JSON; only wording lives here.

import type { ReactNode } from 'react';
import type { Lang } from '@/data/content';
import type { StageKey } from '@/data/copa2026';

export type StageNames = Record<StageKey, string>;

export interface StoryCopy {
  stageNames: StageNames;
  stageShort: StageNames;
  momentShort: string[];

  // ── outcome banner ────────────────────────────────────────────────────
  endedTitle: string;
  championWord: string;
  runnerUpWord: string;
  thirdWord: string;
  fourthWord: string;
  finalSentence: (home: string, away: string, score: string, suffix: string) => string;
  lastSnapshotSentence: (winner: string, pw: string, loser: string, pl: string) => string;

  // ── key numbers ───────────────────────────────────────────────────────
  keyTitle: string;
  keyChampionOdds: string;
  keyChampionOddsNote: (rank: number) => string;
  keyGroupCalls: string;
  keyGroupCallsNote: string;
  keyKoCalls: string;
  keyKoCallsNote: string;
  keyGoals: string;
  keyGoalsNote: string;

  // ── trajectory chart ──────────────────────────────────────────────────
  trajTitle: string;
  trajSubtitle: string;
  trajAxis: string;
  trajHint: string;
  trajWent: string;

  // ── moments grid ──────────────────────────────────────────────────────
  momentsFavorite: string;
  momentsChampion: (team: string, p: string, rank: number) => string;
  momentsOpen: string;

  // ── scorecard ─────────────────────────────────────────────────────────
  scoreTitle: string;
  scoreSubtitle: string;
  colStage: string;
  colN: string;
  colCalled: string;
  colProb: string;
  colLoss: string;
  colGoals: string;
  colOu: string;
  colExact: string;
  calledGroups: string;
  calledKo: string;
  scoreNoteKo: string;
  scoreOverallGroups: string;
  scoreOverallKo: string;
  scoreVerdictTitle: string;
  scoreVerdict: (g: { acc: string; base: string; ll: string; llBase: string }, k: { acc: string; n: string }) => ReactNode;
  scoreImprove: string;
  scoreTrend: (x: { stage: string; ll: string; base: string; barely: boolean; later: boolean }) => string;
  updateTitle: string;
  updateBody: (rows: Array<{ label: string; frozen: string; updated: string; better: boolean }>) => ReactNode;
  updateVerdict: (better: number, total: number) => string;
  lowerBetter: string;
  baselineWord: string;

  // ── surprises ─────────────────────────────────────────────────────────
  surprisesTitle: string;
  surprisesSubtitle: string;
  surpriseGave: (p: string) => string;
  surpriseAdv: (team: string, p: string) => string;

  // ── moment navigation ─────────────────────────────────────────────────
  navPrev: string;
  navNext: string;
  navAll: string;
  navStep: (n: number) => string;

  // ── story panel on each snapshot ──────────────────────────────────────
  panelTitle: string;
  panelStart: (f: Array<{ team: string; p: string }>, champ: string, pc: string, rank: number) => ReactNode;
  panelStep: (x: {
    stage: string;
    isKo: boolean;
    called: number;
    n: number;
    surprise: string;
  }) => ReactNode;
  panelFavorite: (team: string, p: string) => string;
  panelChampion: (team: string, p: string, rank: number) => string;
  panelUp: string;
  panelDown: string;
  panelEnd: (finalLine: string, pWin: string, winner: string) => string;
  panelHindsight: string;

  // ── match explorer ────────────────────────────────────────────────────
  explorerTitle: string;
  explorerSubtitle: string;
  viewResult: string;
  viewScore: string;
  viewGoals: string;
  groupTabs: string;
  koTabs: string;
  badgePredicted: string;
  badgePlayed: string;
  oddsFrom: (n: number) => string;
  win: string;
  draw: string;
  toAdvance: string;
  ninetyMin: string;
  topScorelines: string;
  heatmapTitle: string;
  heatmapNote: string;
  actualCell: string;
  expGoals: string;
  totalGoals: string;
  goalsOf: (team: string) => string;
  overUnder: string;
  over: string;
  under: string;
  btts: string;
  yes: string;
  no: string;
  actualNow: string;
  actualLater: string;
  called: string;
  missed: string;
  calledAdv: string;
  missedAdv: string;
  gaveResult: (p: string) => string;
  gaveAdv: (team: string, p: string) => string;
  gaveScore: (p: string, rank: number | null) => string;
  gaveScoreOff: string;
  mismatchNote: (home: string, away: string) => string;
  extraTime: string;
  pens: string;
  champDelta: string;
  champWent: string;
  advProb: string;
  modelGave: (p: string) => string;
}

const STAGES_EN: StageNames = {
  G1: 'Matchday 1', G2: 'Matchday 2', G3: 'Matchday 3',
  R32: 'Round of 32', R16: 'Round of 16', QF: 'Quarter-finals', SF: 'Semi-finals',
  '3RD': 'Third place', F: 'Final',
};
const STAGES_PT: StageNames = {
  G1: 'Rodada 1', G2: 'Rodada 2', G3: 'Rodada 3',
  R32: 'Oitavas (32)', R16: 'Oitavas (16)', QF: 'Quartas de final', SF: 'Semifinais',
  '3RD': 'Terceiro lugar', F: 'Final',
};
const SHORT_EN: StageNames = {
  G1: 'MD 1', G2: 'MD 2', G3: 'MD 3', R32: 'R32', R16: 'R16', QF: 'QF', SF: 'SF', '3RD': '3rd', F: 'Final',
};
const SHORT_PT: StageNames = {
  G1: 'Rod. 1', G2: 'Rod. 2', G3: 'Rod. 3', R32: '32', R16: '16', QF: 'Quartas', SF: 'Semis', '3RD': '3º', F: 'Final',
};

const strong = (x: ReactNode) => <strong className="text-[#f1f5f9]">{x}</strong>;

export const storyCopy: Record<Lang, StoryCopy> = {
  en: {
    stageNames: STAGES_EN,
    stageShort: SHORT_EN,
    momentShort: ['Start', 'MD 1', 'MD 2', 'Groups', 'R32', 'R16', 'QF', 'SF'],

    endedTitle: 'How it ended',
    championWord: 'World champion',
    runnerUpWord: 'Runner-up',
    thirdWord: 'Third',
    fourthWord: 'Fourth',
    finalSentence: (home, away, score, suffix) => `${home} ${score} ${away}${suffix} in the Final.`,
    lastSnapshotSentence: (winner, pw, loser, pl) =>
      `The model’s last snapshot, taken before the Final, gave ${loser} ${pl} and ${winner} ${pw} to lift the trophy.`,

    keyTitle: 'The story in four numbers',
    keyChampionOdds: 'Champion’s odds at kickoff',
    keyChampionOddsNote: (rank) => `Before a ball was kicked the model ranked the eventual champion #${rank}.`,
    keyGroupCalls: 'Group results called',
    keyGroupCallsNote: 'Share of matches where the single most likely result happened (random guessing: 33%).',
    keyKoCalls: 'Knockout winners called',
    keyKoCallsNote: 'Share of ties where the team the model favoured advanced (coin flip: 50%).',
    keyGoals: 'Goals per group match',
    keyGoalsNote: 'Predicted on average vs. actually scored — a check on the goal model.',

    trajTitle: 'How the title odds moved',
    trajSubtitle:
      'Each line is one team’s probability of winning the trophy, re-estimated at every snapshot from kickoff to the semi-finals. Tap a snapshot to compare the teams.',
    trajAxis: 'Probability of winning the World Cup',
    trajHint: 'Tap a column to inspect that snapshot · tap a team to hide or show it · a line falls to 0% when the team is knocked out',
    trajWent: 'went on to win',

    momentsFavorite: 'Favourite',
    momentsChampion: (team, p, rank) => `${team} (champion) ${p} · #${rank}`,
    momentsOpen: 'Open snapshot →',

    scoreTitle: 'Was the model any good?',
    scoreSubtitle:
      'Every match was scored against the odds the model had when it was still unplayed. Group games are judged on the 90-minute result, knockout ties on who advanced.',
    colStage: 'Stage',
    colN: 'Matches',
    colCalled: 'Called',
    colProb: 'Avg. prob. on what happened',
    colLoss: 'Log loss',
    colGoals: 'Goals / match',
    colOu: 'O/U 2.5',
    colExact: 'Exact score',
    calledGroups: 'most likely result happened',
    calledKo: 'favoured team advanced',
    scoreNoteKo:
      'Knockout rows count who advanced. Goal columns use only ties settled in 90 minutes, because extra-time scores are not comparable with a 90-minute forecast; that subset skews towards decisive results, so read it with care.',
    scoreOverallGroups: 'Group stage',
    scoreOverallKo: 'Knockouts',
    scoreVerdictTitle: 'Reading the scorecard',
    scoreVerdict: (g, k) => (
      <>
        In the group stage the single most likely result happened {strong(g.acc)} of the time, against {g.base} for random
        guessing, with a log loss of {strong(g.ll)} versus {g.llBase} for a model that always says “one third each”. In the
        knockouts the favoured team advanced in {strong(k.acc)} of {k.n} ties.
      </>
    ),
    scoreImprove:
      'Each matchday has only 24 matches and the later rounds even fewer, so stage-to-stage differences are mostly noise. Treat the table as an honest audit, not as proof that the model got better or worse as the tournament went on.',
    scoreTrend: ({ stage, ll, base, barely, later }) =>
      `The hardest stage was ${stage}: a log loss of ${ll} ${barely ? 'barely improved on' : 'improved on'} the ${base} baseline.${later ? ' Every later stage with at least 8 matches beat its own baseline by a wider margin.' : ''}`,
    updateTitle: 'Did updating during the tournament help?',
    updateBody: (rows) => (
      <>
        From matchday 2 on, the snapshots update every team’s Elo with the real results. Comparing those odds with the
        frozen pre-tournament odds for the very same matches:{' '}
        {rows.map((r, i) => (
          <span key={r.label}>
            {i > 0 ? '; ' : ''}
            {r.label}: log loss {strong(r.updated)} updated vs {r.frozen} frozen ({r.better ? 'better' : 'not better'})
          </span>
        ))}
        .
      </>
    ),
    updateVerdict: (better, total) =>
      better === total
        ? 'Updating helped in every comparison.'
        : better === 0
          ? 'Updating did not help in any comparison.'
          : 'The evidence is mixed: with 24 matches per matchday the difference is within noise.',
    lowerBetter: 'Lower is better',
    baselineWord: 'baseline',

    surprisesTitle: 'The biggest surprises',
    surprisesSubtitle: 'The results the model thought least likely — measured with its own pre-match odds.',
    surpriseGave: (p) => `Model gave this result ${p}`,
    surpriseAdv: (team, p) => `Model gave ${team} ${p} to advance`,

    navPrev: 'Previous',
    navNext: 'Next',
    navAll: 'All snapshots',
    navStep: (n) => `Snapshot ${n} of 8`,

    panelTitle: 'What the model thought here',
    panelStart: (f, champ, pc, rank) => (
      <>
        Before a ball is kicked, the model’s favourites are{' '}
        {f.map((x, i) => (
          <span key={x.team}>
            {i > 0 ? (i === f.length - 1 ? ' and ' : ', ') : ''}
            {strong(x.team)} ({x.p})
          </span>
        ))}
        . The team that would eventually win, {strong(champ)}, starts with {pc} — ranked #{rank}.
      </>
    ),
    panelStep: ({ stage, isKo, called, n, surprise }) => (
      <>
        New real results since the previous snapshot: {strong(stage)}. The model called {strong(`${called} of ${n}`)}{' '}
        {isKo ? 'ties correctly (the favoured team advanced)' : 'results correctly'}. Biggest surprise: {surprise}.
      </>
    ),
    panelFavorite: (team, p) => `Favourite now: ${team} (${p}).`,
    panelChampion: (team, p, rank) => `${team}, who went on to win, sits at ${p} (#${rank}).`,
    panelUp: 'Title odds rose',
    panelDown: 'Title odds fell',
    panelEnd: (finalLine, pWin, winner) =>
      `Only two matches remain. In hindsight: ${finalLine} — the model had given ${winner} ${pWin} to win it.`,
    panelHindsight: 'Marked “what actually happened” below is hindsight and was not known to the model at this snapshot.',

    explorerTitle: 'Match explorer',
    explorerSubtitle:
      'Pick a stage and a view. Matches already played at this snapshot show the odds the model had before kickoff; matches still to come show this snapshot’s forecast, with the real outcome added afterwards.',
    viewResult: 'Result',
    viewScore: 'Scorelines',
    viewGoals: 'Goals',
    groupTabs: 'Group stage',
    koTabs: 'Knockouts',
    badgePredicted: 'Predicted',
    badgePlayed: 'Played',
    oddsFrom: (n) => `Odds from snapshot ${n}`,
    win: 'Win',
    draw: 'Draw',
    toAdvance: 'To advance',
    ninetyMin: '90-minute result',
    topScorelines: 'Most likely scorelines',
    heatmapTitle: 'Scoreline probabilities',
    heatmapNote: 'Rows: home goals · columns: away goals · cells show % (0–5 goals each)',
    actualCell: 'actual score',
    expGoals: 'Expected goals',
    totalGoals: 'Total goals',
    goalsOf: (team) => `${team} goals`,
    overUnder: 'Over / under 2.5',
    over: 'Over',
    under: 'Under',
    btts: 'Both teams score',
    yes: 'Yes',
    no: 'No',
    actualNow: 'Final score',
    actualLater: 'What actually happened',
    called: '✓ Called',
    missed: '✗ Missed',
    calledAdv: '✓ Favourite advanced',
    missedAdv: '✗ Favourite out',
    gaveResult: (p) => `The model gave this result ${p}.`,
    gaveAdv: (team, p) => `The model gave ${team} ${p} to advance.`,
    gaveScore: (p, rank) => `Exact score: ${p}${rank ? ` (#${rank} most likely)` : ''}.`,
    gaveScoreOff: 'Exact score outside the model’s printed grid (more than 5 goals by a side).',
    mismatchNote: (home, away) => `This projected tie did not happen — the real tie was ${home} vs ${away}.`,
    extraTime: 'after extra time',
    pens: 'pens',
    champDelta: 'vs prev.',
    champWent: 'went on to win',
    advProb: 'Advance',
    modelGave: (p) => `Model: ${p}`,
  },

  pt: {
    stageNames: STAGES_PT,
    stageShort: SHORT_PT,
    momentShort: ['Início', 'Rod. 1', 'Rod. 2', 'Grupos', '32', '16', 'Quartas', 'Semis'],

    endedTitle: 'Como terminou',
    championWord: 'Campeã do mundo',
    runnerUpWord: 'Vice',
    thirdWord: 'Terceiro',
    fourthWord: 'Quarto',
    finalSentence: (home, away, score, suffix) => `${home} ${score} ${away}${suffix} na final.`,
    lastSnapshotSentence: (winner, pw, loser, pl) =>
      `O último instantâneo do modelo, feito antes da final, dava ${pl} para ${loser} e ${pw} para ${winner} levantar a taça.`,

    keyTitle: 'A história em quatro números',
    keyChampionOdds: 'Chance da campeã no apito inicial',
    keyChampionOddsNote: (rank) => `Antes da bola rolar o modelo colocava a futura campeã em #${rank}.`,
    keyGroupCalls: 'Resultados de grupo acertados',
    keyGroupCallsNote: 'Parcela de jogos em que o resultado mais provável aconteceu (chute aleatório: 33%).',
    keyKoCalls: 'Classificados no mata-mata acertados',
    keyKoCallsNote: 'Parcela de confrontos em que o time favorito avançou (cara ou coroa: 50%).',
    keyGoals: 'Gols por jogo de grupo',
    keyGoalsNote: 'Previstos em média vs. realmente marcados — um teste do modelo de gols.',

    trajTitle: 'Como as chances de título mudaram',
    trajSubtitle:
      'Cada linha é a probabilidade de uma seleção ser campeã, reestimada a cada instantâneo, do apito inicial às semifinais. Toque em um instantâneo para comparar as seleções.',
    trajAxis: 'Probabilidade de ser campeã do mundo',
    trajHint: 'Toque em uma coluna para ver aquele instantâneo · toque em uma seleção para ocultar ou mostrar · a linha cai a 0% quando a seleção é eliminada',
    trajWent: 'foi a campeã',

    momentsFavorite: 'Favorita',
    momentsChampion: (team, p, rank) => `${team} (campeã) ${p} · #${rank}`,
    momentsOpen: 'Abrir instantâneo →',

    scoreTitle: 'O modelo foi bom?',
    scoreSubtitle:
      'Cada partida foi avaliada com as probabilidades que o modelo tinha quando ela ainda não tinha sido jogada. Jogos de grupo são julgados pelo resultado em 90 minutos; o mata-mata, por quem avançou.',
    colStage: 'Fase',
    colN: 'Jogos',
    colCalled: 'Acertos',
    colProb: 'Prob. média no que ocorreu',
    colLoss: 'Log loss',
    colGoals: 'Gols / jogo',
    colOu: 'M/M 2.5',
    colExact: 'Placar exato',
    calledGroups: 'o resultado mais provável aconteceu',
    calledKo: 'o favorito avançou',
    scoreNoteKo:
      'As linhas do mata-mata contam quem avançou. As colunas de gols usam só os jogos decididos em 90 minutos, porque placares com prorrogação não são comparáveis com uma previsão de 90 minutos; esse subconjunto tende a resultados decisivos, então leia com cuidado.',
    scoreOverallGroups: 'Fase de grupos',
    scoreOverallKo: 'Mata-mata',
    scoreVerdictTitle: 'Lendo o placar do modelo',
    scoreVerdict: (g, k) => (
      <>
        Na fase de grupos o resultado mais provável aconteceu em {strong(g.acc)} dos jogos, contra {g.base} de um chute
        aleatório, com log loss de {strong(g.ll)} contra {g.llBase} de um modelo que sempre diz “um terço para cada”. No
        mata-mata o favorito avançou em {strong(k.acc)} dos {k.n} confrontos.
      </>
    ),
    scoreImprove:
      'Cada rodada tem só 24 jogos e as fases finais ainda menos, então as diferenças entre fases são em boa parte ruído. Encare a tabela como uma auditoria honesta, não como prova de que o modelo melhorou ou piorou ao longo do torneio.',
    scoreTrend: ({ stage, ll, base, barely, later }) =>
      `A fase mais difícil foi ${stage}: um log loss de ${ll} ${barely ? 'mal melhorou a' : 'melhorou a'} referência de ${base}.${later ? ' Toda fase posterior com pelo menos 8 jogos superou a própria referência por uma margem maior.' : ''}`,
    updateTitle: 'Atualizar durante o torneio ajudou?',
    updateBody: (rows) => (
      <>
        A partir da rodada 2, os instantâneos atualizam o Elo de cada seleção com os resultados reais. Comparando essas
        probabilidades com as do pré-torneio (congeladas) para os mesmos jogos:{' '}
        {rows.map((r, i) => (
          <span key={r.label}>
            {i > 0 ? '; ' : ''}
            {r.label}: log loss {strong(r.updated)} atualizado vs {r.frozen} congelado ({r.better ? 'melhor' : 'não melhor'})
          </span>
        ))}
        .
      </>
    ),
    updateVerdict: (better, total) =>
      better === total
        ? 'Atualizar ajudou em todas as comparações.'
        : better === 0
          ? 'Atualizar não ajudou em nenhuma comparação.'
          : 'A evidência é mista: com 24 jogos por rodada a diferença está dentro do ruído.',
    lowerBetter: 'Menor é melhor',
    baselineWord: 'referência',

    surprisesTitle: 'As maiores surpresas',
    surprisesSubtitle: 'Os resultados que o modelo achava menos prováveis — medidos com as próprias probabilidades pré-jogo.',
    surpriseGave: (p) => `O modelo deu ${p} a este resultado`,
    surpriseAdv: (team, p) => `O modelo deu ${p} para ${team} avançar`,

    navPrev: 'Anterior',
    navNext: 'Próximo',
    navAll: 'Todos os instantâneos',
    navStep: (n) => `Instantâneo ${n} de 8`,

    panelTitle: 'O que o modelo pensava aqui',
    panelStart: (f, champ, pc, rank) => (
      <>
        Antes da bola rolar, as favoritas do modelo são{' '}
        {f.map((x, i) => (
          <span key={x.team}>
            {i > 0 ? (i === f.length - 1 ? ' e ' : ', ') : ''}
            {strong(x.team)} ({x.p})
          </span>
        ))}
        . A seleção que acabaria campeã, {strong(champ)}, começa com {pc} — #{rank} no ranking.
      </>
    ),
    panelStep: ({ stage, isKo, called, n, surprise }) => (
      <>
        Novos resultados reais desde o instantâneo anterior: {strong(stage)}. O modelo acertou {strong(`${called} de ${n}`)}{' '}
        {isKo ? 'confrontos (o favorito avançou)' : 'resultados'}. Maior surpresa: {surprise}.
      </>
    ),
    panelFavorite: (team, p) => `Favorita agora: ${team} (${p}).`,
    panelChampion: (team, p, rank) => `${team}, que seria a campeã, está com ${p} (#${rank}).`,
    panelUp: 'Chance de título subiu',
    panelDown: 'Chance de título caiu',
    panelEnd: (finalLine, pWin, winner) =>
      `Restam só duas partidas. Em retrospecto: ${finalLine} — o modelo tinha dado ${pWin} para ${winner} ganhar.`,
    panelHindsight: 'O que aparece abaixo como “o que realmente aconteceu” é retrospecto e não era conhecido pelo modelo neste instantâneo.',

    explorerTitle: 'Explorador de partidas',
    explorerSubtitle:
      'Escolha uma fase e uma visão. Partidas já jogadas neste instantâneo mostram as probabilidades que o modelo tinha antes do apito; as que ainda virão mostram a previsão deste instantâneo, com o resultado real acrescentado depois.',
    viewResult: 'Resultado',
    viewScore: 'Placares',
    viewGoals: 'Gols',
    groupTabs: 'Fase de grupos',
    koTabs: 'Mata-mata',
    badgePredicted: 'Previsto',
    badgePlayed: 'Jogado',
    oddsFrom: (n) => `Probabilidades do instantâneo ${n}`,
    win: 'Vitória',
    draw: 'Empate',
    toAdvance: 'Para avançar',
    ninetyMin: 'Resultado em 90 minutos',
    topScorelines: 'Placares mais prováveis',
    heatmapTitle: 'Probabilidade de cada placar',
    heatmapNote: 'Linhas: gols do mandante · colunas: gols do visitante · células em % (0–5 gols cada)',
    actualCell: 'placar real',
    expGoals: 'Gols esperados',
    totalGoals: 'Total de gols',
    goalsOf: (team) => `Gols de ${team}`,
    overUnder: 'Mais / menos 2.5',
    over: 'Mais',
    under: 'Menos',
    btts: 'Ambos marcam',
    yes: 'Sim',
    no: 'Não',
    actualNow: 'Placar final',
    actualLater: 'O que realmente aconteceu',
    called: '✓ Acertou',
    missed: '✗ Errou',
    calledAdv: '✓ O favorito avançou',
    missedAdv: '✗ Favorito eliminado',
    gaveResult: (p) => `O modelo deu ${p} a este resultado.`,
    gaveAdv: (team, p) => `O modelo deu ${p} para ${team} avançar.`,
    gaveScore: (p, rank) => `Placar exato: ${p}${rank ? ` (#${rank} mais provável)` : ''}.`,
    gaveScoreOff: 'Placar exato fora da grade exibida (mais de 5 gols de um lado).',
    mismatchNote: (home, away) => `Este confronto projetado não aconteceu — o confronto real foi ${home} x ${away}.`,
    extraTime: 'após prorrogação',
    pens: 'pên.',
    champDelta: 'vs ant.',
    champWent: 'foi a campeã',
    advProb: 'Avança',
    modelGave: (p) => `Modelo: ${p}`,
  },
};
