import { describe, expect, it } from 'vitest';

import { parse } from './parse';

const BYTE_MAX = 255;

describe('parseHex', () => {
  it('should parse a 6-digit hex with hash prefix into normalized sRGB channels', () => {
    const inputHex = '#0ea5e9';
    const expected = { red: 0x0e / BYTE_MAX, green: 0xa5 / BYTE_MAX, blue: 0xe9 / BYTE_MAX };

    const actual = parse.parseHex(inputHex);

    expect(actual).toEqual(expected);
  });

  it('should parse a 6-digit hex without hash prefix', () => {
    const inputHex = 'ff0000';
    const expected = { red: 1, green: 0, blue: 0 };

    const actual = parse.parseHex(inputHex);

    expect(actual).toEqual(expected);
  });

  it('should expand 3-digit hex to its 6-digit equivalent', () => {
    const inputShort = '#f0a';
    const expected = parse.parseHex('#ff00aa');

    const actual = parse.parseHex(inputShort);

    expect(actual).toEqual(expected);
  });

  it('should accept uppercase hex digits', () => {
    const inputUpper = '#FFFFFF';
    const expected = { red: 1, green: 1, blue: 1 };

    const actual = parse.parseHex(inputUpper);

    expect(actual).toEqual(expected);
  });

  it('should trim surrounding whitespace before parsing', () => {
    const inputPadded = '  #000000  ';
    const expected = { red: 0, green: 0, blue: 0 };

    const actual = parse.parseHex(inputPadded);

    expect(actual).toEqual(expected);
  });

  it('should return null for malformed input', () => {
    const malformedSamples = ['', '#', '#zzz', '#12345', 'rgb(0,0,0)', 'not-a-hex'];

    for (const sample of malformedSamples) {
      const actual = parse.parseHex(sample);
      expect(actual).toBeNull();
    }
  });
});

describe('parseHexToOklch', () => {
  it('should convert a valid hex into an OKLCH triple', () => {
    const inputHex = '#0ea5e9';

    const actual = parse.parseHexToOklch(inputHex);

    expect(actual).not.toBeNull();
    expect(actual?.lightness).toBeGreaterThan(0);
    expect(actual?.lightness).toBeLessThan(1);
    expect(actual?.chroma).toBeGreaterThan(0);
    expect(actual?.hue).toBeGreaterThanOrEqual(0);
    expect(actual?.hue).toBeLessThan(360);
  });

  it('should return null when the hex is invalid', () => {
    const inputInvalid = '#zzz';

    const actual = parse.parseHexToOklch(inputInvalid);

    expect(actual).toBeNull();
  });
});

describe('isValidHex', () => {
  it('should return true for accepted hex shapes', () => {
    const acceptedSamples = ['#000000', '#fff', 'abcdef', '#0EA5E9'];

    for (const sample of acceptedSamples) {
      const actual = parse.isValidHex(sample);
      expect(actual).toBe(true);
    }
  });

  it('should return false for rejected hex shapes', () => {
    const rejectedSamples = ['', '#zz', '12345', '#1234567'];

    for (const sample of rejectedSamples) {
      const actual = parse.isValidHex(sample);
      expect(actual).toBe(false);
    }
  });
});
