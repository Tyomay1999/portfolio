import { useMemo } from 'react';
import { getSectionIds } from '@/lib/sections';
import type { SectionId } from '@/lib/sections';
import { setActiveSection, useActiveSection } from '@/lib/sectionStore';

export function useSectionNavigation() {
  const activeSection = useActiveSection();

  const ids = useMemo<SectionId[]>(() => getSectionIds(), []);
  const first = ids[0];
  const last = ids[ids.length - 1];

  const goPrev = () => {
    const index = ids.indexOf(activeSection);
    if (index > 0) setActiveSection(ids[index - 1]);
  };

  const goNext = () => {
    const index = ids.indexOf(activeSection);
    if (index >= 0 && index < ids.length - 1) setActiveSection(ids[index + 1]);
  };

  return {
    ids,
    activeSection,
    isFirst: activeSection === first,
    isLast: activeSection === last,
    setActiveSection,
    goPrev,
    goNext,
  };
}
