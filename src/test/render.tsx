import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LocaleProvider } from '@/i18n/LocaleContext';

function Wrapper({ children }: { children: React.ReactNode }) {
  // Tests are written in English — seed localStorage before LocaleProvider mounts
  localStorage.setItem('match-themes-locale', 'en');
  return (
    <MemoryRouter>
      <LocaleProvider>{children}</LocaleProvider>
    </MemoryRouter>
  );
}

function renderWithLocale(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: Wrapper, ...options });
}

export { renderWithLocale as render };
export * from '@testing-library/react';
