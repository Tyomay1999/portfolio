'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import type { LinkItem, ComponentBlock } from '../model/projectsModel';
import { getBlockHref } from '../model/projectsLinks';

type T = ReturnType<typeof useTranslations>;

type Props = {
  t: T;
  projectTitle: string;
  items: LinkItem[];
  block?: Pick<ComponentBlock, 'icon'>;
  onOpen: (href: string | undefined, project: string, destination: string) => void;
};

export default function ProjectLinks({ t, projectTitle, items, block, onOpen }: Props) {
  return (
    <div className="flex gap-6">
      {items.map((link) => {
        const label = t(`links.${link.key}`);
        const href = link.href ?? (block ? getBlockHref(block, link.key) : undefined);

        return (
          <a
            key={`${projectTitle}-${link.key}`}
            href={href || '#'}
            className="projects-link-minimal"
            onClick={(e) => {
              e.preventDefault();
              onOpen(href, projectTitle, label);
            }}
          >
            <span>{label}</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        );
      })}
    </div>
  );
}
