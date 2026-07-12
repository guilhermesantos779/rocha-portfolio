import Lenis from "lenis";

export function createLenis(): Lenis {
  return new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // touch keeps native momentum scrolling — smoothing here would fight
    // the browser's own scroll-into-view/overscroll behavior on mobile
    syncTouch: false,
    autoRaf: false,
  });
}
