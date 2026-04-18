import type { OKLCH } from './oklch';

export type HarmonyKind =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'splitComplementary'
  | 'tetradic'
  | 'square'
  | 'neutrals';

type RotationalHarmonyKind = Exclude<HarmonyKind, 'neutrals'>;

const FULL_CIRCLE_DEGREES = 360;

export const HARMONIES: Record<RotationalHarmonyKind, number[]> = {
  complementary: [0, 180],
  analogous: [-30, 0, 30],
  triadic: [0, 120, 240],
  splitComplementary: [0, 150, 210],
  tetradic: [0, 60, 180, 240],
  square: [0, 90, 180, 270],
};

export const NEUTRAL_SPECS: ReadonlyArray<{ lightness: number; chroma: number }> = [
  { lightness: 0.97, chroma: 0.004 },
  { lightness: 0.85, chroma: 0.008 },
  { lightness: 0.5, chroma: 0.012 },
  { lightness: 0.25, chroma: 0.015 },
];

function generateHarmony(base: OKLCH, kind: HarmonyKind): OKLCH[] {
  const isNeutralsKind = kind === 'neutrals';
  if (isNeutralsKind) {
    const neutrals = generateTintedNeutrals(base);
    return neutrals;
  }

  const offsets = HARMONIES[kind];
  const rotated = offsets.map((offset) => rotateHue(base, offset));
  return rotated;
}

function rotateHue(color: OKLCH, offsetDegrees: number): OKLCH {
  const wrappedHue = (color.hue + offsetDegrees + FULL_CIRCLE_DEGREES) % FULL_CIRCLE_DEGREES;
  const rotated: OKLCH = {
    lightness: color.lightness,
    chroma: color.chroma,
    hue: wrappedHue,
  };
  return rotated;
}

function generateTintedNeutrals(base: OKLCH): OKLCH[] {
  const neutrals = NEUTRAL_SPECS.map((spec) => ({
    lightness: spec.lightness,
    chroma: spec.chroma,
    hue: base.hue,
  }));
  return neutrals;
}

export const harmony = {
  generateHarmony,
  rotateHue,
};
