'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { defaultLocale } from '../i18n/settings';

export default function NotFound() {
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    const target = `/${defaultLocale}/`;
    if (pathname === target || pathname === `/${defaultLocale}`) return;
    window.location.replace(target);
  }, [pathname]);

  return null;
}
