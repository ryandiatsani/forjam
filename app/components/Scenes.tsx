"use client";

import Link from "next/link";
import { useState } from "react";
import Base from "./Base";
import Mum, { PaletteKey } from "./Mum";
import { NOTES, HER_NAME, FROM_NAME } from "../data";

const TOTAL = NOTES.length;

function Nav({ n }: { n: number }) {
  return (
    <nav className="nav">
      <Link className="ghost" href={n === 1 ? "/" : `/note/${n - 1}`}>Back</Link>
      <div className="dots" aria-label={`Page ${n} of ${TOTAL}`}>
        {NOTES.map((_, i) => <span key={i} className={i === n - 1 ? "on" : ""} />)}
      </div>
      {n === TOTAL
        ? <Link className="btn" href="/">Read again</Link>
        : <Link className="btn" href={`/note/${n + 1}`}>Next</Link>}
    </nav>
  );
}

/* ---------- 1. Night sky, giant flower rising ---------- */
const STARS = Array.from({ length: 44 }).map((_, i) => ({
  x: (i * 47 + 13) % 100, y: (i * 29 + 7) % 60, s: 1 + (i % 3), d: (i * 0.37) % 4,
}));

function S1() {
  const t = NOTES[0];
  return (
    <main className="stage s1">
      {STARS.map((s, i) => (
        <i key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
      ))}
      <section className="content">
        <h1>{t.title}</h1>
        <p className="message">{t.text}</p>
        <Nav n={1} />
      </section>
      <div className="rise"><Mum id="s1" palette="gold" /></div>
    </main>
  );
}

/* ---------- 2. Dawn garden, stems grow ---------- */
const FIELD: { p: PaletteKey; w: number; h: number; d: number }[] = [
  { p: "lemon", w: 90, h: 70, d: 0.3 },
  { p: "gold", w: 130, h: 130, d: 0.7 },
  { p: "snow", w: 80, h: 50, d: 1.0 },
  { p: "lemon", w: 112, h: 100, d: 0.5 },
  { p: "gold", w: 90, h: 80, d: 0.9 },
];

function S2() {
  const t = NOTES[1];
  return (
    <main className="stage s2">
      <section className="content left">
        <h1>{t.title}</h1>
        <p className="message">{t.text}</p>
        <Nav n={2} />
      </section>
      <div className="field">
        {FIELD.map((f, i) => (
          <div className="fi" key={i} style={{ width: f.w }}>
            <div className="head" style={{ animationDelay: `${f.d + 1.1}s` }}>
              <Mum id={`s2-${i}`} palette={f.p} />
            </div>
            <i className="stem" style={{ height: f.h, animationDelay: `${f.d}s` }} />
          </div>
        ))}
      </div>
      <div className="grass" />
    </main>
  );
}

/* ---------- 3. Breathing ---------- */
function S3() {
  const t = NOTES[2];
  return (
    <main className="stage s3">
      <div className="moon" />
      <section className="content">
        <div className="bw">
          <i className="ring r1" /><i className="ring r2" />
          <div className="bflower"><Mum id="s3" palette="lemon" /></div>
        </div>
        <p className="cue"><span className="in">breathe in</span><span className="out">breathe out</span></p>
        <h1>{t.title}</h1>
        <p className="message">{t.text}</p>
        <Nav n={3} />
      </section>
    </main>
  );
}

/* ---------- 4. Handwritten letter ---------- */
function S4() {
  const t = NOTES[3];
  return (
    <main className="stage s4">
      <section className="content">
        <div className="paper">
          <div className="pressed"><Mum id="s4" palette="coral" /></div>
          <p className="hand dear">Dear {HER_NAME},</p>
          <h1 className="hand ttl">{t.title}</h1>
          <p className="hand body">{t.text}</p>
          <p className="hand sig"> {FROM_NAME}</p>
        </div>
        <Nav n={4} />
      </section>
    </main>
  );
}

/* ---------- 5. Bouquet, tap to scatter petals ---------- */
const BURST = Array.from({ length: 18 }).map((_, i) => {
  const a = (i / 18) * Math.PI * 2;
  const r = 90 + (i % 3) * 45;
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r + 70, rot: (i * 53) % 360, c: i % 2 ? "#ffd1dc" : "#ffe3a1" };
});

