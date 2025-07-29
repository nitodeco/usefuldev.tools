import React from 'react';

import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/atoms/Button';

import { copyToClipboard } from '@/lib/copy';

import { DecodedJwt } from '../types';

interface JwtDecodedDisplayProps {
  decoded?: DecodedJwt;
}

export const JwtDecodedDisplay: React.FC<JwtDecodedDisplayProps> = ({ decoded }) => {
  const t = useTranslations('jwt');
  const [copiedSection, setCopiedSection] = React.useState<string | null>(null);

  if (!decoded) {
    return null;
  }

  const handleCopy = (content: string, section: string) => {
    copyToClipboard(content, () => setCopiedSection(section));
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const formatJson = (obj: any) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>{t('header')}</CardTitle>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleCopy(formatJson(decoded.header), 'header')}
            className='h-8 w-8 p-0'
          >
            <Copy className='h-3 w-3' />
          </Button>
        </CardHeader>
        <CardContent>
          <pre className='text-xs overflow-auto max-h-48 p-2 bg-muted rounded'>
            {formatJson(decoded.header)}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>{t('payload')}</CardTitle>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleCopy(formatJson(decoded.payload), 'payload')}
            className='h-8 w-8 p-0'
          >
            <Copy className='h-3 w-3' />
          </Button>
        </CardHeader>
        <CardContent>
          <pre className='text-xs overflow-auto max-h-48 p-2 bg-muted rounded'>
            {formatJson(decoded.payload)}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>{t('signature')}</CardTitle>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleCopy(decoded.signature, 'signature')}
            className='h-8 w-8 p-0'
          >
            <Copy className='h-3 w-3' />
          </Button>
        </CardHeader>
        <CardContent>
          <pre className='text-xs overflow-auto max-h-48 p-2 bg-muted rounded break-all'>
            {decoded.signature}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};