import * as React from 'react';

import { type VariantProps } from 'class-variance-authority';

import { Button as ShadButton, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button: React.FC<ButtonProps> = ({ className, variant, size, asChild = false, ...props }) => {
  return (
    <ShadButton
      className={cn('hover:cursor-pointer', className)}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    />
  );
};
