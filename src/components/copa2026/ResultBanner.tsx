'use client';

// "How it ended" banner and the four headline numbers.

import Flag from '@/components/copa2026/Flag';
import { useLanguage } from '@/context/LanguageContext';
import type { Story } from '@/data/copa2026';
import { teamName } from '@/data/copa2026/copy';
import { storyCopy } from '@/data/copa2026/storyCopy';
import { ACCENT, ACCENT_BORDER, ACCENT_DIM, CARD, CARD_BORDER, pct, pctPoints } from './storyUtils';

function Podium({ label, team, iso, big = false }: { label: string; team: string; iso: string; big?: boolean }) {
  return (
    <div
      className="rounded-xl border p-4 flex items-center gap-3"
      style={{ background: big ? ACCENT_DIM : CARD, borderColor: big ? ACCENT_BORDER : CARD_BORDER }}
    >
      <Flag iso2={iso} size={big ? 30 : 22} title={team} />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-[#64748b]">{label}</div>
        <div className={`${big ? 'text-lg' : 'text-sm'} font-bold text-[#f1f5f9] truncate`}>{team}</div>
      </div>
    </div>
  );
}

export function ResultBanner({ story }: { story: Story }) {
  const { lang } = useLanguage();
  const c = storyCopy[lang];
  const tn = (t: string) => teamName(t, lang);
  const f = story.final_score;
  const suffix = f.duration === 'AET' ? ` (${c.extraTime})` : f.duration === 'AP' ? ` (${c.pens})` : '';
  const fourth = story.fourth;
  const last = story.moments[7].p_champion;

  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold text-[#f1f5f9] mb-5 flex items-center gap-3">
        <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
        {c.endedTitle}
      </h2>
      <div className="grid sm:grid-cols-5 gap-3 mb-4">
        <div className="sm:col-span-2">
          <Podium big label={`🏆 ${c.championWord}`} team={tn(story.champion)} iso={story.champion_iso} />
        </div>
        <Podium label={c.runnerUpWord} team={tn(story.runner_up)} iso={story.runner_up_iso} />
        <Podium label={c.thirdWord} team={tn(story.third)} iso={story.third_iso} />
        <Podium label={c.fourthWord} team={tn(fourth)} iso={story.fourth_iso} />
      </div>
      <p className="text-sm text-[#94a3b8] leading-relaxed max-w-3xl">
        {c.finalSentence(tn(f.home), tn(f.away), `${f.hs}–${f.as}`, suffix)}{' '}
        {c.lastSnapshotSentence(
          tn(story.champion),
          pctPoints(last[story.champion] ?? 0, 0),
          tn(story.runner_up),
          pctPoints(last[story.runner_up] ?? 0, 0)
        )}
      </p>
    </section>
  );
}

function Tile({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border p-5" style={{ background: CARD, borderColor: CARD_BORDER }}>
      <div className="text-[10px] uppercase tracking-widest text-[#64748b] mb-2">{label}</div>
      <div className="text-2xl font-bold" style={{ color: ACCENT }}>
        {value}
      </div>
      <p className="text-[11px] text-[#94a3b8] leading-relaxed mt-2">{note}</p>
    </div>
  );
}

export function KeyNumbers({ story }: { story: Story }) {
  const { lang } = useLanguage();
  const c = storyCopy[lang];
  const g = story.scorecard.groups;
  const k = story.scorecard.knockouts;
  const start = story.moments[0];
  const gN = g.n_ninety ?? g.n;
  const gK = Math.round((g.accuracy ?? 0) * gN);
  const kK = Math.round((k.adv_accuracy ?? 0) * k.n);

  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold text-[#f1f5f9] mb-5 flex items-center gap-3">
        <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
        {c.keyTitle}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Tile
          label={c.keyChampionOdds}
          value={pctPoints(start.p_champion[story.champion] ?? 0)}
          note={c.keyChampionOddsNote(start.champion_rank)}
        />
        <Tile label={c.keyGroupCalls} value={`${gK}/${gN} · ${pct(g.accuracy ?? 0)}`} note={c.keyGroupCallsNote} />
        <Tile label={c.keyKoCalls} value={`${kK}/${k.n} · ${pct(k.adv_accuracy ?? 0)}`} note={c.keyKoCallsNote} />
        <Tile
          label={c.keyGoals}
          value={`${(g.pred_goals ?? 0).toFixed(2)} vs ${(g.actual_goals ?? 0).toFixed(2)}`}
          note={c.keyGoalsNote}
        />
      </div>
    </section>
  );
}
