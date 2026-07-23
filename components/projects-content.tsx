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

// TODO: Replace with your actual projects and real GitHub URLs
const projects: Project[] = [
  {
    title: "Blog Platform",
    description:
      "A modern personal blog built with Next.js, MDX, and PostgreSQL.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    github: "https://github.com/Rhytam23",
  },
  {
    title: "Component Library",
    description:
      "A collection of accessible, composable React components.",
    tech: ["React", "TypeScript", "Radix UI", "Tailwind CSS"],
    github: "https://github.com/Rhytam23",
  },
  {
    title: "CLI Tool",
    description: "A command-line tool for scaffolding projects quickly.",
    tech: ["Node.js", "TypeScript", "Commander.js"],
    github: "https://github.com/Rhytam23",
  },
];

export function ProjectsContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10">
          Projects
        </h1>
      </Reveal>

      <StaggerChildren className="grid gap-4">
        {projects.map((project) => (
          <StaggerItem key={project.title}>
            <motion.div
              className="group rounded-xl border border-border p-6 transition-all duration-300 hover:border-foreground/20 hover:bg-muted/30"
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                  <p className="mt-1.5 text-sm text-foreground/50 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/50 transition-colors group-hover:bg-muted-foreground/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/40 transition-colors hover:text-foreground line-reveal pb-0.5"
                  >
                    Source &rarr;
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/40 transition-colors hover:text-foreground line-reveal pb-0.5"
                  >
                    Live &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
