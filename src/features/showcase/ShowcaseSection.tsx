import { useMemo } from 'react';

import { scale } from '@/core/scale';
import type { PaletteController } from '@/features/colors/usePalette';
import { RadiusControl } from '@/features/navbar/RadiusControl';

import { ShowcasePanel } from './ShowcasePanel';
import { showcaseTheme } from './theme';

type ShowcaseSectionProps = {
  palette: PaletteController;
};

const RADIUS_LABEL = 'Radius';
const RADIUS_LABEL_CLASSNAME =
  'font-mono text-[11px] uppercase tracking-widest text-stone-500';

export function ShowcaseSection(props: ShowcaseSectionProps) {
  const { palette } = props;
  const baseOklch = palette.baseColor.oklch;

  const theme = useMemo(() => {
    const tonalScale = scale.generateTonalScale(baseOklch);
    const built = showcaseTheme.buildShowcaseTheme({
      scale: tonalScale,
      base: baseOklch,
    });
    return built;
  }, [baseOklch]);

  const view = (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="flex w-full scroll-mt-12 flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h2
          id="showcase-heading"
          className="font-mono text-[11px] uppercase tracking-widest text-stone-500"
        >
          Showcase
        </h2>
        <p className="text-stone-600 italic">
          Shadcn components driven by the current palette, side by side in light and dark.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={RADIUS_LABEL_CLASSNAME}>{RADIUS_LABEL}</span>
        <RadiusControl
          value={palette.themeRadius}
          onChange={palette.setThemeRadius}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ShowcasePanel
          mode="light"
          variables={theme.light}
          radiusRem={palette.themeRadius}
        />
        <ShowcasePanel
          mode="dark"
          variables={theme.dark}
          radiusRem={palette.themeRadius}
        />
      </div>
    </section>
  );
  return view;
}
