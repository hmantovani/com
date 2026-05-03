'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { content, ProjectData } from '@/data/content';
import { use } from 'react';

const ALL_SLUGS = [
  'sap-pipeline-automation',
  'market-intelligence',
  'sql-sales-analytics',
  'rest-api-pipeline',
  'eda-predictive-model',
  'interactive-data-app',
];

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

  if (!ALL_SLUGS.includes(slug)) notFound();

  const found = findProject(slug, lang);
  if (!found) notFound();
  const { project, isReal } = found;

  const accent = isReal ? '#8b5cf6' : '#0d9488';
  const accentDim = isReal ? 'rgba(139,92,246,0.1)' : 'rgba(13,148,136,0.1)';
  const accentBorder = isReal ? 'rgba(139,92,246,0.3)' : 'rgba(13,148,136,0.3)';

  return (
    <div className="min-h-screen">
      {/* Top gradient bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#94a3b8] transition-colors mb-10 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          {c.projectPage.back.replace('← ', '')}
        </Link>

        {/* Header */}
        <header className="mb-14">
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
        </header>

        {/* Divider */}
        <div className="h-px mb-14" style={{ background: '#1e1e3f' }} />

        {/* Content sections */}
        <Section title={c.projectPage.overview} accent={accent}>
          <p>{project.overview}</p>
        </Section>

        <Section title={c.projectPage.challenge} accent={accent}>
          <p>{project.challenge}</p>
        </Section>

        <Section title={c.projectPage.solution} accent={accent}>
          <p>{project.solution}</p>
        </Section>

        <Section title={c.projectPage.results} accent={accent}>
          <p>{project.results}</p>
        </Section>

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
