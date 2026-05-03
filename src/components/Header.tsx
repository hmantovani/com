'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const c = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: c.home, href: '/' },
    { label: c.realCases, href: '/#real-cases' },
    { label: c.projects, href: '/#projects' },
    { label: c.contact, href: '/#contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1e1e3f' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#94a3b8] hover:text-[#f1f5f9] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div
            className="flex items-center rounded-full p-0.5 gap-0.5"
            style={{ background: '#1e1e3f' }}
          >
            {(['en', 'pt'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: lang === l ? '#8b5cf6' : 'transparent',
                  color: lang === l ? '#fff' : '#94a3b8',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="w-5 h-0.5 bg-[#94a3b8] block transition-all duration-200"
              style={{ transform: mobileOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}
            />
            <span
              className="w-5 h-0.5 bg-[#94a3b8] block transition-all duration-200"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="w-5 h-0.5 bg-[#94a3b8] block transition-all duration-200"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: 'rgba(8,8,15,0.97)', borderColor: '#1e1e3f' }}
        >
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#94a3b8] hover:text-[#f1f5f9] transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
