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
    <div className="overflow-x-auto">
    <div className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] md:auto-cols-[minmax(0,1fr)] gap-2">
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
