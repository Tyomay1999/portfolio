import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Providers from '../Providers';
import { pickLocale } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const payload = await params;
  const locale = pickLocale(payload.locale);
  const messages = (await import(`../../messages/${locale}.json`)).default as Record<
    string,
    unknown
  >;

  return (
    <Providers>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </Providers>
  );
}
