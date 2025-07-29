import React from 'react';

import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { FileSizeUnit, UnitInfo } from '../types';

interface FileSizeInputSectionProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  inputUnit: FileSizeUnit;
  setInputUnit: (unit: FileSizeUnit) => void;
  outputUnit: FileSizeUnit;
  setOutputUnit: (unit: FileSizeUnit) => void;
  error: string;
}

export const FileSizeInputSection: React.FC<FileSizeInputSectionProps> = ({
  inputValue,
  setInputValue,
  inputUnit,
  setInputUnit,
  outputUnit,
  setOutputUnit,
  error,
}) => {
  const t = useTranslations('filesize');

  const units: UnitInfo[] = [
    // Decimal units
    { value: 'B', label: t('units.B'), bytes: 1, isBinary: false },
    { value: 'KB', label: t('units.KB'), bytes: 1000, isBinary: false },
    { value: 'MB', label: t('units.MB'), bytes: 1000 ** 2, isBinary: false },
    { value: 'GB', label: t('units.GB'), bytes: 1000 ** 3, isBinary: false },
    { value: 'TB', label: t('units.TB'), bytes: 1000 ** 4, isBinary: false },
    { value: 'PB', label: t('units.PB'), bytes: 1000 ** 5, isBinary: false },
    { value: 'EB', label: t('units.EB'), bytes: 1000 ** 6, isBinary: false },
    { value: 'ZB', label: t('units.ZB'), bytes: 1000 ** 7, isBinary: false },
    { value: 'YB', label: t('units.YB'), bytes: 1000 ** 8, isBinary: false },
    // Binary units
    { value: 'KiB', label: t('units.KiB'), bytes: 1024, isBinary: true },
    { value: 'MiB', label: t('units.MiB'), bytes: 1024 ** 2, isBinary: true },
    { value: 'GiB', label: t('units.GiB'), bytes: 1024 ** 3, isBinary: true },
    { value: 'TiB', label: t('units.TiB'), bytes: 1024 ** 4, isBinary: true },
    { value: 'PiB', label: t('units.PiB'), bytes: 1024 ** 5, isBinary: true },
    { value: 'EiB', label: t('units.EiB'), bytes: 1024 ** 6, isBinary: true },
    { value: 'ZiB', label: t('units.ZiB'), bytes: 1024 ** 7, isBinary: true },
    { value: 'YiB', label: t('units.YiB'), bytes: 1024 ** 8, isBinary: true },
  ];

  const decimalUnits = units.filter(u => !u.isBinary);
  const binaryUnits = units.filter(u => u.isBinary && u.value !== 'B');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="input-value" className="text-sm font-medium mb-2 block">
            {t('inputValue')}
          </label>
          <Input
            id="input-value"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('valuePlaceholder')}
            className={error ? 'border-red-500' : ''}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">{t('invalidValue')}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="input-unit" className="text-sm font-medium mb-2 block">
              {t('inputUnit')}
            </label>
            <Select value={inputUnit} onValueChange={(value: FileSizeUnit) => setInputUnit(value)}>
              <SelectTrigger id="input-unit">
                <SelectValue placeholder={t('selectInputUnit')} />
              </SelectTrigger>
              <SelectContent>
                <div className="font-semibold text-sm px-2 py-1.5 text-muted-foreground">
                  {t('decimalUnits')}
                </div>
                {decimalUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
                <div className="font-semibold text-sm px-2 py-1.5 text-muted-foreground mt-2">
                  {t('binaryUnits')}
                </div>
                {binaryUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="output-unit" className="text-sm font-medium mb-2 block">
              {t('outputUnit')}
            </label>
            <Select value={outputUnit} onValueChange={(value: FileSizeUnit) => setOutputUnit(value)}>
              <SelectTrigger id="output-unit">
                <SelectValue placeholder={t('selectOutputUnit')} />
              </SelectTrigger>
              <SelectContent>
                <div className="font-semibold text-sm px-2 py-1.5 text-muted-foreground">
                  {t('decimalUnits')}
                </div>
                {decimalUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
                <div className="font-semibold text-sm px-2 py-1.5 text-muted-foreground mt-2">
                  {t('binaryUnits')}
                </div>
                {binaryUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};