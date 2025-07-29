export type NumberFormat = 'binary' | 'decimal' | 'hexadecimal';

export interface ConversionResult {
  binary: string;
  decimal: string;
  hexadecimal: string;
}