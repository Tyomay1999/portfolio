export const SECTIONS = [
  { id: -1, key: 'hero', label: 'Hero' },
  { id: 0, key: 'about', label: 'About Me' },
  { id: 1, key: 'projects', label: 'Projects' },
  { id: 2, key: 'experience', label: 'Work Experience' },
  { id: 3, key: 'stack', label: 'Tech Stack' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
export type SectionKey = (typeof SECTIONS)[number]['key'];

export const MIN_SECTION: SectionId = SECTIONS[0].id;
export const MAX_SECTION: SectionId = SECTIONS[SECTIONS.length - 1].id;

export function clampSection(id: number): SectionId {
  return Math.max(MIN_SECTION, Math.min(MAX_SECTION, id)) as SectionId;
}

export function getSectionIds(): SectionId[] {
  return SECTIONS.map((s) => s.id);
}
