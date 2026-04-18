import { Button } from '@/components/ui/button';
import { format } from '@/core/format';
import { gamut } from '@/core/gamut';
import type { OKLCH } from '@/core/oklch';
import type { PaletteController } from '@/features/colors/usePalette';
import { useLocale } from '@/i18n/LocaleContext';

type HeroSectionProps = {
  palette: PaletteController;
};

const PRIMARY_TARGET_ANCHOR = '#colors';
const HARMONY_PAIR_INDEX = 1;

export function HeroSection(props: HeroSectionProps) {
  const { palette } = props;
  const { t } = useLocale();

  const matchColorHex = oklchToHex(palette.baseColor.oklch);
  const pairOklch = palette.harmonyColors[HARMONY_PAIR_INDEX] ?? palette.baseColor.oklch;
  const themesColorHex = oklchToHex(pairOklch);

  const view = (
    <section aria-labelledby="hero-heading" className="flex w-full flex-col gap-6">
      <h1
        id="hero-heading"
        className="font-display text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl"
      >
        <span style={{ color: matchColorHex }}>{t.hero.matchWord}</span>
        {t.hero.headlineMiddle}
        <span style={{ color: themesColorHex }}>{t.hero.themesWord}</span>
        {t.hero.headlineEnd}
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
        {t.hero.lede}
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button asChild size="lg">
          <a href={PRIMARY_TARGET_ANCHOR}>{t.hero.cta}</a>
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
