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
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <motion.header
      className="mb-16 border-b border-border/10 pb-12"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Editorial Category / Date header */}
      <motion.div
        variants={item}
        className="flex items-center gap-3 text-xs uppercase tracking-widest text-foreground/40 mb-6 font-medium"
      >
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime} min read</span>
      </motion.div>

      {/* Massive Typographic Headline */}
      <motion.h1
        variants={item}
        className="font-heading text-4xl sm:text-6xl font-medium tracking-tighter leading-[1.05] uppercase mb-6 liquid-hover inline-block"
      >
        {post.title}
      </motion.h1>

      {/* Editorial Standfirst/Subtitle */}
      <motion.p
        variants={item}
        className="text-lg sm:text-xl text-foreground/50 leading-relaxed max-w-2xl font-sans font-light"
      >
        {post.description}
      </motion.p>

      {/* Horizontal Minimal Tags Link List */}
      <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
        {post.tags.map((tag) => (
          <motion.div key={tag} whileHover={{ y: -1 }}>
            <Link
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="line-reveal text-[10px] uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground pb-1"
            >
              {tag}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.header>
  );
}
