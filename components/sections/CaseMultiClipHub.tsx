import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { caseMultiClipHub } from "@/content/site-copy";

const SUBSECTIONS = [
  { label: "Problema", text: caseMultiClipHub.problema },
  { label: "Solução", text: caseMultiClipHub.solucao },
  { label: "Onde está agora", text: caseMultiClipHub.ondeEsta },
];

/** Scene 1 of the Case MultiClipHub composition — tag + title only. */
export function CaseIntro() {
  return (
    <div className="section-shell w-full py-0">
      <div data-el="tag">
        <Tag>{caseMultiClipHub.tag}</Tag>
      </div>
      <h2
        data-el="title"
        className="mt-6 max-w-3xl font-display text-hero font-medium leading-[1.05] text-fg-primary"
      >
        {caseMultiClipHub.title}
      </h2>
    </div>
  );
}

/** Scene 2 — Problema/Solução/Onde está agora + metric + CTA. */
export function CaseBreakdown() {
  return (
    <div className="section-shell w-full py-0">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {SUBSECTIONS.map((section) => (
          <div key={section.label} data-el="column">
            <h3 className="font-display text-h3 font-medium text-accent">{section.label}</h3>
            <p className="mt-3 text-sm text-fg-muted md:text-base">{section.text}</p>
          </div>
        ))}
      </div>

      {caseMultiClipHub.metric && (
        <div data-el="metric" className="mt-10 font-display text-5xl text-fg-primary">
          <Counter
            value={caseMultiClipHub.metric.value}
            suffix={caseMultiClipHub.metric.suffix}
          />
          <p className="mt-2 text-base text-fg-muted">{caseMultiClipHub.metric.label}</p>
        </div>
      )}

      <div data-el="cta" className="mt-10">
        <Button cta={caseMultiClipHub.cta} variant="primary" />
      </div>
    </div>
  );
}
