import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';

export type Props = {
  page?: string;
  namespace?: string;
};

export const generatePageMetadata = ({ page, namespace }: Props = {}) => {
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
        alternates: {
          canonical: siteUrl,
        },
      };
    }

    let translationNamespace: string;
    let pageSlug: string;

    if (namespace) {
      translationNamespace = namespace;
      pageSlug = page;
    } else if (page.startsWith('pages.')) {
      const pageName = page.replace('pages.', '');

      translationNamespace = pageName;
      pageSlug = pageName;
    } else {
      translationNamespace = `tools.${page}`;
      pageSlug = page;
    }

    try {
      // @ts-expect-error
      const t = await getTranslations(translationNamespace);
      const title = `${t('title')} - ${siteName}`;
      const description = t('description');
      const pageUrl = `${siteUrl}/${pageSlug}`;

      return {
        title,
        description,
        authors: [{ name: 'Nico Möhn' }],
        alternates: {
          canonical: pageUrl,
        },
      };
    } catch (error) {
      console.warn(`Translation not found for namespace: ${translationNamespace}. Error: ${JSON.stringify(error)}`);

      const fallbackTitle = `${page} - ${siteName}`;
      const fallbackDescription = 'A useful tool for developers.';
      const pageUrl = `${siteUrl}/${pageSlug}`;

      return {
        title: fallbackTitle,
        description: fallbackDescription,
        authors: [{ name: 'Nico Möhn' }],
        alternates: {
          canonical: pageUrl,
        },
      };
    }
  };
};
