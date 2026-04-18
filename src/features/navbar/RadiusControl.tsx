import { THEME_RADII, themeRadius, type ThemeRadius } from '@/core/theme-radius';

type RadiusControlProps = {
  value: ThemeRadius;
  onChange: (next: ThemeRadius) => void;
};

type RadiusOption = {
  value: ThemeRadius;
  shortLabel: string;
  ariaLabel: string;
};

const SHARP_SHORT_LABEL = '0';
const NUMERIC_LOCALE = 'en-US';

const CONTAINER_CLASS =
  'inline-flex rounded-md border border-stone-300 bg-stone-100 p-0.5 text-xs font-mono';
const OPTION_BASE_CLASS = 'cursor-pointer rounded px-2.5 py-1 transition';
const OPTION_SELECTED_CLASS = 'bg-stone-900 text-stone-50';
const OPTION_IDLE_CLASS = 'text-stone-600 hover:text-stone-900';

const RADIUS_OPTIONS: readonly RadiusOption[] = THEME_RADII.map((candidate) => {
  const shortLabel = buildShortLabel(candidate);
  const ariaLabel = `Radius ${themeRadius.formatRem(candidate)}`;

  const option: RadiusOption = { value: candidate, shortLabel, ariaLabel };
  return option;
});

export function RadiusControl(props: RadiusControlProps) {
  const { value, onChange } = props;

  const view = (
    <div role="radiogroup" aria-label="Theme radius" className={CONTAINER_CLASS}>
      {RADIUS_OPTIONS.map((option) => {
        const isSelected = option.value === value;
        const optionClassName = buildOptionClassName(isSelected);

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.ariaLabel}
            onClick={() => onChange(option.value)}
            className={optionClassName}
          >
            {option.shortLabel}
          </button>
        );
      })}
    </div>
  );
  return view;
}

function buildShortLabel(value: ThemeRadius): string {
  const isSharp = value === 0;
  if (isSharp) {
    return SHARP_SHORT_LABEL;
  }

  const shortLabel = value.toLocaleString(NUMERIC_LOCALE);
  return shortLabel;
}

function buildOptionClassName(isSelected: boolean): string {
  const stateClass = isSelected ? OPTION_SELECTED_CLASS : OPTION_IDLE_CLASS;

  const className = `${OPTION_BASE_CLASS} ${stateClass}`;
  return className;
}
