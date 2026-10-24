// Typed access to the generated Copa 2026 prediction data.
// Source of truth is produced by scripts/copa2026/generate.py.

import teamsRaw from './teams.json';
import moment1Raw from './moment1.json';
import moment2Raw from './moment2.json';
import moment3Raw from './moment3.json';
import moment4Raw from './moment4.json';
import moment5Raw from './moment5.json';
import moment6Raw from './moment6.json';
import moment7Raw from './moment7.json';
import moment8Raw from './moment8.json';
import storyRaw from './story.json';

export interface Team {
  team: string;
  iso2: string;
  group: string;
  confederation: string;
  pot: number;
  elo: number;
  attack: number;
  defense: number;
  elo_rank: number;
}

export interface TeamsData {
  generated_from_train_cutoff: string;
  teams: Team[];
  groups: Record<string, string[]>;
}

export interface Scoreline {
  score: string;
  prob: number;
}

/** Scoreline probabilities for 0..5 goals per side. grid[h][a] = P(home h, away a). */
export type ScoreGrid = number[][];

/** Model prediction for one match (group or knockout). */
export interface MatchPred {
  home_elo: number;
  away_elo: number;
  p_home: number;
  p_draw: number;
  p_away: number;
  /** Knockout only: P(home advances), draws split 50/50 as in the simulation. */
  p_adv_home?: number;
  top_scores: Scoreline[];
  over25: number;
  btts_yes: number;
  exp_home_goals: number;
  exp_away_goals: number;
  grid: ScoreGrid;
}

export interface MatchPrediction {
  round: number;
  group: string;
  date: string;
  home: string;
  away: string;
  home_iso: string;
  away_iso: string;
  home_elo: number;
  away_elo: number;
  p_home: number;
  p_draw: number;
  p_away: number;
  top_scores: Scoreline[];
  over25: number;
  under25: number;
  btts_yes: number;
  btts_no: number;
  exp_home_goals: number;
  exp_away_goals: number;
  grid: ScoreGrid;
  actual_home?: number;
  actual_away?: number;
}

export interface StandingRow {
  team: string;
  iso2: string;
  confederation: string;
  elo: number;
  exp_pts: number;
  exp_gd: number;
  exp_gf: number;
  p_win_group: number;
  p_top2: number;
  p_qualify: number;
  p_finish: number[];
  proj_pos: number;
}

export interface KoProbs {
  p_ro32: number;
  p_ro16: number;
  p_qf: number;
  p_sf: number;
  p_final: number;
  p_champion: number;
}

export interface BracketMatch {
  id: string;
  round: 'R32' | 'R16' | 'QF' | 'SF' | '3rd' | 'F';
  date: string;
  venue: string;
  home: string;
  away: string;
  home_iso: string;
  away_iso: string;
  winner: string;
  winner_iso: string;
  status: 'actual' | 'projected';
  home_score?: number;
  away_score?: number;
  duration?: string;
  home_pens?: number | null;
  away_pens?: number | null;
  /** Prediction for this tie with the ratings in force at this snapshot. */
  pred: MatchPred & { under25: number; btts_no: number };
}

export interface Bracket {
  r32: BracketMatch[];
  r16: BracketMatch[];
  qf: BracketMatch[];
  sf: BracketMatch[];
  third_place: BracketMatch[];
  final: BracketMatch[];
}

export interface MomentData {
  moment: number;
  label: string;
  train_cutoff: string;
  train_matches: number;
  n_sims: number;
  predicts: string;
  known_rounds: number[];
  known_ko_rounds: string[];
  model: {
    ensemble: { A_weight: number; B_weight: number };
    model_a: string;
    model_b: string;
  };
  matches: MatchPrediction[];
  standings: Record<string, StandingRow[]>;
  ko_probs: Record<string, KoProbs>;
  bracket: Bracket;
}

// backwards compat alias
export type Moment1Data = MomentData;

