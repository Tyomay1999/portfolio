'use client';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  direction: 'up' | 'down';
};

export default function NavigationArrow({ direction, children, className, ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      className={[
        'group cursor-pointer',
        'flex h-12 w-12 items-center justify-center',
        'rounded-full',
        'border-0 bg-transparent shadow-none',
        'transition-transform duration-150 ease-out',
        'active:scale-[0.96]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-current/25',
        className ?? '',
      ].join(' ')}
      aria-label={direction === 'up' ? 'Previous section' : 'Next section'}
    >
      <span
        className={[
          'flex h-9 w-9 items-center justify-center rounded-full',
          'bg-transparent',
          'transition duration-150 ease-out',
          'group-hover:bg-current/5',
          'group-active:bg-current/10',
        ].join(' ')}
      >
        {children}
      </span>
    </button>
  );
}
