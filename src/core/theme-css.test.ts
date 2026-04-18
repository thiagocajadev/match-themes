import { describe, it, expect } from 'vitest';

import type { OKLCH } from './oklch';
import { scale } from './scale';
import { DEFAULT_THEME_RADIUS, type ThemeRadius } from './theme-radius';
import {
  themeCss,
  type ThemeCssInput,
  type ThemeRoleName,
  type ThemeRoleValues,
} from './theme-css';

const SAMPLE_BASE: OKLCH = { lightness: 0.62, chroma: 0.18, hue: 255 };
const SHARP_RADIUS: ThemeRadius = 0;
const PILL_RADIUS: ThemeRadius = 1;

const ROLE_NAMES: readonly ThemeRoleName[] = [
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

const STUB_ROLE_VALUE_LIGHT = 'oklch(99% 0 0)';
const STUB_ROLE_VALUE_DARK = 'oklch(10% 0 0)';

describe('themeCss.buildThemeCss', () => {
  it('should emit @theme, :root, .dark, and @theme inline blocks in order', () => {
    const input = makeInput(SAMPLE_BASE);

    const actual = themeCss.buildThemeCss(input);

    const themeOpenIndex = actual.indexOf('@theme {');
    const rootOpenIndex = actual.indexOf(':root {');
    const darkOpenIndex = actual.indexOf('.dark {');
    const aliasOpenIndex = actual.indexOf('@theme inline {');

    expect(themeOpenIndex).toBeGreaterThanOrEqual(0);
    expect(rootOpenIndex).toBeGreaterThan(themeOpenIndex);
    expect(darkOpenIndex).toBeGreaterThan(rootOpenIndex);
    expect(aliasOpenIndex).toBeGreaterThan(darkOpenIndex);
  });

  it('should emit all eleven tonal stops in ascending order inside @theme', () => {
    const input = makeInput(SAMPLE_BASE);

    const actual = themeCss.buildThemeCss(input);

    const stopDeclarations = actual.match(/--color-brand-\d+:/g);
    const expectedOrder = [
      '--color-brand-50:',
      '--color-brand-100:',
      '--color-brand-200:',
      '--color-brand-300:',
      '--color-brand-400:',
      '--color-brand-500:',
      '--color-brand-600:',
      '--color-brand-700:',
      '--color-brand-800:',
      '--color-brand-900:',
      '--color-brand-950:',
    ];

    expect(stopDeclarations).toEqual(expectedOrder);
  });

  it('should emit every role inside :root and .dark blocks', () => {
    const input = makeInput(SAMPLE_BASE);

    const actual = themeCss.buildThemeCss(input);
    const rootBlock = extractBlock(actual, ':root {', '}');
    const darkBlock = extractBlock(actual, '.dark {', '}');

    for (const roleName of ROLE_NAMES) {
      expect(rootBlock).toContain(`${roleName}: ${STUB_ROLE_VALUE_LIGHT};`);
      expect(darkBlock).toContain(`${roleName}: ${STUB_ROLE_VALUE_DARK};`);
    }
  });

  it('should emit the default --radius of 0.625rem when no override is supplied', () => {
    const input = makeInput(SAMPLE_BASE);

    const actual = themeCss.buildThemeCss(input);
    const rootBlock = extractBlock(actual, ':root {', '}');

    expect(rootBlock).toContain('--radius: 0.625rem;');
  });

  it('should emit --radius: 0; when the sharp preset is selected', () => {
    const input = makeInput(SAMPLE_BASE, SHARP_RADIUS);

    const actual = themeCss.buildThemeCss(input);
    const rootBlock = extractBlock(actual, ':root {', '}');

    expect(rootBlock).toContain('--radius: 0;');
  });

  it('should emit --radius: 1rem; when the pill preset is selected', () => {
    const input = makeInput(SAMPLE_BASE, PILL_RADIUS);

    const actual = themeCss.buildThemeCss(input);
    const rootBlock = extractBlock(actual, ':root {', '}');

    expect(rootBlock).toContain('--radius: 1rem;');
  });

  it('should emit aliased --color-<role> tokens and radius calcs inside @theme inline', () => {
    const input = makeInput(SAMPLE_BASE);

    const actual = themeCss.buildThemeCss(input);
    const aliasBlock = extractBlock(actual, '@theme inline {', '}');

    expect(aliasBlock).toContain('--radius-sm: calc(var(--radius) - 4px);');
    expect(aliasBlock).toContain('--radius-lg: var(--radius);');

    for (const roleName of ROLE_NAMES) {
      const aliasLine = `--color-${roleName.replace('--', '')}: var(${roleName});`;
      expect(aliasBlock).toContain(aliasLine);
    }
  });

  it('should produce identical output when called twice with the same input', () => {
    const input = makeInput(SAMPLE_BASE);

    const firstRun = themeCss.buildThemeCss(input);
    const secondRun = themeCss.buildThemeCss(input);

    expect(firstRun).toBe(secondRun);
  });

  it('should throw when the scale is missing a required stop', () => {
    const truncatedScale = scale
      .generateTonalScale(SAMPLE_BASE)
      .filter((entry) => entry.stop !== 500);

    const input: ThemeCssInput = {
      baseOklch: SAMPLE_BASE,
      scale: truncatedScale,
      lightRoles: makeStubRoleValues(STUB_ROLE_VALUE_LIGHT),
      darkRoles: makeStubRoleValues(STUB_ROLE_VALUE_DARK),
      radiusRem: DEFAULT_THEME_RADIUS,
    };

    const attempt = () => themeCss.buildThemeCss(input);

    expect(attempt).toThrowError(/500/);
  });
});

function makeInput(
  base: OKLCH,
  radiusRem: ThemeRadius = DEFAULT_THEME_RADIUS,
): ThemeCssInput {
  const generatedScale = scale.generateTonalScale(base);

  const input: ThemeCssInput = {
    baseOklch: base,
    scale: generatedScale,
    lightRoles: makeStubRoleValues(STUB_ROLE_VALUE_LIGHT),
    darkRoles: makeStubRoleValues(STUB_ROLE_VALUE_DARK),
    radiusRem,
  };
  return input;
}

function makeStubRoleValues(stubValue: string): ThemeRoleValues {
  const entries = ROLE_NAMES.map((roleName) => {
    const pair: readonly [ThemeRoleName, string] = [roleName, stubValue];
    return pair;
  });

  const stubRoleValues = Object.fromEntries(entries) as ThemeRoleValues;
  return stubRoleValues;
}

function extractBlock(
  document: string,
  openerToken: string,
  closerToken: string,
): string {
  const openerIndex = document.indexOf(openerToken);

  const isMissingOpener = openerIndex < 0;
  if (isMissingOpener) {
    throw new Error(`Missing opener ${openerToken}`);
  }

  const afterOpener = openerIndex + openerToken.length;
  const closerIndex = document.indexOf(closerToken, afterOpener);

  const isMissingCloser = closerIndex < 0;
  if (isMissingCloser) {
    throw new Error(`Missing closer ${closerToken}`);
  }

  const body = document.slice(afterOpener, closerIndex);
  return body;
}
