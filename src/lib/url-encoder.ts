export const encodeUrl = (input: string): string => {
  if (!input) {
    return '';
  }

  try {
    return encodeURIComponent(input);
  } catch (_error) {
    throw new Error('Failed to encode URL');
  }
};

export const decodeUrl = (input: string): string => {
  if (!input) {
    return '';
  }

  try {
    return decodeURIComponent(input);
  } catch (_error) {
    throw new Error('Failed to decode URL');
  }
};

export const encodeUrlSpecialChars = (input: string): string => {
  if (!input) {
    return '';
  }

  try {
    return encodeURI(input);
  } catch (_error) {
    throw new Error('Failed to encode URL special characters');
  }
};

export const decodeUrlSpecialChars = (input: string): string => {
  if (!input) {
    return '';
  }

  try {
    return decodeURI(input);
  } catch (_error) {
    throw new Error('Failed to decode URL special characters');
  }
};
