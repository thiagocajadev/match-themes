import { oklch, type OKLCH, type SRGB } from './oklch';

const HEX_RADIX = 16;
const HEX_BYTE_PATTERN = /^[0-9a-f]{6}$/i;
const FULL_HEX_LENGTH = 6;
const SHORT_HEX_LENGTH = 3;
const HEX_CHARS_PER_BYTE = 2;
const HEX_RED_OFFSET = 0;
const HEX_GREEN_OFFSET = HEX_CHARS_PER_BYTE;
const HEX_BLUE_OFFSET = HEX_CHARS_PER_BYTE * 2;
const BYTE_MAX = 255;
const HASH_PREFIX = '#';

function parseHex(hex: string): SRGB | null {
  const cleaned = hex.replace(HASH_PREFIX, '').trim();
  const expanded = expandShortHex(cleaned);
  const isExpansionValid = isValidHexString(expanded);
  if (!isExpansionValid) {
    return null;
  }

  const srgb: SRGB = {
    red: hexByteToChannel(expanded, HEX_RED_OFFSET),
    green: hexByteToChannel(expanded, HEX_GREEN_OFFSET),
    blue: hexByteToChannel(expanded, HEX_BLUE_OFFSET),
  };
  return srgb;
}

function parseHexToOklch(hex: string): OKLCH | null {
  const srgb = parseHex(hex);
  if (srgb === null) {
    return null;
  }

  const oklchValue = oklch.srgbToOklch(srgb);
  return oklchValue;
}

function isValidHex(hex: string): boolean {
  const isParseable = parseHex(hex) !== null;
  return isParseable;
}

function hexByteToChannel(hex: string, byteOffset: number): number {
  const byteSlice = hex.slice(byteOffset, byteOffset + HEX_CHARS_PER_BYTE);
  const byteValue = parseInt(byteSlice, HEX_RADIX);
  const normalized = byteValue / BYTE_MAX;
  return normalized;
}

function expandShortHex(hex: string): string {
  const isShortForm = hex.length === SHORT_HEX_LENGTH;
  if (!isShortForm) {
    return hex;
  }

  const expanded = hex
    .split('')
    .map((char) => char + char)
    .join('');
  return expanded;
}

function isValidHexString(hex: string): boolean {
  const hasFullLength = hex.length === FULL_HEX_LENGTH;
  const matchesHexBytes = HEX_BYTE_PATTERN.test(hex);
  const isValid = hasFullLength && matchesHexBytes;
  return isValid;
}

export const parse = {
  parseHex,
  parseHexToOklch,
  isValidHex,
};
