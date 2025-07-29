'use client';

import React, { useState } from 'react';

import { Check, Copy, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/atoms/Button';
import { CopyButton } from '@/components/molecules/CopyButton';

import { copyToClipboard } from '@/lib/copy';

import type { Base64FileInfo, Base64InputType, Base64Mode } from '../types';

interface Base64OutputSectionProps {
  mode: Base64Mode;
  inputType: Base64InputType;
  outputText: string;
  isValid: boolean;
  error?: string;
  fileInfo?: Base64FileInfo;
  onDownloadFile: () => void;
}

export const Base64OutputSection: React.FC<Base64OutputSectionProps> = ({
  mode,
  inputType,
  outputText,
  isValid,
  error,
  fileInfo,
  onDownloadFile,
}) => {
  const t = useTranslations('base64');
  const [copied, setCopied] = useState<boolean>(false);

  if (!outputText && !error) {
    return null;
  }

  const isFileMode = inputType === 'file' || fileInfo;
  const canDownload = outputText && isValid;
  const showFullOutput = !isFileMode || mode === 'decode' || outputText.length < 1000;

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>{t('outputText')}</h2>
        {canDownload && isFileMode && (
          <Button variant='outline' onClick={onDownloadFile} className='flex items-center gap-2'>
            <Download className='h-4 w-4' />
            {t('downloadFile')}
          </Button>
        )}
      </div>

      {outputText && isValid && (
        <div className='space-y-3'>
          {isFileMode && mode === 'encode' && (
            <div className='p-3 rounded-lg border bg-blue-50 dark:bg-blue-950/20'>
              <div className='flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300'>
                <Badge variant='secondary'>{t('output.fileEncoded')}</Badge>
                <span>
                  {fileInfo
                    ? `${fileInfo.name} (${Math.round(outputText.length * 0.75)} bytes)`
                    : t('output.fileConverted')}
                </span>
              </div>
            </div>
          )}

          <div className='relative p-4 rounded-lg border bg-muted/50 group overflow-hidden'>
            {showFullOutput ? (
              <pre className='text-sm font-mono whitespace-pre-wrap break-words word-break-break-all pr-12 w-full overflow-x-auto'>
                {outputText}
              </pre>
            ) : (
              <div className='space-y-2'>
                <div className='text-sm text-muted-foreground'>
                  {t('output.base64Output', { count: outputText.length.toLocaleString() })}
                </div>
                <pre className='text-sm font-mono whitespace-pre-wrap break-words word-break-break-all pr-12 w-full overflow-x-auto'>
                  {outputText.substring(0, 500)}...
                </pre>
                <div className='text-xs text-muted-foreground'>{t('output.outputTruncated')}</div>
              </div>
            )}

            <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              {canDownload && isFileMode && (
                <Button variant='outline' size='sm' onClick={onDownloadFile} title={t('downloadFile')}>
                  <Download className='h-4 w-4' />
                </Button>
              )}
              <CopyButton value={outputText} onCopy={() => copyToClipboard(outputText, setCopied)} copied={copied} />
            </div>
          </div>

          {mode === 'decode' && fileInfo && (
            <div className='p-3 rounded-lg border bg-green-50 dark:bg-green-950/20'>
              <div className='text-sm text-green-700 dark:text-green-300'>
                <Badge variant='secondary' className='mr-2'>
                  {t('output.readyForDownload')}
                </Badge>
                {t('output.decodedFileReady')}
              </div>
            </div>
          )}
        </div>
      )}

      {error && !isValid && (
        <div className='p-4 rounded-lg border border-destructive/20 bg-destructive/5'>
          <p className='text-sm text-destructive'>{error}</p>
        </div>
      )}
    </div>
  );
};
