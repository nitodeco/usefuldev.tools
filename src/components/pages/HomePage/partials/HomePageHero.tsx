import React from 'react';

import { useTranslations } from 'next-intl';

import { Separator } from '@/components/ui/separator';

export const HomePageHero: React.FC = () => {
  const t = useTranslations('home');

  return (
    <div className='space-y-4 text-center pb-6 pt-8'>
      <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent'>
        {t('title')}
      </h1>
      <p className='text-muted-foreground max-w-2xl mx-auto'>{t('description')}</p>
    </div>
  );
};
