import type { Metadata } from 'next';
import Root from '@/components/Root';
import { env } from '@/lib/env';
import type { Locale } from '@/i18n/settings';
import { absoluteUrl, buildPageMetadata, pickLocale } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: Promise<{ locale: string }>;
};

type SeoHome = {
  title?: string;
  description?: string;
  keywords?: string;
  personJobTitle?: string;
  sameAs?: string;
};

type Messages = {
  seo?: {
    home?: SeoHome;
  };
};

function splitCsv(value: string | undefined): string[] {
  return String(value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function getSeoHome(locale: Locale): Promise<SeoHome> {
  const messages = (await import(`../../messages/${locale}.json`)).default as Messages;
  return (messages?.seo?.home ?? {}) as SeoHome;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = await params;
  const locale = pickLocale(payload.locale);
  const seo = await getSeoHome(locale);

  const title = seo.title ?? env.SITE_NAME;
  const description = seo.description ?? '';
  const keywords = splitCsv(seo.keywords);

  return buildPageMetadata({
    locale,
    pathname: '',
    title,
    description,
    keywords,
    ogImagePath: '/og/og-home-1200x630.png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: title,
  });
}

export default async function Page({ params }: Props) {
  const payload = await params;
  const locale = pickLocale(payload.locale);
  const seo = await getSeoHome(locale);

  const description = seo.description ?? '';
  const personJobTitle = seo.personJobTitle ?? 'Software Engineer';
  const sameAs = splitCsv(seo.sameAs);

  const pageUrl = absoluteUrl(`/${locale}`);

  const personSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: env.SITE_NAME,
    url: pageUrl,
    jobTitle: personJobTitle,
    description,
    sameAs,
  };

  const websiteSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: env.SITE_NAME,
    url: pageUrl,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema]),
        }}
      />
      <Root />
    </>
  );
}
