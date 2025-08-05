import React from 'react';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

interface JsonValidationBadgeProps {
  isValid: boolean | null;
  error?: string;
}

export const JsonValidationBadge: React.FC<JsonValidationBadgeProps> = ({ isValid }) => {
  const t = useTranslations('tools.json');

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
          {t('validJson')}
        </>
      ) : (
        <>
          <AlertCircle className='h-3 w-3 mr-1' />
          {t('invalidJson')}
        </>
      )}
    </Badge>
  );
};
