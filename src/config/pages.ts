import {
  CodeIcon,
  FingerprintIcon,
  HashIcon,
  LinkIcon,
  LucideIcon,
  RectangleEllipsisIcon,
  RegexIcon,
  ShieldIcon,
  Table2Icon,
} from 'lucide-react';

export type FilterCategory = 'all' | 'cryptography' | 'generators' | 'testing' | 'converters';

export type Page = {
  key: string;
  href: string;
  icon?: LucideIcon;
  category?: FilterCategory;
  showInSidebar: boolean;
};

export const pages: Page[] = [
  {
    key: 'pages.uuid',
    href: '/uuid',
    category: 'generators',
    icon: FingerprintIcon,
    showInSidebar: true,
  },
  {
    key: 'pages.regex',
    href: '/regex',
    category: 'testing',
    icon: RegexIcon,
    showInSidebar: true,
  },
  {
    key: 'pages.hash',
    href: '/hash',
    category: 'cryptography',
    icon: HashIcon,
    showInSidebar: true,
  },
  {
    key: 'pages.csv',
    href: '/csv',
    category: 'converters',
    icon: Table2Icon,
    showInSidebar: true,
  },
  {
    key: 'pages.base64',
    href: '/base64',
    category: 'converters',
    icon: RectangleEllipsisIcon,
    showInSidebar: true,
  },
  {
    key: 'pages.markdown',
    href: '/markdown',
    category: 'converters',
    icon: CodeIcon,
    showInSidebar: true,
  },
  {
    key: 'pages.urlEncoder',
    href: '/url-encoder',
    category: 'converters',
    icon: LinkIcon,
    showInSidebar: true,
  },
  {
    key: 'pages.privacy',
    href: '/privacy-policy',
    icon: ShieldIcon,
    showInSidebar: false,
  },
];

export const filterOptions: FilterCategory[] = ['all', 'cryptography', 'generators', 'testing', 'converters'];
