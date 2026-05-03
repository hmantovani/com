'use client';

import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import ProjectCard from '@/components/ProjectCard';

const SOCIAL_LINKS = {
  github: 'https://github.com/hmantovani',
  linkedin: 'https://www.linkedin.com/in/hmantovani/',
  upwork: 'https://www.upwork.com/freelancers/~011c4553024d9ba7cc',
};

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-8 h-px" style={{ background: color }} />
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
        {children}
      </span>
    </div>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();
  const c = content[lang];

  const bioParagraphs = c.hero.bio.split('\n\n');

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center dot-grid overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #08080f 100%)',
          }}
        />
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="mb-8 inline-flex">
            <span
              className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border"
              style={{
                background: 'rgba(13,148,136,0.1)',
                borderColor: 'rgba(13,148,136,0.3)',
                color: '#2dd4bf',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#0d9488' }} />
              {c.hero.available}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f1f5f9] mb-4 leading-none">
            Henrique{' '}
            <span className="gradient-purple-teal">Mantovani</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#94a3b8] mb-8 font-light tracking-wide">
            {c.hero.title}
          </p>

          <div className="max-w-2xl mb-10 space-y-4">
            {bioParagraphs.map((para, i) => (
              <p key={i} className="text-[#94a3b8] leading-relaxed text-base">
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#real-cases"
              className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}
            >
              {c.hero.ctaWork}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:border-[#8b5cf6] hover:text-[#f1f5f9]"
              style={{ border: '1px solid #1e1e3f', color: '#94a3b8', background: 'transparent' }}
            >
              {c.hero.ctaContact}
            </a>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: 'GitHub', href: SOCIAL_LINKS.github },
              { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
              { label: 'Upwork', href: SOCIAL_LINKS.upwork },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#475569] hover:text-[#8b5cf6] transition-colors font-medium"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANIES BAR ────────────────────────────────────────────── */}
      <section className="border-y py-10" style={{ borderColor: '#1e1e3f', background: '#0d0d1f' }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#475569] mb-6">
            {lang === 'en' ? 'Experienced at global market leaders' : 'Experiência em líderes globais de mercado'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16">
            {['IBM', 'Keyence', 'Thermo Fisher Scientific'].map((company) => (
              <span key={company} className="text-sm font-semibold tracking-wider text-[#475569]">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL CASES ───────────────────────────────────────────────── */}
      <section id="real-cases" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel color="#8b5cf6">{c.sections.realCases.title}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] mb-3">
            {c.sections.realCases.title}
          </h2>
          <p className="text-[#94a3b8] mb-12 max-w-xl">{c.sections.realCases.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.realCases.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="real"
                badge={c.projectPage.realCaseBadge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-24"
        style={{ background: 'linear-gradient(180deg, #08080f 0%, #0d0d1f 50%, #08080f 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel color="#0d9488">{c.sections.projects.title}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] mb-3">
            {c.sections.projects.title}
          </h2>
          <p className="text-[#94a3b8] mb-12 max-w-xl">{c.sections.projects.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.projects.map((project) => (
              <ProjectCard key={project.slug} project={project} variant="project" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 border-t" style={{ borderColor: '#1e1e3f' }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel color="#c4a135">{c.sections.contact.title}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] mb-3">
            {c.sections.contact.title}
          </h2>
          <p className="text-[#94a3b8] mb-12 max-w-xl">{c.sections.contact.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:contato@hmantovani.com"
              className="group p-6 rounded-xl border card-transition hover:border-[#8b5cf6]"
              style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}
            >
              <div className="text-2xl mb-3">✉️</div>
              <div className="text-sm font-semibold text-[#f1f5f9] mb-1">{c.contact.emailLabel}</div>
              <div className="text-xs text-[#94a3b8]">contato@hmantovani.com</div>
              <div className="text-xs text-[#475569] mt-1">{c.contact.or} hq.mantovani@gmail.com</div>
            </a>

            <div
              className="p-6 rounded-xl border relative overflow-hidden"
              style={{ background: '#0d0d1f', borderColor: '#1e1e3f', borderStyle: 'dashed' }}
            >
              <div className="text-2xl mb-3">📄</div>
              <div className="text-sm font-semibold text-[#f1f5f9] mb-1">{c.contact.downloadCV}</div>
              <div className="text-xs text-[#475569]">{c.contact.cvNote}</div>
              <span
                className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(196,161,53,0.15)', color: '#d4b44a' }}
              >
                Soon
              </span>
            </div>

            <div
              className="p-6 rounded-xl border relative overflow-hidden"
              style={{ background: '#0d0d1f', borderColor: '#1e1e3f', borderStyle: 'dashed' }}
            >
              <div className="text-2xl mb-3">🎯</div>
              <div className="text-sm font-semibold text-[#f1f5f9] mb-1">Fiverr</div>
              <div className="text-xs text-[#475569]">{c.contact.fiverrNote}</div>
              <span
                className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(196,161,53,0.15)', color: '#d4b44a' }}
              >
                Soon
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#475569]">
              {c.contact.socialHeading}
            </span>
            {[
              { label: 'GitHub', href: SOCIAL_LINKS.github },
              { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
              { label: 'Upwork', href: SOCIAL_LINKS.upwork },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-200 hover:border-[#8b5cf6] hover:text-[#f1f5f9]"
                style={{ borderColor: '#1e1e3f', color: '#94a3b8', background: '#0d0d1f' }}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
