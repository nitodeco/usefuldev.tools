import { useCallback, useState } from 'react';

import { useAnalytics } from '@/hooks/use-analytics';
import { decodeUrl, decodeUrlSpecialChars, encodeUrl, encodeUrlSpecialChars } from '@/lib/url-encoder';

import { ConversionMode, ConversionResult, UrlOperationsResult } from '../types';

export const useUrlOperations = () => {
  const { track } = useAnalytics();
  const [input, setInput] = useState<string>('');
  const [mode, setMode] = useState<ConversionMode>('encode');
  const [useComponentEncoding, setUseComponentEncoding] = useState<boolean>(true);

  const processInput = useCallback((): ConversionResult => {
    if (!input) {
      return {
        output: '',
        isValid: true,
      };
    }

    try {
      let output: string;

      if (mode === 'encode') {
        output = useComponentEncoding ? encodeUrl(input) : encodeUrlSpecialChars(input);
        track('url_encoded', { input_length: input.length, output_length: output.length });
      } else {
        output = useComponentEncoding ? decodeUrl(input) : decodeUrlSpecialChars(input);
        track('url_decoded', { input_length: input.length, output_length: output.length });
      }

      return {
        output,
        isValid: true,
      };
    } catch (error) {
      return {
        output: '',
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }, [input, mode, useComponentEncoding, track]);

  const result: UrlOperationsResult = {
    mode,
    input,
    result: processInput(),
  };

  return {
    input,
    setInput,
    mode,
    setMode,
    useComponentEncoding,
    setUseComponentEncoding,
    result,
  };
};
