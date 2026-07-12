"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";

/** Tracks the hero section's scroll progress [0,1] via the same Lenis-synced ScrollTrigger. */
export function useScrollParallax(sectionSelector = "#hero") {
  const progress = useRef(0);

  useEffect(() => {
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionSelector,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
    });

    return () => ctx.revert();
  }, [sectionSelector]);

  return progress;
}
