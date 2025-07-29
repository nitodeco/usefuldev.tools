import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { MarkdownPage } from '@/components/pages/MarkdownPage';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('markdown');

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};

export default function MarkdownPageRoute() {
  return <MarkdownPage />;
}