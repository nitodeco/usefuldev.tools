import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';

export type Props = {
  page?: string;
};

export const generatePageMetadata = ({ page }: Props = {}) => {
  return async (): Promise<Metadata> => {
    const globalT = await getTranslations();
    const siteName = globalT('title');
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usefuldev.tools';

    if (!page) {
      const title = siteName;
      const description = 'A set of useful, client-side tools for developers.';

      return {
        title: {
          default: title,
          template: `%s - ${title}`,
        },
        description,
        authors: [{ name: 'Nico Möhn' }],
        openGraph: {
          type: 'website',
          url: siteUrl,
          title,
          description,
          siteName,
          images: [
            {
              url: `${siteUrl}/api/og?page=home`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        },
        alternates: {
          canonical: siteUrl,
        },
      };
    }

    // @ts-expect-error
    const t = await getTranslations({ namespace: `tools.${page}` });
    const title = `${t('title')} - ${siteName}`;
    const description = t('description');
    const pageUrl = `${siteUrl}/${page}`;

    return {
      title,
      description,
      authors: [{ name: 'Nico Möhn' }],
      alternates: {
        canonical: pageUrl,
      },
    };
  };
};
