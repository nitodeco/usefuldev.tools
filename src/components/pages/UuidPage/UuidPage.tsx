'use client';

import React, { useEffect, useState } from 'react';

import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import posthog from 'posthog-js';
import { v1 as uuidv1, v4 as uuidv4, v6 as uuidv6, v7 as uuidv7 } from 'uuid';

import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/atoms/Button';

import { copyToClipboard } from '@/lib/copy';

import { UuidVersion } from './types';

export const UuidPage: React.FC = () => {
  const t = useTranslations('uuid');
  const [selectedVersion, setSelectedVersion] = useState<UuidVersion>('v4');
  const [generatedUuid, setGeneratedUuid] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generateUuid = (version: UuidVersion): string => {
    switch (version) {
      case 'v1':
        return uuidv1();
      case 'v4':
        return uuidv4();
      case 'v6':
        return uuidv6();
      case 'v7':
        return uuidv7();
      default:
        return uuidv4();
    }
  };

  const handleGenerate = () => {
    const newUuid = generateUuid(selectedVersion);
    setGeneratedUuid(newUuid);
    setCopied(false);

    posthog.capture('uuid_generated', {
      version: selectedVersion,
      uuid_length: newUuid.length,
    });
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const uuidVersions: { value: UuidVersion; label: string }[] = [
    { value: 'v1', label: t('versions.v1') },
    { value: 'v4', label: t('versions.v4') },
    { value: 'v6', label: t('versions.v6') },
    { value: 'v7', label: t('versions.v7') },
  ];

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{t('generatedUuids')}</h2>
          <div className='flex items-center gap-3'>
            <Select value={selectedVersion} onValueChange={(value: UuidVersion) => setSelectedVersion(value)}>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder={t('selectVersion')} />
              </SelectTrigger>
              <SelectContent>
                {uuidVersions.map((version) => (
                  <SelectItem key={version.value} value={version.value}>
                    {version.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGenerate}>{t('generateSingle')}</Button>
          </div>
        </div>

        {generatedUuid && (
          <div className='flex items-center gap-3 p-6 rounded-lg border'>
            <Badge variant='secondary' className='text-sm'>
              {selectedVersion.toUpperCase()}
            </Badge>
            <code className='text-lg font-mono flex-1 break-all'>{generatedUuid}</code>
            <Button variant='outline' size='sm' onClick={() => copyToClipboard(generatedUuid, setCopied)}>
              {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
