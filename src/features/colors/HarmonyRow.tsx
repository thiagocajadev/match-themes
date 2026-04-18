import type { OKLCH } from '../../core/oklch';
import { Swatch } from './Swatch';
import type { DisplayFormat } from './view';

type HarmonyRowProps = {
  colors: OKLCH[];
  displayFormat: DisplayFormat;
};

export function HarmonyRow(props: HarmonyRowProps) {
  const { colors, displayFormat } = props;

  const view = (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {colors.map((color, position) => {
        const positionLabel = buildPositionLabel(position);
        const swatchKey = buildSwatchKey(color, position);
        return (
          <Swatch
            key={swatchKey}
            color={color}
            displayFormat={displayFormat}
            label={positionLabel}
            keepValueOnOneLine
          />
        );
      })}
    </div>
  );
  
  return view;
}

function buildPositionLabel(position: number): string {
  const humanIndex = position + 1;
  const label = `#${humanIndex}`;
  return label;
}

function buildSwatchKey(color: OKLCH, position: number): string {
  const key = `${position}-${color.lightness.toFixed(3)}-${color.hue.toFixed(1)}`;
  return key;
}
