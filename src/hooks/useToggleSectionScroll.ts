'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { scrollOnToggle } from '@/lib/scroll/scrollContainer';

type Opts = {
  expanded: boolean;
  anchorRef: RefObject<HTMLElement>;
  halfScreens?: number;
};

export function useToggleSectionScroll({ expanded, anchorRef, halfScreens = 1 }: Opts): void {
  const prev = useRef<boolean>(expanded);

  useEffect(() => {
    scrollOnToggle({
      anchorEl: anchorRef.current,
      expanded,
      prevExpanded: prev.current,
      halfScreens,
    });

    prev.current = expanded;
  }, [expanded, anchorRef, halfScreens]);
}
