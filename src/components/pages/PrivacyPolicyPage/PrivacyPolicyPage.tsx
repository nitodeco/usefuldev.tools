'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

export const PrivacyPolicyPage: React.FC = () => {
  const t = useTranslations('privacy');

  return (
    <div className='container mx-auto max-w-4xl py-8 px-4'>
      <div className='space-y-12'>
        <div className='space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>{t('title')}</h1>
          <p className='text-xl text-muted-foreground'>{t('subtitle')}</p>
          <p className='text-sm text-muted-foreground'>{t('lastUpdated', { date: '2025-07-29' })}</p>
        </div>

        <div className='space-y-10'>
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('dataController.title')}</h2>
            <div className='space-y-3'>
              <p className='text-muted-foreground leading-relaxed'>
                <strong>{t('dataController.name')}</strong>
              </p>
              <p className='text-muted-foreground leading-relaxed'>{t('dataController.address')}</p>
              <p className='text-muted-foreground leading-relaxed mt-4'>{t('dataController.contact')}</p>
            </div>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.overview.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.overview.content')}</p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.legalBasis.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.legalBasis.content')}</p>
            <ul className='space-y-2 ml-6'>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.legalBasis.items.consent')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.legalBasis.items.legitimateInterests')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.legalBasis.items.technicalNecessity')}
              </li>
            </ul>
          </section>

          <section className='space-y-6'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.dataCollected.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.dataCollected.intro')}</p>

            <div className='space-y-6 ml-4'>
              <div className='space-y-3'>
                <h3 className='text-lg font-medium text-green-600 dark:text-green-400'>
                  {t('sections.dataCollected.technical.title')}
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {t('sections.dataCollected.technical.description')}
                </p>
                <ul className='space-y-2 ml-6'>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('sections.dataCollected.technical.items.cookies')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('sections.dataCollected.technical.items.localStorage')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('sections.dataCollected.technical.items.clientSide')}
                  </li>
                </ul>
              </div>

              <div className='space-y-3'>
                <h3 className='text-lg font-medium text-blue-600 dark:text-blue-400'>
                  {t('sections.dataCollected.analytics.title')}
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {t('sections.dataCollected.analytics.description')}
                </p>
                <ul className='space-y-2 ml-6'>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('sections.dataCollected.analytics.items.pageViews')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('sections.dataCollected.analytics.items.interactions')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('sections.dataCollected.analytics.items.browserInfo')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('sections.dataCollected.analytics.items.geolocation')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('sections.dataCollected.analytics.items.referrer')}
                  </li>
                </ul>
                <div className='bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500'>
                  <p className='text-sm text-blue-700 dark:text-blue-300'>
                    {t('sections.dataCollected.analytics.anonymization')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.dataUsage.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.dataUsage.content')}</p>
            <ul className='space-y-2 ml-6'>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.dataUsage.items.functionality')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.dataUsage.items.improvement')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.dataUsage.items.performance')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.dataUsage.items.development')}
              </li>
            </ul>
          </section>

          <section className='space-y-6'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.dataSharing.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.dataSharing.content')}</p>

            <div className='bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border'>
              <div className='space-y-3'>
                <h3 className='text-lg font-medium'>{t('sections.dataSharing.postHog.title')}</h3>
                <p className='text-muted-foreground leading-relaxed'>{t('sections.dataSharing.postHog.description')}</p>
                <ul className='space-y-2 ml-6'>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    <strong>Location:</strong> {t('sections.dataSharing.postHog.location')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    <strong>Purpose:</strong> {t('sections.dataSharing.postHog.purpose')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    <strong>Data Types:</strong> {t('sections.dataSharing.postHog.dataTypes')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    <strong>Privacy:</strong> {t('sections.dataSharing.postHog.privacy')}
                  </li>
                </ul>
              </div>
            </div>

            <p className='text-muted-foreground leading-relaxed font-medium'>
              {t('sections.dataSharing.noOtherSharing')}
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.dataRetention.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.dataRetention.content')}</p>
            <ul className='space-y-2 ml-6'>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.dataRetention.items.essential')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.dataRetention.items.analytics')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.dataRetention.items.localStorage')}
              </li>
            </ul>
          </section>

          <section className='space-y-6'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.cookies.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.cookies.description')}</p>

            <div className='space-y-6 ml-4'>
              <div className='space-y-3'>
                <h3 className='text-lg font-medium text-green-600 dark:text-green-400'>
                  {t('cookieTypes.necessary.title')}
                </h3>
                <p className='text-muted-foreground leading-relaxed'>{t('cookieTypes.necessary.description')}</p>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <p>
                    <strong>Purpose:</strong> {t('cookieTypes.necessary.purpose')}
                  </p>
                  <p>
                    <strong>Retention:</strong> {t('cookieTypes.necessary.retention')}
                  </p>
                </div>
                <ul className='space-y-2 ml-6'>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('cookieTypes.necessary.examples.theme')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('cookieTypes.necessary.examples.sidebar')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('cookieTypes.necessary.examples.consent')}
                  </li>
                </ul>
              </div>

              <div className='space-y-3'>
                <h3 className='text-lg font-medium text-yellow-600 dark:text-yellow-400'>
                  {t('cookieTypes.preferences.title')}
                </h3>
                <p className='text-muted-foreground leading-relaxed'>{t('cookieTypes.preferences.description')}</p>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <p>
                    <strong>Purpose:</strong> {t('cookieTypes.preferences.purpose')}
                  </p>
                  <p>
                    <strong>Retention:</strong> {t('cookieTypes.preferences.retention')}
                  </p>
                </div>
                <ul className='space-y-2 ml-6'>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('cookieTypes.preferences.examples.language')}
                  </li>
                  <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                    {t('cookieTypes.preferences.examples.settings')}
                  </li>
                </ul>
              </div>

              <div className='space-y-3'>
                <h3 className='text-lg font-medium text-blue-600 dark:text-blue-400'>
                  {t('cookieTypes.analytics.title')}
                </h3>
                <p className='text-muted-foreground leading-relaxed'>{t('cookieTypes.analytics.description')}</p>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <p>
                    <strong>Purpose:</strong> {t('cookieTypes.analytics.purpose')}
                  </p>
                  <p>
                    <strong>Provider:</strong> {t('cookieTypes.analytics.provider')}
                  </p>
                  <p>
                    <strong>Retention:</strong> {t('cookieTypes.analytics.retention')}
                  </p>
                  <p>
                    <strong>Data Types:</strong> {t('cookieTypes.analytics.dataTypes')}
                  </p>
                </div>
                <div className='bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500'>
                  <p className='text-sm text-blue-700 dark:text-blue-300'>{t('cookieTypes.analytics.note')}</p>
                </div>
              </div>
            </div>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.rights.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.rights.content')}</p>
            <ul className='space-y-2 ml-6'>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.rights.items.access')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.rights.items.rectification')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.rights.items.erasure')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.rights.items.restriction')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.rights.items.portability')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.rights.items.objection')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.rights.items.withdraw')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.rights.items.complaint')}
              </li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-4'>{t('sections.rights.exercise')}</p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.management.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.management.content')}</p>
            <ul className='space-y-2 ml-6'>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.management.items.cookies')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.management.items.browser')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.management.items.optOut')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.management.items.tools')}
              </li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.changes.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.changes.content')}</p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.contact.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.contact.content')}</p>
            <ul className='space-y-2 ml-6'>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.contact.methods.github')}
              </li>
              <li className='text-muted-foreground relative before:content-["•"] before:absolute before:-left-4 before:text-primary'>
                {t('sections.contact.methods.email')}
              </li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-4'>{t('sections.contact.response')}</p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold tracking-tight border-b pb-2'>{t('sections.supervisory.title')}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t('sections.supervisory.content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
