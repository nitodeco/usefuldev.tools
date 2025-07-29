export type ConversionMode = 'encode' | 'decode';

export interface ConversionResult {
  output: string;
  isValid: boolean;
  error?: string;
}

export interface UrlOperationsResult {
  mode: ConversionMode;
  input: string;
  result: ConversionResult;
}