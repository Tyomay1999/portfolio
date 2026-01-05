'use client';

import { useEffect } from 'react';

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onClose, 5200);
    return () => window.clearTimeout(id);
  }, [onClose]);

  return (
    <div className="toast fixed top-5 left-5 z-50 rounded-lg bg-white px-4 py-3 text-sm shadow-lg dark:bg-slate-900">
      {message}
    </div>
  );
}
