'use client';

// Line chart of every focus team's title probability across the eight snapshots.
// Tap/hover a snapshot column to read the exact values; tap a team chip to toggle it.

import { useMemo, useState } from 'react';
import Flag from '@/components/copa2026/Flag';
import { useLanguage } from '@/context/LanguageContext';
import type { Story } from '@/data/copa2026';
import { copaCopy, teamName } from '@/data/copa2026/copy';
import { storyCopy } from '@/data/copa2026/storyCopy';
import { ACCENT, CARD, CARD_BORDER, pctPoints, teamColor } from './storyUtils';

const W = 720;
const H = 330;
const M = { l: 40, r: 120, t: 18, b: 40 };

export default function ChampionTrajectory({ story, current }: { story: Story; current?: number }) {
  const { lang } = useLanguage();
  const c = storyCopy[lang];
  const teams = story.focus_teams;
  const iso = useMemo(() => {
    const m: Record<string, string> = {};
    for (const mo of story.moments) for (const f of mo.favorites) m[f.team] = f.iso2;
    m[story.champion] = story.champion_iso;
    m[story.runner_up] = story.runner_up_iso;
    m[story.third] = story.third_iso;
    m[story.fourth] = story.fourth_iso;
    return m;
  }, [story]);

  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<number>(current ?? 8);

  const visible = teams.filter((t) => !hidden.has(t));
  const maxVal = Math.max(10, ...visible.flatMap((t) => story.moments.map((m) => m.p_champion[t] ?? 0)));
  const yMax = Math.ceil(maxVal / 10) * 10;
  const innerW = W - M.l - M.r;
  const innerH = H - M.t - M.b;
  const x = (i: number) => M.l + (innerW * i) / (story.moments.length - 1);
  const y = (v: number) => M.t + innerH - (v / yMax) * innerH;

  // end labels, nudged apart so they never overlap
  const endLabels: Array<{ t: string; y: number }> = [];
  {
    const rows = visible
      .map((t) => ({ t, v: story.moments[7].p_champion[t] ?? 0 }))
      .sort((a, b) => b.v - a.v);
    let lastY = -Infinity;
    for (const r of rows) {
      const yy = Math.max(y(r.v), lastY + 14);
      endLabels.push({ t: r.t, y: yy });
      lastY = yy;
    }
  }

  const toggle = (t: string) =>
    setHidden((prev) => {
      const n = new Set(prev);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });

  const selRow = story.moments[sel - 1];
  const selTeams = [...visible].sort((a, b) => (selRow.p_champion[b] ?? 0) - (selRow.p_champion[a] ?? 0));
  const ticks = Array.from({ length: yMax / 10 + 1 }, (_, i) => i * 10);

  return (
    <div className="rounded-[3px] border p-4 sm:p-5" style={{ background: CARD, borderColor: CARD_BORDER }}>
      <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[620px]" role="img" aria-label={c.trajAxis}>
        {ticks.map((tk) => (
          <g key={tk}>
            <line x1={M.l} x2={W - M.r} y1={y(tk)} y2={y(tk)} stroke="var(--line)" strokeWidth={1} />
            <text x={M.l - 8} y={y(tk) + 3} textAnchor="end" fontSize={10} fill="var(--ink-3)" fontFamily="monospace">
              {tk}%
            </text>
          </g>
        ))}

        {/* selected snapshot guide */}
        <line x1={x(sel - 1)} x2={x(sel - 1)} y1={M.t} y2={H - M.b} stroke={ACCENT} strokeOpacity={0.5} strokeDasharray="3 3" />

        {visible.map((t) => {
          const idx = teams.indexOf(t);
          const col = teamColor(t, idx);
          const isChamp = t === story.champion;
          const pts = story.moments.map((m, i) => `${x(i)},${y(m.p_champion[t] ?? 0)}`).join(' ');
          return (
            <g key={t}>
              <polyline points={pts} fill="none" stroke={col} strokeWidth={isChamp ? 3.2 : 1.8} strokeOpacity={isChamp ? 1 : 0.85} strokeLinejoin="round" />
              {story.moments.map((m, i) => (
                <circle key={i} cx={x(i)} cy={y(m.p_champion[t] ?? 0)} r={isChamp ? 3.6 : 2.4} fill={col} />
              ))}
            </g>
          );
        })}

        {endLabels.map((e) => {
          const idx = teams.indexOf(e.t);
          const col = teamColor(e.t, idx);
          const v = story.moments[7].p_champion[e.t] ?? 0;
          return (
            <text key={e.t} x={x(7) + 9} y={e.y + 3} fontSize={10.5} fill={col} fontWeight={e.t === story.champion ? 700 : 500}>
              {teamName(e.t, lang)} {v.toFixed(0)}%{e.t === story.champion ? ' ★' : ''}
            </text>
          );
        })}

        {story.moments.map((m, i) => (
          <g key={m.moment}>
            <text
              x={x(i)}
              y={H - M.b + 16}
              textAnchor="middle"
              fontSize={10}
              fill={sel === m.moment ? 'var(--ink)' : 'var(--ink-3)'}
              fontWeight={sel === m.moment ? 700 : 400}
            >
              {c.momentShort[i]}
            </text>
            <text x={x(i)} y={H - M.b + 29} textAnchor="middle" fontSize={9} fill="var(--ink-4)" fontFamily="monospace">
              #{m.moment}
            </text>
            {/* wide transparent hit area for tap / hover */}
            <rect
              x={x(i) - innerW / (2 * (story.moments.length - 1))}
              y={M.t}
              width={innerW / (story.moments.length - 1)}
              height={innerH + M.b}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setSel(m.moment)}
              onClick={() => setSel(m.moment)}
            />
          </g>
        ))}
      </svg>
      </div>

      <p className="text-[11px] text-ink-3 mt-1 mb-4">{c.trajHint}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {teams.map((t, idx) => {
          const off = hidden.has(t);
          const col = teamColor(t, idx);
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              aria-pressed={!off}
              className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full transition-opacity"
              style={{ border: `1px solid ${off ? CARD_BORDER : col}`, color: off ? 'var(--ink-3)' : 'var(--ink)', opacity: off ? 0.55 : 1, background: 'var(--bg)' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: col, opacity: off ? 0.3 : 1 }} />
              <Flag iso2={iso[t] ?? ''} size={11} title={t} />
              {teamName(t, lang)}
              {t === story.champion && <span title={c.trajWent}>★</span>}
            </button>
          );
        })}
      </div>

      <div className="rounded-[3px] p-3" style={{ background: 'var(--bg)' }}>
        <div className="text-[10px] uppercase tracking-widest text-ink-3 mb-2">
          #{selRow.moment} · {copaCopy[lang].moments[selRow.moment - 1].label}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
          {selTeams.map((t) => (
            <div key={t} className="flex items-center justify-between text-xs gap-2">
              <span className="truncate text-ink-2">
                {teamName(t, lang)}
                {t === story.champion ? ' ★' : ''}
              </span>
              <span className="font-mono tabular-nums text-ink">{pctPoints(selRow.p_champion[t] ?? 0)}</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-ink-3 mt-2">★ {c.trajWent}</div>
      </div>
    </div>
  );
}
