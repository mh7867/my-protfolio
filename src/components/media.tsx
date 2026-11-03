"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/content/projects";
import { BrowserFrame, PhoneFrame } from "@/components/frames";
import { Pause, Play } from "@/components/icons";
import { cn } from "@/lib/utils";

const fillCls = "absolute inset-0 h-full w-full object-cover object-top";

/** A silent loop that only plays while it's on screen. */
function LoopVideo({ media, fill }: { media: Media; fill?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !paused) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [paused]);

  return (
    <div className={cn("group/video relative", fill && "h-full")}>
      <video
        ref={ref}
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        width={media.width}
        height={media.height}
        className={fill ? fillCls : "block h-auto w-full"}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          const v = ref.current;
          if (!v) return;
          if (paused) v.play().catch(() => {});
          else v.pause();
          setPaused(!paused);
        }}
        className="absolute right-3 bottom-3 z-10 grid size-9 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition-opacity group-hover/video:opacity-100 focus-visible:opacity-100"
        aria-label={paused ? "Play video" : "Pause video"}
      >
        {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
    </div>
  );
}

/** A narrated film: poster first, real controls once the visitor asks for it. */
function FilmVideo({ media, fill }: { media: Media; fill?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  return (
    <div className={cn("relative bg-black", fill && "h-full")}>
      <video
        ref={ref}
        src={media.src}
        poster={media.poster}
        playsInline
        preload="none"
        controls={started}
        aria-label={media.alt}
        width={media.width}
        height={media.height}
        className={fill ? fillCls.replace("object-cover", "object-contain") : "block h-auto w-full"}
      />
      {!started && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setStarted(true);
            ref.current?.play().catch(() => {});
          }}
          className="group/play absolute inset-0 z-10 grid place-items-center"
          aria-label={`Play: ${media.alt}`}
        >
          <span className="flex items-center gap-3 rounded-full bg-white/95 py-2 pr-5 pl-2 text-ink shadow-xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/play:scale-105">
            <span className="grid size-11 place-items-center rounded-full bg-pop text-ink">
              <Play className="size-5 translate-x-px" />
            </span>
            <span className="text-[15px] font-medium">Play the film</span>
            <span className="text-[13px] text-ink-3">with sound</span>
          </span>
        </button>
      )}
    </div>
  );
}

function Raw({ media, sizes, priority, fill }: { media: Media; sizes: string; priority?: boolean; fill?: boolean }) {
  if (media.type === "video") return media.sound ? <FilmVideo media={media} fill={fill} /> : <LoopVideo media={media} fill={fill} />;
  if (fill)
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        preload={priority}
        quality={90}
        className="object-cover"
        style={{ objectPosition: media.focus ?? "50% 0%" }}
      />
    );
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      preload={priority}
      quality={90}
      className="block h-auto w-full"
    />
  );
}

/** Any project media, wearing the frame its data asks for. */
export function MediaView({
  media,
  sizes = "(min-width: 1024px) 70vw, 100vw",
  tone = "light",
  priority,
  fill,
  className,
}: {
  media: Media;
  sizes?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  /** Take the parent's height and crop from the top, instead of the media's own ratio. */
  fill?: boolean;
  className?: string;
}) {
  const frame = media.frame ?? "browser";
  if (frame === "browser")
    return (
      <BrowserFrame url={media.url} tone={tone} fill={fill} className={className}>
        <Raw media={media} sizes={sizes} priority={priority} fill={fill} />
      </BrowserFrame>
    );
  if (frame === "phone")
    return (
      <PhoneFrame className={className}>
        <Raw media={media} sizes="(min-width: 1024px) 22vw, 60vw" priority={priority} />
      </PhoneFrame>
    );
  return (
    <div className={cn("relative overflow-hidden rounded-[14px]", fill && "h-full", className)}>
      <Raw media={media} sizes={sizes} priority={priority} fill={fill} />
    </div>
  );
}
