'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import NavigationArrow from './NavigationArrow';
import NavigationDot from './NavigationDot';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';

export default function Navigation() {
  const { ids, activeSection, setActiveSection } = useSectionNavigation();

  const activeIndex = Math.max(0, ids.indexOf(activeSection));

  const goPrevLoop = () => {
    if (ids.length === 0) return;
    const prevIndex = (activeIndex - 1 + ids.length) % ids.length;
    setActiveSection(ids[prevIndex]);
  };

  const goNextLoop = () => {
    if (ids.length === 0) return;
    const nextIndex = (activeIndex + 1) % ids.length;
    setActiveSection(ids[nextIndex]);
  };

  return (
    <nav
      className="fixed top-1/2 right-0 z-50 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-0 md:right-1 lg:right-3"
      aria-label="Section navigation"
    >
      <NavigationArrow onClick={goPrevLoop} direction="up">
        <ChevronUp className="h-6 w-6" />
      </NavigationArrow>

      {ids.map((id) => (
        <NavigationDot
          key={id}
          id={id}
          active={activeSection === id}
          onClick={() => setActiveSection(id)}
        />
      ))}

      <NavigationArrow onClick={goNextLoop} direction="down">
        <ChevronDown className="h-6 w-6" />
      </NavigationArrow>
    </nav>
  );
}
