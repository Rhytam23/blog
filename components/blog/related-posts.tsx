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
    <div>
      <h2 className="text-xs uppercase tracking-widest text-foreground/40 font-medium mb-8">
        Related Entries
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block space-y-2"
            >
              {/* Date Metadata */}
              <span className="text-[10px] uppercase tracking-widest text-foreground/30 font-medium block">
                {formatDate(post.date)}
              </span>
              
              {/* Typography Title */}
              <h3 className="font-heading text-base font-medium leading-tight text-foreground/70 transition-colors duration-300 group-hover:text-foreground line-clamp-2">
                {post.title}
              </h3>
              
              {/* Micro-interaction line link */}
              <span className="line-reveal text-[10px] uppercase tracking-widest text-foreground/45 transition-colors group-hover:text-foreground pb-0.5">
                Read Entry &rarr;
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
