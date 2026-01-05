import React from 'react';

export default function StorySectionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-screen-2xl px-16 py-16 max-md:px-10">{children}</div>;
}
