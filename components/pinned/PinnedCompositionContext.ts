"use client";

import { createContext, useContext, type RefObject } from "react";

export interface PinnedCompositionContextValue {
  progressRef: RefObject<number>;
}

export const PinnedCompositionContext =
  createContext<PinnedCompositionContextValue | null>(null);

const STATIC_ZERO_REF: RefObject<number> = { current: 0 };

/** Reads the enclosing PinnedComposition's [0,1] scroll progress; 0 outside of one. */
export function useCompositionProgress(): RefObject<number> {
  const ctx = useContext(PinnedCompositionContext);
  return ctx ? ctx.progressRef : STATIC_ZERO_REF;
}
