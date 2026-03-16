import { useTranslations } from 'next-intl';
import type { ComponentBlock } from './projectsModel';

type T = ReturnType<typeof useTranslations>;

export function getProjectBlocks(t: T): ComponentBlock[] {
  const raw = t.raw('components') as unknown;
  return raw as ComponentBlock[];
}
