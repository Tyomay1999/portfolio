'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { defaultLocale } from '../i18n/settings';

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    const target = `/${defaultLocale}/`;
    if (pathname === target || pathname === `/${defaultLocale}`) return;
    window.location.replace(target);
  }, [pathname]);

  return null;
}
