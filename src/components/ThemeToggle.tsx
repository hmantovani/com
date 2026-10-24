'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

// A half-filled disc: the filled half turns with the theme.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();
  const t = content[lang].nav.theme;
  const label = theme === 'dark' ? t.toLight : t.toDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center text-ink-2 hover:text-ink transition-colors"
    >
      <svg
        viewBox="0 0 20 20"
        width="18"
        height="18"
        aria-hidden="true"
        className="transition-transform duration-700 ease-out-soft"
        style={{ transform: theme === 'dark' ? 'rotate(180deg)' : 'none' }}
      >
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
