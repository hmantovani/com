// 6 x 6 scoreline probability heatmap (0–5 goals per side) with the real score outlined.

import type { ScoreGrid } from '@/data/copa2026';

interface Props {
  grid: ScoreGrid;
  /** Real score to outline, if known. */
  actual?: { home: number; away: number } | null;
  homeLabel: string;
  awayLabel: string;
}

export default function ScoreHeatmap({ grid, actual, homeLabel, awayLabel }: Props) {
  const n = grid.length;
  const max = Math.max(...grid.flat());

  return (
    <div>
      <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-ink-3 mb-1">
        <span className="truncate pr-2">↓ {homeLabel}</span>
        <span className="truncate pl-2 text-right">{awayLabel} →</span>
      </div>
      <div
        role="table"
        aria-label={`${homeLabel} vs ${awayLabel} scoreline probabilities`}
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `14px repeat(${n}, minmax(0, 1fr))` }}
      >
        <div />
        {Array.from({ length: n }, (_, a) => (
          <div key={`h${a}`} className="text-center text-[9px] font-mono text-ink-3">
            {a}
          </div>
        ))}
        {grid.map((row, h) => (
          <div key={`r${h}`} className="contents">
            <div className="text-[9px] font-mono text-ink-3 flex items-center justify-center">{h}</div>
            {row.map((p, a) => {
              const isActual = !!actual && actual.home === h && actual.away === a;
              const alpha = max > 0 ? Math.min(1, p / max) : 0;
              return (
                <div
                  key={`c${h}-${a}`}
                  role="cell"
                  title={`${h}–${a}: ${(p * 100).toFixed(1)}%`}
                  className="rounded-[3px] flex items-center justify-center text-[9px] font-mono tabular-nums"
                  style={{
                    aspectRatio: '1 / 1',
                    background: `color-mix(in srgb, var(--accent) ${Math.round(6 + alpha * 80)}%, transparent)`,
                    color: alpha > 0.55 ? 'var(--accent-ink)' : 'var(--ink-2)',
                    outline: isActual ? '2px solid var(--ink)' : 'none',
                    outlineOffset: isActual ? '-1px' : undefined,
                    fontWeight: isActual ? 800 : 500,
                  }}
                >
                  {p >= 0.005 ? (p * 100).toFixed(p >= 0.095 ? 0 : 1) : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
