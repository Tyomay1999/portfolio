export const languages = ['en', 'ru', 'hy'] as const;
export type Locale = (typeof languages)[number];

export function isLocale(value: string): value is Locale {
  return (languages as readonly string[]).includes(value);
}

export const defaultLocale: Locale = 'en';
