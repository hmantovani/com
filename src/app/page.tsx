'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import ProjectCard from '@/components/ProjectCard';

const SOCIAL_LINKS = {
  github: 'https://github.com/hmantovani',
  linkedin: 'https://www.linkedin.com/in/hmantovani/',
  upwork: 'https://www.upwork.com/freelancers/~011c4553024d9ba7cc',
};

const COMPANIES = [
  {
    name: 'IBM',
    logo: (
      <svg viewBox="0 0 60 24" className="h-5 fill-current" aria-label="IBM">
        <text x="0" y="20" fontSize="22" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="2">IBM</text>
      </svg>
    ),
  },
  {
    name: 'Keyence',
    logo: (
      <svg viewBox="0 0 110 24" className="h-5 fill-current" aria-label="Keyence">
        <text x="0" y="19" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1">KEYENCE</text>
      </svg>
    ),
  },
  {
    name: 'Thermo Fisher Scientific',
    logo: (
      <svg viewBox="0 0 220 24" className="h-5 fill-current" aria-label="Thermo Fisher Scientific">
        <text x="0" y="19" fontSize="15" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="0.5">Thermo Fisher Scientific</text>
      </svg>
    ),
  },
];

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
          style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #08080f 100%)' }}
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
          {/* Available badge */}
          <div className="mb-8 inline-flex">
            <span
              className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border"
              style={{ background: 'rgba(13,148,136,0.1)', borderColor: 'rgba(13,148,136,0.3)', color: '#2dd4bf' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#0d9488' }} />
              {c.hero.available}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f1f5f9] mb-4 leading-none">
            Henrique{' '}
            <span className="gradient-purple-teal">Mantovani</span>
          </h1>

          {/* Title */}
          <p className="text-lg sm:text-xl text-[#94a3b8] mb-8 font-light tracking-wide">
            {c.hero.title}
          </p>

          {/* Bio */}
          <div className="max-w-2xl mb-10 space-y-4">
            {bioParagraphs.map((para, i) => (
              <p key={i} className="text-[#94a3b8] leading-relaxed text-base">{para}</p>
            ))}
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
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

          {/* Social link buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'GitHub', href: SOCIAL_LINKS.github, live: true },
              { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, live: true },
              { label: 'Upwork', href: SOCIAL_LINKS.upwork, live: true },
              { label: 'Fiverr', href: null, live: false },
            ].map((s) =>
              s.live ? (
                <a
                  key={s.label}
                  href={s.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:border-[#8b5cf6] hover:text-[#f1f5f9]"
                  style={{ border: '1px solid #1e1e3f', color: '#94a3b8', background: '#0d0d1f' }}
                >
                  {s.label} <span className="text-xs opacity-60">↗</span>
                </a>
              ) : (
                <span
                  key={s.label}
                  title="Coming soon"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                  style={{ border: '1px dashed #1e1e3f', color: '#475569', background: '#0d0d1f' }}
                >
                  {s.label} <span className="text-xs opacity-50">Soon</span>
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── COMPANIES BAR ────────────────────────────────────────────── */}
      <section className="border-y py-10" style={{ borderColor: '#1e1e3f', background: '#0d0d1f' }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#475569] mb-8">
            {lang === 'en' ? 'Experienced at global market leaders' : 'Experiência em líderes globais de mercado'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20">
            {COMPANIES.map((company) => (
              <div
                key={company.name}
                className="text-[#64748b] hover:text-[#94a3b8] transition-colors duration-200"
                title={company.name}
              >
                {company.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2dd4bf] mb-3">
              {lang === 'en' ? 'How I can help' : 'Como posso ajudar'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] mb-3">
              {lang === 'en' ? 'Less manual work. More useful data.' : 'Menos trabalho manual. Mais valor nos dados.'}
            </h2>
            <p className="text-[#94a3b8] leading-relaxed">
              {lang === 'en'
                ? <>Practical data services for teams that need reliable<br className="hidden sm:block" /> answers without adding unnecessary complexity.</>
                : <>Serviços de dados práticos para equipes que precisam de respostas confiáveis<br className="hidden sm:block" /> sem adicionar complexidade desnecessária.</>}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {(lang === 'en'
              ? [
                  { n: '01', t: 'Automate recurring work', d: 'Replace repetitive exports, spreadsheet updates, and manual checks with dependable workflows.' },
                  { n: '02', t: 'Connect systems and data', d: 'Bring ERP, APIs, and files into a consistent data layer your team can trust and reuse.' },
                  { n: '03', t: 'Make reporting actionable', d: 'Turn scattered numbers into clear dashboards and analysis tied to day-to-day decisions.' },
                ]
              : [
                  { n: '01', t: 'Automatizar tarefas recorrentes', d: 'Substitua exportações repetitivas, atualizações de planilhas e conferências manuais por fluxos confiáveis.' },
                  { n: '02', t: 'Conectar sistemas e dados', d: 'Reúna ERP, APIs e arquivos em uma base consistente, confiável e reutilizável.' },
                  { n: '03', t: 'Transformar relatórios em ação', d: 'Converta números dispersos em painéis e análises ligados às decisões do dia a dia.' },
                ]).map((item) => (
              <article key={item.n} className="rounded-xl border p-6" style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}>
                <span className="text-base font-mono font-semibold text-[#2dd4bf]">{item.n}</span>
                <h3 className="text-lg font-semibold text-[#f1f5f9] mt-5 mb-2">{item.t}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{item.d}</p>
              </article>
            ))}
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-[#2dd4bf] hover:text-white transition-colors">
            {lang === 'en' ? 'Tell me what you need' : 'Conte o que você precisa'} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ── REAL CASES ───────────────────────────────────────────────── */}
      <section id="real-cases" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#8b5cf6' }}>
            {c.sections.realCases.title}
          </h2>
          <p className="text-[#94a3b8] mb-12 max-w-xl">{c.sections.realCases.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...c.realCases]
              .sort((a, b) => (a.slug === 'erp-data-platform' ? -1 : b.slug === 'erp-data-platform' ? 1 : 0))
              .map((project) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#0d9488' }}>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#c4a135' }}>
            {c.sections.contact.title}
          </h2>
          <p className="text-[#94a3b8] mb-12 max-w-xl">{c.sections.contact.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:contato@hmantovani.com"
              className="group p-6 rounded-xl border card-transition hover:border-[#8b5cf6]"
              style={{ background: '#13132b', borderColor: '#2a2a50' }}
            >
              <div className="text-2xl mb-3">✉️</div>
              <div className="text-sm font-semibold text-[#f1f5f9] mb-1">{c.contact.emailLabel}</div>
              <div className="text-xs text-[#94a3b8]">contato@hmantovani.com</div>
              <div className="text-xs text-[#64748b] mt-1">{c.contact.or} hq.mantovani@gmail.com</div>
            </a>

            <div className="p-6 rounded-xl border" style={{ background: '#13132b', borderColor: '#2a2a50' }}>
              <div className="text-2xl mb-3">📄</div>
              <div className="text-sm font-semibold text-[#f1f5f9] mb-1">{c.contact.downloadCV}</div>
              <div className="text-xs text-[#64748b] mb-4">
                {lang === 'en' ? 'Choose your preferred language.' : 'Escolha o idioma de sua preferência.'}
              </div>
              <div className="flex flex-wrap gap-2">
                <a href="/cv/henrique-mantovani-cv-pt-br.pdf" download className="text-xs font-semibold px-3 py-2 rounded-lg border hover:border-[#8b5cf6] transition-colors" style={{ borderColor: '#2a2a50', color: '#cbd5e1' }}>PT-BR ↓</a>
                <a href="/cv/henrique-mantovani-cv-en-us.pdf" download className="text-xs font-semibold px-3 py-2 rounded-lg border hover:border-[#8b5cf6] transition-colors" style={{ borderColor: '#2a2a50', color: '#cbd5e1' }}>EN-US ↓</a>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border relative overflow-hidden"
              style={{ background: '#13132b', borderColor: '#2a2a50', borderStyle: 'dashed' }}
            >
              <div className="text-2xl mb-3">🎯</div>
              <div className="text-sm font-semibold text-[#f1f5f9] mb-1">Fiverr</div>
              <div className="text-xs text-[#64748b]">{c.contact.fiverrNote}</div>
              <span
                className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(196,161,53,0.2)', color: '#d4b44a' }}
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
