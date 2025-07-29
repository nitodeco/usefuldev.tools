import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';

import { type FilterCategory, filterOptions, pages } from '@/config/pages';

import { HomePageHero } from './partials/HomePageHero';
import { ToolCard } from './partials/ToolCard';
import { ToolSearch } from './partials/ToolSearch';

export const HomePage: React.FC = () => {
  const t = useTranslations('home');
  const tTools = useTranslations('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredPages = pages.filter((page) => {
    const toolKey = page.key.split('.')[1];

    // @ts-expect-error
    const title = tTools(`${toolKey}.title`).toLowerCase();
    // @ts-expect-error
    const description = tTools(`${toolKey}.description`).toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' || page.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className='space-y-8'>
      <HomePageHero />

      <div className='max-w-2xl mx-auto space-y-4'>
        <ToolSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className='flex flex-wrap gap-2 justify-center'>
          {filterOptions.map((filter) => (
            <Badge
              key={filter}
              variant={activeFilter === filter ? 'default' : 'secondary'}
              className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                activeFilter === filter ? '' : 'hover:bg-primary/10'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {t(`filters.${filter}`)}
            </Badge>
          ))}
        </div>
      </div>

      <div className='space-y-4'>
        {filteredPages.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
            {filteredPages.map((page) => {
              return <ToolCard key={page.key} page={page} />;
            })}
          </div>
        ) : (
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>{t('search.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
