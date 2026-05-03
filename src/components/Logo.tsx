'use client';

import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group select-none">
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0"
        style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #0d9488 100%)' }}
      >
        HM
      </div>
      <span className="font-mono text-base font-semibold tracking-tight">
        <span style={{ color: '#8b5cf6' }}>h</span>
        <span style={{ color: '#0d9488' }}>m</span>
        <span className="text-[#f1f5f9]">antovani</span>
      </span>
    </Link>
  );
}
