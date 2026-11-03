import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-4 px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="overflow-hidden rounded-[24px] bg-night text-white sm:rounded-[40px]">
        <div className="wrap pt-16 pb-8 sm:pt-24">
          <Reveal>
            <p className="text-lg font-semibold text-white/55">Have a project in mind?</p>
            <a href={`mailto:${site.email}`} className="group mt-2 inline-flex items-start gap-[0.08em] transition-colors duration-300 hover:text-pop">
              <span className="display text-[clamp(3.6rem,15vw,16rem)] leading-[0.8]">Let’s talk</span>
              <ArrowUpRight className="mt-[0.12em] size-[clamp(2.2rem,7vw,7rem)] transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            </a>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 sm:mt-20 md:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-white/45">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block text-[clamp(1.3rem,1rem+1.2vw,2rem)] font-semibold tracking-[-0.02em] underline decoration-white/25 underline-offset-[6px] transition-colors hover:text-pop hover:decoration-pop"
              >
                {site.email}
              </a>
            </div>
            <div className="lg:col-span-3">
              <p className="eyebrow text-white/45">GitHub</p>
              <ul className="mt-3 space-y-2">
                {site.github.map((g) => (
                  <li key={g.href}>
                    <a href={g.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-[17px] font-semibold hover:text-pop">
                      {g.handle}
                      <span className="text-[14px] font-normal text-white/45">{g.note}</span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <nav aria-label="Case studies" className="lg:col-span-4">
              <p className="eyebrow text-white/45">Case studies</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/work/${p.slug}`} className="text-[16px] text-white/75 transition-colors hover:text-pop">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-[14px] text-white/45 sm:flex-row sm:justify-between">
            <p>© 2026 {site.fullName}</p>
            <p>
              {site.role} · {site.company} · {site.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
