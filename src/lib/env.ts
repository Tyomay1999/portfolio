function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

export const env = {
  SITE_URL: normalizeBaseUrl(required('NEXT_PUBLIC_SITE_URL')),
  SITE_NAME: required('NEXT_PUBLIC_SITE_NAME'),

  DEFAULT_LOCALE: (optional('NEXT_PUBLIC_DEFAULT_LOCALE') ?? 'en') as 'en' | 'ru' | 'hy',
  TOTAL_SECTIONS: Number(optional('NEXT_PUBLIC_TOTAL_SECTIONS') ?? 7),

  CONTACT_API: optional('NEXT_PUBLIC_CONTACT_API'),
  API_URL: optional('NEXT_PUBLIC_API_URL'),
  WS_URL: optional('NEXT_PUBLIC_WS_URL'),
};
