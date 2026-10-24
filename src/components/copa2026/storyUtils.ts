// Small shared helpers for the Copa 2026 story components.

import type { MatchPred, ScoreGrid, StoryMatch } from '@/data/copa2026';

export const ACCENT = '#2dd4bf';
export const ACCENT_DIM = 'rgba(13,148,136,0.12)';
export const ACCENT_BORDER = 'rgba(13,148,136,0.3)';
export const PURPLE = '#8b5cf6';
export const GOOD = '#4ade80';
export const BAD = '#f87171';
export const CARD = '#0d0d1f';
export const CARD_BORDER = '#1e1e3f';

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

// Categorical palette for the title-odds chart (distinct on the dark background).
const PALETTE = ['#60a5fa', '#f87171', '#a78bfa', '#e2e8f0', '#facc15', '#fb923c', '#34d399', '#f472b6', '#22d3ee', '#a3e635'];
const FIXED: Record<string, string> = {
  Argentina: '#60a5fa',
  Spain: '#f87171',
  France: '#a78bfa',
  England: '#e2e8f0',
  Brazil: '#facc15',
  Portugal: '#fb923c',
  Germany: '#94a3b8',
  Netherlands: '#f97316',
  Morocco: '#34d399',
  Belgium: '#f472b6',
  Colombia: '#fde047',
  Norway: '#22d3ee',
  Switzerland: '#fca5a5',
  Croatia: '#c084fc',
};

export function teamColor(team: string, index: number): string {
  return FIXED[team] ?? PALETTE[index % PALETTE.length];
}
