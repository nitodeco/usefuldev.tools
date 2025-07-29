import React from 'react';

import { useTranslations } from 'next-intl';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/atoms/Button';
import { Switch } from '@/components/atoms/Switch';

import { ConversionMode } from '../types';

interface UrlInputSectionProps {
  mode: ConversionMode;
  onModeChange: (mode: ConversionMode) => void;
  input: string;
  onInputChange: (input: string) => void;
  useComponentEncoding: boolean;
  onEncodingTypeChange: (useComponentEncoding: boolean) => void;
}

export const UrlInputSection: React.FC<UrlInputSectionProps> = ({
  mode,
  onModeChange,
  input,
  onInputChange,
  useComponentEncoding,
  onEncodingTypeChange,
}) => {
  const t = useTranslations('urlEncoder');

  const modes: { value: ConversionMode; label: string }[] = [
    { value: 'encode', label: t('modes.encode') },
    { value: 'decode', label: t('modes.decode') },
  ];

  const clearAll = () => {
    onInputChange('');
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>{t('input')}</h2>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <label htmlFor='encoding-type' className='text-sm'>
              {t('useComponentEncoding')}
            </label>
            <Switch id='encoding-type' checked={useComponentEncoding} onCheckedChange={onEncodingTypeChange} />
          </div>
          <Select value={mode} onValueChange={(value: ConversionMode) => onModeChange(value)}>
            <SelectTrigger className='w-48'>
              <SelectValue placeholder={t('mode')} />
            </SelectTrigger>
            <SelectContent>
              {modes.map((modeOption) => (
                <SelectItem key={modeOption.value} value={modeOption.value}>
                  {modeOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant='outline' onClick={clearAll}>
            {t('clearAll')}
          </Button>
        </div>
      </div>

      <div className='space-y-3'>
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={mode === 'encode' ? t('inputPlaceholder.encode') : t('inputPlaceholder.decode')}
          className='w-full min-h-32 p-3 border border-input bg-background rounded-md text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
        />
      </div>
    </div>
  );
};
