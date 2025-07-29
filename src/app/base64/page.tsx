import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { Base64Page } from '@/components/pages/Base64Page';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('base64');

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};

export default function Base64PageRoute() {
  return <Base64Page />;
}
