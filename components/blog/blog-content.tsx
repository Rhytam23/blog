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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <Reveal>
        <div className="mb-14">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-foreground/50"
          >
            {posts.length} post{posts.length !== 1 ? "s" : ""} published.
          </motion.p>
        </div>
      </Reveal>

      {tags.length > 0 && (
        <Reveal delay={0.1}>
          <StaggerChildren className="mb-12 flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <StaggerItem key={tag}>
                <Link
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-foreground/60 transition-all duration-200 hover:border-foreground/30 hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
                >
                  {tag}
                  <span className="text-foreground/30 transition-colors group-hover:text-foreground/50">
                    {count}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Reveal>
      )}

      <StaggerChildren className="flex flex-col gap-1">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </StaggerChildren>

      {posts.length === 0 && (
        <Reveal>
          <p className="text-foreground/50 text-center py-12">
            No posts yet. Add your first MDX post in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              content/posts/
            </code>
          </p>
        </Reveal>
      )}
    </div>
  );
}
