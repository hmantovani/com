// Small shared helpers for the Copa 2026 story components.

import type { MatchPred, ScoreGrid, StoryMatch } from '@/data/copa2026';

export const ACCENT = 'var(--accent)';
export const ACCENT_DIM = 'color-mix(in srgb, var(--accent) 12%, transparent)';
export const ACCENT_BORDER = 'color-mix(in srgb, var(--accent) 30%, transparent)';
export const PURPLE = 'var(--accent)';
export const GOOD = 'var(--pos)';
export const BAD = 'var(--neg)';
export const CARD = 'var(--surface)';
export const CARD_BORDER = 'var(--line)';

/** 0.7722 -> "77%" (or "77.2%" with decimals) */
export function pct(p: number, decimals = 0): string {
  return `${(p * 100).toFixed(decimals)}%`;
}

/** 15.8 (already a percentage) -> "15.8%" */
export function pctPoints(p: number, decimals = 1): string {
  return `${p.toFixed(decimals)}%`;
}

/** Distribution of total goals: 0,1,2,3,4,5 and "6+" (the remainder of the probability mass). */
export function totalGoalsDist(grid: ScoreGrid): number[] {
  const out = [0, 0, 0, 0, 0, 0];
  for (let h = 0; h < grid.length; h++) {
    for (let a = 0; a < grid[h].length; a++) {
      const t = h + a;
      if (t <= 5) out[t] += grid[h][a];
    }
  }
  const covered = out.reduce((s, v) => s + v, 0);
  return [...out, Math.max(0, 1 - covered)];
}

/** Distribution of one side's goals: 0,1,2,3 and "4+" (everything else). */
export function sideGoalsDist(grid: ScoreGrid, side: 'home' | 'away'): number[] {
  const marg = new Array(grid.length).fill(0);
  for (let h = 0; h < grid.length; h++) {
    for (let a = 0; a < grid[h].length; a++) {
      marg[side === 'home' ? h : a] += grid[h][a];
    }
  }
  const head = marg.slice(0, 4);
  const covered = head.reduce((s, v) => s + v, 0);
  return [...head, Math.max(0, 1 - covered)];
}

/** Probability the model gave to the most likely single result. */
export function pickedResult(p: Pick<MatchPred, 'p_home' | 'p_draw' | 'p_away'>): 'H' | 'D' | 'A' {
  if (p.p_home >= p.p_draw && p.p_home >= p.p_away) return 'H';
  return p.p_away >= p.p_draw ? 'A' : 'D';
}

/** "Spain 1–0 Argentina" style scoreline with extra-time / penalty suffix. */
export function scoreText(m: StoryMatch): string {
  const base = `${m.home_score}–${m.away_score}`;
  if (m.duration === 'AP' && m.home_pens !== null && m.away_pens !== null) {
    return `${base} (${m.home_pens}–${m.away_pens} pens)`;
  }
  if (m.duration === 'AET') return `${base} (a.e.t.)`;
  return base;
}

// Categorical palette for the title-odds chart: mid-tone hues that hold
// contrast on both the light paper and the dark graphite backgrounds.
const PALETTE = ['#4e79a7', '#e15759', '#f28e2b', '#59a14f', '#b07aa1', '#76b7b2', '#9c755f', '#d37295', '#8cd17d', '#bab0ac'];
const FIXED: Record<string, string> = {
  Argentina: '#5b9bd5',
  Spain: '#e15759',
  France: '#4e79a7',
  England: '#9c755f',
  Brazil: '#d4a017',
  Portugal: '#f28e2b',
  Germany: '#8a8a8a',
  Netherlands: '#e8833a',
  Morocco: '#59a14f',
  Belgium: '#d37295',
  Colombia: '#c9b037',
  Norway: '#76b7b2',
  Switzerland: '#b6403f',
  Croatia: '#b07aa1',
};

export function teamColor(team: string, index: number): string {
  return FIXED[team] ?? PALETTE[index % PALETTE.length];
}
