'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content, ProjectData } from '@/data/content';
import { getProjectShowcase } from '@/data/projectShowcases';

interface Props {
  params: Promise<{ slug: string }>;
}

// Editorial section: sticky label column on the left, text on the right.
function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-12 md:grid-cols-12 md:gap-8" data-reveal>
      <div className="md:col-span-3">
        <div className="md:sticky md:top-24 flex items-baseline gap-3">
          <span className="font-mono text-xs text-accent">{n}</span>
          <h2 className="font-serif text-[1.6rem] leading-tight text-ink">{title}</h2>
        </div>
      </div>
      <div className="md:col-span-8 md:col-start-5">{children}</div>
    </section>
  );
}

function findProject(slug: string, lang: 'en' | 'pt'): { list: ProjectData[]; project: ProjectData } | null {
  const c = content[lang];
  for (const list of [c.realCases, c.projects]) {
    const project = list.find((p) => p.slug === slug);
    if (project) return { list, project };
  }
  return null;
}

export default function ProjectPage({ params }: Props) {
  const { slug } = use(params);
  const { lang } = useLanguage();
  const c = content[lang];
  const pp = c.projectPage;
  const found = findProject(slug, lang);
  if (!found) notFound();
  const { project, list } = found;
  const showcase = getProjectShowcase(slug, lang);
  const next = list[(list.indexOf(project) + 1) % list.length];
  const backHref = project.isReal ? '/#work' : '/#projects';

  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <article className="mx-auto max-w-[1200px] px-5 sm:px-8 pt-28 sm:pt-36 pb-20">
      <Link href={backHref} className="group inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink transition-colors enter">
        <span aria-hidden="true" className="transition-transform duration-500 ease-out-soft group-hover:-translate-x-1">←</span>
        {pp.back.replace('← ', '')}
      </Link>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8 pb-14">
        <div className="lg:col-span-8">
          <p className="eyebrow enter" style={{ ['--d' as string]: '60ms' }}>
            {project.category}
            {project.isReal && <span className="text-accent"> · {pp.realCaseBadge}</span>}
            {project.status && <span className="text-accent"> · {project.status}</span>}
          </p>
          <h1
            className="display mt-6 text-[clamp(2.3rem,1.4rem+3.6vw,4.4rem)] leading-[1.02] text-ink enter"
            style={{ ['--d' as string]: '130ms' }}
          >
            {project.title}
          </h1>
          <p className="mt-7 max-w-[56ch] text-[1.12rem] leading-relaxed text-ink-2 enter" style={{ ['--d' as string]: '230ms' }}>
            {showcase?.lead ?? project.cardDescription}
          </p>
        </div>

        <aside className="lg:col-span-3 lg:col-start-10 lg:pt-2 enter" style={{ ['--d' as string]: '320ms' }}>
          <p className="eyebrow mb-3">{pp.stack}</p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[0.75rem] text-ink-2">
            {project.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <div className="mt-8 flex flex-col items-start gap-3 text-sm">
            {showcase?.demoUrl && (
              <a href={showcase.demoUrl} target="_blank" rel="noopener noreferrer"
                className="bg-ink px-5 py-3 text-bg transition-colors hover:bg-accent hover:text-accent-ink">
                {showcase.demoLabel}
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-draw text-ink">
                {showcase?.sourceLabel ?? `${pp.github} ↗`}
              </a>
            )}
            {project.linkedinUrl && (
              <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link-draw text-ink">
                {pp.linkedin} ↗
              </a>
            )}
          </div>
        </aside>
      </header>

      {/* ── Key figures ────────────────────────────────────────────── */}
      {showcase && (
        <div className="border-t border-line pt-8 pb-14" data-reveal>
          <dl className="grid grid-cols-3 gap-4 sm:gap-8">
            {showcase.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="display text-[clamp(2.2rem,1.4rem+3vw,4rem)] text-ink">{m.value}</dd>
                <dd className="mt-2 text-sm text-ink-3">{m.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-[70ch] border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink-3">{showcase.note}</p>
        </div>
      )}

      <Section n={num()} title={pp.overview}>
        <p className="prose-body text-[1.05rem]">{project.overview}</p>
      </Section>

      {/* ── Screenshots ────────────────────────────────────────────── */}
      {showcase && (
        <section className="border-t border-line py-12" aria-label={showcase.screenshotsHeading}>
          <h2 className="eyebrow mb-8">{showcase.screenshotsHeading}</h2>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {showcase.screenshots.map((shot, i) => (
              <figure key={shot.src} className={i === 0 ? 'md:col-span-2' : ''} data-reveal>
                <div className="shot overflow-hidden border border-line bg-bg-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.alt} loading={i === 0 ? 'eager' : 'lazy'} className="block h-auto w-full" />
                </div>
                <figcaption className="mt-3 flex gap-3 text-sm leading-relaxed text-ink-3">
                  <span className="font-mono text-xs text-ink-4 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <Section n={num()} title={pp.challenge}>
        <p className="prose-body text-[1.05rem]">{project.challenge}</p>
      </Section>
      <Section n={num()} title={pp.solution}>
        <p className="prose-body text-[1.05rem]">{project.solution}</p>
      </Section>

      {showcase && (
        <Section n={num()} title={showcase.stepsHeading}>
          <ol className="border-t border-line">
            {showcase.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5">
                <span className="font-mono text-xs text-ink-4 pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-ink font-medium">{s.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section n={num()} title={pp.results}>
        <p className="prose-body text-[1.05rem]">{project.results}</p>
        {showcase && (
          <div className="mt-10">
            <h3 className="eyebrow mb-4">{showcase.benefitsHeading}</h3>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {showcase.benefits.map((b) => (
                <div key={b.title} className="bg-bg p-5">
                  <h4 className="font-serif text-lg text-ink">{b.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* ── Contact prompt and next project ────────────────────────── */}
      <div className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2" data-reveal>
        <Link href="/#contact" className="group bg-bg p-8 sm:p-10 transition-colors hover:bg-bg-soft">
          <p className="eyebrow">{lang === 'en' ? 'Similar problem?' : 'Problema parecido?'}</p>
          <p className="mt-4 font-serif text-[1.75rem] leading-tight text-ink">
            {lang === 'en' ? 'Tell me about the workflow you want to improve' : 'Conte qual fluxo você quer melhorar'}{' '}
            <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5">→</span>
          </p>
        </Link>
        {next && next.slug !== project.slug && (
          <Link href={`/projects/${next.slug}`} className="group bg-bg p-8 sm:p-10 transition-colors hover:bg-bg-soft">
            <p className="eyebrow">{lang === 'en' ? 'Next' : 'Próximo'}</p>
            <p className="mt-4 font-serif text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-accent">
              {next.title}{' '}
              <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5">→</span>
            </p>
          </Link>
        )}
      </div>
    </article>
  );
}
