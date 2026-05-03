'use client';

import Link from 'next/link';
import { ProjectData } from '@/data/content';

interface ProjectCardProps {
  project: ProjectData;
  variant: 'real' | 'project';
  badge?: string;
}

const ACCENT = {
  real: { border: '#8b5cf6', badge: 'rgba(139,92,246,0.15)', badgeText: '#a78bfa', hover: 'hover-glow-purple' },
  project: { border: '#0d9488', badge: 'rgba(13,148,136,0.15)', badgeText: '#2dd4bf', hover: 'hover-glow-teal' },
};

export default function ProjectCard({ project, variant, badge }: ProjectCardProps) {
  const accent = ACCENT[variant];

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <article
        className={`card-transition rounded-xl h-full flex flex-col p-6 border cursor-pointer ${accent.hover}`}
        style={{
          background: '#0d0d1f',
          borderColor: '#1e1e3f',
          borderLeftColor: accent.border,
          borderLeftWidth: '3px',
        }}
      >
        {/* Top row: category badge + optional real-case badge */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: accent.badge, color: accent.badgeText }}
          >
            {project.category}
          </span>
          {badge && project.isReal && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(196,161,53,0.15)', color: '#d4b44a' }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-base font-semibold leading-snug mb-3 text-[#f1f5f9] group-hover:text-white transition-colors"
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#94a3b8] leading-relaxed flex-1 mb-5">
          {project.cardDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ background: '#12122a', color: '#475569', border: '1px solid #1e1e3f' }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ color: '#475569' }}>
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Arrow CTA */}
        <div
          className="flex items-center gap-1 text-xs font-semibold mt-auto transition-colors"
          style={{ color: accent.border }}
        >
          <span>View project</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </article>
    </Link>
  );
}
