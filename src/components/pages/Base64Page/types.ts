import type { FileInfo } from '@/types/file';

export type Base64Mode = 'encode' | 'decode';
export type Base64InputType = 'text' | 'file';

export type Base64FileInfo = FileInfo;

export interface Base64Result {
  mode: Base64Mode;
  input: string;
  output: string;
  isValid: boolean;
  error?: string;
  fileInfo?: Base64FileInfo;
}

export interface Base64Operations {
  mode: Base64Mode;
  setMode: (mode: Base64Mode) => void;
  inputType: Base64InputType;
  setInputType: (type: Base64InputType) => void;
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  isValid: boolean;
  error?: string;
  isConverting: boolean;
  fileInfo?: Base64FileInfo;
  handleFileUpload: (file: File) => void;
  downloadAsFile: () => void;
  clearAll: () => void;
}
