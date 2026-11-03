"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { Project } from "@/content/projects";
import { MediaView } from "@/components/media";
import { ArrowUpRight } from "@/components/icons";
import { isDark } from "@/lib/color";
import { fitName } from "@/lib/fit";

/**
 * One project as a full-width block in its own colour. The screenshot rises
 * and grows into place as the block scrolls in, and a "View" disc follows the
 * pointer over it.
 */
export function WorkBlock({ p, i, total }: { p: Project; i: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const t = p.theme;
  const dark = isDark(t.bg);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, 0]);

  const [hover, setHover] = useState(false);
  const mx = useSpring(0, { stiffness: 400, damping: 40 });
  const my = useSpring(0, { stiffness: 400, damping: 40 });

  return (
    <article
      ref={ref}
      style={{ background: t.bg, color: t.fg }}
      className="group relative overflow-hidden rounded-[24px] sm:rounded-[40px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Link href={`/work/${p.slug}`} className="absolute inset-0 z-20 lg:cursor-none" aria-label={`${p.name} — read the case study`} />

      <div className="wrap pt-7 sm:pt-12 lg:pt-14">
        <div className="flex items-center justify-between gap-4 text-[13px] font-semibold tracking-[0.04em] uppercase sm:text-[14px]" style={{ color: t.muted }}>
          <span>
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline">{p.kind}</span>
          <span>{p.year}</span>
        </div>

        <h3 className="display mt-5 [text-wrap:balance] sm:mt-8" style={{ fontSize: fitName(p.name, 9.5) }}>
          {p.name}
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 lg:grid-cols-12 lg:items-end">
          <p className="text-[16px] leading-relaxed sm:text-[17px] lg:col-span-6" style={{ color: t.muted }}>
            {p.summary}
          </p>
          <ul className="flex flex-wrap gap-2 lg:col-span-5 lg:col-start-8 lg:justify-end">
            {p.tags.map((tag) => (
              <li key={tag} className="rounded-full border px-3 py-1.5 text-[13px] font-medium" style={{ borderColor: t.line }}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div style={{ scale, y, transformOrigin: "50% 0%" }} className="relative z-0 mx-auto mt-10 -mb-[6%] w-[calc(100%-24px)] max-w-[1360px] sm:mt-14 lg:w-[84%]">
        <MediaView media={p.cover} tone={dark ? "dark" : "light"} sizes="(min-width: 1024px) 84vw, 100vw" className="shadow-[0_40px_80px_-30px_rgba(0,0,0,.5)]" />
      </motion.div>

      {/* the pointer disc, desktop only */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-30 hidden size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center text-[13px] leading-tight font-bold uppercase lg:grid"
        style={{ x: mx, y: my, background: t.accent, color: dark ? t.bg : t.fg }}
        animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="flex flex-col items-center gap-1">
          <ArrowUpRight className="size-5" />
          View case
        </span>
      </motion.span>
    </article>
  );
}
