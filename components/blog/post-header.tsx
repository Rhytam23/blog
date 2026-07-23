"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/blog";

interface PostHeaderProps {
  post: Post;
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <motion.header
      className="mb-10"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-2 text-sm text-foreground/40 mb-4"
      >
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="opacity-40">·</span>
        <span>{post.readingTime} min read</span>
      </motion.div>

      <motion.h1
        variants={item}
        className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-[1.1]"
      >
        {post.title}
      </motion.h1>

      <motion.p
        variants={item}
        className="text-lg text-foreground/50 leading-relaxed max-w-2xl"
      >
        {post.description}
      </motion.p>

      <motion.div variants={item} className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <motion.div key={tag} whileHover={{ scale: 1.05 }}>
            <Link
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="block rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground/50 transition-colors hover:bg-muted-foreground/15 hover:text-foreground/80"
            >
              {tag}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.header>
  );
}

