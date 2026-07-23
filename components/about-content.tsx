"use client";

import { motion } from "framer-motion";
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
    <div className="mx-auto max-w-3xl px-4 py-20 sm:py-32">
      {/* Editorial Header */}
      <Reveal>
        <h1 className="font-heading text-5xl sm:text-6xl font-medium tracking-tighter uppercase mb-12">
          About
        </h1>
      </Reveal>

      {/* Asymmetric Profile Intro */}
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] items-start mb-20">
        <Reveal>
          <p className="text-xl sm:text-2xl font-light text-foreground/75 leading-relaxed font-sans">
            I am a software engineer focused on building clean digital experiences. I write about architecture, interaction design, and the systems behind simple interfaces.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="text-xs uppercase tracking-widest text-foreground/40 space-y-2">
            <p>Based in India</p>
            <p>Developer / Architect</p>
            <p>Est. 2026</p>
          </div>
        </Reveal>
      </div>

      {/* Clean borderless grid lists */}
      <div className="border-t border-border/10 pt-16">
        <StaggerChildren className="grid gap-10 md:grid-cols-2">
          {sections.map((section) => (
            <StaggerItem key={section.heading}>
              <div className="space-y-3">
                <h2 className="text-xs uppercase tracking-widest text-foreground/35 font-medium">
                  {section.heading}
                </h2>
                <p className="text-sm text-foreground/50 leading-relaxed font-sans">
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
