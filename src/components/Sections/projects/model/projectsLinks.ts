import type { LinkKey, ComponentBlock } from './projectsModel';
import { env } from '@/lib/env';

export function getHeroHref(key: LinkKey): string {
  return (key === 'live' ? env.DC_SITE : env.DC_SITE_GIT) ?? '#';
}

export function getBlockHref(
  block: Pick<ComponentBlock, 'icon'>,
  key: LinkKey,
): string | undefined {
  if (block.icon === 'monitor') return key === 'live' ? env.DC_WEB : env.DC_WEB_GIT;
  if (block.icon === 'settings') return key === 'live' ? env.DC_ADMIN : env.DC_ADMIN_GIT;
  if (block.icon === 'mobile') return key === 'live' ? env.DC_MOBILE : env.DC_MOBILE_GIT;
  if (block.icon === 'server') return key === 'live' ? env.DC_BACKEND : env.DC_BACKEND_GIT;
  return undefined;
}
