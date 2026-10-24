'use client';

import Link from 'next/link';
import Flag from '@/components/copa2026/Flag';
import MatchExplorer from '@/components/copa2026/MatchExplorer';
import MomentTimeline from '@/components/copa2026/MomentTimeline';
import StoryPanel from '@/components/copa2026/StoryPanel';
import OutcomeBar from '@/components/copa2026/OutcomeBar';
import { useLanguage } from '@/context/LanguageContext';
import { story, type MomentData, type StandingRow, type BracketMatch, type Bracket, type StoryMatch } from '@/data/copa2026';
import { copaCopy, teamName, type CopaCopy } from '@/data/copa2026/copy';
import { storyCopy } from '@/data/copa2026/storyCopy';
import type { Lang } from '@/data/content';

const ACCENT = '#2dd4bf';
const ACCENT_DIM = 'rgba(13,148,136,0.12)';
const ACCENT_BORDER = 'rgba(13,148,136,0.3)';
const GREEN = 'rgba(74,222,128,0.13)';
const GREEN_BD = 'rgba(74,222,128,0.45)';
const BLUE = 'rgba(96,165,250,0.13)';
const BLUE_BD = 'rgba(96,165,250,0.45)';

// ── Champion odds table ──────────────────────────────────────────────────────

const KO_COLS: Array<{ key: 'p_ro32' | 'p_ro16' | 'p_qf' | 'p_sf' | 'p_final' | 'p_champion'; hide?: string }> = [
  { key: 'p_ro32',     hide: 'hidden sm:table-cell' },
  { key: 'p_ro16',     hide: 'hidden sm:table-cell' },
  { key: 'p_qf' },
  { key: 'p_sf' },
  { key: 'p_final',    hide: 'hidden sm:table-cell' },
  { key: 'p_champion' },
];

