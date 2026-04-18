import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { usePaletteController } from '@/features/colors/usePalette';

import { NavbarSection } from './NavbarSection';

function NavbarSectionHarness() {
  const palette = usePaletteController();
  return <NavbarSection palette={palette} />;
}

describe('NavbarSection', () => {
  it('should render the brand label, export trigger, and GitHub link', () => {
    render(<NavbarSectionHarness />);

    const brandLink = screen.getByRole('link', { name: 'Match Themes' });
    expect(brandLink).toHaveAttribute('href', '#');

    const exportTrigger = screen.getByRole('button', { name: 'Export CSS' });
    expect(exportTrigger).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    const githubHref = githubLink.getAttribute('href') ?? '';
    const hasGithubHost = githubHref.includes('github.com');

    expect(hasGithubHost).toBe(true);
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('should not render the display format toggle (moved to colors section)', () => {
    render(<NavbarSectionHarness />);

    const formatGroup = screen.queryByRole('radiogroup', {
      name: 'Display format',
    });

    expect(formatGroup).toBeNull();
  });

  it('should not render the theme radius control (moved to showcase section)', () => {
    render(<NavbarSectionHarness />);

    const radiusGroup = screen.queryByRole('radiogroup', {
      name: 'Theme radius',
    });

    expect(radiusGroup).toBeNull();
  });
});
