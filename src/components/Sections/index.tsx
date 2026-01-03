'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { restoreSectionFromSession, setActiveSection, useActiveSection } from '@/lib/sectionStore';
import { pickRandomPreset } from '@/lib/transitions';
import type { TransitionPreset } from '@/lib/transitions';

import HeroSection from '@/components/Sections/HeroSection';
import AboutMeSection from '@/components/Sections/AboutMeSection';
import ProjectsSection from '@/components/Sections/ProjectsSection';
import WorkExperienceSection from '@/components/Sections/WorkExperienceSection';
import TechStackSection from '@/components/Sections/TechStackSection';

function renderById(id: number) {
  switch (id) {
    case -1:
      return <HeroSection />;
    case 0:
      return <AboutMeSection />;
    case 1:
      return <WorkExperienceSection />;
    case 2:
      return <ProjectsSection />;
    case 3:
      return <TechStackSection />;
    default:
      return <HeroSection />;
  }
}

type Phase = 'idle' | 'exiting' | 'entering';

export default function Sections() {
  const activeId = useActiveSection();

  const [renderedId, setRenderedId] = useState(activeId);
  const [phase, setPhase] = useState<Phase>('idle');

  const [preset, setPreset] = useState<TransitionPreset>('slide-right');
  const presetRef = useRef<TransitionPreset>('slide-right');

  const prevActiveRef = useRef(activeId);
  const pendingIdRef = useRef<number | null>(null);

  const [pendingDebug, setPendingDebug] = useState<number | null>(null);

  const phaseRef = useRef<Phase>('idle');
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const t1Ref = useRef<number | null>(null);
  const t2Ref = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (t1Ref.current) window.clearTimeout(t1Ref.current);
    if (t2Ref.current) window.clearTimeout(t2Ref.current);
    t1Ref.current = null;
    t2Ref.current = null;
  }, []);

  const resetInnerScroll = useCallback(() => {
    window.setTimeout(() => {
      const scroller = document.querySelector<HTMLElement>('.story-scroll-container');
      scroller?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
  }, []);

  const startTransition = useCallback(
    (next: number) => {
      const prev = prevActiveRef.current;
      if (prev === next) return;

      clearTimers();

      const nextPreset = pickRandomPreset(presetRef.current);
      presetRef.current = nextPreset;
      setPreset(nextPreset);

      setPhase('exiting');

      const EXIT_MS = 320;
      const ENTER_MS = 320;

      t1Ref.current = window.setTimeout(() => {
        setRenderedId(next);
        setPhase('entering');
        resetInnerScroll();
      }, EXIT_MS);

      t2Ref.current = window.setTimeout(() => {
        setPhase('idle');
        prevActiveRef.current = next;
      }, EXIT_MS + ENTER_MS);
    },
    [clearTimers, resetInnerScroll],
  );

  useEffect(() => {
    const ok = restoreSectionFromSession();
    if (!ok) setActiveSection(-1);
  }, []);

  useEffect(() => {
    const prev = prevActiveRef.current;
    if (activeId === prev) return;

    if (phaseRef.current !== 'idle') {
      pendingIdRef.current = activeId;
      queueMicrotask(() => setPendingDebug(activeId));
      return;
    }

    startTransition(activeId);
  }, [activeId, startTransition]);

  useEffect(() => {
    if (phase !== 'idle') return;

    const pending = pendingIdRef.current;
    if (pending === null) return;

    pendingIdRef.current = null;
    queueMicrotask(() => setPendingDebug(null));

    if (pending !== prevActiveRef.current) {
      startTransition(pending);
    }
  }, [phase, startTransition]);

  useEffect(() => clearTimers, [clearTimers]);

  const content = useMemo(() => renderById(renderedId), [renderedId]);
  const isAnimating = phase !== 'idle';

  const motionClass = useMemo(() => {
    if (phase === 'idle') return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0';

    if (phase === 'exiting') {
      switch (preset) {
        case 'slide-left':
          return 'opacity-0 translate-x-8';
        case 'slide-right':
          return 'opacity-0 -translate-x-8';
        case 'slide-up':
          return 'opacity-0 translate-y-8';
        case 'slide-down':
          return 'opacity-0 -translate-y-8';
        case 'zoom-in':
          return 'opacity-0 scale-95';
        case 'zoom-out':
          return 'opacity-0 scale-105';
        case 'blur':
          return 'opacity-0 blur-sm';
        default:
          return 'opacity-0';
      }
    }

    switch (preset) {
      case 'slide-left':
        return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 animate-enter-from-left';
      case 'slide-right':
        return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 animate-enter-from-right';
      case 'slide-up':
        return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 animate-enter-from-top';
      case 'slide-down':
        return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 animate-enter-from-bottom';
      case 'zoom-in':
        return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 animate-enter-zoom-in';
      case 'zoom-out':
        return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 animate-enter-zoom-out';
      case 'blur':
        return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 animate-enter-blur';
      default:
        return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0';
    }
  }, [phase, preset]);

  const showDebug = process.env.NODE_ENV === 'development';

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {showDebug && (
        <div className="fixed bottom-4 left-4 z-[60] rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-900 shadow backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100">
          <div>activeId: {activeId}</div>
          <div>renderedId: {renderedId}</div>
          <div>phase: {phase}</div>
          <div>preset: {preset}</div>
          <div>animating: {String(isAnimating)}</div>
          <div>pending: {String(pendingDebug)}</div>
        </div>
      )}

      <div
        className={[
          'story-scroll-container',
          'invisible-scrollbar',
          'absolute inset-0',
          'overflow-x-hidden overflow-y-auto',
          'transition-all duration-300 ease-out',
          motionClass,
          isAnimating ? 'pointer-events-none' : 'pointer-events-auto',
        ].join(' ')}
      >
        {content}
      </div>
    </div>
  );
}
