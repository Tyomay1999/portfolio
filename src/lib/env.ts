function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function optional(value: string | undefined): string | undefined {
  return value || undefined;
}

function parseBool(value: string | undefined): boolean | undefined {
  if (!value) return undefined;
  const v = value.trim().toLowerCase();
  if (v === 'true') return true;
  if (v === 'false') return false;
  throw new Error(`Invalid boolean environment variable value: ${value}`);
}

type Locale = 'en' | 'ru' | 'hy';

function parseLocale(value: string | undefined): Locale | undefined {
  if (!value) return undefined;
  const v = value.trim().toLowerCase();
  if (v === 'en' || v === 'ru' || v === 'hy') return v;
  throw new Error(`Invalid locale environment variable value: ${value}`);
}

function parseIntSafe(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n)) {
    throw new Error(`Invalid integer environment variable value: ${value}`);
  }
  return n;
}

const isProd = process.env.NODE_ENV === 'production';

const serverUrlRaw = optional(process.env.NEXT_PUBLIC_SERVER_URL);

export const env = {
  SITE_URL: normalizeBaseUrl(
    isProd
      ? required('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL)
      : (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  ),

  SITE_NAME: isProd
    ? required('NEXT_PUBLIC_SITE_NAME', process.env.NEXT_PUBLIC_SITE_NAME)
    : (process.env.NEXT_PUBLIC_SITE_NAME ?? 'Portfolio'),

  SITE_LASTMOD: optional(process.env.NEXT_PUBLIC_SITE_LASTMOD),

  DC_SITE: optional(process.env.NEXT_PUBLIC_DECOMPLEX_SITE),
  DC_SITE_GIT: optional(process.env.NEXT_PUBLIC_DECOMPLEX_SITE_GIT),

  DC_WEB: optional(process.env.NEXT_PUBLIC_DECOMPLEX_WEB),
  DC_WEB_GIT: optional(process.env.NEXT_PUBLIC_DECOMPLEX_WEB_GIT),

  DC_ADMIN: optional(process.env.NEXT_PUBLIC_DECOMPLEX_ADMIN),
  DC_ADMIN_GIT: optional(process.env.NEXT_PUBLIC_DECOMPLEX_ADMIN_GIT),

  DC_MOBILE: optional(process.env.NEXT_PUBLIC_DECOMPLEX_MOBILE),
  DC_MOBILE_GIT: optional(process.env.NEXT_PUBLIC_DECOMPLEX_MOBILE_GIT),

  DC_BACKEND: optional(process.env.NEXT_PUBLIC_DECOMPLEX_BACKEND),
  DC_BACKEND_GIT: optional(process.env.NEXT_PUBLIC_DECOMPLEX_BACKEND_GIT),

  DEFAULT_LOCALE: parseLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE) ?? 'en',

  TOTAL_SECTIONS: parseIntSafe(process.env.NEXT_PUBLIC_TOTAL_SECTIONS) ?? 7,

  CONTACT_API: optional(process.env.NEXT_PUBLIC_CONTACT_API),
  API_URL: optional(process.env.NEXT_PUBLIC_API_URL),
  WS_URL: optional(process.env.NEXT_PUBLIC_WS_URL),

  SERVER_URL: serverUrlRaw ? normalizeBaseUrl(serverUrlRaw) : undefined,

  ENABLE_BACKEND: parseBool(process.env.NEXT_PUBLIC_ENABLE_BACKEND) ?? false,

  CV_URL: optional(process.env.NEXT_PUBLIC_CV_URL),

  BASE_PATH: optional(process.env.NEXT_PUBLIC_BASE_PATH)?.replace(/\/+$/, ''),
};
