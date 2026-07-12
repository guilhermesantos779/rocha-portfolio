"use client";

import { gsap } from "@/lib/gsap";
import { PinnedComposition } from "@/components/pinned/PinnedComposition";
import type { PinnedSceneConfig } from "@/components/pinned/types";
import { HeroSceneCanvas } from "@/components/scene/HeroSceneCanvas";
import { Hero } from "./Hero";
import { Sobre } from "./Sobre";
import { OQueEuFaco } from "./OQueEuFaco";

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
  { key: "hero", content: <Hero />, dwell: 0.9, internal: heroInternal },
  {
    key: "sobre",
    content: <Sobre />,
    dwell: 2.2,
    internal: sobreInternal,
    enterFromSide: "right",
    exitToSide: "left",
  },
  {
    key: "o-que-eu-faco",
    content: <OQueEuFaco />,
    dwell: 1.4,
    internal: oQueEuFacoInternal,
    enterFromSide: "right",
    exitToSide: "left",
  },
];

// The 3D scene persists through Hero, starts dimming as Sobre settles in,
// and is fully gone by the time O que eu faço takes over.
const backgroundFades = [
  { boundary: "hero->sobre", autoAlpha: 0.4 },
  { boundary: "sobre->o-que-eu-faco", autoAlpha: 0 },
];

/** Hero → Sobre → O que eu faço as one continuous pinned composition (Group A). */
export function IntroSequence() {
  return (
    <PinnedComposition
      id="intro"
      scenes={scenes}
      background={<HeroSceneCanvas />}
      backgroundFades={backgroundFades}
    />
  );
}
