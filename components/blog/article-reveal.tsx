"use client";

import { motion } from "framer-motion";

interface ArticleRevealProps {
  children: React.ReactNode;
}

export function ArticleReveal({ children }: ArticleRevealProps) {
  return (
    <motion.article
      className="mx-auto max-w-3xl px-4 py-16 sm:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.article>
  );
}

export function ArticleContent({ children }: ArticleRevealProps) {
  return (
    <motion.div
      className="mt-8 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

export function ArticleRelated({ children }: ArticleRevealProps) {
  return (
    <motion.section
      className="mt-16 border-t border-border pt-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  );
}
