import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-center pt-28 pb-20">
      <p className="eyebrow text-ink-3">404</p>
      <h1 className="display mt-4 text-[clamp(3.4rem,12vw,12rem)]">Not found</h1>
      <p className="lead mt-6 max-w-[40ch] text-ink-2">This page doesn’t exist. The projects are on the home page.</p>
      <Link href="/#work" className="group mt-10 inline-flex h-14 w-fit items-center gap-3 rounded-full bg-ink pr-2 pl-6 text-[15px] font-semibold text-white hover:bg-pop hover:text-ink">
        See the work
        <span className="grid size-10 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="size-5" />
        </span>
      </Link>
    </section>
  );
}
