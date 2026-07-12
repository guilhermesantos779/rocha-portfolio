"use client";

import { motion } from "framer-motion";
import { useCursorHover } from "@/components/providers/CursorProvider";
import { useLenisScrollTo } from "@/components/providers/LenisProvider";
import type { Cta } from "@/content/types";

interface ButtonProps {
  cta: Cta;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ cta, variant = "primary", className = "" }: ButtonProps) {
  const cursorHover = useCursorHover();
  const scrollTo = useLenisScrollTo();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-accent text-bg-base hover:bg-accent-hover"
      : "border border-fg-subtle text-fg-primary hover:border-fg-primary";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cta.kind === "anchor") {
      e.preventDefault();
      scrollTo(cta.href);
    }
  };

  return (
    <motion.a
      href={cta.href}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
      target={cta.kind === "external" ? "_blank" : undefined}
      rel={cta.kind === "external" ? "noopener noreferrer" : undefined}
      {...cursorHover}
    >
      {cta.label}
    </motion.a>
  );
}
