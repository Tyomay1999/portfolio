'use client';

import React, { useMemo } from 'react';
import clsx from 'clsx';
import type { useTranslations } from 'next-intl';
import type { ComponentBlock } from '../model/projectsModel';
import ProjectLinks from './ProjectLinks';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { assetPath } from '@/lib/asset';

type T = ReturnType<typeof useTranslations>;

type Props = {
  t: T;
  block: ComponentBlock;
  expanded: boolean;
  onOpen: (href: string | undefined, project: string, destination: string) => void;
};

type ThemeKey = 'D' | 'L';

function pickThemeKey(theme: string | undefined): ThemeKey {
  if (theme === 'light') return 'L';
  if (theme === 'dark') return 'D';
  return 'D';
}

export default function ProjectBlock({ t, block, expanded, onOpen }: Props) {
  const { theme } = useTheme();

  const imgSrc = useMemo(() => {
    const key = pickThemeKey(theme);
    const raw = key === 'D' ? block.D_ImgUrl : block.L_ImgUrl;
    return assetPath(raw);
  }, [block.D_ImgUrl, block.L_ImgUrl, theme]);

  return (
    <article
      className={clsx('projects-component-item', expanded && 'visible', 'mb-20 md:mb-32')}
      style={{ transitionDelay: `${block.delay}s` }}
    >
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className={clsx('order-1', block.layout === 'textRight' && 'md:order-2')}>
          <h4 className="mb-4 font-serif text-2xl tracking-tight md:text-3xl">{block.title}</h4>

          <p className="mb-6 font-serif text-base leading-relaxed">
            {block.description}
            <br />
            {block.moreUrl && (
              <a
                href={block.moreUrl || '#'}
                className="projects-link-minimal"
                onClick={(e) => {
                  e.preventDefault();
                  onOpen(block.moreUrl, block.title, block.moreLabel);
                }}
              >
                <span>{block.moreLabel}</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {block.tech.map((item) => (
              <span key={item} className="projects-tech-badge rounded-md px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>

          <ProjectLinks
            t={t}
            projectTitle={block.title}
            items={block.links}
            block={{ icon: block.icon }}
            onOpen={onOpen}
          />
        </div>

        <div className={clsx('order-2', block.layout === 'textRight' && 'md:order-1')}>
          <div className="projects-screenshot-box rounded-xl" style={{ aspectRatio: '16/9' }}>
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src={imgSrc}
                alt={block.title}
                fill
                sizes="(min-width: 768px) 520px, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
