import React from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

interface OutputSectionProps {
  value: string;
  label: string;
  onCopy: () => void;
  copied: boolean;
}

export const OutputSection: React.FC<OutputSectionProps> = ({
  value,
  label,
  onCopy,
  copied,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          disabled={!value}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <textarea
        value={value}
        readOnly
        className="w-full h-96 px-3 py-2 border rounded-lg resize-none font-mono text-sm bg-muted/50"
      />
    </div>
  );
};