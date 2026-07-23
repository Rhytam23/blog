"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/animations/reveal";

const sections = [
  {
    heading: "What I Do",
    content:
      "I build web applications, APIs, and distributed systems. My primary stack is TypeScript, React, Next.js, and PostgreSQL. I care deeply about performance, accessibility, and developer experience.",
  },
  {
    heading: "About This Blog",
    content:
      "This blog is built with Next.js, MDX, and Tailwind CSS. It's designed to be fast, accessible, and easy to maintain. Posts are written in MDX and version-controlled alongside the codebase.",
  },
  {
    heading: "Get in Touch",
    content:
      "You can find me on GitHub. Feel free to reach out if you want to chat about tech, coding, or anything else.",
  },
];

export function AboutContent() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
          About
        </h1>
      </Reveal>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-lg text-foreground/60"
        >
          I&apos;m a software engineer who enjoys building things that live on
          the internet. I write about technology, engineering practices, and the
          tools I use daily.
        </motion.p>

        <StaggerChildren className="space-y-0">
          {sections.map((section) => (
            <StaggerItem key={section.heading}>
              <h2 className="text-xl font-semibold mt-10 mb-3">{section.heading}</h2>
              <p>{section.content}</p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
