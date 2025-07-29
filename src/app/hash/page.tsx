import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { HashingPage } from '@/components/pages/HashingPage';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('hash');

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};

export default function HashPageRoute() {
  return <HashingPage />;
}