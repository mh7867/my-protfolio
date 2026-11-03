import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Quiet browser chrome: enough to say "this is a real page", never louder than the page. */
export function BrowserFrame({
  url,
  children,
  tone = "light",
  fill,
  className,
}: {
  url?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  /** Stretch to the parent's height; the content is cropped from the top. */
  fill?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border shadow-[0_1px_0_rgba(255,255,255,.4)_inset,0_30px_60px_-30px_rgba(20,16,10,.35)]",
        fill && "flex h-full flex-col",
        dark ? "border-white/12 bg-[#1b1b1a]" : "border-black/10 bg-white",
        className,
      )}
    >
      <div className={cn("flex h-9 items-center gap-3 border-b px-3.5", dark ? "border-white/10" : "border-ink/8")}>
        <div className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("size-2.5 rounded-full", dark ? "bg-white/18" : "bg-ink/14")} />
          ))}
        </div>
        {url && (
          <div
            className={cn(
              "mx-auto flex h-6 max-w-[60%] min-w-0 items-center gap-1.5 rounded-md px-3 font-mono text-[10.5px]",
              dark ? "bg-white/8 text-white/55" : "bg-ink/[0.045] text-ink-3",
            )}
          >
            <svg viewBox="0 0 12 12" className="size-2.5 shrink-0" aria-hidden>
              <rect x="2.5" y="5.5" width="7" height="5" rx="1.2" fill="currentColor" />
              <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span className="truncate">{url}</span>
          </div>
        )}
        <span className="w-[38px]" aria-hidden />
      </div>
      <div className={cn("relative", fill && "min-h-0 flex-1")}>{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-[42px] bg-[#141414] p-[9px] shadow-[0_40px_70px_-35px_rgba(20,16,10,.55)] ring-1 ring-black/40", className)}>
      <div className="relative overflow-hidden rounded-[33px] bg-black">
        <span aria-hidden className="absolute top-2.5 left-1/2 z-10 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}
