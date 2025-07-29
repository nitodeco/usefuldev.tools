import { PrivacyPolicyPage } from '@/components/pages/PrivacyPolicyPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'pages.privacy' });

export default function Page() {
  return <PrivacyPolicyPage />;
}
