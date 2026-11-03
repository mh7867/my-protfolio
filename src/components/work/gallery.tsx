"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { Media } from "@/content/projects";
import { MediaView } from "@/components/media";
import { Reveal } from "@/components/reveal";
import { ArrowLeft, ArrowRight, Close, Plus } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Screens in a calm grid; any one opens full-size with its caption, and the
 * arrow keys walk through the rest.
 */
export function Gallery({ items }: { items: Media[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const wide = items.filter((m) => m.frame !== "phone");
  const phones = items.filter((m) => m.frame === "phone");
  const all = [...wide, ...phones];
  // one screen full width, then two side by side; a lone last screen also takes the full row
  const isFull = (i: number) => i % 3 === 0 || (i === wide.length - 1 && i % 3 === 1);

  const count = all.length;
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count));
  const isOpen = open !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) setOpen((i) => (i === null ? i : (i + d + count) % count));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, count]);

  const current = open === null ? null : all[open];

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {wide.map((m, i) => (
          <Reveal key={m.src} delay={(i % 3) * 0.06} className={cn(isFull(i) && "md:col-span-2")}>
            <figure>
              <button type="button" onClick={() => setOpen(i)} className="group relative block w-full cursor-zoom-in text-left" aria-label={`Enlarge: ${m.alt}`}>
                <MediaView media={m} sizes={isFull(i) ? "(min-width: 1280px) 1500px, 100vw" : "(min-width: 768px) 48vw, 100vw"} className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1" />
                <span className="absolute top-12 right-3 grid size-9 place-items-center rounded-full bg-ink/80 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Plus className="size-4" />
                </span>
              </button>
              {m.caption && (
                <figcaption className="mt-4 flex gap-3 text-[14px] leading-relaxed text-ink-2">
                  <span className="text-[13px] font-bold text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  {m.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </div>

      {phones.length > 0 && (
        <div className="mt-16 flex snap-x gap-6 overflow-x-auto rounded-[28px] bg-[var(--brand)]/[0.07] px-6 py-10 [scrollbar-width:none] sm:justify-center sm:px-10 sm:py-14">
          {phones.map((m, i) => (
            <Reveal key={m.src} delay={i * 0.08} className="w-[62vw] max-w-[270px] shrink-0 snap-center">
              <button type="button" onClick={() => setOpen(wide.length + i)} className="block w-full cursor-zoom-in" aria-label={`Enlarge: ${m.alt}`}>
                <MediaView media={m} />
              </button>
              {m.caption && <p className="mt-4 text-center text-[13.5px] text-ink-2">{m.caption}</p>}
            </Reveal>
          ))}
        </div>
      )}

      <DialogPrimitive.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-[80] bg-[#0d0c0a]/90 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <DialogPrimitive.Popup className="fixed inset-0 z-[81] flex flex-col p-3 outline-none transition-[opacity,transform] duration-300 data-[ending-style]:scale-[.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[.98] data-[starting-style]:opacity-0 sm:p-6">
            {current && (
              <>
                <div className="flex items-center justify-between gap-4 text-white">
                  <DialogPrimitive.Title className="text-[14px] font-semibold text-white/60">
                    {String((open ?? 0) + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20" aria-label="Close">
                    <Close className="size-5" />
                  </DialogPrimitive.Close>
                </div>
                <div className="relative min-h-0 flex-1">
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="95vw"
                    quality={90}
                    className="object-contain p-2 sm:p-6"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 text-white">
                  <button type="button" onClick={() => step(-1)} className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20" aria-label="Previous">
                    <ArrowLeft className="size-5" />
                  </button>
                  <DialogPrimitive.Description className="max-w-2xl text-center text-[14.5px] leading-relaxed text-white/75">
                    {current.caption ?? current.alt}
                  </DialogPrimitive.Description>
                  <button type="button" onClick={() => step(1)} className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20" aria-label="Next">
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </>
            )}
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
