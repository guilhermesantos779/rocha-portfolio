import { Reveal, RevealGroup } from "@/components/reveal/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sobreCopy } from "@/content/site-copy";

export function Sobre() {
  return (
    <section id="sobre" className="section-shell">
      <Reveal preset="fadeUp">
        <SectionHeading eyebrow="Sobre mim" title="Quem constrói isso aqui" />
      </Reveal>
      <RevealGroup
        preset="fadeUp"
        stagger={0.1}
        className="mt-10 flex max-w-3xl flex-col gap-6"
      >
        {sobreCopy.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-fg-muted">
            {paragraph}
          </p>
        ))}
      </RevealGroup>
    </section>
  );
}
