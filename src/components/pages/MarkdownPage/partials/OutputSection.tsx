import React from 'react';

import { CopyButton } from '@/components/molecules/CopyButton';

export type Props = {
  value: string;
  label: string;
  onCopy: () => void;
  copied: boolean;
};

export const OutputSection: React.FC<Props> = ({ value, label, onCopy, copied }) => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <label className='text-sm font-medium text-foreground'>{label}</label>
        <CopyButton value={value} onCopy={onCopy} copied={copied} />
      </div>
      <textarea
        value={value}
        readOnly
        className='w-full h-96 px-3 py-2 border rounded-lg resize-none font-mono text-sm bg-muted/50'
      />
    </div>
  );
};
