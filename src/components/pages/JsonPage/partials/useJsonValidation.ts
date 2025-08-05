import { useCallback, useEffect, useState } from 'react';

import { useAnalytics } from '@/hooks/use-analytics';

import type { JsonFormattingOptions, JsonValidationResult, UseJsonValidationReturn } from '../types';

const VALIDATION_DELAY = 300;

export const useJsonValidation = (): UseJsonValidationReturn => {
  const { track } = useAnalytics();
  const [jsonInput, setJsonInput] = useState<string>('');
  const [formattingOptions, setFormattingOptions] = useState<JsonFormattingOptions>({
    indent: 2,
    sortKeys: false,
  });
  const [validationResult, setValidationResult] = useState<JsonValidationResult>({
    isValid: null,
    error: '',
    formattedJson: '',
    parsedObject: null,
  });

  const sortObjectKeys = useCallback((obj: unknown): unknown => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    }

    if (obj !== null && typeof obj === 'object') {
      const sortedKeys = Object.keys(obj).sort();
      const sortedObj: Record<string, unknown> = {};

      for (const key of sortedKeys) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        sortedObj[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
      }

      return sortedObj;
    }

    return obj;
  }, []);

  const validateAndFormatJson = useCallback(
    (input: string, options: JsonFormattingOptions) => {
      if (!input.trim()) {
        setValidationResult({
          isValid: null,
          error: '',
          formattedJson: '',
          parsedObject: null,
        });

        return;
      }

      try {
        const parsed = JSON.parse(input);

        let formattedJson: string;

        if (options.sortKeys && typeof parsed === 'object' && parsed !== null) {
          formattedJson = JSON.stringify(sortObjectKeys(parsed), null, options.indent);
        } else {
          formattedJson = JSON.stringify(parsed, null, options.indent);
        }

        setValidationResult({
          isValid: true,
          error: '',
          formattedJson,
          parsedObject: parsed,
        });

        track('json_validated', {
          input_length: input.length,
          is_valid: true,
          has_objects: typeof parsed === 'object',
          indent_size: options.indent,
          sort_keys: options.sortKeys,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Invalid JSON';

        setValidationResult({
          isValid: false,
          error: errorMessage,
          formattedJson: '',
          parsedObject: null,
        });

        track('json_validated', {
          input_length: input.length,
          is_valid: false,
          error: errorMessage,
          indent_size: options.indent,
          sort_keys: options.sortKeys,
        });
      }
    },
    [sortObjectKeys, track],
  );

  const formatJson = useCallback(() => {
    if (validationResult.isValid && validationResult.parsedObject !== null) {
      validateAndFormatJson(jsonInput, formattingOptions);
    }
  }, [jsonInput, formattingOptions, validationResult.isValid, validationResult.parsedObject, validateAndFormatJson]);

  const minifyJson = useCallback(() => {
    if (validationResult.isValid && validationResult.parsedObject !== null) {
      const minified = JSON.stringify(validationResult.parsedObject);

      setValidationResult((prev) => ({
        ...prev,
        formattedJson: minified,
      }));

      track('json_minified', {
        original_length: validationResult.formattedJson.length,
        minified_length: minified.length,
      });
    }
  }, [validationResult.isValid, validationResult.parsedObject, validationResult.formattedJson.length, track]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateAndFormatJson(jsonInput, formattingOptions);
    }, VALIDATION_DELAY);

    return () => clearTimeout(timeoutId);
  }, [jsonInput, formattingOptions, validateAndFormatJson]);

  return {
    jsonInput,
    setJsonInput,
    validationResult,
    formattingOptions,
    setFormattingOptions,
    formatJson,
    minifyJson,
  };
};
