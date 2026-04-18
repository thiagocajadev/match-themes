import { describe, expect, it } from 'vitest';

import { gamut } from './gamut';
import { oklch, type OKLCH } from './oklch';

const CHROMA_OVERSHOOT_STEP = 0.01;

describe('isInSrgbGamut', () => {
  it('should accept channels strictly inside [0, 1]', () => {
    const inside = { red: 0.2, green: 0.5, blue: 0.9 };

    const actual = gamut.isInSrgbGamut(inside);

    expect(actual).toBe(true);
  });

  it('should reject channels outside the epsilon-relaxed range', () => {
    const outside = { red: 1.5, green: 0.5, blue: 0.5 };

    const actual = gamut.isInSrgbGamut(outside);

    expect(actual).toBe(false);
  });
});

describe('clampSrgb', () => {
  it('should bound each channel to [0, 1]', () => {
    const input = { red: -0.2, green: 0.5, blue: 1.4 };
    const expected = { red: 0, green: 0.5, blue: 1 };

    const actual = gamut.clampSrgb(input);

    expect(actual).toEqual(expected);
  });
});

describe('oklchToSrgbClamped', () => {
  it('should pass through an in-gamut color unchanged within float tolerance', () => {
    const inGamut: OKLCH = oklch.srgbToOklch({ red: 0.3, green: 0.6, blue: 0.8 });
    const expected = { red: 0.3, green: 0.6, blue: 0.8 };

    const actual = gamut.oklchToSrgbClamped(inGamut);

    expect(actual.red).toBeCloseTo(expected.red, 4);
    expect(actual.green).toBeCloseTo(expected.green, 4);
    expect(actual.blue).toBeCloseTo(expected.blue, 4);
  });

  it('should clamp an over-saturated color to the gamut while preserving lightness and hue', () => {
    const oversaturated: OKLCH = { lightness: 0.7, chroma: 0.4, hue: 30 };

    const actualSrgb = gamut.oklchToSrgbClamped(oversaturated);
    const recovered = oklch.srgbToOklch(actualSrgb);

    expect(actualSrgb.red).toBeGreaterThanOrEqual(0);
    expect(actualSrgb.red).toBeLessThanOrEqual(1);
    expect(actualSrgb.green).toBeGreaterThanOrEqual(0);
    expect(actualSrgb.green).toBeLessThanOrEqual(1);
    expect(actualSrgb.blue).toBeGreaterThanOrEqual(0);
    expect(actualSrgb.blue).toBeLessThanOrEqual(1);
    expect(recovered.lightness).toBeCloseTo(oversaturated.lightness, 2);
    expect(recovered.hue).toBeCloseTo(oversaturated.hue, 0);
    expect(recovered.chroma).toBeLessThan(oversaturated.chroma);
  });
});

describe('findMaxChromaInGamut', () => {
  it('should converge on a chroma whose resulting color sits at the gamut edge', () => {
    const inputLightness = 0.6;
    const inputHue = 200;
    const startChroma = 0.5;

    const actualChroma = gamut.findMaxChromaInGamut(inputLightness, startChroma, inputHue);
    const insideSrgb = oklch.oklchToSrgb({
      lightness: inputLightness,
      chroma: actualChroma,
      hue: inputHue,
    });
    const slightlyOverSrgb = oklch.oklchToSrgb({
      lightness: inputLightness,
      chroma: actualChroma + CHROMA_OVERSHOOT_STEP,
      hue: inputHue,
    });

    expect(gamut.isInSrgbGamut(insideSrgb)).toBe(true);
    expect(gamut.isInSrgbGamut(slightlyOverSrgb)).toBe(false);
  });
});
