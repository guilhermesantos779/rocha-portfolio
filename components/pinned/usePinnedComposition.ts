"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";
import type { PinnedSceneConfig } from "./types";

export interface BackgroundFade {
  /** A boundary label produced as `${sceneKey}->${nextSceneKey}`. */
  boundary: string;
  autoAlpha: number;
}

interface UsePinnedCompositionOptions {
  scenes: PinnedSceneConfig[];
  transitionDuration?: number;
  backgroundFades?: BackgroundFade[];
  onProgress?: (progress: number) => void;
}

export function usePinnedComposition({
  scenes,
  transitionDuration = 0.45,
  backgroundFades,
  onProgress,
}: UsePinnedCompositionOptions) {
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const pinEl = pinRef.current;
    if (!pinEl) return;

    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const els = sceneRefs.current;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

      // Scene 0 is the landing view — it must be visible the instant the page
      // loads, before the user has scrolled at all. Its reveal plays once,
      // immediately, as a normal (non-scrubbed) timeline; only scrubbing it
      // into `tl` would leave it stuck at its hidden frame-0 state until the
      // user scrolls, since `tl` starts paused at scroll progress 0.
      const first = els[0];
      if (first) {
        gsap.set(first, { autoAlpha: 1, pointerEvents: "auto" });
        scenes[0].internal?.(first);
      }

      // Every tween below is positioned at an explicit absolute `cursor`
      // value rather than GSAP's default "append after the last-added item"
      // behavior. That default is based on insertion order, not visual
      // order — a nested `internal` timeline added at a label can itself run
      // long past that label, which would silently push every *subsequent*
      // untimed `.to()` far later than intended and inflate `tl.duration()`
      // (and therefore the pin's scroll distance) well beyond what the
      // dwell/transition numbers actually call for.
      let cursor = scenes[0]?.dwell ?? 1;

      for (let i = 0; i < scenes.length - 1; i++) {
        const scene = scenes[i];
        const next = scenes[i + 1];
        const el = els[i];
        const nextEl = els[i + 1];
        if (!el || !nextEl) continue;

        const boundary = `${scene.key}->${next.key}`;
        tl.addLabel(boundary, cursor);

        // OUTGOING and INCOMING tweens share the same position — both animate
        // concurrently for `transitionDuration`, so the two scenes are
        // genuinely visible together (a real crossfade), never a hard cut.
        tl.to(
          el,
          {
            autoAlpha: 0,
            xPercent: scene.exitToSide === "right" ? 8 : -8,
            pointerEvents: "none",
            duration: transitionDuration,
          },
          cursor
        );

        tl.fromTo(
          nextEl,
          { autoAlpha: 0, xPercent: next.enterFromSide === "right" ? 8 : -8 },
          {
            autoAlpha: 1,
            xPercent: 0,
            pointerEvents: "auto",
            duration: transitionDuration,
          },
          cursor
        );

        if (next.internal) {
          tl.add(next.internal(nextEl), cursor + transitionDuration * 0.6);
        }

        cursor += transitionDuration + (next.dwell ?? 1);
      }

      // pads tl.duration() out to the full intended length even when the
      // last scene has no `internal` timeline reaching that far itself
      tl.to({}, { duration: 0 }, cursor);

      if (bgRef.current && backgroundFades) {
        for (const fade of backgroundFades) {
          tl.to(bgRef.current, { autoAlpha: fade.autoAlpha }, fade.boundary);
        }
      }

      ScrollTrigger.create({
        trigger: pinEl,
        start: "top top",
        end: () => `+=${tl.duration() * window.innerHeight}`,
        pin: true,
        // GSAP disables pin-spacing by default when the pinned element's
        // parent is `display: flex` (our <main> is) — without forcing it on,
        // the pin engages but reserves zero extra scroll distance, so every
        // section after it collapses back to normal document flow instead
        // of waiting for the pin to finish.
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        onUpdate: (self) => onProgress?.(self.progress),
      });
    }, pinEl);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scene configs are static content, read once at mount (matches useScrollReveal's convention)
  }, []);

  return { pinRef, bgRef, sceneRefs };
}
