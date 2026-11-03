"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const shots = [
  "/work/smartsynclink/builder-create.webp",
  "/work/cove/home-pace-d-0.webp",
  "/work/hanstaiger-x1/book-calendar.webp",
  "/work/lms/admin-certificates.webp",
  "/work/autorank/app-plan.webp",
  "/work/hanstaiger-bottles/hero.webp",
];

/** A capsule set into the headline that flips through real project screens. */
export function HeroPill() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % shots.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span aria-hidden className="relative inline-block h-[0.7em] w-[1.3em] shrink-0 overflow-hidden rounded-full bg-ink align-middle">
      <AnimatePresence initial={false}>
        <motion.span
          key={shots[i]}
          className="absolute inset-0"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={shots[i]} alt="" fill sizes="320px" quality={90} className="object-cover object-top" />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
