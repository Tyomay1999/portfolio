import { env } from '@/lib/env';

export function assetPath(path: string): string {
  const p = String(path || '');
  if (!p.startsWith('/')) return p;
  const bp = env.BASE_PATH ?? '';
  return bp ? `${bp}${p}` : p;
}
