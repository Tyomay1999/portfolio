'use client';

import Navigation from '@/components/navigation/Navigation';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import LanguageDropdown from '@/components/languageDropdown';
import Sections from '@/components/Sections';

export default function Root() {
  return (
    <div>
      <Navigation />

      <div className="fixed top-4 left-4 z-50 flex items-center gap-3">
        <ThemeToggleButton />
        <LanguageDropdown />
      </div>

      <Sections />
    </div>
  );
}
