import { contrast, type ContrastEvaluation } from '../../core/contrast';
import type { OKLCH } from '../../core/oklch';
import { scale, type ScaleEntry } from '../../core/scale';
import { ContrastBadge } from './ContrastBadge';
import { Swatch } from './Swatch';
import type { DisplayFormat } from './view';

const SCALE_COLUMN_COUNT_COMPACT = 11;

const COLUMN_COUNT_BY_FORMAT: Record<DisplayFormat, number> = {
  hex: SCALE_COLUMN_COUNT_COMPACT,
  rgb: SCALE_COLUMN_COUNT_COMPACT,
  oklch: SCALE_COLUMN_COUNT_COMPACT,
};

const COMPACT_VALUE_FONT_FORMATS: ReadonlySet<DisplayFormat> = new Set(['rgb', 'oklch']);

const WHITE_SURFACE: OKLCH = { lightness: 1, chroma: 0, hue: 0 };
const BLACK_SURFACE: OKLCH = { lightness: 0, chroma: 0, hue: 0 };
const WHITE_SURFACE_LABEL = 'white';
const BLACK_SURFACE_LABEL = 'black';

type TonalScaleGridProps = {
  seedColors: OKLCH[];
  displayFormat: DisplayFormat;
};

export function TonalScaleGrid(props: TonalScaleGridProps) {
  const { seedColors, displayFormat } = props;

  const view = (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-2 min-w-[1200px]">
      {seedColors.map((seedColor, rowIndex) => {
        const scaleEntries = scale.generateTonalScale(seedColor);
        const rowKey = buildRowKey(seedColor, rowIndex);
        return <TonalScaleRow key={rowKey} entries={scaleEntries} displayFormat={displayFormat} />;
      })}
      </div>
    </div>
  );

  return view;
}

type TonalScaleRowProps = {
  entries: ScaleEntry[];
  displayFormat: DisplayFormat;
};

function TonalScaleRow(props: TonalScaleRowProps) {
  const { entries, displayFormat } = props;

  const columnCount = COLUMN_COUNT_BY_FORMAT[displayFormat];
  const gridTemplate = `repeat(${columnCount}, minmax(0, 1fr))`;
  const shouldKeepValueOnOneLine = displayFormat !== 'hex';
  const shouldUseCompactValueFont = COMPACT_VALUE_FONT_FORMATS.has(displayFormat);

  const view = (
    <div className="grid gap-1" style={{ gridTemplateColumns: gridTemplate }}>
      {entries.map((entry) => {
        const stopLabel = String(entry.stop);
        const contrastPairing = pickBetterSurface(entry.color);
        const badge = (
          <ContrastBadge
            evaluation={contrastPairing.evaluation}
            surfaceLabel={contrastPairing.surfaceLabel}
          />
        );
        return (
          <Swatch
            key={entry.stop}
            color={entry.color}
            displayFormat={displayFormat}
            label={stopLabel}
            badge={badge}
            keepValueOnOneLine={shouldKeepValueOnOneLine}
            useCompactValueFont={shouldUseCompactValueFont}
          />
        );
      })}
    </div>
  );

  return view;
}

type SurfacePairing = {
  evaluation: ContrastEvaluation;
  surfaceLabel: string;
};

function pickBetterSurface(stopColor: OKLCH): SurfacePairing {
  const whiteEvaluation = contrast.evaluateContrast(stopColor, WHITE_SURFACE);
  const blackEvaluation = contrast.evaluateContrast(stopColor, BLACK_SURFACE);

  const isWhiteBetter = whiteEvaluation.ratio >= blackEvaluation.ratio;
  if (isWhiteBetter) {
    const whitePairing: SurfacePairing = {
      evaluation: whiteEvaluation,
      surfaceLabel: WHITE_SURFACE_LABEL,
    };
    return whitePairing;
  }

  const blackPairing: SurfacePairing = {
    evaluation: blackEvaluation,
    surfaceLabel: BLACK_SURFACE_LABEL,
  };

  return blackPairing;
}

function buildRowKey(seedColor: OKLCH, rowIndex: number): string {
  const key = `${rowIndex}-${seedColor.lightness.toFixed(3)}-${seedColor.hue.toFixed(1)}`;
  return key;
}
