'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Toast } from '@/components/ui/toast';

type ToastPayload =
  | { kind: 'key'; key: string; values?: Record<string, string | number | Date> }
  | { kind: 'text'; text: string };

export function useToast() {
  const [payload, setPayload] = useState<ToastPayload | null>(null);
  const t = useTranslations('toast');

  const showToast = (key: string, values?: Record<string, string | number | Date>) => {
    setPayload({ kind: 'key', key, values });
  };

  const showToastText = (text: string) => {
    setPayload({ kind: 'text', text });
  };

  const message =
    payload?.kind === 'key'
      ? t(payload.key, payload.values)
      : payload?.kind === 'text'
        ? payload.text
        : null;

  const ToastComponent = message ? (
    <Toast message={message} onClose={() => setPayload(null)} />
  ) : null;

  return { showToast, showToastText, ToastComponent };
}
