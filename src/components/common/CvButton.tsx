'use client';

import { env } from '@/lib/env';

type Props = {
  href?: string;
};

export default function CvButton({ href = env.CV_URL ?? '/cv.pdf' }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open CV"
      className={[
        'ui-control',
        'fixed top-4 right-4 z-50',
        'rounded-xl px-4 py-2',
        'font-sans text-sm font-medium',
        'transition-transform duration-150 ease-out',
        'active:scale-95',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ui-border)]',
      ].join(' ')}
    >
      CV
    </a>
  );
}
