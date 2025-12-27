export type TransitionPreset =
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'zoom-in'
  | 'zoom-out'
  | 'blur';

const PRESETS: TransitionPreset[] = [
  'slide-left',
  'slide-right',
  'slide-up',
  'slide-down',
  'zoom-in',
  'zoom-out',
  'blur',
];

export function pickRandomPreset(prev?: TransitionPreset): TransitionPreset {
  if (PRESETS.length <= 1) return PRESETS[0];

  let next = PRESETS[Math.floor(Math.random() * PRESETS.length)];
  while (prev && next === prev) {
    next = PRESETS[Math.floor(Math.random() * PRESETS.length)];
  }
  return next;
}
