// Country flag from flagcdn.com (free CDN, ISO 3166-1 alpha-2 + gb-eng/gb-sct).
// Plain <img> avoids next/image remote-domain config and keeps the page static.

interface FlagProps {
  iso2: string;
  size?: number; // rendered height in px
  className?: string;
  title?: string;
}

export default function Flag({ iso2, size = 16, className = '', title }: FlagProps) {
  // flagcdn width buckets; pick the smallest >= 2x height for crispness.
  const w = size <= 12 ? 40 : size <= 20 ? 40 : size <= 30 ? 80 : 160;
  return (
    <img
      src={`https://flagcdn.com/w${w}/${iso2}.png`}
      srcSet={`https://flagcdn.com/w${w * 2}/${iso2}.png 2x`}
      alt={title ?? iso2}
      title={title}
      loading="lazy"
      className={`inline-block rounded-[2px] object-cover shrink-0 ${className}`}
      style={{ height: size, width: size * 1.5 }}
    />
  );
}
