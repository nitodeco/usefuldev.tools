import React from 'react';

import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';

import type { MatchType } from '../types';
import { TestResultBadge } from './ValidationBadge';

interface TestInputSectionProps {
  testString: string;
  onTestStringChange: (testString: string) => void;
  isValidRegex: boolean;
  testMatches: MatchType;
}

export const TestInputSection: React.FC<TestInputSectionProps> = ({
  testString,
  onTestStringChange,
  isValidRegex,
  testMatches,
}) => {
  const t = useTranslations('tools.regex');

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <h2 className='text-xl font-semibold'>{t('testString')}</h2>
        <TestResultBadge testMatches={testMatches} isValidRegex={isValidRegex} hasTestString={!!testString.trim()} />
      </div>

      <div className='space-y-3'>
        <Input
          type='text'
          placeholder={t('testStringPlaceholder')}
          value={testString}
          onChange={(e) => onTestStringChange(e.target.value)}
          disabled={!isValidRegex}
          className='text-lg'
        />
        {!testString.trim() && isValidRegex && (
          <div className='flex items-center gap-3'>
            <span className='text-sm text-muted-foreground'>{t('noTestString')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
