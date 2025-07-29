import { Base64Page } from '@/components/pages/Base64Page';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'base64' });

export default function Base64PageRoute() {
  return <Base64Page />;
}
