import { ColorDots, HarmonyDots, NeutralDots, TonalScaleBar, type TheoryEntry } from './theory-visuals';

function ColorBar603010() {
  return (
    <div className="mt-5 space-y-4">
      <div className="flex h-16 w-full overflow-hidden rounded-xl border border-stone-200 shadow-sm">
        <div
          className="flex items-center justify-center text-base font-semibold text-stone-600"
          style={{ flexBasis: '60%', background: 'oklch(0.935 0.003 107)' }}
        >
          60%
        </div>
        <div
          className="flex items-center justify-center text-base font-semibold text-white"
          style={{ flexBasis: '30%', background: 'oklch(0.55 0.18 250deg)' }}
        >
          30%
        </div>
        <div
          className="flex items-center justify-center text-base font-semibold text-white"
          style={{ flexBasis: '10%', background: 'oklch(0.65 0.20 40deg)' }}
        >
          10%
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded" style={{ background: 'oklch(0.935 0.003 107)' }} />
          <span className="text-sm text-stone-600">Neutral — backgrounds, text, borders</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded" style={{ background: 'oklch(0.55 0.18 250deg)' }} />
          <span className="text-sm text-stone-600">Primary — buttons, links</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded" style={{ background: 'oklch(0.65 0.20 40deg)' }} />
          <span className="text-sm text-stone-600">Accent — badges, CTAs</span>
        </div>
      </div>
    </div>
  );
}

function TemperatureDemo() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <div
        className="rounded-xl p-5 text-center"
        style={{ background: 'oklch(0.93 0.06 40deg)' }}
      >
        <p className="text-base font-bold" style={{ color: 'oklch(0.35 0.12 40deg)' }}>
          Warm
        </p>
        <p className="mt-1 text-sm" style={{ color: 'oklch(0.48 0.10 40deg)' }}>
          H 0° to 60°
        </p>
      </div>
      <div
        className="rounded-xl p-5 text-center"
        style={{ background: 'oklch(0.93 0.05 250deg)' }}
      >
        <p className="text-base font-bold" style={{ color: 'oklch(0.35 0.10 250deg)' }}>
          Cool
        </p>
        <p className="mt-1 text-sm" style={{ color: 'oklch(0.48 0.08 250deg)' }}>
          H 180° to 280°
        </p>
      </div>
    </div>
  );
}

function SurfaceStack() {
  const layers = [
    { tag: 'S0', label: 'Background',       detail: 'L 0.985 — base page plane',  bg: '#f5f5f4', indent: 0, shadow: false },
    { tag: 'S1', label: 'Sidebar / Surface', detail: 'L 0.970 — side panels',      bg: '#e7e5e4', indent: 1, shadow: false },
    { tag: 'S2', label: 'Card',              detail: 'L 1.000 + soft shadow',       bg: '#ffffff', indent: 2, shadow: true  },
    { tag: 'S3', label: 'Popover / Modal',   detail: 'L 1.000 + deep shadow',       bg: '#ffffff', indent: 3, shadow: true  },
  ];

  return (
    <div className="mt-5 flex flex-col gap-2">
      {layers.map(({ tag, label, detail, bg, indent, shadow }) => (
        <div
          key={tag}
          className="flex items-center gap-4 rounded-xl border border-stone-200 px-4 py-3"
          style={{
            background: bg,
            marginLeft: indent * 16,
            boxShadow: shadow ? '0 2px 8px oklch(0 0 0 / 10%)' : 'none',
          }}
        >
          <span className="w-6 shrink-0 font-mono text-xs font-bold text-stone-400">{tag}</span>
          <span className="text-sm font-semibold text-stone-800 sm:text-base">{label}</span>
          <span className="ml-auto hidden text-xs text-stone-400 sm:block">{detail}</span>
        </div>
      ))}
    </div>
  );
}

