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
  round: 'R32' | 'R16' | 'QF' | 'SF' | 'F';
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
}

export interface Bracket {
  r32: BracketMatch[];
  r16: BracketMatch[];
  qf: BracketMatch[];
  sf: BracketMatch[];
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

export const ALL_MOMENTS: MomentData[] = [moment1, moment2, moment3, moment4, moment5, moment6, moment7];

export const GROUP_LETTERS = Object.keys(teamsData.groups);

// Confederation accent colors (match the site's palette family).
export const CONF_COLOR: Record<string, string> = {
  UEFA: '#4e79a7',
  CONMEBOL: '#f28e2b',
  CONCACAF: '#e15759',
  CAF: '#59a14f',
  AFC: '#8b5cf6',
  OFC: '#2dd4bf',
};
