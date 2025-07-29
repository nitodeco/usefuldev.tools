import React from 'react';

import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';

import { type FilterCategory } from '@/config/pages';

export type Props = {
  category: FilterCategory;
};

export const ToolCategoryBadge: React.FC<Props> = ({ category }) => {
  const t = useTranslations('home');

  return (
    <Badge variant='outline' className='text-xs shrink-0 ml-2'>
      {t(`filters.${category}`)}
    </Badge>
  );
};
