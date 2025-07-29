'use client';

import React, { useState } from 'react';

import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { useTranslations } from 'next-intl';
import xxhash from 'xxhash-wasm';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/atoms/Button';
import { CopyButton } from '@/components/molecules/CopyButton';

import { useAnalytics } from '@/hooks/use-analytics';
import { copyToClipboard } from '@/lib/copy';

import { HashAlgorithm } from './types';

export const HashingPage: React.FC = () => {
  const t = useTranslations('tools.hash');
  const { track } = useAnalytics();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<HashAlgorithm>('sha256');
  const [inputText, setInputText] = useState<string>('');
  const [hashedValue, setHashedValue] = useState<string>('');
  const [usedAlgorithm, setUsedAlgorithm] = useState<HashAlgorithm>('sha256');
  const [copied, setCopied] = useState<boolean>(false);
  const [isHashing, setIsHashing] = useState<boolean>(false);

  const hashAlgorithms: { value: HashAlgorithm; label: string }[] = [
    { value: 'md5', label: t('algorithms.md5') },
    { value: 'sha256', label: t('algorithms.sha256') },
    { value: 'sha512', label: t('algorithms.sha512') },
    { value: 'bcrypt', label: t('algorithms.bcrypt') },
    { value: 'xxhash', label: t('algorithms.xxhash') },
  ];

  const generateHash = async (text: string, algorithm: HashAlgorithm): Promise<string> => {
    if (!text) return '';

    switch (algorithm) {
      case 'md5':
        return CryptoJS.MD5(text).toString();
      case 'sha256':
        return CryptoJS.SHA256(text).toString();
      case 'sha512':
        return CryptoJS.SHA512(text).toString();
      case 'bcrypt': {
        const salt = await bcrypt.genSalt(10);

        return bcrypt.hashSync(text, salt);
      }
      case 'xxhash': {
        const hasher = await xxhash();

        return hasher.h64ToString(text);
      }
      default:
        return CryptoJS.SHA256(text).toString();
    }
  };

  const handleGenerate = async () => {
    if (!inputText) {
      setHashedValue('');
      setUsedAlgorithm(selectedAlgorithm);

      return;
    }

    setIsHashing(true);
    setCopied(false);

    try {
      const startTime = performance.now();
      const hash = await generateHash(inputText, selectedAlgorithm);
      const endTime = performance.now();

      setHashedValue(hash);
      setUsedAlgorithm(selectedAlgorithm);

      track('hash_generated', {
        algorithm: selectedAlgorithm,
        input_length: inputText.length,
        hash_length: hash.length,
        time_ms: Math.round(endTime - startTime),
      });
    } catch (error) {
      console.error('Error generating hash:', error);
      setHashedValue('');
    } finally {
      setIsHashing(false);
    }
  };

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>{t('inputText')}</h2>
            <div className='flex items-center justify-end gap-3'>
              <Select value={selectedAlgorithm} onValueChange={(value: HashAlgorithm) => setSelectedAlgorithm(value)}>
                <SelectTrigger className='w-48'>
                  <SelectValue placeholder={t('selectAlgorithm')} />
                </SelectTrigger>
                <SelectContent>
                  {hashAlgorithms.map((algorithm) => (
                    <SelectItem key={algorithm.value} value={algorithm.value}>
                      {algorithm.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleGenerate} disabled={isHashing}>
                {isHashing ? t('generating') : t('generateHash')}
              </Button>
            </div>
          </div>

          <div className='space-y-3'>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className='w-full'
            />
          </div>
        </div>

        {hashedValue && (
          <div>
            <h2 className='text-xl font-semibold mb-3'>{t('result')}</h2>
            <div className='flex items-center gap-3 p-6 rounded-lg border'>
              <Badge variant='secondary' className='text-sm'>
                {usedAlgorithm.toUpperCase()}
              </Badge>
              <code className='text-lg font-mono flex-1 break-all'>{hashedValue}</code>
              <CopyButton value={hashedValue} onCopy={() => copyToClipboard(hashedValue, setCopied)} copied={copied} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
