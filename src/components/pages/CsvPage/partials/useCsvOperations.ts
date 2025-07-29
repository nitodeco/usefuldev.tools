'use client';

import { useCallback, useEffect, useState } from 'react';

import Papa from 'papaparse';
import posthog from 'posthog-js';

import { ConversionMode, ConversionOptions } from '../types';

export const useCsvOperations = () => {
  const [mode, setMode] = useState<ConversionMode>('csv-to-json');
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [options, setOptions] = useState<ConversionOptions>({
    hasHeader: true,
    prettyPrint: true,
  });
  const [error, setError] = useState<string>('');
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const convert = useCallback(() => {
    setIsConverting(true);
    setError('');
    setOutputText('');

    try {
      if (mode === 'csv-to-json') {
        const result = Papa.parse(inputText, {
          header: options.hasHeader,
          skipEmptyLines: true,
          dynamicTyping: true,
        });

        if (result.errors.length > 0) {
          setError(result.errors[0].message);

          return;
        }

        const jsonOutput = options.prettyPrint ? JSON.stringify(result.data, null, 2) : JSON.stringify(result.data);

        setOutputText(jsonOutput);

        posthog.capture('csv_to_json_converted', {
          input_length: inputText.length,
          output_length: jsonOutput.length,
          has_header: options.hasHeader,
          pretty_print: options.prettyPrint,
        });
      } else {
        const jsonData = JSON.parse(inputText);

        if (!Array.isArray(jsonData)) {
          throw new Error('Input must be a JSON array');
        }

        const csv = Papa.unparse(jsonData, {
          header: options.hasHeader,
        });

        setOutputText(csv);

        posthog.capture('json_to_csv_converted', {
          input_length: inputText.length,
          output_length: csv.length,
          has_header: options.hasHeader,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid input format';

      setError(errorMessage);
    } finally {
      setIsConverting(false);
    }
  }, [inputText, mode, options]);

  useEffect(() => {
    if (inputText) {
      const timer = setTimeout(() => {
        convert();
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setOutputText('');
      setError('');
    }
  }, [inputText, convert]);

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  const downloadOutput = () => {
    if (!outputText) return;

    const fileType = mode === 'csv-to-json' ? 'json' : 'csv';
    const mimeType = mode === 'csv-to-json' ? 'application/json' : 'text/csv';
    const fileName = `converted.${fileType}`;

    const blob = new Blob([outputText], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    posthog.capture('csv_file_downloaded', {
      file_type: fileType,
      file_size: blob.size,
    });
  };

  return {
    mode,
    setMode,
    inputText,
    setInputText,
    outputText,
    options,
    setOptions,
    error,
    isConverting,
    clearAll,
    downloadOutput,
  };
};
