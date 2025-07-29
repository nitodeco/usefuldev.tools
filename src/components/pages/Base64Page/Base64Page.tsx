'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { Base64InputSection } from './partials/Base64InputSection';
import { Base64OutputSection } from './partials/Base64OutputSection';
import { useBase64Operations } from './partials/useBase64Operations';

export const Base64Page: React.FC = () => {
  const t = useTranslations('base64');
  const {
    mode,
    setMode,
    inputType,
    setInputType,
    inputText,
    setInputText,
    outputText,
    isValid,
    error,
    isConverting,
    fileInfo,
    handleFileUpload,
    downloadAsFile,
    clearAll,
    formatFileSize,
  } = useBase64Operations();

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='space-y-6'>
        <Base64InputSection
          mode={mode}
          onModeChange={setMode}
          inputType={inputType}
          onInputTypeChange={setInputType}
          inputText={inputText}
          onInputChange={setInputText}
          isValid={isValid}
          error={error}
          isConverting={isConverting}
          fileInfo={fileInfo}
          onFileUpload={handleFileUpload}
          onClearAll={clearAll}
          formatFileSize={formatFileSize}
        />

        <Base64OutputSection
          mode={mode}
          inputType={inputType}
          outputText={outputText}
          isValid={isValid}
          error={error}
          fileInfo={fileInfo}
          onDownloadFile={downloadAsFile}
        />
      </div>
    </div>
  );
};
