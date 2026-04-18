import { describe, expect, it, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen, within } from '@/test/render';
import { ColorsSection } from './ColorsSection';
import { usePaletteController } from './usePalette';

function ColorsSectionHarness() {
  const palette = usePaletteController();
  return <ColorsSection palette={palette} />;
}

const DEFAULT_BASE_HEX = '#3b82f6';
const RED_HEX = '#ff0000';
const INVALID_HEX = 'zzz';

beforeAll(() => {
  const clipboardStub = { writeText: vi.fn().mockResolvedValue(undefined) };
  
  Object.defineProperty(globalThis.navigator, 'clipboard', {
    configurable: true,
    value: clipboardStub,
  });
});

describe('ColorsSection', () => {
  it('should render the default base color as the first harmony swatch', () => {
    render(<ColorsSectionHarness />);

    const harmonyGroup = screen.getByRole('radiogroup', { name: 'Harmony' });
    expect(harmonyGroup).toBeInTheDocument();

    const initialFirstSwatch = screen.getAllByRole('button', {
      name: /Copy #1 #3b82f6/i,
    });

    expect(initialFirstSwatch.length).toBeGreaterThanOrEqual(1);
  });

  it('should surface WCAG contrast badges on tonal scale swatches', () => {
    render(<ColorsSectionHarness />);

    const contrastBadges = screen.getAllByRole('status', {
      name: /Contrast \d/i,
    });

    expect(contrastBadges.length).toBeGreaterThan(0);
  });

  it('should update harmony and tonal grid when the base hex changes', () => {
    render(<ColorsSectionHarness />);
    
    const hexField = screen.getByRole('textbox', { name: 'Base color hex' });
    fireEvent.change(hexField, { target: { value: RED_HEX } });
    
    const redSwatch = screen.getAllByRole('button', {
      name: /Copy #1 #ff0000/i,
    });
    expect(redSwatch.length).toBeGreaterThanOrEqual(1);
    const stopFiveHundredSwatch = screen.getAllByRole('button', {
      name: /Copy 500 /i,
    });
    expect(stopFiveHundredSwatch.length).toBeGreaterThanOrEqual(1);
  });

  it('should switch swatch display text when the format toggle changes', () => {
    render(<ColorsSectionHarness />);
    
    const hexField = screen.getByRole('textbox', { name: 'Base color hex' });
    fireEvent.change(hexField, { target: { value: RED_HEX } });
    
    const formatGroup = screen.getByRole('radiogroup', {
      name: 'Display format',
    });
    const oklchRadio = within(formatGroup).getByRole('radio', {
      name: 'OKLCH',
    });
    
    fireEvent.click(oklchRadio);
    
    const oklchSwatches = screen.getAllByRole('button', {
      name: /Copy #1 oklch\(/i,
    });
    
    expect(oklchSwatches.length).toBeGreaterThanOrEqual(1);
  });

  it('should copy formatted text and surface transient feedback on swatch click', () => {
    render(<ColorsSectionHarness />);
    
    const hexField = screen.getByRole('textbox', { name: 'Base color hex' });
    fireEvent.change(hexField, { target: { value: RED_HEX } });
    
    const targetSwatch = screen.getAllByRole('button', {
      name: /Copy #1 #ff0000/i,
    })[0];
    
    expect(targetSwatch).toBeDefined();
    fireEvent.click(targetSwatch!);
    
    const writeText = globalThis.navigator.clipboard.writeText as ReturnType<
      typeof vi.fn
    >;
    
    expect(writeText).toHaveBeenCalledWith(RED_HEX);
    expect(targetSwatch!).toHaveTextContent(/Copied/);
  });

  it('should keep the last valid color when the hex field receives invalid input', () => {
    render(<ColorsSectionHarness />);
    
    const hexField = screen.getByRole('textbox', { name: 'Base color hex' });
    fireEvent.change(hexField, { target: { value: INVALID_HEX } });
    
    const baseSwatch = screen.getAllByRole('button', {
      name: new RegExp(`Copy #1 ${DEFAULT_BASE_HEX}`, 'i'),
    });

    expect(baseSwatch.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/invalid hex/i)).toBeInTheDocument();
  });
});
