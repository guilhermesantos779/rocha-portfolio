"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCursorHover } from "@/components/providers/CursorProvider";

interface ProjectLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  differentiator: string;
  screenshots: string[];
}

/** Full-screen click-to-open gallery, reused across MultiClipHub, Alma Creator, and Olympia. */
export function ProjectLightbox({
  isOpen,
  onClose,
  name,
  description,
  differentiator,
  screenshots,
}: ProjectLightboxProps) {
  const [active, setActive] = useState(0);
  const cursorHover = useCursorHover();
  const hasImages = screenshots.length > 0;

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg-base/92 p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute -top-10 right-0 text-sm text-fg-muted transition-colors duration-200 hover:text-fg-primary"
              {...cursorHover}
            >
              Fechar ✕
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-fg-subtle/30 bg-bg-elevated">
              {hasImages ? (
                screenshots.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={name}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className={`object-cover object-top transition-opacity duration-500 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <span className="font-display text-3xl italic text-fg-subtle">{name}</span>
                  <span className="text-xs uppercase tracking-[0.15em] text-fg-subtle">
                    Screenshots em breve
                  </span>
                </div>
              )}
            </div>

            {hasImages && screenshots.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Ver tela ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-fg-primary" : "w-1.5 bg-fg-subtle/60 hover:bg-fg-muted"
                    }`}
                    {...cursorHover}
                  />
                ))}
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-display text-h3 font-medium text-fg-primary">{name}</h3>
              <p className="mt-3 text-fg-muted">{description}</p>
              <div className="mt-4 border-l-2 border-accent-blue pl-4">
                <p className="text-sm text-accent-blue-hover">{differentiator}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
