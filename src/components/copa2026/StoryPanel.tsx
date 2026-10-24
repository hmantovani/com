'use client';

// "What the model thought here": a short, data-driven narrative for each snapshot.

import Flag from '@/components/copa2026/Flag';
import { useLanguage } from '@/context/LanguageContext';
import type { MomentData, MoverRow, Story } from '@/data/copa2026';
import { teamName } from '@/data/copa2026/copy';
import { storyCopy } from '@/data/copa2026/storyCopy';
import { ACCENT, ACCENT_BORDER, ACCENT_DIM, BAD, GOOD, pct, pctPoints, scoreText } from './storyUtils';

function MoverChip({ r, up, lang }: { r: MoverRow; up: boolean; lang: 'en' | 'pt' }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full"
      style={{ background: 'var(--bg)', border: `1px solid ${up ? 'color-mix(in srgb, var(--pos) 35%, transparent)' : 'color-mix(in srgb, var(--neg) 35%, transparent)'}` }}
    >
      <Flag iso2={r.iso2} size={11} title={r.team} />
      <span className="text-ink">{teamName(r.team, lang)}</span>
      <span className="font-mono tabular-nums" style={{ color: up ? GOOD : BAD }}>
        {r.from.toFixed(1)}% → {r.to.toFixed(1)}%
      </span>
    </span>
  );
}

export default function StoryPanel({ data, story }: { data: MomentData; story: Story }) {
  const { lang } = useLanguage();
  const c = storyCopy[lang];
  const tn = (t: string) => teamName(t, lang);
  const n = data.moment;
  const row = story.moments[n - 1];
  const byId = new Map(story.matches.map((m) => [m.id, m]));

  let lead: React.ReactNode;
  if (n === 1) {
    lead = c.panelStart(
      row.favorites.slice(0, 3).map((f) => ({ team: tn(f.team), p: pctPoints(f.p) })),
      tn(story.champion),
      pctPoints(row.p_champion[story.champion] ?? 0),
      row.champion_rank
    );
  } else {
    const step = story.steps[String(n)];
    const sm = byId.get(step.biggest_surprise.id);
    const isKo = !step.stage.startsWith('G');
    const surprise = sm
      ? isKo
        ? `${tn(sm.home)} ${scoreText(sm)} ${tn(sm.away)} — ${c.surpriseAdv(tn(sm.winner), pct(step.biggest_surprise.p, 1))}`
        : `${tn(sm.home)} ${scoreText(sm)} ${tn(sm.away)} (${pct(step.biggest_surprise.p, 1)})`
      : '';
    lead = c.panelStep({
      stage: c.stageNames[step.stage],
      isKo: !step.stage.startsWith('G'),
      called: step.called,
      n: step.n,
      surprise,
    });
  }

  const mv = n > 1 ? story.movers[String(n)] : null;
  const fav = row.favorites[0];

  let endLine: string | null = null;
  if (n === 8) {
    const fm = story.matches.find((m) => m.stage === 'F');
    if (fm) {
      const suffix = fm.duration === 'AET' ? ` (${c.extraTime})` : fm.duration === 'AP' ? ` (${c.pens})` : '';
      endLine = c.panelEnd(
        `${tn(fm.home)} ${fm.home_score}–${fm.away_score} ${tn(fm.away)}${suffix}`,
        pct(fm.p_winner_adv ?? 0),
        tn(fm.winner)
      );
    }
  }

  return (
    <section className="mb-14 rounded-[3px] border p-5 sm:p-6" style={{ background: ACCENT_DIM, borderColor: ACCENT_BORDER }}>
      <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
        {c.panelTitle}
      </h2>
      <p className="text-sm text-ink-2 leading-relaxed max-w-3xl">{lead}</p>
      {mv && (mv.up.length > 0 || mv.down.length > 0) && (
        <div className="mt-4 space-y-2">
          {mv.up.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-ink-3 w-full sm:w-auto">{c.panelUp}</span>
              {mv.up.map((r) => (
                <MoverChip key={r.team} r={r} up lang={lang} />
              ))}
            </div>
          )}
          {mv.down.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-ink-3 w-full sm:w-auto">{c.panelDown}</span>
              {mv.down.map((r) => (
                <MoverChip key={r.team} r={r} up={false} lang={lang} />
              ))}
            </div>
          )}
        </div>
      )}
      <p className="text-sm text-ink-2 leading-relaxed max-w-3xl mt-4">
        {c.panelFavorite(tn(fav.team), pctPoints(fav.p))}{' '}
        {n > 1 && fav.team !== story.champion && c.panelChampion(tn(story.champion), pctPoints(row.p_champion[story.champion] ?? 0), row.champion_rank)}
      </p>
      {endLine && <p className="text-sm text-ink-2 leading-relaxed max-w-3xl mt-2">{endLine}</p>}
      <p className="text-[11px] text-ink-3 mt-4 max-w-3xl">{c.panelHindsight}</p>
    </section>
  );
}
