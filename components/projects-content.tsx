"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/animations/reveal";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Blog Platform",
    description:
      "A modern digital publication built with Next.js, MDX, and PostgreSQL.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    github: "https://github.com/Rhytam23/blog",
  },
  {
    title: "Component Library",
    description:
      "A collection of highly interactive, accessible React UI primitives.",
    tech: ["React", "TypeScript", "Radix UI", "Tailwind CSS"],
    github: "https://github.com/Rhytam23",
  },
  {
    title: "CLI Scaffolder",
    description: "A fast command-line scaffolding tool for workspace setups.",
    tech: ["Node.js", "TypeScript", "Commander.js"],
    github: "https://github.com/Rhytam23",
  },
];

export function ProjectsContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:py-32">
      {/* Editorial Header */}
      <Reveal>
        <h1 className="font-heading text-5xl sm:text-6xl font-medium tracking-tighter uppercase mb-16">
          Projects
        </h1>
      </Reveal>

      {/* Spacing-driven cardless list */}
      <StaggerChildren className="flex flex-col">
        {projects.map((project) => (
          <StaggerItem key={project.title}>
            <div className="border-b border-border/10 py-10 sm:py-12 group">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-6">
                
                {/* Asymmetric Typography Info */}
                <div className="flex-1 space-y-3">
                  <h2 className="font-heading text-2xl sm:text-3xl font-medium tracking-tight leading-none transition-colors duration-300 group-hover:text-foreground/80">
                    {project.title}
                  </h2>
                  <p className="text-sm text-foreground/50 leading-relaxed font-sans max-w-xl">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags column (Igloo style) */}
                <div className="flex flex-wrap gap-1.5 md:max-w-xs shrink-0 self-start md:self-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] uppercase tracking-widest text-foreground/30 border border-border/10 px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code link line reveals */}
              <div className="mt-8 flex gap-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="line-reveal text-xs uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground pb-1"
                  >
                    Source &rarr;
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="line-reveal text-xs uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground pb-1"
                  >
                    Live &rarr;
                  </a>
                )}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
