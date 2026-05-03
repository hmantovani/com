'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group select-none">
      <Image
        src="/hmv_square.png"
        alt="HMV"
        width={36}
        height={36}
        className="rounded-md shrink-0"
      />
      <span className="font-mono text-base font-semibold tracking-tight">
        <span style={{ color: '#8b5cf6' }}>h</span>
        <span style={{ color: '#2dd4bf' }}>m</span>
        <span style={{ color: '#c4a135' }}>antovani</span>
      </span>
    </Link>
  );
}
