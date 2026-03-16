'use client';

import { useMemo } from 'react';
import { useSectionTransition } from '@/hooks/useSectionTransition';
import { renderSectionById } from './_shared/registry';

export default function Sections() {
  const { renderedId, motionClass, isAnimating } = useSectionTransition();
  const content = useMemo(() => renderSectionById(renderedId), [renderedId]);

  return (
    <div
      className={[
        'story-scroll-container',
        'invisible-scrollbar',
        'w-full',
        'overflow-x-hidden',
        'transition-all duration-300 ease-out',
        motionClass,
        isAnimating ? 'pointer-events-none' : 'pointer-events-auto',
      ].join(' ')}
    >
      {content}
    </div>
  );
}
