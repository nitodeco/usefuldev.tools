import React from 'react';

import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/atoms/Button';

import { NumberFormat } from '../types';

interface ConverterInputSectionProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  inputFormat: NumberFormat;
  setInputFormat: (format: NumberFormat) => void;
  onConvert: () => void;
  onClear: () => void;
  error: string | null;
  isValid: boolean;
}

export const ConverterInputSection: React.FC<ConverterInputSectionProps> = ({
  inputValue,
  setInputValue,
  inputFormat,
  setInputFormat,
  onConvert,
  onClear,
  error,
  isValid,
}) => {
  const t = useTranslations('converter');

  const formats: { value: NumberFormat; label: string }[] = [
    { value: 'binary', label: t('formats.binary') },
    { value: 'decimal', label: t('formats.decimal') },
    { value: 'hexadecimal', label: t('formats.hexadecimal') },
  ];

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid) {
      onConvert();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('inputLabel')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={inputFormat} onValueChange={(value: NumberFormat) => setInputFormat(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {formats.map((format) => (
              <SelectItem key={format.value} value={format.value}>
                {format.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('inputPlaceholder')}
            className={error ? 'border-red-500' : ''}
          />
          {error && (
            <p className="text-sm text-red-500">{t(error)}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onConvert}
            disabled={!isValid}
            className="flex-1"
          >
            {t('convertButton')}
          </Button>
          <Button
            onClick={onClear}
            variant="outline"
          >
            {t('clearButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};