function ChampionTable({ data, c, lang }: { data: MomentData; c: CopaCopy; lang: Lang }) {
  const sc = storyCopy[lang];
  const sorted = Object.entries(data.ko_probs)
    .sort((a, b) => b[1].p_champion - a[1].p_champion);
  const prev = data.moment > 1 ? story.moments[data.moment - 2].p_champion : null;

  const allRows = Object.values(data.standings).flat();

  const cols = KO_COLS.map((col) => ({
    ...col,
    label: col.key === 'p_champion'
      ? '🏆'
      : c.koRound[col.key.replace('p_', '') as keyof typeof c.koRound],
  }));

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-[#475569] border-b" style={{ borderColor: '#1e1e3f' }}>
            <th className="text-left font-medium px-3 py-2 w-6">#</th>
            <th className="text-left font-medium py-2">{c.colTeam}</th>
            {cols.map((col) => (
              <th key={col.key} className={`text-right font-medium px-3 py-2 ${col.hide ?? ''}`}>
                {col.label}
              </th>
            ))}
            {prev && <th className="text-right font-medium px-3 py-2">Δ 🏆 {sc.champDelta}</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map(([team, kp], i) => {
            const iso2 = allRows.find((r) => r.team === team)?.iso2 ?? '';
            const champ = kp.p_champion;
            return (
              <tr
                key={team}
                className="border-b last:border-0"
                style={{ borderColor: '#1a1a33', background: champ >= 5 ? 'rgba(13,148,136,0.04)' : 'transparent' }}
              >
                <td className="px-3 py-2 font-mono text-xs text-[#475569]">{i + 1}</td>
                <td className="py-2 pr-2">
                  <div className="flex items-center gap-2">
                    <Flag iso2={iso2} size={16} title={team} />
                    <span className="text-[#f1f5f9] text-xs truncate">{teamName(team, lang)}</span>
                    {team === story.champion && (
                      <span className="text-[10px]" title={sc.champWent} aria-label={sc.champWent} style={{ color: ACCENT }}>
                        ★
                      </span>
                    )}
                  </div>
                </td>
                {cols.map((col) => {
                  const val = kp[col.key];
                  const isChamp = col.key === 'p_champion';
                  return (
                    <td
                      key={col.key}
                      className={`px-3 py-2 text-right font-mono text-xs ${col.hide ?? ''}`}
                      style={{ color: isChamp ? (val >= 5 ? ACCENT : '#94a3b8') : '#94a3b8', fontWeight: isChamp ? 700 : 400 }}
                    >
                      {val.toFixed(1)}%
                    </td>
                  );
                })}
                {prev && (
                  <td
                    className="px-3 py-2 text-right font-mono text-xs"
                    style={{ color: kp.p_champion - (prev[team] ?? 0) >= 0.05 ? '#4ade80' : kp.p_champion - (prev[team] ?? 0) <= -0.05 ? '#f87171' : '#475569' }}
                  >
                    {kp.p_champion - (prev[team] ?? 0) > 0 ? '+' : ''}
                    {(kp.p_champion - (prev[team] ?? 0)).toFixed(1)}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Full bracket (actual results + single most-likely path onward) ──────────

const BRACKET_ROUNDS: Array<{ key: keyof Bracket; labelKey: keyof CopaCopy['koRound'] }> = [
  { key: 'r32',         labelKey: 'ro32' },
  { key: 'r16',         labelKey: 'ro16' },
  { key: 'qf',          labelKey: 'qf' },
  { key: 'sf',          labelKey: 'sf' },
  { key: 'third_place', labelKey: 'third' },
  { key: 'final',       labelKey: 'final' },
];

function BracketTeamRow({
  team,
  iso2,
  isWinner,
  score,
  lang,
}: {
  team: string;
  iso2: string;
  isWinner: boolean;
  score?: number;
  lang: Lang;
}) {
  return (
    <div className="flex items-center gap-2">
      <Flag iso2={iso2} size={18} title={team} />
      <span className={`text-sm flex-1 truncate ${isWinner ? 'font-bold text-[#f1f5f9]' : 'text-[#94a3b8]'}`}>
        {teamName(team, lang)}
      </span>
      {score !== undefined && (
        <span className="text-xs font-mono tabular-nums" style={{ color: isWinner ? ACCENT : '#64748b' }}>
          {score}
        </span>
      )}
    </div>
  );
}

function BracketMatchCard({ m, c, lang }: { m: BracketMatch; c: CopaCopy; lang: Lang }) {
  const isActual = m.status === 'actual';
  const sc = storyCopy[lang];
  const real: StoryMatch | undefined = story.matches.find((x) => x.id === m.id);
  const samePair = !!real && real.home === m.home && real.away === m.away;
  // odds to show: the pre-match forecast of the real tie if it was already played here, else this snapshot's
  const advHome = isActual && real ? real.pred.p_adv_home ?? m.pred.p_adv_home : m.pred.p_adv_home;
  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: '#0d0d1f', borderColor: isActual ? ACCENT_BORDER : '#1e1e3f' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-[#475569]">{m.date.slice(5)} · {m.venue}</span>
        <span
          className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full shrink-0"
          style={{
            background: isActual ? ACCENT_DIM : 'rgba(148,163,184,0.08)',
            color: isActual ? ACCENT : '#64748b',
            border: `1px solid ${isActual ? ACCENT_BORDER : 'rgba(148,163,184,0.2)'}`,
          }}
        >
          {isActual ? c.bracketActual : c.bracketProjected}
        </span>
      </div>
      <div className="space-y-1.5">
        <BracketTeamRow
          team={m.home}
          iso2={m.home_iso}
          isWinner={m.winner === m.home}
          score={isActual ? m.home_score : undefined}
          lang={lang}
        />
        <BracketTeamRow
          team={m.away}
          iso2={m.away_iso}
          isWinner={m.winner === m.away}
          score={isActual ? m.away_score : undefined}
          lang={lang}
        />
      </div>
      {isActual && m.duration === 'AP' && (
        <div className="text-[10px] text-[#475569] mt-2">
          {c.bracketPens} {m.home_pens}–{m.away_pens}
        </div>
      )}
      {advHome !== undefined && (
        <div className="mt-3">
          <div className="text-[9px] uppercase tracking-wider text-[#475569] mb-1">{sc.advProb}</div>
          <OutcomeBar
            pHome={advHome}
            pDraw={0}
            pAway={1 - advHome}
            homeLabel={teamName(m.home, lang)}
            awayLabel={teamName(m.away, lang)}
            twoWay
          />
        </div>
      )}
      {!isActual && real && (
        <div className="mt-3 text-[11px] leading-relaxed rounded-md p-2" style={{ background: '#0a0a16', border: '1px dashed #2a2a55', color: '#94a3b8' }}>
          {samePair ? (
            <>
              <span className="text-[#f1f5f9] font-semibold">{sc.actualLater}: </span>
              {real.home_score}–{real.away_score}
              {real.duration === 'AET' ? ` (${sc.extraTime})` : real.duration === 'AP' ? ` (${real.home_pens}–${real.away_pens} ${sc.pens})` : ''}
              {' · '}
              {real.winner === m.winner ? sc.calledAdv : sc.missedAdv}
            </>
          ) : (
            sc.mismatchNote(teamName(real.home, lang), teamName(real.away, lang))
          )}
        </div>
      )}
    </div>
  );
}

// ── Standings table ───────────────────────────────────────────────────────────

function StandingsTable({
  group,
  rows,
  thirdQualifies,
  isFinal,
  c,
  lang,
}: {
  group: string;
  rows: StandingRow[];
  thirdQualifies: Set<string>;
  isFinal: boolean;
  c: CopaCopy;
  lang: Lang;
}) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}>
      <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: '#1e1e3f' }}>
        <h3 className="text-sm font-bold text-[#f1f5f9] tracking-wide">
          {c.groupWord} {group}
        </h3>
        <span className="text-[10px] text-[#475569] uppercase tracking-widest">
          {isFinal ? c.standingsBadgeFinal : c.standingsBadge}
        </span>
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
                  {r.exp_gd > 0 ? '+' : ''}{r.exp_gd.toFixed(1)}
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

// ── Main page component ───────────────────────────────────────────────────────

export default function MomentPage({ data }: { data: MomentData }) {
  const { lang } = useLanguage();
  const c = copaCopy[lang];
  const sc = storyCopy[lang];

  const isFinalStandings = data.known_rounds.length === 3;

  const thirds = Object.values(data.standings)
    .map((rows) => rows.find((r) => r.proj_pos === 3)!)
    .sort((a, b) => b.p_qualify - a.p_qualify);
  const thirdQualifies = new Set(thirds.slice(0, 8).map((r) => r.team));

  const groupLetters = Object.keys(data.standings);
  const stageLabel = `${c.stageWord} ${data.moment} · ${c.moments[data.moment - 1].label}`;

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

        <MomentTimeline current={data.moment} />

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: ACCENT_DIM, color: ACCENT, border: `1px solid ${ACCENT_BORDER}` }}
            >
              {stageLabel}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] leading-tight mb-4">
            {c.stageTitles[data.moment - 1]}
          </h1>
          <p className="text-[#94a3b8] leading-relaxed max-w-2xl">
            {c.stageLeads[data.moment - 1](data.n_sims.toLocaleString())}
          </p>
        </header>

        <StoryPanel data={data} story={story} />

        {/* ── Match explorer ─────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-4 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {sc.explorerTitle}
          </h2>
          <MatchExplorer data={data} story={story} />
        </section>

        {/* ── Final standings ───────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-2 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {c.standingsTitle}
          </h2>
          <p className="text-sm text-[#94a3b8] mb-4 max-w-2xl">
            {c.standingsSubtitle(data.n_sims.toLocaleString())}
          </p>

          <div className="flex flex-wrap gap-4 mb-6 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-4 h-3 rounded-sm inline-block" style={{ background: GREEN, border: `1px solid ${GREEN_BD}` }} />
              <span className="text-[#94a3b8]">{c.legendTop2}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-3 rounded-sm inline-block" style={{ background: BLUE, border: `1px solid ${BLUE_BD}` }} />
              <span className="text-[#94a3b8]">{c.legendThird}</span>
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupLetters.map((g) => (
              <StandingsTable
                key={g}
                group={g}
                rows={data.standings[g]}
                thirdQualifies={thirdQualifies}
                isFinal={isFinalStandings}
                c={c}
                lang={lang}
              />
            ))}
          </div>
        </section>

        {/* ── Champion odds ─────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-2 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {c.championTitle}
          </h2>
          <p className="text-sm text-[#94a3b8] mb-5 max-w-2xl">
            {c.championSubtitle(data.n_sims.toLocaleString())}
          </p>
          <ChampionTable data={data} c={c} lang={lang} />
        </section>

        {/* ── Bracket ────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-2 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {c.bracketTitle}
          </h2>
          <p className="text-sm text-[#94a3b8] mb-6 max-w-2xl">{c.bracketSubtitle}</p>
          <div className="space-y-8">
            {BRACKET_ROUNDS.map(({ key, labelKey }) => (
              <div key={key}>
                <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-3">
                  {c.koRound[labelKey]}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {data.bracket[key].map((m) => (
                    <BracketMatchCard key={m.id} m={m} c={c} lang={lang} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14">
          <MomentTimeline current={data.moment} />
        </div>

        <p className="text-xs text-[#475569] mt-4 leading-relaxed">
          {c.momentFootnote(
            Math.round(data.model.ensemble.A_weight * 100),
            Math.round(data.model.ensemble.B_weight * 100)
          )}
        </p>
      </div>
    </div>
  );
}
