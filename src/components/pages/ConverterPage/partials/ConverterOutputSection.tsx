import React, { useState } from 'react';

import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/atoms/Button';

import { copyToClipboard } from '@/lib/copy';

import { ConversionResult } from '../types';

interface ConverterOutputSectionProps {
  result: ConversionResult | null;
}

interface ResultItemProps {
  label: string;
  value: string;
  format: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ label, value, format }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {format}
          </Badge>
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <code className="text-lg font-mono break-all">{value}</code>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => copyToClipboard(value, setCopied)}
        className="ml-4"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export const ConverterOutputSection: React.FC<ConverterOutputSectionProps> = ({ result }) => {
  const t = useTranslations('converter');

  if (!result) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('outputLabel')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ResultItem
          label={t('binaryLabel')}
          value={result.binary}
          format="Base 2"
        />
        <ResultItem
          label={t('decimalLabel')}
          value={result.decimal}
          format="Base 10"
        />
        <ResultItem
          label={t('hexadecimalLabel')}
          value={result.hexadecimal}
          format="Base 16"
        />
      </CardContent>
    </Card>
  );
};