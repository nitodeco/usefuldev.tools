import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';

export type Props = {
  page: string;
};

export const generatePageMetadata = async ({ page }: Props): Promise<Metadata> => {
  // @ts-expect-error
  const t = await getTranslations({ namespace: `tools.${page}` });

  return {
    title: `${t('title')} - Useful Dev Tools`,
    description: t('description'),
  };
};
