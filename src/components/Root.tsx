'use client';

import Sections from '@/components/Sections';
import { LanguageDropdown, ThemeToggleButton, CvButton } from '@/components/common';
import Navigation from './navigation';

export default function Root() {
  return (
    <div>
      <Navigation />

      <header className="fixed top-4 left-4 z-50 flex items-center gap-3">
        <CvButton />
        <ThemeToggleButton />
        <LanguageDropdown />
      </header>

      <main>
        <Sections />
      </main>
    </div>
  );
}
