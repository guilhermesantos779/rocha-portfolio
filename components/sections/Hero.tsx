"use client";

import { HeroSceneCanvas } from "@/components/scene/HeroSceneCanvas";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/reveal/Reveal";
import { heroCopy } from "@/content/site-copy";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-0 flex min-h-screen items-center overflow-hidden"
    >
      <HeroSceneCanvas />
      <div className="relative z-10 section-shell w-full py-0">
        <Reveal preset="fadeUp" duration={1.1}>
          <h1 className="max-w-4xl font-display text-hero font-medium leading-[1.02] text-fg-primary">
            {heroCopy.headline}
          </h1>
        </Reveal>
        <Reveal preset="fadeUp" delay={0.15} duration={1}>
          <p className="mt-7 max-w-xl text-lg text-fg-muted md:text-xl">
            {heroCopy.subheadline}
          </p>
        </Reveal>
        <Reveal preset="fadeUp" delay={0.3} duration={1}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button cta={heroCopy.ctaPrimary} variant="primary" />
            <Button cta={heroCopy.ctaSecondary} variant="secondary" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
