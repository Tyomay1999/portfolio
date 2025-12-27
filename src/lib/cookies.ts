export function readThemeCookie(cookieHeader: string): 'dark' | 'light' | 'system' {
  const theme = /(?:^|;\s*)theme=(dark|light)(?:;|$)/.exec(cookieHeader)?.[1];
  if (theme === 'dark' || theme === 'light') return theme;
  return 'system';
}
