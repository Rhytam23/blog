"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border-b border-border/10">
      <Link href={`/blog/${post.slug}`} className="block py-8 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Metadata (inspired by Igloo style) */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-foreground/30 font-medium mb-3">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>

            {/* Post Title with a smooth micro-scale hover state */}
            <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-tight leading-tight transition-colors duration-300 group-hover:text-foreground/75">
              {post.title}
            </h3>

            {/* Post Description */}
            <p className="mt-2 text-sm text-foreground/50 line-clamp-2 leading-relaxed max-w-2xl font-sans">
              {post.description}
            </p>
          </div>

          {/* Interaction indicators */}
          <div className="flex items-center gap-6 shrink-0 mt-3 md:mt-0 self-start md:self-auto">
            {post.tags.length > 0 && (
              <span className="text-[9px] uppercase tracking-widest text-foreground/30 border border-border/10 px-2 py-0.5 select-none font-medium">
                {post.tags[0]}
              </span>
            )}
            
            {/* Handcrafted animated arrow indicator */}
            <motion.div
              className="text-foreground/20 transition-colors duration-300 group-hover:text-foreground/80"
              initial={{ x: 0 }}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </article>
  );
}
