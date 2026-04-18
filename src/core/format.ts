import type { OKLCH, SRGB } from './oklch';

export type Format = 'hex' | 'rgb' | 'oklch';

const HASH_PREFIX = '#';
const HEX_RADIX = 16;
const HEX_BYTE_PAD_WIDTH = 2;
const HEX_PAD_CHAR = '0';
const BYTE_MAX = 255;
const CHANNEL_MIN = 0;
const CHANNEL_MAX = 1;
const LIGHTNESS_PERCENT_SCALE = 100;
const LIGHTNESS_DECIMAL_PLACES = 2;
const CHROMA_DECIMAL_PLACES = 4;
const HUE_DECIMAL_PLACES = 2;

function formatHex(srgb: SRGB): string {
  const redByte = toHexByte(srgb.red);
  const greenByte = toHexByte(srgb.green);
  const blueByte = toHexByte(srgb.blue);
  const formatted = `${HASH_PREFIX}${redByte}${greenByte}${blueByte}`;
  return formatted;
}

function formatRgb(srgb: SRGB): string {
  const red = scaleToByte(srgb.red);
  const green = scaleToByte(srgb.green);
  const blue = scaleToByte(srgb.blue);
  const formatted = `rgb(${red} ${green} ${blue})`;
  return formatted;
}

function formatOklch(color: OKLCH): string {
  const lightnessAsPercent = color.lightness * LIGHTNESS_PERCENT_SCALE;
  const lightnessText = lightnessAsPercent.toFixed(LIGHTNESS_DECIMAL_PLACES);
  const chromaText = color.chroma.toFixed(CHROMA_DECIMAL_PLACES);
  const hueText = color.hue.toFixed(HUE_DECIMAL_PLACES);
  const formatted = `oklch(${lightnessText}% ${chromaText} ${hueText})`;
  return formatted;
}

function toHexByte(channel: number): string {
  const byteValue = scaleToByte(channel);
  const hexString = byteValue.toString(HEX_RADIX);
  const padded = hexString.padStart(HEX_BYTE_PAD_WIDTH, HEX_PAD_CHAR);
  return padded;
}

function scaleToByte(channel: number): number {
  const bounded = clampChannel(channel);
  const scaled = bounded * BYTE_MAX;
  const rounded = Math.round(scaled);
  return rounded;
}

function clampChannel(channel: number): number {
  const bounded = Math.max(CHANNEL_MIN, Math.min(CHANNEL_MAX, channel));
  return bounded;
}

export const format = {
  formatHex,
  formatRgb,
  formatOklch,
};
