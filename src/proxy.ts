import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { defaultLocale, isLocale, languages } from './i18n/settings';
import type { Locale } from './i18n/settings';

function isBypassPath(pathname: string): boolean {
  return pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.');
}

function pickFromAcceptLanguage(value: string | null): Locale | null {
  if (!value) return null;

  const parts = value
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  for (const p of parts) {
    const tag = p.split(';')[0]?.trim() ?? '';
    const primary = tag.split('-')[0] ?? '';
    if (isLocale(primary)) return primary;
  }

  return null;
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const fromHeader = pickFromAcceptLanguage(request.headers.get('accept-language'));
  return fromHeader ?? defaultLocale;
}

function applyLocale(res: NextResponse, locale: Locale): NextResponse {
  res.headers.set('x-locale', locale);
  res.headers.set('x-middleware-request-x-locale', locale);
  res.headers.set('x-middleware-override-headers', 'x-locale');
  res.cookies.set('NEXT_LOCALE', locale, { path: '/' });
  return res;
}

function redirectToLocaleRoot(request: NextRequest, locale: Locale): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  url.search = '';
  return applyLocale(NextResponse.redirect(url), locale);
}

export default function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (isBypassPath(pathname)) return NextResponse.next();

  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0] ?? '';
  const localeInPath = isLocale(first) ? (first as Locale) : null;

  if (segments.length === 0) {
    const preferred = getPreferredLocale(request);
    return redirectToLocaleRoot(request, preferred);
  }

  if (!localeInPath) {
    const preferred = getPreferredLocale(request);
    return redirectToLocaleRoot(request, preferred);
  }

  if (!languages.includes(localeInPath)) {
    return redirectToLocaleRoot(request, defaultLocale);
  }

  if (segments.length > 1) {
    return redirectToLocaleRoot(request, localeInPath);
  }

  return applyLocale(NextResponse.next(), localeInPath);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
