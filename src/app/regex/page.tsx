import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { RegexPage } from '@/components/pages/RegexPage';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('regex');

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};

export default function RegexPageRoute() {
  return <RegexPage />; 
}
