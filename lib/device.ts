"use client";

import { useSyncExternalStore } from "react";
import { BREAKPOINTS } from "./breakpoints";

export type DeviceTier = "low" | "mid" | "high";

const TIER_NODE_COUNT: Record<DeviceTier, number> = {
  low: 80,
  mid: 220,
  high: 380,
};

function computeTier(): DeviceTier {
  const cores = navigator.hardwareConcurrency ?? 4;
  const width = window.innerWidth;

  if (width < BREAKPOINTS.mobile || cores <= 4) return "low";
  if (width < BREAKPOINTS.tablet || cores <= 6) return "mid";
  return "high";
}

function subscribeToResize(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

/** Coarse device-capability heuristic used to size the hero scene's node count. */
export function useDeviceTier(): { tier: DeviceTier; nodeCount: number } {
  const tier = useSyncExternalStore(
    subscribeToResize,
    computeTier,
    () => "mid" as DeviceTier
  );

  return { tier, nodeCount: TIER_NODE_COUNT[tier] };
}

function subscribeToFinePointer(onStoreChange: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

/** True when the device has a precise pointer (mouse/trackpad) — gates the custom cursor. */
export function useHasFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    () => false
  );
}
