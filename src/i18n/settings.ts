import { env } from '../lib/env';

export const languages = ['en', 'ru', 'hy'] as const;
export type Locale = (typeof languages)[number];

const languageSet: ReadonlySet<Locale> = new Set(languages);

export function isLocale(value: string): value is Locale {
  return languageSet.has(value as Locale);
}

export const defaultLocale: Locale = isLocale(env.DEFAULT_LOCALE) ? env.DEFAULT_LOCALE : 'en';
