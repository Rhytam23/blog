"use client";

import { Reveal, StaggerChildren, StaggerItem } from "@/components/animations/reveal";

const sections = [
  {
    heading: "Process",
    content:
      "I approach design and engineering with a focus on simplicity and structure. Every interface should feel lightweight, responsive, and tactile. Code should be readable, performant, and maintainable.",
  },
  {
    heading: "Current Practice",
    content:
      "Currently focused on building real-time applications, profiling React components, and tuning database latency. Seeking out the limits of clean interfaces and smooth motion choreography.",
  },
  {
    heading: "Connections",
    content:
      "You can find my open-source work on GitHub. Feel free to connect if you share an appreciation for clean typography, minimal layouts, and high-performance engineering.",
  },
];

export function AboutContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:py-36">
      {/* Editorial Header */}
      <Reveal>
        <h1 className="font-heading text-5xl sm:text-6xl font-medium tracking-tighter uppercase mb-16 liquid-hover inline-block">
          Biography
        </h1>
      </Reveal>

      {/* Asymmetric Split Layout */}
      <div className="grid gap-12 md:grid-cols-[1.8fr_1fr] items-start mb-24">
        <div className="space-y-8">
          <Reveal>
            <p className="font-serif text-3xl sm:text-4xl font-light text-foreground/75 leading-normal italic">
              &ldquo;Simple structures require complex engineering.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light">
              I spend my time designing minimalist user interfaces, developing high-performance TypeScript applications, and exploring the limitations of modern React and WebGL frameworks. This blog serves as a logbook for architectural decisions and code experiments.
            </p>
          </Reveal>
        </div>
        
        <Reveal delay={0.2}>
          <div className="space-y-6 md:justify-self-end text-left md:text-right border-l md:border-l-0 md:border-r border-border/10 pl-6 md:pl-0 md:pr-6 py-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-foreground/30 font-medium">Location</p>
              <p className="text-xs text-foreground/60 mt-1">India / Remote</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-foreground/30 font-medium">Focus</p>
              <p className="text-xs text-foreground/60 mt-1">Systems / Animation / DX</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-foreground/30 font-medium">Timezone</p>
              <p className="text-xs text-foreground/60 mt-1">GMT +5:30</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Clean list sections */}
      <div className="border-t border-border/10 pt-16">
        <StaggerChildren className="grid gap-12 md:grid-cols-2">
          {sections.map((section) => (
            <StaggerItem key={section.heading}>
              <div className="space-y-3">
                <h2 className="text-[10px] uppercase tracking-widest text-foreground/35 font-medium">
                  {section.heading}
                </h2>
                <p className="text-xs text-foreground/50 leading-relaxed font-sans font-light">
                  {section.content}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
