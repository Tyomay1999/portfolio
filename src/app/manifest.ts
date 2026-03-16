import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export const dynamic = 'force-static';

function withBasePath(path: string): string {
  const bp = env.BASE_PATH ?? '';
  return bp ? `${bp}${path}` : path;
}

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: env.SITE_NAME,
    short_name: env.SITE_NAME,
    start_url: withBasePath('/'),
    display: 'standalone',
    background_color: '#0b1220',
    theme_color: '#0b1220',
    icons: [
      {
        src: withBasePath('/logo/web-app-manifest-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: withBasePath('/logo/web-app-manifest-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: withBasePath('/logo/apple-touch-icon.png'),
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
