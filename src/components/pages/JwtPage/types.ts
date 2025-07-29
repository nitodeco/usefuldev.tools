export type JwtMode = 'decode' | 'encode';

export type Algorithm = 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512';

export interface JwtHeader {
  alg: string;
  typ: string;
  [key: string]: unknown;
}

export interface JwtPayload {
  [key: string]: unknown;
  sub?: string;
  name?: string;
  iat?: number;
  exp?: number;
}

export interface DecodedJwt {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
}

export interface JwtValidationResult {
  isValid: boolean;
  error?: string;
  decoded?: DecodedJwt;
  signatureVerified?: boolean;
}

export interface JwtEncodingResult {
  token?: string;
  error?: string;
}