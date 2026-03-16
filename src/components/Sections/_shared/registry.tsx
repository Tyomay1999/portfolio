import type { JSX } from 'react';
import HeroSection from '@/components/Sections/hero';
import AboutMeSection from '@/components/Sections/about';
import ProjectsSection from '@/components/Sections/projects';
import WorkExperienceSection from '@/components/Sections/experience';
import TechStack from '@/components/Sections/techStack';

export function renderSectionById(id: number): JSX.Element {
  switch (id) {
    case -1:
      return <HeroSection />;
    case 0:
      return <AboutMeSection />;
    case 1:
      return <ProjectsSection />;
    case 2:
      return <WorkExperienceSection />;
    case 3:
      return <TechStack />;
    default:
      return <HeroSection />;
  }
}
