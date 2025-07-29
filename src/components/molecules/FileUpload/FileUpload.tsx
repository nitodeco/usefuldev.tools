'use client';

import React, { useRef } from 'react';

import { File, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { FileInfo } from '@/types/file';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  placeholder?: string;
  supportedFormats?: string;
  fileInfo?: FileInfo;
  formatFileSize?: (bytes: number) => string;
  error?: string;
  showInfo?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  disabled = false,
  className = '',
  children,
  placeholder,
  supportedFormats,
  fileInfo,
  formatFileSize,
  error,
  showInfo = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('fileUpload');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        return;
      }
      onFileUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) return;

    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        return;
      }
      onFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const defaultFormatFileSize = (bytes: number): string => {
    if (bytes === 0) return `0 ${t('fileSizes.bytes')}`;
    const k = 1_024; // 1KB
    const sizes = [t('fileSizes.bytes'), t('fileSizes.kb'), t('fileSizes.mb'), t('fileSizes.gb')];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fileSizeFormatter = formatFileSize || defaultFormatFileSize;

  return (
    <div className='space-y-3'>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`w-full min-h-32 p-6 border-2 border-dashed border-input bg-background rounded-md text-center cursor-pointer hover:border-ring transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
        onClick={openFileDialog}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            openFileDialog();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type='file'
          onChange={handleFileSelect}
          className='hidden'
          disabled={disabled}
          accept={accept}
        />

        {children || (
          <div className='space-y-2'>
            <div className='flex justify-center'>
              {fileInfo ? (
                <File className='h-8 w-8 text-muted-foreground' />
              ) : (
                <Upload className='h-8 w-8 text-muted-foreground' />
              )}
            </div>
            <p className='text-sm text-muted-foreground'>
              {fileInfo ? `${fileInfo.name} (${fileSizeFormatter(fileInfo.size)})` : placeholder || t('dropFile')}
            </p>
            {!fileInfo && supportedFormats && <p className='text-xs text-muted-foreground'>{supportedFormats}</p>}
          </div>
        )}
      </div>

      {showInfo && fileInfo && (
        <div className='text-xs text-muted-foreground space-y-1'>
          <p>
            <strong>{t('fileInfo.name')}:</strong> {fileInfo.name} <strong>{t('fileInfo.size')}:</strong>{' '}
            {fileSizeFormatter(fileInfo.size)} <strong>{t('fileInfo.type')}:</strong>{' '}
            {fileInfo.type || t('fileInfo.unknown')} <strong>{t('fileInfo.lastModified')}:</strong>{' '}
            {new Date(fileInfo.lastModified).toLocaleString()}
          </p>
        </div>
      )}

      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  );
};
