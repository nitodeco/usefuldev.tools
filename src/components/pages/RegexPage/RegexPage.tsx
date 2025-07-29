'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { CharacterAnalysis } from './partials/CharacterAnalysis';
import { RegexInputSection } from './partials/RegexInputSection';
import { TestInputSection } from './partials/TestInputSection';
import { useRegexValidation } from './partials/useRegexValidation';

export const RegexPage: React.FC = () => {
  const t = useTranslations('tools.regex');
  const { regexPattern, setRegexPattern, testString, setTestString, validationResult } = useRegexValidation();

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='space-y-6'>
        <RegexInputSection
          regexPattern={regexPattern}
          onPatternChange={setRegexPattern}
          isValid={validationResult.isValid}
          error={validationResult.error}
        />

        <TestInputSection
          testString={testString}
          onTestStringChange={setTestString}
          isValidRegex={validationResult.isValid === true}
          testMatches={validationResult.testMatches}
        />

        <CharacterAnalysis
          testString={testString}
          isValidRegex={validationResult.isValid === true}
          characterMatches={validationResult.characterMatches}
        />
      </div>
    </div>
  );
};
