import { Hero } from "@/components/home/hero";
import { Reel } from "@/components/home/reel";
import { WorkBlock } from "@/components/home/work-block";
import { Experience } from "@/components/home/experience";
import { Skills } from "@/components/home/skills";
import { MaskLines, Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Reel />

      <section id="work" className="scroll-mt-4 pt-24 sm:pt-36">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(2rem,10.5vw,11.5rem)]">
            <MaskLines inView lines={["Selected work"]} />
          </h2>
          <Reveal delay={0.15} className="max-w-md pb-2">
            <p className="lead text-ink-2">
              Client platforms, Shopify work and my own products. Each one has a case study with every feature, the architecture and screenshots.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 space-y-3 px-2 sm:mt-16 sm:space-y-4 sm:px-3">
          {projects.map((p, i) => (
            <WorkBlock key={p.slug} p={p} i={i} total={projects.length} />
          ))}
        </div>
      </section>

      <Experience />
      <Skills />
    </>
  );
}
