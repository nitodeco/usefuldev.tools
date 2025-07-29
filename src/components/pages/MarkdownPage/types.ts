export type ConversionMode = 'markdown-to-html' | 'html-to-markdown';

export interface MarkdownConverterState {
  markdownInput: string;
  htmlInput: string;
  mode: ConversionMode;
}

export interface MarkdownInputSectionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export interface HtmlOutputSectionProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder: string;
  readOnly?: boolean;
}