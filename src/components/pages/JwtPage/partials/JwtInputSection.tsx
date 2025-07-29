import React from 'react';

import { useTranslations } from 'next-intl';

import { Textarea } from '@/components/ui/textarea';

import { JwtValidationBadge } from './JwtValidationBadge';

interface JwtInputSectionProps {
  jwtToken: string;
  onTokenChange: (token: string) => void;
  isValid: boolean;
  error?: string;
  signatureVerified?: boolean;
}

export const JwtInputSection: React.FC<JwtInputSectionProps> = ({
  jwtToken,
  onTokenChange,
  isValid,
  error,
  signatureVerified,
}) => {
  const t = useTranslations('jwt');

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <h2 className='text-xl font-semibold'>{t('jwtToken')}</h2>
        {jwtToken && (
          <JwtValidationBadge isValid={isValid} error={error} signatureVerified={signatureVerified} />
        )}
      </div>

      <Textarea
        placeholder={t('jwtPlaceholder')}
        value={jwtToken}
        onChange={(e) => onTokenChange(e.target.value)}
        className='font-mono text-sm min-h-[120px]'
      />
    </div>
  );
};