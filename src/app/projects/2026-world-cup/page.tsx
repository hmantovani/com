import type { Metadata } from 'next';
import Link from 'next/link';
import Flag from '@/components/copa2026/Flag';
import { teamsData, moment1, CONF_COLOR, type Team } from '@/data/copa2026';

const ACCENT = '#2dd4bf';
const ACCENT_DIM = 'rgba(13,148,136,0.12)';
const ACCENT_BORDER = 'rgba(13,148,136,0.3)';

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 — Prediction Model | Henrique Mantovani',
  description:
    'A round-by-round statistical prediction model for the 2026 World Cup. Poisson + Elo ensemble trained on 48,000+ international matches, re-run after every stage.',
};

const MOMENTS = [
  { n: 1, label: 'Pre-tournament', predicts: 'Full group stage', live: true },
  { n: 2, label: 'After Round 1', predicts: 'Round 2 → final', live: false },
  { n: 3, label: 'After Round 2', predicts: 'Round 3 → final', live: false },
  { n: 4, label: 'After groups', predicts: 'Round of 32 → final', live: false },
  { n: 5, label: 'After RO32', predicts: 'Round of 16 → final', live: false },
  { n: 6, label: 'After RO16', predicts: 'Quarter-finals → final', live: false },
  { n: 7, label: 'After QF', predicts: 'Semi-finals → final', live: false },
  { n: 8, label: 'After SF', predicts: 'Final + 3rd place', live: false },
];

const STACK = ['Python', 'pandas', 'statsmodels', 'NumPy', 'Poisson GLM', 'Elo', 'Monte Carlo', 'Next.js'];

function TeamRow({ t }: { t: Team }) {
  const conf = CONF_COLOR[t.confederation] ?? '#94a3b8';
  return (
    <div className="flex items-center gap-3 py-2">
      <Flag iso2={t.iso2} size={20} title={t.team} />
      <span className="text-sm text-[#f1f5f9] flex-1 truncate">{t.team}</span>
      <span
        className="text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide hidden sm:inline"
        style={{ background: `${conf}1f`, color: conf }}
      >
        {t.confederation}
      </span>
      <span className="text-xs font-mono text-[#94a3b8] w-10 text-right">{t.elo}</span>
      <span className="text-[10px] font-mono text-[#475569] w-8 text-right">#{t.elo_rank}</span>
    </div>
  );
}

export default function WorldCup2026Home() {
  const byGroup = (g: string): Team[] =>
    teamsData.teams
      .filter((t) => t.group === g)
      .sort((a, b) => b.elo - a.elo);

  return (
    <div className="min-h-screen">
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#94a3b8] transition-colors mb-10 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          Back to Portfolio
        </Link>

        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="mb-16">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: ACCENT_DIM, color: ACCENT, border: `1px solid ${ACCENT_BORDER}` }}
          >
            Data Science · Sports Modeling
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f1f5f9] leading-tight mt-5 mb-5">
            FIFA World Cup 2026
            <span className="block text-2xl sm:text-3xl mt-2 gradient-purple-teal">Prediction Model</span>
          </h1>
          <p className="text-[#94a3b8] leading-relaxed text-lg max-w-2xl">
            A living statistical model that forecasts the 2026 World Cup one stage at a time. It is
            trained on <strong className="text-[#f1f5f9]">{moment1.train_matches.toLocaleString()}</strong>{' '}
            international matches and re-run after every round, so each prediction uses everything known up to that
            moment.
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
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                t: 'Two models, one ensemble',
                d: 'A Poisson + Elo regression over the full history is blended (40/60) with a Poisson GLM that learns per-team attack & defense strengths from 2010 onward. Recent matches are weighted more heavily.',
              },
              {
                t: 'Goals → everything',
                d: 'Each match becomes a probability grid over scorelines. From that single grid we derive win/draw/loss, over/under 2.5, both-teams-to-score and the most likely results.',
              },
              {
                t: 'Simulated 20,000 times',
                d: 'The full group stage is Monte-Carlo simulated 20,000 times to estimate every team’s chance of winning its group, finishing top two, and qualifying for the knockouts.',
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-xl p-5 border"
                style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}
              >
                <h3 className="text-sm font-semibold text-[#f1f5f9] mb-2">{c.t}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Prediction moments ───────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-2 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: ACCENT }} />
            Prediction stages
          </h2>
          <p className="text-sm text-[#94a3b8] mb-5 max-w-2xl">
            As real results come in, the training window grows and a new forecast is published for everything that
            remains. Eight snapshots, from kickoff to the final.
          </p>
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
                    <span className="text-xs font-mono text-[#475569]">Stage {m.n}</span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: ACCENT_DIM, color: ACCENT }}
                    >
                      LIVE
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
                    <span className="text-xs font-mono text-[#475569]">Stage {m.n}</span>
                    <span className="text-[10px] font-semibold text-[#475569]">SOON</span>
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
            The 48 nations
          </h2>
          <p className="text-sm text-[#94a3b8] mb-6 max-w-2xl">
            Twelve groups of four. Each row shows the team’s current Elo rating and its rank among all 48
            qualified nations.
          </p>
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
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-[#f1f5f9] tracking-wide">Group {g}</h3>
                    <span className="text-[10px] text-[#475569] uppercase tracking-widest">
                      Top seed · {fav.team}
                    </span>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#1a1a33' }}>
                    {teams.map((t) => (
                      <TeamRow key={t.team} t={t} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footnote */}
        <p className="text-xs text-[#475569] mt-12 leading-relaxed">
          Elo ratings sourced pre-tournament. This is a probabilistic model for analysis and entertainment, not betting
          advice. Methodology snapshot: trained on data up to {moment1.train_cutoff}.
        </p>
      </div>
    </div>
  );
}
