import { getRawStringArray } from '../model/workTranslations';
import type { WorkKey } from '../model/workExperienceModel';

type Props = {
  workKey: WorkKey;
  t: (key: string) => string;
  raw: (key: string) => unknown;
};

export default function WorkItem({ workKey, t, raw }: Props) {
  const details = getRawStringArray({ raw }, `${workKey}.details`);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        <div className="md:text-right">
          <div
            className="mb-1 font-sans text-sm md:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t(`${workKey}.period`)}
          </div>

          <div
            className="font-sans text-sm font-medium md:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t(`${workKey}.company`)}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-3 font-serif text-xl font-medium md:text-2xl">
            {t(`${workKey}.position`)}
          </h3>

          <ul
            className="list-inside list-disc font-sans text-sm leading-relaxed md:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <div
            className="absolute top-0 bottom-0 left-1/3 hidden w-px md:block"
            style={{ background: 'var(--ui-border)' }}
          />
        </div>
      </div>
    </div>
  );
}
