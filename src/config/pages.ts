import {
  CodeIcon,
  FingerprintIcon,
  HashIcon,
  LinkIcon,
  LucideIcon,
  RectangleEllipsisIcon,
  RegexIcon,
  Table2Icon,
} from 'lucide-react';

export type FilterCategory = 'all' | 'cryptography' | 'generators' | 'testing' | 'converters';

export type Page = {
  key: string;
  href: string;
  icon?: LucideIcon;
  category: FilterCategory;
};

export const pages: Page[] = [
  {
    key: 'pages.uuid',
    href: '/uuid',
    category: 'generators',
    icon: FingerprintIcon,
  },
  {
    key: 'pages.regex',
    href: '/regex',
    category: 'testing',
    icon: RegexIcon,
  },
  {
    key: 'pages.hash',
    href: '/hash',
    category: 'cryptography',
    icon: HashIcon,
  },
  {
    key: 'pages.csv',
    href: '/csv',
    category: 'converters',
    icon: Table2Icon,
  },
  {
    key: 'pages.base64',
    href: '/base64',
    category: 'converters',
    icon: RectangleEllipsisIcon,
  },
  {
    key: 'pages.markdown',
    href: '/markdown',
    category: 'converters',
    icon: CodeIcon,
  },
  {
    key: 'pages.urlEncoder',
    href: '/url-encoder',
    category: 'converters',
    icon: LinkIcon,
  },
];

export const filterOptions: FilterCategory[] = ['all', 'cryptography', 'generators', 'testing', 'converters'];
