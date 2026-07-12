"use client";

/**
 * This file is deliberately imperative: useFrame runs a rAF loop outside
 * React's render cycle, and mutating typed arrays / instance matrices in
 * place (instead of allocating new ones every frame) is the whole point of
 * using InstancedMesh for a several-hundred-node scene. The React Compiler
 * lint rules below assume render-phase purity/immutability, which doesn't
 * apply to this WebGL animation loop.
 */
/* eslint-disable react-hooks/purity, react-hooks/immutability */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceTier } from "@/lib/device";
import { useMouseParallax } from "./useMouseParallax";
import { useScrollParallax } from "./useScrollParallax";

const ACCENT = "#6c5ce7";
const BOUNDS = { x: 6, y: 3.5, z: 3 };
const CONNECTION_RADIUS = 1.6;
const CONNECTION_INTERVAL_FRAMES = 9; // throttled recompute, ~150ms at 60fps
const MAX_CONNECTIONS_PER_NODE = 12;

export function NetworkField() {
  const { nodeCount } = useDeviceTier();
  const mouse = useMouseParallax();
  const scrollProgress = useScrollParallax("#hero");

  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const damped = useRef({ x: 0, y: 0 });
  const frameCount = useRef(0);

  const basePositions = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3 + 0] = (Math.random() * 2 - 1) * BOUNDS.x;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * BOUNDS.y;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOUNDS.z;
    }
    return positions;
  }, [nodeCount]);

  const phases = useMemo(() => {
    const arr = new Float32Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) arr[i] = Math.random() * Math.PI * 2;
    return arr;
  }, [nodeCount]);

  const livePositions = useMemo(
    () => new Float32Array(nodeCount * 3),
    [nodeCount]
  );

  const linePositions = useMemo(
    () => new Float32Array(nodeCount * MAX_CONNECTIONS_PER_NODE * 3),
    [nodeCount]
  );

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // per-node organic drift, written straight into instance matrices
    if (meshRef.current) {
      for (let i = 0; i < nodeCount; i++) {
        const bx = basePositions[i * 3 + 0];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        const phase = phases[i];
        const x = bx + Math.sin(t * 0.3 + phase) * 0.15;
        const y = by + Math.cos(t * 0.25 + phase) * 0.15;

        livePositions[i * 3 + 0] = x;
        livePositions[i * 3 + 1] = y;
        livePositions[i * 3 + 2] = bz;

        dummy.position.set(x, y, bz);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    // damped group-level parallax — subtle, not 1:1 with the pointer
    damped.current.x += (mouse.current.x - damped.current.x) * 0.04;
    damped.current.y += (mouse.current.y - damped.current.y) * 0.04;

    if (groupRef.current) {
      groupRef.current.rotation.y = damped.current.x * 0.2;
      groupRef.current.rotation.x = damped.current.y * 0.1;
      groupRef.current.position.x = damped.current.x * 0.4;
      groupRef.current.position.y = -scrollProgress.current * 1.2;
    }

    // throttled O(n^2) connection-graph recompute into one shared buffer
    frameCount.current++;
    if (
      linesRef.current &&
      frameCount.current % CONNECTION_INTERVAL_FRAMES === 0
    ) {
      let segIndex = 0;
      const radiusSq = CONNECTION_RADIUS * CONNECTION_RADIUS;
      const capacity = linePositions.length;

      outer: for (let i = 0; i < nodeCount; i++) {
        const ix = livePositions[i * 3];
        const iy = livePositions[i * 3 + 1];
        const iz = livePositions[i * 3 + 2];
        for (let j = i + 1; j < nodeCount; j++) {
          if (segIndex + 6 > capacity) break outer;

          const jx = livePositions[j * 3];
          const jy = livePositions[j * 3 + 1];
          const jz = livePositions[j * 3 + 2];
          const dx = ix - jx;
          const dy = iy - jy;
          const dz = iz - jz;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < radiusSq) {
            linePositions[segIndex++] = ix;
            linePositions[segIndex++] = iy;
            linePositions[segIndex++] = iz;
            linePositions[segIndex++] = jx;
            linePositions[segIndex++] = jy;
            linePositions[segIndex++] = jz;
          }
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, segIndex / 3);
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, nodeCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.035, 6, 6]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.9} />
      </instancedMesh>
      <lineSegments
        ref={linesRef}
        geometry={lineGeometry}
        frustumCulled={false}
      >
        <lineBasicMaterial color={ACCENT} transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}
