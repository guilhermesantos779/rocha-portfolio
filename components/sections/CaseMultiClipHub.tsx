import { Reveal, RevealGroup } from "@/components/reveal/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { caseMultiClipHub } from "@/content/site-copy";

const SUBSECTIONS = [
  { label: "Problema", text: caseMultiClipHub.problema },
  { label: "Solução", text: caseMultiClipHub.solucao },
  { label: "Onde está agora", text: caseMultiClipHub.ondeEsta },
];

export function CaseMultiClipHub() {
  return (
    <section
      id="multiclip-case"
      className="section-shell border-y border-fg-subtle/20 bg-bg-elevated"
    >
      <Reveal preset="fadeUp">
        <Tag>{caseMultiClipHub.tag}</Tag>
        <h2 className="mt-6 max-w-3xl font-display text-h2 font-medium leading-[1.05] text-fg-primary">
          {caseMultiClipHub.title}
        </h2>
      </Reveal>

      <RevealGroup
        preset="fadeUp"
        stagger={0.15}
        className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
      >
        {SUBSECTIONS.map((section) => (
          <div key={section.label}>
            <h3 className="font-display text-h3 font-medium text-accent">
              {section.label}
            </h3>
            <p className="mt-3 text-fg-muted">{section.text}</p>
          </div>
        ))}
      </RevealGroup>

      {caseMultiClipHub.metric && (
        <Reveal preset="fadeIn" className="mt-14">
          <div className="font-display text-5xl text-fg-primary">
            <Counter
              value={caseMultiClipHub.metric.value}
              suffix={caseMultiClipHub.metric.suffix}
            />
          </div>
          <p className="mt-2 text-fg-muted">{caseMultiClipHub.metric.label}</p>
        </Reveal>
      )}

      <Reveal preset="fadeUp" className="mt-14">
        <Button cta={caseMultiClipHub.cta} variant="primary" />
      </Reveal>
    </section>
  );
}
