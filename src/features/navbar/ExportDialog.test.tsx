import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';

import { Button } from '@/components/ui/button';
import { usePaletteController } from '@/features/colors/usePalette';

import { ExportDialog } from './ExportDialog';

const COPY_FEEDBACK_DURATION_MS = 1500;
const OBJECT_URL_STUB = 'blob:match-themes-stub';
const TRIGGER_LABEL = 'Export CSS';

function ExportDialogHarness() {
  const palette = usePaletteController();
  const trigger = <Button type="button">{TRIGGER_LABEL}</Button>;
  return <ExportDialog palette={palette} trigger={trigger} />;
}

let clipboardWriteText: ReturnType<typeof vi.fn>;
let createObjectUrlMock: ReturnType<typeof vi.fn>;
let revokeObjectUrlMock: ReturnType<typeof vi.fn>;
let anchorClickSpy: MockInstance<HTMLAnchorElement['click']>;

beforeEach(() => {
  clipboardWriteText = vi.fn().mockResolvedValue(undefined);

  Object.defineProperty(globalThis.navigator, 'clipboard', {
    configurable: true,
    value: { writeText: clipboardWriteText },
  });

  createObjectUrlMock = vi.fn().mockReturnValue(OBJECT_URL_STUB);
  revokeObjectUrlMock = vi.fn();

  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    value: createObjectUrlMock,
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    configurable: true,
    value: revokeObjectUrlMock,
  });

  anchorClickSpy = vi
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(() => {});

  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function openExportDialog() {
  const triggerButton = screen.getByRole('button', { name: TRIGGER_LABEL });
  fireEvent.click(triggerButton);
}

describe('ExportDialog', () => {
  it('should keep the CSS preview hidden until the trigger is clicked', () => {
    render(<ExportDialogHarness />);

    const previewWhileClosed = screen.queryByLabelText('Theme CSS preview');
    expect(previewWhileClosed).toBeNull();

    openExportDialog();

    const previewWhenOpen = screen.getByLabelText('Theme CSS preview');
    const cssText = previewWhenOpen.textContent ?? '';
    expect(cssText).toContain('@theme {');
    expect(cssText).toContain(':root {');
    expect(cssText).toContain('.dark {');
    expect(cssText).toContain('--color-brand-500:');
    expect(cssText).toContain('--background:');
    expect(cssText).toContain('--radius: 0.625rem;');
  });

  it('should copy the CSS to clipboard and show a transient Copied label', async () => {
    render(<ExportDialogHarness />);
    openExportDialog();

    const preview = screen.getByLabelText('Theme CSS preview');
    const expectedPayload = preview.textContent ?? '';

    const copyButton = screen.getByRole('button', { name: 'Copy CSS' });

    await act(async () => {
      fireEvent.click(copyButton);
      await Promise.resolve();
    });

    expect(clipboardWriteText).toHaveBeenCalledWith(expectedPayload);

    const copiedButton = screen.getByRole('button', { name: 'Copied' });
    expect(copiedButton.getAttribute('data-copy-state')).toBe('copied');

    act(() => {
      vi.advanceTimersByTime(COPY_FEEDBACK_DURATION_MS);
    });

    const restoredButton = screen.getByRole('button', { name: 'Copy CSS' });
    expect(restoredButton.getAttribute('data-copy-state')).toBe('idle');
  });

  it('should trigger a CSS blob download with match-themes.css filename', () => {
    render(<ExportDialogHarness />);
    openExportDialog();

    const downloadButton = screen.getByRole('button', {
      name: 'Download match-themes.css',
    });

    fireEvent.click(downloadButton);

    expect(createObjectUrlMock).toHaveBeenCalledTimes(1);
    const blobArgument = createObjectUrlMock.mock.calls[0]?.[0] as Blob;
    expect(blobArgument).toBeInstanceOf(Blob);
    expect(blobArgument.type).toBe('text/css');

    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectUrlMock).toHaveBeenCalledWith(OBJECT_URL_STUB);
  });
});
