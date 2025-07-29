import React from 'react';

import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';

import { ValidationBadge } from './ValidationBadge';

interface RegexInputSectionProps {
  regexPattern: string;
  onPatternChange: (pattern: string) => void;
  isValid: boolean | null;
  error: string;
}

export const RegexInputSection: React.FC<RegexInputSectionProps> = ({
  regexPattern,
  onPatternChange,
  isValid,
  error,
}) => {
  const t = useTranslations('tools.regex');

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <h2 className='text-xl font-semibold'>{t('regexPattern')}</h2>
        <ValidationBadge isValid={isValid} error={error} />
      </div>

      <div className='space-y-3'>
        <Input
          type='text'
          placeholder={t('regexPlaceholder')}
          value={regexPattern}
          onChange={(e) => onPatternChange(e.target.value)}
          className='text-lg font-mono'
        />
        {error && (
          <div className='flex items-center gap-3'>
            <span className='text-sm text-red-600 dark:text-red-400'>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
