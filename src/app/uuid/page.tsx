import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { UuidPage } from '@/components/pages/UuidPage';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('uuid');

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};

export default function UuidPageRoute() {
  return <UuidPage />;
}
