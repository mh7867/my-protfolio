import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { projects } from "@/content/projects";
import { MaskLines, Reveal } from "@/components/reveal";
import { MediaView } from "@/components/media";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { Pipeline } from "@/components/work/pipeline";
import { Gallery } from "@/components/work/gallery";
import { CodeBlock } from "@/components/work/code-block";
import { NextProject } from "@/components/work/next-project";
import { brandOf, isDark } from "@/lib/color";
import { fitName } from "@/lib/fit";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const still = p.cover.type === "image" ? p.cover.src : p.cover.poster;
  return {
    title: `${p.name} — ${p.kind}`,
    description: p.summary,
    openGraph: { title: `${p.name} — case study`, description: p.summary, images: still ? [still] : undefined },
  };
}

const nn = (n: number) => String(n).padStart(2, "0");
const letter = (i: number) => (i < 26 ? String.fromCharCode(65 + i) : `A${String.fromCharCode(65 + i - 26)}`);

function Heading({ children, aside, tone = "light" }: { children: string; aside?: ReactNode; tone?: "light" | "dark" }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <h2 className="display text-[clamp(2.6rem,7.5vw,7.5rem)]">
        <MaskLines inView lines={[children]} />
      </h2>
      {aside && (
        <Reveal delay={0.12} className={`max-w-md pb-1 text-[16.5px] leading-relaxed ${tone === "dark" ? "text-white/60" : "text-ink-2"}`}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const t = p.theme;
  const dark = isDark(t.bg);
  const hero = p.hero ?? p.cover;
  const total = p.features.reduce((n, g) => n + g.items.length, 0);
  let k = 0;

  const meta = [
    { k: "Client", v: p.client },
    { k: "Role", v: p.role },
    { k: "Platform", v: p.platform },
    { k: "Year", v: p.year },
  ];

  return (
    <article style={{ "--brand": brandOf(t), "--brand-on-dark": t.accent } as CSSProperties}>
      {/* ------------------------------------------------- the project block */}
      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[40px]" style={{ background: t.bg, color: t.fg }}>
          <div className="wrap pt-24 sm:pt-32">
            <Reveal y={8} className="flex items-center justify-between gap-4 text-[14px] font-semibold tracking-[0.04em] uppercase" style={{ color: t.muted }}>
              <Link href="/#work" className="group inline-flex items-center gap-2 transition-opacity hover:opacity-70">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                All work
              </Link>
              <span>
                {nn(i + 1)} / {nn(projects.length)}
              </span>
            </Reveal>

            <Reveal y={8} delay={0.05} className="mt-10 text-[14px] font-semibold tracking-[0.04em] uppercase sm:mt-14" style={{ color: t.muted }}>
              {p.kind} · {p.year}
            </Reveal>
            <h1 className="display mt-3 [text-wrap:balance]" style={{ fontSize: fitName(p.name, 11) }}>
              <MaskLines lines={[p.name]} delay={0.1} />
            </h1>

            <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-12 lg:grid-cols-12">
              <Reveal delay={0.3} className="lg:col-span-6">
                <p className="lead">{p.summary}</p>
                {p.links.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {p.links.map((l, j) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex h-12 items-center gap-2.5 rounded-full pr-2 pl-5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
                        style={j === 0 ? { background: t.fg, color: t.bg } : { border: `1px solid ${t.line}` }}
                      >
                        {l.label}
                        <span className="grid size-8 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45" style={{ background: t.accent, color: dark ? t.bg : t.fg }}>
                          <ArrowUpRight className="size-4" />
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </Reveal>
              <Reveal delay={0.4} className="lg:col-span-5 lg:col-start-8">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-6" style={{ borderColor: t.line }}>
                  {meta.map((m) => (
                    <div key={m.k}>
                      <dt className="text-[13px] font-semibold tracking-[0.04em] uppercase" style={{ color: t.muted }}>
                        {m.k}
                      </dt>
                      <dd className="mt-1.5 text-[15.5px] leading-snug font-medium">{m.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.2} y={60} className="relative mx-auto mt-14 -mb-[3%] w-[calc(100%-24px)] max-w-[1360px] sm:mt-20 lg:w-[86%]">
            <MediaView media={hero} tone={dark ? "dark" : "light"} priority sizes="(min-width: 1280px) 1360px, 96vw" className="shadow-[0_40px_80px_-30px_rgba(0,0,0,.55)]" />
          </Reveal>
        </div>
        {hero.caption && <p className="wrap mt-4 text-[14px] text-ink-3">{hero.caption}</p>}
      </section>

      {/* -------------------------------------------------------------- facts */}
      <section className="wrap mt-4 sm:mt-6">
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {p.facts.map((f, j) => (
            <Reveal key={f.label} delay={j * 0.06} className="flex flex-col rounded-[20px] bg-bg-2 p-5 sm:rounded-[28px] sm:p-8">
              <dt className="order-2 mt-4 text-[14.5px] leading-snug text-ink-2">{f.label}</dt>
              <dd className="display order-1 text-[clamp(2.6rem,1.6rem+3vw,5rem)]" style={{ color: "var(--brand)" }}>
                {f.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ----------------------------------------------------------- overview */}
      <section className="wrap mt-24 sm:mt-36">
        <Heading>Overview</Heading>
        <Reveal className="mt-10 sm:mt-14">
          <p className="max-w-[60rem] text-[clamp(1.4rem,1rem+1.5vw,2.4rem)] leading-[1.25] font-medium tracking-[-0.02em]">{p.intro}</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          {[
            { h: "The brief", b: p.brief },
            { h: "What I built", b: p.built },
          ].map((c, j) => (
            <Reveal key={c.h} delay={j * 0.08} className="rounded-[20px] bg-bg-2 p-6 sm:rounded-[28px] sm:p-10">
              <h3 className="heading text-[26px]">{c.h}</h3>
              <p className="mt-4 text-[16.5px] leading-[1.65] text-ink-2">{c.b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- how it works */}
      <section className="mt-24 px-2 sm:mt-36 sm:px-3">
        <div className="rounded-[24px] bg-night py-16 text-white sm:rounded-[40px] sm:py-24">
          <div className="wrap">
            <Heading tone="dark" aside={p.pipeline.caption}>
              How it works
            </Heading>
            <Reveal className="mt-6">
              <p className="heading text-[clamp(1.4rem,1rem+1.4vw,2.2rem)] text-[var(--brand-on-dark)]">{p.pipeline.title}</p>
            </Reveal>
            <div className="mt-10 sm:mt-14">
              <Pipeline pipeline={p.pipeline} />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- features */}
      <section className="wrap mt-24 sm:mt-36">
        <Heading aside={`${total} features in ${p.features.length} groups — the full list, A to ${letter(total - 1)}.`}>Features</Heading>
        <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-4">
          {p.features.map((g) => (
            <div key={g.group} className="grid grid-cols-1 gap-8 rounded-[20px] bg-bg-2 p-6 sm:rounded-[28px] sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <h3 className="heading text-[clamp(1.8rem,1.3rem+1.6vw,2.8rem)]">{g.group}</h3>
                  <p className="mt-2 text-[15px] text-ink-3">{g.items.length} features</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
                {g.items.map((f) => {
                  const L = letter(k++);
                  return (
                    <li key={f.title}>
                      <Reveal y={12}>
                        <span className="grid size-9 place-items-center rounded-xl text-[14px] font-bold text-white" style={{ background: "var(--brand)" }}>
                          {L}
                        </span>
                        <h4 className="mt-4 text-[18px] font-bold tracking-[-0.01em]">{f.title}</h4>
                        <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-2">{f.body}</p>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ screens */}
      <section className="wrap mt-24 sm:mt-36">
        <Heading aside="Captured at 2× from the live products and their admin panels. Select any screen to see it full size.">Screens</Heading>
        <div className="mt-12 sm:mt-16">
          <Gallery items={p.gallery} />
        </div>
      </section>

      {/* ------------------------------------------------------ under the hood */}
      <section className="mt-24 px-2 sm:mt-36 sm:px-3">
        <div className="rounded-[24px] bg-night py-16 text-white sm:rounded-[40px] sm:py-24">
          <div className="wrap">
            <Heading tone="dark" aside="A few decisions from the codebase, with the code.">
              Under the hood
            </Heading>
            <div className="mt-12 space-y-14 sm:mt-16 sm:space-y-20">
              {p.notes.map((n, j) => (
                <div key={n.title} className="grid grid-cols-1 gap-8 border-t border-white/15 pt-8 lg:grid-cols-12 lg:gap-12">
                  <Reveal className={n.code ? "lg:col-span-5" : "lg:col-span-8"}>
                    <span className="text-[15px] font-semibold text-[var(--brand-on-dark)]">{nn(j + 1)}</span>
                    <h3 className="heading mt-3 text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)]">{n.title}</h3>
                    <p className="mt-4 text-[16.5px] leading-[1.65] text-white/70">{n.body}</p>
                  </Reveal>
                  {n.code && (
                    <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
                      <CodeBlock {...n.code} />
                    </Reveal>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- stack */}
      <section className="wrap mt-24 sm:mt-32">
        <Heading>Built with</Heading>
        <Reveal className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full bg-bg-2 px-4 py-2.5 text-[15px] font-medium text-ink">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <NextProject next={next} />
    </article>
  );
}
