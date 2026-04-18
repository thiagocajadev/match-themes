import type { DisplayFormat } from './view';

const FORMAT_OPTIONS: ReadonlyArray<{ value: DisplayFormat; label: string }> = [
  { value: 'hex', label: 'HEX' },
  { value: 'rgb', label: 'RGB' },
  { value: 'oklch', label: 'OKLCH' },
];

type FormatToggleProps = {
  value: DisplayFormat;
  onChange: (next: DisplayFormat) => void;
};

export function FormatToggle(props: FormatToggleProps) {
  const { value, onChange } = props;

  const view = (
    <div
      role="radiogroup"
      aria-label="Display format"
      className="inline-flex h-8 items-stretch rounded-md border border-stone-200 bg-stone-100 text-xs font-mono"
    >
      {FORMAT_OPTIONS.map((option) => {
        const isSelected = option.value === value;
        const optionClassName = buildOptionClassName(isSelected);
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={optionClassName}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
  return view;
}

function buildOptionClassName(isSelected: boolean): string {
  const selectedStyle = 'bg-stone-900 text-stone-50';
  const idleStyle = 'text-stone-600 hover:text-stone-900';
  const activeStyle = isSelected ? selectedStyle : idleStyle;

  const className = `inline-flex items-center justify-center cursor-pointer rounded px-3 transition ${activeStyle}`;
  return className;
}
