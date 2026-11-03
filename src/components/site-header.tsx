"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUpRight, Menu } from "@/components/icons";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // slides away while reading down, comes back on any scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y > 400 && y > prev + 6 && !open) setHidden(true);
    else if (y < prev - 6 || y < 400) setHidden(false);
  });

  const go = (href: string) => (e: React.MouseEvent) => {
    setOpen(false);
    const hash = href.split("#")[1];
    if (pathname === "/" && hash && lenis) {
      e.preventDefault();
      lenis.scrollTo(`#${hash}`, { offset: -20, duration: 1.4 });
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-140%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
    >
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full border border-black/[0.06] bg-white/75 pr-2 pl-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,.18)] backdrop-blur-xl">
        <Link href="/" className="display text-[19px] tracking-[-0.02em]" aria-label={`${site.fullName} — home`}>
          Hamza<span className="text-ink-3">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.slice(0, 3).map((item) => (
            <Link key={item.href} href={item.href} onClick={go(item.href)} className="rounded-full px-4 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:bg-black/[0.05] hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            className="group hidden h-10 items-center gap-2 rounded-full bg-ink pr-1.5 pl-4 text-[14.5px] font-semibold text-white transition-colors hover:bg-pop hover:text-ink sm:inline-flex"
          >
            Let’s talk
            <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45 group-hover:bg-ink/10">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="grid size-10 place-items-center rounded-full bg-black/[0.05] md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="top" className="rounded-b-[28px] border-0 bg-bg px-5 pt-6 pb-8">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-4 flex flex-col">
                {nav.map((item) => (
                  <Link key={item.href} href={item.href} onClick={go(item.href)} className="display border-b border-line py-4 text-[2.6rem]">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <a href={`mailto:${site.email}`} className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white">
                {site.email}
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
