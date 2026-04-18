# Match Themes

OKLCH-first palette studio that exports straight to Tailwind v4 and shadcn.

Pick a base color, choose a harmony, and ship a luminance-balanced ramp with
contrast-checked light and dark themes — ready to paste into your stylesheet.

---

## Color Formats

| Format | Full name | What it describes |
| :--- | :--- | :--- |
| **HEX** | Hexadecimal | RGB encoded in base 16. `#ff6b35` = red 255, green 107, blue 53. Universally accepted by browsers, CSS, and design tools — but carries no information about human perception. |
| **RGB** | Red, Green, Blue | The three light channels monitors emit. Intuitive for developers, but mathematically non-uniform: adding 10 to the `G` channel in a dark tone looks like more than the same increment in a light tone. |
| **OKLCH** | Optical Lightness, Chroma, Hue | A perceptually uniform color space. Its three axes map what the human eye actually perceives. |

OKLCH axes:

| Axis | What it controls | Range |
| :--- | :--- | :--- |
| `L` Lightness | How bright it appears to the eye | `0` = black · `1` = white |
| `C` Chroma | Intensity / saturation | `0` = gray · `0.4` = vivid |
| `H` Hue | Angle on the color wheel | `0°` = red · `270°` = purple |

---

## Why OKLCH

HSL produces lightness drift across hues: a `slate-500` and a `yellow-500` look
like different brightness levels even though the L value is identical. OKLCH
fixes this by working in a perceptually uniform color space, so a tonal scale
keeps consistent contrast as the hue rotates.

Match Themes works in OKLCH end to end. Hex and RGB only appear at the render
boundary.

---

## Features

| Feature | Detail |
| :--- | :--- |
| **7 harmonies** | Complementary · split-complementary · triadic · tetradic · analogous · monochromatic · square |
| **11-stop tonal scale** | Stops 50 → 950 per harmony color, generated from the base via OKLCH lightness curve |
| **WCAG contrast badges** | AA / AAA level per swatch — evaluated against both white and black, best pairing wins |
| **`--radius` control** | 6 presets (sharp → pill); live in both showcase panels and in the exported CSS |
| **Side-by-side showcase** | shadcn components rendered in light and dark, scoped CSS variables per panel |
| **Tailwind v4 export** | `@theme` block · `:root` role tokens · `.dark` overrides · copy or download as `match-themes.css` |

---

## Design Thinking

### Inspiration

The layout is inspired by [tweakcn](https://tweakcn.com) — a sticky navbar that
keeps palette controls always reachable, a collapsible showcase so the color
grid stays front and center, and export as a modal so the workflow ends where it
started.

### The product demonstrates itself

The hero headline — *Match colors. Ship themes.* — is not static. The word
**Match** is painted with the active base color and **themes** with the second
harmony color. Switching the harmony selector repaints the headline live. The
app is its own pitch.

### Closed loop

Most palette tools stop at swatch generation. Match Themes closes the
chose → tested → applied loop natively: pick a color, verify contrast on real
shadcn components, copy a ready-to-paste `@theme` block. No intermediate
conversion step, no manual variable mapping.

---

## Typography

| Role | Family | Usage |
| :--- | :--- | :--- |
| Display | Libre Baskerville | `h1`–`h6`, `.font-display` — editorial weight for headings |
| Body | Rosario | `html, body` — legible sans for prose and UI copy |
| Mono | JetBrains Mono | `code`, `pre`, `kbd`, readouts, nav labels, eyebrows |

All three are loaded from Google Fonts and mapped to Tailwind v4 theme tokens
`--font-display`, `--font-sans`, and `--font-mono`.

---

## Stack

| Layer | Technology |
| :--- | :--- |
| Build | Vite 6 · TypeScript 5 (strict) |
| UI | React 19 · Tailwind v4 · shadcn/ui · Radix UI |
| Math | `/src/core` — pure functions, no DOM, no React |
| Tests | Vitest 3 · Testing Library (jsdom) · 121 tests |
| Deploy | GitHub Actions → `gh-pages` branch |

The `/src/core` folder covers OKLCH conversion, harmonies, tonal scales,
contrast, CSS emission, and radius tokens. Feature folders under `/src/features`
consume `core` through hooks and components.

---

## Local dev

| Command | Effect |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Vite dev server → `http://localhost:5173/match-themes/` |
| `npm test` | Full Vitest suite (121 tests) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Production build into `dist/` |

---

## Deploy (GitHub Pages)

The Vite `base` defaults to `/match-themes/` and can be overridden via the
`BASE_PATH` env var at build time.

```yaml
- run: npm ci
- run: npm test
- run: npm run build
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

The Action publishes `dist/` to the `gh-pages` branch; Pages serves it at
`https://<owner>.github.io/match-themes/`.

---

## Project layout

```
src/
  core/           OKLCH math · harmony · scale · contrast · theme-css · theme-radius
  features/
    colors/        base color input · harmony picker · format toggle · tonal grid
    showcase/      shadcn light + dark panels · radius control · notifications card
    navbar/        sticky nav · export dialog (copy + download)
    hero/          palette-colored headline · Build a palette CTA
    footer/        license · GitHub · credits
  components/ui/   shadcn primitives
```

---

## License

[ISC](LICENSE) © 2026 thiagocajadev.
