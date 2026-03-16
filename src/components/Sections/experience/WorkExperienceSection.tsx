'use client';

import React, { useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useTranslations } from 'next-intl';
import { StorySectionWrapper } from '../_shared';
import WorkItem from './components/WorkItem';
import {
  workKeys,
  getVisibleWorkKeys,
  getNextWorkStep,
  shouldShowWorkButton,
  getWorkButtonLabel,
} from './model/workExperienceModel';

import { useToggleSectionScroll } from '@/hooks/useToggleSectionScroll';

export default function WorkExperienceSection() {
  const t = useTranslations('workExperience');
  const [step, setStep] = useState<0 | 1>(0);

  const anchorRef = useRef<HTMLDivElement | null>(null);

  const visibleKeys = useMemo(() => getVisibleWorkKeys(workKeys, step), [step]);
  const showButton = shouldShowWorkButton(workKeys);
  const buttonLabel = getWorkButtonLabel(step, workKeys.length, (key, values) =>
    t(key, values as never),
  );

  useToggleSectionScroll({
    expanded: step === 1,
    anchorRef: anchorRef as RefObject<HTMLElement>,
    halfScreens: 1,
  });

  return (
    <StorySectionWrapper>
      <h2 className="mb-12 text-center font-serif text-4xl font-light md:mb-16 md:text-4xl lg:text-6xl">
        {t('title')}
      </h2>

      <div ref={anchorRef} />

      <div className="space-y-5 md:space-y-12">
        {visibleKeys.map((key, idx) => (
          <React.Fragment key={key}>
            <WorkItem key={key} workKey={key} t={(k) => t(k)} raw={(k) => t.raw(k)} />

            {idx !== visibleKeys.length - 1 && (
              <div
                className="mx-auto h-px w-full opacity-60 md:hidden"
                style={{ background: 'var(--ui-border)' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {showButton && (
        <div className="pt-10 text-center">
          <button
            type="button"
            onClick={() => setStep(getNextWorkStep(step))}
            className="cursor-pointer rounded-full border px-6 py-3 font-sans transition duration-300"
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
