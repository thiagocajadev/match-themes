import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { ColorsSection } from '@/features/colors/ColorsSection';
import { usePaletteController } from '@/features/colors/usePalette';
import { NavbarSection } from '@/features/navbar/NavbarSection';
import { ShowcaseSection } from './ShowcaseSection';

const RED_HEX = '#ff0000';
const TEAL_HEX = '#14b8a6';
const DEFAULT_RADIUS_REM = '0.625rem';
const PILL_RADIUS_REM = '1rem';
const RADIUS_VARIABLE_NAME = '--radius';

function ShowcaseHarness() {
  const palette = usePaletteController();
  return (
    <>
      <NavbarSection palette={palette} />
      <ColorsSection palette={palette} />
      <ShowcaseSection palette={palette} />
    </>
  );
}

describe('ShowcaseSection', () => {
  it('should render both light and dark panels', () => {
    render(<ShowcaseHarness />);

    const lightPanel = screen.getByLabelText('Light theme showcase');
    const darkPanel = screen.getByLabelText('Dark theme showcase');

    expect(lightPanel).toBeInTheDocument();
    expect(darkPanel).toBeInTheDocument();
    expect(lightPanel.getAttribute('data-showcase-mode')).toBe('light');
    expect(darkPanel.getAttribute('data-showcase-mode')).toBe('dark');
  });

  it('should scope CSS variables per panel without leaking between light and dark', () => {
    render(<ShowcaseHarness />);

    const lightPanel = screen.getByLabelText('Light theme showcase');
    const darkPanel = screen.getByLabelText('Dark theme showcase');

    const lightBackground = lightPanel.style.getPropertyValue('--background');
    const darkBackground = darkPanel.style.getPropertyValue('--background');

    expect(lightBackground.length).toBeGreaterThan(0);
    expect(darkBackground.length).toBeGreaterThan(0);
    expect(lightBackground).not.toBe(darkBackground);
  });

  it('should re-apply CSS variables on both panels when the base color changes', () => {
    render(<ShowcaseHarness />);

    const lightPanel = screen.getByLabelText('Light theme showcase');
    const darkPanel = screen.getByLabelText('Dark theme showcase');

    const lightBefore = lightPanel.style.getPropertyValue('--primary');
    const darkBefore = darkPanel.style.getPropertyValue('--primary');

    const hexField = screen.getByRole('textbox', { name: 'Base color hex' });
    fireEvent.change(hexField, { target: { value: RED_HEX } });

    const lightAfterRed = lightPanel.style.getPropertyValue('--primary');
    const darkAfterRed = darkPanel.style.getPropertyValue('--primary');

    fireEvent.change(hexField, { target: { value: TEAL_HEX } });

    const lightAfterTeal = lightPanel.style.getPropertyValue('--primary');
    const darkAfterTeal = darkPanel.style.getPropertyValue('--primary');

    expect(lightAfterRed).not.toBe(lightBefore);
    expect(darkAfterRed).not.toBe(darkBefore);
    expect(lightAfterTeal).not.toBe(lightAfterRed);
    expect(darkAfterTeal).not.toBe(darkAfterRed);
  });

  it('should propagate the showcase radius selection into both panel inline styles', () => {
    render(<ShowcaseHarness />);

    const lightPanel = screen.getByLabelText('Light theme showcase');
    const darkPanel = screen.getByLabelText('Dark theme showcase');

    const lightRadiusBefore = lightPanel.style.getPropertyValue(
      RADIUS_VARIABLE_NAME,
    );
    const darkRadiusBefore = darkPanel.style.getPropertyValue(
      RADIUS_VARIABLE_NAME,
    );

    expect(lightRadiusBefore).toBe(DEFAULT_RADIUS_REM);
    expect(darkRadiusBefore).toBe(DEFAULT_RADIUS_REM);

    const pillRadio = screen.getByRole('radio', { name: 'Radius 1rem' });
    fireEvent.click(pillRadio);

    const lightRadiusAfter = lightPanel.style.getPropertyValue(
      RADIUS_VARIABLE_NAME,
    );
    const darkRadiusAfter = darkPanel.style.getPropertyValue(
      RADIUS_VARIABLE_NAME,
    );

    expect(lightRadiusAfter).toBe(PILL_RADIUS_REM);
    expect(darkRadiusAfter).toBe(PILL_RADIUS_REM);
  });

  it('should activate the dark class on the dark panel for dark-variant shadcn classes', () => {
    render(<ShowcaseHarness />);

    const lightPanel = screen.getByLabelText('Light theme showcase');
    const darkPanel = screen.getByLabelText('Dark theme showcase');

    expect(darkPanel.classList.contains('dark')).toBe(true);
    expect(lightPanel.classList.contains('dark')).toBe(false);
  });
});
