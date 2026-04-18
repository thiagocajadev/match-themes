import type { ContrastEvaluation, ContrastLevel } from '../../core/contrast';

const RATIO_LABEL_DECIMALS = 1;

const BADGE_BASE_CLASS = [
  'rounded px-1.5 py-0.5',
  'font-mono text-[10px] uppercase tracking-wide',
].join(' ');

const LEVEL_BADGE_CLASS: Record<ContrastLevel, string> = {
  AAA: 'bg-emerald-500/90 text-emerald-950',
  AA: 'bg-emerald-300/90 text-emerald-950',
  AA_LARGE: 'bg-amber-300/90 text-amber-950',
  FAIL: 'bg-rose-500/90 text-rose-50',
};

const LEVEL_DISPLAY_LABEL: Record<ContrastLevel, string> = {
  AAA: 'AAA',
  AA: 'AA',
  AA_LARGE: 'AA·L',
  FAIL: 'Fail',
};

type ContrastBadgeProps = {
  evaluation: ContrastEvaluation;
  surfaceLabel: string;
};

export function ContrastBadge(props: ContrastBadgeProps) {
  const { evaluation, surfaceLabel } = props;

  const displayLabel = LEVEL_DISPLAY_LABEL[evaluation.level];
  const badgeClass = `${BADGE_BASE_CLASS} ${LEVEL_BADGE_CLASS[evaluation.level]}`;
  const accessibleLabel = buildAccessibleLabel(evaluation, surfaceLabel);

  const view = (
    <span
      role="status"
      aria-label={accessibleLabel}
      className={badgeClass}
    >
      {displayLabel}
    </span>
  );
  return view;
}

function buildAccessibleLabel(evaluation: ContrastEvaluation, surfaceLabel: string): string {
  const ratioText = evaluation.ratio.toFixed(RATIO_LABEL_DECIMALS);
  const levelText = LEVEL_DISPLAY_LABEL[evaluation.level];
  const label = `Contrast ${ratioText} against ${surfaceLabel} — ${levelText}`;
  return label;
}
