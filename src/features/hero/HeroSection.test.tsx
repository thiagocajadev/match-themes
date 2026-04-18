import { describe, expect, it } from 'vitest';
import { render, screen } from '@/test/render';

import { usePaletteController } from '@/features/colors/usePalette';

import { HeroSection } from './HeroSection';

const PRIMARY_CTA_NAME = /Build a palette/i;
const SECONDARY_CTA_NAME = /View on GitHub/i;
const REMOVED_EYEBROW_TEXT = /^Match Themes$/;
const PRIMARY_TARGET_ANCHOR = '#colors';

function HeroSectionHarness() {
  const palette = usePaletteController();
  return <HeroSection palette={palette} />;
}

describe('HeroSection', () => {
  it('should render the headline as a level-one heading', () => {
    render(<HeroSectionHarness />);

    const headline = screen.getByRole('heading', { level: 1 });

    expect(headline).toBeInTheDocument();
  });

  it('should expose a primary CTA that anchors to the colors section', () => {
    render(<HeroSectionHarness />);

    const primaryCta = screen.getByRole('link', { name: PRIMARY_CTA_NAME });
    const actualHref = primaryCta.getAttribute('href');

    expect(actualHref).toBe(PRIMARY_TARGET_ANCHOR);
  });

  it('should not render the redundant Match Themes eyebrow (already present in navbar)', () => {
    render(<HeroSectionHarness />);

    const eyebrowMatches = screen.queryAllByText(REMOVED_EYEBROW_TEXT);

    expect(eyebrowMatches).toHaveLength(0);
  });

  it('should not render a secondary GitHub CTA inside the hero', () => {
    render(<HeroSectionHarness />);

    const secondaryCta = screen.queryByRole('link', { name: SECONDARY_CTA_NAME });

    expect(secondaryCta).toBeNull();
  });
});
