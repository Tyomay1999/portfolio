'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { StorySectionWrapper } from '../_shared';

import type { LinkItem } from './model/projectsModel';
import { getProjectBlocks } from './model/projectsTranslations';
import { getHeroHref } from './model/projectsLinks';

import ProjectHero from './components/ProjectHero';
import ProjectBlock from './components/ProjectBlock';

const EXPANDED_KEY = 'projects:expanded';

export default function ProjectsSection() {
  const t = useTranslations('projects');

  const [expanded, setExpanded] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(EXPANDED_KEY) === '1';
  });

  const [toast, setToast] = useState<string | null>(null);

  const revealRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    window.sessionStorage.setItem(EXPANDED_KEY, expanded ? '1' : '0');
  }, [expanded]);

  const blocks = useMemo(() => getProjectBlocks(t), [t]);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2500);
  };

  const openLink = (href: string | undefined, project: string, destination: string) => {
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
    showToast(t('toast.opening', { project, destination }));
  };

  const heroLinks: LinkItem[] = useMemo(
    () => [
      { key: 'live', href: getHeroHref('live') },
      { key: 'github', href: getHeroHref('github') },
    ],
    [],
  );

  const scrollToReveal = () => {
    const el = revealRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  const onToggleComponents = () => {
    if (expanded) {
      setExpanded(false);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      return;
    }

    setExpanded(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToReveal);
    });

    if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(scrollToReveal, 220);
  };

  const ctaLabel = expanded ? t('hero.cta.collapse') : t('hero.cta.expand');

  return (
    <StorySectionWrapper>
      <div className="projects-scope">
        <h2 className="mb-12 text-center font-serif text-4xl font-light md:mb-16 md:text-4xl lg:text-6xl">
          {t('title')}
        </h2>

        <div className="mx-auto max-w-7xl px-4">
          <ProjectHero t={t} expanded={expanded} heroLinks={heroLinks} onOpen={openLink} />

          {!expanded && (
            <div className="text-center">
              <button
                type="button"
                onClick={onToggleComponents}
                className="cursor-pointer rounded-full border px-6 py-3 font-sans transition duration-300"
                style={{
                  borderColor: 'var(--ui-border)',
                  color: 'var(--text-primary)',
                  background: 'var(--ui-surface-strong)',
                }}
              >
                {ctaLabel}
              </button>
            </div>
          )}

          <section className={clsx('projects-expanded-section', expanded && 'show')}>
            <div ref={revealRef} className="projects-divider-line mb-20 md:mb-28" />

            {blocks.map((block) => (
              <ProjectBlock
                key={block.title}
                t={t}
                block={{ ...block, moreLabel: t('moreLabel') }}
                expanded={expanded}
                onOpen={openLink}
              />
            ))}
          </section>

          <div
            className={clsx(
              'pointer-events-none fixed right-6 bottom-6 z-50',
              toast ? 'opacity-100' : 'opacity-0',
            )}
            style={{ transition: 'opacity 0.2s ease' }}
          >
            {toast && (
              <div className="projects-control-btn pointer-events-auto rounded-lg px-4 py-3 shadow-lg">
                {toast}
              </div>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="pt-10 text-center">
          <button
            type="button"
            onClick={() => onToggleComponents()}
            className="cursor-pointer rounded-full border px-6 py-3 font-sans transition duration-300"
            style={{
              borderColor: 'var(--ui-border)',
              color: 'var(--text-primary)',
              background: 'var(--ui-surface-strong)',
            }}
          >
            {t('hero.cta.collapse')}
          </button>
        </div>
      )}

      <div className="mx-auto mt-8 h-0.5 w-24 bg-slate-300 dark:bg-slate-600" />
    </StorySectionWrapper>
  );
}
