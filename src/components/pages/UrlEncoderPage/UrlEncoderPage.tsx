'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { UrlInputSection } from './partials/UrlInputSection';
import { UrlOutputSection } from './partials/UrlOutputSection';
import { useUrlOperations } from './partials/useUrlOperations';

export const UrlEncoderPage: React.FC = () => {
  const t = useTranslations('urlEncoder');
  const {
    input,
    setInput,
    mode,
    setMode,
    useComponentEncoding,
    setUseComponentEncoding,
    result,
  } = useUrlOperations();

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='space-y-6'>
        <UrlInputSection
          mode={mode}
          onModeChange={setMode}
          input={input}
          onInputChange={setInput}
          useComponentEncoding={useComponentEncoding}
          onEncodingTypeChange={setUseComponentEncoding}
        />

        <UrlOutputSection result={result} />

        <div className='rounded-lg border p-4 space-y-2'>
          <h3 className='text-sm font-medium'>{t('encodingInfo.title')}</h3>
          <p className='text-sm text-muted-foreground'>
            {useComponentEncoding ? t('encodingInfo.component') : t('encodingInfo.standard')}
          </p>
        </div>
      </div>
    </div>
  );
};