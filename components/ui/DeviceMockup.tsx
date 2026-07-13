"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface DeviceMockupProps {
  screenshots: string[];
  alt: string;
}

/** CSS-drawn laptop frame — no 3D asset. Multiple screenshots get click-to-switch dots. */
export function DeviceMockup({ screenshots, alt }: DeviceMockupProps) {
  const [active, setActive] = useState(0);
  const multiple = screenshots.length > 1;

  return (
    <div className="w-full">
      <motion.div
        whileHover={{ scale: 1.015, y: -2 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="rounded-t-lg border border-fg-subtle/40 bg-bg-elevated-2 p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-bg-base">
          {screenshots.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={i === 0}
              className={`object-cover object-top transition-opacity duration-500 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <div className="mx-auto h-3 w-[92%] rounded-b-xl bg-fg-subtle/30" />
      <div className="mx-auto -mt-px h-1 w-[40%] rounded-b-md bg-fg-subtle/50" />

      {multiple && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {screenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              aria-label={`Ver tela ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-fg-primary" : "w-1.5 bg-fg-subtle/60 hover:bg-fg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
