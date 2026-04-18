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
import { cn } from '@/lib/utils';

import type { ShowcaseMode, ShowcaseVariables } from './theme';

type ShowcasePanelProps = {
  mode: ShowcaseMode;
  variables: ShowcaseVariables;
  radiusRem: ThemeRadius;
};

const RADIUS_VARIABLE_NAME = '--radius';

const MODE_COPY: Record<ShowcaseMode, { label: string; badge: string }> = {
  light: { label: 'Light theme', badge: 'light' },
  dark: { label: 'Dark theme', badge: 'dark' },
};

export function ShowcasePanel(props: ShowcasePanelProps) {
  const { mode, variables, radiusRem } = props;
  const modeCopy = MODE_COPY[mode];

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
      aria-label={`${modeCopy.label} showcase`}
      className={scopeClassName}
      style={inlineStyle}
      data-showcase-mode={mode}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {modeCopy.label}
        </p>
        <Badge variant="secondary">{modeCopy.badge}</Badge>
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
  const emailFieldId = `showcase-email-${mode}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join the private beta</CardTitle>
        <CardDescription>
          Early access for color-aware teams shipping design systems.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Beta</Badge>
          <Badge variant="outline">OKLCH-first</Badge>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={emailFieldId}>Email</Label>
          <Input
            id={emailFieldId}
            type="email"
            placeholder="you@studio.com"
            autoComplete="off"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost">Maybe later</Button>
        <Button>Request invite</Button>
      </CardFooter>
    </Card>
  );
}

type NotificationEntry = {
  id: string;
  icon: typeof BellIcon;
  title: string;
  message: string;
  timestamp: string;
  badge: string;
  badgeVariant: 'default' | 'secondary' | 'outline';
};

const NOTIFICATIONS: readonly NotificationEntry[] = [
  {
    id: 'deploy',
    icon: CheckIcon,
    title: 'Deploy succeeded',
    message: 'main → production finished in 2m 41s.',
    timestamp: '2 min ago',
    badge: 'shipped',
    badgeVariant: 'default',
  },
  {
    id: 'review',
    icon: MessageSquareIcon,
    title: 'Design review requested',
    message: 'Iris left 3 comments on the onboarding flow.',
    timestamp: '18 min ago',
    badge: 'design',
    badgeVariant: 'secondary',
  },
  {
    id: 'alert',
    icon: BellIcon,
    title: 'New beta invite',
    message: 'Kelvin accepted the private beta invite.',
    timestamp: '1 hr ago',
    badge: 'invite',
    badgeVariant: 'outline',
  },
];

const NOTIFICATIONS_LIST_ITEM_CLASS =
  'flex items-start gap-3 rounded-md border border-border/60 p-3';
const NOTIFICATIONS_ICON_BADGE_CLASS =
  'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary';
const NOTIFICATIONS_TIMESTAMP_CLASS =
  'font-mono text-[10px] uppercase tracking-widest text-muted-foreground';

function NotificationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team activity</CardTitle>
        <CardDescription>Latest signals from the workspace.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {NOTIFICATIONS.map((entry) => {
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
          Mark all read
        </Button>
        <Button size="sm">View all</Button>
      </CardFooter>
    </Card>
  );
}
