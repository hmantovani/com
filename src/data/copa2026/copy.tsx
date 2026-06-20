// Bilingual UI copy for the Copa 2026 project pages.
// Match data (probabilities, Elo, etc.) stays language-agnostic in the JSON;
// only display strings and country names are localized here.

import type { ReactNode } from 'react';
import type { Lang } from '@/data/content';

export interface CopaCopy {
  back: string;
  backOverview: string;

  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroLead: (matches: string, cutoff: string) => ReactNode;

  howTitle: string;
  howCards: { t: string; d: string }[];

  stagesTitle: string;
  stagesSubtitle: string;
  stageWord: string;
  live: string;
  soon: string;
  moments: { label: string; predicts: string }[];

  nationsTitle: string;
  nationsSubtitle: string;
  topSeed: string;
  groupWord: string;

  homeFootnote: (cutoff: string) => string;

  // moment-1
  stageLabel: string;
  forecastTitle: string;
  forecastLead: (matches: string, cutoff: string, sims: string) => ReactNode;
  matchPredictions: string;
  roundWord: string;
  standingsTitle: string;
  standingsBadge: string;
  standingsSubtitle: (sims: string) => string;
  legendTop2: string;
  legendThird: string;
  statLikely: string;
  statXg: string;
  statOver: string;
  statBtts: string;
  colTeam: string;
  colPts: string;
  colGd: string;
  colQual: string;
  momentFootnote: (a: number, b: number) => string;
}

const HOW_CARDS_EN = [
  {
    t: 'Two models, one ensemble',
    d: 'A Poisson + Elo regression over the full history is blended (40/60) with a Poisson GLM that learns per-team attack & defense strengths from 2010 onward. Recent matches are weighted more heavily.',
  },
  {
    t: 'Goals → everything',
    d: 'Each match becomes a probability grid over scorelines. From that single grid we derive win/draw/loss, over/under 2.5, both-teams-to-score and the most likely results.',
  },
  {
    t: 'Simulated 20,000 times',
    d: 'The full group stage is Monte-Carlo simulated 20,000 times to estimate every team’s chance of winning its group, finishing top two, and qualifying for the knockouts.',
  },
];

const HOW_CARDS_PT = [
  {
    t: 'Dois modelos, um ensemble',
    d: 'Uma regressão Poisson + Elo sobre toda a história é combinada (40/60) com um GLM de Poisson que aprende a força de ataque e defesa de cada seleção a partir de 2010. Partidas recentes têm peso maior.',
  },
  {
    t: 'Gols → tudo',
    d: 'Cada partida vira uma grade de probabilidades de placares. Dessa única grade derivamos vitória/empate/derrota, mais/menos 2.5, ambas marcam e os resultados mais prováveis.',
  },
  {
    t: 'Simulado 20.000 vezes',
    d: 'Toda a fase de grupos é simulada via Monte Carlo 20.000 vezes para estimar a chance de cada seleção vencer seu grupo, terminar entre os dois primeiros e se classificar ao mata-mata.',
  },
];

const MOMENTS_EN = [
  { label: 'Pre-tournament', predicts: 'Full group stage' },
  { label: 'After Round 1', predicts: 'Round 2 → final' },
  { label: 'After Round 2', predicts: 'Round 3 → final' },
  { label: 'After groups', predicts: 'Round of 32 → final' },
  { label: 'After RO32', predicts: 'Round of 16 → final' },
  { label: 'After RO16', predicts: 'Quarter-finals → final' },
  { label: 'After QF', predicts: 'Semi-finals → final' },
  { label: 'After SF', predicts: 'Final + 3rd place' },
];

const MOMENTS_PT = [
  { label: 'Pré-torneio', predicts: 'Fase de grupos completa' },
  { label: 'Após a Rodada 1', predicts: 'Rodada 2 → final' },
  { label: 'Após a Rodada 2', predicts: 'Rodada 3 → final' },
  { label: 'Após os grupos', predicts: 'Oitavas (32) → final' },
  { label: 'Após as oitavas (32)', predicts: 'Oitavas (16) → final' },
  { label: 'Após as oitavas (16)', predicts: 'Quartas de final → final' },
  { label: 'Após as quartas', predicts: 'Semifinais → final' },
  { label: 'Após as semis', predicts: 'Final + 3º lugar' },
];

