import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { OKLCH } from '../../core/oklch';
import { gamut } from '../../core/gamut';
import { format } from '../../core/format';
import type { DisplayFormat } from './view';

const COPIED_FEEDBACK_DURATION_MS = 1500;
const COPIED_LABEL = 'Copied';
const OKLCH_FUNCTION_PREFIX = 'oklch(';
const OKLCH_FUNCTION_SUFFIX = ')';
const OKLCH_OPEN_PAREN = '(';
const OKLCH_FUNCTION_LABEL = 'OKLCH';
const OKLCH_LABEL_LIGHTNESS_SEPARATOR = ' - ';
const OKLCH_LIGHTNESS_FIELD_INDEX = 0;
const OKLCH_FIELD_SEPARATOR = ' ';

const SWATCH_BUTTON_CLASS = [
  'relative flex h-16 w-full items-end',
  'overflow-hidden rounded-md border border-stone-300 p-2',
  'cursor-pointer text-left font-mono text-[11px] tracking-tight',
  'transition focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500',
  'sm:h-20',
].join(' ');

const SWATCH_VALUE_CHIP_CLASS =
  'rounded bg-stone-950/70 px-1.5 py-0.5 text-stone-50';
const SWATCH_VALUE_CHIP_NOWRAP_CLASS = `${SWATCH_VALUE_CHIP_CLASS} whitespace-nowrap`;
const SWATCH_VALUE_CHIP_COMPACT_NOWRAP_CLASS =
  'rounded bg-stone-950/70 px-1 py-0.5 text-stone-50 whitespace-nowrap text-[9px]';

const SWATCH_LABEL_SLOT_CLASS =
  'absolute top-2 left-2 rounded bg-stone-50/85 px-1.5 py-0.5 text-stone-700';

const SWATCH_BADGE_SLOT_CLASS = 'absolute top-2 right-2';

type SwatchProps = {
  color: OKLCH;
  displayFormat: DisplayFormat;
  label?: string;
  badge?: ReactNode;
  keepValueOnOneLine?: boolean;
  useCompactValueFont?: boolean;
};

export function Swatch(props: SwatchProps) {
  const {
    color,
    displayFormat,
    label,
    badge,
    keepValueOnOneLine = false,
    useCompactValueFont = false,
  } = props;
  const valueChipClassName = pickValueChipClassName(
    keepValueOnOneLine,
    useCompactValueFont,
  );

  const [isCopied, setIsCopied] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const capturedRef = feedbackTimerRef;
    return () => {
      const pendingTimer = capturedRef.current;
      if (pendingTimer !== null) {
        clearTimeout(pendingTimer);
      }
    };
  }, []);

  const backgroundHex = computeBackgroundHex(color);
  const displayText = computeDisplayText(color, displayFormat);
  const hasLabel = label !== undefined;
  const hasBadge = badge !== undefined && badge !== null;

  const visibleText = isCopied ? COPIED_LABEL : displayText;
  const accessibleLabel = hasLabel
    ? `Copy ${label} ${displayText}`
    : `Copy ${displayText}`;

  const shouldSplitOklchValue =
    useCompactValueFont && displayFormat === 'oklch' && !isCopied;
  const oklchSplitParts = shouldSplitOklchValue
    ? splitOklchForDisplay(displayText)
    : null;

  function handleCopyClick() {
    const formatted = computeDisplayText(color, displayFormat);
    writeToClipboard(formatted);
    setIsCopied(true);
    restartFeedbackTimer(feedbackTimerRef, () => setIsCopied(false));
  }

  const view = (
    <button
      type="button"
      onClick={handleCopyClick}
      style={{ backgroundColor: backgroundHex }}
      className={SWATCH_BUTTON_CLASS}
      aria-label={accessibleLabel}
    >
      {hasLabel && <span className={SWATCH_LABEL_SLOT_CLASS}>{label}</span>}
      {hasBadge && <span className={SWATCH_BADGE_SLOT_CLASS}>{badge}</span>}
      <span className={valueChipClassName}>
        {oklchSplitParts !== null ? (
          <span className="flex flex-col leading-tight">
            <span>{oklchSplitParts.headerLine}</span>
            <span>{oklchSplitParts.parenthesizedLine}</span>
          </span>
        ) : (
          visibleText
        )}
      </span>
    </button>
  );

  return view;
}

function pickValueChipClassName(
  keepValueOnOneLine: boolean,
  useCompactValueFont: boolean,
): string {
  if (useCompactValueFont) {
    return SWATCH_VALUE_CHIP_COMPACT_NOWRAP_CLASS;
  }

  if (keepValueOnOneLine) {
    return SWATCH_VALUE_CHIP_NOWRAP_CLASS;
  }

  return SWATCH_VALUE_CHIP_CLASS;
}

type OklchSplitParts = {
  headerLine: string;
  parenthesizedLine: string;
};

function splitOklchForDisplay(fullOklchText: string): OklchSplitParts {
  const innerStart = OKLCH_FUNCTION_PREFIX.length;
  const innerEnd = fullOklchText.length - OKLCH_FUNCTION_SUFFIX.length;
  const innerText = fullOklchText.slice(innerStart, innerEnd);

  const innerFields = innerText.split(OKLCH_FIELD_SEPARATOR);
  const lightnessField = innerFields[OKLCH_LIGHTNESS_FIELD_INDEX] ?? '';
  const remainingFields = innerFields.slice(OKLCH_LIGHTNESS_FIELD_INDEX + 1);
  const remainingText = remainingFields.join(OKLCH_FIELD_SEPARATOR);

  const headerLine = `${OKLCH_FUNCTION_LABEL}${OKLCH_LABEL_LIGHTNESS_SEPARATOR}${lightnessField}`;
  const parenthesizedLine = `${OKLCH_OPEN_PAREN}${remainingText}${OKLCH_FUNCTION_SUFFIX}`;

  const splitParts: OklchSplitParts = {
    headerLine,
    parenthesizedLine,
  };
  return splitParts;
}

function computeBackgroundHex(color: OKLCH): string {
  const srgbClamped = gamut.oklchToSrgbClamped(color);
  const hex = format.formatHex(srgbClamped);
  return hex;
}

function computeDisplayText(color: OKLCH, displayFormat: DisplayFormat): string {
  if (displayFormat === 'oklch') {
    const oklchText = format.formatOklch(color);
    return oklchText;
  }

  const srgbClamped = gamut.oklchToSrgbClamped(color);
  if (displayFormat === 'hex') {
    const hexText = format.formatHex(srgbClamped);
    return hexText;
  }
  
  const rgbText = format.formatRgb(srgbClamped);
  return rgbText;
}

function writeToClipboard(text: string): void {
  const hasClipboardApi =
    typeof navigator !== 'undefined' && navigator.clipboard !== undefined;
  if (!hasClipboardApi) {
    return;
  }
  navigator.clipboard.writeText(text);
}

function restartFeedbackTimer(
  timerRef: React.RefObject<ReturnType<typeof setTimeout> | null>,
  onExpire: () => void,
): void {
  const existingTimer = timerRef.current;
  if (existingTimer !== null) {
    clearTimeout(existingTimer);
  }
  const nextTimer = setTimeout(onExpire, COPIED_FEEDBACK_DURATION_MS);
  timerRef.current = nextTimer;
}
