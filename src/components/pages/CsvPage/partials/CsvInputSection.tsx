'use client';

import React from 'react';

import { FileJson, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/atoms/Button';
import { Switch } from '@/components/atoms/Switch';

import { ConversionMode, ConversionOptions } from '../types';

interface CsvInputSectionProps {
  mode: ConversionMode;
  onModeChange: (mode: ConversionMode) => void;
  inputText: string;
  onInputChange: (text: string) => void;
  options: ConversionOptions;
  onOptionsChange: (options: ConversionOptions) => void;
  error: string;
  onClearAll: () => void;
}

export const CsvInputSection: React.FC<CsvInputSectionProps> = ({
  mode,
  onModeChange,
  inputText,
  onInputChange,
  options,
  onOptionsChange,
  error,
  onClearAll,
}) => {
  const t = useTranslations('csv');

  const placeholder =
    mode === 'csv-to-json'
      ? 'name,age,city\nJohn,30,New York\nJane,25,London'
      : '[\n  {"name": "John", "age": 30, "city": "New York"},\n  {"name": "Jane", "age": 25, "city": "London"}\n]';

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-xl'>{t('input')}</CardTitle>
          <div className='flex items-center gap-3'>
            <Select value={mode} onValueChange={(value: ConversionMode) => onModeChange(value)}>
              <SelectTrigger className='w-48'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='csv-to-json'>
                  <div className='flex items-center gap-2'>
                    <FileText className='h-4 w-4' />
                    {t('csvToJson')}
                  </div>
                </SelectItem>
                <SelectItem value='json-to-csv'>
                  <div className='flex items-center gap-2'>
                    <FileJson className='h-4 w-4' />
                    {t('jsonToCsv')}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant='outline' size='sm' onClick={onClearAll}>
              {t('clear')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Switch
                id='hasHeader'
                checked={options.hasHeader}
                onCheckedChange={(checked) => onOptionsChange({ ...options, hasHeader: checked })}
              />
              <label htmlFor='hasHeader' className='text-sm'>
                {t('hasHeader')}
              </label>
            </div>
            {mode === 'csv-to-json' && (
              <div className='flex items-center gap-2'>
                <Switch
                  id='prettyPrint'
                  checked={options.prettyPrint}
                  onCheckedChange={(checked) => onOptionsChange({ ...options, prettyPrint: checked })}
                />
                <label htmlFor='prettyPrint' className='text-sm'>
                  {t('prettyPrint')}
                </label>
              </div>
            )}
          </div>
        </div>
        <div className='relative'>
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            className='w-full h-64 p-4 font-mono text-sm rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
        {error && <div className='p-3 rounded-md bg-destructive/10 text-destructive text-sm'>{error}</div>}
      </CardContent>
    </Card>
  );
};
