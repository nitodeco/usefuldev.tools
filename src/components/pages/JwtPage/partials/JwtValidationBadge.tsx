import React from 'react';

import { Check, ShieldAlert, ShieldCheck, ShieldX, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';

interface JwtValidationBadgeProps {
  isValid: boolean;
  error?: string;
  signatureVerified?: boolean;
}

export const JwtValidationBadge: React.FC<JwtValidationBadgeProps> = ({ isValid, error, signatureVerified }) => {
  const t = useTranslations('jwt');

  if (!isValid) {
    return (
      <Badge variant='destructive' className='flex items-center gap-1'>
        <X className='h-3 w-3' />
        {error || t('invalidJwt')}
      </Badge>
    );
  }

  if (signatureVerified === true) {
    return (
      <Badge variant='default' className='flex items-center gap-1 bg-green-600'>
        <ShieldCheck className='h-3 w-3' />
        {t('signatureVerified')}
      </Badge>
    );
  }

  if (signatureVerified === false) {
    return (
      <Badge variant='destructive' className='flex items-center gap-1'>
        <ShieldX className='h-3 w-3' />
        {t('signatureInvalid')}
      </Badge>
    );
  }

  return (
    <Badge variant='secondary' className='flex items-center gap-1'>
      <ShieldAlert className='h-3 w-3' />
      {t('validJwt')}
    </Badge>
  );
};