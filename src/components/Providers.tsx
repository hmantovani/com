'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { useSystemThemeSync } from '@/context/ThemeContext';
import { ReactNode } from 'react';
import RevealObserver from './RevealObserver';

export default function Providers({ children }: { children: ReactNode }) {
  useSystemThemeSync();
  return (
    <LanguageProvider>
      <RevealObserver />
      {children}
    </LanguageProvider>
  );
}
