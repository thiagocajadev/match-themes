import { Fragment } from 'react';

import { useLocale } from '@/i18n/LocaleContext';
import type { HarmonyKind } from '../../core/harmony';

type HarmonySelectorProps = {
  value: HarmonyKind;
  onChange: (next: HarmonyKind) => void;
};

const FIRST_ROW_BREAK_INDEX = 4;
const ROW_BREAK_CLASS = 'basis-full';

export function HarmonySelector(props: HarmonySelectorProps) {
  const { value, onChange } = props;
  const { t } = useLocale();

  const harmonyOptions: ReadonlyArray<{ value: HarmonyKind; label: string }> = [
    { value: 'complementary',     label: t.colors.harmony.complementary },
    { value: 'analogous',         label: t.colors.harmony.analogous },
    { value: 'triadic',           label: t.colors.harmony.triadic },
    { value: 'splitComplementary', label: t.colors.harmony.splitComplementary },
    { value: 'tetradic',          label: t.colors.harmony.tetradic },
    { value: 'square',            label: t.colors.harmony.square },
    { value: 'neutrals',          label: t.colors.harmony.neutrals },
  ];

  const view = (
    <div
      role="radiogroup"
      aria-label={t.colors.harmonyLabel}
      className="flex flex-wrap gap-2 text-sm"
    >
      {harmonyOptions.map((option, optionIndex) => {
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
  const idleStyle = 'border-stone-300 bg-white text-stone-700 hover:border-stone-500';
  const activeStyle = isSelected ? selectedStyle : idleStyle;

  const className = `inline-flex h-8 items-center justify-center cursor-pointer rounded-md border px-3 transition ${activeStyle}`;
  return className;
}
