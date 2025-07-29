import { describe, expect, it } from 'vitest';

import {
  binaryToDecimal,
  binaryToHexadecimal,
  decimalToBinary,
  decimalToHexadecimal,
  hexadecimalToBinary,
  hexadecimalToDecimal,
  isValidBinary,
  isValidDecimal,
  isValidHexadecimal,
} from './converter';

describe('Converter utilities', () => {
  describe('decimalToBinary', () => {
    it('should convert decimal to binary correctly', () => {
      expect(decimalToBinary(0)).toBe('0');
      expect(decimalToBinary(1)).toBe('1');
      expect(decimalToBinary(10)).toBe('1010');
      expect(decimalToBinary(255)).toBe('11111111');
      expect(decimalToBinary(1024)).toBe('10000000000');
    });

    it('should throw error for negative numbers', () => {
      expect(() => decimalToBinary(-1)).toThrow('Input must be a non-negative integer');
    });

    it('should throw error for non-integers', () => {
      expect(() => decimalToBinary(1.5)).toThrow('Input must be a non-negative integer');
    });
  });

  describe('decimalToHexadecimal', () => {
    it('should convert decimal to hexadecimal correctly', () => {
      expect(decimalToHexadecimal(0)).toBe('0');
      expect(decimalToHexadecimal(10)).toBe('A');
      expect(decimalToHexadecimal(15)).toBe('F');
      expect(decimalToHexadecimal(255)).toBe('FF');
      expect(decimalToHexadecimal(4096)).toBe('1000');
    });

    it('should throw error for negative numbers', () => {
      expect(() => decimalToHexadecimal(-1)).toThrow('Input must be a non-negative integer');
    });

    it('should throw error for non-integers', () => {
      expect(() => decimalToHexadecimal(1.5)).toThrow('Input must be a non-negative integer');
    });
  });

  describe('binaryToDecimal', () => {
    it('should convert binary to decimal correctly', () => {
      expect(binaryToDecimal('0')).toBe(0);
      expect(binaryToDecimal('1')).toBe(1);
      expect(binaryToDecimal('1010')).toBe(10);
      expect(binaryToDecimal('11111111')).toBe(255);
      expect(binaryToDecimal('10000000000')).toBe(1024);
    });

    it('should throw error for invalid binary strings', () => {
      expect(() => binaryToDecimal('2')).toThrow('Input must be a valid binary string');
      expect(() => binaryToDecimal('abc')).toThrow('Input must be a valid binary string');
      expect(() => binaryToDecimal('')).toThrow('Input must be a valid binary string');
    });
  });

  describe('binaryToHexadecimal', () => {
    it('should convert binary to hexadecimal correctly', () => {
      expect(binaryToHexadecimal('0')).toBe('0');
      expect(binaryToHexadecimal('1010')).toBe('A');
      expect(binaryToHexadecimal('1111')).toBe('F');
      expect(binaryToHexadecimal('11111111')).toBe('FF');
      expect(binaryToHexadecimal('1000000000000')).toBe('1000');
    });

    it('should throw error for invalid binary strings', () => {
      expect(() => binaryToHexadecimal('2')).toThrow('Input must be a valid binary string');
    });
  });

  describe('hexadecimalToDecimal', () => {
    it('should convert hexadecimal to decimal correctly', () => {
      expect(hexadecimalToDecimal('0')).toBe(0);
      expect(hexadecimalToDecimal('A')).toBe(10);
      expect(hexadecimalToDecimal('a')).toBe(10);
      expect(hexadecimalToDecimal('F')).toBe(15);
      expect(hexadecimalToDecimal('FF')).toBe(255);
      expect(hexadecimalToDecimal('1000')).toBe(4096);
    });

    it('should throw error for invalid hexadecimal strings', () => {
      expect(() => hexadecimalToDecimal('G')).toThrow('Input must be a valid hexadecimal string');
      expect(() => hexadecimalToDecimal('xyz')).toThrow('Input must be a valid hexadecimal string');
      expect(() => hexadecimalToDecimal('')).toThrow('Input must be a valid hexadecimal string');
    });
  });

  describe('hexadecimalToBinary', () => {
    it('should convert hexadecimal to binary correctly', () => {
      expect(hexadecimalToBinary('0')).toBe('0');
      expect(hexadecimalToBinary('A')).toBe('1010');
      expect(hexadecimalToBinary('F')).toBe('1111');
      expect(hexadecimalToBinary('FF')).toBe('11111111');
      expect(hexadecimalToBinary('1000')).toBe('1000000000000');
    });

    it('should throw error for invalid hexadecimal strings', () => {
      expect(() => hexadecimalToBinary('G')).toThrow('Input must be a valid hexadecimal string');
    });
  });

  describe('Validation functions', () => {
    describe('isValidBinary', () => {
      it('should validate binary strings correctly', () => {
        expect(isValidBinary('0')).toBe(true);
        expect(isValidBinary('1')).toBe(true);
        expect(isValidBinary('1010')).toBe(true);
        expect(isValidBinary('11111111')).toBe(true);
        expect(isValidBinary('2')).toBe(false);
        expect(isValidBinary('abc')).toBe(false);
        expect(isValidBinary('')).toBe(false);
      });
    });

    describe('isValidDecimal', () => {
      it('should validate decimal strings correctly', () => {
        expect(isValidDecimal('0')).toBe(true);
        expect(isValidDecimal('123')).toBe(true);
        expect(isValidDecimal('9999')).toBe(true);
        expect(isValidDecimal('01')).toBe(false);
        expect(isValidDecimal('abc')).toBe(false);
        expect(isValidDecimal('')).toBe(false);
        expect(isValidDecimal('-1')).toBe(false);
      });
    });

    describe('isValidHexadecimal', () => {
      it('should validate hexadecimal strings correctly', () => {
        expect(isValidHexadecimal('0')).toBe(true);
        expect(isValidHexadecimal('A')).toBe(true);
        expect(isValidHexadecimal('a')).toBe(true);
        expect(isValidHexadecimal('FF')).toBe(true);
        expect(isValidHexadecimal('1234')).toBe(true);
        expect(isValidHexadecimal('ABCDEF')).toBe(true);
        expect(isValidHexadecimal('G')).toBe(false);
        expect(isValidHexadecimal('xyz')).toBe(false);
        expect(isValidHexadecimal('')).toBe(false);
      });
    });
  });
});