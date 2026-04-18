# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org).

## [Unreleased]

### Fixed

- README promoted to pt-BR as default (`README.md`); English version renamed to `README.en.md`; bidirectional links between both files; content reflects current project state — OKLCH studio, color theory, i18n EN/pt-BR, `/teoria` page, stack and feature layout.

### Added

- i18n EN / pt-BR: typed zero-deps custom context (`src/i18n/`), `LocaleProvider` with `localStorage` persistence, `useLocale()` hook; all 12 components migrated; full `/teoria` page content translated to English (`entries.en.tsx`).
- Language toggle in Navbar: two flags 🇧🇷 🇺🇸 after GitHub link, active flag at full opacity, inactive dimmed; default pt-BR.
- Footer added to `/teoria` page.

### Added (theory)

- `/teoria` page (`src/pages/TheoryPage.tsx`) with 9 educational accordions: Color Theory, Harmonies, Composition, WCAG & Accessibility, Visual Density, Light/Dark Themes, Tonal Scale Tips, and References; available in EN and pt-BR.
- `ColorWheel` component (`src/features/theory/ColorWheel.tsx`): chromatic wheel via OKLCH `conic-gradient` with 73 stops and 8 geometrically positioned hue markers.
- Inline didactic visuals in `TheorySection`: `HarmonyDots` (OKLCH dots per harmony), `ColorBar603010` (60/30/10 bar), `TemperatureDemo` (warm vs cool), `SurfaceStack` (S0–S3 elevation hierarchy), `LightDarkDemo` (light/dark comparison), `TonalScaleBar` (11 stops), AA/AAA contrast pass/fail cards and bad-contrast yellow/cyan example.
- `react-router-dom` HashRouter routing with `/` and `/teoria` routes; "Color Theory" link added to `FooterSection`.

- SVG favicon (`public/favicon.svg`): 4-quadrant OKLCH color-wheel icon linked from `index.html`.
- Live demo URL added to README header: `https://thiagocajadev.github.io/match-themes/`.

### Fixed

- GitHub Actions upgraded to Node.js 24 (`node-version: '20'` → `'24'` in `deploy.yml`).
- GitHub Pages 404 resolved: `DEFAULT_BASE_PATH` in `vite.config.ts` set to `'/match-themes/'`.
- `TonalScaleGrid` and `HarmonyRow` horizontal scroll now confined to mobile (< `md`); desktop layout is fully responsive with no forced min-width.

---

### Added (prior)

- Mobile layout: controls row (Base / Format / Harmony) stacks vertically on viewports < 640px; `TonalScaleGrid` and `HarmonyRow` scroll horizontally with `overflow-x-auto`; swatch height increased to `h-24` on mobile; tonal grid min-width set to 1200px and harmony cards to 200px for readable labels.

- `--radius` control in Showcase: 6 presets (sharp → pill) via `ThemeRadius` union in `src/core/theme-radius.ts`; live in both showcase panels and reflected in exported CSS.
- Dynamic hero headline: "Match" colored by base OKLCH, "themes" by `harmonyColors[1]` — repaints on every harmony switch.
- `NotificationsCard` in showcase panels: three lucide-icon entries with `Badge` variants (default / secondary / outline), replacing the Calendar card.
- Sticky navbar with backdrop blur, brand anchor, `FormatToggle`, and `Export CSS` trigger opening a `Dialog` (`src/features/navbar/NavbarSection.tsx` + `ExportDialog.tsx`).
- Collapsible `Accordion` wrapper around the Showcase section in `src/App.tsx`.
- OKLCH math core: bidirectional sRGB ↔ OKLab ↔ OKLCH pipeline, hex parser, gamut clamp, 7 harmonies, 11-stop tonal scale, WCAG 2.x contrast, Tailwind v4 `@theme` emitter (`src/core/`).
- Colors section: base color input, harmony selector, format toggle (HEX / RGB / OKLCH), tonal grid with WCAG contrast badges and click-to-copy swatches (`src/features/colors/`).
- Side-by-side shadcn showcase in light and dark, scoped CSS variables per panel, driven by the active palette (`src/features/showcase/`).
- Footer with ISC license year, stack credits, and GitHub link (`src/features/footer/`).
- Hero section with `Build a palette` CTA anchoring to `#colors` (`src/features/hero/`).
- Typography: Libre Baskerville (headings), Rosario (body), JetBrains Mono (code/mono) via `src/index.css`.
- GitHub Actions workflow deploying `dist/` to `gh-pages` via configurable `BASE_PATH`.
- 121 Vitest tests across core math modules and feature integration suites.

### Changed

- Product renamed `themes-match` → `match-themes` (package name, brand label "Match Themes", download filename `match-themes.css`, GitHub URL).
- Default harmony changed from `splitComplementary` to `complementary`.
- `RadiusControl` moved from navbar into Showcase section (above the light/dark grid).
- Navbar outer padding migrated to `<header>` element, aligning brand anchor with the hero content column.
- Base / Format / Harmony controls unified to `h-8` (32px) with baseline-aligned `inline-flex` labels.
- `FormatToggle` migrated from navbar into Colors section.
- GitHub link moved from hero secondary CTA into navbar right cluster.
- Showcase accordion starts collapsed (no `defaultValue`).

### Fixed

- OKLCH readout below Base Color input removed; only invalid-hex hint remains visible.
- `cursor-pointer` propagated to all interactive surfaces: Button, RadiusControl, HarmonySelector, FormatToggle, Swatch.
- Temporal dead-zone in `RadiusControl.tsx`: constants now declared before the IIFE that consumes them.
- `HarmonySelector` row break at index 4 prevents uneven distribution (4 + 3 layout).
- Near-white swatches (stop 50) framed with `border-stone-300` so they remain visible on the page background.
- `FormatToggle` container border removed to maintain visual parity with other `h-8` controls.
