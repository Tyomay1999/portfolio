export const PRESETS = [
  'slide-left',
  'slide-right',
  'slide-up',
  'slide-down',
  'zoom-in',
  'zoom-out',
  'blur',
] as const;

export type TransitionPreset = (typeof PRESETS)[number];

export function pickRandomPreset(prev?: TransitionPreset): TransitionPreset {
  const pool = prev ? PRESETS.filter((p) => p !== prev) : PRESETS;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx] ?? PRESETS[0];
}
