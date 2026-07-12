import { sobreCopy } from "@/content/site-copy";

/** Content only — no id/section/Reveal. Composed as a scene by IntroSequence. */
export function Sobre() {
  return (
    <div className="section-shell w-full max-w-3xl py-0">
      <p data-el="eyebrow" className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
        Sobre mim
      </p>
      <h2
        data-el="heading"
        className="font-display text-h2 font-medium leading-[1.05] text-fg-primary"
      >
        Quem constrói isso aqui
      </h2>
      <div className="mt-8 flex flex-col gap-3.5">
        {sobreCopy.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            data-el="paragraph"
            className="text-sm leading-relaxed text-fg-muted md:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
