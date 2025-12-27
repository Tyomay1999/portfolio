'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/components/Sections/StorySectionWrapper';

export default function WorkExperienceSection() {
  const t = useTranslations('sections.experience');
  return (
    <StorySectionWrapper>
      <div className="flex min-h-[100vh] items-center justify-center">
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6 text-slate-900 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100">
          <h2 className="text-xl font-semibold">{t('title')}</h2>
          <p className="mt-2 opacity-80">{t('body')}</p>
        </div>
      </div>
    </StorySectionWrapper>
  );
}
