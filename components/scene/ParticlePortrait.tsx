"use client";

/**
 * Imperative by design, same rationale as the old NetworkField: useFrame
 * runs a rAF loop outside React's render cycle, and the one-time random
 * scatter-position generation in the geometry useMemo is a setup cost, not
 * a per-render effect the React Compiler needs to reason about.
 */
/* eslint-disable react-hooks/purity */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceTier } from "@/lib/device";
import { useCompositionProgress } from "@/components/pinned/PinnedCompositionContext";
import {
  HERO_DISSOLVE_START,
  HERO_DISSOLVE_END,
} from "@/components/sections/introTimeline";
import { useMouseParallax } from "./useMouseParallax";
import { useParticleImage } from "./useParticleImage";

const PARTICLE_BUDGET: Record<"low" | "mid" | "high", number> = {
  low: 12000,
  mid: 30000,
  high: 60000,
};

const SAMPLE_TARGET: Record<"low" | "mid" | "high", number> = {
  low: 140,
  mid: 180,
  high: 220,
};

const vertexShader = /* glsl */ `
  attribute vec3 aHome;
  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute float aSeed;

  uniform float uProgress;
  uniform float uDissolve;
  uniform vec2 uMouse;
  uniform float uMouseRadius;
  uniform float uMouseStrength;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBaseSize;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 assembled = aHome;
    assembled.x += sin(uTime * 0.6 + aSeed * 6.2831) * 0.006;
    assembled.y += cos(uTime * 0.5 + aSeed * 6.2831) * 0.006;

    vec3 pos = mix(aScatter, assembled, uProgress);

    vec2 toParticle = pos.xy - uMouse;
    float dist = length(toParticle);
    float falloff = smoothstep(uMouseRadius, 0.0, dist);
    vec2 push = dist > 0.0001 ? normalize(toParticle) * falloff * uMouseStrength : vec2(0.0);
    pos.xy += push * uProgress;

    vec3 dissolveDir = normalize(aScatter - aHome + vec3(0.0001));
    pos += dissolveDir * uDissolve * 2.2;

    vAlpha = uProgress * (1.0 - uDissolve);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float size = uBaseSize * uPixelRatio * (7.0 / -mvPosition.z);
    gl_PointSize = clamp(size, 1.0, 14.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
    if (alpha <= 0.004) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function ParticlePortrait() {
  const { tier } = useDeviceTier();
  const mouse = useMouseParallax();
  const compositionProgress = useCompositionProgress();
  const { viewport } = useThree();

  const imageData = useParticleImage({
    src: "/hero/rocha-hero-original-color.jpg",
    maxSamples: SAMPLE_TARGET[tier],
    particleBudget: PARTICLE_BUDGET[tier],
  });

  const startTimeRef = useRef<number | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    if (!imageData) return null;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(imageData.homePositions.slice(), 3));
    geo.setAttribute("aHome", new THREE.BufferAttribute(imageData.homePositions, 3));
    geo.setAttribute("aScatter", new THREE.BufferAttribute(imageData.scatterPositions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(imageData.colors, 3));

    const seeds = new Float32Array(imageData.count);
    for (let i = 0; i < imageData.count; i++) seeds[i] = Math.random();
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    return geo;
  }, [imageData]);

  // Passed once to construct the material's uniform structure. Runtime
  // updates go through materialRef instead of this object: R3F copies
  // prop-supplied `uniforms` values into the material's own internal
  // uniforms structure rather than adopting this object by reference, so
  // mutating *this* object after mount never reaches the GPU.
  const initialUniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uDissolve: { value: 0 },
      uMouse: { value: new THREE.Vector2(9999, 9999) },
      uMouseRadius: { value: 1.6 },
      uMouseStrength: { value: 0.55 },
      uTime: { value: 0 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1,
      },
      uBaseSize: { value: 5.5 },
    }),
    []
  );

  useFrame((state) => {
    const material = materialRef.current;
    if (!geometry || !material) return;

    if (startTimeRef.current === null) startTimeRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startTimeRef.current;

    const assemblyDuration = 2.4;
    const t = Math.min(1, Math.max(0, (elapsed - 0.2) / assemblyDuration));
    const u = material.uniforms;
    u.uProgress.value = t * t * (3 - 2 * t);
    u.uTime.value = state.clock.elapsedTime;

    u.uMouse.value.set(
      mouse.current.x * viewport.width * 0.5,
      -mouse.current.y * viewport.height * 0.5
    );

    const progress = compositionProgress.current;
    const dissolveT = THREE.MathUtils.clamp(
      (progress - HERO_DISSOLVE_START) / (HERO_DISSOLVE_END - HERO_DISSOLVE_START),
      0,
      1
    );
    u.uDissolve.value = dissolveT * dissolveT * (3 - 2 * dissolveT);
  });

  if (!geometry) return null;

  return (
    <points position={[1.1, 0, 0]} frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={initialUniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
