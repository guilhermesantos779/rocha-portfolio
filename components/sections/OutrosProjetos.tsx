"use client";

import { Reveal, RevealGroup } from "@/components/reveal/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { ExternalLinkIcon } from "@/components/ui/ExternalLinkIcon";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { useCursorHover } from "@/components/providers/CursorProvider";
import { outrosProjetosTag, projects } from "@/content/projects";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const cursorHover = useCursorHover();

  return (
    <div className="rounded-2xl border border-fg-subtle/25 bg-bg-elevated p-6 md:p-8">
      <DeviceMockup screenshots={project.screenshots} alt={project.name} />

      <div className="mt-6">
        <Tag>{project.status}</Tag>
        <h3 className="mt-4 font-display text-h3 font-medium text-fg-primary">
          {project.name}
        </h3>
        <p className="mt-3 text-fg-muted">{project.description}</p>
        <a
          href={project.href}
          target={project.external ? "_blank" : undefined}
          rel={project.external ? "noopener noreferrer" : undefined}
          className="group mt-5 inline-flex items-center gap-1.5 text-sm text-fg-primary transition-colors duration-200 hover:text-accent"
          {...cursorHover}
        >
          Visitar site
          <ExternalLinkIcon className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </div>
  );
}

export function OutrosProjetos() {
  return (
    <section id="outros-projetos" className="section-shell">
      <Reveal preset="fadeUp">
        <SectionHeading eyebrow={outrosProjetosTag} title="Outros projetos" />
      </Reveal>
      <RevealGroup
        preset="fadeUp"
        stagger={0.12}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </RevealGroup>
    </section>
  );
}