export const copaCopy: Record<Lang, CopaCopy> = {
  en: {
    back: 'Back to Portfolio',
    backOverview: 'Project overview',
    heroBadge: 'Data Science · Sports Modeling',
    heroTitle: 'FIFA World Cup 2026',
    heroSubtitle: 'Prediction Model',
    heroLead: (matches, cutoff) => (
      <>
        A living statistical model that forecasts the 2026 World Cup one stage at a time. It is trained on{' '}
        <strong className="text-[#f1f5f9]">{matches}</strong> international matches and re-run after every round, so
        each prediction uses everything known up to that moment.
      </>
    ),
    howTitle: 'How it works',
    howCards: HOW_CARDS_EN,
    stagesTitle: 'Prediction stages',
    stagesSubtitle:
      'As real results come in, the training window grows and a new forecast is published for everything that remains. Eight snapshots, from kickoff to the final.',
    stageWord: 'Stage',
    live: 'LIVE',
    soon: 'SOON',
    moments: MOMENTS_EN,
    nationsTitle: 'The 48 nations',
    nationsSubtitle:
      'Twelve groups of four. Each row shows the team’s current Elo rating and its rank among all 48 qualified nations.',
    topSeed: 'Top seed',
    groupWord: 'Group',
    homeFootnote: (cutoff) =>
      `Elo ratings sourced pre-tournament. This is a probabilistic model for analysis and entertainment, not betting advice. Methodology snapshot: trained on data up to ${cutoff}.`,
    stageLabel: 'Stage 1 · Pre-tournament',
    forecastTitle: 'Group Stage Forecast',
    forecastLead: (matches, cutoff, sims) => (
      <>
        Every group-stage match predicted before a ball is kicked, using all{' '}
        <strong className="text-[#f1f5f9]">{matches}</strong> matches up to {cutoff}. Final standings come from{' '}
        <strong className="text-[#f1f5f9]">{sims}</strong> Monte-Carlo simulations of the whole group phase.
      </>
    ),
    matchPredictions: 'Match predictions',
    roundWord: 'Round',
    standingsTitle: 'Projected final standings',
    standingsBadge: 'Projected',
    standingsSubtitle: (sims) => `Expected points and qualification odds across ${sims} simulations.`,
    legendTop2: 'Top 2 — advance directly',
    legendThird: 'Best 8 third-placed — wildcard',
    statLikely: 'Likely',
    statXg: 'xG',
    statOver: 'O 2.5',
    statBtts: 'BTTS',
    colTeam: 'Team',
    colPts: 'Pts',
    colGd: 'GD',
    colQual: 'Qual',
    momentFootnote: (a, b) =>
      `Ensemble: ${a}% Poisson+Elo / ${b}% Poisson GLM. Probabilistic model for analysis, not betting advice.`,
  },

  pt: {
    back: 'Voltar ao Portfólio',
    backOverview: 'Visão geral do projeto',
    heroBadge: 'Ciência de Dados · Modelagem Esportiva',
    heroTitle: 'Copa do Mundo FIFA 2026',
    heroSubtitle: 'Modelo de Previsão',
    heroLead: (matches, cutoff) => (
      <>
        Um modelo estatístico vivo que prevê a Copa do Mundo de 2026 etapa por etapa. É treinado em{' '}
        <strong className="text-[#f1f5f9]">{matches}</strong> partidas internacionais e reexecutado após cada rodada,
        de modo que cada previsão usa tudo o que se sabe até aquele momento.
      </>
    ),
    howTitle: 'Como funciona',
    howCards: HOW_CARDS_PT,
    stagesTitle: 'Etapas de previsão',
    stagesSubtitle:
      'Conforme os resultados reais saem, a janela de treino cresce e uma nova previsão é publicada para tudo o que resta. Oito instantâneos, do apito inicial à final.',
    stageWord: 'Etapa',
    live: 'AO VIVO',
    soon: 'EM BREVE',
    moments: MOMENTS_PT,
    nationsTitle: 'As 48 seleções',
    nationsSubtitle:
      'Doze grupos de quatro. Cada linha mostra o rating Elo atual da seleção e sua posição entre as 48 classificadas.',
    topSeed: 'Cabeça de chave',
    groupWord: 'Grupo',
    homeFootnote: (cutoff) =>
      `Ratings Elo obtidos antes do torneio. Este é um modelo probabilístico para análise e entretenimento, não recomendação de apostas. Instantâneo da metodologia: treinado com dados até ${cutoff}.`,
    stageLabel: 'Etapa 1 · Pré-torneio',
    forecastTitle: 'Previsão da Fase de Grupos',
    forecastLead: (matches, cutoff, sims) => (
      <>
        Cada partida da fase de grupos prevista antes da bola rolar, usando todas as{' '}
        <strong className="text-[#f1f5f9]">{matches}</strong> partidas até {cutoff}. As classificações finais vêm de{' '}
        <strong className="text-[#f1f5f9]">{sims}</strong> simulações de Monte Carlo de toda a fase de grupos.
      </>
    ),
    matchPredictions: 'Previsões das partidas',
    roundWord: 'Rodada',
    standingsTitle: 'Classificação final projetada',
    standingsBadge: 'Projetada',
    standingsSubtitle: (sims) => `Pontos esperados e probabilidade de classificação em ${sims} simulações.`,
    legendTop2: 'Top 2 — avançam direto',
    legendThird: 'Melhores 8 em 3º — repescagem',
    statLikely: 'Provável',
    statXg: 'xG',
    statOver: 'M 2.5',
    statBtts: 'AM',
    colTeam: 'Seleção',
    colPts: 'Pts',
    colGd: 'SG',
    colQual: 'Class',
    momentFootnote: (a, b) =>
      `Ensemble: ${a}% Poisson+Elo / ${b}% GLM de Poisson. Modelo probabilístico para análise, não recomendação de apostas.`,
  },
};

