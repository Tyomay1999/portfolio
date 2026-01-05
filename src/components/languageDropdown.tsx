'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useIsMounted } from '@/hooks/useIsMounted';

const supportedLanguages = ['en', 'hy', 'ru'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

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

  const language = useMemo(() => extractLocale(pathname), [pathname]);

  const buildPathForLocale = (loc: SupportedLanguage) => {
    const stripped = pathname.replace(/^\/(en|hy|ru)(?=\/|$)/, '');
    let nextPath = `/${loc}${stripped || '/'}`;

    const qs = searchParams?.toString();
    if (qs) nextPath += `?${qs}`;

    if (typeof window !== 'undefined' && window.location.hash) {
      nextPath += window.location.hash;
    }

    return nextPath;
  };

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('language', language);
    document.cookie = `NEXT_LOCALE=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [language, mounted]);

  useEffect(() => {
    if (!ddOpen) return;

    const onDoc = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };

    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [ddOpen]);

  useEffect(() => {
    if (!ddOpen) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDdOpen(false);
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [ddOpen]);

  if (!mounted) return null;

  return (
    <div ref={ddRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={ddOpen}
        aria-controls="lang-listbox"
        onClick={() => setDdOpen((v) => !v)}
        className="ui-control flex min-w-[92px] items-center justify-between rounded-lg px-3 py-2 text-sm focus:outline-none"
      >
        <span className="font-medium">{language.toUpperCase()}</span>
        <span className="ml-2">▾</span>
      </button>

      {ddOpen && (
        <div
          id="lang-listbox"
          role="listbox"
          className="ui-menu absolute left-0 z-50 mt-1 w-[140px] overflow-hidden rounded-xl"
        >
          {supportedLanguages.map((loc) => {
            const active = loc === language;

            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  router.push(buildPathForLocale(loc));
                  setDdOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm focus:outline-none"
                style={{
                  color: 'var(--ui-text)',
                  background: active ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (active) return;
                  (e.currentTarget as HTMLButtonElement).style.background =
                    'rgba(37, 99, 235, 0.10)';
                }}
                onMouseLeave={(e) => {
                  if (active) return;
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                {loc.toUpperCase()}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
