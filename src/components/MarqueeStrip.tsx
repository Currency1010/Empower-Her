type MarqueeStripProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
  speed?: "fast" | "normal" | "slow";
};

export default function MarqueeStrip({
  items,
  className = "",
  itemClassName = "",
  speed = "normal",
}: MarqueeStripProps) {
  const repeated = [...items, ...items];

  return (
    <div className={`marquee-root overflow-hidden ${className}`}>
      <div className={`marquee-track ${speed} flex min-w-max items-center gap-8 whitespace-nowrap`}>
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] ${itemClassName}`}
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
