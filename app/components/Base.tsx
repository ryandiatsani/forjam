export default function Base() {
  return <style>{css}</style>;
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Nunito:wght@400;600&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
html,body{min-height:100%}
body{background:#2a1738}

.stage{
  position:relative; min-height:100svh; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
  padding:40px 20px;
  color:var(--ink,#fff4e2);
  font-family:'Nunito',system-ui,sans-serif;
}
.stage::before{
  content:""; position:absolute; inset:0; z-index:0; pointer-events:none;
  background:radial-gradient(ellipse at 50% 38%, rgba(255,200,120,.22), transparent 55%);
}
.content{
  position:relative; z-index:2; width:100%; max-width:520px;
  display:flex; flex-direction:column; align-items:center; text-align:center; gap:22px;
}

.flower{
  width:min(78vw,340px); height:auto;
  filter:drop-shadow(0 12px 40px rgba(255,170,80,.3));
  animation:sway 9s ease-in-out infinite;
  transform-origin:50% 90%;
}
.halo{animation:breathe 6s ease-in-out infinite; transform-origin:100px 100px}
.layer{transform-origin:100px 100px; animation:spin linear infinite}
.bloom{transform-origin:100px 100px; animation:bloom 2.4s cubic-bezier(.2,.9,.3,1) both}

h1{
  font-family:'Cormorant Garamond',serif; font-weight:600;
  font-size:clamp(30px,6vw,44px); line-height:1.15; letter-spacing:.01em;
}
.message{
  font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:500;
  font-size:clamp(22px,4.4vw,29px); line-height:1.4;
  max-width:30ch; color:var(--msg,#ffe7c4);
  animation:fadeIn 1s ease .4s both;
}

.btn{
  display:inline-block; text-decoration:none;
  font:600 16px 'Nunito',sans-serif; color:#3a1c3d;
  background:linear-gradient(180deg,#ffe3a1,#ffc46b);
  border:0; border-radius:999px; padding:14px 30px; cursor:pointer;
  box-shadow:0 8px 24px rgba(0,0,0,.22);
  transition:transform .2s ease, box-shadow .2s ease;
}
.btn:hover{transform:translateY(-2px); box-shadow:0 12px 28px rgba(0,0,0,.3)}
.btn:active{transform:scale(.97)}
.btn:focus-visible,.ghost:focus-visible{outline:3px solid currentColor; outline-offset:3px}
.ghost{color:inherit; opacity:.85; text-decoration:none; font-weight:600; padding:12px 8px}

.nav{display:flex; align-items:center; justify-content:space-between; width:100%; max-width:420px}
.dots{display:flex; gap:8px}
.dots span{width:8px; height:8px; border-radius:50%; background:currentColor; opacity:.3}
.dots .on{opacity:1; transform:scale(1.3)}
.sign{font-size:14px; opacity:.75}

.fall{
  position:absolute; top:-8%; z-index:1; pointer-events:none;
  background:linear-gradient(180deg,var(--p1,#ffe3a1),var(--p2,#f4a259));
  border-radius:60% 60% 60% 60% / 80% 80% 30% 30%;
  opacity:.75; animation:fall linear infinite;
}

@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bloom{from{transform:scale(0) rotate(-40deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
@keyframes sway{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}
@keyframes breathe{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes fall{
  0%{transform:translate(0,0) rotate(0);opacity:0}
  10%{opacity:.75}
  100%{transform:translate(var(--drift,0),115vh) rotate(420deg);opacity:0}
}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important}
  .fall{display:none}
}
`;