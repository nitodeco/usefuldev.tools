'use client';

import React, { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import posthog from 'posthog-js';

import { ConverterInputSection } from './partials/ConverterInputSection';
import { ConverterOutputSection } from './partials/ConverterOutputSection';
import { useNumberConversion } from './partials/useNumberConversion';

export const ConverterPage: React.FC = () => {
  const t = useTranslations('converter');
  const {
    inputValue,
    setInputValue,
    inputFormat,
    setInputFormat,
    conversionResult,
    error,
    convertNumber,
    clearAll,
    validateInput,
  } = useNumberConversion();

  useEffect(() => {
    if (conversionResult) {
      posthog.capture('number_converted', {
        input_format: inputFormat,
        input_length: inputValue.length,
        successful: true,
      });
    }
  }, [conversionResult, inputFormat, inputValue.length]);

  const isValid = validateInput(inputValue, inputFormat);

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ConverterInputSection
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputFormat={inputFormat}
          setInputFormat={setInputFormat}
          onConvert={convertNumber}
          onClear={clearAll}
          error={error}
          isValid={isValid}
        />
        
        <ConverterOutputSection result={conversionResult} />
      </div>
    </div>
  );
};