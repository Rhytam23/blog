"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/animations/reveal";

interface HomeContentProps {
  posts: PostMeta[];
}

export function HomeContent({ posts }: HomeContentProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:py-32">
      {/* Asymmetric Editorial Hero Section */}
      <section className="mb-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h1 className="font-heading text-6xl sm:text-8xl font-medium tracking-tighter leading-[0.9] uppercase select-none">
              <span className="mask-reveal block">
                <span className="mask-reveal-inner">Rhytam</span>
              </span>
              <br />
              <span className="mask-reveal block">
                <span className="mask-reveal-inner text-foreground/40">
                  Journal
                </span>
              </span>
            </h1>
          </div>

          <div className="lg:max-w-xs lg:justify-self-end">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-sm font-sans text-foreground/50 leading-relaxed uppercase tracking-wider"
            >
              A digital notebook exploring the intersections of software architecture, minimal interaction design, and system performance.
            </motion.p>
          </div>
        </div>

        {/* Minimalist interactive buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.0,
            delay: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-16 flex gap-6"
        >
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground font-medium pb-1"
          >
            <span className="line-reveal pb-1">View Journal &rarr;</span>
          </Link>
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground pb-1"
          >
            <span className="line-reveal pb-1">Index &rarr;</span>
          </Link>
        </motion.div>
      </section>

      {/* Latest Posts Section (Cardless, Typography & Spacing Driven) */}
      <section>
        <Reveal delay={0.1}>
          <div className="flex items-baseline justify-between border-b border-border/10 pb-6 mb-12">
            <h2 className="text-xs uppercase tracking-widest text-foreground/40 font-medium">
              Featured Logs
            </h2>
            <Link
              href="/blog"
              className="line-reveal text-xs uppercase tracking-widest text-foreground/45 hover:text-foreground transition-colors pb-1"
            >
              Archive &rarr;
            </Link>
          </div>
        </Reveal>

        {posts.length > 0 ? (
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={0.08 * (i + 1)}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="text-xs uppercase tracking-widest text-foreground/40 text-center py-12">
              No entries logged.
            </p>
          </Reveal>
        )}
      </section>
    </div>
  );
}
