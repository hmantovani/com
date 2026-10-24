'use client';

// The results the model thought least likely, judged with its own pre-match odds.

import Link from 'next/link';
import Flag from '@/components/copa2026/Flag';
import { useLanguage } from '@/context/LanguageContext';
import type { Story } from '@/data/copa2026';
import { teamName } from '@/data/copa2026/copy';
import { storyCopy } from '@/data/copa2026/storyCopy';
import { ACCENT, BAD, CARD, CARD_BORDER, pct, scoreText } from './storyUtils';

export default function Surprises({ story, limit = 6 }: { story: Story; limit?: number }) {
  const { lang } = useLanguage();
  const c = storyCopy[lang];
  const byId = new Map(story.matches.map((m) => [m.id, m]));

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {story.surprises.slice(0, limit).map((s, i) => {
        const m = byId.get(s.id);
        if (!m) return null;
        return (
          <Link
            key={s.id}
            href={`/projects/2026-world-cup/moment-${m.pred_moment}`}
            className="rounded-xl border p-4 block card-transition"
            style={{ background: CARD, borderColor: CARD_BORDER }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#475569]">
                #{i + 1} · {c.stageNames[m.stage]} · {m.date.slice(5)}
              </span>
              <span className="text-[10px] font-semibold" style={{ color: BAD }}>
                {pct(s.p, 1)}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Flag iso2={m.home_iso} size={18} title={m.home} />
              <span className="text-sm text-[#f1f5f9] truncate">{teamName(m.home, lang)}</span>
              <span className="text-sm font-bold tabular-nums mx-1" style={{ color: ACCENT }}>
                {scoreText(m)}
              </span>
              <span className="text-sm text-[#f1f5f9] truncate">{teamName(m.away, lang)}</span>
              <Flag iso2={m.away_iso} size={18} title={m.away} />
            </div>
            <p className="text-[11px] text-[#94a3b8]">
              {m.stage.startsWith('G') ? c.surpriseGave(pct(s.p, 1)) : c.surpriseAdv(teamName(m.winner, lang), pct(s.p, 1))}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
