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
    <div className="mx-auto max-w-3xl px-4 py-24 sm:py-36">
      {/* Stark Asymmetrical Hero (Awwwards/Igloo layout rhythm) */}
      <section className="mb-40">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] items-end">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/45 font-medium block">
              Digital Journal / Rhytam
            </span>
            <h1 className="font-heading text-6xl sm:text-8xl font-medium tracking-tighter leading-[0.85] uppercase select-none">
              <span className="mask-reveal block">
                <span className="mask-reveal-inner liquid-hover cursor-default">
                  Crafting
                </span>
              </span>
              <br />
              <span className="mask-reveal block">
                <span className="mask-reveal-inner text-foreground/35 liquid-hover cursor-default">
                  Clean
                </span>
              </span>
              <br />
              <span className="mask-reveal block">
                <span className="mask-reveal-inner liquid-hover cursor-default">
                  Systems
                </span>
              </span>
            </h1>
          </div>
          
          <div className="lg:max-w-xs justify-self-start lg:justify-self-end space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-2xl sm:text-3xl text-foreground/60 leading-relaxed font-light"
            >
              Building interfaces that feel quiet, tactile, and performant.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] uppercase tracking-widest text-foreground/40 leading-relaxed font-sans"
            >
              Focusing on modern UI transitions, React design systems, and low-latency database queries.
            </motion.p>
          </div>
        </div>

        {/* Minimalist details / anchors */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 flex gap-8"
        >
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-foreground font-medium pb-1"
          >
            <span className="line-reveal pb-1">Enter Archive &rarr;</span>
          </Link>
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground pb-1"
          >
            <span className="line-reveal pb-1">Bio Profile &rarr;</span>
          </Link>
        </motion.div>
      </section>

      {/* Featured entries list */}
      <section>
        <Reveal delay={0.1}>
          <div className="flex items-baseline justify-between border-b border-border/10 pb-6 mb-12">
            <h2 className="text-[10px] uppercase tracking-widest text-foreground/35 font-medium">
              Featured Logs
            </h2>
            <Link
              href="/blog"
              className="line-reveal text-[10px] uppercase tracking-widest text-foreground/45 hover:text-foreground transition-colors pb-1"
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
            <p className="text-[10px] uppercase tracking-widest text-foreground/40 text-center py-12">
              No entries logged.
            </p>
          </Reveal>
        )}
      </section>
    </div>
  );
}
