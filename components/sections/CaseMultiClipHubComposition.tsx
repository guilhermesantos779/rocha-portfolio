"use client";

import { gsap } from "@/lib/gsap";
import { PinnedComposition } from "@/components/pinned/PinnedComposition";
import type { PinnedSceneConfig } from "@/components/pinned/types";
import { CaseIntro, CaseBreakdown } from "./CaseMultiClipHub";

function introInternal(el: HTMLElement) {
  const tag = el.querySelector('[data-el="tag"]');
  const title = el.querySelector('[data-el="title"]');
  return gsap
    .timeline()
    .fromTo(tag, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0)
    .fromTo(title, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.1);
}

function breakdownInternal(el: HTMLElement) {
  const columns = el.querySelectorAll('[data-el="column"]');
  const metric = el.querySelector('[data-el="metric"]');
  const cta = el.querySelector('[data-el="cta"]');
  const tl = gsap.timeline();
  tl.fromTo(
    columns,
    { autoAlpha: 0, y: 24 },
    { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.15 },
    0
  );
  if (metric) {
    tl.fromTo(metric, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.4);
  }
  tl.fromTo(cta, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.55);
  return tl;
}

const scenes: PinnedSceneConfig[] = [
  { key: "case-intro", content: <CaseIntro />, dwell: 0.8, internal: introInternal },
  {
    key: "case-breakdown",
    content: <CaseBreakdown />,
    dwell: 1.3,
    internal: breakdownInternal,
    enterFromSide: "right",
    exitToSide: "left",
  },
];

/** Case MultiClipHub as a smaller, self-contained pinned composition (Group B). */
export function CaseMultiClipHubComposition() {
  return (
    <PinnedComposition
      id="multiclip-case"
      scenes={scenes}
      className="border-y border-fg-subtle/20 bg-bg-elevated"
    />
  );
}
