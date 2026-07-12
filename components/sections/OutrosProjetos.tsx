"use client";

import { Reveal, RevealGroup } from "@/components/reveal/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { ExternalLinkIcon } from "@/components/ui/ExternalLinkIcon";
import { useCursorHover } from "@/components/providers/CursorProvider";
import { outrosProjetosTag, projects } from "@/content/projects";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const cursorHover = useCursorHover();

  return (
    <a
      href={project.href}
      target={project.external ? "_blank" : undefined}
      rel={project.external ? "noopener noreferrer" : undefined}
      className="group block rounded-2xl border border-fg-subtle/25 bg-bg-elevated p-8 transition-colors duration-200 hover:border-accent/60"
      {...cursorHover}
    >
      <div className="mb-4">
        <Tag>{project.status}</Tag>
      </div>
      <h3 className="flex items-center gap-2 font-display text-h3 font-medium text-fg-primary">
        {project.name}
        <ExternalLinkIcon className="text-accent transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </h3>
      <p className="mt-3 text-fg-muted">{project.description}</p>
    </a>
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
