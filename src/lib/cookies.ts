export type CookieConsentStatus = 'pending' | 'accepted' | 'declined';

export interface CookieConsentState {
  status: CookieConsentStatus;
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  timestamp: number;
}

const COOKIE_NAME = 'cookie-consent';
const COOKIE_EXPIRY_DAYS = 365;

export const getDefaultConsentState = (): CookieConsentState => ({
  status: 'pending',
  necessary: true,
  preferences: false,
  analytics: false,
  timestamp: Date.now(),
});

export const saveCookieConsent = (consent: CookieConsentState): void => {
  if (typeof document === 'undefined') return;

  const expiryDate = new Date();

  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);

  const cookieValue = JSON.stringify(consent);

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(cookieValue)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
};

export const getCookieConsent = (): CookieConsentState | null => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const consentCookie = cookies.find((cookie) => cookie.trim().startsWith(`${COOKIE_NAME}=`));

  if (!consentCookie) return null;

  try {
    const value = consentCookie.split('=')[1];

    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
};

export const clearCookieConsent = (): void => {
  if (typeof document === 'undefined') return;

  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
};

export const hasValidConsent = (consent: CookieConsentState | null): boolean => {
  if (!consent) return false;

  const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1_000;

  return consent.timestamp > oneYearAgo && consent.status !== 'pending';
};

export const canUseCookies = (
  consent: CookieConsentState | null,
  type: 'necessary' | 'preferences' | 'analytics',
): boolean => {
  if (!consent || consent.status === 'pending') return type === 'necessary';
  if (consent.status === 'declined') return type === 'necessary';

  return consent[type] === true;
};

export const updatePostHogConsent = (consent: CookieConsentState): void => {
  if (typeof window === 'undefined') return;

  const canUseAnalytics = canUseCookies(consent, 'analytics');

  if (window.posthog) {
    if (canUseAnalytics) {
      window.posthog.opt_in_capturing();
      window.posthog.set_config({
        persistence: 'localStorage+cookie',
        disable_session_recording: false,
      });
    } else {
      window.posthog.opt_out_capturing();
      window.posthog.reset();
      window.posthog.set_config({
        persistence: 'memory',
        disable_session_recording: true,
      });
    }
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, unknown>): void => {
  if (typeof window === 'undefined') return;

  const consent = getCookieConsent();
  const canTrack = consent && canUseCookies(consent, 'analytics');

  if (canTrack && window.posthog) {
    window.posthog.capture(eventName, properties);
  }
};

declare global {
  interface Window {
    posthog?: {
      opt_in_capturing: () => void;
      opt_out_capturing: () => void;
      reset: () => void;
      set_config: (config: Record<string, unknown>) => void;
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}
