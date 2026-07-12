"use client";

import { Canvas } from "@react-three/fiber";
import { NetworkField } from "./NetworkField";

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      <NetworkField />
    </Canvas>
  );
}
