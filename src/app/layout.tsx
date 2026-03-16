import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './globals.css';
import HtmlLangSync from '@/components/common/HtmlLangSync';
import { defaultLocale, isLocale } from '@/i18n/settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = { children: ReactNode };

function pickLocale(v: string | null | undefined): string {
  return v && isLocale(v) ? v : defaultLocale;
}

export default async function RootLayout({ children }: Props) {
  const h = await headers();
  const lang = pickLocale(h.get('x-locale'));

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="min-h-screen">
        <HtmlLangSync />
        {children}
      </body>
    </html>
  );
}
