'use client';

import * as React from 'react';

import { ThemeProvider } from 'next-themes';

import { CookieProvider } from '../CookieProvider';

export const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <CookieProvider>{children}</CookieProvider>
    </ThemeProvider>
  );
};
