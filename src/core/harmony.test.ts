import { describe, expect, it } from 'vitest';

import { HARMONIES, NEUTRAL_SPECS, harmony } from './harmony';
import type { OKLCH } from './oklch';

const FULL_CIRCLE_DEGREES = 360;

const baseColor: OKLCH = { lightness: 0.6, chroma: 0.15, hue: 200 };

describe('rotateHue', () => {
  it('should add the offset and preserve lightness and chroma', () => {
    const offsetDegrees = 30;
    const expectedHue = baseColor.hue + offsetDegrees;

    const actual = harmony.rotateHue(baseColor, offsetDegrees);

    expect(actual.lightness).toBe(baseColor.lightness);
    expect(actual.chroma).toBe(baseColor.chroma);
    expect(actual.hue).toBe(expectedHue);
  });

  it('should wrap negative offsets back into [0, 360)', () => {
    const negativeOffset = -30;
    const expectedHue = (baseColor.hue + negativeOffset + FULL_CIRCLE_DEGREES) % FULL_CIRCLE_DEGREES;

    const actual = harmony.rotateHue(baseColor, negativeOffset);

    expect(actual.hue).toBe(expectedHue);
    expect(actual.hue).toBeGreaterThanOrEqual(0);
    expect(actual.hue).toBeLessThan(FULL_CIRCLE_DEGREES);
  });

  it('should wrap offsets that exceed a full circle back into [0, 360)', () => {
    const overshootOffset = 200;
    const expectedHue = (baseColor.hue + overshootOffset) % FULL_CIRCLE_DEGREES;

    const actual = harmony.rotateHue(baseColor, overshootOffset);

    expect(actual.hue).toBe(expectedHue);
  });
});

describe('generateHarmony — rotational kinds', () => {
  it('should return two colors at the base hue and 180° away for complementary', () => {
    const expectedOffsets = HARMONIES.complementary;
    const expectedHues = expectedOffsets.map(
      (offset) => (baseColor.hue + offset) % FULL_CIRCLE_DEGREES
    );

    const actual = harmony.generateHarmony(baseColor, 'complementary');
    const actualHues = actual.map((color) => color.hue);

    expect(actualHues).toEqual(expectedHues);
  });

  it('should return three evenly spaced hues for triadic', () => {
    const expectedOffsets = HARMONIES.triadic;

    const actual = harmony.generateHarmony(baseColor, 'triadic');
    const actualHues = actual.map((color) => color.hue);
    const expectedHues = expectedOffsets.map(
      (offset) => (baseColor.hue + offset) % FULL_CIRCLE_DEGREES
    );

    expect(actual).toHaveLength(expectedOffsets.length);
    expect(actualHues).toEqual(expectedHues);
  });

  it('should preserve lightness and chroma for every rotational result', () => {
    const actual = harmony.generateHarmony(baseColor, 'splitComplementary');

    for (const color of actual) {
      expect(color.lightness).toBe(baseColor.lightness);
      expect(color.chroma).toBe(baseColor.chroma);
    }
  });
});

describe('generateHarmony — tinted neutrals', () => {
  it('should return one color per NEUTRAL_SPECS entry using the base hue', () => {
    const expectedColors = NEUTRAL_SPECS.map((spec) => ({
      lightness: spec.lightness,
      chroma: spec.chroma,
      hue: baseColor.hue,
    }));

    const actual = harmony.generateHarmony(baseColor, 'neutrals');

    expect(actual).toEqual(expectedColors);
  });
});
