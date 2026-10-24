'use client';

// Match explorer: every match of a snapshot, by stage, in three views
// (result / scorelines / goals). Played matches show the odds the model had BEFORE
// kickoff; matches still to come show this snapshot's forecast with the real
// outcome added as clearly-labelled hindsight.

import { useMemo, useState } from 'react';
import Flag from '@/components/copa2026/Flag';
import OutcomeBar from '@/components/copa2026/OutcomeBar';
import ScoreHeatmap from '@/components/copa2026/ScoreHeatmap';
import { useLanguage } from '@/context/LanguageContext';
import type { Bracket, MatchPred, MomentData, StageKey, Story, StoryMatch } from '@/data/copa2026';
import { copaCopy, teamName } from '@/data/copa2026/copy';
import { storyCopy, type StoryCopy } from '@/data/copa2026/storyCopy';
import { ACCENT, ACCENT_BORDER, ACCENT_DIM, BAD, CARD, CARD_BORDER, GOOD, PURPLE, pct, scoreText, sideGoalsDist, totalGoalsDist } from './storyUtils';
import type { Lang } from '@/data/content';

type View = 'result' | 'score' | 'goals';

interface Item {
  key: string;
  stage: StageKey;
  group: string | null;
  date: string;
  venue?: string;
  home: string;
  away: string;
  homeIso: string;
  awayIso: string;
  /** Result already real at this snapshot. */
  locked: boolean;
  /** Odds shown: this snapshot's forecast, or (if locked) the last pre-match forecast. */
  pred: MatchPred;
  predMoment: number;
  /** Real outcome of this exact match (known now, or revealed after this snapshot). */
  actual?: StoryMatch;
  /** A projected tie that did not happen; holds the real tie that took its place. */
  mismatch?: StoryMatch;
  isKo: boolean;
}

const BRACKET_STAGE: Record<keyof Bracket, StageKey> = {
  r32: 'R32', r16: 'R16', qf: 'QF', sf: 'SF', third_place: '3RD', final: 'F',
};
const GROUP_STAGES: StageKey[] = ['G1', 'G2', 'G3'];
const KO_STAGES: StageKey[] = ['R32', 'R16', 'QF', 'SF', '3RD', 'F'];

function buildItems(data: MomentData, byId: Map<string, StoryMatch>): Item[] {
  const items: Item[] = [];
  for (const m of data.matches) {
    const key = `GS|${m.home}|${m.away}`;
    const sm = byId.get(key);
    const locked = data.known_rounds.includes(m.round);
    items.push({
      key,
      stage: `G${m.round}` as StageKey,
      group: m.group,
      date: m.date,
      home: m.home,
      away: m.away,
      homeIso: m.home_iso,
      awayIso: m.away_iso,
      locked,
      pred: locked && sm ? sm.pred : m,
      predMoment: locked && sm ? sm.pred_moment : data.moment,
      actual: sm,
      isKo: false,
    });
  }
  (Object.keys(BRACKET_STAGE) as Array<keyof Bracket>).forEach((k) => {
    for (const b of data.bracket[k]) {
      const sm = byId.get(b.id);
      const locked = b.status === 'actual';
      const samePair = !!sm && sm.home === b.home && sm.away === b.away;
      items.push({
        key: b.id,
        stage: BRACKET_STAGE[k],
        group: null,
        date: b.date,
        venue: b.venue,
        home: b.home,
        away: b.away,
        homeIso: b.home_iso,
        awayIso: b.away_iso,
        locked,
        pred: locked && sm ? sm.pred : b.pred,
        predMoment: locked && sm ? sm.pred_moment : data.moment,
        actual: samePair ? sm : undefined,
        mismatch: !samePair ? sm : undefined,
        isKo: true,
      });
    }
  });
  return items;
}

// ── small pieces ─────────────────────────────────────────────────────────────

