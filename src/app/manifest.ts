import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Useful Dev Tools',
    short_name: 'UsefulDevTools',
    description: 'A set of useful, client-side tools for developers.',
    start_url: '/',
    display: 'standalone',
    orientation: 'landscape',
    categories: ['developer', 'productivity', 'utilities', 'tools'],
    icons: [
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
