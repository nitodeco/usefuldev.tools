export interface JsonValidationResult {
  isValid: boolean | null;
  error: string;
  formattedJson: string;
  parsedObject: unknown;
}

export interface JsonFormattingOptions {
  indent: number;
  sortKeys: boolean;
}

export interface UseJsonValidationReturn {
  jsonInput: string;
  setJsonInput: (input: string) => void;
  validationResult: JsonValidationResult;
  formattingOptions: JsonFormattingOptions;
  setFormattingOptions: (options: JsonFormattingOptions) => void;
  formatJson: () => void;
  minifyJson: () => void;
}
