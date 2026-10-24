'use client';

import Logo from './Logo';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import { EMAIL, SOCIAL_LINKS } from '@/data/site';

export default function Footer() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <footer className="border-t border-line mt-auto">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo />
            <p className="mt-3 text-sm text-ink-3 max-w-xs">{c.hero.title}</p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-3">{c.contact.socialHeading}</p>
            <ul className="space-y-1.5 text-sm">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw text-ink-2 hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-3">{c.nav.contact}</p>
            <a href={`mailto:${EMAIL}`} className="link-draw text-sm text-ink-2 hover:text-ink break-all">
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-3 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Henrique Mantovani</span>
          <span className="flex items-center gap-5">
            <span>{lang === 'en' ? 'Set in Newsreader and Geist' : 'Composto em Newsreader e Geist'}</span>
            <a href="#main" className="link-draw text-ink-2 hover:text-ink">
              {lang === 'en' ? 'Back to top ↑' : 'Voltar ao topo ↑'}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
