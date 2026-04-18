import { BaseColorInput } from './BaseColorInput';
import { FormatToggle } from './FormatToggle';
import { HarmonyRow } from './HarmonyRow';
import { HarmonySelector } from './HarmonySelector';
import { TonalScaleGrid } from './TonalScaleGrid';
import type { PaletteController } from './usePalette';

type ColorsSectionProps = {
  palette: PaletteController;
};

const FORMAT_ROW_LABEL = 'Format';
const HARMONY_ROW_LABEL = 'Harmony';
const FIELD_LABEL_CLASS =
  'inline-flex h-8 items-center font-mono text-[11px] uppercase tracking-widest text-stone-500';
const HARMONY_WRAPPER_CLASS = 'max-w-full';

export function ColorsSection(props: ColorsSectionProps) {
  const { palette } = props;

  const view = (
    <section
      id="colors"
      aria-labelledby="colors-heading"
      className="flex w-full scroll-mt-12 flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h2
          id="colors-heading"
          className="font-mono text-[11px] uppercase tracking-widest text-stone-500"
        >
          Colors
        </h2>
        <p className="text-stone-600 italic">
          Select base, format and harmony. Click a swatch to copy.
        </p>
      </div>

      <div className="flex items-start gap-6">
        <BaseColorInput
          value={palette.baseColor}
          onChange={palette.setBaseColor}
        />
        <div className="flex items-start gap-3">
          <span className={FIELD_LABEL_CLASS}>{FORMAT_ROW_LABEL}</span>
          <FormatToggle
            value={palette.displayFormat}
            onChange={palette.setDisplayFormat}
          />
        </div>
        <div className="flex items-start gap-3">
          <span className={FIELD_LABEL_CLASS}>{HARMONY_ROW_LABEL}</span>
          <div className={HARMONY_WRAPPER_CLASS}>
            <HarmonySelector
              value={palette.harmonyKind}
              onChange={palette.setHarmonyKind}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <HarmonyRow
          colors={palette.harmonyColors}
          displayFormat={palette.displayFormat}
        />
        <TonalScaleGrid
          seedColors={palette.harmonyColors}
          displayFormat={palette.displayFormat}
        />
      </div>
    </section>
  );
  return view;
}
