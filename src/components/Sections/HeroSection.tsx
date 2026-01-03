'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/components/Sections/StorySectionWrapper';
import TypingText from '@/components/hero/TypingText';
import ContactIcons from '@/components/contact/ContactIcons';

export default function HeroSection() {
  const t = useTranslations('hero');
  const typingPhrases = t.raw('typingPhrases') as string[];

  return (
    <StorySectionWrapper>
      <div className="fixed inset-0">
        <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-center px-4 pt-[calc(env(safe-area-inset-top,0px)+0.5rem)] pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] text-center sm:px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="hero-parallax w-full">
            <h1 className="mb-4 font-serif text-4xl leading-tight font-light tracking-wide text-slate-900 drop-shadow-sm md:text-6xl lg:text-7xl dark:text-slate-100">
              {t('name')} <span className="whitespace-nowrap">({t('nickname')})</span>
            </h1>

            <div className="mt-4 flex h-8 items-center justify-center md:mt-6 md:h-10">
              <TypingText phrases={typingPhrases} />
            </div>

            <div className="px-2 sm:px-4 md:px-6">
              <ContactIcons />
            </div>

            <div className="mx-auto mt-8 h-0.5 w-24 bg-slate-300 dark:bg-slate-600" />
            <h2 className="mt-6 font-sans text-lg tracking-wide text-slate-600 md:text-xl dark:text-slate-400">
              {t('role')}
            </h2>
          </div>
        </div>
      </div>
    </StorySectionWrapper>
  );
}
