import Image from "next/image";

const rowA = [
  "/work/smartsynclink/builder-ai.webp",
  "/work/cove/home-d-0.webp",
  "/work/hanstaiger-x1/admin-dashboard.webp",
  "/work/lms/lesson.webp",
  "/work/autorank/app-plan.webp",
  "/work/hanstaiger-bottles/electrolytes.webp",
  "/work/shotbook/hero.webp",
];
const rowB = [
  "/work/cove/home-hearth-d-0.webp",
  "/work/smartsynclink/admin-autopilot.webp",
  "/work/autorank/app-cro.webp",
  "/work/hanstaiger-x1/book-services.webp",
  "/work/lms/admin-certificates.webp",
  "/work/cove/home-pace-d-0.webp",
  "/work/smartsynclink/site-hero.webp",
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={`flex w-max gap-3 sm:gap-4 ${reverse ? "animate-reel-reverse" : "animate-reel"} hover:[animation-play-state:paused]`}>
      {[...items, ...items].map((src, i) => (
        <div
          key={i}
          className="relative aspect-video h-[180px] shrink-0 overflow-hidden rounded-[14px] bg-white ring-1 ring-black/[0.06] sm:h-[260px] sm:rounded-[18px] lg:h-[300px]"
        >
          <Image src={src} alt="" fill sizes="(min-width: 1024px) 480px, 420px" quality={90} className="object-cover object-top" />
        </div>
      ))}
    </div>
  );
}

/** Two rows of real screens drifting past each other, straight after the hero. */
export function Reel() {
  return (
    <section aria-label="Screens from the projects" className="mt-16 space-y-3 overflow-hidden sm:mt-20 sm:space-y-4">
      <Row items={rowA} />
      <Row items={rowB} reverse />
    </section>
  );
}
