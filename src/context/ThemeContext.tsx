'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

// The theme lives on <html data-theme>, set before paint by the boot script
// in layout.tsx. React reads it as an external store.
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
}
const getSnapshot = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
const getServerSnapshot = (): Theme => 'light';

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-switching');
    root.dataset.theme = next;
    try { localStorage.setItem('hm-theme', next); } catch {}
    window.setTimeout(() => root.classList.remove('theme-switching'), 400);
  }, []);

  return { theme, toggleTheme };
}

// Follow the system setting until the visitor picks a theme themselves.
export function useSystemThemeSync() {
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onSystem = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try { stored = localStorage.getItem('hm-theme'); } catch {}
      if (!stored) document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
    };
    mq.addEventListener('change', onSystem);
    return () => mq.removeEventListener('change', onSystem);
  }, []);
}
