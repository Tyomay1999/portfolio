'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useIsMounted } from '../hooks/useIsMounted';

const supportedLanguages = ['en', 'hy', 'ru'] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

function extractLocale(path: string): SupportedLanguage {
  const m = path.match(/^\/(en|hy|ru)(?=\/|$)/);
  return (m?.[1] as SupportedLanguage) || 'en';
}

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname() || '/en';
  const searchParams = useSearchParams();
  const mounted = useIsMounted();

  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement | null>(null);

  // 🔑 locale вычисляется из URL, НЕ state
  const language = useMemo(() => extractLocale(pathname), [pathname]);

  const buildPathForLocale = (loc: SupportedLanguage) => {
    const stripped = pathname.replace(/^\/(en|hy|ru)(?=\/|$)/, '');
    let nextPath = `/${loc}${stripped || '/'}`;
    const qs = searchParams?.toString();
    if (qs) nextPath += `?${qs}`;
    if (window.location.hash) nextPath += window.location.hash;
    return nextPath;
  };

  // side-effects без setState → линтер ОК
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('language', language);
    document.cookie = `NEXT_LOCALE=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [language, mounted]);

  if (!mounted) return null;

  return (
    <div ref={ddRef}>
      <button onClick={() => setDdOpen((v) => !v)}>{language.toUpperCase()}</button>

      {ddOpen &&
        supportedLanguages.map((loc) => (
          <button
            key={loc}
            onClick={() => {
              router.push(buildPathForLocale(loc));
              setDdOpen(false);
            }}
          >
            {loc.toUpperCase()}
          </button>
        ))}
    </div>
  );
}
