import React from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

import type { JsonFormattingOptions } from '../types';
import { JsonValidationBadge } from './ValidationBadge';

interface JsonInputSectionProps {
  jsonInput: string;
  onInputChange: (input: string) => void;
  isValid: boolean | null;
  error: string;
  formattingOptions: JsonFormattingOptions;
  onFormattingOptionsChange: (options: JsonFormattingOptions) => void;
  onClearAll: () => void;
}

export const JsonInputSection: React.FC<JsonInputSectionProps> = ({
  jsonInput,
  onInputChange,
  isValid,
  error,
  formattingOptions,
  onFormattingOptionsChange,
  onClearAll,
}) => {
  const t = useTranslations('tools.json');

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h2 className='text-xl font-semibold'>{t('jsonInput')}</h2>
          <JsonValidationBadge isValid={isValid} error={error} />
        </div>
        <Button variant='outline' size='sm' onClick={onClearAll}>
          {t('clearAll')}
        </Button>
      </div>

      <div className='space-y-4'>
        <Card className='p-4'>
          <textarea
            placeholder={t('jsonPlaceholder')}
            value={jsonInput}
            onChange={(e) => onInputChange(e.target.value)}
            className='w-full h-64 min-h-[200px] resize-y border-0 bg-transparent font-mono text-sm focus:outline-none focus:ring-0'
            style={{ resize: 'vertical' }}
          />
        </Card>

        {error && (
          <div className='flex items-center gap-3'>
            <span className='text-sm text-red-600 dark:text-red-400'>{error}</span>
          </div>
        )}

        <Card className='p-4'>
          <div className='space-y-4'>
            <h3 className='text-sm font-medium'>{t('prettifyOptions')}</h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <label htmlFor='indent-size' className='text-sm'>
                  {t('indentSize')}
                </label>
                <Input
                  id='indent-size'
                  type='number'
                  min='1'
                  max='8'
                  value={formattingOptions.indent}
                  onChange={(e) =>
                    onFormattingOptionsChange({
                      ...formattingOptions,
                      indent: parseInt(e.target.value, 10) || 2,
                    })
                  }
                  className='w-20'
                />
              </div>
              <div className='flex items-center justify-between'>
                <label htmlFor='sort-keys' className='text-sm'>
                  {t('sortKeys')}
                </label>
                <Switch
                  id='sort-keys'
                  checked={formattingOptions.sortKeys}
                  onCheckedChange={(checked) =>
                    onFormattingOptionsChange({
                      ...formattingOptions,
                      sortKeys: checked,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
