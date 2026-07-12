"use client";

import { Reveal, RevealGroup } from "@/components/reveal/Reveal";
import { useCursorHover } from "@/components/providers/CursorProvider";
import { contatoCopy } from "@/content/site-copy";
import { socials } from "@/content/socials";

const PLATFORM_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  email: "E-mail",
};

function SocialLinkItem({ social }: { social: (typeof socials)[number] }) {
  const cursorHover = useCursorHover();
  const isExternal = social.platform !== "email";

  return (
    <a
      href={social.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-baseline justify-between border-b border-fg-subtle/25 py-5 text-fg-primary transition-colors duration-200 hover:text-accent"
      {...cursorHover}
    >
      <span className="font-display text-2xl md:text-3xl">
        {PLATFORM_LABELS[social.platform]}
      </span>
      <span className="text-sm text-fg-muted transition-colors duration-200 group-hover:text-accent">
        {social.label}
      </span>
    </a>
  );
}

export function Contato() {
  return (
    <section id="contato" className="section-shell">
      <Reveal preset="fadeUp">
        <h2 className="font-display text-h2 font-medium text-fg-primary">
          {contatoCopy.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-fg-muted">{contatoCopy.text}</p>
      </Reveal>
      <RevealGroup preset="fadeUp" stagger={0.08} className="mt-14">
        {socials.map((social) => (
          <SocialLinkItem key={social.platform} social={social} />
        ))}
      </RevealGroup>
    </section>
  );
}
