import type { FileSizeUnit } from '@/components/pages/FilesizePage/types';

export const DECIMAL_UNITS: Record<string, number> = {
  B: 1,
  KB: 1000,
  MB: 1000 ** 2,
  GB: 1000 ** 3,
  TB: 1000 ** 4,
  PB: 1000 ** 5,
  EB: 1000 ** 6,
  ZB: 1000 ** 7,
  YB: 1000 ** 8,
};

export const BINARY_UNITS: Record<string, number> = {
  B: 1,
  KiB: 1024,
  MiB: 1024 ** 2,
  GiB: 1024 ** 3,
  TiB: 1024 ** 4,
  PiB: 1024 ** 5,
  EiB: 1024 ** 6,
  ZiB: 1024 ** 7,
  YiB: 1024 ** 8,
};

export const isBinaryUnit = (unit: FileSizeUnit): boolean => {
  return unit in BINARY_UNITS && unit !== 'B';
};

export const getUnitBytes = (unit: FileSizeUnit): number => {
  if (unit in BINARY_UNITS) {
    return BINARY_UNITS[unit];
  }

  return DECIMAL_UNITS[unit];
};

export const convertFileSize = (value: number, fromUnit: FileSizeUnit, toUnit: FileSizeUnit): number => {
  if (value < 0) {
    throw new Error('Value must be non-negative');
  }
  
  const bytes = value * getUnitBytes(fromUnit);
  const result = bytes / getUnitBytes(toUnit);
  
  return result;
};

export const formatFileSize = (value: number, precision: number = 6): string => {
  if (value === 0) return '0';
  
  // For very small numbers, use exponential notation
  if (value < 0.000001) {
    const exp = value.toExponential(precision - 1);

    // Clean up exponential notation (remove trailing zeros and + sign)
    return exp
      .replace(/\.0+e/, 'e')
      .replace(/(\.\d*[1-9])0+e/, '$1e')
      .replace(/\+/g, '');
  }
  
  // Use toPrecision for all positive numbers
  const result = Number(value.toPrecision(precision));
  
  // Convert to string and remove trailing zeros after decimal
  let str = result.toString();

  if (str.includes('.') && !str.includes('e')) {
    str = str.replace(/\.?0+$/, '');
  }
  
  return str;
};

export const validateFileSizeInput = (input: string): number | null => {
  const trimmed = input.trim();

  if (trimmed === '') return null;
  
  // Check if the input is a valid number format
  // This regex allows integers, decimals, and exponential notation
  const validNumberRegex = /^-?\d*\.?\d+([eE][+-]?\d+)?$/;

  if (!validNumberRegex.test(trimmed)) return null;
  
  const value = parseFloat(trimmed);

  if (isNaN(value) || value < 0) return null;
  
  return value;
};