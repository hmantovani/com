// Section heading: mono eyebrow, serif title, optional lead, set on a 12-column grid.
export default function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-12 md:gap-8 items-end" data-reveal>
      <div className="md:col-span-7">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-section mt-5 text-ink">{title}</h2>
      </div>
      {lead && <p className="md:col-span-4 md:col-start-9 text-[0.97rem] leading-relaxed text-ink-3">{lead}</p>}
    </div>
  );
}
