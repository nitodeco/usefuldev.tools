import { describe, it, expect, vi, beforeEach } from 'vitest';
import { markdownToHtml, htmlToMarkdown, sanitizeHtml } from './markdown';

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((html: string) => html)
  }
}));

describe('markdown utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('markdownToHtml', () => {
    it('should convert markdown to HTML', () => {
      const markdown = '# Hello World\n\nThis is a **bold** text with a [link](https://example.com)';
      const result = markdownToHtml(markdown);
      
      expect(result).toContain('<h1>Hello World</h1>');
      expect(result).toContain('<strong>bold</strong>');
      expect(result).toContain('<a href="https://example.com">link</a>');
    });

    it('should handle empty input', () => {
      expect(markdownToHtml('')).toBe('');
    });

    it('should handle code blocks', () => {
      const markdown = '```javascript\nconst hello = "world";\n```';
      const result = markdownToHtml(markdown);
      
      expect(result).toContain('<pre><code class="language-javascript">');
      expect(result).toContain('hello');
    });

    it('should handle lists', () => {
      const markdown = '- Item 1\n- Item 2\n- Item 3';
      const result = markdownToHtml(markdown);
      
      expect(result).toContain('<ul>');
      expect(result).toContain('<li>Item 1</li>');
      expect(result).toContain('<li>Item 2</li>');
      expect(result).toContain('<li>Item 3</li>');
    });

    it('should handle blockquotes', () => {
      const markdown = '> This is a quote';
      const result = markdownToHtml(markdown);
      
      expect(result).toContain('<blockquote>');
      expect(result).toContain('This is a quote');
    });
  });

  describe('htmlToMarkdown', () => {
    it('should convert HTML to markdown', () => {
      const html = '<h1>Hello World</h1><p>This is a <strong>bold</strong> text with a <a href="https://example.com">link</a></p>';
      const result = htmlToMarkdown(html);
      
      expect(result).toContain('# Hello World');
      expect(result).toContain('**bold**');
      expect(result).toContain('[link](https://example.com)');
    });

    it('should handle empty input', () => {
      expect(htmlToMarkdown('')).toBe('');
    });

    it('should handle code blocks', () => {
      const html = '<pre><code>const hello = "world";</code></pre>';
      const result = htmlToMarkdown(html);
      
      expect(result).toContain('const hello = "world";');
    });

    it('should handle lists', () => {
      const html = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
      const result = htmlToMarkdown(html);
      
      expect(result).toContain('-   Item 1');
      expect(result).toContain('-   Item 2');
      expect(result).toContain('-   Item 3');
    });

    it('should handle nested elements', () => {
      const html = '<div><h2>Title</h2><p>Paragraph with <em>italic</em> and <code>code</code></p></div>';
      const result = htmlToMarkdown(html);
      
      expect(result).toContain('## Title');
      expect(result).toContain('_italic_');
      expect(result).toContain('`code`');
    });
  });

  describe('sanitizeHtml', () => {
    it('should return the same HTML when not in browser environment', () => {
      const html = '<script>alert("test")</script><p>Safe content</p>';
      const result = sanitizeHtml(html);
      
      expect(result).toBe(html);
    });

    it('should handle empty input', () => {
      expect(sanitizeHtml('')).toBe('');
    });
  });
});