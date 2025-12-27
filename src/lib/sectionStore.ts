'use client';

import { useEffect, useState } from 'react';
import { clampSection, MIN_SECTION } from '@/lib/sections';

type SectionChangeCallback = (id: number) => void;

let listeners: SectionChangeCallback[] = [];
let currentSection: number = MIN_SECTION;

export function subscribe(callback: SectionChangeCallback): () => void {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((fn) => fn !== callback);
  };
}

export function setActiveSection(id: number): void {
  const next = clampSection(id);

  if (currentSection !== next) {
    currentSection = next;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('activeSection', String(next));
    }

    listeners.forEach((fn) => fn(next));
  }
}

export function getActiveSection(): number {
  return currentSection;
}

export function useActiveSection(): number {
  const [section, setSection] = useState<number>(currentSection);

  useEffect(() => {
    return subscribe(setSection);
  }, []);

  return section;
}

export function restoreSectionFromSession(): boolean {
  if (typeof window === 'undefined') return false;

  const saved = sessionStorage.getItem('activeSection');
  if (!saved) return false;

  const parsed = Number(saved);
  if (!Number.isFinite(parsed)) return false;

  setActiveSection(parsed);
  return true;
}
