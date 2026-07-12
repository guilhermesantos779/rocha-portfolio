import { Reveal, RevealGroup } from "@/components/reveal/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stackTecnica } from "@/content/stack";

export function StackTecnica() {
  return (
    <section id="stack-tecnica" className="section-shell">
      <Reveal preset="fadeUp">
        <SectionHeading eyebrow="Stack técnica" title="Com o que eu construo" />
      </Reveal>
      <RevealGroup
        preset="fadeIn"
        stagger={0.05}
        className="mt-12 flex flex-wrap gap-3"
      >
        {stackTecnica.map((item) => (
          <span
            key={item.label}
            className="rounded-full border border-fg-subtle/30 px-5 py-2.5 text-sm text-fg-primary"
          >
            {item.label}
          </span>
        ))}
      </RevealGroup>
    </section>
  );
}
