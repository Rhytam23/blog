"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import {
  Reveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/reveal";

interface BlogContentProps {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
}

export function BlogContent({ posts, tags }: BlogContentProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:py-32">
      {/* Editorial Header */}
      <Reveal>
        <div className="mb-20">
          <motion.h1
            className="font-heading text-5xl sm:text-6xl font-medium tracking-tighter uppercase mb-4 liquid-hover inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-xs uppercase tracking-widest text-foreground/40"
          >
            Archive / {posts.length} entries published
          </motion.p>
        </div>
      </Reveal>

      {/* Modern tags filter menu */}
      {tags.length > 0 && (
        <Reveal delay={0.1}>
          <div className="border-b border-border/10 pb-8 mb-16">
            <p className="text-[10px] uppercase tracking-widest text-foreground/30 mb-4">
              Filter by topic
            </p>
            <StaggerChildren className="flex flex-wrap gap-x-6 gap-y-3">
              {tags.map(({ tag, count }) => (
                <StaggerItem key={tag}>
                  <Link
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="group flex items-baseline gap-1.5 text-xs uppercase tracking-wider text-foreground/45 transition-colors hover:text-foreground"
                  >
                    <span>{tag}</span>
                    <span className="text-[9px] text-foreground/20 group-hover:text-foreground/40">
                      ({count})
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </Reveal>
      )}

      {/* Spacing-based blog entries list */}
      <StaggerChildren className="flex flex-col">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </StaggerChildren>

      {posts.length === 0 && (
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-foreground/40 text-center py-20">
            No entries logged yet.
          </p>
        </Reveal>
      )}
    </div>
  );
}
