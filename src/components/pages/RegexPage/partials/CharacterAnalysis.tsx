import React from 'react';

import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface CharacterAnalysisProps {
  testString: string;
  isValidRegex: boolean;
  characterMatches: boolean[];
}

export const CharacterAnalysis: React.FC<CharacterAnalysisProps> = ({ testString, isValidRegex, characterMatches }) => {
  const t = useTranslations('regex');

  if (!testString.trim() || !isValidRegex || characterMatches.length === 0) {
    return null;
  }

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
              className={cn(
                'flex items-center justify-center w-12 h-12 font-mono text-lg font-medium',
                isMatch
                  ? 'bg-green-200 text-green-900 dark:bg-green-800/60 dark:text-green-100'
                  : 'bg-red-200 text-red-900 dark:bg-red-800/60 dark:text-red-100',
                isSpace && 'italic opacity-75',
              )}
              title={isSpace ? 'Space character' : `Character: ${char}`}
            >
              {displayChar}
            </div>
          );
        })}
      </div>

      <CharacterLegend />
    </div>
  );
};

const CharacterLegend: React.FC = () => {
  const t = useTranslations('regex');

  return (
    <div className='flex items-center gap-6 text-sm'>
      <div className='flex items-center gap-2'>
        <div className='w-4 h-4 bg-green-200 dark:bg-green-800/60' />
        <span className='text-muted-foreground'>{t('matchingCharacters')}</span>
      </div>
      <div className='flex items-center gap-2'>
        <div className='w-4 h-4 bg-red-200 dark:bg-red-800/60' />
        <span className='text-muted-foreground'>{t('nonMatchingCharacters')}</span>
      </div>
    </div>
  );
};
