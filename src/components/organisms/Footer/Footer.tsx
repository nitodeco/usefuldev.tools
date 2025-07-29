'use client';

import React from 'react';

import { ShieldIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { siBuymeacoffee, siGithub } from 'simple-icons';

import Link from 'next/link';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-transparent py-4'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <Link
              href='/privacy-policy'
              className='flex items-center gap-1 text-sm text-muted-foreground/50 hover:text-muted-foreground'
              title={t('privacy')}
            >
              <ShieldIcon className='h-4 w-4' />
              <span className='hidden sm:inline'>{t('privacy')}</span>
            </Link>
            <p className='text-sm text-muted-foreground/50'>{t('copyright', { year: currentYear.toString() })}</p>
          </div>
          <div className='flex items-center gap-4'>
            <Link
              href='https://github.com/nitodeco/usefuldev.tools'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 text-sm text-muted-foreground/50 hover:text-muted-foreground'
              title={t('github')}
            >
              <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d={siGithub.path} />
              </svg>
              <span className='hidden sm:inline'>{t('github')}</span>
            </Link>
            <Link
              href='https://coff.ee/nitodeco'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 text-sm text-muted-foreground/50 hover:text-muted-foreground'
              title={t('coffee')}
            >
              <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d={siBuymeacoffee.path} />
              </svg>
              <span className='hidden sm:inline'>{t('coffee')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
