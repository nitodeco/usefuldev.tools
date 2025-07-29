import React from 'react';

import { useTranslations } from 'next-intl';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { ConversionMode } from '../types';

export type Props = {
  mode: ConversionMode;
  handleModeChange: (value: ConversionMode) => void;
};

export const MarkdownModeSelect: React.FC<Props> = ({ mode, handleModeChange }) => {
  const t = useTranslations('markdown');

  return (
    <Select value={mode} onValueChange={(value: ConversionMode) => handleModeChange(value)}>
      <SelectTrigger className='w-64'>
        <SelectValue placeholder={t('conversionMode')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='markdown-to-html'>{t('markdownToHtml')}</SelectItem>
        <SelectItem value='html-to-markdown'>{t('htmlToMarkdown')}</SelectItem>
      </SelectContent>
    </Select>
  );
};