function S5() {
  const t = NOTES[4];
  const [bursts, setBursts] = useState<number[]>([]);
  const pop = () => {
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1800);
  };

  return (
    <main className="stage s5">
      <section className="content">
        <h1>{t.title}</h1>
        <p className="message">{t.text}</p>

        <div
          className="bq"
          role="button"
          tabIndex={0}
          aria-label="Tap the bouquet"
          onClick={pop}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pop()}
        >
          <i className="st l" /><i className="st c" /><i className="st r" />
<div className="bf fl"><Mum id="s5a" palette="lemon" /></div>
<div className="bf fc"><Mum id="s5b" palette="gold" /></div>
<div className="bf fr"><Mum id="s5c" palette="lemon" /></div>
          <div className="vase" />
          {bursts.map((id) => (
            <div className="burst" key={id}>
              {BURST.map((p, i) => (
                <i key={i} className="bp" style={{
                  ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px`,
                  ["--r" as string]: `${p.rot}deg`, ["--c" as string]: p.c,
                }} />
              ))}
            </div>
          ))}
        </div>
        <p className="hint">tap the bouquet</p>

        <Nav n={5} />
        <p className="sign">With warmth, from {FROM_NAME}</p>
      </section>
    </main>
  );
}

export default function Scene({ n }: { n: number }) {
  return (
    <>
      <Base />
      <style>{css}</style>
      {n === 1 ? <S1 /> : n === 2 ? <S2 /> : n === 3 ? <S3 /> : n === 4 ? <S4 /> : <S5 />}
    </>
  );
}

const css = `
/* 1 */
.s1{align-items:flex-start; padding-top:11vh;
  background:linear-gradient(180deg,#0f0b24 0%,#3a1f5c 45%,#d96a6a 85%,#ffb27a 100%)}
.star{position:absolute; border-radius:50%; background:#fff4e2; animation:twinkle 3.5s ease-in-out infinite}
.rise{position:absolute; left:50%; z-index:1; width:min(130vw,860px); transform:translateX(-50%);
  bottom:calc(min(130vw,860px) / -2 + 10px)}
.rise .flower{width:100%; filter:drop-shadow(0 0 60px rgba(255,190,100,.5))}
@keyframes twinkle{0%,100%{opacity:.2}50%{opacity:1}}

/* 2 */
.s2{align-items:flex-start; padding-top:10vh; --ink:#4a1c3d; --msg:#6b2a4f;
  background:linear-gradient(180deg,#fff8d8 0%,#ffeba0 55%,#ffd36b 100%)}
.s2::before{display:none}
.content.left{align-items:flex-start; text-align:left; max-width:560px}
.field{position:absolute; bottom:34px; left:50%; transform:translateX(-50%); z-index:1;
  display:flex; align-items:flex-end; justify-content:center; width:min(100%,640px)}
.fi{display:flex; flex-direction:column; align-items:center; margin:0 -6px}
.fi .flower{width:100%; filter:drop-shadow(0 6px 14px rgba(120,30,70,.25))}
.head{width:100%; animation:pop 1s cubic-bezier(.2,1.4,.4,1) both; transform-origin:50% 100%}
.stem{display:block; width:5px; border-radius:3px; transform-origin:bottom;
  background:linear-gradient(#5c9a6a,#2f6b4a); animation:grow 1.2s ease-out both}
.grass{position:absolute; left:0; right:0; bottom:0; height:46px; z-index:2;
  background:linear-gradient(#7fb887,#4a8a63)}
@keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes pop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}

/* 3 */
.s3{background:linear-gradient(180deg,#0d0b25 0%,#231c52 55%,#4a3a86 100%); --msg:#d9d0f5}
.moon{position:absolute; top:7%; right:9%; width:60px; height:60px; border-radius:50%;
  background:radial-gradient(circle at 35% 35%,#fffdf0,#f1e8c2);
  box-shadow:0 0 50px 14px rgba(255,248,210,.35)}
.bw{position:relative; width:min(70vw,290px); aspect-ratio:1; display:grid; place-items:center}
.bflower{width:78%; animation:breath 8s ease-in-out infinite}
.bflower .flower{width:100%; animation:none}
.ring{position:absolute; inset:0; border-radius:50%; border:1px solid rgba(230,222,250,.4);
  animation:ring 8s ease-in-out infinite}
.r2{animation-delay:-2s; border-color:rgba(230,222,250,.22)}
.cue{position:relative; height:1.5em; width:100%; font-family:'Cormorant Garamond',serif;
  font-style:italic; font-size:22px; color:#cfc2f0}
.cue span{position:absolute; inset:0}
.cue .in{animation:cueIn 8s ease-in-out infinite}
.cue .out{animation:cueOut 8s ease-in-out infinite}
@keyframes breath{0%,100%{transform:scale(.8)}50%{transform:scale(1.08)}}
@keyframes ring{0%,100%{transform:scale(.78);opacity:.4}50%{transform:scale(1.12);opacity:1}}
@keyframes cueIn{0%{opacity:0}10%,40%{opacity:1}50%,100%{opacity:0}}
@keyframes cueOut{0%,50%{opacity:0}60%,90%{opacity:1}100%{opacity:0}}

/* 4 */
.s4{--ink:#4a3426; background:linear-gradient(135deg,#ecd8bb,#d3a77a)}
.s4::before{display:none}
.paper{position:relative; width:100%; text-align:left; transform:rotate(-1.2deg);
  padding:40px 28px 28px; color:#4a3426; border-radius:4px;
  background:#fffaf0 repeating-linear-gradient(transparent 0 35px, rgba(160,120,80,.18) 35px 36px);
  box-shadow:0 18px 40px rgba(90,50,20,.3), 0 2px 0 rgba(0,0,0,.05)}
.hand{font-family:'Caveat',cursive; font-weight:500; letter-spacing:0}
.dear{font-size:30px; line-height:36px}
.ttl{font-size:42px; line-height:44px; font-weight:700; margin:6px 0 10px; letter-spacing:0}
.body{font-size:29px; line-height:36px; color:#5a4030; animation:none}
.sig{font-size:30px; line-height:36px; margin-top:14px; text-align:right}
.pressed{position:absolute; top:-52px; right:-30px; width:130px; transform:rotate(18deg)}
.pressed .flower{width:100%; animation:none; filter:drop-shadow(0 5px 10px rgba(0,0,0,.28))}
.s4 .btn{background:#4a3426; color:#fff4e2}

/* 5 */
.s5{background:linear-gradient(180deg,#2a1738 0%,#7a3a5a 40%,#ee8a6a 75%,#ffd98a 100%)}
.bq{position:relative; width:380px; height:380px; flex:none; cursor:pointer; outline-offset:6px;
  -webkit-tap-highlight-color:transparent}
.bf{position:absolute; z-index:2}
.bf .flower{width:100%}
.fl{left:0; top:70px; width:150px}
.fc{left:95px; top:0; width:190px; z-index:3}
.fr{right:0; top:70px; width:150px}
.st{position:absolute; width:5px; border-radius:3px; transform-origin:top; z-index:1;
  background:linear-gradient(#5c9a6a,#2f6b4a)}
.st.l{left:75px; top:145px; height:185px; transform:rotate(-38deg)}
.st.r{left:303px; top:145px; height:185px; transform:rotate(38deg)}
.st.c{left:187px; top:95px; height:200px}
.vase{position:absolute; left:130px; bottom:0; width:120px; height:90px; z-index:4;
  border-radius:8px 8px 38px 38px; background:linear-gradient(180deg,#f6d9a8,#c98a5a);
  box-shadow:0 10px 24px rgba(0,0,0,.3), inset 0 6px 0 rgba(255,255,255,.25)}
.burst{position:absolute; left:190px; top:100px; z-index:6; pointer-events:none}
.bp{position:absolute; width:10px; height:18px; background:var(--c);
  border-radius:60% 60% 60% 60% / 80% 80% 30% 30%; animation:burst 1.6s ease-out forwards}
.hint{font-family:'Cormorant Garamond',serif; font-style:italic; font-size:19px; opacity:.8; margin-top:-8px}
@keyframes burst{
  from{transform:translate(0,0) rotate(0); opacity:1}
  to{transform:translate(var(--dx),var(--dy)) rotate(var(--r)); opacity:0}
}
@media (max-width:420px){ .bq{transform:scale(.82); margin:-34px 0} }
`;