import Link from 'next/link';

// Typographic monogram. The HMV badge stays as the favicon.
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex items-baseline gap-1.5 select-none text-ink"
      aria-label="Henrique Mantovani, home"
    >
      <span className="font-serif text-[1.6rem] leading-none tracking-[-0.02em]">HM</span>
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 ease-out-soft group-hover:scale-150"
      />
    </Link>
  );
}
