import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { UrlEncoderPage } from '@/components/pages/UrlEncoderPage';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('urlEncoder');

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};

export default function UrlEncoderPageRoute() {
  return <UrlEncoderPage />;
}