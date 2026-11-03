import { MaskLines, Reveal } from "@/components/reveal";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="mx-2 mt-4 scroll-mt-4 rounded-[24px] bg-night py-20 text-white sm:mx-3 sm:rounded-[40px] sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(2rem,10.5vw,11.5rem)]">
            <MaskLines inView lines={["Experience"]} />
          </h2>
          <Reveal delay={0.15} className="max-w-md pb-2">
            <p className="lead text-white/60">
              Three years of building for clients — WordPress and Shopify storefronts first, now full-stack web apps, Shopify apps and AI features.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 border-t border-white/15 sm:mt-20">
          {experience.map((e, i) => (
            <li key={e.company} className="group border-b border-white/15">
              <Reveal delay={i * 0.08} className="grid grid-cols-1 gap-6 py-10 sm:py-14 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3">
                  <p className="text-[15px] font-semibold text-white/55">{e.period}</p>
                  {e.current && (
                    <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-pop px-3 py-1 text-[12.5px] font-bold text-ink uppercase">
                      <span className="size-1.5 rounded-full bg-ink" />
                      Current
                    </span>
                  )}
                </div>
                <div className="lg:col-span-4">
                  <h3 className="heading text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] transition-colors duration-300 group-hover:text-pop">{e.company}</h3>
                  <p className="mt-2 text-lg text-white/70">{e.role}</p>
                </div>
                <ul className="space-y-3 text-[16px] leading-relaxed text-white/75 lg:col-span-5">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-white/40" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
