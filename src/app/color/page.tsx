import { ColorConverterPage } from '@/components/pages/ColorConverterPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'color' });

export default function ColorPageRoute() {
  return <ColorConverterPage />;
}

