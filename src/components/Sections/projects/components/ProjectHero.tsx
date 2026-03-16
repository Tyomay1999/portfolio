'use client';

import React, { useMemo } from 'react';
import type { useTranslations } from 'next-intl';
import type { LinkItem } from '../model/projectsModel';
import ProjectLinks from './ProjectLinks';
import Image from 'next/image';
import { assetPath } from '@/lib/asset';
import { useTheme } from 'next-themes';

type T = ReturnType<typeof useTranslations>;

type Props = {
  t: T;
  expanded: boolean;
  heroLinks: LinkItem[];
  onOpen: (href: string | undefined, project: string, destination: string) => void;
};

type ThemeKey = 'D' | 'L';

function pickThemeKey(theme: string | undefined): ThemeKey {
  if (theme === 'light') return 'L';
  if (theme === 'dark') return 'D';
  return 'D';
}

export default function ProjectHero({ t, heroLinks, onOpen }: Props) {
  const { theme } = useTheme();

  const imgSrc = useMemo(() => {
    const key = pickThemeKey(theme);
    return assetPath(`/DE_${key}.png`);
  }, [theme]);

  return (
    <section className="mb-20 md:mb-32">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="mb-6 font-serif text-3xl tracking-tight md:text-4xl">{t('hero.name')}</h3>

          <p className="mb-6 font-serif text-base leading-relaxed md:text-lg">
            {t('hero.description')}
          </p>

          <p className="mb-6 font-serif text-sm">{t('hero.meta')}</p>

          <ProjectLinks t={t} projectTitle={t('hero.name')} items={heroLinks} onOpen={onOpen} />
        </div>

        <div className="order-first md:order-last">
          <div className="projects-screenshot-box rounded-xl" style={{ aspectRatio: '16/9' }}>
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src={assetPath(imgSrc)}
                alt={t('hero.name')}
                fill
                sizes="(min-width: 768px) 520px, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
