"use client";

import { useEffect, useRef } from "react";

/** Normalized pointer position in [-1, 1], updated on the window — read from useFrame. */
export function useMouseParallax() {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return target;
}
