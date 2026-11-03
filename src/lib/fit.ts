/**
 * Font size for an expanded-caps name so its longest word never breaks:
 * Archivo at wdth 118 / 800 sets up to ~0.9em per capital (C, O and W are the widest).
 */
export function fitName(name: string, maxRem: number, share = 86) {
  const longest = Math.max(...name.split(/\s+/).map((w) => w.length));
  return `min(${(share / (longest * 0.9)).toFixed(2)}vw, ${maxRem}rem)`;
}
