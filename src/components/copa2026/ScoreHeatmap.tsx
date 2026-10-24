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
      <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-[#475569] mb-1">
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
          <div key={`h${a}`} className="text-center text-[9px] font-mono text-[#475569]">
            {a}
          </div>
        ))}
        {grid.map((row, h) => (
          <div key={`r${h}`} className="contents">
            <div className="text-[9px] font-mono text-[#475569] flex items-center justify-center">{h}</div>
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
                    background: `rgba(45,212,191,${(0.06 + alpha * 0.8).toFixed(3)})`,
                    color: alpha > 0.55 ? '#08080f' : '#94a3b8',
                    outline: isActual ? '2px solid #f1f5f9' : 'none',
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
