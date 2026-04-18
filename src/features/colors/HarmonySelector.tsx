import { Fragment } from 'react';

import type { HarmonyKind } from '../../core/harmony';

const HARMONY_OPTIONS: ReadonlyArray<{ value: HarmonyKind; label: string }> = [
  { value: 'complementary', label: 'Complementary' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'splitComplementary', label: 'Split-Complementary' },
  { value: 'tetradic', label: 'Tetradic' },
  { value: 'square', label: 'Square' },
  { value: 'neutrals', label: 'Neutrals' },
];

const FIRST_ROW_BREAK_INDEX = 4;
const ROW_BREAK_CLASS = 'basis-full';

type HarmonySelectorProps = {
  value: HarmonyKind;
  onChange: (next: HarmonyKind) => void;
};

export function HarmonySelector(props: HarmonySelectorProps) {
  const { value, onChange } = props;

  const view = (
    <div
      role="radiogroup"
      aria-label="Harmony"
      className="flex flex-wrap gap-2 text-sm"
    >
      {HARMONY_OPTIONS.map((option, optionIndex) => {
        const isSelected = option.value === value;
        const optionClassName = buildOptionClassName(isSelected);
        const shouldBreakBefore = optionIndex === FIRST_ROW_BREAK_INDEX;

        return (
          <Fragment key={option.value}>
            {shouldBreakBefore && (
              <span aria-hidden="true" className={ROW_BREAK_CLASS} />
            )}
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={optionClassName}
            >
              {option.label}
            </button>
          </Fragment>
        );
      })}
    </div>
  );

  return view;
}

function buildOptionClassName(isSelected: boolean): string {
  const selectedStyle = 'border-stone-900 bg-stone-900 text-stone-50';
  const idleStyle =
    'border-stone-300 bg-white text-stone-700 hover:border-stone-500';
  const activeStyle = isSelected ? selectedStyle : idleStyle;

  const className = `inline-flex h-8 items-center justify-center cursor-pointer rounded-md border px-3 transition ${activeStyle}`;
  return className;
}
