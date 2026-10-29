'use client';

import Link from 'next/link';
import { story } from '@/data/copa2026';

const W = 420;
const H = 230;
const PAD = { l: 6, r: 70, t: 18, b: 30 };

// Title odds for the eventual champion and runner-up at each snapshot,
// taken straight from the World Cup model's story.json.
export default function HeroFigure({ label, caption, linkText }: { label: string; caption: string; linkText: string }) {
  const teams = [
    { name: story.champion, stroke: 'var(--accent)', width: 2 },
    { name: story.runner_up, stroke: 'var(--ink-3)', width: 1.25 },
  ];
  const n = story.moments.length;
  const max = Math.max(...story.moments.flatMap((m) => teams.map((t) => m.p_champion[t.name] ?? 0)));
  const yMax = Math.ceil(max / 10) * 10 || 10;
  const x = (i: number) => PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => H - PAD.b - (v / yMax) * (H - PAD.t - PAD.b);
  // Whichever line ends higher gets its label above, so the two never collide.
  const endOf = (name: string) => story.moments[n - 1].p_champion[name] ?? 0;
  const higher = endOf(teams[0].name) >= endOf(teams[1].name) ? teams[0].name : teams[1].name;

  return (
    <figure className="w-full">
      <figcaption className="eyebrow mb-4 flex items-center justify-between gap-4">
        <span>{label}</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label={caption}>
        {[0, 0.5, 1].map((f) => (
          <g key={f}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(yMax * f)} y2={y(yMax * f)} stroke="var(--line)" strokeWidth="1" />
            <text x={W - PAD.r + 8} y={y(yMax * f) + 3} fontSize="9" fill="var(--ink-4)" fontFamily="var(--font-geist-mono)">
              {Math.round(yMax * f)}%
            </text>
          </g>
        ))}
        {story.moments.map((m, i) => (
          <text key={m.moment} x={x(i)} y={H - 10} fontSize="9" textAnchor="middle" fill="var(--ink-4)" fontFamily="var(--font-geist-mono)">
            {m.moment}
          </text>
        ))}
        {teams.map((t, ti) => {
          const pts = story.moments.map((m, i) => [x(i), y(m.p_champion[t.name] ?? 0)] as const);
          const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
          const [lx, ly] = pts[pts.length - 1];
          const last = story.moments[n - 1].p_champion[t.name] ?? 0;
          return (
            <g key={t.name}>
              <path
                d={d}
                fill="none"
                stroke={t.stroke}
                strokeWidth={t.width}
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1"
                style={{ ['--len' as string]: 1, animation: `draw 1.8s var(--ease-out-soft) ${500 + ti * 250}ms both` }}
              />
              {pts.map(([px, py], i) => (
                <circle key={i} cx={px} cy={py} r={ti === 0 ? 2.6 : 2} fill="var(--bg)" stroke={t.stroke} strokeWidth="1.25"
                  style={{ animation: `fade 0.4s ease ${700 + ti * 250 + i * 120}ms both` }} />
              ))}
              <text x={lx + 8} y={ly + (t.name === higher ? -4 : 12)} fontSize="11" fill={ti === 0 ? 'var(--ink)' : 'var(--ink-3)'}
                style={{ animation: `fade 0.6s ease ${1900 + ti * 250}ms both` }}>
                {t.name} <tspan fontFamily="var(--font-geist-mono)" fontSize="9" fill="var(--ink-3)">{Math.round(last)}%</tspan>
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-3 max-w-sm">
        {caption}{' '}
        <Link href="/projects/2026-world-cup" className="link-draw text-ink whitespace-nowrap">
          {linkText} →
        </Link>
      </p>
    </figure>
  );
}
