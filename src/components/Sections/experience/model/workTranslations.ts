export function getRawStringArray(t: { raw: (key: string) => unknown }, key: string): string[] {
  const raw = t.raw(key);

  if (Array.isArray(raw) && raw.every((x) => typeof x === 'string')) {
    return raw;
  }

  return [];
}
