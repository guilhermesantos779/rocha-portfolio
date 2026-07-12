"use client";

import dynamic from "next/dynamic";

// The only import boundary into the R3F tree — keeps the entire /scene
// subtree out of the server render (WebGL needs `window`/`document`).
const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-base" />,
});

export function HeroSceneCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <HeroScene />
    </div>
  );
}
