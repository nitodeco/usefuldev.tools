export type UuidVersion = 'v1' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7';

export interface UuidResult {
  id: string;
  uuid: string;
  version: UuidVersion;
  timestamp: string;
}
