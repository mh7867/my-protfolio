"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Rises into place the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...props
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Lines of a headline slide up out of their own masks, one after another —
 * the page-load moment. Pass each visual line as its own child.
 */
export function MaskLines({
  lines,
  className,
  delay = 0,
  stagger = 0.09,
  inView = false,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** Wait for the viewport instead of animating on mount. */
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  // The observer watches the unclipped wrapper: a line pushed out of its own
  // mask is invisible to IntersectionObserver and would never be revealed.
  return (
    <motion.span
      className={cn("block", className)}
      initial={reduce ? false : "hidden"}
      {...(inView ? { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } } : { animate: "shown" })}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: "105%" },
              shown: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger } },
            }}
            style={{ transformOrigin: "0% 100%" }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Children fade up in sequence when the group enters the viewport. */
export function Stagger({ children, className, gap = 0.07 }: { children: ReactNode[]; className?: string; gap?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: i * gap }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
