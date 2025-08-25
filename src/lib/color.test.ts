import { describe, expect, it } from 'vitest';

import {
  formatHSL,
  formatOKLCH,
  formatRGB,
  formatRGBA,
  hexToRgba,
  hslToRgba,
  oklchClipped,
  oklchToRgba,
  rgbaToHex,
  rgbaToHsl,
  rgbaToOklch,
} from './color';

describe('color utils', () => {
  it('parses and formats HEX correctly', () => {
    const rgba = hexToRgba('#3366cc');

    expect(rgba.r).toBe(51);
    expect(rgba.g).toBe(102);
    expect(rgba.b).toBe(204);
    expect(rgbaToHex(rgba)).toBe('#3366cc');
  });

  it('rgba <-> hsl roundtrip', () => {
    const rgba = { r: 12, g: 200, b: 150, a: 0.5 };
    const hsl = rgbaToHsl(rgba);
    const back = hslToRgba(hsl);

    expect(Math.abs(back.r - rgba.r)).toBeLessThanOrEqual(1);
    expect(Math.abs(back.g - rgba.g)).toBeLessThanOrEqual(1);
    expect(Math.abs(back.b - rgba.b)).toBeLessThanOrEqual(1);
  });

  it('rgba <-> oklch approximate roundtrip', () => {
    const rgba = { r: 255, g: 0, b: 0, a: 1 };
    const oklch = rgbaToOklch(rgba);
    const back = oklchToRgba(oklch);

    expect(Math.abs(back.r - rgba.r)).toBeLessThan(3);
    expect(Math.abs(back.g - rgba.g)).toBeLessThan(3);
    expect(Math.abs(back.b - rgba.b)).toBeLessThan(3);
  });

  it('formats strings', () => {
    const rgba = { r: 10, g: 20, b: 30, a: 0.75 };

    expect(formatRGB(rgba)).toBe('rgb(10, 20, 30)');
    expect(formatRGBA(rgba)).toContain('rgba(');
    expect(formatHSL({ ...rgbaToHsl(rgba) })).toContain('hsl(');
    expect(formatOKLCH({ ...rgbaToOklch(rgba) })).toContain('oklch(');
  });

  it('detects OKLCH out-of-gamut values', () => {
    const out = { l: 0.7, c: 0.35, h: 40 };

    expect(oklchClipped(out)).toBe(true);

    const within = { l: 0.7, c: 0.1, h: 40 };

    expect(oklchClipped(within)).toBe(false);
  });
});
