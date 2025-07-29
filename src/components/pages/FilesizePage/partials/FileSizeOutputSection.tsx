import React from 'react';

import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { Button } from '@/components/atoms/Button';

import { copyToClipboard } from '@/lib/copy';
import { isBinaryUnit } from '@/lib/filesize';

import type { ConversionResult, FileSizeUnit } from '../types';

interface FileSizeOutputSectionProps {
  result: ConversionResult | null;
  getAllConversions: () => ConversionResult[];
}

export const FileSizeOutputSection: React.FC<FileSizeOutputSectionProps> = ({
  result,
  getAllConversions,
}) => {
  const t = useTranslations('filesize');
  const [copiedUnit, setCopiedUnit] = React.useState<FileSizeUnit | null>(null);

  const handleCopy = (value: string, unit: FileSizeUnit) => {
    copyToClipboard(value, () => {
      setCopiedUnit(unit);
      setTimeout(() => setCopiedUnit(null), 2000);
    });
  };

  const allConversions = getAllConversions();
  const decimalConversions = allConversions.filter(c => c.unit === 'B' || !isBinaryUnit(c.unit));
  const binaryConversions = allConversions.filter(c => c.unit !== 'B' && isBinaryUnit(c.unit));

  return (
    <div className="space-y-6">
      {result && (
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t('result')}</h3>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                {result.unit}
              </Badge>
              <code className="text-2xl font-mono flex-1">
                {result.formatted} {result.unit}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(result.formatted, result.unit)}
              >
                {copiedUnit === result.unit ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('allConversions')}</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              {t('decimalUnits')}
            </h4>
            <div className="space-y-2">
              {decimalConversions.map((conversion) => (
                <div
                  key={conversion.unit}
                  className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors ${
                    conversion.unit === result?.unit ? 'bg-muted' : ''
                  }`}
                >
                  <Badge variant="outline" className="text-xs w-12 justify-center">
                    {conversion.unit}
                  </Badge>
                  <code className="text-sm font-mono flex-1">
                    {conversion.formatted}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => handleCopy(conversion.formatted, conversion.unit)}
                  >
                    {copiedUnit === conversion.unit ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              {t('binaryUnits')}
            </h4>
            <div className="space-y-2">
              {binaryConversions.map((conversion) => (
                <div
                  key={conversion.unit}
                  className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors ${
                    conversion.unit === result?.unit ? 'bg-muted' : ''
                  }`}
                >
                  <Badge variant="outline" className="text-xs w-12 justify-center">
                    {conversion.unit}
                  </Badge>
                  <code className="text-sm font-mono flex-1">
                    {conversion.formatted}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => handleCopy(conversion.formatted, conversion.unit)}
                  >
                    {copiedUnit === conversion.unit ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};