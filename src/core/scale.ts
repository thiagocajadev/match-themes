import type { OKLCH } from './oklch';

export type ScaleStop = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type ScaleEntry = {
  stop: ScaleStop;
  color: OKLCH;
};

export const SCALE_STOPS: readonly ScaleStop[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
];

export const SCALE_LUMINANCE: Record<ScaleStop, number> = {
  50: 0.98,
  100: 0.95,
  200: 0.89,
  300: 0.81,
  400: 0.7,
  500: 0.58,
  600: 0.48,
  700: 0.39,
  800: 0.3,
  900: 0.22,
  950: 0.16,
};

const PERCEPTUAL_LIGHTNESS_MIDPOINT = 0.55;

const CHROMA_BANDS: ReadonlyArray<{ distanceUpperBound: number; chromaFactor: number }> = [
  { distanceUpperBound: 0.15, chromaFactor: 1.0 },
  { distanceUpperBound: 0.3, chromaFactor: 0.85 },
  { distanceUpperBound: 0.4, chromaFactor: 0.65 },
];

const EXTREME_LUMINANCE_CHROMA_FACTOR = 0.4;

function generateTonalScale(base: OKLCH): ScaleEntry[] {
  const entries = SCALE_STOPS.map((stop) => {
    const steppedColor = tonalStep(base, stop);
    const entry: ScaleEntry = { stop, color: steppedColor };
    return entry;
  });
  return entries;
}

function tonalStep(base: OKLCH, stop: ScaleStop): OKLCH {
  const targetLightness = SCALE_LUMINANCE[stop];
  const factor = chromaFactorForLuminance(targetLightness);
  const adjustedChroma = base.chroma * factor;
  const stepped: OKLCH = {
    lightness: targetLightness,
    chroma: adjustedChroma,
    hue: base.hue,
  };
  return stepped;
}

function chromaFactorForLuminance(lightness: number): number {
  const distanceFromMidpoint = Math.abs(lightness - PERCEPTUAL_LIGHTNESS_MIDPOINT);
  const matchedBand = CHROMA_BANDS.find((band) => {
    const isInsideBand = distanceFromMidpoint < band.distanceUpperBound;
    return isInsideBand;
  });
  if (matchedBand !== undefined) {
    const matchedFactor = matchedBand.chromaFactor;
    return matchedFactor;
  }

  const fallbackFactor = EXTREME_LUMINANCE_CHROMA_FACTOR;
  return fallbackFactor;
}

export const scale = {
  generateTonalScale,
  tonalStep,
  chromaFactorForLuminance,
};
