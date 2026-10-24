'use client';

// Honest audit of the model: every match scored against its pre-match odds.

import { useLanguage } from '@/context/LanguageContext';
import type { StageKey, StageScore, Story } from '@/data/copa2026';
import { storyCopy } from '@/data/copa2026/storyCopy';
import { ACCENT, BAD, CARD, CARD_BORDER, GOOD, pct } from './storyUtils';

function called(sc: StageScore, ko: boolean): { k: number; n: number; rate: number } | null {
  const rate = ko ? sc.adv_accuracy : sc.accuracy;
  if (rate === undefined) return null;
  const n = ko ? sc.n : sc.n_ninety ?? sc.n;
  return { k: Math.round(rate * n), n, rate };
}

function LossBar({ value, base }: { value: number; base: number }) {
  const better = value < base;
  return (
    <div className="flex items-center gap-2 min-w-[96px]">
      <span className="font-mono tabular-nums text-xs w-9 text-right" style={{ color: better ? GOOD : BAD }}>
        {value.toFixed(2)}
      </span>
      <div className="relative flex-1 h-1.5 rounded-full" style={{ background: '#0a0a16' }}>
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(100, (value / (base * 1.4)) * 100)}%`, background: better ? GOOD : BAD, opacity: 0.8 }} />
        <div className="absolute -top-0.5 -bottom-0.5 w-px" style={{ left: `${(base / (base * 1.4)) * 100}%`, background: '#94a3b8' }} />
      </div>
    </div>
  );
}

export default function Scorecard({ story }: { story: Story }) {
  const { lang } = useLanguage();
  const c = storyCopy[lang];
  const { baselines } = story;

  const row = (key: string, label: string, sc: StageScore, ko: boolean, strongRow = false) => {
    const cl = called(sc, ko);
    const ll = ko ? sc.adv_logloss : sc.logloss;
    const base = ko ? baselines.logloss_adv : baselines.logloss_1x2;
    const prob = ko ? sc.mean_p_winner : sc.mean_p_result;
    return (
      <tr key={key} className="border-b last:border-0" style={{ borderColor: '#1a1a33', background: strongRow ? 'rgba(13,148,136,0.05)' : 'transparent' }}>
        <td className={`px-3 py-2.5 text-xs ${strongRow ? 'font-bold text-[#f1f5f9]' : 'text-[#f1f5f9]'}`}>{label}</td>
        <td className="px-2 py-2.5 text-right font-mono text-xs text-[#94a3b8]">{sc.n}</td>
        <td className="px-2 py-2.5 text-right font-mono text-xs text-[#f1f5f9]">
          {cl ? (
            <>
              {cl.k}/{cl.n} <span className="text-[#64748b]">({pct(cl.rate)})</span>
            </>
          ) : (
            '–'
          )}
        </td>
        <td className="px-2 py-2.5 text-right font-mono text-xs text-[#94a3b8]">{prob !== undefined ? pct(prob) : '–'}</td>
        <td className="px-2 py-2.5">{ll !== undefined ? <LossBar value={ll} base={base} /> : '–'}</td>
        <td className="px-2 py-2.5 text-right font-mono text-xs text-[#94a3b8] hidden md:table-cell">
          {sc.pred_goals !== undefined && sc.actual_goals !== undefined ? `${sc.pred_goals.toFixed(1)} / ${sc.actual_goals.toFixed(1)}` : '–'}
        </td>
        <td className="px-2 py-2.5 text-right font-mono text-xs text-[#94a3b8] hidden md:table-cell">{sc.over_rate !== undefined ? pct(sc.over_rate) : '–'}</td>
        <td className="px-2 py-2.5 text-right font-mono text-xs text-[#94a3b8] hidden md:table-cell">{sc.top_score_rate !== undefined ? pct(sc.top_score_rate) : '–'}</td>
      </tr>
    );
  };

  const g = story.scorecard.groups;
  const k = story.scorecard.knockouts;
  const kc = called(k, true);
  const ue = Object.entries(story.update_effect);

  // hardest stage = the one whose log loss is closest to (or worse than) its own baseline; only stages with 8+ matches
  const skill = story.stages
    .map((s: StageKey, i: number) => {
      const sc = story.scorecard.stages[s];
      const ko = !s.startsWith('G');
      const ll = ko ? sc.adv_logloss : sc.logloss;
      const base = ko ? baselines.logloss_adv : baselines.logloss_1x2;
      return { s, i, n: sc.n, ll: ll ?? 0, base, ratio: ll !== undefined ? ll / base : 0 };
    })
    .filter((x: { n: number }) => x.n >= 8);
  const worst = skill.reduce((a: (typeof skill)[number], b: (typeof skill)[number]) => (b.ratio > a.ratio ? b : a), skill[0]);
  const trend = worst
    ? c.scoreTrend({
        stage: c.stageNames[worst.s as StageKey],
        ll: worst.ll.toFixed(2),
        base: worst.base.toFixed(2),
        barely: worst.ratio > 0.9,
        later: skill.filter((x: { i: number }) => x.i > worst.i).every((x: { ratio: number }) => x.ratio < worst.ratio),
      })
    : '';

  return (
    <div>
      <div className="rounded-xl border overflow-hidden" style={{ background: CARD, borderColor: CARD_BORDER }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#475569] border-b" style={{ borderColor: CARD_BORDER }}>
                <th className="text-left font-medium px-3 py-2">{c.colStage}</th>
                <th className="text-right font-medium px-2 py-2">{c.colN}</th>
                <th className="text-right font-medium px-2 py-2">{c.colCalled}</th>
                <th className="text-right font-medium px-2 py-2">{c.colProb}</th>
                <th className="text-left font-medium px-2 py-2">{c.colLoss}</th>
                <th className="text-right font-medium px-2 py-2 hidden md:table-cell">{c.colGoals}</th>
                <th className="text-right font-medium px-2 py-2 hidden md:table-cell">{c.colOu}</th>
                <th className="text-right font-medium px-2 py-2 hidden md:table-cell">{c.colExact}</th>
              </tr>
            </thead>
            <tbody>
              {story.stages.map((s: StageKey) => row(s, c.stageNames[s], story.scorecard.stages[s], !s.startsWith('G')))}
              {row('groups', c.scoreOverallGroups, g, false, true)}
              {row('ko', c.scoreOverallKo, k, true, true)}
            </tbody>
          </table>
        </div>
        <div className="px-3 py-2 text-[10px] text-[#475569] border-t" style={{ borderColor: '#1a1a33' }}>
          {c.lowerBetter} · | = {c.baselineWord} ({baselines.logloss_1x2.toFixed(2)} / {baselines.logloss_adv.toFixed(2)}) · {c.calledGroups} / {c.calledKo}
        </div>
      </div>
      <p className="text-[11px] text-[#475569] mt-2 leading-relaxed max-w-3xl">{c.scoreNoteKo}</p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl border p-5" style={{ background: CARD, borderColor: CARD_BORDER }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>{c.scoreVerdictTitle}</h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            {c.scoreVerdict(
              { acc: pct(g.accuracy ?? 0), base: '33%', ll: (g.logloss ?? 0).toFixed(2), llBase: baselines.logloss_1x2.toFixed(2) },
              { acc: kc ? `${kc.k}` : '–', n: kc ? `${kc.n}` : '–' }
            )}
          </p>
          {trend && <p className="text-xs text-[#94a3b8] leading-relaxed mt-3">{trend}</p>}
          <p className="text-xs text-[#94a3b8] leading-relaxed mt-3">{c.scoreImprove}</p>
        </div>
        <div className="rounded-xl border p-5" style={{ background: CARD, borderColor: CARD_BORDER }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>{c.updateTitle}</h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            {c.updateBody(
              ue.map(([key, v]) => ({
                label: c.stageNames[key as StageKey],
                frozen: v.frozen_logloss.toFixed(3),
                updated: v.updated_logloss.toFixed(3),
                better: v.updated_logloss < v.frozen_logloss,
              }))
            )}
          </p>
          <p className="text-xs text-[#94a3b8] leading-relaxed mt-3">
            {c.updateVerdict(ue.filter(([, v]) => v.updated_logloss < v.frozen_logloss).length, ue.length)}
          </p>
        </div>
      </div>
    </div>
  );
}
