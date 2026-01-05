'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/components/Sections/StorySectionWrapper';

export default function AboutMeSection() {
  const t = useTranslations('summary');

  return (
    <StorySectionWrapper>
      <div className="mx-auto max-w-3xl px-2 text-center transition-colors duration-300 sm:px-4">
        <h1 className="mb-8 font-serif text-4xl font-light md:mb-12 md:text-4xl lg:text-6xl">
          {t('aboutMe')}
        </h1>

        <div className="space-y-6 font-sans text-base leading-relaxed md:space-y-8 md:text-lg lg:text-xl">
          <p className="mb-6 text-justify">{t('intro')}</p>
          <p className="mb-6 text-justify">{t('specialization')}</p>

          <ul className="mb-6 ml-0 list-disc space-y-2 pl-5 text-justify sm:ml-6">
            <li>{t('experience.list1')}</li>
            <li>{t('experience.list2')}</li>
            <li>{t('experience.list3')}</li>
            <li>{t('experience.list4')}</li>
            <li>{t('experience.list5')}</li>
          </ul>

          <p className="text-justify italic">{t('focus')}</p>
        </div>

        <div className="mx-auto mt-8 h-0.5 w-24 bg-slate-300 dark:bg-slate-600" />
      </div>
    </StorySectionWrapper>
  );
}
