import { HashingPage } from '@/components/pages/HashingPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'hash' });

export default function HashPageRoute() {
  return <HashingPage />;
}
