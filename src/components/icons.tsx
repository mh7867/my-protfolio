import type { SVGProps } from "react";

/**
 * The site's own glyphs. Drawn on a 24px grid with a 1.5 stroke so they sit
 * with the type rather than looking imported from a kit.
 */

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export function ArrowUpRight(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function ArrowRight(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h15.5M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M20 12H4.5M10.5 6l-6 6 6 6" />
    </svg>
  );
}

export function Play(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8 5.6v12.8a.8.8 0 0 0 1.2.7l10-6.4a.8.8 0 0 0 0-1.4l-10-6.4A.8.8 0 0 0 8 5.6Z" />
    </svg>
  );
}

export function Pause(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <rect x="6.5" y="5" width="3.6" height="14" rx="1" />
      <rect x="13.9" y="5" width="3.6" height="14" rx="1" />
    </svg>
  );
}

export function Plus(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Close(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Menu(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M4 9h16M4 15h16" />
    </svg>
  );
}

