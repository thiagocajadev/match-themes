import { Button } from '@/components/ui/button';
import { useLocale } from '@/i18n/LocaleContext';
import type { PaletteController } from '@/features/colors/usePalette';

import { ExportDialog } from './ExportDialog';

type NavbarSectionProps = {
  palette: PaletteController;
};

const GITHUB_REPO_URL = 'https://github.com/thiagocajadev/match-themes';
const NAV_LINK_CLASSNAME =
  'font-mono text-[11px] uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900';

export function NavbarSection(props: NavbarSectionProps) {
  const { palette } = props;
  const { t, locale, setLocale } = useLocale();

  const exportTrigger = (
    <Button type="button" size="sm">
      {t.nav.export}
    </Button>
  );

  const view = (
    <header
      aria-label={t.nav.primaryNav}
      className="sticky top-0 z-40 w-full border-b border-stone-200 bg-stone-50/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-stone-50/70 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <a href="#" className={NAV_LINK_CLASSNAME}>
          {t.nav.brand}
        </a>

        <div className="flex items-center gap-3">
          <ExportDialog palette={palette} trigger={exportTrigger} />
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className={NAV_LINK_CLASSNAME}
          >
            {t.nav.github}
          </a>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLocale('pt-BR')}
              aria-label="Mudar para português"
              className={`text-base leading-none transition-opacity ${locale === 'pt-BR' ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
            >
              🇧🇷
            </button>
            <button
              type="button"
              onClick={() => setLocale('en')}
              aria-label="Switch to English"
              className={`text-base leading-none transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
            >
              🇺🇸
            </button>
          </div>
        </div>
      </div>
    </header>
  );
  return view;
}
