import DOMPurify from 'dompurify';
import { marked } from 'marked';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});

marked.use({
  async: false,
});

export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';

  try {
    const html = marked(markdown).toString();

    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(html);
    }

    return html;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);

    return '';
  }
};

export const htmlToMarkdown = (html: string): string => {
  if (!html) return '';

  try {
    const cleanHtml = typeof window !== 'undefined' ? DOMPurify.sanitize(html) : html;

    return turndownService.turndown(cleanHtml);
  } catch (error) {
    console.error('Error converting HTML to markdown:', error);

    return '';
  }
};

export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(html);
  }

  return html;
};
