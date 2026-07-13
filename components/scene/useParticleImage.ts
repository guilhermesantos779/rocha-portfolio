"use client";

import { useEffect, useState } from "react";

export interface ParticleImageData {
  count: number;
  /** xyz per particle — the assembled "photo" position. */
  homePositions: Float32Array;
  /** xyz per particle — the initial dispersed position. */
  scatterPositions: Float32Array;
  /** rgb per particle, 0–1. */
  colors: Float32Array;
  aspect: number;
}

interface UseParticleImageOptions {
  src: string;
  /** Grid resolution target on the image's long edge. */
  maxSamples: number;
  /** Hard cap on the final particle count after density filtering. */
  particleBudget: number;
  /** World units between adjacent grid samples. */
  spacing?: number;
}

/**
 * Loads an image, downsamples it onto an offscreen canvas, and turns the
 * pixel grid into particle data: a "home" position per kept pixel (its
 * place in the assembled photo), a "scatter" position (a random point in a
 * surrounding volume, for the load-in reveal), and its sampled color.
 *
 * Density is biased by local contrast — flat, low-detail regions (open
 * water) are kept less often than high-contrast ones (the subject), which
 * both saves particle budget and concentrates detail where it reads best.
 * This runs once on mount, not per frame.
 */
export function useParticleImage({
  src,
  maxSamples,
  particleBudget,
  spacing = 0.032,
}: UseParticleImageOptions) {
  const [data, setData] = useState<ParticleImageData | null>(null);

  useEffect(() => {
    let cancelled = false;
    // deliberately doesn't reset `data` to null here — keeps the previous
    // portrait rendered (rather than flashing to blank) while new data for
    // the changed deps (e.g. a device-tier change on resize) loads

    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (cancelled) return;

      const aspect = img.width / img.height;
      const sampleW = aspect >= 1 ? maxSamples : Math.round(maxSamples * aspect);
      const sampleH = aspect >= 1 ? Math.round(maxSamples / aspect) : maxSamples;

      const canvas = document.createElement("canvas");
      canvas.width = sampleW;
      canvas.height = sampleH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, sampleW, sampleH);
      const { data: pixels } = ctx.getImageData(0, 0, sampleW, sampleH);

      const luminance = new Float32Array(sampleW * sampleH);
      for (let i = 0; i < sampleW * sampleH; i++) {
        const r = pixels[i * 4];
        const g = pixels[i * 4 + 1];
        const b = pixels[i * 4 + 2];
        luminance[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      }

      interface Candidate {
        x: number;
        y: number;
        r: number;
        g: number;
        b: number;
        l: number;
        weight: number;
      }
      const candidates: Candidate[] = [];

      for (let y = 0; y < sampleH; y++) {
        for (let x = 0; x < sampleW; x++) {
          const i = y * sampleW + x;
          const l = luminance[i];
          const lRight = x < sampleW - 1 ? luminance[i + 1] : l;
          const lDown = y < sampleH - 1 ? luminance[i + sampleW] : l;
          const contrast = Math.abs(l - lRight) + Math.abs(l - lDown);
          const weight = Math.min(1, 0.16 + contrast * 3.5);

          const pi = i * 4;
          candidates.push({
            x,
            y,
            r: pixels[pi] / 255,
            g: pixels[pi + 1] / 255,
            b: pixels[pi + 2] / 255,
            l,
            weight,
          });
        }
      }

      const kept = candidates.filter((c) => Math.random() < c.weight);
      const pool =
        kept.length > particleBudget
          ? kept.sort(() => Math.random() - 0.5).slice(0, particleBudget)
          : kept;

      const count = pool.length;
      const homePositions = new Float32Array(count * 3);
      const scatterPositions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const offsetX = (sampleW - 1) / 2;
      const offsetY = (sampleH - 1) / 2;
      const scatterRadius = Math.max(sampleW, sampleH) * spacing * 1.1;

      for (let i = 0; i < count; i++) {
        const p = pool[i];
        const hx = (p.x - offsetX) * spacing;
        const hy = -(p.y - offsetY) * spacing;
        const hz = (p.l - 0.5) * 0.5;

        homePositions[i * 3] = hx;
        homePositions[i * 3 + 1] = hy;
        homePositions[i * 3 + 2] = hz;

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = scatterRadius * (0.6 + Math.random() * 0.6);
        scatterPositions[i * 3] = hx + r * Math.sin(phi) * Math.cos(theta);
        scatterPositions[i * 3 + 1] = hy + r * Math.sin(phi) * Math.sin(theta);
        scatterPositions[i * 3 + 2] = hz + r * Math.cos(phi);

        colors[i * 3] = p.r;
        colors[i * 3 + 1] = p.g;
        colors[i * 3 + 2] = p.b;
      }

      setData({ count, homePositions, scatterPositions, colors, aspect });
    };

    return () => {
      cancelled = true;
    };
  }, [src, maxSamples, particleBudget, spacing]);

  return data;
}
