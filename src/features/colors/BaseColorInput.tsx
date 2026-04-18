import { useState, type ChangeEvent } from 'react';
import { parse } from '../../core/parse';
import type { BaseColor } from './view';

const INVALID_HEX_MESSAGE = 'invalid hex';
const HASH_PREFIX = '#';

const COLOR_PICKER_CLASS =
  'h-8 w-12 cursor-pointer rounded border border-stone-300 bg-transparent p-0';

const HEX_FIELD_CLASS = [
  'h-8 w-32 rounded border border-stone-300',
  'bg-white px-2 font-mono text-sm text-stone-900',
  'focus:border-stone-500 focus:outline-none',
].join(' ');

const FIELD_LABEL_CLASS =
  'font-mono text-[11px] uppercase tracking-widest text-stone-500';

const INVALID_HINT_CLASSNAME =
  'font-mono text-xs tracking-tight text-red-600';

type BaseColorInputProps = {
  value: BaseColor;
  onChange: (next: BaseColor) => void;
};

export function BaseColorInput(props: BaseColorInputProps) {
  const { value, onChange } = props;

  const [hexDraft, setHexDraft] = useState<string>(value.hex);

  const isDraftValid = parse.isValidHex(hexDraft);
  const shouldShowInvalidHint = !isDraftValid;

  function handleHexFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const nextDraft = event.target.value;
    setHexDraft(nextDraft);

    const parsedOklch = parse.parseHexToOklch(nextDraft);
    const isParsed = parsedOklch !== null;
    if (!isParsed) {
      return;
    }

    const normalizedHex = normalizeHex(nextDraft);
    const nextColor: BaseColor = { hex: normalizedHex, oklch: parsedOklch };
    onChange(nextColor);
  }

  function handlePickerChange(event: ChangeEvent<HTMLInputElement>) {
    const pickerHex = event.target.value;
    const parsedOklch = parse.parseHexToOklch(pickerHex);

    const isParsed = parsedOklch !== null;
    if (!isParsed) {
      return;
    }

    setHexDraft(pickerHex);
    const nextColor: BaseColor = { hex: pickerHex, oklch: parsedOklch };
    onChange(nextColor);
  }

  const view = (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-3">
        <span className={FIELD_LABEL_CLASS}>Base</span>
        <input
          type="color"
          value={value.hex}
          onChange={handlePickerChange}
          aria-label="Pick base color"
          className={COLOR_PICKER_CLASS}
        />
        <input
          type="text"
          value={hexDraft}
          onChange={handleHexFieldChange}
          aria-label="Base color hex"
          spellCheck={false}
          autoComplete="off"
          className={HEX_FIELD_CLASS}
        />
      </label>
      {shouldShowInvalidHint && (
        <p aria-live="polite" className={INVALID_HINT_CLASSNAME}>
          {INVALID_HEX_MESSAGE}
        </p>
      )}
    </div>
  );
  return view;
}

function normalizeHex(rawHex: string): string {
  const trimmed = rawHex.trim();
  const hasHashPrefix = trimmed.startsWith(HASH_PREFIX);
  
  const prefixed = hasHashPrefix ? trimmed : `${HASH_PREFIX}${trimmed}`;
  const lowered = prefixed.toLowerCase();
  
  return lowered;
}
