import { useSyncExternalStore } from 'react';
import { clampSection, MIN_SECTION } from '@/lib/sections';
import type { SectionId } from '@/lib/sections';

type Listener = () => void;

const listeners = new Set<Listener>();

let currentSection: SectionId = MIN_SECTION;

function emitChange(): void {
  listeners.forEach((l) => l());
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getActiveSection(): SectionId {
  if (typeof window !== 'undefined') {
    const raw = sessionStorage.getItem('activeSection');
    if (raw) {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) currentSection = clampSection(parsed);
    }
  }

  return currentSection;
}

export function setActiveSection(id: SectionId): void {
  const next = clampSection(id);

  if (currentSection === next) return;

  currentSection = next;

  if (typeof window !== 'undefined') {
    sessionStorage.setItem('activeSection', String(next));
  }

  emitChange();
}

export function useActiveSection(): SectionId {
  return useSyncExternalStore(subscribe, getActiveSection, () => MIN_SECTION);
}

export function restoreSectionFromSession(): boolean {
  if (typeof window === 'undefined') return false;

  const raw = sessionStorage.getItem('activeSection');
  if (!raw) return false;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return false;

  setActiveSection(clampSection(parsed));
  return true;
}
