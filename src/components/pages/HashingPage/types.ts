export type HashAlgorithm = 'md5' | 'sha256' | 'sha512' | 'bcrypt' | 'xxhash';

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
  time?: number;
}
