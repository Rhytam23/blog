"use client";

import { motion } from "framer-motion";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  animate = true,
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-foreground via-foreground/70 to-foreground bg-[length:200%_auto] bg-clip-text text-transparent ${
        className || ""
      }`}
      {...(animate
        ? {
            animate: {
              backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
            },
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }
        : {})}
    >
      {children}
    </motion.span>
  );
}
