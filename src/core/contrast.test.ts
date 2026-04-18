import { describe, expect, it } from 'vitest';

import { contrast } from './contrast';
import type { OKLCH } from './oklch';
import { parse } from './parse';

const CLOSE_TO_DECIMALS = 1;
const RATIO_EQUAL_DECIMALS = 6;

function oklchFromHex(hex: string): OKLCH {
  const parsed = parse.parseHexToOklch(hex);
  const isParsed = parsed !== null;
  if (!isParsed) {
    throw new Error(`Unparseable hex ${hex}`);
  }
  return parsed;
}

const blackColor = oklchFromHex('#000000');
const whiteColor = oklchFromHex('#ffffff');
const wcagReferenceGrey = oklchFromHex('#767676');
const largeOnlyGrey = oklchFromHex('#949494');
const aaaGrey = oklchFromHex('#595959');

describe('relativeLuminance', () => {
  it('should return 1 for pure white', () => {
    const expected = 1;

    const actual = contrast.relativeLuminance(whiteColor);

    expect(actual).toBeCloseTo(expected, CLOSE_TO_DECIMALS);
  });

  it('should return 0 for pure black', () => {
    const expected = 0;

    const actual = contrast.relativeLuminance(blackColor);

    expect(actual).toBeCloseTo(expected, CLOSE_TO_DECIMALS);
  });
});

describe('contrastRatio', () => {
  it('should return 21 for black on white (WCAG maximum)', () => {
    const expectedRatio = 21;

    const actual = contrast.contrastRatio(blackColor, whiteColor);

    expect(actual).toBeCloseTo(expectedRatio, CLOSE_TO_DECIMALS);
  });

  it('should match the WCAG 2.x reference pair #767676 on #ffffff', () => {
    const expectedRatio = 4.54;

    const actual = contrast.contrastRatio(wcagReferenceGrey, whiteColor);

    expect(actual).toBeCloseTo(expectedRatio, CLOSE_TO_DECIMALS);
  });

  it('should return exactly 1 when both colors are identical', () => {
    const expectedRatio = 1;

    const actual = contrast.contrastRatio(whiteColor, whiteColor);

    expect(actual).toBeCloseTo(expectedRatio, RATIO_EQUAL_DECIMALS);
  });

  it('should be symmetric — order of foreground and background does not change the ratio', () => {
    const forwardRatio = contrast.contrastRatio(blackColor, whiteColor);
    const reverseRatio = contrast.contrastRatio(whiteColor, blackColor);

    expect(forwardRatio).toBeCloseTo(reverseRatio, RATIO_EQUAL_DECIMALS);
  });
});

describe('evaluateContrast', () => {
  it('should label the black-on-white pair as AAA with all flags true', () => {
    const evaluation = contrast.evaluateContrast(blackColor, whiteColor);

    expect(evaluation.level).toBe('AAA');
    expect(evaluation.passesAaaNormal).toBe(true);
    expect(evaluation.passesAaaLarge).toBe(true);
    expect(evaluation.passesAaNormal).toBe(true);
    expect(evaluation.passesAaLarge).toBe(true);
  });

  it('should label the #595959 on white pair as AAA (ratio ~7.0)', () => {
    const evaluation = contrast.evaluateContrast(aaaGrey, whiteColor);

    expect(evaluation.level).toBe('AAA');
    expect(evaluation.passesAaaNormal).toBe(true);
  });

  it('should label the WCAG reference pair as AA (ratio ~4.54)', () => {
    const evaluation = contrast.evaluateContrast(wcagReferenceGrey, whiteColor);

    expect(evaluation.level).toBe('AA');
    expect(evaluation.passesAaNormal).toBe(true);
    expect(evaluation.passesAaaNormal).toBe(false);
  });

  it('should label the #949494 on white pair as AA_LARGE (ratio ~3.0)', () => {
    const evaluation = contrast.evaluateContrast(largeOnlyGrey, whiteColor);

    expect(evaluation.level).toBe('AA_LARGE');
    expect(evaluation.passesAaLarge).toBe(true);
    expect(evaluation.passesAaNormal).toBe(false);
  });

  it('should label identical colors as FAIL with every flag false', () => {
    const evaluation = contrast.evaluateContrast(whiteColor, whiteColor);

    expect(evaluation.level).toBe('FAIL');
    expect(evaluation.passesAaLarge).toBe(false);
    expect(evaluation.passesAaNormal).toBe(false);
    expect(evaluation.passesAaaLarge).toBe(false);
    expect(evaluation.passesAaaNormal).toBe(false);
  });
});
