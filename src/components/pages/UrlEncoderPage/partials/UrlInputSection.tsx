import React from 'react';

import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>{t('input')}</span>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <label htmlFor='encoding-type' className='text-sm font-normal'>
                {t('useComponentEncoding')}
              </label>
              <Switch
                id='encoding-type'
                checked={useComponentEncoding}
                onCheckedChange={onEncodingTypeChange}
              />
            </div>
            <Select value={mode} onValueChange={(value: ConversionMode) => onModeChange(value)}>
              <SelectTrigger className='w-40'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='encode'>{t('modes.encode')}</SelectItem>
                <SelectItem value='decode'>{t('modes.decode')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          className='w-full h-40 p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-mono text-sm'
          placeholder={mode === 'encode' ? t('inputPlaceholder.encode') : t('inputPlaceholder.decode')}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};