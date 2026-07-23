"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  // Extract month and day for editorial date column
  const dateObj = new Date(post.date);
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });
  const day = dateObj.toLocaleDateString("en-US", { day: "2-digit" });

  return (
    <article className="group border-b border-border/10">
      <Link href={`/blog/${post.slug}`} className="block py-10 sm:py-12">
        <div className="grid gap-6 md:grid-cols-[80px_1fr] items-start">
          {/* Asymmetric date column (Igloo style) */}
          <div className="hidden md:flex flex-col items-start select-none">
            <span className="font-heading text-4xl font-light text-foreground/15 leading-none transition-colors duration-300 group-hover:text-foreground/35">
              {day}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-foreground/35 mt-1 font-medium">
              {month}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
            <div className="flex-1 min-w-0 space-y-2.5">
              {/* Mobile date / metadata fallback */}
              <div className="flex md:hidden items-center gap-2 text-[10px] uppercase tracking-widest text-foreground/30 font-medium mb-1">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>

              {/* Liquid hover title */}
              <h3 className="font-heading text-2xl sm:text-3xl font-medium tracking-tight leading-tight transition-colors duration-300 group-hover:text-foreground/80 liquid-hover inline-block">
                {post.title}
              </h3>

              <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light max-w-xl line-clamp-2">
                {post.description}
              </p>
            </div>

            {/* Micro details column */}
            <div className="flex items-center gap-6 shrink-0 mt-2 md:mt-0 self-start md:self-auto">
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-foreground/30 border border-border/10 px-2.5 py-0.5">
                {post.tags[0]}
              </span>
              <motion.div
                className="text-foreground/20 transition-colors duration-300 group-hover:text-foreground/80"
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
        </div>
      </Link>
    </article>
  );
}
