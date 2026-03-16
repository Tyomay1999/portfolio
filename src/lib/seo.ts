import type { Metadata } from 'next';
import { env } from '@/lib/env';
import { defaultLocale, languages } from '@/i18n/settings';
import type { Locale } from '@/i18n/settings';

export function withBasePath(path: string): string {
  const bp = env.BASE_PATH ?? '';
  return bp ? `${bp}${path}` : path;
}

function stripTrailingSlash(url: string): string {
  const u = new URL(url);
  const p = u.pathname;
  if (p !== '/' && p.endsWith('/')) u.pathname = p.slice(0, -1);
  return u.toString();
}

function normalizePathname(pathname: string): string {
  if (!pathname) return '';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function absoluteUrl(path: string): string {
  return stripTrailingSlash(new URL(withBasePath(path), env.SITE_URL).toString());
}

export function pickLocale(raw: string): Locale {
  return (languages.includes(raw as Locale) ? raw : defaultLocale) as Locale;
}

export function buildLanguageAlternates(pathname: string): Record<Locale, string> {
  const pn = normalizePathname(pathname);
  return Object.fromEntries(languages.map((l) => [l, absoluteUrl(`/${l}${pn}`)])) as Record<
    Locale,
    string
  >;
}

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  hy: 'hy_AM',
};

export function buildOgAlternateLocales(active: Locale): string[] {
  const current = ogLocaleMap[active];
  return languages.map((l) => ogLocaleMap[l]).filter((x) => x !== current);
}

export function buildPageMetadata(opts: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImagePath: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
}): Metadata {
  const pn = normalizePathname(opts.pathname);
  const canonical = absoluteUrl(`/${opts.locale}${pn}`);
  const ogImage = absoluteUrl(opts.ogImagePath);

  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        ...buildLanguageAlternates(pn),
        'x-default': absoluteUrl(`/${defaultLocale}${pn}`),
      },
    },
    openGraph: {
      type: 'website',
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: env.SITE_NAME,
      locale: ogLocaleMap[opts.locale],
      alternateLocale: buildOgAlternateLocales(opts.locale),
      images: [
        {
          url: ogImage,
          width: opts.ogImageWidth,
          height: opts.ogImageHeight,
          alt: opts.ogImageAlt ?? opts.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
  };
}
