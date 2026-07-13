/**
 * Shared timing constants for the Hero → Sobre → O que eu faço pinned
 * composition (see IntroSequence.tsx). Also consumed by ParticlePortrait to
 * know exactly when, within the *overall* composition progress, the hero's
 * own dwell ends and its outgoing transition runs — so the particle
 * dissolve can be gated to that window instead of drifting from scroll
 * position 0, without duplicating magic numbers between the two files.
 */
export const HERO_DWELL = 0.9;
export const TRANSITION_DURATION = 0.45;
export const SOBRE_DWELL = 2.2;
export const O_QUE_EU_FACO_DWELL = 1.4;

export const INTRO_TOTAL_DURATION =
  HERO_DWELL + TRANSITION_DURATION + SOBRE_DWELL + TRANSITION_DURATION + O_QUE_EU_FACO_DWELL;

/** Composition progress [0,1] at which the hero's own dwell ends. */
export const HERO_DISSOLVE_START = HERO_DWELL / INTRO_TOTAL_DURATION;
/** Composition progress [0,1] at which the hero→sobre transition completes. */
export const HERO_DISSOLVE_END =
  (HERO_DWELL + TRANSITION_DURATION) / INTRO_TOTAL_DURATION;
