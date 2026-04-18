import { describe, expect, it } from 'vitest';

import { oklch, type OKLCH, type SRGB } from './oklch';

describe('srgbCompand / srgbInverseCompand', () => {
  it('should round-trip the linear segment below the breakpoint', () => {
    const inputLinear = 0.001;
    const expected = inputLinear;

    const companded = oklch.srgbCompand(inputLinear);
    const actual = oklch.srgbInverseCompand(companded);

    expect(actual).toBeCloseTo(expected, 10);
  });

  it('should round-trip the gamma segment above the breakpoint', () => {
    const inputLinear = 0.5;
    const expected = inputLinear;

    const companded = oklch.srgbCompand(inputLinear);
    const actual = oklch.srgbInverseCompand(companded);

    expect(actual).toBeCloseTo(expected, 10);
  });
});

describe('oklabToOklch / oklchToOklab', () => {
  it('should round-trip Oklab → OKLCH → Oklab preserving channels', () => {
    const inputOklab = { lightness: 0.7, greenRed: 0.05, blueYellow: -0.12 };
    const expected = inputOklab;

    const oklchValue = oklch.oklabToOklch(inputOklab);
    const actual = oklch.oklchToOklab(oklchValue);

    expect(actual.lightness).toBeCloseTo(expected.lightness, 10);
    expect(actual.greenRed).toBeCloseTo(expected.greenRed, 10);
    expect(actual.blueYellow).toBeCloseTo(expected.blueYellow, 10);
  });

  it('should produce hue in [0, 360) and zero chroma for neutral input', () => {
    const inputOklab = { lightness: 0.5, greenRed: 0, blueYellow: 0 };

    const actual = oklch.oklabToOklch(inputOklab);

    expect(actual.chroma).toBeCloseTo(0, 10);
    expect(actual.hue).toBeGreaterThanOrEqual(0);
    expect(actual.hue).toBeLessThan(360);
  });
});

describe('srgbToOklch', () => {
  it('should map sRGB white to lightness ≈ 1, chroma ≈ 0', () => {
    const inputWhite: SRGB = { red: 1, green: 1, blue: 1 };

    const actual = oklch.srgbToOklch(inputWhite);

    expect(actual.lightness).toBeCloseTo(1, 4);
    expect(actual.chroma).toBeCloseTo(0, 4);
  });

  it('should map sRGB black to lightness = 0, chroma = 0', () => {
    const inputBlack: SRGB = { red: 0, green: 0, blue: 0 };

    const actual = oklch.srgbToOklch(inputBlack);

    expect(actual.lightness).toBeCloseTo(0, 10);
    expect(actual.chroma).toBeCloseTo(0, 10);
  });

  it('should map sRGB pure red to Ottosson reference Oklab values', () => {
    const inputRed: SRGB = { red: 1, green: 0, blue: 0 };
    const expectedLightness = 0.6279;
    const expectedGreenRed = 0.2249;
    const expectedBlueYellow = 0.1258;

    const oklchActual = oklch.srgbToOklch(inputRed);
    const oklabActual = oklch.oklchToOklab(oklchActual);

    expect(oklabActual.lightness).toBeCloseTo(expectedLightness, 3);
    expect(oklabActual.greenRed).toBeCloseTo(expectedGreenRed, 3);
    expect(oklabActual.blueYellow).toBeCloseTo(expectedBlueYellow, 3);
  });
});

describe('srgbToOklch / oklchToSrgb round-trip', () => {
  const inGamutSamples: SRGB[] = [
    { red: 0.05, green: 0.65, blue: 0.91 },
    { red: 0.95, green: 0.4, blue: 0.1 },
    { red: 0.2, green: 0.8, blue: 0.3 },
    { red: 0.5, green: 0.5, blue: 0.5 },
  ];

  it.each(inGamutSamples)(
    'should round-trip in-gamut sample %j within float tolerance',
    (sample) => {
      const expected = sample;

      const oklchValue = oklch.srgbToOklch(sample);
      const actual = oklch.oklchToSrgb(oklchValue);

      expect(actual.red).toBeCloseTo(expected.red, 6);
      expect(actual.green).toBeCloseTo(expected.green, 6);
      expect(actual.blue).toBeCloseTo(expected.blue, 6);
    }
  );

  it('should round-trip OKLCH → sRGB → OKLCH preserving lightness, chroma, hue', () => {
    const input: OKLCH = { lightness: 0.6, chroma: 0.1, hue: 240 };
    const expected = input;

    const srgb = oklch.oklchToSrgb(input);
    const actual = oklch.srgbToOklch(srgb);

    expect(actual.lightness).toBeCloseTo(expected.lightness, 4);
    expect(actual.chroma).toBeCloseTo(expected.chroma, 4);
    expect(actual.hue).toBeCloseTo(expected.hue, 2);
  });
});

describe('linearRgbToOklab / oklabToLinearRgb', () => {
  it('should round-trip linear RGB through Oklab within spec tolerance', () => {
    const inputLinear: SRGB = { red: 0.3, green: 0.5, blue: 0.7 };
    const expected = inputLinear;

    const oklabValue = oklch.linearRgbToOklab(inputLinear);
    const actual = oklch.oklabToLinearRgb(oklabValue);

    expect(actual.red).toBeCloseTo(expected.red, 6);
    expect(actual.green).toBeCloseTo(expected.green, 6);
    expect(actual.blue).toBeCloseTo(expected.blue, 6);
  });
});
