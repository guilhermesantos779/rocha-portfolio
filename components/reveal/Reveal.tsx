"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "./useScrollReveal";
import type { RevealPreset } from "./revealPresets";

interface RevealProps {
  children: ReactNode;
  preset?: RevealPreset;
  y?: number;
  duration?: number;
  delay?: number;
  className?: string;
  id?: string;
}

/** Wraps content that should fade/slide in once it scrolls into view. */
export function Reveal({
  children,
  preset,
  y,
  duration,
  delay,
  className = "",
  id,
}: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({ preset, y, duration, delay });
  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  stagger?: number;
  preset?: RevealPreset;
  className?: string;
}

/** Like <Reveal>, but staggers each direct child in one after another. */
export function RevealGroup({
  children,
  stagger = 0.12,
  preset = "fadeUp",
  className = "",
}: RevealGroupProps) {
  const ref = useScrollReveal<HTMLDivElement>({
    preset,
    stagger,
    childSelector: ":scope > *",
  });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
