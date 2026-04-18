import { type CSSProperties } from 'react';
import { BellIcon, CheckIcon, MessageSquareIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { themeRadius, type ThemeRadius } from '@/core/theme-radius';
import { useLocale } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';

import type { ShowcaseMode, ShowcaseVariables } from './theme';

type ShowcasePanelProps = {
  mode: ShowcaseMode;
  variables: ShowcaseVariables;
  radiusRem: ThemeRadius;
};

const RADIUS_VARIABLE_NAME = '--radius';

export function ShowcasePanel(props: ShowcasePanelProps) {
  const { mode, variables, radiusRem } = props;
  const { t } = useLocale();

  const label = mode === 'light' ? t.showcase.lightLabel : t.showcase.darkLabel;
  const badge = mode === 'light' ? t.showcase.lightBadge : t.showcase.darkBadge;

  const isDark = mode === 'dark';
  const scopeClassName = cn(
    'flex flex-col gap-4 rounded-xl bg-background p-6 text-foreground',
    isDark && 'dark',
  );

  const formattedRadius = themeRadius.formatRem(radiusRem);
  const inlineStyle = {
    ...(variables as CSSProperties),
    [RADIUS_VARIABLE_NAME]: formattedRadius,
  } as CSSProperties;

  const view = (
    <div
      aria-label={`${label} showcase`}
      className={scopeClassName}
      style={inlineStyle}
      data-showcase-mode={mode}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <Badge variant="secondary">{badge}</Badge>
      </div>

      <ProductCard mode={mode} />
      <NotificationsCard />
    </div>
  );
  return view;
}

type ProductCardProps = {
  mode: ShowcaseMode;
};

function ProductCard(props: ProductCardProps) {
  const { mode } = props;
  const { t } = useLocale();
  const emailFieldId = `showcase-email-${mode}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.showcase.productCardTitle}</CardTitle>
        <CardDescription>{t.showcase.productCardDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Beta</Badge>
          <Badge variant="outline">OKLCH-first</Badge>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={emailFieldId}>{t.showcase.emailLabel}</Label>
          <Input
            id={emailFieldId}
            type="email"
            placeholder={t.showcase.emailPlaceholder}
            autoComplete="off"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost">{t.showcase.maybeButton}</Button>
        <Button>{t.showcase.requestButton}</Button>
      </CardFooter>
    </Card>
  );
}

const NOTIFICATIONS_LIST_ITEM_CLASS =
  'flex items-start gap-3 rounded-md border border-border/60 p-3';
const NOTIFICATIONS_ICON_BADGE_CLASS =
  'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary';
const NOTIFICATIONS_TIMESTAMP_CLASS =
  'font-mono text-[10px] uppercase tracking-widest text-muted-foreground';

function NotificationsCard() {
  const { t } = useLocale();

  const notifications = [
    {
      id: 'deploy',
      icon: CheckIcon,
      title: t.showcase.deployTitle,
      message: t.showcase.deployMessage,
      timestamp: t.showcase.deployTimestamp,
      badge: 'shipped',
      badgeVariant: 'default' as const,
    },
    {
      id: 'review',
      icon: MessageSquareIcon,
      title: t.showcase.reviewTitle,
      message: t.showcase.reviewMessage,
      timestamp: t.showcase.reviewTimestamp,
      badge: 'design',
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'alert',
      icon: BellIcon,
      title: t.showcase.alertTitle,
      message: t.showcase.alertMessage,
      timestamp: t.showcase.alertTimestamp,
      badge: 'invite',
      badgeVariant: 'outline' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.showcase.teamActivityTitle}</CardTitle>
        <CardDescription>{t.showcase.teamActivityDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {notifications.map((entry) => {
          const IconComponent = entry.icon;
          return (
            <div key={entry.id} className={NOTIFICATIONS_LIST_ITEM_CLASS}>
              <span className={NOTIFICATIONS_ICON_BADGE_CLASS}>
                <IconComponent className="size-4" />
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{entry.title}</p>
                  <Badge variant={entry.badgeVariant}>{entry.badge}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{entry.message}</p>
                <p className={NOTIFICATIONS_TIMESTAMP_CLASS}>{entry.timestamp}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="ghost" size="sm">
          {t.showcase.markAllRead}
        </Button>
        <Button size="sm">{t.showcase.viewAll}</Button>
      </CardFooter>
    </Card>
  );
}
