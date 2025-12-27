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
      className="fixed top-1/2 right-6 z-50 flex -translate-y-1/2 transform flex-col items-center gap-2 md:gap-3"
      role="navigation"
      aria-label="Section navigation"
    >
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous section"
        className="hidden items-center justify-center rounded-full border border-slate-300/60 bg-white/70 p-1.5 shadow-sm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 md:flex dark:border-slate-700/60 dark:bg-slate-800/70 hover:dark:bg-slate-800"
        disabled={activeSection === minIndex}
      >
        <ChevronUp className="h-4 w-4 lg:h-5 lg:w-5" />
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
              'rounded-full transition-all duration-200',
              'h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4',
              isActive
                ? [
                    'scale-110',
                    'bg-slate-900 dark:bg-slate-100',
                    'ring-2 ring-slate-900/80 dark:ring-slate-100/90',
                    'ring-offset-2 ring-offset-white dark:ring-offset-slate-900',
                    'shadow-sm',
                  ].join(' ')
                : 'bg-slate-300 opacity-80 hover:opacity-100 dark:bg-slate-700',
              'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
              'focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900',
            ].join(' ')}
          />
        );
      })}

      <button
        type="button"
        onClick={goNext}
        aria-label="Next section"
        className="hidden items-center justify-center rounded-full border border-slate-300/60 bg-white/70 p-1.5 shadow-sm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 md:flex dark:border-slate-700/60 dark:bg-slate-800/70 hover:dark:bg-slate-800"
        disabled={activeSection === maxIndex}
      >
        <ChevronDown className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>
    </div>
  );
}
