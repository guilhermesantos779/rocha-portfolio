import { pillars } from "@/content/site-copy";

/** Content only — no id/section/Reveal. Composed as a scene by IntroSequence. */
export function OQueEuFaco() {
  return (
    <div className="section-shell w-full py-0">
      <p data-el="eyebrow" className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
        O que eu faço
      </p>
      <h2
        data-el="heading"
        className="font-display text-h2 font-medium leading-[1.05] text-fg-primary"
      >
        Três frentes, um raciocínio
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.number} data-el="pillar" className="border-t border-fg-subtle/30 pt-5">
            <span className="font-display text-3xl text-accent">{pillar.number}</span>
            <h3 className="mt-3 font-display text-h3 font-medium text-fg-primary">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm text-fg-muted md:text-base">{pillar.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
