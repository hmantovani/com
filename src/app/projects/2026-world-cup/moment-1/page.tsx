'use client';

import { useState } from 'react';
import Link from 'next/link';
import Flag from '@/components/copa2026/Flag';
import OutcomeBar from '@/components/copa2026/OutcomeBar';
import { useLanguage } from '@/context/LanguageContext';
import { moment1, type MatchPrediction, type StandingRow } from '@/data/copa2026';
import { copaCopy, teamName, type CopaCopy } from '@/data/copa2026/copy';
import type { Lang } from '@/data/content';

const ACCENT = '#2dd4bf';
const ACCENT_DIM = 'rgba(13,148,136,0.12)';
const ACCENT_BORDER = 'rgba(13,148,136,0.3)';

const GREEN = 'rgba(74,222,128,0.13)';
const GREEN_BD = 'rgba(74,222,128,0.45)';
const BLUE = 'rgba(96,165,250,0.13)';
const BLUE_BD = 'rgba(96,165,250,0.45)';

function pctStr(p: number) {
  return `${Math.round(p * 100)}%`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center px-2 py-1.5 rounded-md" style={{ background: '#0a0a16' }}>
      <span className="text-[9px] uppercase tracking-wider text-[#475569]">{label}</span>
      <span className="text-xs font-semibold text-[#f1f5f9] mt-0.5">{value}</span>
    </div>
  );
}

