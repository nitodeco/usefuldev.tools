'use client';

import React, { useState } from 'react';

import { Check, Copy, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/atoms/Button';

import { copyToClipboard } from '@/lib/copy';

interface CsvOutputSectionProps {
  outputText: string;
  onDownload: () => void;
}

export const CsvOutputSection: React.FC<CsvOutputSectionProps> = ({ outputText, onDownload }) => {
  const t = useTranslations('csv');
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-xl'>{t('output')}</CardTitle>
          {outputText && (
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => copyToClipboard(outputText, setCopied)}
              >
                {copied ? (
                  <Check className='h-4 w-4 text-green-500' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
                <span className='ml-2'>{t('copyOutput')}</span>
              </Button>
              <Button variant='outline' size='sm' onClick={onDownload}>
                <Download className='h-4 w-4' />
                <span className='ml-2'>{t('downloadFile')}</span>
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className='relative'>
          <textarea
            value={outputText}
            readOnly
            placeholder='Converted output will appear here...'
            className='w-full h-64 p-4 font-mono text-sm rounded-md border bg-muted/50 resize-none'
          />
        </div>
      </CardContent>
    </Card>
  );
};