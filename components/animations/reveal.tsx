"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const cubicEase = [0.25, 0.46, 0.45, 0.94] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 40,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-60px 0px",
  });
  const shouldReduceMotion = useReducedMotion();

  const offset = directionMap[direction];
  const translateX =
    direction === "left" || direction === "right"
      ? (offset.x / Math.abs(offset.x)) * distance
      : 0;
  const translateY =
    direction === "up" || direction === "down"
      ? (offset.y / Math.abs(offset.y)) * distance
      : 0;

  // Skip all animation for users who prefer reduced motion
  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: translateX,
        y: translateY,
        // Removed filter:blur — it creates a compositing layer per element,
        // causing FPS drops when many Reveals exist on the same page.
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: translateX, y: translateY }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: cubicEase,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-60px 0px",
  });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          // Removed filter:blur for the same compositing reason as Reveal
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: cubicEase,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
