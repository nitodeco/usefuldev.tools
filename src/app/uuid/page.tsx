import { UuidPage } from '@/components/pages/UuidPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'uuid' });

export default function UuidPageRoute() {
  return <UuidPage />;
}
