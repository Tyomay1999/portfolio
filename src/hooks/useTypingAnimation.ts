import { useEffect } from 'react';
import type { RefObject } from 'react';

type TypingOptions = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
};

export default function useTypingAnimation(
  ref: RefObject<HTMLSpanElement | null>,
  { phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500 }: TypingOptions,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!phrases.length) {
      el.textContent = '';
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: number | null = null;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      const phrase = phrases[phraseIndex] ?? '';

      if (deleting) {
        el.textContent = phrase.substring(0, Math.max(0, charIndex - 1));
        charIndex -= 1;

        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeoutId = window.setTimeout(tick, 200);
          return;
        }

        timeoutId = window.setTimeout(tick, deletingSpeed);
        return;
      }

      el.textContent = phrase.substring(0, Math.min(phrase.length, charIndex + 1));
      charIndex += 1;

      if (charIndex >= phrase.length) {
        timeoutId = window.setTimeout(() => {
          deleting = true;
          tick();
        }, pauseTime);
        return;
      }

      const randomVariation = Math.random() * 50 - 25;
      const currentSpeed = Math.max(50, typingSpeed + randomVariation);
      timeoutId = window.setTimeout(tick, currentSpeed);
    };

    timeoutId = window.setTimeout(tick, 500);

    return () => {
      cancelled = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [ref, phrases, typingSpeed, deletingSpeed, pauseTime]);
}
