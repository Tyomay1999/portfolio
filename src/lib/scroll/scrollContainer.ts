function isScrollable(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el);
  const overflowY = style.overflowY;
  if (overflowY !== 'auto' && overflowY !== 'scroll') return false;
  return el.scrollHeight > el.clientHeight;
}

export function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  let cur: HTMLElement | null = el;

  while (cur && cur !== document.body) {
    if (isScrollable(cur)) return cur;
    cur = cur.parentElement;
  }

  return null;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function scrollOnToggle(opts: {
  anchorEl: HTMLElement | null;
  expanded: boolean;
  prevExpanded: boolean;
  halfScreens?: number;
}): void {
  const { anchorEl, expanded, prevExpanded, halfScreens = 1 } = opts;
  if (!anchorEl) return;

  const parent = getScrollParent(anchorEl);
  if (!parent) return;

  const maxTop = Math.max(0, parent.scrollHeight - parent.clientHeight);

  if (prevExpanded && !expanded) {
    requestAnimationFrame(() => {
      parent.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return;
  }

  if (!prevExpanded && expanded) {
    const delta = Math.round(parent.clientHeight * 0.5 * halfScreens);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = clamp(parent.scrollTop + delta, 0, maxTop);
        parent.scrollTo({ top: target, behavior: 'smooth' });
      });
    });
  }
}

export function scrollToAnchorInParent(anchorEl: HTMLElement | null): void {
  if (!anchorEl) return;

  const parent = getScrollParent(anchorEl);
  if (!parent) return;

  const parentRect = parent.getBoundingClientRect();
  const anchorRect = anchorEl.getBoundingClientRect();

  const base = parent.scrollTop + (anchorRect.top - parentRect.top);

  const maxTop = Math.max(0, parent.scrollHeight - parent.clientHeight);
  const top = clamp(base, 0, maxTop);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      parent.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

export function scrollParentToTop(anchorEl: HTMLElement | null): void {
  const parent = getScrollParent(anchorEl);
  if (!parent) return;

  requestAnimationFrame(() => {
    parent.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
