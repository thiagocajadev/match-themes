import type { OKLCH } from '../../core/oklch';
import type { HarmonyKind } from '../../core/harmony';
import type { ScaleEntry } from '../../core/scale';

export type DisplayFormat = 'hex' | 'rgb' | 'oklch';

export type BaseColor = {
  hex: string;
  oklch: OKLCH;
};

export type HarmonyView = {
  kind: HarmonyKind;
  colors: OKLCH[];
};

export type ScaleView = {
  seedColor: OKLCH;
  entries: ScaleEntry[];
};
