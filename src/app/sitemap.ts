import { MetadataRoute } from 'next';

import { pages } from '@/config/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usefuldev.tools';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  const toolSitemapEntries = pages.map((page) => ({
    url: `${baseUrl}${page.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...toolSitemapEntries];
}
