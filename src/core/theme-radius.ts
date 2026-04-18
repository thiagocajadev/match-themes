export type ThemeRadius = 0 | 0.3 | 0.5 | 0.625 | 0.75 | 1;

const THEME_RADIUS_SHARP: ThemeRadius = 0;
const THEME_RADIUS_SUBTLE: ThemeRadius = 0.3;
const THEME_RADIUS_SOFT: ThemeRadius = 0.5;
const THEME_RADIUS_DEFAULT: ThemeRadius = 0.625;
const THEME_RADIUS_ROUND: ThemeRadius = 0.75;
const THEME_RADIUS_PILL: ThemeRadius = 1;

export const THEME_RADII: readonly ThemeRadius[] = [
  THEME_RADIUS_SHARP,
  THEME_RADIUS_SUBTLE,
  THEME_RADIUS_SOFT,
  THEME_RADIUS_DEFAULT,
  THEME_RADIUS_ROUND,
  THEME_RADIUS_PILL,
];

export const DEFAULT_THEME_RADIUS: ThemeRadius = THEME_RADIUS_DEFAULT;

const REM_UNIT = 'rem';
const SHARP_LITERAL = '0';

function formatRem(value: ThemeRadius): string {
  const isSharp = value === THEME_RADIUS_SHARP;
  if (isSharp) {
    return SHARP_LITERAL;
  }

  const isKnownRadius = THEME_RADII.includes(value);
  if (!isKnownRadius) {
    throw new Error(`Unknown theme radius ${String(value)}`);
  }

  const formatted = `${String(value)}${REM_UNIT}`;
  return formatted;
}

export const themeRadius = {
  formatRem,
};
