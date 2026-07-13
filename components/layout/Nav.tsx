"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenisScrollTo } from "@/components/providers/LenisProvider";
import { useCursorHover } from "@/components/providers/CursorProvider";

const LINKS = [
  { label: "Projects", href: "#outros-projetos" },
  { label: "Highlights", href: "#multiclip-case" },
  { label: "Contact", href: "#contato" },
];

/** Slim, mostly-transparent fixed nav — gains a subtle backdrop once scrolled past the hero. */
export function Nav() {
  const scrollTo = useLenisScrollTo();
  const cursorHover = useCursorHover();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-bg-base/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#intro"
          onClick={(e) => handleClick(e, "#intro")}
          className="font-display text-sm italic tracking-wide text-fg-primary"
          {...cursorHover}
        >
          Rocha
        </a>
        <nav className="flex items-center gap-6 md:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-sans text-xs uppercase tracking-[0.15em] text-fg-muted transition-colors duration-200 hover:text-fg-primary"
              {...cursorHover}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
