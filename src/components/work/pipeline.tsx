import type { Project } from "@/content/projects";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "@/components/icons";

/** The system as numbered stages in a row (a column on phones), with an optional loop back. */
export function Pipeline({ pipeline }: { pipeline: Project["pipeline"] }) {
  const { steps, loop } = pipeline;
  return (
    <div>
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
        {steps.map((s, i) => (
          <li key={s.label} className="relative">
            <Reveal delay={i * 0.06} y={16} className="flex h-full flex-col rounded-[20px] bg-white/[0.06] p-5 ring-1 ring-white/10 sm:p-6">
              <span className="display text-[2.4rem] text-[var(--brand-on-dark)]">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="heading mt-8 text-[19px]">{s.label}</h4>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{s.detail}</p>
            </Reveal>
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute top-1/2 -right-[11px] z-10 hidden size-5 -translate-y-1/2 place-items-center rounded-full bg-night text-white/50 lg:grid">
                <ArrowRight className="size-3.5" />
              </span>
            )}
          </li>
        ))}
      </ol>

      {loop && (
        <Reveal delay={0.2} className="mt-3 flex items-start gap-4 rounded-[20px] bg-[var(--brand-on-dark)] p-5 text-night sm:p-6">
          <svg viewBox="0 0 48 24" className="mt-0.5 h-6 w-12 shrink-0" fill="none" aria-hidden>
            <path d="M44 6v4a8 8 0 0 1-8 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="m11 13-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[16px] leading-relaxed font-medium">{loop}</p>
        </Reveal>
      )}
    </div>
  );
}
