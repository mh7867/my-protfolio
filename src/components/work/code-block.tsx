import type { ReactNode } from "react";

const KEYWORDS = new Set(
  "export function const let return if else for of in await async import from type def update set where and or is null returning select true false not section script".split(" "),
);

/** Just enough highlighting to read: comments, strings, keywords, numbers. */
function highlight(source: string): ReactNode[] {
  const re = /(\/\/.*|--.*|#(?!\{).*|"""[\s\S]*?"""|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\{%-?|-?%\}|\{\{|\}\}|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]+\b)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(source))) {
    if (m.index > last) out.push(source.slice(last, m.index));
    const t = m[0];
    let cls = "";
    if (/^(\/\/|--|#)/.test(t)) cls = "text-white/38 italic";
    else if (/^("|'|`)/.test(t)) cls = "text-[#b8e5c8]";
    else if (/^(\{%|%\}|\{\{|\}\}|-%\}|\{%-)/.test(t)) cls = "text-[#f7b48a]";
    else if (/^\d/.test(t)) cls = "text-[#f2c66d]";
    else if (KEYWORDS.has(t)) cls = "text-[#ff8a5c]";
    out.push(cls ? <span key={k++} className={cls}>{t}</span> : t);
    last = m.index + t.length;
  }
  if (last < source.length) out.push(source.slice(last));
  return out;
}

export function CodeBlock({ file, source }: { file: string; lang: string; source: string }) {
  return (
    <figure className="overflow-hidden rounded-[16px] border border-white/8 bg-[#121211] text-[#e9e6df] shadow-[0_30px_60px_-35px_rgba(0,0,0,.6)]">
      <figcaption className="flex h-10 items-center justify-between border-b border-white/8 px-4">
        <span className="font-mono text-[11.5px] text-white/55">{file}</span>
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-white/15" />
          ))}
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.7] sm:p-5 sm:text-[13px]" data-lenis-prevent>
        <code>{highlight(source)}</code>
      </pre>
    </figure>
  );
}
