import { useState, useCallback } from 'react';

import {
  binaryToDecimal,
  decimalToBinary,
  decimalToHexadecimal,
  hexadecimalToDecimal,
  isValidBinary,
  isValidDecimal,
  isValidHexadecimal,
} from '@/lib/converter';

import { ConversionResult, NumberFormat } from '../types';

export const useNumberConversion = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputFormat, setInputFormat] = useState<NumberFormat>('decimal');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInput = useCallback((value: string, format: NumberFormat): boolean => {
    if (!value) return false;

    switch (format) {
      case 'binary':
        return isValidBinary(value);
      case 'decimal':
        return isValidDecimal(value);
      case 'hexadecimal':
        return isValidHexadecimal(value);
      default:
        return false;
    }
  }, []);

  const convertNumber = useCallback(() => {
    setError(null);
    
    if (!inputValue) {
      setConversionResult(null);

      return;
    }

    if (!validateInput(inputValue, inputFormat)) {
      setError('invalidInput');
      setConversionResult(null);

      return;
    }

    try {
      let decimal: number;
      
      switch (inputFormat) {
        case 'binary':
          decimal = binaryToDecimal(inputValue);
          break;
        case 'decimal':
          decimal = parseInt(inputValue, 10);
          break;
        case 'hexadecimal':
          decimal = hexadecimalToDecimal(inputValue);
          break;
        default:
          throw new Error('Invalid input format');
      }

      const result: ConversionResult = {
        binary: decimalToBinary(decimal),
        decimal: decimal.toString(),
        hexadecimal: decimalToHexadecimal(decimal),
      };

      setConversionResult(result);
    } catch {
      setError('conversionError');
      setConversionResult(null);
    }
  }, [inputValue, inputFormat, validateInput]);

  const clearAll = useCallback(() => {
    setInputValue('');
    setConversionResult(null);
    setError(null);
  }, []);

  return {
    inputValue,
    setInputValue,
    inputFormat,
    setInputFormat,
    conversionResult,
    error,
    convertNumber,
    clearAll,
    validateInput,
  };
};