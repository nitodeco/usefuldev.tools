'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { JsonInputSection } from './partials/JsonInputSection';
import { JsonOutputSection } from './partials/JsonOutputSection';
import { useJsonValidation } from './partials/useJsonValidation';

export const JsonPage: React.FC = () => {
  const t = useTranslations('tools.json');
  const { jsonInput, setJsonInput, validationResult, formattingOptions, setFormattingOptions, formatJson, minifyJson } =
    useJsonValidation();

  const handleClearAll = () => {
    setJsonInput('');
  };

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='space-y-6'>
        <JsonInputSection
          jsonInput={jsonInput}
          onInputChange={setJsonInput}
          isValid={validationResult.isValid}
          error={validationResult.error}
          formattingOptions={formattingOptions}
          onFormattingOptionsChange={setFormattingOptions}
          onClearAll={handleClearAll}
        />

        <JsonOutputSection
          formattedJson={validationResult.formattedJson}
          isValid={validationResult.isValid}
          onFormatJson={formatJson}
          onMinifyJson={minifyJson}
        />
      </div>
    </div>
  );
};
