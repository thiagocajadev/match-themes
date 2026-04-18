import type { OKLCH } from './oklch';
import type { ScaleEntry, ScaleStop } from './scale';
import { SCALE_STOPS } from './scale';
import { format } from './format';
import { themeRadius, type ThemeRadius } from './theme-radius';

export type ThemeRoleName =
  | '--background'
  | '--foreground'
  | '--card'
  | '--card-foreground'
  | '--popover'
  | '--popover-foreground'
  | '--primary'
  | '--primary-foreground'
  | '--secondary'
  | '--secondary-foreground'
  | '--muted'
  | '--muted-foreground'
  | '--accent'
  | '--accent-foreground'
  | '--border'
  | '--input'
  | '--ring';

export type ThemeRoleValues = Record<ThemeRoleName, string>;

export type ThemeCssInput = {
  baseOklch: OKLCH;
  scale: readonly ScaleEntry[];
  lightRoles: ThemeRoleValues;
  darkRoles: ThemeRoleValues;
  radiusRem: ThemeRadius;
};

const BRAND_SCALE_NAME = 'brand';
const BLOCK_SEPARATOR = '\n\n';
const LINE_SEPARATOR = '\n';
const INDENT = '  ';

const ROLE_ORDER: readonly ThemeRoleName[] = [
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

const RADIUS_TOKENS: ReadonlyArray<readonly [string, string]> = [
  ['--radius-sm', 'calc(var(--radius) - 4px)'],
  ['--radius-md', 'calc(var(--radius) - 2px)'],
  ['--radius-lg', 'var(--radius)'],
  ['--radius-xl', 'calc(var(--radius) + 4px)'],
];

function buildThemeCss(input: ThemeCssInput): string {
  const brandScaleBlock = buildBrandScaleBlock(input.scale);
  const rootBlock = buildRootBlock(input.lightRoles, input.radiusRem);
  const darkBlock = buildDarkBlock(input.darkRoles);
  const aliasBlock = buildAliasBlock();

  const sections = [brandScaleBlock, rootBlock, darkBlock, aliasBlock];
  const document = sections.join(BLOCK_SEPARATOR);

  const withTrailingNewline = `${document}${LINE_SEPARATOR}`;
  return withTrailingNewline;
}

function buildBrandScaleBlock(scaleEntries: readonly ScaleEntry[]): string {
  const orderedEntries = SCALE_STOPS.map((stop) =>
    findEntryForStop(scaleEntries, stop),
  );

  const declarationLines = orderedEntries.map((entry) => {
    const line = formatScaleDeclaration(entry);
    return line;
  });

  const indentedLines = declarationLines.map((line) => `${INDENT}${line}`);
  const body = indentedLines.join(LINE_SEPARATOR);

  const block = `@theme {${LINE_SEPARATOR}${body}${LINE_SEPARATOR}}`;
  return block;
}

function findEntryForStop(
  scaleEntries: readonly ScaleEntry[],
  stop: ScaleStop,
): ScaleEntry {
  const matching = scaleEntries.find((entry) => entry.stop === stop);

  const isMissing = matching === undefined;
  if (isMissing) {
    throw new Error(`Scale is missing required stop ${stop}`);
  }

  const resolved = matching;
  return resolved;
}

function formatScaleDeclaration(entry: ScaleEntry): string {
  const formattedColor = format.formatOklch(entry.color);
  const declaration = `--color-${BRAND_SCALE_NAME}-${entry.stop}: ${formattedColor};`;
  return declaration;
}

function buildRootBlock(
  lightRoles: ThemeRoleValues,
  radiusRem: ThemeRadius,
): string {
  const roleLines = buildRoleLines(lightRoles);

  const formattedRadius = themeRadius.formatRem(radiusRem);
  const radiusLine = `${INDENT}--radius: ${formattedRadius};`;

  const body = [radiusLine, ...roleLines].join(LINE_SEPARATOR);
  const block = `:root {${LINE_SEPARATOR}${body}${LINE_SEPARATOR}}`;
  return block;
}

function buildDarkBlock(darkRoles: ThemeRoleValues): string {
  const roleLines = buildRoleLines(darkRoles);
  const body = roleLines.join(LINE_SEPARATOR);

  const block = `.dark {${LINE_SEPARATOR}${body}${LINE_SEPARATOR}}`;
  return block;
}

function buildRoleLines(roles: ThemeRoleValues): string[] {
  const lines = ROLE_ORDER.map((roleName) => {
    const roleValue = roles[roleName];
    const declaration = `${INDENT}${roleName}: ${roleValue};`;
    return declaration;
  });
  return lines;
}

function buildAliasBlock(): string {
  const radiusLines = RADIUS_TOKENS.map(([tokenName, tokenValue]) => {
    const line = `${INDENT}${tokenName}: ${tokenValue};`;
    return line;
  });

  const colorAliasLines = ROLE_ORDER.map((roleName) => {
    const aliasName = toColorAliasName(roleName);
    const line = `${INDENT}${aliasName}: var(${roleName});`;
    return line;
  });

  const body = [...radiusLines, '', ...colorAliasLines].join(LINE_SEPARATOR);
  const block = `@theme inline {${LINE_SEPARATOR}${body}${LINE_SEPARATOR}}`;
  return block;
}

function toColorAliasName(roleName: ThemeRoleName): string {
  const withoutLeadingDashes = roleName.replace(/^--/, '');
  const aliasName = `--color-${withoutLeadingDashes}`;
  return aliasName;
}

export const themeCss = {
  buildThemeCss,
};
