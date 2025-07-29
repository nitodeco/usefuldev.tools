import { UrlEncoderPage } from '@/components/pages/UrlEncoderPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'urlEncoder' });

export default function UrlEncoderPageRoute() {
  return <UrlEncoderPage />;
}
