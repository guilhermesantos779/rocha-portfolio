import type { ReactNode } from "react";
import type { gsap } from "gsap";

export interface PinnedSceneConfig {
  key: string;
  content: ReactNode;
  /** Settled duration in timeline units (1 unit ≈ 1 viewport height of scroll). */
  dwell?: number;
  /** Builds this scene's internal reveal timeline once its DOM element exists. */
  internal?: (sceneEl: HTMLElement) => gsap.core.Timeline;
  enterFromSide?: "left" | "right";
  exitToSide?: "left" | "right";
}
