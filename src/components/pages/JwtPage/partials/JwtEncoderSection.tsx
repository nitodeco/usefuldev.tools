import React, { useState } from 'react';

import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/atoms/Button';

import { copyToClipboard } from '@/lib/copy';

import { JwtEncodingResult } from '../types';

interface JwtEncoderSectionProps {
  payload: string;
  onPayloadChange: (payload: string) => void;
  onEncode: () => Promise<JwtEncodingResult>;
}

export const JwtEncoderSection: React.FC<JwtEncoderSectionProps> = ({ payload, onPayloadChange, onEncode }) => {
  const t = useTranslations('jwt');
  const [encodedToken, setEncodedToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleEncode = async () => {
    const result = await onEncode();
    if (result.error) {
      setError(result.error);
      setEncodedToken('');
    } else if (result.token) {
      setEncodedToken(result.token);
      setError('');
    }
  };

  const handleCopy = () => {
    if (encodedToken) {
      copyToClipboard(encodedToken, setCopied);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>{t('payload')}</label>
          <Textarea
            placeholder={t('payloadPlaceholder')}
            value={payload}
            onChange={(e) => onPayloadChange(e.target.value)}
            className='font-mono text-sm min-h-[200px]'
          />
          {error && <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>}
        </div>

        <Button onClick={handleEncode} className='w-full sm:w-auto'>
          {t('generateToken')}
        </Button>
      </div>

      {encodedToken && (
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium'>{t('jwtToken')}</h3>
            <Button variant='outline' size='sm' onClick={handleCopy}>
              {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
            </Button>
          </div>
          <Textarea
            value={encodedToken}
            readOnly
            className='font-mono text-sm min-h-[120px] bg-muted'
          />
        </div>
      )}
    </div>
  );
};