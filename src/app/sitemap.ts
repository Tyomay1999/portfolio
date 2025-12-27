import type { MetadataRoute } from 'next';
import { languages } from '../i18n/settings';
import { env } from '../lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL.replace(/\/+$/, '');

  return languages.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
  }));
}
