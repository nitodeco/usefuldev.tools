'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/atoms/Button';
import { FileUpload } from '@/components/molecules/FileUpload';

import type { Base64FileInfo, Base64InputType, Base64Mode } from '../types';

interface Base64InputSectionProps {
  mode: Base64Mode;
  onModeChange: (mode: Base64Mode) => void;
  inputType: Base64InputType;
  onInputTypeChange: (type: Base64InputType) => void;
  inputText: string;
  onInputChange: (text: string) => void;
  isValid: boolean;
  error?: string;
  isConverting: boolean;
  fileInfo?: Base64FileInfo;
  onFileUpload: (file: File) => void;
  onClearAll: () => void;
  formatFileSize: (bytes: number) => string;
}

export const Base64InputSection: React.FC<Base64InputSectionProps> = ({
  mode,
  onModeChange,
  inputType,
  onInputTypeChange,
  inputText,
  onInputChange,
  isValid,
  error,
  isConverting,
  fileInfo,
  onFileUpload,
  onClearAll,
  formatFileSize,
}) => {
  const t = useTranslations('base64');

  const modes: { value: Base64Mode; label: string }[] = [
    { value: 'encode', label: t('modes.encode') },
    { value: 'decode', label: t('modes.decode') },
  ];

  const inputTypes: { value: Base64InputType; label: string }[] = [
    { value: 'text', label: t('inputTypes.text') },
    { value: 'file', label: t('inputTypes.file') },
  ];

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>{t('inputText')}</h2>
        <div className='flex items-center gap-3'>
          <Select value={mode} onValueChange={(value: Base64Mode) => onModeChange(value)}>
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
          <Select value={inputType} onValueChange={(value: Base64InputType) => onInputTypeChange(value)}>
            <SelectTrigger className='w-36'>
              <SelectValue placeholder={t('inputType')} />
            </SelectTrigger>
            <SelectContent>
              {inputTypes.map((typeOption) => (
                <SelectItem key={typeOption.value} value={typeOption.value}>
                  {typeOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant='outline' onClick={onClearAll} disabled={isConverting}>
            {t('clearAll')}
          </Button>
        </div>
      </div>

      <div className='space-y-3'>
        {inputType === 'text' ? (
          <div className='space-y-3'>
            <textarea
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={mode === 'encode' ? t('encodePlaceholder') : t('decodePlaceholder')}
              className='w-full min-h-32 p-3 border border-input bg-background rounded-md text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              disabled={isConverting}
            />
            {error && !isValid && <p className='text-sm text-destructive'>{error}</p>}
          </div>
        ) : (
          <FileUpload
            onFileUpload={onFileUpload}
            fileInfo={fileInfo}
            accept='image/*,application/pdf,.txt,.json,.xml,.csv,.log'
            maxSize={10 * 1024 * 1024}
            disabled={isConverting}
            placeholder={t('dropFile')}
            supportedFormats={t('supportedFormats')}
            formatFileSize={formatFileSize}
            error={error && !isValid ? error : undefined}
            showInfo={mode === 'encode'}
          />
        )}
      </div>
    </div>
  );
};
