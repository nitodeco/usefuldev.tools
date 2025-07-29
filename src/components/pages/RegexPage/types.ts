export type MatchType = 'full' | 'partial' | 'none' | null;

export interface RegexValidationResult {
  isValid: boolean | null;
  error: string;
  testMatches: MatchType;
  characterMatches: boolean[];
}

export interface UseRegexValidationReturn {
  regexPattern: string;
  setRegexPattern: (pattern: string) => void;
  testString: string;
  setTestString: (testString: string) => void;
  validationResult: RegexValidationResult;
}
