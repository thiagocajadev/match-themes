import { oklch, type OKLCH, type SRGB } from './oklch';
import { gamut } from './gamut';

export type ContrastLevel = 'AAA' | 'AA' | 'AA_LARGE' | 'FAIL';

export type ContrastEvaluation = {
  ratio: number;
  level: ContrastLevel;
  passesAaLarge: boolean;
  passesAaNormal: boolean;
  passesAaaLarge: boolean;
  passesAaaNormal: boolean;
};

export const WCAG_AA_LARGE_MIN = 3;
export const WCAG_AA_NORMAL_MIN = 4.5;
export const WCAG_AAA_LARGE_MIN = 4.5;
export const WCAG_AAA_NORMAL_MIN = 7;

const LUMINANCE_RED_COEF = 0.2126;
const LUMINANCE_GREEN_COEF = 0.7152;
const LUMINANCE_BLUE_COEF = 0.0722;
const CONTRAST_OFFSET = 0.05;

const CONTRAST_LEVEL_RULES: ReadonlyArray<{ minRatio: number; level: ContrastLevel }> = [
  { minRatio: WCAG_AAA_NORMAL_MIN, level: 'AAA' },
  { minRatio: WCAG_AA_NORMAL_MIN, level: 'AA' },
  { minRatio: WCAG_AA_LARGE_MIN, level: 'AA_LARGE' },
];

function evaluateContrast(foreground: OKLCH, background: OKLCH): ContrastEvaluation {
  const ratio = contrastRatio(foreground, background);

  const passesAaLarge = ratio >= WCAG_AA_LARGE_MIN;
  const passesAaNormal = ratio >= WCAG_AA_NORMAL_MIN;
  const passesAaaLarge = ratio >= WCAG_AAA_LARGE_MIN;
  const passesAaaNormal = ratio >= WCAG_AAA_NORMAL_MIN;

  const level = deriveContrastLevel(ratio);

  const evaluation: ContrastEvaluation = {
    ratio,
    level,
    passesAaLarge,
    passesAaNormal,
    passesAaaLarge,
    passesAaaNormal,
  };
  return evaluation;
}

function contrastRatio(foreground: OKLCH, background: OKLCH): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);

  const lighterLuminance = Math.max(foregroundLuminance, backgroundLuminance);
  const darkerLuminance = Math.min(foregroundLuminance, backgroundLuminance);

  const ratio = (lighterLuminance + CONTRAST_OFFSET) / (darkerLuminance + CONTRAST_OFFSET);
  return ratio;
}

function relativeLuminance(color: OKLCH): number {
  const displayedSrgb = gamut.oklchToSrgbClamped(color);
  const linearSrgb = toLinearSrgb(displayedSrgb);

  const luminance =
    LUMINANCE_RED_COEF * linearSrgb.red +
    LUMINANCE_GREEN_COEF * linearSrgb.green +
    LUMINANCE_BLUE_COEF * linearSrgb.blue;
  return luminance;
}

function toLinearSrgb(companded: SRGB): SRGB {
  const linear: SRGB = {
    red: oklch.srgbInverseCompand(companded.red),
    green: oklch.srgbInverseCompand(companded.green),
    blue: oklch.srgbInverseCompand(companded.blue),
  };
  return linear;
}

function deriveContrastLevel(ratio: number): ContrastLevel {
  const matchedRule = CONTRAST_LEVEL_RULES.find((rule) => ratio >= rule.minRatio);

  const isMatched = matchedRule !== undefined;
  if (isMatched) {
    const matchedLevel = matchedRule.level;
    return matchedLevel;
  }

  const fallbackLevel: ContrastLevel = 'FAIL';
  return fallbackLevel;
}

export const contrast = {
  evaluateContrast,
  contrastRatio,
  relativeLuminance,
};
