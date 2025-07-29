import { useEffect, useState } from 'react';

import { useAnalytics } from '@/hooks/use-analytics';

import type { MatchType, RegexValidationResult, UseRegexValidationReturn } from '../types';

const VALIDATION_DELAY = 300;

export const useRegexValidation = (): UseRegexValidationReturn => {
  const { track } = useAnalytics();
  const [regexPattern, setRegexPattern] = useState<string>('');
  const [testString, setTestString] = useState<string>('');
  const [validationResult, setValidationResult] = useState<RegexValidationResult>({
    isValid: null,
    error: '',
    testMatches: null,
    characterMatches: [],
  });

  useEffect(() => {
    const validateRegex = (pattern: string, testStr: string = '') => {
      if (!pattern.trim()) {
        setValidationResult({
          isValid: null,
          error: '',
          testMatches: null,
          characterMatches: [],
        });

        return;
      }

      try {
        const regex = new RegExp(pattern);
        let matchResult: MatchType = null;
        let charMatches: boolean[] = [];

        if (testStr.trim()) {
          const partialMatch = regex.test(testStr);

          if (!partialMatch) {
            matchResult = 'none';
            charMatches = new Array(testStr.length).fill(false);
          } else {
            const globalRegex = new RegExp(pattern, 'g');
            const matches = Array.from(testStr.matchAll(globalRegex));

            charMatches = new Array(testStr.length).fill(false);

            for (const match of matches) {
              if (match.index !== undefined) {
                for (let i = match.index; i < match.index + match[0].length; i++) {
                  charMatches[i] = true;
                }
              }
            }

            const remainingAfterMatches = testStr.replace(globalRegex, '');
            const isFullMatch = remainingAfterMatches === '';

            matchResult = isFullMatch ? 'full' : 'partial';
          }
        }

        setValidationResult({
          isValid: true,
          error: '',
          testMatches: matchResult,
          characterMatches: charMatches,
        });

        track('regex_validated', {
          pattern_length: pattern.length,
          is_valid: true,
          has_test_string: !!testStr.trim(),
          test_matches: matchResult,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Invalid regex pattern';

        setValidationResult({
          isValid: false,
          error: errorMessage,
          testMatches: null,
          characterMatches: [],
        });

        track('regex_validated', {
          pattern_length: pattern.length,
          is_valid: false,
          has_test_string: !!testStr.trim(),
          test_matches: null,
          error: errorMessage,
        });
      }
    };

    const timeoutId = setTimeout(() => {
      validateRegex(regexPattern, testString);
    }, VALIDATION_DELAY);

    return () => clearTimeout(timeoutId);
  }, [regexPattern, testString, track]);

  return {
    regexPattern,
    setRegexPattern,
    testString,
    setTestString,
    validationResult,
  };
};
