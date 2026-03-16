export const workKeys = ['genieWeb', 'pixeria', 'beeOnCode1', 'beeOnCode2', 'instructor'] as const;

export type WorkKey = (typeof workKeys)[number];

export function getVisibleWorkKeys(keys: readonly WorkKey[], step: 0 | 1): WorkKey[] {
  if (step === 0) return keys.slice(0, 2);
  return [...keys];
}

export function getNextWorkStep(step: 0 | 1): 0 | 1 {
  return step === 0 ? 1 : 0;
}

export function shouldShowWorkButton(keys: readonly WorkKey[]): boolean {
  return keys.length > 2;
}

export function getWorkButtonLabel(
  step: 0 | 1,
  total: number,
  t: (key: 'viewMore' | 'viewLess' | 'viewAll', values?: never) => string,
): string {
  if (total <= 2) return '';
  return step === 0 ? t('viewMore') : t('viewLess');
}
