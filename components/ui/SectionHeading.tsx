interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-h2 font-medium leading-[1.05] text-fg-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-fg-muted">{subtitle}</p>
      )}
    </div>
  );
}
