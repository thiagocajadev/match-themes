# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org).

## [Unreleased]

### Added

- Footer: project version injected at build time via Vite `define.__APP_VERSION__`; displayed as `· v<version>` after the ISC license label.
- `npm run info`: prints `match-themes v<version>` in the terminal.
- README (pt-BR and EN): shields.io badges for version, deploy status, license, React, TypeScript, Tailwind v4, Vite, and Vitest.
- `src/env.d.ts`: global declaration for `__APP_VERSION__`.
- bumpp configured with `commit: false`, `push: false`, `tag: false` — version bump only, no automatic git operations.

### Fixed

- Hero CTA "Montar paleta": `<a href="#colors">` interpreted as route `/colors` by HashRouter; replaced with `scrollIntoView` button.
- Dark showcase elevation stack: card 900→800 (S2), popover 900→700 (S3), secondary/accent/border/input 800→700; muted-foreground 300→400 for perceptual comfort.
- Light showcase: muted-foreground 600→500, removing the semantic collision with primary (both at L=48%).


## [1.0.0] — 2026-04-18

### Added

- OKLCH math core: bidirectional sRGB ↔ OKLab ↔ OKLCH pipeline, hex parser, gamut clamp, 7 harmonies, 11-stop tonal scale, WCAG 2.x contrast, Tailwind v4 `@theme` emitter (`src/core/`).
- Colors section: base color input, harmony selector, format toggle (HEX / RGB / OKLCH), tonal grid with WCAG contrast badges and click-to-copy swatches (`src/features/colors/`).
- Side-by-side shadcn showcase in light and dark, scoped CSS variables per panel, driven by the active palette (`src/features/showcase/`).
- `--radius` control in Showcase: 6 presets (sharp → pill) via `ThemeRadius` union in `src/core/theme-radius.ts`; live in both showcase panels and reflected in exported CSS.
- Sticky navbar with backdrop blur, brand anchor, and `Export CSS` trigger opening a `Dialog` (`ExportDialog.tsx`).
- i18n EN / pt-BR: typed zero-deps custom context (`src/i18n/`), `LocaleProvider` with `localStorage` persistence, `useLocale()` hook; all 12 components migrated; full `/teoria` page content translated to English.
- Language toggle in Navbar: two flags 🇧🇷 🇺🇸, active flag at full opacity, inactive dimmed; default pt-BR.
- `/teoria` page (`src/pages/TheoryPage.tsx`) with 9 educational accordions (Color Theory, Harmonies, Composition, WCAG, Visual Density, Light/Dark Themes, Tonal Scale Tips, References); available in EN and pt-BR.
- `ColorWheel` component: chromatic wheel via OKLCH `conic-gradient` with 73 stops and 8 hue markers.
- Inline didactic visuals: `HarmonyDots`, `ColorBar603010`, `TemperatureDemo`, `SurfaceStack`, `LightDarkDemo`, `TonalScaleBar`, AA/AAA contrast cards.
- `react-router-dom` HashRouter routing with `/` and `/teoria` routes.
- Dynamic hero headline: "Match" colored by base OKLCH, "themes" by `harmonyColors[1]`.
- Footer with ISC license year, stack credits, GitHub link, and `/teoria` link.
- Hero section with `Build a palette` CTA anchoring to `#colors`.
- Mobile layout: controls stack vertically on < 640px; tonal grid and harmony cards scroll horizontally.
- Typography: Libre Baskerville (headings), Rosario (body), JetBrains Mono (mono) via `src/index.css`.
- SVG favicon (`public/favicon.svg`): 4-quadrant OKLCH color-wheel icon.
- GitHub Actions workflow deploying `dist/` to `gh-pages` via configurable `BASE_PATH`.
- 121 Vitest tests across core math modules and feature integration suites.

### Fixed

- Shared test render utility (`src/test/render.tsx`) wrapping `MemoryRouter` + `LocaleProvider` (seeded `en`); all 121 tests pass.
- README promoted to pt-BR as default; English version as `README.en.md` with bidirectional links.
- GitHub Actions upgraded to Node.js 24.
- GitHub Pages 404 resolved: `DEFAULT_BASE_PATH` set to `'/match-themes/'`.

### Changed

- Product renamed `themes-match` → `match-themes`.
- Default harmony: `splitComplementary` → `complementary`.
- `RadiusControl` moved from navbar into Showcase section.
- `FormatToggle` migrated from navbar into Colors section.
- GitHub link moved from hero into navbar right cluster.
