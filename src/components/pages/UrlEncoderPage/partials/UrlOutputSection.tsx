import React, { useState } from 'react';

import { AlertCircle, Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/atoms/Button';

import { copyToClipboard } from '@/lib/copy';

import { UrlOperationsResult } from '../types';

interface UrlOutputSectionProps {
  result: UrlOperationsResult;
}

export const UrlOutputSection: React.FC<UrlOutputSectionProps> = ({ result }) => {
  const t = useTranslations('urlEncoder');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (result.result.output) {
      copyToClipboard(result.result.output, setCopied);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>{t('output')}</span>
          <div className='flex items-center gap-2'>
            {result.result.isValid ? (
              <Badge variant='secondary' className='text-green-600'>
                {t('valid')}
              </Badge>
            ) : (
              <Badge variant='secondary' className='text-red-600'>
                {t('invalid')}
              </Badge>
            )}
            <Button
              variant='outline'
              size='sm'
              onClick={handleCopy}
              disabled={!result.result.output || !result.result.isValid}
            >
              {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result.result.error ? (
          <div className='flex items-center gap-2 text-red-600'>
            <AlertCircle className='h-4 w-4' />
            <span className='text-sm'>{result.result.error}</span>
          </div>
        ) : (
          <textarea
            className='w-full h-40 p-3 border border-input rounded-md resize-none font-mono text-sm bg-muted'
            value={result.result.output}
            readOnly
            placeholder={t('outputPlaceholder')}
          />
        )}
      </CardContent>
    </Card>
  );
};