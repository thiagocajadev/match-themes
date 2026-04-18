import { cn } from '@/lib/utils';

const HUE_MARKERS: number[] = [0, 30, 60, 120, 180, 210, 270, 300];

export function ColorWheel({ className, size = 300 }: { className?: string; size?: number }) {
  const stops = Array.from({ length: 73 }, (_, i) =>
    `oklch(0.65 0.20 ${i * 5}deg)`
  ).join(', ');

  const ringPct = 0.22;
  const inner = Math.round(size * (1 - ringPct * 2));
  const offset = Math.round(size * ringPct);

  return (
    <figure className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="h-full w-full rounded-full"
          style={{ background: `conic-gradient(from -90deg, ${stops})` }}
        />
        <div
          className="absolute flex flex-col items-center justify-center rounded-full bg-stone-50"
          style={{ width: inner, height: inner, top: offset, left: offset }}
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-stone-400">
            OKLCH
          </span>
          <span className="font-mono text-[10px] text-stone-300 mt-0.5">360° hues</span>
        </div>

        {HUE_MARKERS.map((deg) => {
          const rad = ((deg - 90) * Math.PI) / 180;
          const r = size * 0.38;
          const cx = size / 2 + r * Math.cos(rad);
          const cy = size / 2 + r * Math.sin(rad);
          return (
            <div
              key={deg}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: cx, top: cy }}
            >
              <div
                className="h-3 w-3 rounded-full border-2 border-stone-50 shadow-sm"
                style={{ background: `oklch(0.65 0.20 ${deg}deg)` }}
              />
            </div>
          );
        })}
      </div>

      <figcaption className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-stone-400">
          Círculo cromático
        </p>
        <p className="mt-1 text-sm text-stone-500">
          Cada matiz existe no espaço OKLCH com luminosidade e croma uniformes.
        </p>
      </figcaption>
    </figure>
  );
}
