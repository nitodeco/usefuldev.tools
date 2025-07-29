export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface FileUploadOptions {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}

export interface FileUploadError {
  code: 'FILE_TOO_LARGE' | 'INVALID_TYPE' | 'READ_ERROR' | 'GENERIC_ERROR';
  message: string;
  file?: File;
}
