'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group select-none">
      <Image
        src="/hmv.png"
        alt="HMV"
        width={48}
        height={36}
        className="shrink-0"
      />
      <span className="font-mono text-base font-semibold tracking-tight">
        <span style={{ color: '#8b5cf6' }}>h</span>
        <span style={{ color: '#56a0c8' }}>m</span>
        <span style={{ color: '#ffffff' }}>anto</span>
        <span style={{ color: '#2dd4bf' }}>v</span>
        <span style={{ color: '#ffffff' }}>ani</span>
      </span>
    </Link>
  );
}
