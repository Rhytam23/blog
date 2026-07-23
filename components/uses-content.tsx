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
      { name: "VS Code", description: "Minimal setup, Vim bindings" },
      { name: "WezTerm", description: "GPU-accelerated terminal emulator" },
      { name: "Git & GitHub", description: "Version control and deployments" },
    ],
  },
  {
    category: "Environment",
    items: [
      { name: "TypeScript", description: "Strict typing everywhere" },
      { name: "React / Next.js", description: "Component interfaces & SSR" },
      { name: "PostgreSQL", description: "Primary relational database" },
      { name: "Tailwind CSS v4", description: "Minimal styling layouts" },
    ],
  },
  {
    category: "Hardware",
    items: [
      { name: "MacBook Pro", description: "14-inch Apple Silicon M-series" },
      { name: "Keychron Q2", description: "Custom mechanical, linear switches" },
    ],
  },
];

export function UsesContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:py-32">
      {/* Editorial Header */}
      <Reveal>
        <h1 className="font-heading text-5xl sm:text-6xl font-medium tracking-tighter uppercase mb-6">
          Uses
        </h1>
      </Reveal>

      {/* Intro details */}
      <Reveal delay={0.05}>
        <p className="text-sm font-sans text-foreground/50 leading-relaxed max-w-xl uppercase tracking-wider mb-20">
          A minimalist catalog of the hardware, systems, and software tools I rely on daily for code, design, and system operations.
        </p>
      </Reveal>

      {/* Table-like list layout */}
      <StaggerChildren className="space-y-20">
        {uses.map((section) => (
          <StaggerItem key={section.category}>
            <div className="border-t border-border/10 pt-8">
              <h2 className="text-xs uppercase tracking-widest text-foreground/35 font-medium mb-8">
                {section.category}
              </h2>
              
              <div className="divide-y divide-border/5">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between py-5 gap-2 group transition-colors duration-300"
                  >
                    <span className="font-medium text-sm text-foreground/80 group-hover:text-foreground">
                      {item.name}
                    </span>
                    <span className="text-xs text-foreground/45 sm:text-right font-sans">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
