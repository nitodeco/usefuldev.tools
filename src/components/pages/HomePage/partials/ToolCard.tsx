import React from 'react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { type Page } from '@/config/pages';

export type Props = {
  page: Page;
};

export const ToolCard: React.FC<Props> = ({ page }) => {
  const toolKey = page.key.split('.')[1];
  // @ts-expect-error
  const t = useTranslations(`tools.${toolKey}`);

  return (
    <Link key={page.key} href={page.href} className='group'>
      <Card className='h-full border-1 hover:border-primary/20 cursor-pointer py-2'>
        <CardHeader className='space-y-1 p-4'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
              {page.icon && <page.icon className='h-5 w-5 text-muted-foreground' />}
              <CardTitle className='text-base leading-tight'>{t('title')}</CardTitle>
            </div>
          </div>
          <CardDescription className='text-sm leading-tight line-clamp-2'>{t('description')}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
