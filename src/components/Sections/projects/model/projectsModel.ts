export type IconName = 'grid' | 'monitor' | 'settings' | 'mobile' | 'server';
export type LinkKey = 'live' | 'github';

export type LinkItem = {
  key: LinkKey;
  href?: string;
};

export type ComponentBlock = {
  title: string;
  description: string;
  tech: string[];
  links: LinkItem[];
  layout: 'textLeft' | 'textRight';
  icon: Exclude<IconName, 'grid'>;
  delay: number;
  D_ImgUrl: string;
  L_ImgUrl: string;
  moreUrl: string;
  moreLabel: string;
};