function LightDarkDemo() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <div
        className="rounded-xl border border-stone-200 p-5"
        style={{ background: 'oklch(0.985 0.001 106)' }}
      >
        <p className="text-base font-semibold" style={{ color: 'oklch(0.216 0.006 106)' }}>
          Primary text
        </p>
        <p className="mt-2 text-sm" style={{ color: 'oklch(0.553 0.013 106)' }}>
          Secondary text
        </p>
        <span className="mt-3 block font-mono text-[10px] text-stone-400">Light — L 0.985</span>
      </div>
      <div className="rounded-xl p-5" style={{ background: 'oklch(0.165 0.006 106)' }}>
        <p className="text-base font-semibold" style={{ color: 'oklch(0.97 0.001 106)' }}>
          Primary text
        </p>
        <p className="mt-2 text-sm" style={{ color: 'oklch(0.709 0.01 106)' }}>
          Secondary text
        </p>
        <span
          className="mt-3 block font-mono text-[10px]"
          style={{ color: 'oklch(0.45 0.01 106)' }}
        >
          Dark — L 0.165
        </span>
      </div>
    </div>
  );
}

export const THEORY_ENTRIES_EN: TheoryEntry[] = [
  {
    id: 'color-theory',
    trigger: '01. Color Theory',
    body: (
      <div className="flex flex-col gap-6 text-base text-stone-700 sm:text-lg">
        <p>
          Color theory studies how humans perceive and interpret colors, how they interact with each
          other, and how they can be used to communicate and create meaning. At the heart of it all
          is the <strong>color wheel</strong>, organized into primary colors (red, yellow, blue),
          secondary colors (orange, green, violet), and tertiary colors, which combine a primary
          with an adjacent secondary.
        </p>
        <p>
          Each color carries three fundamental attributes: <strong>hue</strong> (the color's name
          on the wheel), <strong>chroma</strong> (the intensity or purity of the color), and{' '}
          <strong>lightness</strong> (how light or dark it is).
        </p>
        <p>
          Modern tools like this studio work in the <strong>OKLCH</strong> color space (Lightness,
          Chroma, Hue), which is perceptually uniform. A step of +0.10 in lightness appears
          visually the same jump regardless of hue. This is impossible in RGB or HSL, where colors
          with the same numerical "lightness" can appear much brighter or darker depending on the
          hue.
        </p>
        <p>
          The practical result: tonal scales generated in OKLCH are visually balanced, with
          predictable contrast between stops — an essential quality for accessible themes.
        </p>
        <ul className="flex flex-col gap-4 border-l-2 border-stone-200 pl-5">
          <li>
            <strong>Primary:</strong> red, yellow, blue. Cannot be obtained by mixing.
            <ColorDots hues={[25, 95, 260]} />
          </li>
          <li>
            <strong>Secondary:</strong> orange, green, violet. Result of mixing two primaries.
            <ColorDots hues={[55, 145, 305]} />
          </li>
          <li>
            <strong>Tertiary:</strong> yellow-green, blue-violet, etc. Combination of a primary
            with an adjacent secondary.
            <ColorDots hues={[125, 285]} />
          </li>
          <li>
            <strong>Warm vs. cool:</strong> reds and yellows evoke energy and action; blues and
            greens convey calm and trust.
            <ColorDots hues={[25, 55, 95]} />
            <ColorDots hues={[145, 200, 260]} />
          </li>
          <li>
            <strong>Color temperature:</strong> influences perception of distance and visual
            weight. Warm colors advance; cool ones recede.
            <ColorDots hues={[25, 55]} />
            <ColorDots hues={[200, 260]} />
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'harmonies',
    trigger: '02. Color Harmonies',
    body: (
      <div className="flex flex-col gap-6 text-base text-stone-700 sm:text-lg">
        <p>
          Harmonies are geometric relationships on the color wheel that produce cohesive palettes.
          Each harmony has a distinct personality and serves different contexts.
        </p>
        <p className="font-mono text-sm text-stone-400">Reference: H = 250° (blue)</p>

        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Complementary (180°)
            </h3>
            <p className="mt-3">
              Two colors opposite on the wheel. Produces maximum contrast and vibration, ideal for
              calls to action and highlights. Use the accent color sparingly (10 to 20% of the
              composition) or the result will feel aggressive.
            </p>
            <HarmonyDots hues={[250, 70]} labels={['Base 250°', 'Comp. 70°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Analogous (±30°)
            </h3>
            <p className="mt-3">
              Three neighboring colors on the wheel. Produces soft, natural, and harmonious
              palettes. Widely used in UIs to create depth without visual tension, ideal for
              backgrounds and surfaces.
            </p>
            <HarmonyDots hues={[220, 250, 280]} labels={['220°', '250°', '280°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Triadic (120°)
            </h3>
            <p className="mt-3">
              Three equidistant colors. Vibrant and balanced: gives variety without the shock of
              the complementary. Works well when one color dominates and the others act as accents.
            </p>
            <HarmonyDots hues={[250, 10, 130]} labels={['250°', '10°', '130°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Split-Complementary (150° / 210°)
            </h3>
            <p className="mt-3">
              A softened variation of the complementary: the base color plus the two colors
              adjacent to its complement. Maintains strong contrast with less tension. An excellent
              starting point for projects that need emphasis without looking flashy.
            </p>
            <HarmonyDots hues={[250, 40, 100]} labels={['250°', '40°', '100°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Tetradic / Rectangular (60° / 180° / 240°)
            </h3>
            <p className="mt-3">
              Four colors forming a rectangle on the wheel. Rich in possibilities, but requires
              clear hierarchy: define one dominant color, one supporting color, and use the other
              two sparingly. Without hierarchy, the palette looks chaotic.
            </p>
            <HarmonyDots hues={[250, 310, 70, 130]} labels={['250°', '310°', '70°', '130°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Square (90°)
            </h3>
            <p className="mt-3">
              Four equidistant colors (a square on the wheel). Even more varied than tetradic. Use
              only when you need very rich palettes and always reduce chroma in 2 or 3 of the 4
              colors to avoid overwhelming.
            </p>
            <HarmonyDots hues={[250, 340, 70, 160]} labels={['250°', '340°', '70°', '160°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Neutrals
            </h3>
            <p className="mt-3">
              Not a rotational harmony: these are lightness variations with minimal chroma derived
              from the base color. The result is subtly tinted grays, perfect for backgrounds,
              borders, and secondary text in professional-quality themes.
            </p>
            <NeutralDots />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'composition',
    trigger: '03. Color Composition',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          Color composition is the art of distributing colors in an interface so that the eye is
          guided, hierarchy is clear, and the whole feels pleasant. Three fundamental principles
          support good composition.
        </p>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            60-30-10 Rule
          </h3>
          <p className="mt-3">
            Distribute your colors in defined proportions: <strong>60%</strong> for the dominant
            color (usually neutrals or a softened primary), <strong>30%</strong> for the supporting
            color, and <strong>10%</strong> for the accent color. This proportion creates visual
            balance and directs attention to the right elements.
          </p>
          <ColorBar603010 />
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Visual Hierarchy
          </h3>
          <p className="mt-3">
            Colors with higher contrast attract the eye first. Use saturated, high-contrast colors
            on action elements (primary buttons, alerts) and neutral colors on supporting elements
            (borders, section backgrounds, secondary text).
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Lightness Contrast
          </h3>
          <p className="mt-3">
            Lightness contrast (L in OKLCH) is the main factor in readability. WCAG AA requires a
            minimum of 4.5:1 for normal text and 3:1 for large text. WCAG AAA requires 7:1 and
            4.5:1. In OKLCH, the difference in L between two stops is a direct predictor of
            contrast. This is why the 11-stop tonal scale in this studio generates safe
            combinations.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Temperature Contrast
          </h3>
          <p className="mt-3">
            Beyond lightness, temperature contrast (warm vs. cool) helps separate visual planes. A
            cool background with warm text creates separation even when lightnesses are close —
            useful for hover states and interactive elements.
          </p>
          <TemperatureDemo />
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            White Space as Color
          </h3>
          <p className="mt-3">
            Negative space (white or light neutral) is an active color in the composition. It
            creates breathing room, separates groups, and amplifies the perception of adjacent
            colors. Don't try to fill every space.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'wcag',
    trigger: '04. WCAG and Color Accessibility',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          WCAG (Web Content Accessibility Guidelines) is the international standard for web content
          accessibility, published by the W3C. The guidelines define measurable criteria to ensure
          interfaces are usable by people with visual, motor, or cognitive disabilities.
        </p>
        <p>
          The guidelines are organized into three conformance levels: <strong>A</strong> (minimum),{' '}
          <strong>AA</strong> (industry standard), and <strong>AAA</strong> (excellence). Most
          digital products aim for AA. AAA is only mandatory in high-criticality contexts, such as
          healthcare and government services.
        </p>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Criterion 1.4.3 — Minimum text contrast
          </h3>
          <p className="mt-3">
            The most relevant criterion for palette design. Defines the minimum ratio between the
            luminance of text and background.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {(
              [
                {
                  level: 'AA',
                  normal: '4.5 : 1',
                  note: 'Normal text (below 18pt or 14pt bold)',
                  bg: 'oklch(0.94 0.08 145deg)',
                  border: 'oklch(0.75 0.15 145deg)',
                  color: 'oklch(0.32 0.12 145deg)',
                },
                {
                  level: 'AAA',
                  normal: '7 : 1',
                  note: 'Elevated requirement for critical contexts',
                  bg: 'oklch(0.93 0.10 250deg)',
                  border: 'oklch(0.65 0.18 250deg)',
                  color: 'oklch(0.30 0.12 250deg)',
                },
                {
                  level: 'Large text',
                  normal: '3 : 1',
                  note: 'Above 18pt regular or 14pt bold',
                  bg: 'oklch(0.95 0.05 80deg)',
                  border: 'oklch(0.72 0.14 80deg)',
                  color: 'oklch(0.35 0.12 80deg)',
                },
              ] as const
            ).map(({ level, normal, note, bg, border, color }) => (
              <div
                key={level}
                className="flex flex-col gap-2 rounded-xl border p-5"
                style={{ background: bg, borderColor: border }}
              >
                <span className="font-mono text-sm font-bold" style={{ color }}>
                  {level}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold" style={{ color }}>
                    {normal}
                  </span>
                </div>
                <p className="text-sm" style={{ color }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            What is contrast ratio?
          </h3>
          <p className="mt-3">
            The ratio compares the relative luminance of two colors. Pure white (#fff) has
            luminance 1.0 and pure black (#000) has luminance 0. The maximum possible ratio is
            21:1 (white on black). A ratio of 4.5:1 means the lighter color is 4.5 times more
            luminous than the darker one.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            WCAG and OKLCH
          </h3>
          <p className="mt-3">
            The official contrast calculation (WCAG 2.x) uses luminance in sRGB, not OKLCH. Even
            so, OKLCH's perceptual uniformity makes tonal scales generated here highly predictable:
            stops separated by 4 or more positions tend to satisfy AA for most hues. The contrast
            badge on each swatch in this studio does the exact sRGB calculation to confirm.
          </p>
          <p className="mt-4">
            WCAG 3.0 (in development) should adopt the APCA (Advanced Perceptual Contrast
            Algorithm) method, which uses perceptual luminance close to OKLCH. Palettes generated
            in OKLCH are already aligned with this direction.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Beyond contrast
          </h3>
          <p className="mt-3">
            WCAG covers more than color: visible focus (1.4.11), text spacing (1.4.12), content on
            hover (1.4.13), and motion (2.3.3). For palettes, the most direct criteria are 1.4.3
            (text contrast), 1.4.6 (AAA contrast), and 1.4.11 (non-text component contrast, which
            requires 3:1).
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Accessibility and light/dark themes
          </h3>
          <p className="mt-3">
            Themes are directly related to accessibility. A well-built theme is not only
            aesthetically pleasing: it ensures that text, icons, and interactive components
            maintain adequate contrast in both modes, for any user, in any lighting condition.
          </p>
          <p className="mt-4">
            Match Themes checks WCAG contrast in real time on each swatch of the tonal scale. When
            exporting the theme to Tailwind v4 or shadcn, the generated tokens already carry the
            colors you visually validated here. If the AA and AAA badges are green on the stops you
            chose for text and background, the exported theme meets criterion 1.4.3 by construction,
            without the need for subsequent auditing.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'visual-density',
    trigger: '06. Visual Density and Layering in Themes',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          In modern design systems, an interface is composed of <strong>stacked layers</strong>.
          Each layer has a semantic function and an associated color. Understanding this structure
          is essential to creating consistent themes.
        </p>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Surface Hierarchy
          </h3>
          <p className="mt-3">
            The typical theme architecture has four levels: <strong>background</strong> (the
            deepest plane), <strong>card / surface</strong> (a panel elevated above the
            background), <strong>popover / overlay</strong> (floating above cards), and{' '}
            <strong>foreground</strong> (text and icons on top). Each level must have lightness
            clearly distinguishable from the previous one.
          </p>
          <SurfaceStack />
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Minimum Lightness Difference
          </h3>
          <p className="mt-3">
            For two adjacent surfaces to be perceived as distinct, the L difference in OKLCH must
            be at least <strong>0.05 to 0.08</strong> (equivalent to 1 or 2 stops on the tonal
            scale). Smaller differences create visual fog: the user doesn't perceive the separation
            of layers.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Density and Eye Strain
          </h3>
          <p className="mt-3">
            Interfaces with many saturated colors in proximity cause fatigue. The solution is to
            reduce chroma (saturation) of background colors and reserve high chroma for interactive
            and accent elements. In OKLCH, keeping chroma below 0.05 in backgrounds ensures
            neutrality without losing the palette's tonal character.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Shadows and Elevation
          </h3>
          <p className="mt-3">
            Shadows don't need to be pure black. Shadows tinted with the base palette color (a
            desaturated blue for a cool theme, for example) integrate better with the theme and
            look more natural. In dark mode, prefer lightness differences between surfaces over
            opaque shadows, which disappear on dark backgrounds.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'light-dark',
    trigger: '07. Making the Most of Light and Dark Themes',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          Creating a quality dark theme is not simply inverting the colors of the light theme.
          These are distinct strategies that require attention to how the human eye perceives light
          in each context.
        </p>

        <LightDarkDemo />

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Dark backgrounds are not black
          </h3>
          <p className="mt-3">
            Very dark backgrounds (L below 0.10 in OKLCH) create high contrast with any content
            and tire the eyes during extended use. The best dark themes use L between 0.12 and 0.18
            for the background: dark enough to feel dark, with enough air for the content to
            breathe.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Never use pure white in dark mode
          </h3>
          <p className="mt-3">
            Pure white text (#fff) on a dark background creates maximum contrast (21:1), more than
            necessary. This causes glare. Use an off-white with L between 0.92 and 0.97 for primary
            text and L between 0.60 and 0.75 for secondary text.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Saturate accent colors in dark mode
          </h3>
          <p className="mt-3">
            On dark backgrounds, accent colors need more lightness and a bit more chroma to stand
            out from the surface. A primary button color that works at L = 0.55 in light mode may
            need L = 0.65 to 0.70 in dark mode to maintain the same visual impact.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Subtle borders in dark mode
          </h3>
          <p className="mt-3">
            In light themes, borders with 15 to 20% opacity work well. In dark mode, opaque dark
            borders blend with the background. Use light borders with 8 to 12% opacity (like{' '}
            <code>oklch(1 0 0 / 10%)</code>) to separate cards without creating excessive visual
            weight.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Test in real conditions
          </h3>
          <p className="mt-3">
            Dark themes should be tested on screens with reduced brightness (like at night) and
            light themes at full brightness (under ambient light). Contrast that seems adequate on
            a developer's calibrated monitor may fail for users in different conditions.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'tips',
    trigger: '08. Practical Tonal Scale Composition Tips',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          The 11-stop tonal scale (50 to 950) generated in this studio is your main composition
          tool. Here are tested combinations and the reasoning behind each one.
        </p>

        <TonalScaleBar />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-stone-200 text-left">
                <th className="py-3 pr-4 text-sm font-semibold text-stone-900 sm:text-base">
                  Background
                </th>
                <th className="py-3 pr-4 text-sm font-semibold text-stone-900 sm:text-base">
                  Text / Element
                </th>
                <th className="py-3 text-sm font-semibold text-stone-900 sm:text-base">
                  Recommended use
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {(
                [
                  ['50',  '900',       'Primary text in light mode. Maximum contrast, highly readable.'],
                  ['50',  '600–700',   'Secondary text and metadata in light mode. Maintains hierarchy.'],
                  ['100', '800',       'Cards over a 50 background. Creates subtle elevation without changing the base color.'],
                  ['900', '50',        'Primary text in dark mode. Direct mirror of the light pair.'],
                  ['900', '300–400',   'Secondary text in dark mode. Softer than 50, less fatigue.'],
                  ['800', '100',       'Cards in dark mode over a 900 background. Elevation via brightening.'],
                  ['500', '50 or 950', 'Primary button. 500 is the chroma balance point, works in both themes.'],
                  ['200', '800',       'Informational badges and tags in light mode. Emphasis without aggression.'],
                ] as const
              ).map(([bg, fg, label], i) => (
                <tr key={i}>
                  <td className="py-3 pr-4 font-mono text-sm sm:text-base">{bg}</td>
                  <td className="py-3 pr-4 font-mono text-sm sm:text-base">{fg}</td>
                  <td className="py-3 text-sm sm:text-base">{label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Why does 50 on 900 work?
          </h3>
          <p className="mt-3">
            In OKLCH, stop 50 has L approximately 0.97 and stop 900 has L approximately 0.22. The
            difference of 0.75 produces WCAG contrast well above 7:1 (AAA) regardless of hue,
            thanks to OKLCH's perceptual uniformity.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Golden rule: skip at least 4 stops
          </h3>
          <p className="mt-3">
            To guarantee WCAG AA (4.5:1) for any hue, maintain a minimum difference of 4 stops
            between background and text (background 100 with text 500, background 400 with text
            800). For AAA, use a difference of 6 or more stops. Smaller differences may pass for
            some hues and fail for others.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(
              [
                { bg: [0.98, 0.01], fg: [0.15, 0.05], bgStop: '50',  fgStop: '900', label: 'AAA',  pass: true  },
                { bg: [0.96, 0.03], fg: [0.50, 0.14], bgStop: '100', fgStop: '600', label: 'AA',   pass: true  },
                { bg: [0.82, 0.09], fg: [0.60, 0.15], bgStop: '300', fgStop: '500', label: 'Fail', pass: false },
                { bg: [0.72, 0.12], fg: [0.60, 0.15], bgStop: '400', fgStop: '500', label: 'Fail', pass: false },
              ] as const
            ).map(({ bg, fg, bgStop, fgStop, label, pass }) => (
              <div
                key={bgStop + fgStop}
                className="flex flex-col overflow-hidden rounded-xl border"
                style={{ borderColor: pass ? 'oklch(0.75 0.15 145deg)' : 'oklch(0.75 0.18 25deg)' }}
              >
                <div
                  className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-6"
                  style={{ background: `oklch(${bg[0]} ${bg[1]} 250deg)` }}
                >
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: `oklch(${fg[0]} ${fg[1]} 250deg)` }}
                  >
                    Text
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: `oklch(${fg[0]} ${fg[1]} 250deg)` }}
                  >
                    {bgStop} / {fgStop}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between px-3 py-2 text-xs font-semibold"
                  style={{
                    background: pass ? 'oklch(0.95 0.06 145deg)' : 'oklch(0.95 0.06 25deg)',
                    color: pass ? 'oklch(0.35 0.12 145deg)' : 'oklch(0.40 0.15 25deg)',
                  }}
                >
                  <span>{label}</span>
                  <span>{pass ? '✓' : '✗'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Stop 500: the most versatile
          </h3>
          <p className="mt-3">
            Stop 500 is the center of the scale and usually has L approximately 0.55, the point
            where chroma tends to peak. It is the natural choice for the interactive accent color:
            it has strong identity and contrasts well with both white (high stops) and black (low
            stops).
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Watch out for yellow and cyan hues
          </h3>
          <p className="mt-3">
            Yellow and cyan have high perceived luminance even at moderate L values. Always test
            contrast with the tool. These hues can look visually light while the OKLCH number
            indicates sufficient darkness.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col overflow-hidden rounded-xl border border-red-200">
              <div
                className="flex flex-col items-center justify-center gap-1 px-4 py-8"
                style={{ background: 'oklch(0.60 0.20 95deg)' }}
              >
                <span className="font-mono text-base font-bold" style={{ color: 'oklch(0.97 0.01 95deg)' }}>
                  Light text
                </span>
                <span className="font-mono text-xs" style={{ color: 'oklch(0.97 0.01 95deg)' }}>
                  Looks readable?
                </span>
              </div>
              <div className="flex items-center justify-between bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
                <span>Yellow L 0.60 — fails AA</span>
                <span>✗</span>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl border border-red-200">
              <div
                className="flex flex-col items-center justify-center gap-1 px-4 py-8"
                style={{ background: 'oklch(0.60 0.18 200deg)' }}
              >
                <span className="font-mono text-base font-bold" style={{ color: 'oklch(0.97 0.01 200deg)' }}>
                  Light text
                </span>
                <span className="font-mono text-xs" style={{ color: 'oklch(0.97 0.01 200deg)' }}>
                  Looks readable?
                </span>
              </div>
              <div className="flex items-center justify-between bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
                <span>Cyan L 0.60 — fails AA</span>
                <span>✗</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-stone-500">
            Both use L 0.60 — the same lightness as blue (H 250°) which passes AA comfortably.
            Yellow and cyan have much higher sRGB luminance at that L, which reduces contrast
            against white below 4.5:1.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'references',
    trigger: '09. References',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          Recommended resources to deepen your knowledge of color, accessibility, and design
          systems.
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-display mb-4 text-lg font-bold text-stone-900 sm:text-xl">
              Color spaces and OKLCH
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://oklch.com" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  oklch.com
                </a>
                <span className="mt-1 block text-stone-500">
                  Interactive OKLCH picker with real-time conversion and P3 gamut visualization
                </span>
              </li>
              <li>
                <a href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Evil Martians — OKLCH in CSS: why quit RGB &amp; HSL
                </a>
                <span className="mt-1 block text-stone-500">
                  Detailed technical article on why OKLCH is superior for design systems
                </span>
              </li>
              <li>
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  MDN — CSS oklch()
                </a>
                <span className="mt-1 block text-stone-500">
                  Official reference for the oklch() function in CSS
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-lg font-bold text-stone-900 sm:text-xl">
              Accessibility and contrast
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  WCAG 2.2 — Criterion 1.4.3: Contrast (Minimum)
                </a>
                <span className="mt-1 block text-stone-500">
                  Official specification of the AA criterion (4.5:1)
                </span>
              </li>
              <li>
                <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  WebAIM Contrast Checker
                </a>
                <span className="mt-1 block text-stone-500">
                  Online tool to check contrast between two colors
                </span>
              </li>
              <li>
                <a href="https://accessibilityinsights.io/docs/web/overview/" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Accessibility Insights for Web
                </a>
                <span className="mt-1 block text-stone-500">
                  Extension for accessibility auditing in real interfaces
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-lg font-bold text-stone-900 sm:text-xl">
              Theory and tools
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://color.adobe.com/pt/create/color-wheel" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Adobe Color — Color Wheel
                </a>
                <span className="mt-1 block text-stone-500">
                  Interactive harmony explorer with export to Illustrator and Photoshop
                </span>
              </li>
              <li>
                <a href="https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1-the-meaning-of-color/" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Smashing Magazine — Color Theory for Designers
                </a>
                <span className="mt-1 block text-stone-500">
                  Classic 3-part series covering meaning, temperature, and palette creation
                </span>
              </li>
              <li>
                <a href="https://m3.material.io/styles/color/system/overview" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Material Design 3 — Color System
                </a>
                <span className="mt-1 block text-stone-500">
                  How Google organizes its color token system for dark and light support
                </span>
              </li>
              <li>
                <a href="https://www.refactoringui.com" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Refactoring UI
                </a>
                <span className="mt-1 block text-stone-500">
                  Practical guide by Tailwind CSS creators with a dedicated chapter on palettes and
                  contrast
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-lg font-bold text-stone-900 sm:text-xl">
              Tailwind v4 and shadcn
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://tailwindcss.com/docs/colors" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Tailwind CSS v4 — Colors
                </a>
                <span className="mt-1 block text-stone-500">
                  Official documentation for colors and OKLCH usage in Tailwind v4
                </span>
              </li>
              <li>
                <a href="https://ui.shadcn.com/themes" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  shadcn/ui — Themes
                </a>
                <span className="mt-1 block text-stone-500">
                  Color token reference used by shadcn and how to customize the theme
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
];
