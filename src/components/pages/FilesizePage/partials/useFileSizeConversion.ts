import { useCallback, useEffect, useState } from 'react';

import { convertFileSize, formatFileSize, validateFileSizeInput } from '@/lib/filesize';

import type { ConversionResult, FileSizeUnit } from '../types';

export const useFileSizeConversion = () => {
  const [inputValue, setInputValue] = useState<string>('1');
  const [inputUnit, setInputUnit] = useState<FileSizeUnit>('GB');
  const [outputUnit, setOutputUnit] = useState<FileSizeUnit>('GiB');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>('');

  const performConversion = useCallback(() => {
    const validatedValue = validateFileSizeInput(inputValue);
    
    if (validatedValue === null) {
      setError('invalidValue');
      setResult(null);

      return;
    }

    setError('');
    
    try {
      const convertedValue = convertFileSize(validatedValue, inputUnit, outputUnit);
      const formatted = formatFileSize(convertedValue);
      
      setResult({
        value: convertedValue,
        formatted,
        unit: outputUnit,
      });
    } catch {
      setError('conversionError');
      setResult(null);
    }
  }, [inputValue, inputUnit, outputUnit]);

  useEffect(() => {
    performConversion();
  }, [performConversion]);

  const getAllConversions = useCallback((): ConversionResult[] => {
    const validatedValue = validateFileSizeInput(inputValue);

    if (validatedValue === null) return [];

    const allUnits: FileSizeUnit[] = [
      'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB',
      'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'
    ];

    return allUnits.map(unit => {
      try {
        const convertedValue = convertFileSize(validatedValue, inputUnit, unit);
        const formatted = formatFileSize(convertedValue);
        
        return {
          value: convertedValue,
          formatted,
          unit,
        };
      } catch {
        return {
          value: 0,
          formatted: '0',
          unit,
        };
      }
    });
  }, [inputValue, inputUnit]);

  return {
    inputValue,
    setInputValue,
    inputUnit,
    setInputUnit,
    outputUnit,
    setOutputUnit,
    result,
    error,
    getAllConversions,
  };
};