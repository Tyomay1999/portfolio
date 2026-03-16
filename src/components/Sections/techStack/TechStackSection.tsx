'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { StorySectionWrapper } from '../_shared';
import FilterSelect from './components/FilterSelect';
import TechGrid from './components/TechGrid';
import type { Category } from './model/techStackModel';
import {
  getFilteredItems,
  getVisibleItems,
  shouldShowButton,
  getNextStep,
  getButtonLabel,
  techItems,
} from './model/techStackModel';

export default function TechStackSection() {
  const t = useTranslations('techStack');

  const [selected, setSelected] = useState<Category>('core');
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const filtered = getFilteredItems(techItems, selected);
  const visible = getVisibleItems(filtered, step, selected);
  const showButton = shouldShowButton(filtered, selected);
  const buttonText = getButtonLabel(step, filtered.length, (k) => t(k), selected);

  const onChangeCategory = (v: Category) => {
    setSelected(v);
    setStep(0);
  };

  return (
    <StorySectionWrapper>
      <h2 className="mb-6 text-center font-serif text-4xl font-light md:mb-8 md:text-4xl lg:mb-10 lg:text-6xl">
        {t('title')}
      </h2>

      <div className="mb-8 flex justify-center md:mb-10">
        <FilterSelect value={selected} onChange={onChangeCategory} t={(k) => t(k)} />
      </div>

      <TechGrid items={visible} />

      {showButton && (
        <div className="pb-12 text-center">
          <button
            type="button"
            onClick={() => setStep(getNextStep(step, filtered.length, selected))}
            className="ui-control rounded-full px-6 py-3 font-sans text-sm font-medium"
          >
            {buttonText}
          </button>
        </div>
      )}
    </StorySectionWrapper>
  );
}
