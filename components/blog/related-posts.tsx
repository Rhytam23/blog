"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

interface RelatedPostsProps {
  posts: PostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h2 className="text-lg font-semibold mb-5">Related Posts</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-border p-4 transition-all duration-300 hover:border-foreground/20 hover:bg-muted/50 hover:shadow-sm"
            >
              <h3 className="text-sm font-medium group-hover:text-foreground/80 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-1.5 text-xs text-foreground/40">
                {formatDate(post.date)}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
