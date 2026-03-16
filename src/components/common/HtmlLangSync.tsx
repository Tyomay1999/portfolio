'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { defaultLocale, isLocale } from '@/i18n/settings';
import type { Locale } from '@/i18n/settings';

function extractLocale(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0] ?? '';
  return isLocale(first) ? first : defaultLocale;
}

export default function HtmlLangSync() {
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    document.documentElement.lang = extractLocale(pathname) as string;
  }, [pathname]);

  return null;
}
