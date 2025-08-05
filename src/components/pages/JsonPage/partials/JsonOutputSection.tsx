import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { CopyButton } from '@/components/molecules/CopyButton';

import { copyToClipboard } from '@/lib/copy';

interface JsonOutputSectionProps {
  formattedJson: string;
  isValid: boolean | null;
  onFormatJson: () => void;
  onMinifyJson: () => void;
}

export const JsonOutputSection: React.FC<JsonOutputSectionProps> = ({
  formattedJson,
  isValid,
  onFormatJson,
  onMinifyJson,
}) => {
  const t = useTranslations('tools.json');
  const [copied, setCopied] = useState<boolean>(false);

  if (isValid !== true) return null;

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>{t('formattedOutput')}</h2>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={onFormatJson}>
            {t('formatJson')}
          </Button>
          <Button variant='outline' size='sm' onClick={onMinifyJson}>
            {t('minifyJson')}
          </Button>
          <CopyButton value={formattedJson} onCopy={() => copyToClipboard(formattedJson, setCopied)} copied={copied} />
        </div>
      </div>

      <Card className='p-4'>
        <pre className='whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96'>{formattedJson}</pre>
      </Card>
    </div>
  );
};
