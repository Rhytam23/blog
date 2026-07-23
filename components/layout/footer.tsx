"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border/40 py-10"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-foreground/40">
            &copy; {new Date().getFullYear()} blog. All rights reserved.
          </p>
          <nav className="flex gap-5">
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
                className="line-reveal text-sm text-foreground/40 transition-colors hover:text-foreground pb-0.5"
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
