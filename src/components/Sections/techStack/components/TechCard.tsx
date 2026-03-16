'use client';

import Image from 'next/image';
import clsx from 'clsx';
import type { TechItem } from '../model/techStackModel';
import { assetPath } from '@/lib/asset';

type Props = {
  item: TechItem;
  index: number;
};

export default function TechCard({ item, index }: Props) {
  return (
    <div
      className="tech-item w-full max-w-[220px] md:max-w-[240px]"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div
        className={[
          'tech-card group cursor-pointer rounded-2xl p-4 md:p-6',
          'transition-transform duration-150 ease-out',
          'active:scale-95',
        ].join(' ')}
      >
        <div className="flex flex-col items-center gap-3 text-center md:gap-4">
          <div
            className={clsx(
              'tech-card-icon-wrap flex h-16 w-16 items-center justify-center rounded-2xl md:h-20 md:w-20',
              `bg-gradient-to-br ${item.colorClass}`,
            )}
          >
            <Image
              src={assetPath(item.icon)}
              alt={item.name}
              width={40}
              height={40}
              className="h-8 w-8 object-contain md:h-10 md:w-10"
            />
          </div>

          <div className="tech-card-title font-sans text-sm leading-snug font-medium md:text-lg">
            {item.name}
          </div>
        </div>
      </div>
    </div>
  );
}
