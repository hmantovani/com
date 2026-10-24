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

const ACCENT = 'var(--accent)';
const ACCENT_DIM = 'color-mix(in srgb, var(--accent) 12%, transparent)';
const ACCENT_BORDER = 'color-mix(in srgb, var(--accent) 30%, transparent)';
const GREEN = 'color-mix(in srgb, var(--pos) 13%, transparent)';
const GREEN_BD = 'color-mix(in srgb, var(--pos) 45%, transparent)';
const BLUE = 'color-mix(in srgb, var(--info) 13%, transparent)';
const BLUE_BD = 'color-mix(in srgb, var(--info) 45%, transparent)';

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
    <div className="rounded-[3px] border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-ink-3 border-b" style={{ borderColor: 'var(--line)' }}>
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
                style={{ borderColor: 'var(--line)', background: champ >= 5 ? 'color-mix(in srgb, var(--accent) 4%, transparent)' : 'transparent' }}
              >
                <td className="px-3 py-2 font-mono text-xs text-ink-3">{i + 1}</td>
                <td className="py-2 pr-2">
                  <div className="flex items-center gap-2">
                    <Flag iso2={iso2} size={16} title={team} />
                    <span className="text-ink text-xs truncate">{teamName(team, lang)}</span>
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
                      style={{ color: isChamp ? (val >= 5 ? ACCENT : 'var(--ink-2)') : 'var(--ink-2)', fontWeight: isChamp ? 700 : 400 }}
                    >
                      {val.toFixed(1)}%
                    </td>
                  );
                })}
                {prev && (
                  <td
                    className="px-3 py-2 text-right font-mono text-xs"
                    style={{ color: kp.p_champion - (prev[team] ?? 0) >= 0.05 ? 'var(--pos)' : kp.p_champion - (prev[team] ?? 0) <= -0.05 ? 'var(--neg)' : 'var(--ink-3)' }}
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
      <span className={`text-sm flex-1 truncate ${isWinner ? 'font-bold text-ink' : 'text-ink-2'}`}>
        {teamName(team, lang)}
      </span>
      {score !== undefined && (
        <span className="text-xs font-mono tabular-nums" style={{ color: isWinner ? ACCENT : 'var(--ink-3)' }}>
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
      className="rounded-[3px] border p-4"
      style={{ background: 'var(--surface)', borderColor: isActual ? ACCENT_BORDER : 'var(--line)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-ink-3">{m.date.slice(5)} · {m.venue}</span>
        <span
          className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full shrink-0"
          style={{
            background: isActual ? ACCENT_DIM : 'color-mix(in srgb, var(--ink-3) 8%, transparent)',
            color: isActual ? ACCENT : 'var(--ink-3)',
            border: `1px solid ${isActual ? ACCENT_BORDER : 'color-mix(in srgb, var(--ink-3) 20%, transparent)'}`,
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
        <div className="text-[10px] text-ink-3 mt-2">
          {c.bracketPens} {m.home_pens}–{m.away_pens}
        </div>
      )}
      {advHome !== undefined && (
        <div className="mt-3">
          <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1">{sc.advProb}</div>
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
        <div className="mt-3 text-[11px] leading-relaxed rounded-md p-2" style={{ background: 'var(--bg)', border: '1px dashed var(--line-strong)', color: 'var(--ink-2)' }}>
          {samePair ? (
            <>
              <span className="text-ink font-semibold">{sc.actualLater}: </span>
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
    <div className="rounded-[3px] border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}>
      <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: 'var(--line)' }}>
        <h3 className="text-sm font-bold text-ink tracking-wide">
          {c.groupWord} {group}
        </h3>
        <span className="text-[10px] text-ink-3 uppercase tracking-widest">
          {isFinal ? c.standingsBadgeFinal : c.standingsBadge}
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-ink-3">
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
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{r.proj_pos}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <Flag iso2={r.iso2} size={16} title={r.team} />
                    <span className="text-ink truncate">{teamName(r.team, lang)}</span>
                  </div>
                </td>
                <td className="px-1.5 py-2 text-right font-mono text-ink-2">{r.exp_pts.toFixed(1)}</td>
                <td className="px-1.5 py-2 text-right font-mono text-ink-2 hidden sm:table-cell">
                  {r.exp_gd > 0 ? '+' : ''}{r.exp_gd.toFixed(1)}
                </td>
                <td className="px-3 py-2 text-right font-mono font-semibold text-ink">{r.p_qualify}%</td>
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

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-20">
        <Link
          href="/projects/2026-world-cup"
          className="inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink-2 transition-colors mb-8 group"
        >
          <span className="transition-transform duration-500 ease-out-soft group-hover:-translate-x-1">←</span>
          {c.backOverview}
        </Link>

        <MomentTimeline current={data.moment} />

        {/* Header */}
        <header className="mb-12">
          <p className="eyebrow mb-5">{stageLabel}</p>
          <h1 className="display text-[clamp(2.2rem,1.4rem+3.2vw,4rem)] text-ink mb-6">
            {c.stageTitles[data.moment - 1]}
          </h1>
          <p className="text-ink-2 leading-relaxed text-[1.05rem] max-w-[60ch]">
            {c.stageLeads[data.moment - 1](data.n_sims.toLocaleString())}
          </p>
        </header>

        <StoryPanel data={data} story={story} />

        {/* ── Match explorer ─────────────────────────────────── */}
        <section className="mb-16 border-t border-line pt-10" data-reveal>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-4">{sc.explorerTitle}</h2>
          <MatchExplorer data={data} story={story} />
        </section>

        {/* ── Final standings ───────────────────────────────── */}
        <section>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-2">{c.standingsTitle}</h2>
          <p className="text-sm text-ink-2 mb-4 max-w-2xl">
            {c.standingsSubtitle(data.n_sims.toLocaleString())}
          </p>

          <div className="flex flex-wrap gap-4 mb-6 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-4 h-3 rounded-sm inline-block" style={{ background: GREEN, border: `1px solid ${GREEN_BD}` }} />
              <span className="text-ink-2">{c.legendTop2}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-3 rounded-sm inline-block" style={{ background: BLUE, border: `1px solid ${BLUE_BD}` }} />
              <span className="text-ink-2">{c.legendThird}</span>
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
        <section className="mt-16 border-t border-line pt-10" data-reveal>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-2">{c.championTitle}</h2>
          <p className="text-sm text-ink-2 mb-5 max-w-2xl">
            {c.championSubtitle(data.n_sims.toLocaleString())}
          </p>
          <ChampionTable data={data} c={c} lang={lang} />
        </section>

        {/* ── Bracket ────────────────────────────────────────── */}
        <section className="mt-16 border-t border-line pt-10" data-reveal>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-2">{c.bracketTitle}</h2>
          <p className="text-sm text-ink-2 mb-6 max-w-2xl">{c.bracketSubtitle}</p>
          <div className="space-y-8">
            {BRACKET_ROUNDS.map(({ key, labelKey }) => (
              <div key={key}>
                <h3 className="text-xs font-bold text-ink-2 uppercase tracking-wider mb-3">
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

        <p className="text-xs text-ink-3 mt-4 leading-relaxed">
          {c.momentFootnote(
            Math.round(data.model.ensemble.A_weight * 100),
            Math.round(data.model.ensemble.B_weight * 100)
          )}
        </p>
      </div>
    </div>
  );
}
