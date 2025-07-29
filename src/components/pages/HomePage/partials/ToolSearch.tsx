import React from 'react';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';

import { useAnalytics } from '@/hooks/use-analytics';

export type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export const ToolSearch: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
  const t = useTranslations('home');
  const { track } = useAnalytics();

  return (
    <div className='relative'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
      <Input
        placeholder={t('search.placeholder')}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          track('search_query_changed', { query: e.target.value });
        }}
        className='pl-10 h-12 text-base'
      />
    </div>
  );
};
