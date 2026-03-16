'use client';

import type { SectionId } from '@/lib/sections';

type Props = {
  active: boolean;
  onClick: () => void;
  id: SectionId;
};

export default function NavigationDot({ active, onClick, id }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to section ${id}`}
      aria-current={active ? 'true' : undefined}
      className={[
        'ui-dot cursor-pointer rounded-full',
        'h-3.5 w-3.5 md:h-4 md:w-4',
        'transition-transform duration-150 ease-out',
        'active:scale-90',
        active ? 'ui-dot-active ring-2 ring-offset-2' : '',
        'focus-visible:ring-2 focus-visible:ring-current/25 focus-visible:ring-offset-2 focus-visible:outline-none',
      ].join(' ')}
    />
  );
}
