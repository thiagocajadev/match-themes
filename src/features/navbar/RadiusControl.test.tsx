import { fireEvent, render, screen } from '@/test/render';
import { describe, expect, it, vi } from 'vitest';

import {
  DEFAULT_THEME_RADIUS,
  THEME_RADII,
  type ThemeRadius,
} from '@/core/theme-radius';

import { RadiusControl } from './RadiusControl';

const DEFAULT_RADIUS_ARIA = 'Radius 0.625rem';
const PILL_RADIUS_ARIA = 'Radius 1rem';
const SHARP_RADIUS_ARIA = 'Radius 0';
const PILL_RADIUS_VALUE: ThemeRadius = 1;

describe('RadiusControl', () => {
  it('should render one radio per preset with the current value checked', () => {
    const onChange = vi.fn();

    render(<RadiusControl value={DEFAULT_THEME_RADIUS} onChange={onChange} />);

    const radioButtons = screen.getAllByRole('radio');

    expect(radioButtons).toHaveLength(THEME_RADII.length);

    const defaultRadio = screen.getByRole('radio', { name: DEFAULT_RADIUS_ARIA });
    expect(defaultRadio).toHaveAttribute('aria-checked', 'true');

    const pillRadio = screen.getByRole('radio', { name: PILL_RADIUS_ARIA });
    expect(pillRadio).toHaveAttribute('aria-checked', 'false');
  });

  it('should call onChange with the picked radius when a new preset is clicked', () => {
    const onChange = vi.fn();

    render(<RadiusControl value={DEFAULT_THEME_RADIUS} onChange={onChange} />);

    const pillRadio = screen.getByRole('radio', { name: PILL_RADIUS_ARIA });
    fireEvent.click(pillRadio);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(PILL_RADIUS_VALUE);
  });

  it('should expose sharp preset as an aria-labelled radio without rem unit', () => {
    const onChange = vi.fn();

    render(<RadiusControl value={DEFAULT_THEME_RADIUS} onChange={onChange} />);

    const sharpRadio = screen.getByRole('radio', { name: SHARP_RADIUS_ARIA });

    expect(sharpRadio).toBeInTheDocument();
    expect(sharpRadio.textContent).toBe('0');
  });
});
