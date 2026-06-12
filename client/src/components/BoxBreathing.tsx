import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const PHASES = ["Вдох", "Задержка", "Выдох", "Задержка"];
const PHASE_MS = 4000;
const CYCLE_MS = PHASE_MS * 4;
const CX = 170;
const CY = 132;
const RMIN = 36;
const RMAX = 72;

const GRAIN =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);
  return reduced;
}

const smooth = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);

export default function BoxBreathing() {
  const reduced = usePrefersReducedMotion();

  const trackRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const hglowRef = useRef<SVGCircleElement>(null);
  const orbWRef = useRef<SVGCircleElement>(null);
  const orbCRef = useRef<SVGCircleElement>(null);
  const shadeRef = useRef<SVGCircleElement>(null);
  const specRef = useRef<SVGEllipseElement>(null);
  const auraRef = useRef<SVGCircleElement>(null);
  const ambRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<SVGTextElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGGElement>(null);
  const pdotsRef = useRef<SVGGElement>(null);
  const phaseRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<() => void>(() => {});

  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    const NS = "http://www.w3.org/2000/svg";
    const track = trackRef.current;
    if (!track) return;
    const L = track.getTotalLength();

    const mk = (tag: string, attrs: Record<string, string>) => {
      const el = document.createElementNS(NS, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    };

    const pdots = pdotsRef.current!;
    pdots.replaceChildren();
    for (let i = 0; i < 4; i++) {
      const q = track.getPointAtLength((i / 4) * L);
      pdots.appendChild(
        mk("circle", {
          cx: q.x.toFixed(1),
          cy: q.y.toFixed(1),
          r: "2.4",
          fill: "#c98a5f",
          "fill-opacity": "0.5",
        })
      );
    }

    type Part = {
      el: SVGCircleElement;
      ang: number;
      rad: number;
      sp: number;
      base: number;
      tw: number;
      ph: number;
    };
    const parts: Part[] = [];
    const trail: SVGCircleElement[] = [];

    if (!reduced) {
      const pl = particlesRef.current!;
      pl.replaceChildren();
      for (let j = 0; j < 14; j++) {
        const sz = 0.6 + Math.random() * 1.5;
        const el = mk("circle", {
          r: sz.toFixed(2),
          fill: "#e9b486",
        }) as SVGCircleElement;
        pl.appendChild(el);
        parts.push({
          el,
          ang: Math.random() * 6.283,
          rad: 80 + Math.random() * 30,
          sp: (Math.random() < 0.5 ? -1 : 1) * (0.0006 + Math.random() * 0.0016),
          base: 0.08 + Math.random() * 0.26,
          tw: 0.4 + Math.random() * 1.1,
          ph: Math.random() * 6.283,
        });
      }
      const tg = trailRef.current!;
      tg.replaceChildren();
      for (let k = 0; k < 6; k++) {
        const d = mk("circle", { r: "0", fill: "#f0a368" }) as SVGCircleElement;
        tg.appendChild(d);
        trail.push(d);
      }
    }

    let run = false;
    let raf = 0;
    let rafIdle = 0;
    let st = 0;
    let pa = 0;
    let lp = -1;
    let cyc = 0;

    const drift = (now: number) => {
      if (reduced) return;
      for (const p of parts) {
        p.ang += p.sp;
        p.el.setAttribute("cx", (CX + p.rad * Math.cos(p.ang)).toFixed(1));
        p.el.setAttribute("cy", (CY + p.rad * Math.sin(p.ang)).toFixed(1));
        p.el.setAttribute(
          "fill-opacity",
          (
            p.base *
            (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(now * 0.001 * p.tw + p.ph)))
          ).toFixed(3)
        );
      }
    };

    const frame = (now: number) => {
      const c = (now - st) % CYCLE_MS;
      const prog = c / CYCLE_MS;

      if (!reduced) {
        const pt = track.getPointAtLength(prog * L);
        headRef.current?.setAttribute("cx", pt.x.toFixed(1));
        headRef.current?.setAttribute("cy", pt.y.toFixed(1));
        hglowRef.current?.setAttribute("cx", pt.x.toFixed(1));
        hglowRef.current?.setAttribute("cy", pt.y.toFixed(1));
        for (let k = 0; k < trail.length; k++) {
          const tp = track.getPointAtLength(
            ((((prog - (k + 1) * 0.013) % 1) + 1) % 1) * L
          );
          trail[k].setAttribute("cx", tp.x.toFixed(1));
          trail[k].setAttribute("cy", tp.y.toFixed(1));
          trail[k].setAttribute("r", (4.4 * (1 - (k + 1) * 0.14)).toFixed(2));
          trail[k].setAttribute(
            "fill-opacity",
            (0.5 * (1 - (k + 1) * 0.15)).toFixed(2)
          );
        }
      }

      const p = Math.floor(c / PHASE_MS);
      const w = smooth((c % PHASE_MS) / PHASE_MS);
      const full = p === 0 ? w : p === 1 ? 1 : p === 2 ? 1 - w : 0;
      const r = RMIN + (RMAX - RMIN) * full;

      orbWRef.current?.setAttribute("r", r.toFixed(1));
      orbCRef.current?.setAttribute("r", r.toFixed(1));
      shadeRef.current?.setAttribute("r", r.toFixed(1));
      orbWRef.current?.setAttribute("opacity", full.toFixed(2));
      orbCRef.current?.setAttribute("opacity", (1 - full).toFixed(2));
      specRef.current?.setAttribute("cx", (CX - r * 0.3).toFixed(1));
      specRef.current?.setAttribute("cy", (CY - r * 0.34).toFixed(1));
      specRef.current?.setAttribute("rx", (r * 0.34).toFixed(1));
      specRef.current?.setAttribute("ry", (r * 0.22).toFixed(1));
      specRef.current?.setAttribute("opacity", (0.28 + full * 0.22).toFixed(2));
      auraRef.current?.setAttribute("r", (r + 14 + full * 16).toFixed(1));
      auraRef.current?.setAttribute(
        "stroke-opacity",
        (0.08 + full * 0.15).toFixed(3)
      );
      glowRef.current?.setAttribute("r", (r + 24 + full * 26).toFixed(1));
      glowRef.current?.setAttribute("opacity", (0.2 + full * 0.32).toFixed(3));
      ambRef.current?.setAttribute("opacity", (0.1 + full * 0.22).toFixed(3));

      drift(now);

      if (countRef.current) {
        countRef.current.style.fontSize = (24 + full * 12).toFixed(0) + "px";
        countRef.current.textContent = String(
          4 - Math.floor((c % PHASE_MS) / 1000)
        );
      }

      if (p !== lp) {
        if (phaseRef.current) {
          phaseRef.current.style.opacity = "0";
          const txt = PHASES[p];
          setTimeout(() => {
            if (phaseRef.current) {
              phaseRef.current.textContent = txt;
              phaseRef.current.style.opacity = "0.92";
            }
          }, 170);
        }
        if (p === 0 && lp === 3) {
          cyc += 1;
          setCycles(cyc);
        }
        lp = p;
      }

      raf = requestAnimationFrame(frame);
    };

    const idle = (now: number) => {
      if (run) return;
      drift(now);
      rafIdle = requestAnimationFrame(idle);
    };
    rafIdle = requestAnimationFrame(idle);

    toggleRef.current = () => {
      if (run) {
        pa = performance.now() - st;
        cancelAnimationFrame(raf);
        run = false;
        setRunning(false);
        rafIdle = requestAnimationFrame(idle);
      } else {
        st = performance.now() - pa;
        run = true;
        setRunning(true);
        cancelAnimationFrame(rafIdle);
        raf = requestAnimationFrame(frame);
      }
    };

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafIdle);
    };
  }, [reduced]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "30px",
        padding: "22px 22px 20px",
        background:
          "radial-gradient(125% 95% at 50% 16%,#fdfaf5 0%,#f3ebdd 68%,#ece0cf 100%)",
        border: "1px solid rgba(255,255,255,.6)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,.7) inset,0 30px 70px -34px rgba(120,70,40,.4)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: GRAIN,
          backgroundSize: "140px",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 100% at 50% 40%,transparent 50%,rgba(74,40,18,.13) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: "#ab9277",
            marginBottom: "4px",
          }}
        >
          дыхание по квадрату
        </div>

        <svg
          viewBox="0 0 340 250"
          width="340"
          height="250"
          style={{ maxWidth: "100%" }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="w4amb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#cf6e42" stopOpacity="0.5" />
              <stop offset="55%" stopColor="#cf6e42" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#cf6e42" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="w4glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f6a76e" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#e58a52" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#e58a52" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="w4warm" cx="40%" cy="34%" r="68%">
              <stop offset="0%" stopColor="#ffdcb8" />
              <stop offset="34%" stopColor="#ef9a5f" />
              <stop offset="72%" stopColor="#cd6a35" />
              <stop offset="100%" stopColor="#b14e22" />
            </radialGradient>
            <radialGradient id="w4cool" cx="40%" cy="34%" r="68%">
              <stop offset="0%" stopColor="#d7ecda" />
              <stop offset="36%" stopColor="#94bd9c" />
              <stop offset="74%" stopColor="#5f8c6b" />
              <stop offset="100%" stopColor="#4c785a" />
            </radialGradient>
            <radialGradient id="w4shade" cx="66%" cy="72%" r="76%">
              <stop offset="0%" stopColor="#5a2810" stopOpacity="0" />
              <stop offset="58%" stopColor="#5a2810" stopOpacity="0" />
              <stop offset="100%" stopColor="#4a1f0c" stopOpacity="0.5" />
            </radialGradient>
            <radialGradient id="w4dot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe9d3" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#f4a868" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f4a868" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle
            ref={ambRef}
            cx="170"
            cy="132"
            r="118"
            fill="url(#w4amb)"
            opacity="0.14"
          />
          <circle
            cx="170"
            cy="132"
            r="112"
            fill="none"
            stroke="#c0a98e"
            strokeWidth="1.2"
            strokeOpacity="0.1"
            strokeDasharray="1 7"
            strokeLinecap="round"
          />
          <path
            ref={trackRef}
            d="M124 58 L216 58 A28 28 0 0 1 244 86 L244 178 A28 28 0 0 1 216 206 L124 206 A28 28 0 0 1 96 178 L96 86 A28 28 0 0 1 124 58 Z"
            fill="none"
            stroke="#d6c4ad"
            strokeWidth="1.6"
            strokeOpacity="0.55"
          />
          <g ref={pdotsRef} />
          <g ref={particlesRef} />
          <g ref={trailRef} />
          <circle
            ref={glowRef}
            cx="170"
            cy="132"
            r="80"
            fill="url(#w4glow)"
            opacity="0.3"
          />
          <circle
            ref={auraRef}
            cx="170"
            cy="132"
            r="84"
            fill="none"
            stroke="#cf6e42"
            strokeWidth="1.4"
            strokeOpacity="0.12"
          />
          <circle ref={orbCRef} cx="170" cy="132" r="40" fill="url(#w4cool)" opacity="0" />
          <circle ref={orbWRef} cx="170" cy="132" r="40" fill="url(#w4warm)" opacity="1" />
          <circle ref={shadeRef} cx="170" cy="132" r="40" fill="url(#w4shade)" />
          <ellipse
            ref={specRef}
            cx="150"
            cy="112"
            rx="14"
            ry="9"
            fill="#ffffff"
            opacity="0.4"
          />
          {!reduced && (
            <>
              <circle ref={hglowRef} cx="124" cy="58" r="16" fill="url(#w4dot)" />
              <circle ref={headRef} cx="124" cy="58" r="5" fill="#fff3e6" />
            </>
          )}
          <text
            ref={countRef}
            x="170"
            y="132"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontFamily: "var(--font-serif)", fill: "#fff6ee" }}
          />
        </svg>

        <div
          ref={phaseRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "19px",
            color: "#244a31",
            opacity: 0.55,
            transition: "opacity .4s ease",
            minHeight: "24px",
            marginTop: "-30px",
          }}
        >
          Готовы?
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "14px" }}>
          <button
            onClick={() => toggleRef.current()}
            className="active:scale-[0.98]"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "11px",
              background: "#b45d35",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "7px 22px 7px 7px",
              cursor: "pointer",
              fontSize: "15px",
              boxShadow: "0 8px 22px -10px rgba(180,93,53,.7)",
              transition: "background .2s,transform .1s",
            }}
          >
            <span
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {running ? <Pause size={18} /> : <Play size={18} />}
            </span>
            {running ? "Пауза" : "Начать дышать"}
          </button>
          <span style={{ fontSize: "13px", color: "#8a7d6e" }}>
            Цикл{" "}
            <b style={{ fontWeight: 500, color: "#5e574f" }}>{cycles}</b>
          </span>
        </div>

        <p
          style={{
            fontSize: "12.5px",
            color: "#8a7d6e",
            textAlign: "center",
            margin: "10px 0 0",
            maxWidth: "300px",
            lineHeight: 1.6,
          }}
        >
          Дышите вместе со сферой: вдох · задержка · выдох · задержка — по 4
          секунды
        </p>
      </div>
    </div>
  );
}
