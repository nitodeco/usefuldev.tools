import chroma from 'chroma-js';

export type RGBA = { r: number; g: number; b: number; a?: number };
export type HSL = { h: number; s: number; l: number; a?: number };
export type OKLCH = { l: number; c: number; h: number; a?: number };

export const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);

export const round = (x: number, digits = 4) => {
  const p = Math.pow(10, digits);

  return Math.round(x * p) / p;
};

export function hexToRgba(hex: string): RGBA {
  try {
    const color = chroma(hex);
    const [r, g, b, a = 1] = color.rgba();

    return { r: Math.round(r), g: Math.round(g), b: Math.round(b), a: round(a, 4) };
  } catch (_error) {
    throw new Error('Invalid hex color');
  }
}

export function rgbaToHex({ r, g, b, a }: RGBA, includeAlpha = false): string {
  const alpha = a == null ? 1 : a;
  const color = chroma.rgb(r, g, b, alpha);

  return includeAlpha && alpha < 1 ? color.hex('rgba') : color.hex();
}

export function rgbaToHsl({ r, g, b, a }: RGBA): HSL {
  const color = chroma.rgb(r, g, b);
  const [h, s, l] = color.hsl();

  return {
    h: round(isNaN(h) ? 0 : h, 2),
    s: round(isNaN(s) ? 0 : s * 100, 2),
    l: round(l * 100, 2),
    a,
  };
}

export function hslToRgba({ h, s, l, a }: HSL): RGBA {
  const color = chroma.hsl(h, s / 100, l / 100);
  const [r, g, b] = color.rgb();

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b), a };
}

export function rgbaToOklch({ r, g, b, a }: RGBA): OKLCH {
  const color = chroma.rgb(r, g, b);
  const [l, c, h] = color.oklch();

  return {
    l: round(l, 4),
    c: round(c, 4),
    h: round(isNaN(h) ? 0 : h, 2),
    a,
  };
}

export function oklchToRgba({ l, c, h, a }: OKLCH): RGBA {
  const color = chroma.oklch(l, c, h);
  const [r, g, b] = color.rgb();

  return {
    r: clamp(Math.round(r), 0, 255),
    g: clamp(Math.round(g), 0, 255),
    b: clamp(Math.round(b), 0, 255),
    a,
  };
}

export function oklchClipped({ l, c, h }: OKLCH): boolean {
  try {
    const color = chroma.oklch(l, c, h);
    const [r, g, b] = color.rgb();

    const haveValuesBeenClamped = r <= 0 || r >= 255 || g <= 0 || g >= 255 || b <= 0 || b >= 255;

    if (c > 0.2) {
      const backConverted = chroma.rgb(r, g, b).oklch();
      const [, backC] = backConverted;
      const chromaDiff = Math.abs(backC - c);

      return chromaDiff > 0.05 || haveValuesBeenClamped;
    }

    return haveValuesBeenClamped;
  } catch {
    return true;
  }
}

export const formatRGB = ({ r, g, b }: RGBA) => {
  const r_clamped = clamp(Math.round(r), 0, 255);
  const g_clamped = clamp(Math.round(g), 0, 255);
  const b_clamped = clamp(Math.round(b), 0, 255);

  return `rgb(${r_clamped}, ${g_clamped}, ${b_clamped})`;
};

export const formatRGBA = ({ r, g, b, a }: RGBA) => {
  const alpha = a ?? 1;
  const r_clamped = clamp(Math.round(r), 0, 255);
  const g_clamped = clamp(Math.round(g), 0, 255);
  const b_clamped = clamp(Math.round(b), 0, 255);

  return `rgba(${r_clamped}, ${g_clamped}, ${b_clamped}, ${round(alpha, 2)})`;
};

export const formatHSL = ({ h, s, l }: HSL) => {
  const color = chroma.hsl(h, s / 100, l / 100);

  return color.css('hsl');
};

export const formatOKLCH = ({ l, c, h, a }: OKLCH) => {
  const alpha = a != null ? ` / ${round(a, 2)}` : '';

  return `oklch(${round(l, 3)} ${round(c, 3)} ${round(h, 1)}${alpha})`;
};
