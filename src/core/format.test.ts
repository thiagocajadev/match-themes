import { describe, expect, it } from 'vitest';

import { format } from './format';
import type { OKLCH, SRGB } from './oklch';

describe('formatHex', () => {
  it('should format pure red as #ff0000', () => {
    const inputRed: SRGB = { red: 1, green: 0, blue: 0 };
    const expected = '#ff0000';

    const actual = format.formatHex(inputRed);

    expect(actual).toBe(expected);
  });

  it('should format white as #ffffff and black as #000000', () => {
    const inputWhite: SRGB = { red: 1, green: 1, blue: 1 };
    const inputBlack: SRGB = { red: 0, green: 0, blue: 0 };

    const actualWhite = format.formatHex(inputWhite);
    const actualBlack = format.formatHex(inputBlack);

    expect(actualWhite).toBe('#ffffff');
    expect(actualBlack).toBe('#000000');
  });

  it('should pad single-digit hex bytes with a leading zero', () => {
    const inputDimRed: SRGB = { red: 0.05, green: 0, blue: 0 };
    const expected = '#0d0000';

    const actual = format.formatHex(inputDimRed);

    expect(actual).toBe(expected);
  });

  it('should clamp out-of-gamut channels to the [0, 1] window before encoding', () => {
    const inputOverflow: SRGB = { red: 1.5, green: -0.2, blue: 0.5 };
    const expected = '#ff0080';

    const actual = format.formatHex(inputOverflow);

    expect(actual).toBe(expected);
  });
});

describe('formatRgb', () => {
  it('should render the modern CSS Color 4 space-separated form', () => {
    const inputRed: SRGB = { red: 1, green: 0, blue: 0 };
    const expected = 'rgb(255 0 0)';

    const actual = format.formatRgb(inputRed);

    expect(actual).toBe(expected);
  });

  it('should round each channel to the nearest byte', () => {
    const inputMidtones: SRGB = { red: 0.5, green: 0.25, blue: 0.749 };
    const expected = 'rgb(128 64 191)';

    const actual = format.formatRgb(inputMidtones);

    expect(actual).toBe(expected);
  });
});

describe('formatOklch', () => {
  it('should render the lightness as a percentage with two decimals', () => {
    const inputColor: OKLCH = { lightness: 0.5, chroma: 0.123456, hue: 200.123 };
    const expected = 'oklch(50.00% 0.1235 200.12)';

    const actual = format.formatOklch(inputColor);

    expect(actual).toBe(expected);
  });

  it('should preserve four decimals on chroma and two on hue', () => {
    const inputColor: OKLCH = { lightness: 0.7012, chroma: 0.05, hue: 90 };
    const expected = 'oklch(70.12% 0.0500 90.00)';

    const actual = format.formatOklch(inputColor);

    expect(actual).toBe(expected);
  });
});
