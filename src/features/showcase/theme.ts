import type { OKLCH } from '@/core/oklch';
import type { ScaleEntry, ScaleStop } from '@/core/scale';
import { format } from '@/core/format';

export type ShowcaseMode = 'light' | 'dark';

export type ShowcaseVariableName =
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

export type ShowcaseVariables = Record<ShowcaseVariableName, string>;

export type ShowcaseTheme = Record<ShowcaseMode, ShowcaseVariables>;

export type ShowcaseThemeInput = {
  scale: readonly ScaleEntry[];
  base: OKLCH;
};

type RoleToStopMap = Record<ShowcaseVariableName, ScaleStop>;

const LIGHT_ROLE_STOPS: RoleToStopMap = {
  '--background': 100,
  '--foreground': 950,
  '--card': 50,
  '--card-foreground': 950,
  '--popover': 50,
  '--popover-foreground': 950,
  '--primary': 600,
  '--primary-foreground': 50,
  '--secondary': 200,
  '--secondary-foreground': 900,
  '--muted': 100,
  '--muted-foreground': 500,
  '--accent': 200,
  '--accent-foreground': 900,
  '--border': 200,
  '--input': 200,
  '--ring': 500,
};

const DARK_ROLE_STOPS: RoleToStopMap = {
  '--background': 950,
  '--foreground': 50,
  '--card': 800,
  '--card-foreground': 50,
  '--popover': 700,
  '--popover-foreground': 50,
  '--primary': 400,
  '--primary-foreground': 950,
  '--secondary': 700,
  '--secondary-foreground': 50,
  '--muted': 900,
  '--muted-foreground': 400,
  '--accent': 700,
  '--accent-foreground': 50,
  '--border': 700,
  '--input': 700,
  '--ring': 400,
};

const MODE_STOP_STRATEGIES: Record<ShowcaseMode, RoleToStopMap> = {
  light: LIGHT_ROLE_STOPS,
  dark: DARK_ROLE_STOPS,
};

function buildShowcaseTheme(input: ShowcaseThemeInput): ShowcaseTheme {
  const lightVariables = buildVariablesForMode(input, 'light');
  const darkVariables = buildVariablesForMode(input, 'dark');

  const theme: ShowcaseTheme = { light: lightVariables, dark: darkVariables };
  return theme;
}

function buildVariablesForMode(
  input: ShowcaseThemeInput,
  mode: ShowcaseMode,
): ShowcaseVariables {
  const stopsByRole = MODE_STOP_STRATEGIES[mode];
  const roleNames = Object.keys(stopsByRole) as ShowcaseVariableName[];

  const entries = roleNames.map((roleName) => {
    const entry = buildVariableEntry(input, stopsByRole, roleName);
    return entry;
  });

  const variables = Object.fromEntries(entries) as ShowcaseVariables;
  return variables;
}

function buildVariableEntry(
  input: ShowcaseThemeInput,
  stopsByRole: RoleToStopMap,
  roleName: ShowcaseVariableName,
): readonly [ShowcaseVariableName, string] {
  const targetStop = stopsByRole[roleName];
  const scaleColor = resolveColorAtStop(input, targetStop);
  const formattedColor = format.formatOklch(scaleColor);

  const entry: readonly [ShowcaseVariableName, string] = [
    roleName,
    formattedColor,
  ];
  return entry;
}

function resolveColorAtStop(
  input: ShowcaseThemeInput,
  targetStop: ScaleStop,
): OKLCH {
  const matchingEntry = input.scale.find((entry) => entry.stop === targetStop);

  const hasMatch = matchingEntry !== undefined;
  if (hasMatch) {
    const resolved = matchingEntry.color;
    return resolved;
  }

  const fallback = input.base;
  return fallback;
}

export const showcaseTheme = {
  buildShowcaseTheme,
};