function Bars({ values, labels, mark, color = ACCENT }: { values: number[]; labels: string[]; mark?: number | null; color?: string }) {
  const max = Math.max(...values, 0.0001);
  return (
    <div className="flex items-end gap-1.5 h-16">
      {values.map((v, i) => (
        <div key={labels[i]} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
          <span className="text-[9px] font-mono text-ink-2 mb-0.5">{Math.round(v * 100)}</span>
          <div
            className="w-full rounded-t-[3px]"
            style={{
              height: `${Math.max(2, (v / max) * 100) * 0.62}%`,
              background: color,
              opacity: mark === i ? 1 : 0.55,
              outline: mark === i ? '2px solid var(--ink)' : 'none',
              outlineOffset: '1px',
            }}
          />
          <span className="text-[9px] font-mono mt-0.5" style={{ color: mark === i ? 'var(--ink)' : 'var(--ink-3)', fontWeight: mark === i ? 700 : 400 }}>
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

function Split({ label, a, b, labelA, labelB }: { label: string; a: number; b: number; labelA: string; labelB: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1">{label}</div>
      <OutcomeBar pHome={a} pDraw={0} pAway={b} homeLabel={labelA} awayLabel={labelB} twoWay />
    </div>
  );
}

function ActualStrip({ item, c, lang }: { item: Item; c: StoryCopy; lang: Lang }) {
  const sm = item.actual;
  if (item.mismatch) {
    return (
      <div className="mt-3 rounded-[3px] p-3 text-[11px] leading-relaxed text-ink-2" style={{ background: 'var(--bg)', border: '1px dashed var(--line-strong)' }}>
        {c.mismatchNote(teamName(item.mismatch.home, lang), teamName(item.mismatch.away, lang))}
      </div>
    );
  }
  if (!sm) return null;
  const isGroup = sm.stage.startsWith('G');
  const ok = isGroup ? !!sm.called_result : !!sm.called_adv;
  const label = isGroup ? (ok ? c.called : c.missed) : ok ? c.calledAdv : c.missedAdv;
  const winnerName = teamName(sm.winner, lang);
  return (
    <div
      className="mt-3 rounded-[3px] p-3"
      style={{ background: 'var(--bg)', border: `1px solid ${ok ? 'color-mix(in srgb, var(--pos) 35%, transparent)' : 'color-mix(in srgb, var(--neg) 35%, transparent)'}` }}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[10px] uppercase tracking-widest text-ink-3">
          {item.locked ? c.actualNow : c.actualLater}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-sm font-bold tabular-nums text-ink">{scoreText(sm)}</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: ok ? GOOD : BAD, background: ok ? 'color-mix(in srgb, var(--pos) 12%, transparent)' : 'color-mix(in srgb, var(--neg) 12%, transparent)' }}>
            {label}
          </span>
        </span>
      </div>
      <p className="text-[11px] text-ink-2 mt-1.5 leading-relaxed">
        {isGroup
          ? c.gaveResult(pct(sm.p_result ?? 0))
          : c.gaveAdv(winnerName, pct(sm.p_winner_adv ?? 0))}
        {sm.ninety && sm.p_score != null && <> {c.gaveScore(pct(sm.p_score, 1), sm.score_rank ?? null)}</>}
        {sm.ninety && sm.p_score == null && <> {c.gaveScoreOff}</>}
      </p>
    </div>
  );
}

function ExplorerCard({ item, view, c, lang }: { item: Item; view: View; c: StoryCopy; lang: Lang }) {
  const { pred } = item;
  const hName = teamName(item.home, lang);
  const aName = teamName(item.away, lang);
  const sm = item.actual;
  const showScore = !!sm && item.locked;
  const actualGrid = sm && sm.ninety ? { home: sm.home_score, away: sm.away_score } : null;
  const total = useMemo(() => totalGoalsDist(pred.grid), [pred.grid]);
  const homeDist = useMemo(() => sideGoalsDist(pred.grid, 'home'), [pred.grid]);
  const awayDist = useMemo(() => sideGoalsDist(pred.grid, 'away'), [pred.grid]);
  const under = 1 - pred.over25;
  const bttsNo = 1 - pred.btts_yes;
  const totalMark = sm && sm.ninety ? Math.min(sm.total_goals ?? 0, 6) : null;

  return (
    <div className="rounded-[3px] border p-4" style={{ background: CARD, borderColor: item.locked ? ACCENT_BORDER : CARD_BORDER }}>
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <span className="text-[10px] font-mono text-ink-3 truncate">
          {item.date.slice(5)}
          {item.group ? ` · ${copaCopy[lang].groupWord} ${item.group}` : ''}
          {item.venue ? ` · ${item.venue}` : ''}
        </span>
        <span
          className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full shrink-0"
          style={{
            background: item.locked ? ACCENT_DIM : 'color-mix(in srgb, var(--ink-3) 8%, transparent)',
            color: item.locked ? ACCENT : 'var(--ink-3)',
            border: `1px solid ${item.locked ? ACCENT_BORDER : 'color-mix(in srgb, var(--ink-3) 20%, transparent)'}`,
          }}
        >
          {item.locked ? c.badgePlayed : c.badgePredicted}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Flag iso2={item.homeIso} size={22} title={hName} />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-ink leading-tight truncate">{hName}</div>
            <div className="text-[10px] font-mono text-ink-3">Elo {pred.home_elo}</div>
          </div>
        </div>
        <div className="px-3 text-center shrink-0">
          {showScore ? (
            <div className="text-base font-bold tabular-nums" style={{ color: ACCENT }}>
              {sm!.home_score} – {sm!.away_score}
            </div>
          ) : (
            <div className="text-xs font-bold text-ink-2">vs</div>
          )}
          {showScore && sm!.duration !== 'FT' && (
            <div className="text-[9px] text-ink-3">
              {sm!.duration === 'AP' ? `${sm!.home_pens}–${sm!.away_pens} ${c.pens}` : c.extraTime}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <div className="text-sm font-semibold text-ink leading-tight truncate">{aName}</div>
            <div className="text-[10px] font-mono text-ink-3">Elo {pred.away_elo}</div>
          </div>
          <Flag iso2={item.awayIso} size={22} title={aName} />
        </div>
      </div>

      {item.locked && <div className="text-[9px] uppercase tracking-widest text-ink-3 mb-2">{c.oddsFrom(item.predMoment)}</div>}

      {/* ── Result ─────────────────────────────────────────────── */}
      {view === 'result' && (
        <div className="space-y-3">
          <div>
            {item.isKo && <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1">{c.ninetyMin}</div>}
            <OutcomeBar pHome={pred.p_home} pDraw={pred.p_draw} pAway={pred.p_away} homeLabel={hName} awayLabel={aName} drawLabel={c.draw} />
          </div>
          {item.isKo && pred.p_adv_home !== undefined && (
            <Split label={c.toAdvance} a={pred.p_adv_home} b={1 - pred.p_adv_home} labelA={hName} labelB={aName} />
          )}
        </div>
      )}

      {/* ── Scorelines ─────────────────────────────────────────── */}
      {view === 'score' && (
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-5 sm:col-span-2">
            <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1.5">{c.topScorelines}</div>
            <ul className="space-y-1">
              {pred.top_scores.map((s, i) => {
                const isAct = !!actualGrid && s.score === `${actualGrid.home}-${actualGrid.away}`;
                return (
                  <li key={s.score} className="flex items-center gap-2 text-xs">
                    <span className="w-8 font-mono tabular-nums" style={{ color: isAct ? 'var(--ink)' : 'var(--ink-2)', fontWeight: isAct ? 800 : 500 }}>
                      {s.score.replace('-', '–')}
                    </span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg)' }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, (s.prob / pred.top_scores[0].prob) * 100)}%`, background: ACCENT, opacity: i === 0 ? 1 : 0.55 }} />
                    </div>
                    <span className="w-9 text-right font-mono tabular-nums text-ink-2">{pct(s.prob, 1)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-span-5 sm:col-span-3">
            <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1.5">{c.heatmapTitle}</div>
            <ScoreHeatmap grid={pred.grid} actual={actualGrid} homeLabel={hName} awayLabel={aName} />
            <div className="text-[9px] text-ink-3 mt-1.5 leading-snug">
              {c.heatmapNote}
              {actualGrid && actualGrid.home < 6 && actualGrid.away < 6 && (
                <> · <span className="text-ink">▢ {c.actualCell}</span></>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Goals ──────────────────────────────────────────────── */}
      {view === 'goals' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md py-1.5" style={{ background: 'var(--bg)' }}>
              <div className="text-[9px] uppercase tracking-wider text-ink-3">{c.expGoals}</div>
              <div className="text-sm font-semibold text-ink tabular-nums">
                {pred.exp_home_goals.toFixed(2)} – {pred.exp_away_goals.toFixed(2)}
              </div>
            </div>
            <div className="rounded-md py-1.5" style={{ background: 'var(--bg)' }}>
              <div className="text-[9px] uppercase tracking-wider text-ink-3">{c.totalGoals}</div>
              <div className="text-sm font-semibold text-ink tabular-nums">{(pred.exp_home_goals + pred.exp_away_goals).toFixed(2)}</div>
            </div>
            <div className="rounded-md py-1.5" style={{ background: 'var(--bg)' }}>
              <div className="text-[9px] uppercase tracking-wider text-ink-3">{c.btts}</div>
              <div className="text-sm font-semibold text-ink tabular-nums">{pct(pred.btts_yes)}</div>
            </div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1">{c.totalGoals} (%)</div>
            <Bars values={total} labels={['0', '1', '2', '3', '4', '5', '6+']} mark={totalMark} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1 truncate">{c.goalsOf(hName)} (%)</div>
              <Bars values={homeDist} labels={['0', '1', '2', '3', '4+']} mark={actualGrid ? Math.min(actualGrid.home, 4) : null} />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1 truncate">{c.goalsOf(aName)} (%)</div>
              <Bars values={awayDist} labels={['0', '1', '2', '3', '4+']} mark={actualGrid ? Math.min(actualGrid.away, 4) : null} color={PURPLE} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Split label={c.overUnder} a={pred.over25} b={under} labelA={c.over} labelB={c.under} />
            <Split label={c.btts} a={pred.btts_yes} b={bttsNo} labelA={c.yes} labelB={c.no} />
          </div>
        </div>
      )}

      <ActualStrip item={item} c={c} lang={lang} />
    </div>
  );
}

// ── main component ───────────────────────────────────────────────────────────

export default function MatchExplorer({ data, story }: { data: MomentData; story: Story }) {
  const { lang } = useLanguage();
  const c = storyCopy[lang];
  const byId = useMemo(() => new Map(story.matches.map((m) => [m.id, m])), [story]);
  const items = useMemo(() => buildItems(data, byId), [data, byId]);

  const stageLocked = (s: StageKey) => {
    const xs = items.filter((i) => i.stage === s);
    return xs.length > 0 && xs.every((i) => i.locked);
  };
  const firstOpen = ([...GROUP_STAGES, ...KO_STAGES] as StageKey[]).find((s) => !stageLocked(s)) ?? 'F';

  const [stage, setStage] = useState<StageKey>(firstOpen);
  const [view, setView] = useState<View>('result');
  const shown = items.filter((i) => i.stage === stage);

  const tab = (s: StageKey) => {
    const active = stage === s;
    const done = stageLocked(s);
    return (
      <button
        key={s}
        onClick={() => setStage(s)}
        className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1"
        style={{ background: active ? ACCENT : 'transparent', color: active ? 'var(--bg)' : done ? 'var(--ink-3)' : 'var(--ink-2)' }}
      >
        {done && !active && <span className="text-[10px]">✓</span>}
        {c.stageShort[s]}
      </button>
    );
  };

  const viewBtn = (v: View, label: string) => (
    <button
      key={v}
      onClick={() => setView(v)}
      className="px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all"
      style={{ background: view === v ? PURPLE : 'transparent', color: view === v ? 'var(--ink)' : 'var(--ink-2)' }}
    >
      {label}
    </button>
  );

  return (
    <div>
      <p className="text-sm text-ink-2 mb-5 max-w-2xl leading-relaxed">{c.explorerSubtitle}</p>

      <div className="flex flex-wrap items-end gap-x-6 gap-y-3 mb-6">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-ink-3 mb-1">{c.groupTabs}</div>
          <div className="inline-flex rounded-[3px] p-1 gap-1" style={{ background: CARD, border: `1px solid ${CARD_BORDER}` }}>
            {GROUP_STAGES.map(tab)}
          </div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-ink-3 mb-1">{c.koTabs}</div>
          <div className="inline-flex flex-wrap rounded-[3px] p-1 gap-1" style={{ background: CARD, border: `1px solid ${CARD_BORDER}` }}>
            {KO_STAGES.map(tab)}
          </div>
        </div>
        <div className="sm:ml-auto">
          <div className="inline-flex rounded-[3px] p-1 gap-1" style={{ background: CARD, border: `1px solid ${CARD_BORDER}` }}>
            {viewBtn('result', c.viewResult)}
            {viewBtn('score', c.viewScore)}
            {viewBtn('goals', c.viewGoals)}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {shown.map((it) => (
          <ExplorerCard key={it.key} item={it} view={view} c={c} lang={lang} />
        ))}
      </div>
    </div>
  );
}
