import { MaskLines, Reveal } from "@/components/reveal";
import { HeroPill } from "@/components/home/hero-pill";
import { ArrowUpRight } from "@/components/icons";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32">
      <div className="wrap">
        <Reveal y={10}>
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] text-ink-2 sm:text-base">
            <span className="font-semibold text-ink">{site.fullName}</span>
            <span aria-hidden className="size-1 rounded-full bg-ink-3" />
            <span>
              {site.role} at {site.company}
            </span>
            <span aria-hidden className="size-1 rounded-full bg-ink-3" />
            <span>{site.location}</span>
          </p>
        </Reveal>

        <h1 className="display mt-6 text-[min(10.4vw,170px)] leading-[0.82] sm:mt-8">
          <MaskLines
            delay={0.05}
            stagger={0.1}
            lines={[
              "Full-stack",
              <span key="l2" className="flex items-center gap-[0.14em]">
                <HeroPill />
                developer
              </span>,
            ]}
          />
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-line pt-8 sm:mt-14 lg:grid-cols-12">
          <Reveal delay={0.35} className="lg:col-span-5">
            <p className="lead text-ink">
              I build web apps, Shopify apps and themes, CMS platforms and booking systems — from the database to the interface. Since 2023, first at
              Technoties and now at {site.company}.
            </p>
          </Reveal>

          <Reveal delay={0.45} className="lg:col-span-4 lg:col-start-7">
            <ul className="divide-y divide-line border-y border-line">
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-ink">
                  <span className="text-ink-3">Email</span>
                  <span className="flex items-center gap-2 font-semibold">
                    {site.email}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
              {site.github.map((g) => (
                <li key={g.href}>
                  <a href={g.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-3.5">
                    <span className="text-ink-3">
                      {g.label} · {g.note}
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                      {g.handle}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.55} className="flex flex-col items-start justify-between gap-6 lg:col-span-2 lg:items-end">
            <a
              href="#work"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pr-2 pl-6 text-[15px] font-semibold text-white transition-colors hover:bg-pop hover:text-ink"
            >
              See the work
              <span className="grid size-10 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-90 group-hover:bg-ink/10">
                <ArrowUpRight className="size-5 rotate-90" />
              </span>
            </a>
            <p className="text-[14px] text-ink-3 lg:text-right">{projects.length} projects · 3+ years</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
