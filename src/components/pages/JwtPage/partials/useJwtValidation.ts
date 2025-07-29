import { useCallback, useEffect, useState } from 'react';

import { Algorithm, DecodedJwt, JwtEncodingResult, JwtValidationResult } from '../types';

export const useJwtValidation = () => {
  const [jwtToken, setJwtToken] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [payload, setPayload] = useState<string>(`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": ${Math.floor(Date.now() / 1000)},
  "exp": ${Math.floor(Date.now() / 1000) + 3600}
}`);
  const [algorithm, setAlgorithm] = useState<Algorithm>('HS256');
  const [validationResult, setValidationResult] = useState<JwtValidationResult>({ isValid: false });
  const [encodingResult, setEncodingResult] = useState<JwtEncodingResult>({});

  const decodeJwt = useCallback((token: string): JwtValidationResult => {
    if (!token) {
      return { isValid: false };
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return { isValid: false, error: 'Invalid JWT format' };
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      const signature = parts[2];

      const result: DecodedJwt = {
        header,
        payload,
        signature,
      };

      return {
        isValid: true,
        decoded: result,
        signatureVerified: undefined,
      };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Invalid JWT',
      };
    }
  }, []);

  const verifySignature = useCallback(async (token: string, secret: string, algorithm: Algorithm): Promise<boolean> => {
    try {
      const jwt = await import('jsonwebtoken');
      jwt.verify(token, secret, { algorithms: [algorithm] });
      return true;
    } catch {
      return false;
    }
  }, []);

  const encodeJwt = useCallback(async (): Promise<JwtEncodingResult> => {
    if (!payload || !secret) {
      return { error: 'Payload and secret are required' };
    }

    try {
      const parsedPayload = JSON.parse(payload);
      const jwt = await import('jsonwebtoken');
      const token = jwt.sign(parsedPayload, secret, { algorithm });
      return { token };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { error: 'Invalid JSON payload' };
      }
      return { error: error instanceof Error ? error.message : 'Failed to encode JWT' };
    }
  }, [payload, secret, algorithm]);

  useEffect(() => {
    const validateJwt = async () => {
      if (jwtToken) {
        const decodedResult = decodeJwt(jwtToken);
        if (decodedResult.isValid && secret) {
          const isVerified = await verifySignature(jwtToken, secret, algorithm);
          setValidationResult({
            ...decodedResult,
            signatureVerified: isVerified,
          });
        } else {
          setValidationResult(decodedResult);
        }
      } else {
        setValidationResult({ isValid: false });
      }
    };

    validateJwt();
  }, [jwtToken, secret, algorithm, decodeJwt, verifySignature]);

  return {
    jwtToken,
    setJwtToken,
    secret,
    setSecret,
    payload,
    setPayload,
    algorithm,
    setAlgorithm,
    validationResult,
    encodingResult,
    encodeJwt,
    setEncodingResult,
  };
};