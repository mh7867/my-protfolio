import { MaskLines, Reveal } from "@/components/reveal";
import { skills, specialties } from "@/content/skills";

export function Skills() {
  return (
    <section id="skills" className="wrap scroll-mt-4 py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-[clamp(2rem,10.5vw,11.5rem)]">
          <MaskLines inView lines={["Skills"]} />
        </h2>
        <Reveal delay={0.15} className="max-w-md pb-2">
          <p className="lead text-ink-2">The tools I use day to day. Everything here is used in at least one of the projects above.</p>
        </Reveal>
      </div>

      <Reveal className="mt-12 sm:mt-16">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 sm:rounded-[32px] lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group} className="bg-bg-2 p-6 sm:p-8">
              <h3 className="heading text-[22px]">{g.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className={`rounded-full px-3 py-1.5 text-[14px] font-medium ${s === "Claude Code" ? "bg-pop text-ink" : "bg-bg text-ink-2"}`}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between rounded-[24px] bg-pop p-7 text-ink sm:rounded-[32px] sm:p-10">
            <p className="eyebrow">Daily tool</p>
            <div className="mt-16">
              <h3 className="display text-[clamp(2.6rem,1.6rem+3.6vw,5rem)]">Claude Code</h3>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-ink/80">
                I use Claude Code to plan, write and review code: a written spec, a step-by-step plan, tests first, then a review of the diff. The specs and
                plans for these projects are kept in their repositories.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="h-full rounded-[24px] bg-night p-7 text-white sm:rounded-[32px] sm:p-10">
            <p className="eyebrow text-white/50">What I build most</p>
            <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
              {specialties.map((s, i) => (
                <li key={s} className="heading text-[clamp(1.6rem,1.1rem+1.8vw,2.8rem)] text-white/90">
                  {s}
                  {i < specialties.length - 1 && <span className="text-white/30">,</span>}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
