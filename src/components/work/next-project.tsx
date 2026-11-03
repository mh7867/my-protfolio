import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { ArrowUpRight } from "@/components/icons";
import { isDark } from "@/lib/color";
import { fitName } from "@/lib/fit";

export function NextProject({ next }: { next: Project }) {
  const t = next.theme;
  const still = next.cover.type === "image" ? next.cover.src : next.cover.poster;
  return (
    <section className="px-2 pt-24 pb-3 sm:px-3 sm:pt-32">
      <Link href={`/work/${next.slug}`} className="group relative block overflow-hidden rounded-[24px] sm:rounded-[40px]" style={{ background: t.bg, color: t.fg }}>
        <div className="wrap relative grid min-h-[360px] grid-cols-1 items-end gap-8 pt-10 pb-10 sm:min-h-[520px] sm:pt-14 sm:pb-14 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-7">
            <p className="eyebrow" style={{ color: t.muted }}>
              Next project
            </p>
            <p
              className="display mt-4 text-[length:var(--fs)] [text-wrap:balance] lg:text-[length:var(--fs-lg)]"
              style={{ "--fs": fitName(next.name, 8.5), "--fs-lg": fitName(next.name, 8.5, 44) } as CSSProperties}
            >
              {next.name}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span
                className="grid size-16 place-items-center rounded-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45"
                style={{ background: t.accent, color: isDark(t.bg) ? t.bg : t.fg }}
              >
                <ArrowUpRight className="size-7" />
              </span>
              <span className="text-[17px] font-semibold" style={{ color: t.muted }}>
                {next.kind}
              </span>
            </div>
          </div>
          {still && (
            <div className="relative hidden h-full lg:col-span-5 lg:block">
              <div className="absolute right-0 bottom-[-22%] w-full overflow-hidden rounded-[16px] shadow-2xl transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-6">
                <Image src={still} alt="" width={2400} height={1500} sizes="45vw" quality={90} className="h-auto w-full" />
              </div>
            </div>
          )}
        </div>
      </Link>
    </section>
  );
}
