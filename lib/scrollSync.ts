import type Lenis from "lenis";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "./gsap";

/**
 * Wires a Lenis instance into GSAP's ticker/ScrollTrigger so both systems
 * share a single scroll source of truth. Returns a cleanup function.
 */
export function syncLenisWithScrollTrigger(lenis: Lenis): () => void {
  ensureGsapPlugins();

  const onLenisScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onLenisScroll);

  const onTick = (time: number) => {
    // gsap.ticker reports time in seconds; Lenis expects milliseconds
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(onTick);

  // avoids a visible jump when the tab regains focus after being backgrounded
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(onTick);
    lenis.off("scroll", onLenisScroll);
  };
}
