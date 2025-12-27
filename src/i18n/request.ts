import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, isLocale } from './settings';
import { Locale } from './settings';

export default getRequestConfig(async ({ requestLocale }) => {
  const rawLocale = await requestLocale;

  const locale: Locale = isLocale(rawLocale ?? '') ? (rawLocale as Locale) : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
