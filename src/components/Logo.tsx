'use client';

import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group select-none">
      <div
        className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #0d9488 100%)' }}
      >
        <span className="text-[11px] font-black tracking-tight leading-none" style={{ color: '#c4a135' }}>HMV</span>
      </div>
      <span className="font-mono text-base font-semibold tracking-tight">
        <span style={{ color: '#8b5cf6' }}>h</span>
        <span style={{ color: '#2dd4bf' }}>m</span>
        <span style={{ color: '#c4a135' }}>antovani</span>
      </span>
    </Link>
  );
}
