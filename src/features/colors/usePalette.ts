import { useMemo, useState } from 'react';

import type { OKLCH } from '@/core/oklch';
import { harmony, type HarmonyKind } from '@/core/harmony';
import { parse } from '@/core/parse';
import { DEFAULT_THEME_RADIUS, type ThemeRadius } from '@/core/theme-radius';
import type { BaseColor, DisplayFormat } from './view';

const DEFAULT_BASE_HEX = '#3b82f6';
const DEFAULT_HARMONY: HarmonyKind = 'complementary';
const DEFAULT_FORMAT: DisplayFormat = 'hex';

export type PaletteController = {
  baseColor: BaseColor;
  harmonyKind: HarmonyKind;
  displayFormat: DisplayFormat;
  themeRadius: ThemeRadius;
  harmonyColors: OKLCH[];
  setBaseColor: (next: BaseColor) => void;
  setHarmonyKind: (next: HarmonyKind) => void;
  setDisplayFormat: (next: DisplayFormat) => void;
  setThemeRadius: (next: ThemeRadius) => void;
};

export function usePaletteController(): PaletteController {
  const [baseColor, setBaseColor] = useState<BaseColor>(buildInitialBaseColor);
  const [harmonyKind, setHarmonyKind] = useState<HarmonyKind>(DEFAULT_HARMONY);
  const [displayFormat, setDisplayFormat] =
    useState<DisplayFormat>(DEFAULT_FORMAT);
  const [themeRadius, setThemeRadius] = useState<ThemeRadius>(
    DEFAULT_THEME_RADIUS,
  );

  const harmonyColors = useMemo(
    () => harmony.generateHarmony(baseColor.oklch, harmonyKind),
    [baseColor.oklch, harmonyKind],
  );

  const controller: PaletteController = {
    baseColor,
    harmonyKind,
    displayFormat,
    themeRadius,
    harmonyColors,
    setBaseColor,
    setHarmonyKind,
    setDisplayFormat,
    setThemeRadius,
  };
  return controller;
}

function buildInitialBaseColor(): BaseColor {
  const parsedOklch = parse.parseHexToOklch(DEFAULT_BASE_HEX);
  const isParsed = parsedOklch !== null;

  if (!isParsed) {
    throw new Error(`Default base hex ${DEFAULT_BASE_HEX} is not parseable`);
  }

  const initial: BaseColor = { hex: DEFAULT_BASE_HEX, oklch: parsedOklch };
  return initial;
}
