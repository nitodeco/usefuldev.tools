import { describe, expect, it } from 'vitest';

import {
  BINARY_UNITS,
  convertFileSize,
  DECIMAL_UNITS,
  formatFileSize,
  getUnitBytes,
  isBinaryUnit,
  validateFileSizeInput,
} from '../filesize';

describe('filesize utilities', () => {
  describe('isBinaryUnit', () => {
    it('should return true for binary units', () => {
      expect(isBinaryUnit('KiB')).toBe(true);
      expect(isBinaryUnit('MiB')).toBe(true);
      expect(isBinaryUnit('GiB')).toBe(true);
      expect(isBinaryUnit('TiB')).toBe(true);
      expect(isBinaryUnit('PiB')).toBe(true);
      expect(isBinaryUnit('EiB')).toBe(true);
      expect(isBinaryUnit('ZiB')).toBe(true);
      expect(isBinaryUnit('YiB')).toBe(true);
    });

    it('should return false for decimal units', () => {
      expect(isBinaryUnit('KB')).toBe(false);
      expect(isBinaryUnit('MB')).toBe(false);
      expect(isBinaryUnit('GB')).toBe(false);
      expect(isBinaryUnit('TB')).toBe(false);
      expect(isBinaryUnit('PB')).toBe(false);
      expect(isBinaryUnit('EB')).toBe(false);
      expect(isBinaryUnit('ZB')).toBe(false);
      expect(isBinaryUnit('YB')).toBe(false);
    });

    it('should return false for bytes', () => {
      expect(isBinaryUnit('B')).toBe(false);
    });
  });

  describe('getUnitBytes', () => {
    it('should return correct values for decimal units', () => {
      expect(getUnitBytes('B')).toBe(1);
      expect(getUnitBytes('KB')).toBe(1000);
      expect(getUnitBytes('MB')).toBe(1000000);
      expect(getUnitBytes('GB')).toBe(1000000000);
      expect(getUnitBytes('TB')).toBe(1000000000000);
      expect(getUnitBytes('PB')).toBe(1e15);
      expect(getUnitBytes('EB')).toBe(1e18);
      expect(getUnitBytes('ZB')).toBe(1e21);
      expect(getUnitBytes('YB')).toBe(1e24);
    });

    it('should return correct values for binary units', () => {
      expect(getUnitBytes('B')).toBe(1);
      expect(getUnitBytes('KiB')).toBe(1024);
      expect(getUnitBytes('MiB')).toBe(1048576);
      expect(getUnitBytes('GiB')).toBe(1073741824);
      expect(getUnitBytes('TiB')).toBe(1099511627776);
      expect(getUnitBytes('PiB')).toBe(1125899906842624);
      expect(getUnitBytes('EiB')).toBe(1152921504606846976);
      expect(getUnitBytes('ZiB')).toBe(1180591620717411303424);
      expect(getUnitBytes('YiB')).toBe(1208925819614629174706176);
    });
  });

  describe('convertFileSize', () => {
    it('should convert between decimal units correctly', () => {
      expect(convertFileSize(1, 'GB', 'MB')).toBe(1000);
      expect(convertFileSize(1, 'MB', 'KB')).toBe(1000);
      expect(convertFileSize(1, 'TB', 'GB')).toBe(1000);
      expect(convertFileSize(1000, 'KB', 'MB')).toBe(1);
      expect(convertFileSize(1000, 'MB', 'GB')).toBe(1);
    });

    it('should convert between binary units correctly', () => {
      expect(convertFileSize(1, 'GiB', 'MiB')).toBe(1024);
      expect(convertFileSize(1, 'MiB', 'KiB')).toBe(1024);
      expect(convertFileSize(1, 'TiB', 'GiB')).toBe(1024);
      expect(convertFileSize(1024, 'KiB', 'MiB')).toBe(1);
      expect(convertFileSize(1024, 'MiB', 'GiB')).toBe(1);
    });

    it('should convert between decimal and binary units', () => {
      expect(convertFileSize(1, 'GB', 'GiB')).toBeCloseTo(0.9313225746);
      expect(convertFileSize(1, 'GiB', 'GB')).toBeCloseTo(1.073741824);
      expect(convertFileSize(1, 'MB', 'MiB')).toBeCloseTo(0.95367431640625);
      expect(convertFileSize(1, 'MiB', 'MB')).toBeCloseTo(1.048576);
    });

    it('should handle bytes correctly', () => {
      expect(convertFileSize(1024, 'B', 'KiB')).toBe(1);
      expect(convertFileSize(1000, 'B', 'KB')).toBe(1);
      expect(convertFileSize(1, 'KB', 'B')).toBe(1000);
      expect(convertFileSize(1, 'KiB', 'B')).toBe(1024);
    });

    it('should throw error for negative values', () => {
      expect(() => convertFileSize(-1, 'GB', 'MB')).toThrow('Value must be non-negative');
    });

    it('should handle zero correctly', () => {
      expect(convertFileSize(0, 'GB', 'MB')).toBe(0);
      expect(convertFileSize(0, 'B', 'YiB')).toBe(0);
    });

    it('should handle very large conversions', () => {
      expect(convertFileSize(1, 'YB', 'B')).toBe(1e24);
      expect(convertFileSize(1, 'B', 'YB')).toBeCloseTo(1e-24, 30);
    });
  });

  describe('formatFileSize', () => {
    it('should format zero correctly', () => {
      expect(formatFileSize(0)).toBe('0');
    });

    it('should format integers correctly', () => {
      expect(formatFileSize(1)).toBe('1');
      expect(formatFileSize(100)).toBe('100');
      expect(formatFileSize(1000)).toBe('1000');
    });

    it('should format decimals correctly', () => {
      expect(formatFileSize(1.5)).toBe('1.5');
      expect(formatFileSize(1.234567, 4)).toBe('1.235');
      expect(formatFileSize(0.1)).toBe('0.1');
      expect(formatFileSize(0.01)).toBe('0.01');
    });

    it('should use exponential notation for very small numbers', () => {
      expect(formatFileSize(0.0000001)).toBe('1e-7');
      expect(formatFileSize(0.0000000001)).toBe('1e-10');
    });

    it('should respect precision parameter', () => {
      expect(formatFileSize(1234.5678, 3)).toBe('1230');
      expect(formatFileSize(1.234567, 3)).toBe('1.23');
      expect(formatFileSize(0.001234, 3)).toBe('0.00123');
    });

    it('should handle edge cases', () => {
      expect(formatFileSize(999.999, 3)).toBe('1000');
      expect(formatFileSize(0.999999, 3)).toBe('1');
    });
  });

  describe('validateFileSizeInput', () => {
    it('should validate valid numeric inputs', () => {
      expect(validateFileSizeInput('0')).toBe(0);
      expect(validateFileSizeInput('1')).toBe(1);
      expect(validateFileSizeInput('100')).toBe(100);
      expect(validateFileSizeInput('1.5')).toBe(1.5);
      expect(validateFileSizeInput('0.001')).toBe(0.001);
    });

    it('should handle whitespace', () => {
      expect(validateFileSizeInput(' 10 ')).toBe(10);
      expect(validateFileSizeInput('\t5\n')).toBe(5);
    });

    it('should return null for invalid inputs', () => {
      expect(validateFileSizeInput('')).toBe(null);
      expect(validateFileSizeInput('abc')).toBe(null);
      expect(validateFileSizeInput('10x')).toBe(null);
      expect(validateFileSizeInput('-5')).toBe(null);
      expect(validateFileSizeInput('NaN')).toBe(null);
    });

    it('should handle exponential notation', () => {
      expect(validateFileSizeInput('1e3')).toBe(1000);
      expect(validateFileSizeInput('1.5e-2')).toBe(0.015);
    });
  });

  describe('unit constants', () => {
    it('should have correct decimal unit values', () => {
      expect(DECIMAL_UNITS.B).toBe(1);
      expect(DECIMAL_UNITS.KB).toBe(1000);
      expect(DECIMAL_UNITS.MB).toBe(1000 ** 2);
      expect(DECIMAL_UNITS.GB).toBe(1000 ** 3);
      expect(DECIMAL_UNITS.TB).toBe(1000 ** 4);
      expect(DECIMAL_UNITS.PB).toBe(1000 ** 5);
      expect(DECIMAL_UNITS.EB).toBe(1000 ** 6);
      expect(DECIMAL_UNITS.ZB).toBe(1000 ** 7);
      expect(DECIMAL_UNITS.YB).toBe(1000 ** 8);
    });

    it('should have correct binary unit values', () => {
      expect(BINARY_UNITS.B).toBe(1);
      expect(BINARY_UNITS.KiB).toBe(1024);
      expect(BINARY_UNITS.MiB).toBe(1024 ** 2);
      expect(BINARY_UNITS.GiB).toBe(1024 ** 3);
      expect(BINARY_UNITS.TiB).toBe(1024 ** 4);
      expect(BINARY_UNITS.PiB).toBe(1024 ** 5);
      expect(BINARY_UNITS.EiB).toBe(1024 ** 6);
      expect(BINARY_UNITS.ZiB).toBe(1024 ** 7);
      expect(BINARY_UNITS.YiB).toBe(1024 ** 8);
    });
  });
});