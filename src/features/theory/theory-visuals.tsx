export type TheoryEntry = { id: string; trigger: string; body: React.ReactNode };

export function SwatchDot({
  hue,
  chroma = 0.2,
  lightness = 0.65,
  label,
}: {
  hue: number;
  chroma?: number;
  lightness?: number;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="h-9 w-9 rounded-full border-2 border-white shadow-md"
        style={{ background: `oklch(${lightness} ${chroma} ${hue}deg)` }}
      />
      {label && <span className="font-mono text-[10px] text-stone-400">{label}</span>}
    </div>
  );
}

export function HarmonyDots({ hues, labels }: { hues: number[]; labels?: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {hues.map((h, i) => (
        <SwatchDot key={i} hue={h} label={labels?.[i] ?? `${h}°`} />
      ))}
    </div>
  );
}

export function ColorDots({ hues }: { hues: number[] }) {
  return (
    <span className="ml-2 inline-flex items-center gap-1.5 align-middle">
      {hues.map((h) => (
        <span
          key={h}
          className="inline-block h-5 w-5 rounded-full border-2 border-white shadow-sm"
          style={{ background: `oklch(0.65 0.20 ${h}deg)` }}
        />
      ))}
    </span>
  );
}

export function NeutralDots() {
  const specs = [
    { l: 0.97, c: 0.004 },
    { l: 0.78, c: 0.008 },
    { l: 0.5, c: 0.012 },
    { l: 0.25, c: 0.015 },
  ];
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {specs.map(({ l, c }, i) => (
        <SwatchDot key={i} hue={250} lightness={l} chroma={c} />
      ))}
    </div>
  );
}

export function TonalScaleBar() {
  const SCALE = [
    { stop: 50, l: 0.98, c: 0.01 },
    { stop: 100, l: 0.96, c: 0.03 },
    { stop: 200, l: 0.9, c: 0.06 },
    { stop: 300, l: 0.82, c: 0.09 },
    { stop: 400, l: 0.72, c: 0.12 },
    { stop: 500, l: 0.6, c: 0.15 },
    { stop: 600, l: 0.5, c: 0.14 },
    { stop: 700, l: 0.4, c: 0.12 },
    { stop: 800, l: 0.25, c: 0.09 },
    { stop: 900, l: 0.15, c: 0.05 },
    { stop: 950, l: 0.1, c: 0.03 },
  ] as const;

  return (
    <div className="mt-5 overflow-hidden rounded-xl shadow-sm">
      <div className="flex">
        {SCALE.map(({ stop, l, c }) => (
          <div
            key={stop}
            className="flex flex-1 flex-col items-center py-5"
            style={{ background: `oklch(${l} ${c} 250deg)` }}
          >
            <span
              className="font-mono text-[10px] font-medium"
              style={{
                color: l > 0.5 ? 'oklch(0.22 0.05 250deg)' : 'oklch(0.92 0.01 250deg)',
              }}
            >
              {stop}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
