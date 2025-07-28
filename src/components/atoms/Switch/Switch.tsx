import * as React from 'react';

import { Switch as ShadcnSwitch } from '@/components/ui/switch';

import { cn } from '@/lib/utils';

type SwitchProps = React.ComponentProps<typeof ShadcnSwitch> & {
  className?: string;
};

export const Switch: React.FC<SwitchProps> = ({ className, ...props }) => {
  return <ShadcnSwitch className={cn('hover:cursor-pointer shadow-sm', className)} {...props} />;
};
