import { MetadataRoute } from 'next';

import { pages } from '@/config/pages';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usefuldev.tools';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', ...pages.map((page) => page.href)],
      disallow: ['/api/', '/_next/', '/ingest/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
