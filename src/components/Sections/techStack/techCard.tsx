'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export type TechItem = {
  name: string;
  icon: string;
  colorClass: string;
};

type Props = { item: TechItem; index: number };

const TechCard: React.FC<Props> = ({ item, index }) => {
  return (
    <div className="tech-item" style={{ transitionDelay: `${index * 40}ms` }}>
      <div className="tech-card group cursor-pointer rounded-2xl p-4 md:p-6">
        <div className="flex flex-col items-center gap-3 text-center md:gap-4">
          <div
            className={clsx(
              'tech-card-icon-wrap flex h-16 w-16 items-center justify-center rounded-2xl md:h-20 md:w-20',
              `bg-gradient-to-br ${item.colorClass}`,
            )}
          >
            <Image
              src={item.icon}
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
};

export default TechCard;
