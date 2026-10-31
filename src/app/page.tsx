'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { content, ProjectData } from '@/data/content';
import { COMPANIES, CV_LINKS, EMAIL, EMAIL_ALT, SOCIAL_LINKS } from '@/data/site';
import HeroFigure from '@/components/HeroFigure';
import SectionHead from '@/components/SectionHead';

const FEATURED = '2026-world-cup';
const CASE_ORDER = ['erp-data-platform', 'sap-pipeline-automation'];

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5">
      →
    </span>
  );
}

function ProjectFrame({ project, priority, aspect = 'aspect-[16/10]' }: { project: ProjectData; priority?: boolean; aspect?: string }) {
  return (
    <div className={`shot relative overflow-hidden border border-line bg-bg-soft ${aspect}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();
  const c = content[lang];

  const cases = [...c.realCases].sort((a, b) => CASE_ORDER.indexOf(a.slug) - CASE_ORDER.indexOf(b.slug));
  const featured = c.projects.find((p) => p.slug === FEATURED)!;
  const withImage = c.projects.filter((p) => p.slug !== FEATURED && p.image);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1200px] px-5 sm:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow enter" style={{ ['--d' as string]: '50ms' }}>{c.hero.eyebrow}</p>
            <h1 className="display mt-6 text-[clamp(2.4rem,1.3rem+4.4vw,5.25rem)] text-ink">
              <span className="block enter" style={{ ['--d' as string]: '120ms' }}>Henrique</span>
              <span className="block enter text-accent" style={{ ['--d' as string]: '220ms' }}>Mantovani</span>
            </h1>
            <div className="mt-9 grid gap-4 max-w-[38rem] enter" style={{ ['--d' as string]: '360ms' }}>
              {c.hero.intro.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-[1.08rem] leading-relaxed text-ink-2' : 'text-[0.98rem] leading-relaxed text-ink-3'}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 enter" style={{ ['--d' as string]: '460ms' }}>
              <Link
                href="#work"
                className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-sm text-bg transition-colors hover:bg-accent hover:text-accent-ink"
              >
                {c.hero.ctaWork} <Arrow />
              </Link>
              <Link href="#contact" className="group inline-flex items-center gap-2 text-sm text-ink">
                <span className="link-draw">{c.hero.ctaContact}</span> <Arrow />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 enter" style={{ ['--d' as string]: '400ms' }}>
            <HeroFigure label={c.hero.figureLabel} caption={c.hero.figureCaption} linkText={c.hero.figureLink} />
          </div>
        </div>

        {/* Credentials strip */}
        <div
          className="mt-20 sm:mt-28 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between enter"
          style={{ ['--d' as string]: '600ms' }}
        >
          <p className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="eyebrow">{c.hero.previously}</span>
            {COMPANIES.map((name) => (
              <span key={name} className="font-serif text-xl sm:text-2xl text-ink-2">{name}</span>
            ))}
          </p>
          <p className="flex items-center gap-2 text-sm text-ink-3">
            <span className="h-1.5 w-1.5 rounded-full bg-pos" aria-hidden="true" />
            {c.hero.available}
          </p>
        </div>
      </section>

      {/* ── Selected work (real cases) ───────────────────────────────── */}
      <section id="work" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead eyebrow={c.sections.realCases.eyebrow} title={c.sections.realCases.title} lead={c.sections.realCases.subtitle} />
        <ol className="mt-14 border-t border-line">
          {cases.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
              <Link
                href={`/projects/${p.slug}`}
                className="group grid gap-4 border-b border-line py-10 sm:py-12 md:grid-cols-12 md:grid-rows-[auto_auto_1fr] md:gap-x-8 md:gap-y-0 transition-colors hover:bg-bg-soft/60"
              >
                <div className="md:col-span-3 md:col-start-1 md:row-start-1 flex md:flex-col gap-3 md:gap-2">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="eyebrow">{p.category}</span>
                </div>
                <div className="md:col-span-9 md:col-start-4 md:row-start-1 md:row-span-3">
                  <h3 className="font-serif text-[clamp(1.6rem,1.2rem+1.4vw,2.35rem)] leading-[1.1] tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[0.97rem] leading-relaxed text-ink-2 max-w-[68ch]">{p.cardDescription}</p>
                </div>
                <div className="md:col-span-3 md:col-start-1 md:row-start-2 md:pt-6 flex flex-col gap-5">
                  <p className="font-mono text-[0.72rem] leading-6 text-ink">{p.tags.slice(0, 5).join(' · ')}</p>
                  <span className="text-sm text-accent inline-flex items-center gap-2">
                    {c.sections.projects.view} <Arrow />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <section id="projects" className="bg-bg-soft border-y border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
          <SectionHead eyebrow={c.sections.projects.eyebrow} title={c.sections.projects.title} lead={c.sections.projects.subtitle} />

          {/* Featured */}
          <Link href={`/projects/${featured.slug}`} className="group mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12 items-center" data-reveal>
            <div className="lg:col-span-7">
              <ProjectFrame project={featured} priority aspect="aspect-[3392/1248]" />
            </div>
            <div className="lg:col-span-5">
              <p className="eyebrow">{c.sections.projects.featured} — {featured.category}</p>
              <h3 className="mt-4 font-serif text-[clamp(1.9rem,1.3rem+2vw,2.9rem)] leading-[1.05] tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
                {featured.title}
              </h3>
              <p className="mt-5 text-[0.97rem] leading-relaxed text-ink-2">{featured.cardDescription}</p>
              <p className="mt-5 font-mono text-[0.72rem] text-ink-3">{featured.tags.join(' · ')}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm text-ink">
                {c.sections.projects.view} <Arrow />
              </span>
            </div>
          </Link>

          {/* Demos with screenshots */}
          <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-10">
            {withImage.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group block" data-reveal>
                <ProjectFrame project={p} />
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <p className="eyebrow">{p.category}</p>
                  {p.status && <p className="font-mono text-[0.7rem] text-accent">{p.status}</p>}
                </div>
                <h3 className="mt-2 font-serif text-[1.65rem] leading-[1.15] tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{p.cardDescription}</p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────── */}
      <section id="services" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead eyebrow={c.services.eyebrow} title={c.services.title} />
        <ol className="mt-14 grid gap-px bg-line border border-line md:grid-cols-3">
          {c.services.items.map((s, i) => (
            <li key={s.t} className="bg-bg p-7 sm:p-9" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-10 font-serif text-[1.55rem] leading-[1.15] text-ink">{s.t}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
        <Link href="#contact" className="group mt-8 inline-flex items-center gap-2 text-sm text-ink">
          <span className="link-draw">{c.services.cta}</span> <Arrow />
        </Link>
      </section>

      {/* ── Background ───────────────────────────────────────────────── */}
      <section id="about" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-20 sm:py-28 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">{c.sections.about.eyebrow}</p>
            <h2 className="h-section mt-5 text-ink">{c.sections.about.title}</h2>
            <p className="prose-body mt-6 text-[1rem]">{c.sections.about.text}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal style={{ ['--d' as string]: '120ms' }}>
            <h3 className="eyebrow mb-2">{c.sections.about.experience}</h3>
            <ol className="border-t border-line">
              {c.experience.map((e) => (
                <li key={e.role + e.org} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-5">
                  <span className="font-mono text-[0.72rem] text-ink-3 pt-1">{e.period}</span>
                  <div>
                    <p className="text-ink">
                      {e.role} <span className="text-ink-3">— {e.org}</span>
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{e.note}</p>
                  </div>
                </li>
              ))}
            </ol>
            <h3 className="eyebrow mt-12 mb-2">{c.sections.about.education}</h3>
            <ol className="border-t border-line">
              {c.education.map((e) => (
                <li key={e.degree} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-5">
                  <span className="font-mono text-[0.72rem] text-ink-3 pt-1">{e.period}</span>
                  <p className="text-ink">
                    {e.degree} <span className="text-ink-3">— {e.org}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="bg-ink text-bg">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-24 sm:py-32">
          <p className="eyebrow !text-bg/60" data-reveal>{c.sections.contact.eyebrow}</p>
          <h2 className="display mt-6 max-w-[14ch] text-[clamp(2.5rem,1.3rem+4.6vw,5.2rem)]" data-reveal>
            {c.sections.contact.title}
          </h2>
          <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed text-bg/70" data-reveal>{c.sections.contact.subtitle}</p>

          <div className="mt-16 grid gap-12 border-t border-bg/15 pt-10 md:grid-cols-12" data-reveal>
            <div className="md:col-span-6">
              <p className="eyebrow !text-bg/55 mb-3">{c.contact.emailLabel}</p>
              <a href={`mailto:${EMAIL}`} className="group inline-flex items-baseline gap-3 font-serif text-[clamp(1.5rem,1.1rem+1.6vw,2.4rem)] leading-tight break-all">
                <span className="link-draw">{EMAIL}</span> <Arrow />
              </a>
              <p className="mt-2 text-sm text-bg/55">
                {c.contact.or} <a href={`mailto:${EMAIL_ALT}`} className="link-draw text-bg/80">{EMAIL_ALT}</a>
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="eyebrow !text-bg/55 mb-3">{c.contact.downloadCV}</p>
              <ul className="space-y-2">
                {CV_LINKS.map((cv) => (
                  <li key={cv.href}>
                    <a href={cv.href} download className="link-draw text-bg/90">{cv.label} ↓</a>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-bg/45">{c.contact.cvNote}</p>
            </div>
            <div className="md:col-span-3">
              <p className="eyebrow !text-bg/55 mb-3">{c.contact.socialHeading}</p>
              <ul className="space-y-2">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw text-bg/90">{s.label} ↗</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
