'use client';

import Link from 'next/link';
import Flag from '@/components/copa2026/Flag';
import { useLanguage } from '@/context/LanguageContext';
import ChampionTrajectory from '@/components/copa2026/ChampionTrajectory';
import Scorecard from '@/components/copa2026/Scorecard';
import Surprises from '@/components/copa2026/Surprises';
import { KeyNumbers, ResultBanner } from '@/components/copa2026/ResultBanner';
import { pctPoints } from '@/components/copa2026/storyUtils';
import { teamsData, moment1, story, type Team } from '@/data/copa2026';
import { copaCopy, teamName } from '@/data/copa2026/copy';
import { storyCopy } from '@/data/copa2026/storyCopy';

const ACCENT = 'var(--accent)';

const STACK = ['Python', 'pandas', 'statsmodels', 'NumPy', 'Poisson GLM', 'Elo', 'Monte Carlo', 'Next.js'];

function TeamRow({ t, name }: { t: Team; name: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Flag iso2={t.iso2} size={20} title={name} />
      <span className="text-sm text-ink flex-1 leading-tight">{name}</span>
      <span className="text-xs font-mono text-ink-2 w-10 text-right shrink-0">{t.elo}</span>
      <span className="text-[10px] font-mono text-ink-3 w-8 text-right shrink-0">#{t.elo_rank}</span>
    </div>
  );
}

export default function WorldCup2026Home() {
  const { lang } = useLanguage();
  const c = copaCopy[lang];
  const sc = storyCopy[lang];

  const byGroup = (g: string): Team[] =>
    teamsData.teams.filter((t) => t.group === g).sort((a, b) => a.pot - b.pot || b.elo - a.elo);

  const MOMENTS = c.moments.map((m, i) => ({ n: i + 1, ...m }));

  return (
    <div className="min-h-screen">

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-20">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink-2 transition-colors mb-10 group"
        >
          <span className="transition-transform duration-500 ease-out-soft group-hover:-translate-x-1">←</span>
          {c.back}
        </Link>

        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="mb-16">
          <p className="eyebrow enter" style={{ ['--d' as string]: '60ms' }}>{c.heroBadge}</p>
          <h1 className="display mt-6 text-[clamp(2.4rem,1.4rem+4vw,4.8rem)] text-ink enter" style={{ ['--d' as string]: '130ms' }}>
            {c.heroTitle}
            <span className="block italic text-ink-3 text-[0.55em] mt-3 leading-tight">{c.heroSubtitle}</span>
          </h1>
          <p className="mt-7 text-ink-2 leading-relaxed text-[1.1rem] max-w-[58ch] enter" style={{ ['--d' as string]: '230ms' }}>
            {c.heroLead(moment1.train_matches.toLocaleString(), moment1.train_cutoff)}
          </p>
          <p className="mt-6 font-mono text-[0.75rem] text-ink-3 enter" style={{ ['--d' as string]: '320ms' }}>
            {STACK.join(' · ')}
          </p>
        </header>

        <ResultBanner story={story} />
        <KeyNumbers story={story} />

        {/* ── Title-odds trajectory ─────────────────────────── */}
        <section className="mb-16 border-t border-line pt-10" data-reveal>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-2">{sc.trajTitle}</h2>
          <p className="text-sm text-ink-2 mb-5 max-w-2xl">{sc.trajSubtitle}</p>
          <ChampionTrajectory story={story} />
        </section>

        {/* ── The eight snapshots ──────────────────────────── */}
        <section className="mb-16 border-t border-line pt-10" data-reveal>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-2">{c.stagesTitle}</h2>
          <p className="text-sm text-ink-2 mb-5 max-w-2xl">{c.stagesSubtitle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line">
            {MOMENTS.map((m) => {
              const row = story.moments[m.n - 1];
              const fav = row.favorites[0];
              return (
                <Link
                  key={m.n}
                  href={`/projects/2026-world-cup/moment-${m.n}`}
                  className="group p-4 sm:p-5 block bg-bg transition-colors hover:bg-bg-soft"
                >
                  <div className="text-xs font-mono text-ink-3 mb-2">
                    {c.stageWord} {m.n}
                  </div>
                  <div className="text-sm font-semibold text-ink">{m.label}</div>
                  <div className="text-xs text-ink-2 mt-1">{m.predicts}</div>
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--line)' }}>
                    <div className="text-[9px] uppercase tracking-wider text-ink-3 mb-1">{sc.momentsFavorite}</div>
                    <div className="flex items-center gap-1.5 text-xs text-ink">
                      <Flag iso2={fav.iso2} size={12} title={fav.team} />
                      <span className="truncate">{teamName(fav.team, lang)}</span>
                      <span className="font-mono tabular-nums text-ink-2 ml-auto">{pctPoints(fav.p)}</span>
                    </div>
                    <div className="text-[10px] text-ink-3 mt-1.5 flex items-center gap-1">
                      <span style={{ color: ACCENT }}>★</span>
                      {sc.momentsChampion(
                        teamName(story.champion, lang),
                        pctPoints(row.p_champion[story.champion] ?? 0),
                        row.champion_rank
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Scorecard ─────────────────────────────────────── */}
        <section className="mb-16 border-t border-line pt-10" data-reveal>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-2">{sc.scoreTitle}</h2>
          <p className="text-sm text-ink-2 mb-5 max-w-2xl">{sc.scoreSubtitle}</p>
          <Scorecard story={story} />
        </section>

        {/* ── Surprises ─────────────────────────────────────── */}
        <section className="mb-16 border-t border-line pt-10" data-reveal>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-2">{sc.surprisesTitle}</h2>
          <p className="text-sm text-ink-2 mb-5 max-w-2xl">{sc.surprisesSubtitle}</p>
          <Surprises story={story} />
        </section>

        {/* ── How it works ─────────────────────────────────── */}
        <section className="mb-16 border-t border-line pt-10" data-reveal>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-5">{c.howTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.howCards.map((card) => (
              <div
                key={card.t}
                className="rounded-[3px] p-5 border"
                style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
              >
                <h3 className="text-sm font-semibold text-ink mb-2">{card.t}</h3>
                <p className="text-xs text-ink-2 leading-relaxed">{card.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The 48 nations by group ──────────────────────── */}
        <section>
          <h2 className="font-serif text-[clamp(1.7rem,1.3rem+1.2vw,2.2rem)] leading-tight tracking-[-0.015em] text-ink mb-2">{c.nationsTitle}</h2>
          <p className="text-sm text-ink-2 mb-6 max-w-2xl">{c.nationsSubtitle}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(teamsData.groups).map((g) => {
              const teams = byGroup(g);
              const fav = teams[0];
              return (
                <div
                  key={g}
                  className="rounded-[3px] border p-5"
                  style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
                >
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-sm font-bold text-ink tracking-wide shrink-0">
                      {c.groupWord} {g}
                    </h3>
                    <span className="text-[10px] text-ink-3 uppercase tracking-widest truncate">
                      {c.topSeed} · {teamName(fav.team, lang)}
                    </span>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'var(--line)' }}>
                    {teams.map((t) => (
                      <TeamRow key={t.team} t={t} name={teamName(t.team, lang)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footnote */}
        <p className="text-xs text-ink-3 mt-12 leading-relaxed">{c.homeFootnote(moment1.train_cutoff)}</p>
      </div>
    </div>
  );
}
