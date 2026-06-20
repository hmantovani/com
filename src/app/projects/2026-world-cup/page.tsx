'use client';

import Link from 'next/link';
import Flag from '@/components/copa2026/Flag';
import { useLanguage } from '@/context/LanguageContext';
import { teamsData, moment1, type Team } from '@/data/copa2026';
import { copaCopy, teamName } from '@/data/copa2026/copy';

const ACCENT = '#2dd4bf';
const ACCENT_DIM = 'rgba(13,148,136,0.12)';
const ACCENT_BORDER = 'rgba(13,148,136,0.3)';

const STACK = ['Python', 'pandas', 'statsmodels', 'NumPy', 'Poisson GLM', 'Elo', 'Monte Carlo', 'Next.js'];

function TeamRow({ t, name }: { t: Team; name: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Flag iso2={t.iso2} size={20} title={name} />
      <span className="text-sm text-[#f1f5f9] flex-1 leading-tight">{name}</span>
      <span className="text-xs font-mono text-[#94a3b8] w-10 text-right shrink-0">{t.elo}</span>
      <span className="text-[10px] font-mono text-[#475569] w-8 text-right shrink-0">#{t.elo_rank}</span>
    </div>
  );
}

export default function WorldCup2026Home() {
  const { lang } = useLanguage();
  const c = copaCopy[lang];

  const byGroup = (g: string): Team[] =>
    teamsData.teams.filter((t) => t.group === g).sort((a, b) => b.elo - a.elo);

  const MOMENTS = c.moments.map((m, i) => ({ n: i + 1, ...m, live: i === 0 }));

  return (
    <div className="min-h-screen">
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#94a3b8] transition-colors mb-10 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          {c.back}
        </Link>

        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="mb-16">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: ACCENT_DIM, color: ACCENT, border: `1px solid ${ACCENT_BORDER}` }}
          >
            {c.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f1f5f9] leading-tight mt-5 mb-5">
            {c.heroTitle}
            <span className="block text-2xl sm:text-3xl mt-2 gradient-purple-teal">{c.heroSubtitle}</span>
          </h1>
          <p className="text-[#94a3b8] leading-relaxed text-lg max-w-2xl">
            {c.heroLead(moment1.train_matches.toLocaleString(), moment1.train_cutoff)}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {STACK.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full font-mono"
                style={{ background: '#0d0d1f', color: '#94a3b8', border: '1px solid #1e1e3f' }}
              >
                {s}
              </span>
            ))}
          </div>
        </header>

        {/* ── How it works ─────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-5 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {c.howTitle}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {c.howCards.map((card) => (
              <div
                key={card.t}
                className="rounded-xl p-5 border"
                style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}
              >
                <h3 className="text-sm font-semibold text-[#f1f5f9] mb-2">{card.t}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{card.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Prediction stages ────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-2 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {c.stagesTitle}
          </h2>
          <p className="text-sm text-[#94a3b8] mb-5 max-w-2xl">{c.stagesSubtitle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MOMENTS.map((m) =>
              m.live ? (
                <Link
                  key={m.n}
                  href={`/projects/2026-world-cup/moment-${m.n}`}
                  className="rounded-xl p-4 border card-transition hover-glow-teal block"
                  style={{ background: '#0d0d1f', borderColor: ACCENT_BORDER, borderLeft: `3px solid ${ACCENT}` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#475569]">
                      {c.stageWord} {m.n}
                    </span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: ACCENT_DIM, color: ACCENT }}
                    >
                      {c.live}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[#f1f5f9]">{m.label}</div>
                  <div className="text-xs text-[#94a3b8] mt-1">{m.predicts}</div>
                </Link>
              ) : (
                <div
                  key={m.n}
                  className="rounded-xl p-4 border"
                  style={{ background: '#0a0a16', borderColor: '#1a1a33', opacity: 0.55 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#475569]">
                      {c.stageWord} {m.n}
                    </span>
                    <span className="text-[10px] font-semibold text-[#475569]">{c.soon}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#94a3b8]">{m.label}</div>
                  <div className="text-xs text-[#475569] mt-1">{m.predicts}</div>
                </div>
              )
            )}
          </div>
        </section>

        {/* ── The 48 nations by group ──────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-2 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            {c.nationsTitle}
          </h2>
          <p className="text-sm text-[#94a3b8] mb-6 max-w-2xl">{c.nationsSubtitle}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(teamsData.groups).map((g) => {
              const teams = byGroup(g);
              const fav = teams[0];
              return (
                <div
                  key={g}
                  className="rounded-xl border p-5"
                  style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}
                >
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-sm font-bold text-[#f1f5f9] tracking-wide shrink-0">
                      {c.groupWord} {g}
                    </h3>
                    <span className="text-[10px] text-[#475569] uppercase tracking-widest truncate">
                      {c.topSeed} · {teamName(fav.team, lang)}
                    </span>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#1a1a33' }}>
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
        <p className="text-xs text-[#475569] mt-12 leading-relaxed">{c.homeFootnote(moment1.train_cutoff)}</p>
      </div>
    </div>
  );
}
