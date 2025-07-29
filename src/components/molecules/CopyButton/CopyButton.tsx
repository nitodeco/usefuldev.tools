import { Check, Copy } from 'lucide-react';

import { Button } from '@/components/atoms/Button';

export type Props = {
  value: string;
  onCopy: () => void;
  copied: boolean;
};

export const CopyButton: React.FC<Props> = ({ value, onCopy, copied }) => {
  return (
    <Button variant='outline' size='sm' onClick={onCopy} disabled={!value}>
      {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
    </Button>
  );
};
