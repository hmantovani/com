// Typed access to the generated Copa 2026 prediction data.
// Source of truth is produced by scripts/copa2026/generate.py.

import teamsRaw from './teams.json';
import moment1Raw from './moment1.json';

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

export interface Moment1Data {
  moment: number;
  label: string;
  train_cutoff: string;
  train_matches: number;
  n_sims: number;
  predicts: string;
  model: {
    ensemble: { A_weight: number; B_weight: number };
    model_a: string;
    model_b: string;
  };
  matches: MatchPrediction[];
  standings: Record<string, StandingRow[]>;
}

export const teamsData = teamsRaw as TeamsData;
export const moment1 = moment1Raw as Moment1Data;

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
