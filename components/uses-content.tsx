"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/animations/reveal";

interface UseItem {
  category: string;
  items: { name: string; description: string }[];
}

const uses: UseItem[] = [
  {
    category: "Development",
    items: [
      { name: "VS Code", description: "Primary editor with Vim keybindings" },
      { name: "Terminal", description: "WezTerm + zsh + starship" },
      { name: "Git", description: "Version control with conventional commits" },
      { name: "GitHub", description: "Code hosting and CI/CD" },
    ],
  },
  {
    category: "Languages & Frameworks",
    items: [
      { name: "TypeScript", description: "Primary language for everything" },
      { name: "React", description: "UI library of choice" },
      { name: "Next.js", description: "Full-stack React framework" },
      { name: "Tailwind CSS", description: "Utility-first styling" },
      { name: "PostgreSQL", description: "Relational database" },
      { name: "Prisma", description: "Type-safe database ORM" },
    ],
  },
  {
    category: "Design",
    items: [
      { name: "Figma", description: "Design and prototyping" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Vercel", description: "Hosting and deployment" },
      { name: "GitHub Actions", description: "CI/CD pipelines" },
    ],
  },
];

export function UsesContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Uses
        </h1>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="text-lg text-foreground/50 mb-14">
          A list of software, hardware, and tools I use on a daily basis.
          Inspired by{" "}
          <a
            href="https://uses.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            uses.tech
          </a>
          .
        </p>
      </Reveal>

      <StaggerChildren className="space-y-14">
        {uses.map((section) => (
          <StaggerItem key={section.category}>
            <h2 className="text-xl font-semibold mb-5">{section.category}</h2>
            <div className="grid gap-2">
              {section.items.map((item) => (
                <motion.div
                  key={item.name}
                  className="flex items-baseline justify-between gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-foreground/15 hover:bg-muted/30"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-foreground/50 text-right">
                    {item.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
