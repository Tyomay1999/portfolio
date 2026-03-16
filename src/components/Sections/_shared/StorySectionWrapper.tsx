import { ReactNode } from 'react';

export default function StorySectionWrapper({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-screen-2xl px-16 py-16 max-md:px-10">{children}</div>;
}
