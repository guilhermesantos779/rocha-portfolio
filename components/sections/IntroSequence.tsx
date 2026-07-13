"use client";

import { gsap } from "@/lib/gsap";
import { PinnedComposition } from "@/components/pinned/PinnedComposition";
import type { PinnedSceneConfig } from "@/components/pinned/types";
import { HeroSceneCanvas } from "@/components/scene/HeroSceneCanvas";
import { Hero } from "./Hero";
import { Sobre } from "./Sobre";
import { OQueEuFaco } from "./OQueEuFaco";
import { HERO_DWELL, TRANSITION_DURATION, SOBRE_DWELL, O_QUE_EU_FACO_DWELL } from "./introTimeline";

function heroInternal(el: HTMLElement) {
  const headline = el.querySelector('[data-el="headline"]');
  const subheadline = el.querySelector('[data-el="subheadline"]');
  const ctaGroup = el.querySelector('[data-el="cta-group"]');
  return gsap
    .timeline()
    .fromTo(headline, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0)
    .fromTo(subheadline, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.15)
    .fromTo(ctaGroup, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.3);
}

function sobreInternal(el: HTMLElement) {
  const eyebrow = el.querySelector('[data-el="eyebrow"]');
  const heading = el.querySelector('[data-el="heading"]');
  const paragraphs = el.querySelectorAll('[data-el="paragraph"]');
  return gsap
    .timeline()
    .fromTo(eyebrow, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0)
    .fromTo(heading, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.08)
    .fromTo(
      paragraphs,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.32 },
      0.35
    );
}

function oQueEuFacoInternal(el: HTMLElement) {
  const eyebrow = el.querySelector('[data-el="eyebrow"]');
  const heading = el.querySelector('[data-el="heading"]');
  const pillarEls = el.querySelectorAll('[data-el="pillar"]');
  return gsap
    .timeline()
    .fromTo(eyebrow, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0)
    .fromTo(heading, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.08)
    .fromTo(
      pillarEls,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.15 },
      0.3
    );
}

const scenes: PinnedSceneConfig[] = [
  { key: "hero", content: <Hero />, dwell: HERO_DWELL, internal: heroInternal },
  {
    key: "sobre",
    content: <Sobre />,
    dwell: SOBRE_DWELL,
    internal: sobreInternal,
    enterFromSide: "right",
    exitToSide: "left",
  },
  {
    key: "o-que-eu-faco",
    content: <OQueEuFaco />,
    dwell: O_QUE_EU_FACO_DWELL,
    internal: oQueEuFacoInternal,
    enterFromSide: "right",
    exitToSide: "left",
  },
];

// The particle portrait owns its own scroll-driven dissolve (see
// ParticlePortrait's uDissolve, gated to this same hero->sobre boundary via
// the shared introTimeline constants) — no DOM-level backgroundFades needed
// here anymore.

/** Hero → Sobre → O que eu faço as one continuous pinned composition (Group A). */
export function IntroSequence() {
  return (
    <PinnedComposition
      id="intro"
      scenes={scenes}
      background={<HeroSceneCanvas />}
      transitionDuration={TRANSITION_DURATION}
    />
  );
}
