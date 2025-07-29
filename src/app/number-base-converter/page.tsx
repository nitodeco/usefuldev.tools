import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { ConverterPage } from '@/components/pages/ConverterPage';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('converter');

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};

export default function ConverterPageRoute() {
  return <ConverterPage />;
}