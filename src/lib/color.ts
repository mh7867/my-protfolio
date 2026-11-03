import type { Theme } from "@/content/projects";

export const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 140;
};

/** The project colour that reads on paper: its background if dark, else its accent. */
export const brandOf = (t: Theme) => (isDark(t.bg) ? t.bg : t.accent);
