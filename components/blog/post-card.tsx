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
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <motion.div
          className="relative rounded-xl border border-transparent px-5 py-5 transition-colors duration-300 hover:border-border hover:bg-muted/50"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Glow line on hover */}
          <div className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 rounded-full bg-foreground transition-all duration-300 group-hover:h-8" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium tracking-tight transition-colors duration-200 group-hover:text-foreground/80">
                {post.title}
              </h3>
              <p className="mt-1.5 text-sm text-foreground/50 line-clamp-2 leading-relaxed">
                {post.description}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-foreground/40">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="opacity-30">·</span>
                <span>{post.readingTime} min read</span>
                <span className="opacity-30">·</span>
                <div className="flex gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5 text-foreground/50 transition-colors group-hover:bg-muted-foreground/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow indicator */}
            <motion.div
              className="mt-1 text-foreground/20 transition-colors group-hover:text-foreground/60"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7 4l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </article>
  );
}
