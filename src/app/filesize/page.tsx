import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { FilesizePage } from '@/components/pages/FilesizePage';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('filesize');

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};

export default function FilesizePageRoute() {
  return <FilesizePage />;
}