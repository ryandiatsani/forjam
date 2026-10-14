import type { ReactNode } from "react";
import Base from "./Base";
import Mum, { PaletteKey } from "./Mum";

const FALLING = Array.from({ length: 12 }).map((_, i) => ({
  left: (i * 83 + 11) % 100,
  size: 10 + ((i * 7) % 12),
  delay: (i * 1.7) % 14,
  dur: 14 + ((i * 3) % 9),
  drift: ((i * 37) % 60) - 30,
}));

export default function Shell({
  bg,
  petals,
  corners,
  children,
}: {
  bg: string;
  petals: [string, string];
  corners: [PaletteKey, PaletteKey];
  children: ReactNode;
}) {
  return (
    <main
      className="stage"
      style={{ background: bg, ["--p1" as string]: petals[0], ["--p2" as string]: petals[1] }}
    >
      <Base />
      <style>{`
        .corner{position:absolute; z-index:0; width:min(60vw,320px); opacity:.5; pointer-events:none}
        .corner.tl{top:-70px; left:-80px}
        .corner.br{bottom:-80px; right:-90px}
        .corner .flower{width:100%}
      `}</style>

      <div className="corner tl"><Mum id="ctl" palette={corners[0]} /></div>
      <div className="corner br"><Mum id="cbr" palette={corners[1]} /></div>

      {FALLING.map((p, i) => (
        <span
          key={i}
          className="fall"
          style={{
            left: `${p.left}%`,
            width: p.size * 0.55,
            height: p.size,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}

      <section className="content">{children}</section>
    </main>
  );
}