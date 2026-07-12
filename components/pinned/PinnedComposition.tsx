"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { usePinnedComposition, type BackgroundFade } from "./usePinnedComposition";
import { useIsBelowPinBreakpoint } from "./useIsBelowPinBreakpoint";
import { PinnedCompositionContext } from "./PinnedCompositionContext";
import { Reveal } from "@/components/reveal/Reveal";
import type { PinnedSceneConfig } from "./types";

interface PinnedCompositionProps {
  id: string;
  scenes: PinnedSceneConfig[];
  background?: ReactNode;
  backgroundFades?: BackgroundFade[];
  transitionDuration?: number;
  className?: string;
}

export function PinnedComposition(props: PinnedCompositionProps) {
  const isFallback = useIsBelowPinBreakpoint();
  return isFallback ? (
    <MobileFallback key="mobile" {...props} />
  ) : (
    <DesktopPinned key="desktop" {...props} />
  );
}

function DesktopPinned({
  id,
  scenes,
  background,
  backgroundFades,
  transitionDuration,
  className = "",
}: PinnedCompositionProps) {
  const progressRef = useRef(0);
  const { pinRef, bgRef, sceneRefs } = usePinnedComposition({
    scenes,
    transitionDuration,
    backgroundFades,
    onProgress: (p) => {
      progressRef.current = p;
    },
  });

  return (
    <PinnedCompositionContext.Provider value={{ progressRef }}>
      <section
        id={id}
        ref={pinRef}
        className={`relative h-screen w-full overflow-hidden ${className}`}
      >
        {background && (
          <div ref={bgRef} className="absolute inset-0 -z-10">
            {background}
          </div>
        )}
        {scenes.map((scene, i) => (
          <div
            key={scene.key}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className={`absolute inset-0 flex items-center ${
              i === 0 ? "" : "invisible pointer-events-none opacity-0"
            }`}
            style={{ willChange: "opacity, transform" }}
          >
            {scene.content}
          </div>
        ))}
      </section>
    </PinnedCompositionContext.Provider>
  );
}

function MobileFallback({ id, scenes, background, className = "" }: PinnedCompositionProps) {
  return (
    <div id={id} className={className}>
      {scenes.map((scene, i) => (
        <Reveal
          key={scene.key}
          preset="fadeUp"
          className={`relative flex min-h-screen items-center ${
            i === 0 ? "overflow-hidden" : ""
          }`}
        >
          {i === 0 && background && (
            <div className="absolute inset-0 -z-10">{background}</div>
          )}
          {scene.content}
        </Reveal>
      ))}
    </div>
  );
}
