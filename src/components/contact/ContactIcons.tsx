'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { contactItems } from './utils';
import { useToast } from '@/hooks/useToast';

const ContactIcons: FC = () => {
  const t = useTranslations('contactIcons');
  const { showToast, ToastComponent } = useToast();

  return (
    <>
      <div
        role="list"
        aria-label={t('listAriaLabel')}
        className="mx-auto mt-6 mb-8 grid w-full max-w-[340px] grid-cols-5 justify-items-center gap-2 sm:mt-8 sm:max-w-2xl sm:gap-4 sm:pr-0 md:mb-12 md:gap-6"
      >
        {contactItems(showToast).map((item, idx) => (
          <button
            key={idx}
            type="button"
            role="listitem"
            aria-label={t(item.ariaLabelKey)}
            className="ui-icon-btn flex flex-col items-center"
            onClick={item.action}
          >
            <div className="ui-icon-circle mb-2 flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14">
              {item.icon}
            </div>

            <span className="text-xs" style={{ color: 'var(--ui-muted)' }}>
              {t(item.labelKey)}
            </span>
          </button>
        ))}
      </div>

      {ToastComponent}
    </>
  );
};

export default ContactIcons;
