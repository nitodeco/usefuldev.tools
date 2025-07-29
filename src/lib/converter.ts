export const decimalToBinary = (decimal: number): string => {
  if (!Number.isInteger(decimal) || decimal < 0) {
    throw new Error('Input must be a non-negative integer');
  }

  return decimal.toString(2);
};

export const decimalToHexadecimal = (decimal: number): string => {
  if (!Number.isInteger(decimal) || decimal < 0) {
    throw new Error('Input must be a non-negative integer');
  }

  return decimal.toString(16).toUpperCase();
};

export const binaryToDecimal = (binary: string): number => {
  if (!/^[01]+$/.test(binary)) {
    throw new Error('Input must be a valid binary string');
  }

  return parseInt(binary, 2);
};

export const binaryToHexadecimal = (binary: string): string => {
  const decimal = binaryToDecimal(binary);

  return decimalToHexadecimal(decimal);
};

export const hexadecimalToDecimal = (hexadecimal: string): number => {
  if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {
    throw new Error('Input must be a valid hexadecimal string');
  }

  return parseInt(hexadecimal, 16);
};

export const hexadecimalToBinary = (hexadecimal: string): string => {
  const decimal = hexadecimalToDecimal(hexadecimal);

  return decimalToBinary(decimal);
};

export const isValidBinary = (value: string): boolean => {
  return /^[01]+$/.test(value);
};

export const isValidDecimal = (value: string): boolean => {
  return /^\d+$/.test(value) && !value.startsWith('0') || value === '0';
};

export const isValidHexadecimal = (value: string): boolean => {
  return /^[0-9A-Fa-f]+$/.test(value);
};