export type Category = 'core' | 'infraDevops' | 'dataMessaging' | 'testingQuality' | 'designCollab';

export interface TechItem {
  name: string;
  icon: string;
  category: Category;
  colorClass: string;
}

export const techItems: TechItem[] = [
  {
    name: 'TypeScript',
    icon: '/stack/typescript.svg',
    category: 'core',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'React',
    icon: '/stack/react.svg',
    category: 'core',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Next.js',
    icon: '/stack/next.svg',
    category: 'core',
    colorClass: 'from-gray-100 to-gray-200 dark:from-slate-900/30 dark:to-gray-800/30',
  },
  {
    name: 'State Manage.',
    icon: '/stack/state.svg',
    category: 'core',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'SSR / SSG',
    icon: '/stack/ssr.svg',
    category: 'core',
    colorClass: 'from-slate-100 to-slate-200 dark:from-slate-900/30 dark:to-slate-800/30',
  },
  {
    name: 'System Design',
    icon: '/stack/system-design.svg',
    category: 'core',
    colorClass: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  },
  {
    name: 'Microservices',
    icon: '/stack/microservices.svg',
    category: 'core',
    colorClass: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
  },
  {
    name: 'Node.js',
    icon: '/stack/nodejs.svg',
    category: 'core',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'Express',
    icon: '/stack/express.svg',
    category: 'core',
    colorClass: 'from-red-100 to-red-200 dark:from-slate-900/30 dark:to-red-800/30',
  },
  {
    name: 'REST API',
    icon: '/stack/rest.svg',
    category: 'core',
    colorClass: 'from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30',
  },
  {
    name: 'PostgreSQL',
    icon: '/stack/postgresql.svg',
    category: 'core',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Redis',
    icon: '/stack/redis.svg',
    category: 'core',
    colorClass: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30',
  },
  {
    name: 'RabbitMQ',
    icon: '/stack/rabbitmq.svg',
    category: 'core',
    colorClass: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
  },

  {
    name: 'Docker',
    icon: '/stack/docker.svg',
    category: 'infraDevops',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Linux',
    icon: '/stack/linux.svg',
    category: 'infraDevops',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'Nginx',
    icon: '/stack/nginx.svg',
    category: 'infraDevops',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'Reverse Proxy',
    icon: '/stack/reverse-proxy.svg',
    category: 'infraDevops',
    colorClass: 'from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30',
  },
  {
    name: 'Load Balancing',
    icon: '/stack/load-balancing.svg',
    category: 'infraDevops',
    colorClass: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
  },
  {
    name: 'API Gateway',
    icon: '/stack/api-gateway.svg',
    category: 'infraDevops',
    colorClass: 'from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30',
  },
  {
    name: 'GitHub Actions',
    icon: '/stack/github-actions.svg',
    category: 'infraDevops',
    colorClass: 'from-gray-100 to-gray-200 dark:from-slate-900/30 dark:to-gray-800/30',
  },
  {
    name: 'Jenkins',
    icon: '/stack/jenkins.svg',
    category: 'infraDevops',
    colorClass: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
  },
  {
    name: 'PM2',
    icon: '/stack/pm2.svg',
    category: 'infraDevops',
    colorClass: 'from-slate-100 to-slate-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },
  {
    name: 'Auto Deployment',
    icon: '/stack/deployment.svg',
    category: 'infraDevops',
    colorClass: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
  },

  {
    name: 'MongoDB',
    icon: '/stack/mongodb.svg',
    category: 'dataMessaging',
    colorClass: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
  },
  {
    name: 'Sequelize',
    icon: '/stack/sequelize.svg',
    category: 'dataMessaging',
    colorClass: 'from-fuchsia-100 to-fuchsia-200 dark:from-fuchsia-900/30 dark:to-fuchsia-800/30',
  },
  {
    name: 'Mongoose',
    icon: '/stack/mongoose.svg',
    category: 'dataMessaging',
    colorClass: 'from-lime-100 to-lime-200 dark:from-lime-900/30 dark:to-lime-800/30',
  },
  {
    name: 'Socket.io',
    icon: '/stack/socket-io.svg',
    category: 'dataMessaging',
    colorClass: 'from-lime-100 to-lime-200 dark:from-lime-900/30 dark:to-lime-800/30',
  },
  {
    name: 'Event-Driven',
    icon: '/stack/event-driven.svg',
    category: 'dataMessaging',
    colorClass: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
  },
  {
    name: 'Stripe',
    icon: '/stack/stripe.svg',
    category: 'dataMessaging',
    colorClass: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  },
  {
    name: 'PayPal',
    icon: '/stack/paypal.svg',
    category: 'dataMessaging',
    colorClass: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
  },

  {
    name: 'Jest',
    icon: '/stack/jest.svg',
    category: 'testingQuality',
    colorClass: 'from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30',
  },
  {
    name: 'SuperTest',
    icon: '/stack/supertest.svg',
    category: 'testingQuality',
    colorClass: 'from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30',
  },
  {
    name: 'Playwright',
    icon: '/stack/playwright.svg',
    category: 'testingQuality',
    colorClass: 'from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30',
  },

  // ===== DESIGN =====
  {
    name: 'Figma',
    icon: '/stack/figma.svg',
    category: 'designCollab',
    colorClass: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
  },
];

export const categories: { label: string; value: Category }[] = [
  { label: 'Core Technologies', value: 'core' },
  { label: 'Infrastructure & DevOps', value: 'infraDevops' },
  { label: 'Data & Messaging', value: 'dataMessaging' },
  { label: 'Testing & Quality', value: 'testingQuality' },
  { label: 'Design & Collaboration', value: 'designCollab' },
];

export const getFilteredItems = (items: TechItem[], category: Category): TechItem[] => {
  return items.filter((i) => i.category === category);
};

export const getVisibleItems = (
  items: TechItem[],
  step: 0 | 1 | 2,
  category: Category,
): TechItem[] => {
  if (category === 'core') return items;
  if (items.length <= 10) return items;
  if (step === 0) return items.slice(0, 10);
  if (step === 1) return items.slice(0, 20);
  return items;
};

export const getNextStep = (current: 0 | 1 | 2, total: number, category: Category): 0 | 1 | 2 => {
  if (category === 'core') return 0;
  if (total <= 10) return 0;
  if (total <= 20) return current === 0 ? 2 : 0;
  return ((current + 1) % 3) as 0 | 1 | 2;
};

export const getButtonLabel = (
  step: 0 | 1 | 2,
  total: number,
  t: (key: string) => string,
  category: Category,
): string => {
  if (category === 'core') return '';
  if (total <= 10) return '';
  if (total <= 20) return step === 0 ? t('viewAll') : t('viewLess');
  if (step === 0) return t('viewMore');
  if (step === 1) return t('viewAll');
  return t('viewLess');
};

export const shouldShowButton = (items: TechItem[], category: Category): boolean => {
  if (category === 'core') return false;
  return items.length > 10;
};
