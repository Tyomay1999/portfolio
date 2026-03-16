import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');
const basePath = rawBasePath.length > 0 ? rawBasePath : undefined;

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,

  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  trailingSlash: false,

  images: {
    unoptimized: true,
  },
} satisfies NextConfig;

export default withNextIntl(nextConfig);
