import { useCallback, useEffect, useState } from 'react';

import { useAnalytics } from '@/hooks/use-analytics';
import { htmlToMarkdown, markdownToHtml } from '@/lib/markdown';

import { ConversionMode } from '../types';

export const useMarkdownOperations = () => {
  const { track } = useAnalytics();
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlInput, setHtmlInput] = useState<string>('');
  const [mode, setMode] = useState<ConversionMode>('markdown-to-html');
  const [convertedOutput, setConvertedOutput] = useState<string>('');

  const handleMarkdownChange = useCallback(
    (value: string) => {
      setMarkdownInput(value);
      if (mode === 'markdown-to-html') {
        const html = markdownToHtml(value);

        setConvertedOutput(html);
      }
    },
    [mode],
  );

  const handleHtmlChange = useCallback(
    (value: string) => {
      setHtmlInput(value);
      if (mode === 'html-to-markdown') {
        const markdown = htmlToMarkdown(value);

        setConvertedOutput(markdown);
      }
    },
    [mode],
  );

  const handleModeChange = useCallback(
    (newMode: ConversionMode) => {
      setMode(newMode);
      setConvertedOutput('');

      if (newMode === 'markdown-to-html' && markdownInput) {
        const html = markdownToHtml(markdownInput);

        setConvertedOutput(html);
      } else if (newMode === 'html-to-markdown' && htmlInput) {
        const markdown = htmlToMarkdown(htmlInput);

        setConvertedOutput(markdown);
      }
    },
    [markdownInput, htmlInput],
  );

  const clearAll = useCallback(() => {
    setMarkdownInput('');
    setHtmlInput('');
    setConvertedOutput('');
    track('markdown_cleared');
  }, [track]);

  useEffect(() => {
    if (mode === 'markdown-to-html' && markdownInput) {
      const html = markdownToHtml(markdownInput);

      setConvertedOutput(html);
    } else if (mode === 'html-to-markdown' && htmlInput) {
      const markdown = htmlToMarkdown(htmlInput);

      setConvertedOutput(markdown);
      track('html_to_markdown_converted', { html_length: htmlInput.length, markdown_length: markdown.length });
    }
  }, [mode, markdownInput, htmlInput, track]);

  return {
    markdownInput,
    htmlInput,
    mode,
    convertedOutput,
    handleMarkdownChange,
    handleHtmlChange,
    handleModeChange,
    clearAll,
  };
};
