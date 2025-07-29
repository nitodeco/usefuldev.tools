import { RegexPage } from '@/components/pages/RegexPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'regex' });

export default function RegexPageRoute() {
  return <RegexPage />;
}
