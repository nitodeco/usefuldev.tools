'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { CsvInputSection } from './partials/CsvInputSection';
import { CsvOutputSection } from './partials/CsvOutputSection';
import { useCsvOperations } from './partials/useCsvOperations';

export const CsvPage: React.FC = () => {
  const t = useTranslations('tools.csv');
  const { mode, setMode, inputText, setInputText, outputText, options, setOptions, error, clearAll, downloadOutput } =
    useCsvOperations();

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='space-y-6'>
        <CsvInputSection
          mode={mode}
          onModeChange={setMode}
          inputText={inputText}
          onInputChange={setInputText}
          options={options}
          onOptionsChange={setOptions}
          error={error}
          onClearAll={clearAll}
        />

        <CsvOutputSection outputText={outputText} onDownload={downloadOutput} />
      </div>
    </div>
  );
};
