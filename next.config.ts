import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './src/messages/en.json',
  },
});

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
