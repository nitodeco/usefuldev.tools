export type DecimalUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB';
export type BinaryUnit = 'B' | 'KiB' | 'MiB' | 'GiB' | 'TiB' | 'PiB' | 'EiB' | 'ZiB' | 'YiB';
export type FileSizeUnit = DecimalUnit | BinaryUnit;

export interface ConversionResult {
  value: number;
  formatted: string;
  unit: FileSizeUnit;
}

export interface UnitInfo {
  value: FileSizeUnit;
  label: string;
  bytes: number;
  isBinary: boolean;
}