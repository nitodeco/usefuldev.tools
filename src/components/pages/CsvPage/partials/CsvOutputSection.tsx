'use client';

import React, { useState } from 'react';

import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/atoms/Button';
import { CopyButton } from '@/components/molecules/CopyButton';

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
              <CopyButton value={outputText} onCopy={() => copyToClipboard(outputText, setCopied)} copied={copied} />

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