// Portuguese country names. Keys match the English team names in the data JSON.
export const COUNTRY_PT: Record<string, string> = {
  Mexico: 'México',
  'South Africa': 'África do Sul',
  'South Korea': 'Coreia do Sul',
  'Czech Republic': 'República Tcheca',
  Canada: 'Canadá',
  'Bosnia and Herzegovina': 'Bósnia e Herzegovina',
  'United States': 'Estados Unidos',
  Paraguay: 'Paraguai',
  Qatar: 'Catar',
  Switzerland: 'Suíça',
  Brazil: 'Brasil',
  Morocco: 'Marrocos',
  Haiti: 'Haiti',
  Scotland: 'Escócia',
  Australia: 'Austrália',
  Turkey: 'Turquia',
  Germany: 'Alemanha',
  Curaçao: 'Curaçao',
  'Ivory Coast': 'Costa do Marfim',
  Ecuador: 'Equador',
  Netherlands: 'Holanda',
  Japan: 'Japão',
  Sweden: 'Suécia',
  Tunisia: 'Tunísia',
  Belgium: 'Bélgica',
  Egypt: 'Egito',
  Iran: 'Irã',
  'New Zealand': 'Nova Zelândia',
  Spain: 'Espanha',
  'Cape Verde': 'Cabo Verde',
  'Saudi Arabia': 'Arábia Saudita',
  Uruguay: 'Uruguai',
  France: 'França',
  Senegal: 'Senegal',
  Iraq: 'Iraque',
  Norway: 'Noruega',
  Argentina: 'Argentina',
  Algeria: 'Argélia',
  Austria: 'Áustria',
  Jordan: 'Jordânia',
  Portugal: 'Portugal',
  'DR Congo': 'RD Congo',
  Uzbekistan: 'Uzbequistão',
  Colombia: 'Colômbia',
  England: 'Inglaterra',
  Croatia: 'Croácia',
  Ghana: 'Gana',
  Panama: 'Panamá',
};

export function teamName(team: string, lang: Lang): string {
  return lang === 'pt' ? COUNTRY_PT[team] ?? team : team;
}
