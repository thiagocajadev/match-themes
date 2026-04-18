import { describe, expect, it } from 'vitest';

import type { OKLCH } from './oklch';
import { SCALE_LUMINANCE, SCALE_STOPS, scale, type ScaleStop } from './scale';

const baseColor: OKLCH = { lightness: 0.6, chroma: 0.18, hue: 220 };

describe('SCALE_STOPS', () => {
  it('should expose exactly the 11 documented stops in ascending order', () => {
    const expectedStops: ScaleStop[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    const actual = [...SCALE_STOPS];

    expect(actual).toEqual(expectedStops);
  });
});

describe('chromaFactorForLuminance', () => {
  const innerSamples = [0.55, 0.6, 0.5, 0.65, 0.45];
  const midSamples = [0.3, 0.8];
  const outerSamples = [0.2, 0.9];
  const extremeSamples = [0.05, 0.99];

  it.each(innerSamples)(
    'should return the inner-band factor 1.0 for lightness %s (inside the perceptual sweet spot)',
    (lightness) => {
      const expectedFactor = 1.0;

      const actual = scale.chromaFactorForLuminance(lightness);

      expect(actual).toBe(expectedFactor);
    }
  );

  it.each(midSamples)(
    'should return the mid-band factor 0.85 for lightness %s',
    (lightness) => {
      const expectedFactor = 0.85;

      const actual = scale.chromaFactorForLuminance(lightness);

      expect(actual).toBe(expectedFactor);
    }
  );

  it.each(outerSamples)(
    'should return the outer-band factor 0.65 for lightness %s',
    (lightness) => {
      const expectedFactor = 0.65;

      const actual = scale.chromaFactorForLuminance(lightness);

      expect(actual).toBe(expectedFactor);
    }
  );

  it.each(extremeSamples)(
    'should return the fallback factor 0.4 for extreme lightness %s',
    (lightness) => {
      const expectedFactor = 0.4;

      const actual = scale.chromaFactorForLuminance(lightness);

      expect(actual).toBe(expectedFactor);
    }
  );
});

describe('tonalStep', () => {
  it('should set lightness to the canonical value for the given stop', () => {
    const targetStop: ScaleStop = 700;
    const expectedLightness = SCALE_LUMINANCE[targetStop];

    const actual = scale.tonalStep(baseColor, targetStop);

    expect(actual.lightness).toBe(expectedLightness);
  });

  it('should preserve the base hue across every stop', () => {
    const sampleStops: ScaleStop[] = [50, 500, 950];

    for (const stop of sampleStops) {
      const stepped = scale.tonalStep(baseColor, stop);
      expect(stepped.hue).toBe(baseColor.hue);
    }
  });

  it('should attenuate chroma at the dark end of the scale relative to the base', () => {
    const darkStop: ScaleStop = 950;
    const expectedFactor = scale.chromaFactorForLuminance(SCALE_LUMINANCE[darkStop]);
    const expectedChroma = baseColor.chroma * expectedFactor;

    const actual = scale.tonalStep(baseColor, darkStop);

    expect(actual.chroma).toBeCloseTo(expectedChroma, 10);
    expect(actual.chroma).toBeLessThan(baseColor.chroma);
  });
});

describe('generateTonalScale', () => {
  it('should emit one entry per documented stop, in scale order', () => {
    const expectedStops = [...SCALE_STOPS];

    const actual = scale.generateTonalScale(baseColor);
    const actualStops = actual.map((entry) => entry.stop);

    expect(actual).toHaveLength(expectedStops.length);
    expect(actualStops).toEqual(expectedStops);
  });

  it('should populate each entry color via tonalStep semantics', () => {
    const actual = scale.generateTonalScale(baseColor);

    for (const entry of actual) {
      const expectedColor = scale.tonalStep(baseColor, entry.stop);
      expect(entry.color).toEqual(expectedColor);
    }
  });
});
