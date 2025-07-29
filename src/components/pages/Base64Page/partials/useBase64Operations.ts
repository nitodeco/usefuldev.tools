'use client';

import { useCallback, useEffect, useState } from 'react';

import posthog from 'posthog-js';

import type { Base64FileInfo, Base64InputType, Base64Mode } from '../types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const useBase64Operations = () => {
  const [mode, setMode] = useState<Base64Mode>('encode');
  const [inputType, setInputType] = useState<Base64InputType>('text');
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [fileInfo, setFileInfo] = useState<Base64FileInfo | undefined>(undefined);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateBase64 = (text: string): boolean => {
    if (!text) return true;

    try {
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

      if (!base64Regex.test(text)) return false;

      const decoded = atob(text);
      const reencoded = btoa(decoded);

      return reencoded === text;
    } catch {
      return false;
    }
  };

  const encodeToBase64 = (text: string): string => {
    if (!text) return '';

    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      console.error('Error encoding to Base64:', error);
      throw new Error('Failed to encode text');
    }
  };

  const decodeFromBase64 = (base64Text: string): string => {
    if (!base64Text) return '';

    try {
      return decodeURIComponent(escape(atob(base64Text)));
    } catch (error) {
      console.error('Error decoding from Base64:', error);
      throw new Error('Invalid Base64 format');
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove data URL prefix if present
          const base64 = reader.result.split(',')[1] || reader.result;

          resolve(base64);
        } else {
          reject(new Error('Failed to read file as Base64'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsDataURL(file);
    });
  };

  const base64ToBlob = (base64: string, mimeType: string = 'application/octet-stream'): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: mimeType });
  };

  const detectMimeType = (base64: string): string => {
    // Try to detect common file types from base64 header
    const signatures: Record<string, string> = {
      '/9j/': 'image/jpeg',
      'iVBORw0KGgo': 'image/png',
      'R0lGOD': 'image/gif',
      'UklGR': 'image/webp',
      'JVBERi0': 'application/pdf',
      'UEsDBB': 'application/zip',
      'UEsDBC': 'application/zip',
    };

    for (const [signature, mimeType] of Object.entries(signatures)) {
      if (base64.startsWith(signature)) {
        return mimeType;
      }
    }

    return 'application/octet-stream';
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        setError('File is too large (max 10MB)');
        setIsValid(false);

        return;
      }

      setIsConverting(true);
      setError(undefined);

      try {
        const base64Result = await fileToBase64(file);

        setFileInfo({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        });

        if (mode === 'encode') {
          setInputText('');
          setOutputText(base64Result);
        } else {
          setInputText(base64Result);
        }

        setIsValid(true);

        posthog.capture('base64_file_uploaded', {
          mode,
          file_type: file.type,
          file_size: file.size,
          file_name_length: file.name.length,
        });
      } catch (uploadError) {
        const errorMessage = uploadError instanceof Error ? uploadError.message : 'Error reading file';

        setError(errorMessage);
        setIsValid(false);
      } finally {
        setIsConverting(false);
      }
    },
    [mode],
  );

  const downloadAsFile = useCallback(() => {
    if (!outputText || !isValid) return;

    try {
      let blob: Blob;
      let filename: string;

      if (mode === 'decode') {
        const mimeType = fileInfo?.type || detectMimeType(outputText);

        blob = base64ToBlob(outputText, mimeType);

        const extensions: Record<string, string> = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/gif': '.gif',
          'image/webp': '.webp',
          'application/pdf': '.pdf',
          'application/zip': '.zip',
          'text/plain': '.txt',
        };

        const extension = extensions[mimeType] || '';

        filename = fileInfo?.name || `decoded-file${extension}`;
      } else {
        blob = new Blob([outputText], { type: 'text/plain' });
        filename = `${fileInfo?.name || 'encoded'}.base64.txt`;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      posthog.capture('base64_file_downloaded', {
        mode,
        file_type: blob.type,
        file_size: blob.size,
        filename_length: filename.length,
      });
    } catch (downloadError) {
      setError('Failed to download file');
    }
  }, [outputText, isValid, mode, fileInfo]);

  const convert = useCallback(async () => {
    if (!inputText && inputType === 'text') {
      setOutputText('');
      setIsValid(true);
      setError(undefined);

      return;
    }

    if (inputType === 'file' && !fileInfo) {
      setOutputText('');
      setIsValid(true);
      setError(undefined);

      return;
    }

    setIsConverting(true);
    setError(undefined);

    try {
      const startTime = performance.now();
      let result: string;
      let valid = true;

      if (mode === 'encode') {
        if (inputType === 'file') {
          result = outputText;
        } else {
          result = encodeToBase64(inputText);
        }
      } else {
        valid = validateBase64(inputText);
        if (!valid) {
          setIsValid(false);
          setError('Invalid Base64 format');
          setOutputText('');

          return;
        }

        if (inputType === 'file' || fileInfo) {
          result = inputText;
        } else {
          result = decodeFromBase64(inputText);
        }
      }

      const endTime = performance.now();

      setOutputText(result);
      setIsValid(valid);

      posthog.capture('base64_converted', {
        mode,
        input_type: inputType,
        input_length: inputText.length,
        output_length: result.length,
        time_ms: Math.round(endTime - startTime),
        has_file: !!fileInfo,
      });
    } catch (conversionError) {
      const errorMessage = conversionError instanceof Error ? conversionError.message : 'Conversion failed';

      setError(errorMessage);
      setIsValid(false);
      setOutputText('');
    } finally {
      setIsConverting(false);
    }
  }, [inputText, inputType, mode, fileInfo, outputText]);

  useEffect(() => {
    convert();
  }, [convert]);

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setError(undefined);
    setIsValid(true);
    setFileInfo(undefined);
  };

  useEffect(() => {
    if (inputType === 'text') {
      setFileInfo(undefined);
    }
  }, [inputType]);

  return {
    mode,
    setMode,
    inputType,
    setInputType,
    inputText,
    setInputText,
    outputText,
    isValid,
    error,
    isConverting,
    fileInfo,
    handleFileUpload,
    downloadAsFile,
    clearAll,
    formatFileSize,
  };
};
