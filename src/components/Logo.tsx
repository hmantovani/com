import Link from 'next/link';

// Typographic wordmark. The HMV badge stays as the favicon.
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex items-baseline gap-2 select-none text-ink"
      aria-label="Henrique Mantovani, home"
    >
      <span className="font-serif text-[1.15rem] leading-none tracking-[-0.01em]">
        Henrique Mantovani
      </span>
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-accent translate-y-[-1px] transition-transform duration-500 ease-out-soft group-hover:scale-150"
      />
    </Link>
  );
}
