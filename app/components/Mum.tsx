export type Palette = {
  outer: [string, string];
  mid: [string, string];
  inner: [string, string];
  core: [string, string];
  stroke: string;
  glow: string;
};

export const PALETTES = {
  gold: {
    outer: ["#f4a259", "#ffd98a"], mid: ["#f6b85f", "#ffe3a1"],
    inner: ["#ffd070", "#fff1c2"], core: ["#fff8dc", "#ffe08a"],
    stroke: "rgba(150,70,20,.18)", glow: "#ffd98a",
  },
    lemon: {
    outer: ["#f2c230", "#fff08a"], mid: ["#f7d048", "#fff5a8"],
    inner: ["#fbe06a", "#fffbd0"], core: ["#fffdf0", "#fff2a0"],
    stroke: "rgba(140,100,0,.2)", glow: "#fff08a",
  },
  rose: {
    outer: ["#d94f7a", "#ffb3c7"], mid: ["#e8708f", "#ffc9d6"],
    inner: ["#f59ab0", "#ffe0e8"], core: ["#fff0f3", "#ffc2d1"],
    stroke: "rgba(120,20,60,.2)", glow: "#ffb3c7",
  },
  snow: {
    outer: ["#b9a7e6", "#f4efff"], mid: ["#cfc2f0", "#fbf8ff"],
    inner: ["#e6defa", "#ffffff"], core: ["#ffffff", "#efe8ff"],
    stroke: "rgba(80,60,140,.18)", glow: "#e6defa",
  },
  coral: {
    outer: ["#ee6c4d", "#ffb08a"], mid: ["#f58a5b", "#ffc8a0"],
    inner: ["#ffa875", "#ffe0c2"], core: ["#fff2e0", "#ffcf9e"],
    stroke: "rgba(130,40,10,.2)", glow: "#ffb08a",
  },
} satisfies Record<string, Palette>;

export type PaletteKey = keyof typeof PALETTES;

const LAYERS = [
  { n: 30, len: 42, rx: 4.6, part: "outer", dur: 90, rev: false },
  { n: 26, len: 35, rx: 5, part: "mid", dur: 70, rev: true },
  { n: 22, len: 28, rx: 5, part: "mid", dur: 80, rev: false },
  { n: 18, len: 21, rx: 4.6, part: "inner", dur: 60, rev: true },
  { n: 14, len: 14, rx: 4, part: "inner", dur: 50, rev: false },
  { n: 10, len: 8, rx: 3.2, part: "core", dur: 40, rev: true },
] as const;

export default function Mum({
  id,
  palette,
  className = "",
}: {
  id: string; // must be unique on the page
  palette: PaletteKey;
  className?: string;
}) {
  const p = PALETTES[palette];

  return (
    <svg viewBox="0 0 200 200" className={`flower ${className}`} role="img" aria-label="A chrysanthemum">
      <defs>
        {(["outer", "mid", "inner"] as const).map((k) => (
          <linearGradient key={k} id={`${id}-${k}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={p[k][0]} />
            <stop offset="1" stopColor={p[k][1]} />
          </linearGradient>
        ))}
        <radialGradient id={`${id}-core`}>
          <stop offset="0" stopColor={p.core[0]} />
          <stop offset="1" stopColor={p.core[1]} />
        </radialGradient>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0" stopColor={p.glow} stopOpacity=".55" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="98" fill={`url(#${id}-halo)`} className="halo" />

      {LAYERS.map((l, li) => (
        <g
          key={li}
          className="layer"
          style={{
            animationDuration: `${l.dur}s`,
            animationDirection: l.rev ? "reverse" : "normal",
          }}
        >
          <g className="bloom" style={{ animationDelay: `${li * 0.18}s` }}>
            {Array.from({ length: l.n }).map((_, i) => (
              <ellipse
                key={i}
                cx={100}
                cy={100 - l.len}
                rx={l.rx}
                ry={l.len}
                fill={`url(#${id}-${l.part})`}
                stroke={p.stroke}
                strokeWidth=".35"
                transform={`rotate(${(360 / l.n) * i + li * 7} 100 100)`}
              />
            ))}
          </g>
        </g>
      ))}
    </svg>
  );
}