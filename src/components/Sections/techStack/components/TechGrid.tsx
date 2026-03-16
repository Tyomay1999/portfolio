'use client';

import TechCard from './TechCard';
import type { TechItem } from '../model/techStackModel';

type Props = {
  items: TechItem[];
};

export default function TechGrid({ items }: Props) {
  return (
    <div className="mb-8 grid min-h-[50vh] grid-cols-2 justify-items-center gap-4 md:mb-12 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5">
      {items.map((item, idx) => (
        <TechCard key={item.name} item={item} index={idx} />
      ))}
    </div>
  );
}
