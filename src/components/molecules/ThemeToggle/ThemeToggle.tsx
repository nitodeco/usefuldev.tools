'use client';

import React from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useTheme } from 'next-themes';

import { Switch } from '@/components/atoms/Switch';

import { Theme } from '@/types/theme';

export const ThemeToggle: React.FC = () => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const t = useTranslations('themeToggle');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const isDark = resolvedTheme === Theme.DARK;

  if (!mounted) {
    return (
      <div className='flex items-center gap-2 opacity-50'>
        <Sun className='h-[1.2rem] w-[1.2rem]' />
        <Switch disabled aria-label='Loading theme toggle' />
        <Moon className='h-[1.2rem] w-[1.2rem]' />
      </div>
    );
  }

  return (
    <div className='flex items-center gap-2 group'>
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-200 group-data-[collapsible=icon]:hidden ${
          isDark ? 'text-muted-foreground scale-90 opacity-50' : 'text-foreground scale-100 opacity-100'
        }`}
        aria-hidden='true'
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label={t('toggleTheme')}
        className='focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-200 group-data-[collapsible=icon]:hidden ${
          isDark ? 'text-foreground scale-100 opacity-100' : 'text-muted-foreground scale-90 opacity-50'
        }`}
        aria-hidden='true'
      />
    </div>
  );
};
