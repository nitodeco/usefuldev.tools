'use client';

import React, { useEffect, useState } from 'react';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import posthog from 'posthog-js';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export const RegexPage: React.FC = () => {
  const t = useTranslations('regex');
  const [regexPattern, setRegexPattern] = useState<string>('');
  const [testString, setTestString] = useState<string>('');
  const [isValidRegex, setIsValidRegex] = useState<boolean | null>(null);
  const [testMatches, setTestMatches] = useState<'full' | 'partial' | 'none' | null>(null);
  const [regexError, setRegexError] = useState<string>('');
  const [characterMatches, setCharacterMatches] = useState<boolean[]>([]);

  const validateRegex = (pattern: string, testStr: string = '') => {
    if (!pattern.trim()) {
      setIsValidRegex(null);
      setTestMatches(null);
      setRegexError('');
      return;
    }

    try {
      const regex = new RegExp(pattern);
      setIsValidRegex(true);
      setRegexError('');

      let matchResult: 'full' | 'partial' | 'none' | null = null;

      if (testStr.trim()) {
        const partialMatch = regex.test(testStr);

        const charMatches = Array.from(testStr).map((char) => {
          try {
            return regex.test(char);
          } catch {
            return false;
          }
        });
        setCharacterMatches(charMatches);

        if (!partialMatch) {
          matchResult = 'none';
        } else {
          const remainingAfterMatches = testStr.replace(new RegExp(pattern, 'g'), '');
          const isFullMatch = remainingAfterMatches === '';

          matchResult = isFullMatch ? 'full' : 'partial';
        }
        setTestMatches(matchResult);
      } else {
        setTestMatches(null);
        setCharacterMatches([]);
      }

      posthog.capture('regex_validated', {
        pattern_length: pattern.length,
        is_valid: true,
        has_test_string: !!testStr.trim(),
        test_matches: matchResult,
      });
    } catch (error) {
      setIsValidRegex(false);
      setTestMatches(null);
      setRegexError(error instanceof Error ? error.message : 'Invalid regex pattern');

      posthog.capture('regex_validated', {
        pattern_length: pattern.length,
        is_valid: false,
        has_test_string: !!testStr.trim(),
        test_matches: null,
        error: error instanceof Error ? error.message : 'Invalid regex pattern',
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateRegex(regexPattern, testString);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [regexPattern, testString]);

  const getValidationBadge = () => {
    if (isValidRegex === null) return null;

    return (
      <Badge
        variant={isValidRegex ? 'default' : 'destructive'}
        className={`text-sm ${
          isValidRegex
            ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
            : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
        }`}
      >
        {isValidRegex ? (
          <>
            <CheckCircle2 className='h-3 w-3 mr-1' />
            {t('validRegex')}
          </>
        ) : (
          <>
            <AlertCircle className='h-3 w-3 mr-1' />
            {t('invalidRegex')}
          </>
        )}
      </Badge>
    );
  };

  const getTestResultBadge = () => {
    if (!isValidRegex || !testString.trim() || testMatches === null) return null;

    const getBadgeStyle = () => {
      switch (testMatches) {
        case 'full':
          return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
        case 'partial':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
        case 'none':
          return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
      }
    };

    const getBadgeText = () => {
      switch (testMatches) {
        case 'full':
          return t('fullMatch');
        case 'partial':
          return t('partialMatch');
        case 'none':
          return t('testNoMatch');
        default:
          return t('testNoMatch');
      }
    };

    return (
      <Badge variant={testMatches === 'full' ? 'default' : 'secondary'} className={`text-sm ${getBadgeStyle()}`}>
        {getBadgeText()}
      </Badge>
    );
  };

  const renderCharacterAnalysis = () => {
    if (!testString.trim() || !isValidRegex || characterMatches.length === 0) return null;

    return (
      <div className='space-y-3'>
        <div className='flex flex-wrap gap-2'>
          {Array.from(testString).map((char, index) => {
            const isMatch = characterMatches[index];
            const isSpace = char === ' ';
            const displayChar = isSpace ? '␣' : char;

            return (
              <div
                key={index}
                className={`
                  flex items-center justify-center w-12 h-12 font-mono text-lg font-medium
                  ${
                    isMatch
                      ? 'bg-green-200 text-green-900 dark:bg-green-800/60 dark:text-green-100'
                      : 'bg-red-200 text-red-900 dark:bg-red-800/60 dark:text-red-100'
                  }
                  ${isSpace ? 'italic opacity-75' : ''}
                `}
                title={isSpace ? 'Space character' : `Character: ${char}`}
              >
                {displayChar}
              </div>
            );
          })}
        </div>
        <div className='flex items-center gap-6 text-sm'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-green-200 dark:bg-green-800/60'></div>
            <span className='text-muted-foreground'>{t('matchingCharacters')}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-red-200 dark:bg-red-800/60'></div>
            <span className='text-muted-foreground'>{t('nonMatchingCharacters')}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-center gap-3'>
            <h2 className='text-xl font-semibold'>{t('regexPattern')}</h2>
            {getValidationBadge()}
          </div>
          <div className='space-y-3'>
            <Input
              type='text'
              placeholder={t('regexPlaceholder')}
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              className='text-lg font-mono'
            />
            {regexError && (
              <div className='flex items-center gap-3'>
                <span className='text-sm text-red-600 dark:text-red-400'>{regexError}</span>
              </div>
            )}
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-3'>
            <h2 className='text-xl font-semibold'>{t('testString')}</h2>
            {getTestResultBadge()}
          </div>
          <div className='space-y-3'>
            <Input
              type='text'
              placeholder={t('testStringPlaceholder')}
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              disabled={!isValidRegex}
              className='text-lg'
            />
            {!testString.trim() && isValidRegex && (
              <div className='flex items-center gap-3'>
                <span className='text-sm text-muted-foreground'>{t('noTestString')}</span>
              </div>
            )}
          </div>
        </div>

        {renderCharacterAnalysis()}
      </div>
    </div>
  );
};
