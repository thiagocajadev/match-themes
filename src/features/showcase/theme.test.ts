import { describe, it, expect } from 'vitest';

import type { OKLCH } from '@/core/oklch';
import type { ScaleEntry, ScaleStop } from '@/core/scale';
import { scale } from '@/core/scale';
import { contrast, WCAG_AA_NORMAL_MIN } from '@/core/contrast';
import { format } from '@/core/format';
import {
  showcaseTheme,
  type ShowcaseMode,
  type ShowcaseThemeInput,
  type ShowcaseVariableName,
} from './theme';

const EXPECTED_VARIABLE_NAMES: readonly ShowcaseVariableName[] = [
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--border',
  '--input',
  '--ring',
];

const OKLCH_STRING_PATTERN = /^oklch\([0-9.]+% [0-9.]+ [0-9.]+\)$/;

const SAMPLE_BASE_BLUE: OKLCH = { lightness: 0.62, chroma: 0.18, hue: 255 };
const SAMPLE_BASE_ROSE: OKLCH = { lightness: 0.58, chroma: 0.2, hue: 10 };

describe('showcaseTheme.buildShowcaseTheme', () => {
  it('should return both light and dark buckets with every variable', () => {
    const input = makeInput(SAMPLE_BASE_BLUE);
    const expectedNames = EXPECTED_VARIABLE_NAMES;

    const actual = showcaseTheme.buildShowcaseTheme(input);

    const lightNames = Object.keys(actual.light).sort();
    const darkNames = Object.keys(actual.dark).sort();
    const expectedSortedNames = [...expectedNames].sort();

    expect(lightNames).toEqual(expectedSortedNames);
    expect(darkNames).toEqual(expectedSortedNames);
  });

  it('should format every value as an oklch() string', () => {
    const input = makeInput(SAMPLE_BASE_BLUE);

    const actual = showcaseTheme.buildShowcaseTheme(input);

    const lightValues = Object.values(actual.light);
    const darkValues = Object.values(actual.dark);
    const allValues = [...lightValues, ...darkValues];

    for (const value of allValues) {
      expect(value).toMatch(OKLCH_STRING_PATTERN);
    }
  });

  it('should produce identical output when called twice with the same input', () => {
    const input = makeInput(SAMPLE_BASE_BLUE);

    const firstRun = showcaseTheme.buildShowcaseTheme(input);
    const secondRun = showcaseTheme.buildShowcaseTheme(input);

    expect(firstRun).toEqual(secondRun);
  });

  it('should pair background and foreground with at least AA contrast in both modes', () => {
    const base = SAMPLE_BASE_BLUE;
    const modes: readonly ShowcaseMode[] = ['light', 'dark'];

    for (const mode of modes) {
      const backgroundColor = resolveRoleColor(base, mode, '--background');
      const foregroundColor = resolveRoleColor(base, mode, '--foreground');

      const ratio = contrast.contrastRatio(foregroundColor, backgroundColor);

      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_MIN);
    }
  });

  it('should pair card and card-foreground with at least AA contrast in both modes', () => {
    const base = SAMPLE_BASE_BLUE;
    const modes: readonly ShowcaseMode[] = ['light', 'dark'];

    for (const mode of modes) {
      const cardColor = resolveRoleColor(base, mode, '--card');
      const cardForegroundColor = resolveRoleColor(
        base,
        mode,
        '--card-foreground',
      );

      const ratio = contrast.contrastRatio(cardForegroundColor, cardColor);

      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_MIN);
    }
  });

  it('should pair primary and primary-foreground with at least AA contrast in both modes', () => {
    const base = SAMPLE_BASE_ROSE;
    const modes: readonly ShowcaseMode[] = ['light', 'dark'];

    for (const mode of modes) {
      const primaryColor = resolveRoleColor(base, mode, '--primary');
      const primaryForegroundColor = resolveRoleColor(
        base,
        mode,
        '--primary-foreground',
      );

      const ratio = contrast.contrastRatio(
        primaryForegroundColor,
        primaryColor,
      );

      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_MIN);
    }
  });

  it('should fall back to base color when a requested stop is missing from scale', () => {
    const base = SAMPLE_BASE_BLUE;
    const truncatedScale = makeScaleWithout(base, 600);
    const input: ShowcaseThemeInput = { scale: truncatedScale, base };

    const actual = showcaseTheme.buildShowcaseTheme(input);

    const expectedFallback = format.formatOklch(base);
    expect(actual.light['--primary']).toEqual(expectedFallback);
  });
});

function makeInput(base: OKLCH): ShowcaseThemeInput {
  const generatedScale = scale.generateTonalScale(base);

  const input: ShowcaseThemeInput = { scale: generatedScale, base };
  return input;
}

function makeScaleWithout(base: OKLCH, excludedStop: ScaleStop): ScaleEntry[] {
  const fullScale = scale.generateTonalScale(base);
  const filtered = fullScale.filter((entry) => entry.stop !== excludedStop);

  return filtered;
}

function resolveRoleColor(
  base: OKLCH,
  mode: ShowcaseMode,
  roleName: ShowcaseVariableName,
): OKLCH {
  const fullScale = scale.generateTonalScale(base);
  const input: ShowcaseThemeInput = { scale: fullScale, base };

  const formattedValue = showcaseTheme.buildShowcaseTheme(input)[mode][
    roleName
  ];
  const parsedColor = parseOklchString(formattedValue);
  return parsedColor;
}

function parseOklchString(oklchString: string): OKLCH {
  const numericPattern = /([0-9.]+)/g;
  const matches = oklchString.match(numericPattern);

  const hasThreeNumbers = matches !== null && matches.length >= 3;
  if (!hasThreeNumbers) {
    throw new Error(`Invalid oklch string: ${oklchString}`);
  }

  const lightnessPercent = Number(matches[0]);
  const chroma = Number(matches[1]);
  const hue = Number(matches[2]);

  const PERCENT_TO_UNIT = 100;
  const color: OKLCH = {
    lightness: lightnessPercent / PERCENT_TO_UNIT,
    chroma,
    hue,
  };
  return color;
}
