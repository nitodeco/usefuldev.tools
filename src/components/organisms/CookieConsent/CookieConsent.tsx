'use client';

import * as React from 'react';

import { Cookie } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useCookieConsent } from '@/components/providers/CookieProvider';

import { CookieConsentState } from '@/lib/cookies';
import { cn } from '@/lib/utils';

interface CookieConsentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'small' | 'mini';
  demo?: boolean;
}

const CookieConsent = React.forwardRef<HTMLDivElement, CookieConsentProps>(
  ({ variant = 'default', demo = false, className, ...props }, ref) => {
    const t = useTranslations('cookieConsent');
    const { updateConsent, showConsentDialog } = useCookieConsent();
    const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);

    const isVisible = demo || showConsentDialog;

    const handleAccept = React.useCallback(() => {
      const newConsent: CookieConsentState = {
        status: 'accepted',
        necessary: true,
        preferences: true,
        analytics: true,
        timestamp: Date.now(),
      };

      updateConsent(newConsent);

      setIsAnimatingOut(true);
    }, [updateConsent]);

    const handleDecline = React.useCallback(() => {
      const newConsent: CookieConsentState = {
        status: 'declined',
        necessary: true,
        preferences: false,
        analytics: false,
        timestamp: Date.now(),
      };

      updateConsent(newConsent);

      setIsAnimatingOut(true);
    }, [updateConsent]);

    const handleAcceptNecessaryOnly = React.useCallback(() => {
      const newConsent: CookieConsentState = {
        status: 'accepted',
        necessary: true,
        preferences: false,
        analytics: false,
        timestamp: Date.now(),
      };

      updateConsent(newConsent);

      setIsAnimatingOut(true);
    }, [updateConsent]);

    if (!isVisible) return null;

    const containerClasses = cn(
      'fixed z-50 transition-all duration-700',
      isAnimatingOut ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100',
      className,
    );

    const commonWrapperProps = {
      ref,
      className: cn(
        containerClasses,
        variant === 'mini'
          ? 'left-0 right-0 sm:left-4 bottom-4 w-full sm:max-w-3xl'
          : 'bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md',
      ),
      ...props,
    };

    if (variant === 'default') {
      return (
        <div {...commonWrapperProps}>
          <Card className='m-3 shadow-lg border-2'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-lg'>{t('title')}</CardTitle>
              <Cookie className='h-5 w-5' />
            </CardHeader>
            <CardContent className='space-y-3'>
              <CardDescription className='text-sm'>{t('description')}</CardDescription>
              <p className='text-xs text-muted-foreground'>{t('byAccepting')}</p>
              <button
                type='button'
                onClick={() => window.open('/privacy-policy', '_blank')}
                className='text-xs text-primary underline underline-offset-4 hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded'
                aria-label={t('learnMore')}
              >
                {t('learnMore')}
              </button>
            </CardContent>
            <CardFooter className='flex gap-2 pt-2'>
              <Button
                onClick={handleAcceptNecessaryOnly}
                variant='outline'
                className='flex-1'
                aria-label={t('acceptNecessary')}
              >
                {t('acceptNecessary')}
              </Button>
              <Button onClick={handleAccept} className='flex-1' aria-label={t('acceptAll')}>
                {t('acceptAll')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    if (variant === 'small') {
      return (
        <div {...commonWrapperProps}>
          <Card className='m-3 shadow-lg border-2'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-base'>{t('title')}</CardTitle>
              <Cookie className='h-4 w-4' />
            </CardHeader>
            <CardContent className='pt-0 pb-2'>
              <CardDescription className='text-sm'>{t('descriptionShort')}</CardDescription>
            </CardContent>
            <CardFooter className='flex gap-2 pt-2'>
              <Button
                onClick={handleDecline}
                variant='outline'
                size='sm'
                className='flex-1 rounded-full'
                aria-label={t('decline')}
              >
                {t('decline')}
              </Button>
              <Button onClick={handleAccept} size='sm' className='flex-1 rounded-full' aria-label={t('accept')}>
                {t('accept')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    if (variant === 'mini') {
      return (
        <div {...commonWrapperProps}>
          <Card className='mx-3 p-0 py-3 shadow-lg border-2'>
            <CardContent className='sm:flex grid gap-4 p-0 px-3.5'>
              <CardDescription className='text-xs sm:text-sm flex-1'>{t('descriptionShort')}</CardDescription>
              <div className='flex items-center gap-2 justify-end sm:gap-3'>
                <Button
                  onClick={handleDecline}
                  size='sm'
                  variant='outline'
                  className='text-xs h-7'
                  aria-label={t('decline')}
                >
                  {t('decline')}
                </Button>
                <Button onClick={handleAccept} size='sm' className='text-xs h-7' aria-label={t('accept')}>
                  {t('accept')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return null;
  },
);

CookieConsent.displayName = 'CookieConsent';
export { CookieConsent };
export default CookieConsent;
