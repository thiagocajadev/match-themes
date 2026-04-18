import { Button } from '@/components/ui/button';
import { format } from '@/core/format';
import { gamut } from '@/core/gamut';
import type { OKLCH } from '@/core/oklch';
import type { PaletteController } from '@/features/colors/usePalette';

type HeroSectionProps = {
  palette: PaletteController;
};

const PRIMARY_TARGET_ANCHOR = '#colors';
const MATCH_WORD = 'Match';
const THEMES_WORD = 'themes';
const HEADLINE_MIDDLE = ' colors. Ship ';
const HEADLINE_END = '.';
const LEDE =
  'Pick a base color, choose a harmony, and export a matched light + dark theme, contrast-checked, ready for Tailwind v4 and shadcn.';
const PRIMARY_CTA_LABEL = 'Build a palette';
const HARMONY_PAIR_INDEX = 1;

export function HeroSection(props: HeroSectionProps) {
  const { palette } = props;

  const matchColorHex = oklchToHex(palette.baseColor.oklch);
  const pairOklch = palette.harmonyColors[HARMONY_PAIR_INDEX] ?? palette.baseColor.oklch;
  const themesColorHex = oklchToHex(pairOklch);

  const view = (
    <section aria-labelledby="hero-heading" className="flex w-full flex-col gap-6">
      <h1
        id="hero-heading"
        className="font-display text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl"
      >
        <span style={{ color: matchColorHex }}>{MATCH_WORD}</span>
        {HEADLINE_MIDDLE}
        <span style={{ color: themesColorHex }}>{THEMES_WORD}</span>
        {HEADLINE_END}
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">{LEDE}</p>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button asChild size="lg">
          <a href={PRIMARY_TARGET_ANCHOR}>{PRIMARY_CTA_LABEL}</a>
        </Button>
      </div>
    </section>
  );

  return view;
}

function oklchToHex(color: OKLCH): string {
  const srgbClamped = gamut.oklchToSrgbClamped(color);
  const hex = format.formatHex(srgbClamped);
  return hex;
}
