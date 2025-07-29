'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import posthog from 'posthog-js';

import { Separator } from '@/components/ui/separator';

import { FileSizeInputSection } from './partials/FileSizeInputSection';
import { FileSizeOutputSection } from './partials/FileSizeOutputSection';
import { useFileSizeConversion } from './partials/useFileSizeConversion';

export const FilesizePage: React.FC = () => {
  const t = useTranslations('filesize');
  const {
    inputValue,
    setInputValue,
    inputUnit,
    setInputUnit,
    outputUnit,
    setOutputUnit,
    result,
    error,
    getAllConversions,
  } = useFileSizeConversion();

  React.useEffect(() => {
    if (result) {
      posthog.capture('filesize_converted', {
        input_unit: inputUnit,
        output_unit: outputUnit,
        input_value: parseFloat(inputValue) || 0,
        output_value: result.value,
      });
    }
  }, [result, inputUnit, outputUnit, inputValue]);

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <FileSizeInputSection
            inputValue={inputValue}
            setInputValue={setInputValue}
            inputUnit={inputUnit}
            setInputUnit={setInputUnit}
            outputUnit={outputUnit}
            setOutputUnit={setOutputUnit}
            error={error}
          />
        </div>

        <div className="lg:col-span-2">
          <Separator className="mb-6" />
          <FileSizeOutputSection
            result={result}
            getAllConversions={getAllConversions}
          />
        </div>
      </div>
    </div>
  );
};