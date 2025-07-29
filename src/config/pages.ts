import { LucideIcon } from 'lucide-react';

export type FilterCategory = 'all' | 'cryptography' | 'generators' | 'testing' | 'converters';

export interface Page {
  key: string;
  href: string;
  icon?: LucideIcon;
  category: FilterCategory;
}

export const pages: Page[] = [
  {
    key: 'pages.uuid',
    href: '/uuid',
    category: 'generators',
  },
  {
    key: 'pages.regex',
    href: '/regex',
    category: 'testing',
  },
  {
    key: 'pages.hash',
    href: '/hash',
    category: 'cryptography',
  },
  {
    key: 'pages.csv',
    href: '/csv',
  },
];

export const filterOptions: FilterCategory[] = ['all', 'cryptography', 'generators', 'testing', 'converters'];
