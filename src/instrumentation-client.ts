import posthog from 'posthog-js';

import { canUseCookies, getCookieConsent } from '@/lib/cookies';

const existingConsent = getCookieConsent();
const hasAnalyticsConsent = existingConsent ? canUseCookies(existingConsent, 'analytics') : false;

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: '/ingest',
  ui_host: 'https://eu.posthog.com',
  defaults: '2025-05-24',
  capture_exceptions: hasAnalyticsConsent,
  opt_out_capturing_by_default: !hasAnalyticsConsent,
  persistence: hasAnalyticsConsent ? 'localStorage+cookie' : 'memory',
  disable_session_recording: !hasAnalyticsConsent,
  respect_dnt: true,
  secure_cookie: true,
  // debug: process.env.NODE_ENV === 'development',
});

if (typeof window !== 'undefined') {
  window.posthog = posthog;
}
