import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 — Prediction Model | Henrique Mantovani',
  description:
    'A stage-by-stage statistical prediction model for the 2026 World Cup. Poisson + Elo ensemble trained on 48,000+ international matches, re-simulated after every stage — eight snapshots from kickoff to the Final, with scoreline probabilities and an honest scorecard.',
};

export default function WorldCup2026Layout({ children }: { children: React.ReactNode }) {
  return children;
}
