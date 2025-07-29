import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { Button } from '@/components/atoms/Button';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className='container mx-auto max-w-4xl h-[90%] box-border'>
      <div className='flex flex-col items-center justify-center space-y-6 min-h-full'>
        <div className='text-center space-y-4'>
          <h1 className='text-8xl font-bold text-muted-foreground/30 mb-4'>{t('title')}</h1>
          <div className='space-y-2'>
            <h2 className='text-2xl font-bold'>{t('subtitle')}</h2>
            <p className='text-muted-foreground'>{t('description')}</p>
          </div>
        </div>

        <Button asChild size='lg' className='mt-4'>
          <Link href='/'>
            <Home className='h-4 w-4' />
            {t('returnHome')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
