'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import StorySectionWrapper from '@/components/Sections/StorySectionWrapper';
import {
  workKeys,
  getVisibleWorkKeys,
  getNextWorkStep,
  shouldShowWorkButton,
  getWorkButtonLabel,
} from './utils/workExperience';

type WorkKey = (typeof workKeys)[number];

export default function WorkExperienceSection() {
  const t = useTranslations('workExperience');
  const [step, setStep] = useState<0 | 1>(0);

  const visibleKeys = getVisibleWorkKeys(workKeys, step);
  const showButton = shouldShowWorkButton(workKeys);
  const buttonLabel = getWorkButtonLabel(step, workKeys.length, t);

  return (
    <StorySectionWrapper>
      <h2 className="mb-12 text-center font-serif text-4xl font-light md:mb-16 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      <div className="space-y-5 md:space-y-12">
        {(visibleKeys as WorkKey[]).map((key: WorkKey, i: number) => {
          const jobDetails = t.raw(`${key}.details`) as string[];

          return (
            <div key={i} className="relative">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                <div className="md:text-right">
                  <div
                    className="mb-1 font-sans text-sm md:text-base"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {t(`${key}.period`)}
                  </div>

                  <div
                    className="font-sans text-sm font-medium md:text-base"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {t(`${key}.company`)}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="mb-3 font-serif text-xl font-medium md:text-2xl">
                    {t(`${key}.position`)}
                  </h3>

                  <ul
                    className="list-inside list-disc font-sans text-sm leading-relaxed md:text-base"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {Array.isArray(jobDetails) &&
                      jobDetails.map((detail, index) => <li key={index}>{detail}</li>)}
                  </ul>

                  <div
                    className="absolute top-0 bottom-0 left-1/3 hidden w-px md:block"
                    style={{ background: 'var(--ui-border)' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showButton && (
        <div className="pt-10 text-center">
          <button
            type="button"
            onClick={() => setStep(getNextWorkStep(step))}
            className="rounded-full border px-6 py-3 font-sans transition duration-300"
            style={{
              borderColor: 'var(--ui-border)',
              color: 'var(--text-primary)',
              background: 'var(--ui-surface-strong)',
            }}
          >
            {buttonLabel}
          </button>
        </div>
      )}

      <div className="mx-auto mt-8 h-0.5 w-24" style={{ background: 'var(--ui-border)' }} />
    </StorySectionWrapper>
  );
}
