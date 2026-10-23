'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { content, ProjectData } from '@/data/content';
import { getProjectShowcase } from '@/data/projectShowcases';
import { use } from 'react';

interface Props {
  params: Promise<{ slug: string }>;
}

function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-[#f1f5f9] mb-4 flex items-center gap-3">
        <span className="w-1 h-6 rounded-full shrink-0 inline-block" style={{ background: accent }} />
        {title}
      </h2>
      <div className="text-[#94a3b8] leading-relaxed text-base">{children}</div>
    </div>
  );
}

function findProject(slug: string, lang: 'en' | 'pt'): { project: ProjectData; isReal: boolean } | null {
  const c = content[lang];
  const real = c.realCases.find((p) => p.slug === slug);
  if (real) return { project: real, isReal: true };
  const proj = c.projects.find((p) => p.slug === slug);
  if (proj) return { project: proj, isReal: false };
  return null;
}

export default function ProjectPage({ params }: Props) {
  const { slug } = use(params);
  const { lang } = useLanguage();
  const c = content[lang];
  const found = findProject(slug, lang);
  if (!found) notFound();
  const { project, isReal } = found;
  const showcase = getProjectShowcase(slug, lang);

  const accent = isReal ? '#8b5cf6' : '#0d9488';
  const accentDim = isReal ? 'rgba(139,92,246,0.1)' : 'rgba(13,148,136,0.1)';
  const accentBorder = isReal ? 'rgba(139,92,246,0.3)' : 'rgba(13,148,136,0.3)';

  return (
    <div className="min-h-screen">
      {/* Top gradient bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#94a3b8] transition-colors mb-10 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          {c.projectPage.back.replace('← ', '')}
        </Link>

        {/* Header */}
        <header className="mb-12 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: accentDim, color: accent, border: `1px solid ${accentBorder}` }}
            >
              {project.category}
            </span>
            {project.isReal && (
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(196,161,53,0.1)',
                  color: '#d4b44a',
                  border: '1px solid rgba(196,161,53,0.3)',
                }}
              >
                {c.projectPage.realCaseBadge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] leading-tight mb-6">
            {project.title}
          </h1>

          {showcase && (
            <p className="text-lg sm:text-xl text-[#cbd5e1] leading-relaxed mb-7">{showcase.lead}</p>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-mono"
                style={{ background: '#0d0d1f', color: '#94a3b8', border: '1px solid #1e1e3f' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {showcase && (
            <div className="flex flex-wrap gap-3 mt-7">
              {showcase.demoUrl && (
                <a href={showcase.demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#0d9488] hover:bg-[#0f766e] text-white text-sm font-semibold px-5 py-3 transition-colors">
                  {showcase.demoLabel}
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#2a2a50] hover:border-[#2dd4bf] text-[#cbd5e1] hover:text-white text-sm font-semibold px-5 py-3 transition-colors">
                  {showcase.sourceLabel}
                </a>
              )}
            </div>
          )}
        </header>

        {showcase && (
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {showcase.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-[#1e1e3f] bg-[#0d0d1f] px-5 py-5">
                  <div className="text-2xl sm:text-3xl font-bold text-[#2dd4bf]">{metric.value}</div>
                  <div className="text-sm text-[#94a3b8] mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[#94a3b8] border-l-2 border-[#d4b44a] pl-4 max-w-3xl">{showcase.note}</p>
          </div>
        )}

        {/* Divider */}
        <div className="h-px mb-14" style={{ background: '#1e1e3f' }} />

        {/* Content sections */}
        <div className="max-w-3xl">
          <Section title={c.projectPage.overview} accent={accent}>
            <p>{project.overview}</p>
          </Section>
        </div>

        {showcase && (
          <section className="mb-14" aria-label={showcase.screenshotsHeading}>
            <h2 className="text-xl font-bold text-[#f1f5f9] mb-5">{showcase.screenshotsHeading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {showcase.screenshots.map((shot, index) => (
                <figure key={shot.src} className="rounded-xl overflow-hidden border border-[#1e1e3f] bg-[#0d0d1f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.alt} loading={index === 0 ? 'eager' : 'lazy'} className="w-full aspect-[16/10] object-cover" style={{ objectPosition: index === 0 ? 'center top' : 'center 75%' }} />
                  <figcaption className="px-5 py-4 text-sm leading-relaxed text-[#94a3b8]">{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <div className="max-w-3xl">
          <Section title={c.projectPage.challenge} accent={accent}>
            <p>{project.challenge}</p>
          </Section>

          <Section title={c.projectPage.solution} accent={accent}>
            <p>{project.solution}</p>
          </Section>
        </div>

        {showcase && (
          <section className="mb-14" aria-label={showcase.stepsHeading}>
            <h2 className="text-xl font-bold text-[#f1f5f9] mb-5">{showcase.stepsHeading}</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {showcase.steps.map((step, index) => (
                <li key={step.title} className="rounded-xl border border-[#1e1e3f] bg-[#0d0d1f] p-6">
                  <span className="text-lg font-mono font-semibold text-[#2dd4bf]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-base font-semibold text-[#f1f5f9] mt-4 mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#94a3b8]">{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <div className="max-w-3xl">
          <Section title={c.projectPage.results} accent={accent}>
            <p>{project.results}</p>
          </Section>
        </div>

        {showcase && (
          <section className="mb-14" aria-label={showcase.benefitsHeading}>
            <h2 className="text-xl font-bold text-[#f1f5f9] mb-5">{showcase.benefitsHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {showcase.benefits.map((benefit) => (
                <article key={benefit.title} className="rounded-xl border border-[#1e1e3f] bg-[#0d0d1f] p-5">
                  <h3 className="text-base font-semibold text-[#f1f5f9] mb-2">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-[#94a3b8]">{benefit.detail}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Screenshots */}
        {!showcase && project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#f1f5f9] mb-4 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full shrink-0 inline-block" style={{ background: accent }} />
              {c.projectPage.screenshots}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((shot) => (
                <figure
                  key={shot.src}
                  className="rounded-xl overflow-hidden border"
                  style={{ background: '#0d0d1f', borderColor: '#1e1e3f' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.caption} loading="lazy" className="w-full h-auto block" />
                  <figcaption className="text-xs px-4 py-3 text-[#94a3b8]">{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Stack */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#f1f5f9] mb-4 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full shrink-0 inline-block" style={{ background: accent }} />
            {c.projectPage.stack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-4 py-2 rounded-lg font-mono font-medium"
                style={{ background: accentDim, color: accent, border: `1px solid ${accentBorder}` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {showcase && (
          <div className="mb-12 rounded-xl border border-[#1e1e3f] bg-[#0d0d1f] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-[#f1f5f9] mb-1">
                {lang === 'en' ? 'Have a similar data problem?' : 'Tem um desafio de dados parecido?'}
              </h2>
              <p className="text-sm text-[#94a3b8]">
                {lang === 'en' ? 'Tell me about the workflow or reporting decision you want to improve.' : 'Conte qual fluxo ou decisão baseada em relatórios você quer melhorar.'}
              </p>
            </div>
            <Link href="/#contact" className="shrink-0 rounded-lg border border-[#0d9488] px-5 py-3 text-sm font-semibold text-[#2dd4bf] hover:bg-[#0d9488] hover:text-white transition-colors">
              {lang === 'en' ? 'Let’s talk →' : 'Vamos conversar →'}
            </Link>
          </div>
        )}

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: '#1e1e3f' }} />

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: accent }}
            >
              {c.projectPage.github} ↗
            </a>
          ) : (
            <span
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: '#0d0d1f', color: '#475569', border: '1px dashed #1e1e3f' }}
            >
              GitHub — {c.projectPage.comingSoon}
            </span>
          )}

          {project.linkedinUrl ? (
            <a
              href={project.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:border-[#8b5cf6] hover:text-[#f1f5f9]"
              style={{ border: '1px solid #1e1e3f', color: '#94a3b8', background: '#0d0d1f' }}
            >
              {c.projectPage.linkedin} ↗
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
