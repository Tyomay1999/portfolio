'use client';

import { useEffect } from 'react';

type Props = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const id = window.setTimeout(onClose, 4200);
    return () => window.clearTimeout(id);
  }, [onClose]);

  return (
    <div className="animate-toast-in pointer-events-none fixed right-6 bottom-6 z-50">
      <div className="pointer-events-auto rounded-xl border border-black/5 bg-white/80 px-4 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:shadow-black/40">
        {message}
      </div>
    </div>
  );
}
