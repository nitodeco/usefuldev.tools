import { JsonPage } from '@/components/pages/JsonPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'json' });

export default function JsonPageRoute() {
  return <JsonPage />;
}
