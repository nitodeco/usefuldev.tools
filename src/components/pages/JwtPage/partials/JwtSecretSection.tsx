import React from 'react';

import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Algorithm } from '../types';

interface JwtSecretSectionProps {
  secret: string;
  onSecretChange: (secret: string) => void;
  algorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
}

export const JwtSecretSection: React.FC<JwtSecretSectionProps> = ({
  secret,
  onSecretChange,
  algorithm,
  onAlgorithmChange,
}) => {
  const t = useTranslations('jwt');

  const algorithms: Algorithm[] = ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'];

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>{t('secret')}</label>
          <Input
            type='text'
            placeholder={t('secretPlaceholder')}
            value={secret}
            onChange={(e) => onSecretChange(e.target.value)}
            className='font-mono'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>{t('algorithm')}</label>
          <Select value={algorithm} onValueChange={(value: Algorithm) => onAlgorithmChange(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((alg) => (
                <SelectItem key={alg} value={alg}>
                  {t(`algorithms.${alg}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};