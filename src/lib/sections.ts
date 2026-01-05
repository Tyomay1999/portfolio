export const SECTIONS = [
  { id: -1, key: 'hero', label: 'Hero' },
  { id: 0, key: 'about', label: 'About Me' },
  { id: 1, key: 'projects', label: 'Projects' },
  { id: 2, key: 'experience', label: 'Work Experience' },
  { id: 3, key: 'stack', label: 'Tech Stack' },
] as const;

export const MIN_SECTION = SECTIONS[0].id;
export const MAX_SECTION = SECTIONS[SECTIONS.length - 1].id;

export const clampSection = (n: number) => Math.max(MIN_SECTION, Math.min(MAX_SECTION, n));
