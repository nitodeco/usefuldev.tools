import React from 'react';

import { CopyButton } from '@/components/molecules/CopyButton';

export type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  onCopy: () => void;
  copied: boolean;
};

export const InputSection: React.FC<Props> = ({ value, onChange, placeholder, label, onCopy, copied }) => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <label className='text-sm font-medium text-foreground'>{label}</label>
        <CopyButton value={value} onCopy={onCopy} copied={copied} />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full h-96 px-3 py-2 border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary'
      />
    </div>
  );
};
