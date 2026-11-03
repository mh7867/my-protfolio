"use client";

import { ReactLenis } from "lenis/react";

/** Inertial page scrolling. Native scroll underneath, so sticky and anchors keep working. */
export function SmoothScroll() {
  return <ReactLenis root options={{ lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -72 } }} />;
}
