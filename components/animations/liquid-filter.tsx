"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

export function LiquidFilter() {
  const scale = useSpring(0, { stiffness: 80, damping: 15 });

  useEffect(() => {
    // Dynamic event bindings on all elements flagged with liquid-hover
    const targets = document.querySelectorAll(".liquid-hover");

    const handleMouseEnter = () => scale.set(22);
    const handleMouseLeave = () => scale.set(0);

    targets.forEach((t) => {
      t.addEventListener("mouseenter", handleMouseEnter);
      t.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", handleMouseEnter);
        t.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [scale]);

  return (
    <svg className="hidden" aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <filter id="liquid-warp">
          {/* Subtle noise distortion for ripple displacement */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025 0.09"
            numOctaves="1"
            result="noise"
          />
          <motion.feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
