"use client";

import { Button } from "@/components/ui/Button";
import { heroCopy } from "@/content/site-copy";

/** Content only — no id/section/Reveal. Composed as a scene by IntroSequence. */
export function Hero() {
  return (
    <div className="section-shell w-full py-0">
      <h1
        data-el="headline"
        className="max-w-4xl font-display text-hero font-medium leading-[1.02] text-fg-primary"
      >
        {heroCopy.headline}
      </h1>
      <p
        data-el="subheadline"
        className="mt-7 max-w-xl text-lg text-fg-muted md:text-xl"
      >
        {heroCopy.subheadline}
      </p>
      <div data-el="cta-group" className="mt-10 flex flex-wrap items-center gap-4">
        <Button cta={heroCopy.ctaPrimary} variant="primary" />
        <Button cta={heroCopy.ctaSecondary} variant="secondary" />
      </div>
    </div>
  );
}
