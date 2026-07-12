import type { gsap } from "@/lib/gsap";

export type RevealPreset = "fadeUp" | "fadeIn" | "stagger";

export interface RevealPresetConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

export function getPresetConfig(
  preset: RevealPreset,
  overrides: { y?: number; duration?: number } = {}
): RevealPresetConfig {
  const y = overrides.y ?? 40;
  const duration = overrides.duration ?? 1;

  switch (preset) {
    case "fadeIn":
      return {
        from: { autoAlpha: 0 },
        to: { autoAlpha: 1, duration, ease: "power2.out" },
      };
    case "stagger":
    case "fadeUp":
    default:
      return {
        from: { autoAlpha: 0, y },
        to: { autoAlpha: 1, y: 0, duration, ease: "power3.out" },
      };
  }
}
