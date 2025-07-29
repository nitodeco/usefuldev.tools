import React from 'react';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

import type { MatchType } from '../types';

interface ValidationBadgeProps {
  isValid: boolean | null;
  error?: string;
}

interface TestResultBadgeProps {
  testMatches: MatchType;
  isValidRegex: boolean;
  hasTestString: boolean;
}

export const ValidationBadge: React.FC<ValidationBadgeProps> = ({ isValid }) => {
  const t = useTranslations('regex');

  if (isValid === null) return null;

  return (
    <Badge
      variant={isValid ? 'default' : 'destructive'}
      className={cn(
        'text-sm',
        isValid
          ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
          : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
      )}
    >
      {isValid ? (
        <>
          <CheckCircle2 className='h-3 w-3 mr-1' />
          {t('validRegex')}
        </>
      ) : (
        <>
          <AlertCircle className='h-3 w-3 mr-1' />
          {t('invalidRegex')}
        </>
      )}
    </Badge>
  );
};

export const TestResultBadge: React.FC<TestResultBadgeProps> = ({ testMatches, isValidRegex, hasTestString }) => {
  const t = useTranslations('regex');

  if (!isValidRegex || !hasTestString || testMatches === null) return null;

  const getBadgeStyle = () => {
    switch (testMatches) {
      case 'full':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'none':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
    }
  };

  const getBadgeText = () => {
    switch (testMatches) {
      case 'full':
        return t('fullMatch');
      case 'partial':
        return t('partialMatch');
      case 'none':
      default:
        return t('testNoMatch');
    }
  };

  return (
    <Badge variant={testMatches === 'full' ? 'default' : 'secondary'} className={cn('text-sm', getBadgeStyle())}>
      {getBadgeText()}
    </Badge>
  );
};
