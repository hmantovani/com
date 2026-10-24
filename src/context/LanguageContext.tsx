'use client';

import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';

export type Lang = 'en' | 'pt';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// The chosen language is kept in localStorage; React reads it as an external store.
const listeners = new Set<() => void>();
function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}
function getSnapshot(): Lang {
  try { return localStorage.getItem('hm-lang') === 'pt' ? 'pt' : 'en'; } catch { return 'en'; }
}
const getServerSnapshot = (): Lang => 'en';

function setLang(newLang: Lang) {
  try { localStorage.setItem('hm-lang', newLang); } catch {}
  document.documentElement.lang = newLang === 'pt' ? 'pt-BR' : 'en';
  listeners.forEach((l) => l());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
