"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-t border-border/10 py-12 mt-20"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs uppercase tracking-widest text-foreground/30">
            &copy; {new Date().getFullYear()} journal. All rights reserved.
          </p>
          <nav className="flex gap-6">
            {[
              { href: "/rss.xml", label: "RSS" },
              { href: "/about", label: "About" },
              { href: "https://github.com/Rhytam23", label: "GitHub", external: true },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="line-reveal text-xs uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground pb-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </motion.footer>
  );
}