export const teamsData = teamsRaw as TeamsData;
export const moment1 = moment1Raw as MomentData;
export const moment2 = moment2Raw as MomentData;
export const moment3 = moment3Raw as MomentData;
export const moment4 = moment4Raw as MomentData;
export const moment5 = moment5Raw as MomentData;
export const moment6 = moment6Raw as MomentData;
export const moment7 = moment7Raw as MomentData;
export const moment8 = moment8Raw as MomentData;

export const story = storyRaw as unknown as Story;

export const ALL_MOMENTS: MomentData[] = [
  moment1, moment2, moment3, moment4, moment5, moment6, moment7, moment8,
];

export const GROUP_LETTERS = Object.keys(teamsData.groups);

// Confederation accent colors (match the site's palette family).
export const CONF_COLOR: Record<string, string> = {
  UEFA: '#4e79a7',
  CONMEBOL: '#f28e2b',
  CONCACAF: '#e15759',
  CAF: '#59a14f',
  AFC: '#b07aa1',
  OFC: '#76b7b2',
};

// ── Story data (scripts/copa2026/story.py) ──────────────────────────────────
// Honest "what did the model think, and was it right?" layer. Odds on a played
// match are those from the last snapshot at which the match was still unplayed.

export type StageKey = 'G1' | 'G2' | 'G3' | 'R32' | 'R16' | 'QF' | 'SF' | '3RD' | 'F';

export interface StoryMatch {
  id: string;
  stage: StageKey;
  group: string | null;
  date: string;
  venue?: string;
  home: string;
  away: string;
  home_iso: string;
  away_iso: string;
  home_score: number;
  away_score: number;
  /** FT, AET (extra time) or AP (penalties). Scores of AET/AP ties include extra time. */
  duration: string;
  home_pens: number | null;
  away_pens: number | null;
  /** Snapshot whose odds are shown for this match. */
  pred_moment: number;
  pred: MatchPred;
  winner: string;
  ninety: boolean;
  // knockout only
  p_winner_adv?: number;
  called_adv?: boolean;
  // decided in 90 minutes only
  result?: 'H' | 'D' | 'A';
  p_result?: number;
  called_result?: boolean;
  top_score_hit?: boolean;
  score_rank?: number | null;
  p_score?: number | null;
  total_goals?: number;
  over_hit?: boolean;
  btts_hit?: boolean;
}

export interface StageScore {
  n: number;
  n_ninety?: number;
  adv_accuracy?: number;
  adv_logloss?: number;
  adv_brier?: number;
  mean_p_winner?: number;
  accuracy?: number;
  logloss?: number;
  brier?: number;
  mean_p_result?: number;
  pred_goals?: number;
  actual_goals?: number;
  top_score_rate?: number;
  mean_p_score?: number;
  over_rate?: number;
  btts_rate?: number;
}

export interface MoverRow {
  team: string;
  iso2: string;
  from: number;
  to: number;
  delta: number;
}

export interface StoryMoment {
  moment: number;
  label: string;
  predicts: string;
  p_champion: Record<string, number>;
  p_final: Record<string, number>;
  favorites: { team: string; iso2: string; p: number }[];
  champion_rank: number;
}

export interface Story {
  champion: string;
  runner_up: string;
  third: string;
  fourth: string;
  champion_iso: string;
  runner_up_iso: string;
  third_iso: string;
  fourth_iso: string;
  final_score: { home: string; away: string; hs: number; as: number; duration: string };
  stages: StageKey[];
  stage_moment: Record<StageKey, number>;
  moments: StoryMoment[];
  focus_teams: string[];
  movers: Record<string, { up: MoverRow[]; down: MoverRow[] }>;
  steps: Record<string, { stage: StageKey; n: number; called: number; biggest_surprise: { id: string; p: number } }>;
  scorecard: {
    stages: Record<StageKey, StageScore>;
    groups: StageScore;
    knockouts: StageScore;
  };
  update_effect: Record<string, { n: number; frozen_logloss: number; updated_logloss: number; frozen_brier: number; updated_brier: number }>;
  surprises: { id: string; p: number }[];
  baselines: { logloss_1x2: number; brier_1x2: number; logloss_adv: number; brier_adv: number };
  matches: StoryMatch[];
}
