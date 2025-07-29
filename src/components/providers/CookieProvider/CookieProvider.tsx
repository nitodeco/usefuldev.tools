'use client';

import * as React from 'react';

import {
  CookieConsentState,
  canUseCookies,
  getCookieConsent,
  getDefaultConsentState,
  hasValidConsent,
  saveCookieConsent,
  updatePostHogConsent,
} from '@/lib/cookies';

interface CookieContextValue {
  consent: CookieConsentState;
  updateConsent: (newConsent: CookieConsentState) => void;
  canUseCookies: (type: 'necessary' | 'preferences' | 'analytics') => boolean;
  showConsentDialog: boolean;
  hasValidConsent: boolean;
}

const CookieContext = React.createContext<CookieContextValue | undefined>(undefined);

export const useCookieConsent = (): CookieContextValue => {
  const context = React.useContext(CookieContext);

  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }

  return context;
};

interface CookieProviderProps {
  children: React.ReactNode;
}

export const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const [consent, setConsent] = React.useState<CookieConsentState>(getDefaultConsentState);
  const [showConsentDialog, setShowConsentDialog] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const updateConsent = React.useCallback((newConsent: CookieConsentState) => {
    setConsent(newConsent);
    saveCookieConsent(newConsent);
    updatePostHogConsent(newConsent);
    setShowConsentDialog(false);
  }, []);

  const checkCanUseCookies = React.useCallback(
    (type: 'necessary' | 'preferences' | 'analytics') => {
      return canUseCookies(consent, type);
    },
    [consent],
  );

  React.useEffect(() => {
    const existingConsent = getCookieConsent();

    if (existingConsent && hasValidConsent(existingConsent)) {
      setConsent(existingConsent);
      updatePostHogConsent(existingConsent);
      setShowConsentDialog(false);
    } else {
      setShowConsentDialog(true);
    }

    setIsInitialized(true);
  }, []);

  const contextValue: CookieContextValue = React.useMemo(
    () => ({
      consent,
      updateConsent,
      canUseCookies: checkCanUseCookies,
      showConsentDialog,
      hasValidConsent: hasValidConsent(consent),
    }),
    [consent, updateConsent, checkCanUseCookies, showConsentDialog],
  );

  if (!isInitialized) {
    return null;
  }

  return <CookieContext.Provider value={contextValue}>{children}</CookieContext.Provider>;
};
