import { oklch, type OKLCH, type SRGB } from './oklch';

export const GAMUT_EPSILON = 0.0001;
export const GAMUT_SEARCH_ITERATIONS = 20;

const CHANNEL_MIN = 0;
const CHANNEL_MAX = 1;
const GAMUT_LOWER_BOUND = CHANNEL_MIN - GAMUT_EPSILON;
const GAMUT_UPPER_BOUND = CHANNEL_MAX + GAMUT_EPSILON;
const CHROMA_SEARCH_LOWER = 0;

function oklchToSrgbClamped(color: OKLCH): SRGB {
  const direct = oklch.oklchToSrgb(color);
  if (isInSrgbGamut(direct)) {
    const clamped = clampSrgb(direct);
    return clamped;
  }
  const reducedChroma = findMaxChromaInGamut(color.lightness, color.chroma, color.hue);
  const reducedColor: OKLCH = {
    lightness: color.lightness,
    chroma: reducedChroma,
    hue: color.hue,
  };
  const reducedSrgb = oklch.oklchToSrgb(reducedColor);
  const clamped = clampSrgb(reducedSrgb);
  return clamped;
}

function findMaxChromaInGamut(lightness: number, maxChroma: number, hue: number): number {
  let lower = CHROMA_SEARCH_LOWER;
  let upper = maxChroma;

  for (let iteration = 0; iteration < GAMUT_SEARCH_ITERATIONS; iteration++) {
    const candidate = (lower + upper) / 2;
    const candidateSrgb = oklch.oklchToSrgb({ lightness, chroma: candidate, hue });

    if (isInSrgbGamut(candidateSrgb)) {
      lower = candidate;
    } else {
      upper = candidate;
    }
  }
  
  return lower;
}

function isInSrgbGamut(srgb: SRGB): boolean {
  const isRedInRange = isChannelInRange(srgb.red);
  const isGreenInRange = isChannelInRange(srgb.green);
  const isBlueInRange = isChannelInRange(srgb.blue);

  const isAllInRange = isRedInRange && isGreenInRange && isBlueInRange;
  return isAllInRange;
}

function clampSrgb(srgb: SRGB): SRGB {
  const clamped: SRGB = {
    red: clampChannel(srgb.red),
    green: clampChannel(srgb.green),
    blue: clampChannel(srgb.blue),
  };
  return clamped;
}

function isChannelInRange(channel: number): boolean {
  const isAboveLowerBound = channel >= GAMUT_LOWER_BOUND;
  const isBelowUpperBound = channel <= GAMUT_UPPER_BOUND;
  const isWithinBounds = isAboveLowerBound && isBelowUpperBound;
  return isWithinBounds;
}

function clampChannel(channel: number): number {
  const bounded = Math.max(CHANNEL_MIN, Math.min(CHANNEL_MAX, channel));
  return bounded;
}

export const gamut = {
  oklchToSrgbClamped,
  findMaxChromaInGamut,
  isInSrgbGamut,
  clampSrgb,
};
