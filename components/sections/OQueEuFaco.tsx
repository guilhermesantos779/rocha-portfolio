import { Reveal, RevealGroup } from "@/components/reveal/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/content/site-copy";

export function OQueEuFaco() {
  return (
    <section id="o-que-eu-faco" className="section-shell">
      <Reveal preset="fadeUp">
        <SectionHeading eyebrow="O que eu faço" title="Três frentes, um raciocínio" />
      </Reveal>
      <RevealGroup
        preset="fadeUp"
        stagger={0.12}
        className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
      >
        {pillars.map((pillar) => (
          <div key={pillar.number} className="border-t border-fg-subtle/30 pt-6">
            <span className="font-display text-3xl text-accent">
              {pillar.number}
            </span>
            <h3 className="mt-4 font-display text-h3 font-medium text-fg-primary">
              {pillar.title}
            </h3>
            <p className="mt-3 text-fg-muted">{pillar.description}</p>
          </div>
        ))}
      </RevealGroup>
    </section>
  );
}
