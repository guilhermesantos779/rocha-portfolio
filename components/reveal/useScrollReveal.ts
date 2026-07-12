"use client";

import { useEffect, useRef } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { getPresetConfig, type RevealPreset } from "./revealPresets";

export interface UseScrollRevealOptions {
  preset?: RevealPreset;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  /** When set, animates matched descendants (e.g. ":scope > *") instead of the root element. */
  childSelector?: string;
}

/**
 * Registers a single GSAP ScrollTrigger-driven entrance animation on an element,
 * scoped with gsap.context() so it cleans up correctly under fast refresh/StrictMode.
 * Every section should go through this hook (or <Reveal>) rather than creating its
 * own ScrollTrigger — keeps all scroll-position animation in one code path.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ensureGsapPlugins();

    const {
      preset = "fadeUp",
      y,
      duration,
      delay = 0,
      stagger,
      start = "top 80%",
      once = true,
      childSelector,
    } = options;

    const ctx = gsap.context(() => {
      const { from, to } = getPresetConfig(preset, { y, duration });
      const targets = childSelector ? el.querySelectorAll(childSelector) : el;

      gsap.fromTo(targets, from, {
        ...to,
        delay,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options read once at mount by design
  }, []);

  return ref;
}
