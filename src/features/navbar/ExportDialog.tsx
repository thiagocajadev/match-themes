import { useCallback, useMemo, useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { scale } from '@/core/scale';
import { themeCss, type ThemeRoleValues } from '@/core/theme-css';
import type { ThemeRadius } from '@/core/theme-radius';
import type { PaletteController } from '@/features/colors/usePalette';
import { showcaseTheme } from '@/features/showcase/theme';
import { useLocale } from '@/i18n/LocaleContext';

type ExportDialogProps = {
  palette: PaletteController;
  trigger: ReactNode;
};

type CopyState = 'idle' | 'copied';

const DOWNLOAD_FILENAME = 'match-themes.css';
const DOWNLOAD_MIME_TYPE = 'text/css';
const COPY_FEEDBACK_DURATION_MS = 1500;

export function ExportDialog(props: ExportDialogProps) {
  const { palette, trigger } = props;
  const baseOklch = palette.baseColor.oklch;
  const radiusRem = palette.themeRadius;
  const { t } = useLocale();

  const cssDocument = useMemo(() => {
    const built = buildCssDocument(baseOklch, radiusRem);
    return built;
  }, [baseOklch, radiusRem]);

  const [copyState, setCopyState] = useState<CopyState>('idle');

  const onCopyClick = useCallback(() => {
    copyToClipboard(cssDocument).then((didCopy) => {
      if (!didCopy) {
        return;
      }

      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), COPY_FEEDBACK_DURATION_MS);
    });
  }, [cssDocument]);

  const onDownloadClick = useCallback(() => {
    downloadCssDocument(cssDocument);
  }, [cssDocument]);

  const copyLabel = copyState === 'copied' ? t.export.copyCopied : t.export.copyIdle;

  const view = (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.export.dialogTitle}</DialogTitle>
          <DialogDescription>{t.export.dialogDescription}</DialogDescription>
        </DialogHeader>

        <pre
          aria-label={t.export.previewAriaLabel}
          className="max-h-96 overflow-auto rounded-md bg-stone-900 p-4 font-mono text-xs leading-relaxed text-stone-100"
        >
          <code>{cssDocument}</code>
        </pre>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onDownloadClick}
            aria-label={`Download ${DOWNLOAD_FILENAME}`}
          >
            {t.export.downloadButton}
          </Button>
          <Button
            type="button"
            onClick={onCopyClick}
            aria-live="polite"
            data-copy-state={copyState}
          >
            {copyLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return view;
}

function buildCssDocument(
  baseOklch: PaletteController['baseColor']['oklch'],
  radiusRem: ThemeRadius,
) {
  const tonalScale = scale.generateTonalScale(baseOklch);
  const showcase = showcaseTheme.buildShowcaseTheme({
    scale: tonalScale,
    base: baseOklch,
  });

  const lightRoles = showcase.light as unknown as ThemeRoleValues;
  const darkRoles = showcase.dark as unknown as ThemeRoleValues;

  const cssText = themeCss.buildThemeCss({
    baseOklch,
    scale: tonalScale,
    lightRoles,
    darkRoles,
    radiusRem,
  });
  return cssText;
}

async function copyToClipboard(payload: string): Promise<boolean> {
  const hasNavigator = typeof navigator !== 'undefined';
  const hasClipboard = hasNavigator && navigator.clipboard !== undefined;
  if (!hasClipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(payload);
    return true;
  } catch {
    return false;
  }
}

function downloadCssDocument(payload: string) {
  const blob = new Blob([payload], { type: DOWNLOAD_MIME_TYPE });
  const objectUrl = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = DOWNLOAD_FILENAME;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(objectUrl);
}
