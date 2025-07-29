import { CsvPage } from '@/components/pages/CsvPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'csv' });

export default function Page() {
  return <CsvPage />;
}
