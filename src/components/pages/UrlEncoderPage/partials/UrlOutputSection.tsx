import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { CopyButton } from '@/components/molecules/CopyButton';

import { copyToClipboard } from '@/lib/copy';

import { UrlOperationsResult } from '../types';

interface UrlOutputSectionProps {
  result: UrlOperationsResult;
}

export const UrlOutputSection: React.FC<UrlOutputSectionProps> = ({ result }) => {
  const t = useTranslations('urlEncoder');
  const [copied, setCopied] = useState<boolean>(false);

  if (!result.result.output && !result.result.error) {
    return null;
  }

  const canCopy = result.result.output && result.result.isValid;

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>{t('output')}</h2>
      </div>

      {result.result.output && result.result.isValid && (
        <div className='space-y-3'>
          <div className='relative p-4 rounded-lg border bg-muted/50 group overflow-hidden'>
            <pre className='text-sm font-mono whitespace-pre-wrap break-words word-break-break-all pr-12 w-full overflow-x-auto'>
              {result.result.output}
            </pre>

            <div className='absolute top-2 right-2 flex gap-1'>
              {canCopy && (
                <CopyButton
                  value={result.result.output}
                  onCopy={() => copyToClipboard(result.result.output, setCopied)}
                  copied={copied}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {result.result.error && !result.result.isValid && (
        <div className='p-4 rounded-lg border border-destructive/20 bg-destructive/5'>
          <p className='text-sm text-destructive'>{result.result.error}</p>
        </div>
      )}
    </div>
  );
};
