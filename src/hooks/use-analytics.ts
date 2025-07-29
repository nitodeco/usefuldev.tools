import { useCallback } from 'react';

import { useCookieConsent } from '@/components/providers/CookieProvider';

import { trackEvent } from '@/lib/cookies';

export interface AnalyticsHook {
  track: (eventName: string, properties?: Record<string, unknown>) => void;
  canTrack: boolean;
}

export const useAnalytics = (): AnalyticsHook => {
  const { canUseCookies } = useCookieConsent();

  const canTrack = canUseCookies('analytics');

  const track = useCallback(
    (eventName: string, properties?: Record<string, unknown>) => {
      if (canTrack) {
        trackEvent(eventName, properties);
      }
    },
    [canTrack],
  );

  return {
    track,
    canTrack,
  };
};
