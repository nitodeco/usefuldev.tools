import { describe, expect, it } from 'vitest';

import { decodeUrl, decodeUrlSpecialChars, encodeUrl, encodeUrlSpecialChars } from './url-encoder';

describe('URL Encoder/Decoder', () => {
  describe('encodeUrl', () => {
    it('should encode special characters', () => {
      expect(encodeUrl('hello world')).toBe('hello%20world');
      expect(encodeUrl('test@example.com')).toBe('test%40example.com');
      expect(encodeUrl('name=value&other=test')).toBe('name%3Dvalue%26other%3Dtest');
    });

    it('should encode non-ASCII characters', () => {
      expect(encodeUrl('café')).toBe('caf%C3%A9');
      expect(encodeUrl('こんにちは')).toBe('%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF');
    });

    it('should handle empty input', () => {
      expect(encodeUrl('')).toBe('');
    });

    it('should not encode safe characters', () => {
      expect(encodeUrl('abc123')).toBe('abc123');
      expect(encodeUrl('ABC_xyz-123')).toBe('ABC_xyz-123');
    });

    it('should encode URL reserved characters', () => {
      expect(encodeUrl('https://example.com/path?query=value')).toBe(
        'https%3A%2F%2Fexample.com%2Fpath%3Fquery%3Dvalue',
      );
    });
  });

  describe('decodeUrl', () => {
    it('should decode encoded characters', () => {
      expect(decodeUrl('hello%20world')).toBe('hello world');
      expect(decodeUrl('test%40example.com')).toBe('test@example.com');
      expect(decodeUrl('name%3Dvalue%26other%3Dtest')).toBe('name=value&other=test');
    });

    it('should decode non-ASCII characters', () => {
      expect(decodeUrl('caf%C3%A9')).toBe('café');
      expect(decodeUrl('%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF')).toBe('こんにちは');
    });

    it('should handle empty input', () => {
      expect(decodeUrl('')).toBe('');
    });

    it('should handle non-encoded strings', () => {
      expect(decodeUrl('abc123')).toBe('abc123');
      expect(decodeUrl('ABC_xyz-123')).toBe('ABC_xyz-123');
    });

    it('should throw error for invalid encoded sequences', () => {
      expect(() => decodeUrl('%ZZ')).toThrow('Failed to decode URL');
      expect(() => decodeUrl('%')).toThrow('Failed to decode URL');
    });
  });

  describe('encodeUrlSpecialChars', () => {
    it('should preserve URL structure', () => {
      expect(encodeUrlSpecialChars('https://example.com/path?query=value')).toBe(
        'https://example.com/path?query=value',
      );
    });

    it('should encode spaces and special characters', () => {
      expect(encodeUrlSpecialChars('hello world')).toBe('hello%20world');
      expect(encodeUrlSpecialChars('path with spaces/file.txt')).toBe('path%20with%20spaces/file.txt');
    });

    it('should encode non-ASCII characters', () => {
      expect(encodeUrlSpecialChars('café')).toBe('caf%C3%A9');
      expect(encodeUrlSpecialChars('https://example.com/café')).toBe('https://example.com/caf%C3%A9');
    });

    it('should handle empty input', () => {
      expect(encodeUrlSpecialChars('')).toBe('');
    });

    it('should not encode URL reserved characters', () => {
      expect(encodeUrlSpecialChars('?key=value&other=test')).toBe('?key=value&other=test');
      expect(encodeUrlSpecialChars('#section')).toBe('#section');
    });
  });

  describe('decodeUrlSpecialChars', () => {
    it('should decode encoded spaces and characters', () => {
      expect(decodeUrlSpecialChars('hello%20world')).toBe('hello world');
      expect(decodeUrlSpecialChars('path%20with%20spaces/file.txt')).toBe('path with spaces/file.txt');
    });

    it('should decode non-ASCII characters', () => {
      expect(decodeUrlSpecialChars('caf%C3%A9')).toBe('café');
      expect(decodeUrlSpecialChars('https://example.com/caf%C3%A9')).toBe('https://example.com/café');
    });

    it('should handle empty input', () => {
      expect(decodeUrlSpecialChars('')).toBe('');
    });

    it('should handle URLs with query parameters', () => {
      expect(decodeUrlSpecialChars('https://example.com/path?query=hello%20world')).toBe(
        'https://example.com/path?query=hello world',
      );
    });

    it('should throw error for invalid encoded sequences', () => {
      expect(() => decodeUrlSpecialChars('%ZZ')).toThrow('Failed to decode URL special characters');
    });
  });
});
