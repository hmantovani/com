'use client';

import Link from 'next/link';
import Logo from './Logo';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

const LINKS = {
  github: 'https://github.com/hmantovani',
  linkedin: 'https://www.linkedin.com/in/hmantovani/',
  upwork: 'https://www.upwork.com/freelancers/~011c4553024d9ba7cc',
};

export default function Footer() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: '#1e1e3f', background: '#08080f' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="text-sm text-[#475569] max-w-xs">
              {c.hero.title}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-[#94a3b8]">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-1">
              {c.contact.socialHeading}
            </span>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer"
              className="hover:text-[#8b5cf6] transition-colors">GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"
              className="hover:text-[#8b5cf6] transition-colors">LinkedIn</a>
            <a href={LINKS.upwork} target="_blank" rel="noopener noreferrer"
              className="hover:text-[#8b5cf6] transition-colors">Upwork</a>
          </div>

          <div className="flex flex-col gap-2 text-sm text-[#94a3b8]">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-1">
              Contact
            </span>
            <a href="mailto:contato@hmantovani.com"
              className="hover:text-[#8b5cf6] transition-colors">contato@hmantovani.com</a>
            <a href="mailto:hq.mantovani@gmail.com"
              className="hover:text-[#8b5cf6] transition-colors">hq.mantovani@gmail.com</a>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#475569]"
          style={{ borderColor: '#1e1e3f' }}
        >
          <span>{c.footer.rights}</span>
          <span>
            Built with{' '}
            <Link href="https://nextjs.org" target="_blank" className="hover:text-[#8b5cf6] transition-colors">
              Next.js
            </Link>
            {' '}+{' '}
            <Link href="https://tailwindcss.com" target="_blank" className="hover:text-[#8b5cf6] transition-colors">
              Tailwind CSS
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
