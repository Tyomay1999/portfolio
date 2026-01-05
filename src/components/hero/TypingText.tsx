'use client';

import React, { useRef } from 'react';
import useTypingAnimation from '@/hooks/useTypingAnimation';

type TypingTextProps = {
  phrases: string[];
  className?: string;
  cursorClassName?: string;
};

export default function TypingText({
  phrases,
  className = '',
  cursorClassName = 'typing-cursor',
}: TypingTextProps) {
  const typingRef = useRef<HTMLSpanElement | null>(null);

  useTypingAnimation(typingRef, { phrases });

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span ref={typingRef} className="typing-text" />
      <span className={cursorClassName}>|</span>
    </span>
  );
}
