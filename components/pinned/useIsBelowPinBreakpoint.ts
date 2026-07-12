"use client";

import { useSyncExternalStore } from "react";
import { BREAKPOINTS } from "@/lib/breakpoints";

function getQuery() {
  return `(max-width: ${BREAKPOINTS.mobile - 1}px), (prefers-reduced-motion: reduce)`;
}

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(getQuery());
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(getQuery()).matches;
}

/**
 * True on small viewports or when the user prefers reduced motion — gates pinning off.
 *
 * Defaults to `true` (the non-pinned fallback) until the real client value is
 * known. This is deliberate, not just a safe SSR placeholder: GSAP's
 * ScrollTrigger `pin: true` reparents the pinned element into a spacer div
 * outside React's fiber tree. If the desktop/pinned variant ever mounted
 * speculatively and got torn down a tick later (e.g. hydrating on an actual
 * mobile device, where this would briefly resolve `false` before correcting
 * to `true`), React's unmount and GSAP's DOM reparenting race and throw
 * `NotFoundError: removeChild`. Unmounting the *fallback* variant is always
 * safe (no pin, no reparenting), so biasing "unknown" toward fallback means
 * the one unavoidable mount→correct churn on first paint is always the safe
 * direction — worst case is a harmless one-tick flash of the fallback layout
 * on desktop before the pinned experience takes over.
 */
export function useIsBelowPinBreakpoint(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