function MatchCard({ m, c, lang }: { m: MatchPrediction; c: CopaCopy; lang: Lang }) {
  const top = m.top_scores[0];
  return (
    <div className="rounded-xl border p-4" style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Flag iso2={m.home_iso} size={22} title={m.home} />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[#f1f5f9] leading-tight">{teamName(m.home, lang)}</div>
            <div className="text-[10px] font-mono text-[#475569]">Elo {m.home_elo}</div>
          </div>
        </div>
        <div className="px-3 text-center shrink-0">
          <div className="text-[10px] text-[#475569] font-mono">{m.date.slice(5)}</div>
          <div className="text-xs font-bold text-[#94a3b8]">vs</div>
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <div className="text-sm font-semibold text-[#f1f5f9] leading-tight">{teamName(m.away, lang)}</div>
            <div className="text-[10px] font-mono text-[#475569]">Elo {m.away_elo}</div>
          </div>
          <Flag iso2={m.away_iso} size={22} title={m.away} />
        </div>
      </div>

      <OutcomeBar pHome={m.p_home} pDraw={m.p_draw} pAway={m.p_away} />

      <div className="grid grid-cols-4 gap-1.5 mt-3">
        <Stat label={c.statLikely} value={top.score} />
        <Stat label={c.statXg} value={`${m.exp_home_goals}–${m.exp_away_goals}`} />
        <Stat label={c.statOver} value={pctStr(m.over25)} />
        <Stat label={c.statBtts} value={pctStr(m.btts_yes)} />
      </div>
    </div>
  );
}

function StandingsTable({
  group,
  rows,
  thirdQualifies,
  c,
  lang,
}: {
  group: string;
  rows: StandingRow[];
  thirdQualifies: Set<string>;
  c: CopaCopy;
  lang: Lang;
}) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}>
      <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: '#1e1e3f' }}>
        <h3 className="text-sm font-bold text-[#f1f5f9] tracking-wide">
          {c.groupWord} {group}
        </h3>
        <span className="text-[10px] text-[#475569] uppercase tracking-widest">{c.standingsBadge}</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-[#475569]">
            <th className="text-left font-medium px-3 py-2 w-6">#</th>
            <th className="text-left font-medium py-2">{c.colTeam}</th>
            <th className="text-right font-medium px-1.5 py-2">{c.colPts}</th>
            <th className="text-right font-medium px-1.5 py-2 hidden sm:table-cell">{c.colGd}</th>
            <th className="text-right font-medium px-3 py-2">{c.colQual}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const top2 = r.proj_pos <= 2;
            const third = r.proj_pos === 3 && thirdQualifies.has(r.team);
            const bg = top2 ? GREEN : third ? BLUE : 'transparent';
            const bd = top2 ? GREEN_BD : third ? BLUE_BD : 'transparent';
            return (
              <tr key={r.team} style={{ background: bg, borderLeft: `3px solid ${bd}` }}>
                <td className="px-3 py-2 font-mono text-xs text-[#94a3b8]">{r.proj_pos}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <Flag iso2={r.iso2} size={16} title={r.team} />
                    <span className="text-[#f1f5f9] truncate">{teamName(r.team, lang)}</span>
                  </div>
                </td>
                <td className="px-1.5 py-2 text-right font-mono text-[#94a3b8]">{r.exp_pts.toFixed(1)}</td>
                <td className="px-1.5 py-2 text-right font-mono text-[#94a3b8] hidden sm:table-cell">
                  {r.exp_gd > 0 ? '+' : ''}
                  {r.exp_gd.toFixed(1)}
                </td>
                <td className="px-3 py-2 text-right font-mono font-semibold text-[#f1f5f9]">{r.p_qualify}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Moment1Page() {
  const { lang } = useLanguage();
  const c = copaCopy[lang];
  const [round, setRound] = useState(1);
  const matches = moment1.matches.filter((m) => m.round === round);

  const thirds = Object.values(moment1.standings)
    .map((rows) => rows.find((r) => r.proj_pos === 3)!)
    .sort((a, b) => b.p_qualify - a.p_qualify);
  const thirdQualifies = new Set(thirds.slice(0, 8).map((r) => r.team));

  const groupLetters = Object.keys(moment1.standings);

  return (
    <div className="min-h-screen">
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <Link
          href="/projects/2026-world-cup"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#94a3b8] transition-colors mb-8 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          {c.backOverview}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: ACCENT_DIM, color: ACCENT, border: `1px solid ${ACCENT_BORDER}` }}
            >
              {c.stageLabel}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] leading-tight mb-4">{c.forecastTitle}</h1>
          <p className="text-[#94a3b8] leading-relaxed max-w-2xl">
            {c.forecastLead(
              moment1.train_matches.toLocaleString(),
              moment1.train_cutoff,
              moment1.n_sims.toLocaleString()
            )}
          </p>
        </header>

        {/* ── Match predictions ─────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-4 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {c.matchPredictions}
          </h2>

          <div
            className="inline-flex rounded-lg p-1 mb-6 gap-1"
            style={{ background: '#0d0d1f', border: '1px solid #1e1e3f' }}
          >
            {[1, 2, 3].map((r) => (
              <button
                key={r}
                onClick={() => setRound(r)}
                className="px-4 py-1.5 rounded-md text-sm font-semibold transition-all"
                style={{
                  background: round === r ? ACCENT : 'transparent',
                  color: round === r ? '#08080f' : '#94a3b8',
                }}
              >
                {c.roundWord} {r}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {matches.map((m) => (
              <MatchCard key={`${m.home}-${m.away}`} m={m} c={c} lang={lang} />
            ))}
          </div>
        </section>

        {/* ── Final standings ───────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-2 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {c.standingsTitle}
          </h2>
          <p className="text-sm text-[#94a3b8] mb-4 max-w-2xl">
            {c.standingsSubtitle(moment1.n_sims.toLocaleString())}
          </p>

          <div className="flex flex-wrap gap-4 mb-6 text-xs">
            <span className="flex items-center gap-2">
              <span
                className="w-4 h-3 rounded-sm inline-block"
                style={{ background: GREEN, border: `1px solid ${GREEN_BD}` }}
              />
              <span className="text-[#94a3b8]">{c.legendTop2}</span>
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-4 h-3 rounded-sm inline-block"
                style={{ background: BLUE, border: `1px solid ${BLUE_BD}` }}
              />
              <span className="text-[#94a3b8]">{c.legendThird}</span>
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupLetters.map((g) => (
              <StandingsTable
                key={g}
                group={g}
                rows={moment1.standings[g]}
                thirdQualifies={thirdQualifies}
                c={c}
                lang={lang}
              />
            ))}
          </div>
        </section>

        <p className="text-xs text-[#475569] mt-12 leading-relaxed">
          {c.momentFootnote(
            Math.round(moment1.model.ensemble.A_weight * 100),
            Math.round(moment1.model.ensemble.B_weight * 100)
          )}
        </p>
      </div>
    </div>
  );
}
