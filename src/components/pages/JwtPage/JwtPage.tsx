'use client';

import React, { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import posthog from 'posthog-js';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { JwtDecodedDisplay } from './partials/JwtDecodedDisplay';
import { JwtEncoderSection } from './partials/JwtEncoderSection';
import { JwtInputSection } from './partials/JwtInputSection';
import { JwtSecretSection } from './partials/JwtSecretSection';
import { useJwtValidation } from './partials/useJwtValidation';

export const JwtPage: React.FC = () => {
  const t = useTranslations('jwt');
  const {
    jwtToken,
    setJwtToken,
    secret,
    setSecret,
    payload,
    setPayload,
    algorithm,
    setAlgorithm,
    validationResult,
    encodeJwt,
  } = useJwtValidation();

  useEffect(() => {
    if (validationResult.isValid && jwtToken) {
      posthog.capture('jwt_decoded', {
        algorithm,
        has_secret: !!secret,
        signature_verified: validationResult.signatureVerified,
      });
    }
  }, [validationResult.isValid, jwtToken, algorithm, secret, validationResult.signatureVerified]);

  const handleEncode = async () => {
    const result = await encodeJwt();
    if (result.token) {
      posthog.capture('jwt_encoded', {
        algorithm,
        payload_size: payload.length,
      });
    }
    return result;
  };

  return (
    <div className='container mx-auto p-6 max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>

      <Tabs defaultValue='decode' className='w-full'>
        <TabsList className='grid w-full max-w-[400px] grid-cols-2'>
          <TabsTrigger value='decode'>{t('decode')}</TabsTrigger>
          <TabsTrigger value='encode'>{t('encode')}</TabsTrigger>
        </TabsList>

        <TabsContent value='decode' className='space-y-6'>
          <JwtInputSection
            jwtToken={jwtToken}
            onTokenChange={setJwtToken}
            isValid={validationResult.isValid}
            error={validationResult.error}
            signatureVerified={validationResult.signatureVerified}
          />

          <JwtSecretSection
            secret={secret}
            onSecretChange={setSecret}
            algorithm={algorithm}
            onAlgorithmChange={setAlgorithm}
          />

          <JwtDecodedDisplay decoded={validationResult.decoded} />
        </TabsContent>

        <TabsContent value='encode' className='space-y-6'>
          <JwtSecretSection
            secret={secret}
            onSecretChange={setSecret}
            algorithm={algorithm}
            onAlgorithmChange={setAlgorithm}
          />

          <JwtEncoderSection
            payload={payload}
            onPayloadChange={setPayload}
            onEncode={handleEncode}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};