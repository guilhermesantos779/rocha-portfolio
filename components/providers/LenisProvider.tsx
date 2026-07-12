"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type Lenis from "lenis";
import { createLenis } from "@/lib/lenis";
import { syncLenisWithScrollTrigger } from "@/lib/scrollSync";
import { ScrollTrigger } from "@/lib/gsap";

// A ref, not state: consumers only need the instance inside click handlers
// (useLenisScrollTo), never during render, so there's no reason to trigger
// a re-render once the instance is created on mount.
const LenisContext = createContext<React.RefObject<Lenis | null> | null>(null);

/** Smoothly scrolls to a target selector/element via Lenis instead of native anchor jump. */
export function useLenisScrollTo() {
  const ref = useContext(LenisContext);

  return (target: string | HTMLElement, offset = 0) => {
    const lenis = ref?.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.2 });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    const instance = createLenis();
    lenisRef.current = instance;
    cleanupRef.current = syncLenisWithScrollTrigger(instance);

    return () => {
      cleanupRef.current();
      instance.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
