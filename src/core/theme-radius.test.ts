import { describe, expect, it } from 'vitest';

import {
  DEFAULT_THEME_RADIUS,
  THEME_RADII,
  themeRadius,
  type ThemeRadius,
} from './theme-radius';

const EXPECTED_PRESET_COUNT = 6;
const DEFAULT_AS_REM = '0.625rem';
const SHARP_AS_LITERAL = '0';
const PILL_AS_REM = '1rem';

describe('theme-radius presets', () => {
  it('should expose six presets covering sharp through pill', () => {
    const presetCount = THEME_RADII.length;

    expect(presetCount).toBe(EXPECTED_PRESET_COUNT);
    expect(THEME_RADII).toEqual([0, 0.3, 0.5, 0.625, 0.75, 1]);
  });

  it('should default to 0.625 rem to preserve current theme-css output', () => {
    const defaultValue = DEFAULT_THEME_RADIUS;

    expect(defaultValue).toBe(0.625);
  });
});

describe('themeRadius.formatRem', () => {
  it('should emit bare "0" for the sharp preset without rem unit', () => {
    const sharp: ThemeRadius = 0;

    const formatted = themeRadius.formatRem(sharp);

    expect(formatted).toBe(SHARP_AS_LITERAL);
  });

  it('should emit the numeric value followed by rem for the default preset', () => {
    const formatted = themeRadius.formatRem(DEFAULT_THEME_RADIUS);

    expect(formatted).toBe(DEFAULT_AS_REM);
  });

  it('should emit "1rem" for the pill preset without trailing zeros', () => {
    const pill: ThemeRadius = 1;

    const formatted = themeRadius.formatRem(pill);

    expect(formatted).toBe(PILL_AS_REM);
  });

  it('should throw when asked to format an unknown radius at runtime', () => {
    const unknownRadius = 0.42 as unknown as ThemeRadius;

    const attempt = () => themeRadius.formatRem(unknownRadius);

    expect(attempt).toThrowError(/0\.42/);
  });
});
