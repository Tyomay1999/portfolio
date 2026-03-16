'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEventHandler } from 'react';
import clsx from 'clsx';
import { categories } from '../model/techStackModel';
import type { Category } from '../model/techStackModel';

type Props = {
  value: Category;
  onChange: (v: Category) => void;
  t: (k: string) => string;
  disabled?: boolean;
};

export default function FilterSelect({ value, onChange, t, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [cursorIdx, setCursorIdx] = useState<number | null>(null);

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const selectedIdx = useMemo(() => categories.findIndex((c) => c.value === value), [value]);
  const selectedSafeIdx = Math.max(selectedIdx, 0);
  const activeIdx = cursorIdx ?? selectedSafeIdx;

  const close = () => {
    setOpen(false);
    setCursorIdx(null);
  };

  const openMenu = () => {
    setOpen(true);
    setCursorIdx(selectedSafeIdx);
  };

  const toggle = () => {
    if (disabled) return;
    setOpen((o) => {
      const next = !o;
      setCursorIdx(next ? selectedSafeIdx : null);
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;

    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      if (btnRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;

      close();
    };

    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const scrollToIdx = (idx: number) => {
    requestAnimationFrame(() => {
      const node = listRef.current?.querySelector<HTMLDivElement>(`[data-opt="${idx}"]`);
      node?.scrollIntoView({ block: 'nearest' });
    });
  };

  const moveCursor = (key: string) => {
    setCursorIdx((prev) => {
      const base = prev ?? selectedSafeIdx;
      let next = base;

      if (key === 'ArrowDown') next = Math.min(base + 1, categories.length - 1);
      if (key === 'ArrowUp') next = Math.max(base - 1, 0);
      if (key === 'Home') next = 0;
      if (key === 'End') next = categories.length - 1;

      scrollToIdx(next);
      return next;
    });
  };

  const onButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
      return;
    }

    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      if (!open) openMenu();
      moveCursor(e.key);
    }
  };

  const onListKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      btnRef.current?.focus();
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const chosen = categories[activeIdx];
      if (chosen) {
        onChange(chosen.value);
        close();
        btnRef.current?.focus();
      }
      return;
    }

    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      moveCursor(e.key);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-xl md:max-w-md">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="tech-filter-listbox"
        disabled={disabled}
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
        className={clsx(
          'ui-control flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-left font-sans',
          'ring-1 ring-[color:var(--ui-border)]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ui-border)]',
          'transition-transform duration-150 ease-out active:scale-[0.99]',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <span className="truncate">{t(value)}</span>

        <svg
          className={clsx('ml-3 h-5 w-5 transition-transform', open ? 'rotate-180' : 'rotate-0')}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 0 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
        </svg>
      </button>

      {open && !disabled && (
        <div
          ref={listRef}
          id="tech-filter-listbox"
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`tech-opt-${activeIdx}`}
          onKeyDown={onListKeyDown}
          className={clsx(
            'ui-menu absolute top-full right-0 left-0 z-50 mt-2 max-h-64 overflow-auto rounded-2xl outline-none',
            'ring-1 ring-[color:var(--ui-border)]',
          )}
        >
          {categories.map((cat, i) => {
            const isSelected = value === cat.value;
            const isFocused = i === activeIdx;

            return (
              <div
                key={cat.value}
                id={`tech-opt-${i}`}
                data-opt={i}
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                onMouseEnter={() => setCursorIdx(i)}
                onClick={() => {
                  onChange(cat.value);
                  close();
                  btnRef.current?.focus();
                }}
                className={clsx(
                  'ui-menu-item cursor-pointer px-4 py-3 text-sm md:text-base',
                  (isSelected || isFocused) && 'ui-menu-item-active',
                )}
              >
                {t(cat.value)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
