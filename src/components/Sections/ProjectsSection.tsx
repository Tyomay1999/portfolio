'use client';

import React, { useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/components/Sections/StorySectionWrapper';

type IconName = 'grid' | 'monitor' | 'settings' | 'mobile' | 'server';

type LinkKey = 'live' | 'github';

type LinkItem = {
  key: LinkKey;
  href?: string;
};

type ComponentBlock = {
  title: string;
  description: string;
  tech: string[];
  links: LinkItem[];
  layout: 'textLeft' | 'textRight';
  icon: Exclude<IconName, 'grid'>;
  delay: number;
};

type PropsIcon = { name: IconName; className?: string };

function Icon({ name, className }: PropsIcon) {
  if (name === 'grid') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.75"
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
        />
      </svg>
    );
  }

  if (name === 'monitor') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.75"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    );
  }

  if (name === 'settings') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.75"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.75"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    );
  }

  if (name === 'mobile') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.75"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    );
  }

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.75"
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
      />
    </svg>
  );
}

export default function ProjectsSection() {
  const t = useTranslations('projects');

  const [expanded, setExpanded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  const blocks = useMemo(() => {
    const raw = t.raw('components') as unknown;
    return raw as ComponentBlock[];
  }, [t]);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2500);
  };

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
          <section className="mb-20 md:mb-32">
            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="mb-6 font-serif text-3xl tracking-tight md:text-4xl">
                  {t('hero.name')}
                </h3>

                <p className="mb-6 font-serif text-base leading-relaxed md:text-lg">
                  {t('hero.description')}
                </p>

                <p className="mb-8 font-serif text-sm">{t('hero.meta')}</p>

                <button
                  type="button"
                  onClick={onToggleComponents}
                  className="projects-btn-primary rounded-lg px-7 py-3 text-sm font-medium"
                >
                  {ctaLabel}
                </button>
              </div>

              <div className="order-first md:order-last">
                <div
                  className="projects-screenshot-box rounded-xl"
                  style={{ aspectRatio: '16/10' }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon name="grid" className="projects-screenshot-icon h-20 w-20" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={clsx('projects-expanded-section', expanded && 'show')}>
            <div ref={revealRef} className="projects-divider-line mb-20 md:mb-28" />

            {blocks.map((block) => {
              const text = (
                <>
                  <h4 className="mb-4 font-serif text-2xl tracking-tight md:text-3xl">
                    {block.title}
                  </h4>

                  <p className="mb-6 font-serif text-base leading-relaxed">{block.description}</p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {block.tech.map((item) => (
                      <span key={item} className="projects-tech-badge rounded-md px-3 py-1.5">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    {block.links.map((link) => {
                      const label = t(`links.${link.key}`);
                      return (
                        <a
                          key={`${block.title}-${link.key}`}
                          href={link.href || '#'}
                          className="projects-link-minimal"
                          onClick={(e) => {
                            e.preventDefault();
                            showToast(
                              t('toast.opening', { project: block.title, destination: label }),
                            );
                          }}
                        >
                          <span>{label}</span>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      );
                    })}
                  </div>
                </>
              );

              const image = (
                <div
                  className="projects-screenshot-box rounded-xl"
                  style={{ aspectRatio: '16/10' }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon name={block.icon} className="projects-screenshot-icon h-16 w-16" />
                  </div>
                </div>
              );

              return (
                <article
                  key={block.title}
                  className={clsx(
                    'projects-component-item',
                    expanded && 'visible',
                    'mb-20 md:mb-32',
                  )}
                  style={{ transitionDelay: `${block.delay}s` }}
                >
                  <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                    <div className={clsx('order-1', block.layout === 'textRight' && 'md:order-2')}>
                      {text}
                    </div>
                    <div className={clsx('order-2', block.layout === 'textRight' && 'md:order-1')}>
                      {image}
                    </div>
                  </div>
                </article>
              );
            })}
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

      <div className="mx-auto mt-8 h-0.5 w-24 bg-slate-300 dark:bg-slate-600" />
    </StorySectionWrapper>
  );
}
