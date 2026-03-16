'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, JSX } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useIsMounted } from '@/hooks/useIsMounted';
import { env } from '@/lib/env';
import { defaultLocale, isLocale, languages } from '@/i18n/settings';
import type { Locale } from '@/i18n/settings';
import { getActiveSection } from '@/lib/sectionStore';

export type SupportedLanguage = Locale;

function normalizePathname(path: string): string {
  const p = path || '/';
  const bp = env.BASE_PATH ?? '';
  if (!bp) return p;
  return p.startsWith(bp) ? p.slice(bp.length) || '/' : p;
}

function extractLocaleFromPath(path: string): SupportedLanguage {
  const first = path.split('/').filter(Boolean)[0] ?? '';
  return isLocale(first) ? first : defaultLocale;
}

function withBasePath(path: string): string {
  const bp = env.BASE_PATH ?? '';
  return bp ? `${bp}${path}` : path;
}

const SCROLL_KEY = 'dc:storyScrollTop';
const SECTION_KEY = 'dc:activeSection';

function getStoryScroller(): HTMLElement | null {
  return document.querySelector('.story-scroll-container');
}

function safeSetSessionItem(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

function safeGetSessionItem(key: string): string | null {
  return sessionStorage.getItem(key);
}

function safeRemoveSessionItem(key: string): void {
  sessionStorage.removeItem(key);
}

function saveUiState(): void {
  const el = getStoryScroller();
  if (el) safeSetSessionItem(SCROLL_KEY, String(el.scrollTop));
  safeSetSessionItem(SECTION_KEY, String(getActiveSection()));
}

function restoreScroll(): void {
  const el = getStoryScroller();
  if (!el) return;

  const raw = safeGetSessionItem(SCROLL_KEY);
  if (!raw) return;

  const top = Number(raw);
  if (Number.isFinite(top)) el.scrollTop = top;

  safeRemoveSessionItem(SCROLL_KEY);
}

export default function LanguageDropdown(): JSX.Element | null {
  const router = useRouter();
  const pathnameRaw = usePathname() ?? '/';
  const mounted = useIsMounted();

  const [ddOpen, setDdOpen] = useState<boolean>(false);
  const ddRef = useRef<HTMLDivElement | null>(null);

  const normalizedPath = useMemo<string>(() => normalizePathname(pathnameRaw), [pathnameRaw]);
  const language = useMemo<SupportedLanguage>(
    () => extractLocaleFromPath(normalizedPath),
    [normalizedPath],
  );

  const buildPathForLocale = (loc: SupportedLanguage): string => withBasePath(`/${loc}`);

  useEffect((): void => {
    if (!mounted) return;

    localStorage.setItem('language', language);
    document.cookie = `NEXT_LOCALE=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [language, mounted]);

  useEffect((): (() => void) | void => {
    if (!ddOpen) return;

    const onDoc = (e: globalThis.MouseEvent): void => {
      const root = ddRef.current;
      if (!root) return;

      const target = e.target;
      if (!(target instanceof Node)) return;

      if (!root.contains(target)) setDdOpen(false);
    };

    document.addEventListener('mousedown', onDoc);
    return (): void => document.removeEventListener('mousedown', onDoc);
  }, [ddOpen]);

  useEffect((): (() => void) | void => {
    if (!ddOpen) return;

    const onEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setDdOpen(false);
    };

    window.addEventListener('keydown', onEsc);
    return (): void => window.removeEventListener('keydown', onEsc);
  }, [ddOpen]);

  useEffect((): void => {
    if (!mounted) return;
    requestAnimationFrame((): void => {
      restoreScroll();
    });
  }, [mounted, pathnameRaw]);

  if (!mounted) return null;

  return (
    <div ref={ddRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={ddOpen}
        aria-controls="lang-listbox"
        onClick={(): void => setDdOpen((v: boolean) => !v)}
        className="ui-control flex min-w-[92px] cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm focus:outline-none"
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
          {languages.map((loc: SupportedLanguage) => {
            const active = loc === language;

            const onClick = (): void => {
              if (active) {
                setDdOpen(false);
                return;
              }

              saveUiState();
              router.push(buildPathForLocale(loc), { scroll: false });
              setDdOpen(false);
            };

            const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>): void => {
              if (active) return;
              e.currentTarget.style.background = 'rgba(37, 99, 235, 0.10)';
            };

            const onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
              if (active) return;
              e.currentTarget.style.background = 'transparent';
            };

            const style: CSSProperties = {
              color: 'var(--ui-text)',
              background: active ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
            };

            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={active}
                onClick={onClick}
                className="w-full cursor-pointer px-4 py-2.5 text-left text-sm focus:outline-none"
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
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
