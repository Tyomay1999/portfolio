'use client';

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SECTIONS } from '@/lib/sections';
import { setActiveSection, useActiveSection } from '@/lib/sectionStore';

type SectionId = (typeof SECTIONS)[number]['id'];

export default function Navigation() {
  const activeSection = useActiveSection() as SectionId;

  const ids = React.useMemo<SectionId[]>(() => SECTIONS.map((s) => s.id), []);
  const minIndex = ids[0];
  const maxIndex = ids[ids.length - 1];

  const goPrev = () => {
    const pos = ids.indexOf(activeSection);
    if (pos > 0) setActiveSection(ids[pos - 1]);
  };

  const goNext = () => {
    const pos = ids.indexOf(activeSection);
    if (pos >= 0 && pos < ids.length - 1) setActiveSection(ids[pos + 1]);
  };

  return (
    <div
      className="fixed top-1/2 right-1 z-50 flex -translate-y-1/2 transform flex-col items-center gap-2 sm:right-1 md:right-4 md:gap-3"
      role="navigation"
      aria-label="Section navigation"
    >
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous section"
        className={[
          'ui-control',
          'flex items-center justify-center',
          'rounded-full transition',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'md:flex',
          'h-10 w-10 sm:h-11 sm:w-11 md:h-8 md:w-8',
          'backdrop-blur-0 border-0 bg-transparent shadow-none',
          'hover:bg-transparent',
        ].join(' ')}
        disabled={activeSection === minIndex}
      >
        <ChevronUp className="h-6 w-6 sm:h-6 sm:w-6 md:h-5 md:w-5" />
      </button>

      {ids.map((id) => {
        const isActive = activeSection === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => setActiveSection(id)}
            aria-label={`Go to section ${id}`}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'ui-dot rounded-full',
              'h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4',
              isActive ? 'ui-dot-active ring-2 ring-offset-2' : '',
              'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
            ].join(' ')}
          />
        );
      })}

      <button
        type="button"
        onClick={goNext}
        aria-label="Next section"
        className={[
          'ui-control',
          'flex items-center justify-center',
          'rounded-full transition',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'md:flex',
          'h-10 w-10 sm:h-11 sm:w-11 md:h-8 md:w-8',
          'backdrop-blur-0 border-0 bg-transparent shadow-none',
          'hover:bg-transparent',
        ].join(' ')}
        disabled={activeSection === maxIndex}
      >
        <ChevronDown className="h-6 w-6 sm:h-6 sm:w-6 md:h-5 md:w-5" />
      </button>
    </div>
  );
}
