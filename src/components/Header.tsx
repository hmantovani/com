'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

function LangSwitch() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center font-mono text-[0.72rem] tracking-[0.08em] uppercase" role="group" aria-label="Language">
      {(['en', 'pt'] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-ink-4 px-0.5" aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`px-1.5 py-2 transition-colors ${lang === l ? 'text-ink' : 'text-ink-4 hover:text-ink-2'}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Header() {
  const { lang } = useLanguage();
  const c = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the menu is open; links close it on click.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { label: c.realCases, href: '/#work' },
    { label: c.projects, href: '/#projects' },
    { label: c.services, href: '/#services' },
    { label: c.about, href: '/#about' },
    { label: c.contact, href: '/#contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 border-b ${
        scrolled || open ? 'bg-bg/85 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden md:flex items-center gap-7" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link-draw text-[0.9rem] text-ink-2 hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LangSwitch />
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden h-10 pl-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? c.close : c.menu}
          </button>
        </div>
      </div>

      {/* Mobile menu: full-height sheet with large serif links */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-bg transition-[opacity,visibility] duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col px-5 pt-6" aria-label="Mobile">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-4 font-serif text-[2rem] leading-tight text-ink transition-[opacity,transform] duration-500 ease-out-soft"
              style={{
                transitionDelay: open ? `${60 + i * 45}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(10px)',
              }}
            >
              {l.label}
              <span className="font-mono text-xs text-ink-4">0{i + 1}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
