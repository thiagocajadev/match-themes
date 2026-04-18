import { Button } from '@/components/ui/button';
import type { PaletteController } from '@/features/colors/usePalette';

import { ExportDialog } from './ExportDialog';

type NavbarSectionProps = {
  palette: PaletteController;
};

const NAVBAR_BRAND_LABEL = 'Match Themes';
const EXPORT_TRIGGER_LABEL = 'Export CSS';
const GITHUB_REPO_URL = 'https://github.com/thiagocajadev/match-themes';
const GITHUB_LINK_LABEL = 'GitHub';
const NAV_LINK_CLASSNAME =
  'font-mono text-[11px] uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900';

export function NavbarSection(props: NavbarSectionProps) {
  const { palette } = props;

  const exportTrigger = (
    <Button type="button" size="sm">
      {EXPORT_TRIGGER_LABEL}
    </Button>
  );

  const view = (
    <header
      aria-label="Primary navigation"
      className="sticky top-0 z-40 w-full border-b border-stone-200 bg-stone-50/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-stone-50/70 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <a href="#" className={NAV_LINK_CLASSNAME}>
          {NAVBAR_BRAND_LABEL}
        </a>

        <div className="flex items-center gap-3">
          <ExportDialog palette={palette} trigger={exportTrigger} />
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className={NAV_LINK_CLASSNAME}
          >
            {GITHUB_LINK_LABEL}
          </a>
        </div>
      </div>
    </header>
  );
  return view;
}
