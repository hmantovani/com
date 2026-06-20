import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 — Prediction Model | Henrique Mantovani',
  description:
    'A round-by-round statistical prediction model for the 2026 World Cup. Poisson + Elo ensemble trained on 48,000+ international matches, re-run after every stage.',
};

export default function WorldCup2026Layout({ children }: { children: React.ReactNode }) {
  return children;
}
