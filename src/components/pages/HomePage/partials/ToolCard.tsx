import React from 'react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { type Page } from '@/config/pages';

export type Props = {
  page: Page;
};

export const ToolCard: React.FC<Props> = ({ page }) => {
  const t = useTranslations('home');

  const toolKey = page.key.split('.')[1];
  const category = page.category;

  return (
    <Link key={page.key} href={page.href} className='group'>
      <Card className='h-full border-1 hover:border-primary/20 cursor-pointer py-2'>
        <CardHeader className='space-y-1 p-4'>
          <div className='flex items-start justify-between'>
            {/* @ts-expect-error */}
            <CardTitle className='text-base leading-tight'>{t(`tools.${toolKey}.title`)}</CardTitle>
          </div>
          <CardDescription className='text-sm leading-tight line-clamp-2'>
            {/* @ts-expect-error */}
            {t(`tools.${toolKey}.description`)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
