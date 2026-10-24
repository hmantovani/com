'use client';

// Stepper across the eight snapshots with previous / next links.

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { storyCopy } from '@/data/copa2026/storyCopy';
import { ACCENT, ACCENT_BORDER, CARD, CARD_BORDER } from './storyUtils';

const BASE = '/projects/2026-world-cup';

export default function MomentTimeline({ current }: { current: number }) {
  const { lang } = useLanguage();
  const c = storyCopy[lang];
  const prev = current > 1 ? current - 1 : null;
  const next = current < 8 ? current + 1 : null;

  const navLink = (n: number | null, label: string, dir: 'prev' | 'next') =>
    n ? (
      <Link
        href={`${BASE}/moment-${n}`}
        className="text-xs font-semibold px-3 py-1.5 rounded-md transition-colors hover:text-[#2dd4bf]"
        style={{ color: '#94a3b8', border: `1px solid ${CARD_BORDER}`, background: CARD }}
      >
        {dir === 'prev' ? `← ${label}` : `${label} →`}
      </Link>
    ) : (
      <span
        className="text-xs font-semibold px-3 py-1.5 rounded-md opacity-30"
        style={{ color: '#94a3b8', border: `1px solid ${CARD_BORDER}`, background: CARD }}
      >
        {dir === 'prev' ? `← ${label}` : `${label} →`}
      </span>
    );

  return (
    <nav aria-label={c.navAll} className="mb-10">
      <div className="flex items-center justify-between gap-3 mb-4">
        {navLink(prev, c.navPrev, 'prev')}
        <span className="text-[11px] uppercase tracking-widest text-[#475569] text-center">{c.navStep(current)}</span>
        {navLink(next, c.navNext, 'next')}
      </div>
      <ol className="flex items-start">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => {
          const active = n === current;
          const past = n < current;
          return (
            <li key={n} className="flex-1 flex flex-col items-center relative min-w-0">
              {n > 1 && (
                <span
                  aria-hidden
                  className="absolute top-3 right-1/2 w-full h-px"
                  style={{ background: n <= current ? ACCENT_BORDER : CARD_BORDER }}
                />
              )}
              <Link
                href={`${BASE}/moment-${n}`}
                aria-current={active ? 'step' : undefined}
                className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-transform hover:scale-110"
                style={{
                  background: active ? ACCENT : past ? 'rgba(13,148,136,0.25)' : CARD,
                  color: active ? '#08080f' : past ? ACCENT : '#64748b',
                  border: `1px solid ${active || past ? ACCENT : CARD_BORDER}`,
                }}
              >
                {n}
              </Link>
              <span
                className="mt-1.5 text-[10px] text-center leading-tight px-0.5 truncate max-w-full"
                style={{ color: active ? '#f1f5f9' : '#475569', fontWeight: active ? 600 : 400 }}
              >
                {c.momentShort[n - 1]}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
