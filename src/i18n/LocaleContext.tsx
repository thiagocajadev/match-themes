import { createContext, useContext, useState, type ReactNode } from 'react';

import { en } from './en';
import { ptBR } from './pt-BR';
import type { Locale, Translations } from './types';

const TRANSLATIONS: Record<Locale, Translations> = { en, 'pt-BR': ptBR };
const STORAGE_KEY = 'match-themes-locale';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'pt-BR') return stored;
  } catch {
    /* ignore */
  }
  return 'pt-BR';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  function setLocale(next: Locale) {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setLocaleState(next);
  }

  const value: LocaleContextValue = { locale, setLocale, t: TRANSLATIONS[locale] };
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
