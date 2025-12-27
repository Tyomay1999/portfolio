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

  // Side-effects are here (so handler stays “pure”)
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem('language', language);

    document.cookie = `NEXT_LOCALE=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [language, mounted]);

  useEffect(() => {
    if (!ddOpen) return;

    const onDoc = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current?.contains(e.target as Node)) setDdOpen(false);
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
        className="flex min-w-[92px] items-center justify-between rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 backdrop-blur-sm transition focus:ring-2 focus:ring-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:[color-scheme:dark]"
      >
        <span className="font-medium">{language.toUpperCase()}</span>
        <span className="ml-2">▾</span>
      </button>

      {ddOpen && (
        <div
          id="lang-listbox"
          role="listbox"
          className="absolute left-0 z-50 mt-1 max-h-60 w-[140px] overflow-auto rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:[color-scheme:dark]"
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
                className={[
                  'w-full px-4 py-2.5 text-left text-sm focus:outline-none',
                  'text-slate-900 dark:text-slate-100',
                  active
                    ? 'bg-blue-50 dark:bg-blue-950/40'
                    : 'hover:bg-blue-50 dark:hover:bg-slate-800/70',
                ].join(' ')}
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
