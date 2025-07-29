'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { copyToClipboard } from '@/lib/copy';
import { useMarkdownOperations } from './partials/useMarkdownOperations';
import { InputSection } from './partials/InputSection';
import { OutputSection } from './partials/OutputSection';
import { PreviewSection } from './partials/PreviewSection';
import { ConversionMode } from './types';

export const MarkdownPage: React.FC = () => {
  const t = useTranslations('markdown');
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  
  const {
    markdownInput,
    htmlInput,
    mode,
    convertedOutput,
    handleMarkdownChange,
    handleHtmlChange,
    handleModeChange,
    clearAll,
  } = useMarkdownOperations();

  const handleCopyMarkdown = () => {
    const textToCopy = mode === 'html-to-markdown' ? convertedOutput : markdownInput;
    copyToClipboard(textToCopy, setCopiedMarkdown);
  };

  const handleCopyHtml = () => {
    const textToCopy = mode === 'markdown-to-html' ? convertedOutput : htmlInput;
    copyToClipboard(textToCopy, setCopiedHtml);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="flex items-center justify-between">
        <Select value={mode} onValueChange={(value: ConversionMode) => handleModeChange(value)}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder={t('conversionMode')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="markdown-to-html">
              {t('markdownToHtml')}
            </SelectItem>
            <SelectItem value="html-to-markdown">
              {t('htmlToMarkdown')}
            </SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          onClick={clearAll}
          disabled={!markdownInput && !htmlInput}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {t('clearAll')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mode === 'markdown-to-html' ? (
          <>
            <InputSection
              value={markdownInput}
              onChange={handleMarkdownChange}
              placeholder={t('markdownPlaceholder')}
              label={t('markdownInput')}
            />
            <OutputSection
              value={convertedOutput}
              label={t('htmlOutput')}
              onCopy={handleCopyHtml}
              copied={copiedHtml}
            />
          </>
        ) : (
          <>
            <InputSection
              value={htmlInput}
              onChange={handleHtmlChange}
              placeholder={t('htmlPlaceholder')}
              label={t('htmlOutput')}
            />
            <OutputSection
              value={convertedOutput}
              label={t('markdownInput')}
              onCopy={handleCopyMarkdown}
              copied={copiedMarkdown}
            />
          </>
        )}
      </div>

      {mode === 'markdown-to-html' && convertedOutput && (
        <div className="mt-8">
          <PreviewSection
            html={convertedOutput}
            label={t('preview')}
          />
        </div>
      )}
    </div>
  );
};