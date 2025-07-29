import { LucideIcon } from 'lucide-react';

export interface Page {
  key: string;
  href: string;
  icon?: LucideIcon;
}

export const pages: Page[] = [
  {
    key: 'pages.uuid',
    href: '/uuid',
  },
  {
    key: 'pages.regex',
    href: '/regex',
  },
  {
    key: 'pages.jwt',
    href: '/jwt',
  },
  {
    key: 'pages.hash',
    href: '/hash',
  },
  {
    key: 'pages.csv',
    href: '/csv',
  },
];
