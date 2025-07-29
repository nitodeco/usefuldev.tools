import { MarkdownPage } from '@/components/pages/MarkdownPage';

import { generatePageMetadata } from '@/lib/metadata';

export const generateMetadata = generatePageMetadata({ page: 'markdown' });

export default function MarkdownPageRoute() {
  return <MarkdownPage />;
}
