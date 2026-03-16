import type { MetadataRoute } from 'next';
import { languages } from '@/i18n/settings';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return languages.map((locale) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified,
  }));
}
