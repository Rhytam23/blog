"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/animations/reveal";
import { GradientText } from "@/components/animations/gradient-text";

interface HomeContentProps {
  posts: PostMeta[];
}

export function HomeContent({ posts }: HomeContentProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Hey, I&apos;m{" "}
            {/* TODO: Replace with your name if different */}
            <GradientText animate>Rhytam</GradientText>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-lg text-foreground/60 leading-relaxed max-w-xl"
        >
          I write about software engineering, system design, and the tools I use
          to build things. Currently focused on TypeScript, React, and
          distributed systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mt-8 flex gap-4"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/10 active:scale-[0.98]"
          >
            Read the Blog
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              &rarr;
            </motion.span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 transition-all hover:border-foreground/30 hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
          >
            About Me
          </Link>
        </motion.div>
      </section>

      <section>
        <Reveal delay={0.1}>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest Posts
            </h2>
            <Link
              href="/blog"
              className="line-reveal text-sm text-foreground/50 hover:text-foreground transition-colors pb-0.5"
            >
              View all &rarr;
            </Link>
          </div>
        </Reveal>

        {posts.length > 0 ? (
          <div className="flex flex-col gap-1">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={0.05 * (i + 1)}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="text-foreground/50">
              No posts yet. Create your first post in{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                content/posts/
              </code>
            </p>
          </Reveal>
        )}
      </section>
    </div>
  );
}
