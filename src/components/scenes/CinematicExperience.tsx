import { useRef, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import type { SceneId } from "@/hooks/useScrollProgress";
import WardrobeCanvas from "./WardrobeCanvas";

// Scene background images
import sceneEmptyWall from "@/assets/scene-empty-wall.png";
import scene3dWardrobe from "@/assets/scene-3d-wardrobe.png";
import sceneBedroom from "@/assets/scene-bedroom.png";
import sceneManufacturing from "@/assets/scene-manufacturing.png";
import sceneProposal from "@/assets/scene-proposal.png";

/* ─────────────────────────────────────────────────────────
   Scene configuration
───────────────────────────────────────────────────────── */
interface SceneConfig {
  sub: string;
  headline: React.ReactNode;
  size: string;
  bgImage?: string;
  bgOpacity?: number;
  showWardrobe?: boolean;
  wardrobeOpacity?: number;
}

const SCENES: Record<SceneId, SceneConfig> = {
  1: {
    sub: "Scene I",
    headline: (
      <>
        Every great wardrobe
        <br />
        <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>
          starts with a wall.
        </em>
      </>
    ),
    size: "text-4xl md:text-6xl",
    bgImage: sceneEmptyWall,
    bgOpacity: 0.55,
    showWardrobe: false,
  },
  2: {
    sub: "Scene II — Design Begins",
    headline: (
      <>
        Measure once.
        <br />
        <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>
          Design intelligently.
        </em>
      </>
    ),
    size: "text-4xl md:text-6xl",
    bgImage: scene3dWardrobe,
    bgOpacity: 0.25,
    showWardrobe: true,
  },
  3: {
    sub: "Scene III — Intelligence",
    headline: (
      <>
        The software
        <br />
        <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>
          is thinking.
        </em>
      </>
    ),
    size: "text-4xl md:text-6xl",
    bgImage: scene3dWardrobe,
    bgOpacity: 0.15,
    showWardrobe: true,
  },
  4: {
    sub: "Scene IV — Premium Materials",
    headline: (
      <>
        Every finish.
        <br />
        <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>
          Perfectly rendered.
        </em>
      </>
    ),
    size: "text-4xl md:text-6xl",
    showWardrobe: true,
  },
  5: {
    sub: "Scene V — Client Presentation",
    headline: (
      <>
        This is not CAD.
        <br />
        <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>
          This is client presentation.
        </em>
      </>
    ),
    size: "text-3xl md:text-5xl",
    bgImage: sceneBedroom,
    bgOpacity: 0.5,
    showWardrobe: false,
  },
  6: {
    sub: "Scene VI — Manufacturing Intelligence",
    headline: (
      <>
        Same design.
        <br />
        <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>
          Instantly production-ready.
        </em>
      </>
    ),
    size: "text-3xl md:text-5xl",
    bgImage: sceneManufacturing,
    bgOpacity: 0.6,
    showWardrobe: false,
  },
  7: {
    sub: "Scene VII — Professional Proposal",
    headline: (
      <>
        Beautiful.
        <br />
        <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>
          Effortless.
        </em>
      </>
    ),
    size: "text-4xl md:text-6xl",
    bgImage: sceneProposal,
    bgOpacity: 0.55,
    showWardrobe: false,
  },
  8: {
    sub: "The Future of Wardrobe Design",
    headline: (
      <>
        Design Beautiful Wardrobes.
        <br />
        <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>
          From Measurement to Manufacturing.
        </em>
      </>
    ),
    size: "text-3xl md:text-5xl",
    bgImage: scene3dWardrobe,
    bgOpacity: 0.3,
    showWardrobe: true,
    wardrobeOpacity: 0.6,
  },
};

/* ─────────────────────────────────────────────────────────
   Laser SVG — Scene 1 only
───────────────────────────────────────────────────────── */
function LaserOverlay({ active }: { active: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 6,
        opacity: active ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <svg width="420" height="580" viewBox="0 0 420 580">
        {/* Horizontal top */}
        <line
          x1="20" y1="30" x2="400" y2="30"
          stroke="oklch(0.78 0.13 78)"
          strokeWidth="0.8"
          strokeDasharray="380"
          strokeDashoffset={active ? 0 : 380}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.25,0.1,0.25,1) 0.2s" }}
        />
        {/* Horizontal bottom */}
        <line
          x1="20" y1="550" x2="400" y2="550"
          stroke="oklch(0.78 0.13 78)"
          strokeWidth="0.8"
          strokeDasharray="380"
          strokeDashoffset={active ? 0 : 380}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.25,0.1,0.25,1) 0.4s" }}
        />
        {/* Vertical left */}
        <line
          x1="20" y1="30" x2="20" y2="550"
          stroke="oklch(0.78 0.13 78)"
          strokeWidth="0.8"
          strokeDasharray="520"
          strokeDashoffset={active ? 0 : 520}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.25,0.1,0.25,1) 0.6s" }}
        />
        {/* Vertical right */}
        <line
          x1="400" y1="30" x2="400" y2="550"
          stroke="oklch(0.78 0.13 78)"
          strokeWidth="0.8"
          strokeDasharray="520"
          strokeDashoffset={active ? 0 : 520}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.25,0.1,0.25,1) 0.8s" }}
        />
        {/* Tick marks */}
        <line x1="15" y1="30" x2="25" y2="30" stroke="oklch(0.78 0.13 78)" strokeWidth="1.2" opacity={active ? 1 : 0} style={{ transition: "opacity 0.3s 2s ease" }} />
        <line x1="15" y1="550" x2="25" y2="550" stroke="oklch(0.78 0.13 78)" strokeWidth="1.2" opacity={active ? 1 : 0} style={{ transition: "opacity 0.3s 2s ease" }} />
        <line x1="20" y1="25" x2="20" y2="35" stroke="oklch(0.78 0.13 78)" strokeWidth="1.2" opacity={active ? 1 : 0} style={{ transition: "opacity 0.3s 2.1s ease" }} />
        <line x1="400" y1="25" x2="400" y2="35" stroke="oklch(0.78 0.13 78)" strokeWidth="1.2" opacity={active ? 1 : 0} style={{ transition: "opacity 0.3s 2.1s ease" }} />
        {/* Labels */}
        <text
          x="210" y="18"
          fill="oklch(0.82 0.14 82)"
          fontSize="9"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          letterSpacing="0.15em"
          opacity={active ? 1 : 0}
          style={{ transition: "opacity 0.5s 2.2s ease" }}
        >
          2400 MM
        </text>
        <text
          x="8" y="295"
          fill="oklch(0.82 0.14 82)"
          fontSize="9"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          letterSpacing="0.1em"
          transform="rotate(-90, 8, 295)"
          opacity={active ? 1 : 0}
          style={{ transition: "opacity 0.5s 2.4s ease" }}
        >
          2600 MM
        </text>
        {/* Corner crosshairs */}
        {[[20, 30], [400, 30], [20, 550], [400, 550]].map(([cx, cy], i) => (
          <g key={i} opacity={active ? 1 : 0} style={{ transition: `opacity 0.3s ${2 + i * 0.1}s ease` }}>
            <circle cx={cx} cy={cy} r="3" fill="none" stroke="oklch(0.78 0.13 78)" strokeWidth="0.8" />
            <circle cx={cx} cy={cy} r="1" fill="oklch(0.78 0.13 78)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Intelligence Labels — Scene 3
───────────────────────────────────────────────────────── */
const INTEL_LABELS = [
  { text: "Capacity", delay: "0s", x: "12%", y: "22%" },
  { text: "Ergonomics", delay: "0.7s", x: "62%", y: "18%" },
  { text: "Symmetry", delay: "1.4s", x: "8%", y: "65%" },
  { text: "Manufacturing", delay: "2.1s", x: "58%", y: "72%" },
];

function IntelLabels({ active }: { active: boolean }) {
  return (
    <>
      {INTEL_LABELS.map((l) => (
        <div
          key={l.text}
          style={{
            position: "absolute",
            left: l.x,
            top: l.y,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 12px",
            borderRadius: "999px",
            border: "1px solid oklch(0.78 0.13 78 / 0.5)",
            background: "oklch(0.10 0.012 60 / 0.85)",
            backdropFilter: "blur(12px)",
            fontSize: "11px",
            fontFamily: "var(--font-sans)",
            color: "oklch(0.82 0.14 82)",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
            zIndex: 15,
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.6s ${l.delay} ease, transform 0.6s ${l.delay} cubic-bezier(0.22,1,0.36,1)`,
            boxShadow: "0 0 20px oklch(0.78 0.13 78 / 0.15)",
          }}
        >
          <span
            style={{
              width: "14px", height: "14px",
              borderRadius: "50%",
              background: "oklch(0.78 0.13 78)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "8px", color: "oklch(0.10 0.012 60)",
              fontWeight: 700, flexShrink: 0,
            }}
          >
            ✓
          </span>
          {l.text}
        </div>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Material Switcher Bar — Scene 4
───────────────────────────────────────────────────────── */
const MATS = [
  { label: "Oak", color: "oklch(0.65 0.07 60)" },
  { label: "Walnut", color: "oklch(0.38 0.06 42)" },
  { label: "Greige", color: "oklch(0.75 0.03 75)" },
  { label: "White", color: "oklch(0.94 0.01 90)" },
  { label: "Black", color: "oklch(0.18 0.01 60)" },
  { label: "Glass", color: "oklch(0.70 0.02 200 / 0.5)" },
];

function MaterialBar({ active, activeMat }: { active: boolean; activeMat: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        zIndex: 15,
        opacity: active ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {MATS.map((m, i) => (
        <div
          key={m.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: m.color,
              border: `1.5px solid ${i === activeMat ? "oklch(0.82 0.14 82)" : "oklch(0.50 0.01 60 / 0.4)"}`,
              boxShadow: i === activeMat ? "0 0 12px oklch(0.78 0.13 78 / 0.5)" : "none",
              transition: "border-color 0.4s ease, box-shadow 0.4s ease",
            }}
          />
          <span
            style={{
              fontSize: "8px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: i === activeMat ? "oklch(0.82 0.14 82)" : "oklch(0.55 0.015 80)",
              fontFamily: "var(--font-sans)",
              transition: "color 0.4s ease",
            }}
          >
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Scene navigation dots
───────────────────────────────────────────────────────── */
function SceneDots({
  current,
  containerRef,
}: {
  current: SceneId;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const scrollToScene = (n: number) => {
    const el = containerRef.current;
    if (!el) return;
    const scrollable = el.scrollHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (n / 8) * scrollable, behavior: "smooth" });
  };

  const labels = ["Empty Wall", "Design", "Intelligence", "Materials", "Presentation", "Manufacturing", "Proposal", "Final"];

  return (
    <div className="scene-progress" style={{ zIndex: 40 }}>
      {([1, 2, 3, 4, 5, 6, 7, 8] as SceneId[]).map((n, i) => (
        <button
          key={n}
          className={`scene-dot ${current === n ? "active" : ""}`}
          onClick={() => scrollToScene(n - 1)}
          aria-label={labels[i]}
          style={{ pointerEvents: "all" }}
          title={labels[i]}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Ambient particle field
───────────────────────────────────────────────────────── */
function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${1 + (i % 2)}px`,
            height: `${1 + (i % 2)}px`,
            borderRadius: "50%",
            background: "oklch(0.82 0.14 82)",
            left: `${(i * 6.25) % 100}%`,
            bottom: `${5 + (i * 8.3) % 35}%`,
            opacity: 0,
            animation: `particle-drift ${5 + (i % 4)}s ${i * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main CinematicExperience
───────────────────────────────────────────────────────── */
export default function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scene, sceneProgress } = useScrollProgress(containerRef);
  const cfg = SCENES[scene];

  const skipIntro = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop + el.scrollHeight, behavior: "smooth" });
  }, []);

  /* Active material index for Scene 4 */
  const activeMat = Math.floor(sceneProgress * MATS.length) % MATS.length;

  /* Wardrobe visibility and scale */
  const showWardrobe = cfg.showWardrobe !== false;
  const wardrobeScale = scene === 1 ? 0.7 + sceneProgress * 0.3
    : scene === 8 ? 0.7 + (1 - sceneProgress) * 0.2
    : 1;
  const wardrobeOpacity = showWardrobe
    ? (scene === 1 ? 0 : scene === 8 ? (cfg.wardrobeOpacity ?? 1) : 1)
    : 0;

  /* Background image blend */
  const hasBg = !!cfg.bgImage;
  const bgOpacity = cfg.bgOpacity ?? 0.5;

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", height: "800vh" }}
    >
      {/* ── STICKY STAGE ── */}
      <div className="cinematic-stage">

        {/* Base environment */}
        <div
          className="cinematic-env"
          style={{
            background: scene === 5
              ? "radial-gradient(ellipse at 50% 30%, oklch(0.18 0.035 65) 0%, oklch(0.08 0.01 55) 80%)"
              : scene === 8
              ? "radial-gradient(ellipse at 50% 50%, oklch(0.06 0.008 55) 0%, oklch(0.04 0.005 55) 100%)"
              : "radial-gradient(ellipse at 50% 35%, oklch(0.14 0.022 55) 0%, oklch(0.08 0.01 55) 75%)",
            transition: "background 1.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        />

        {/* Scene background image */}
        {hasBg && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${cfg.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: bgOpacity,
              transition: "opacity 1.2s cubic-bezier(0.25,0.1,0.25,1)",
              zIndex: 1,
            }}
          />
        )}

        {/* Dark gradient overlay on top of bg image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, oklch(0.06 0.008 55 / 0.3) 0%, oklch(0.06 0.008 55 / 0.7) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Particles */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
          <Particles />
        </div>

        {/* Scene dots nav */}
        <SceneDots current={scene} containerRef={containerRef} />

        {/* ── SCENE-SPECIFIC OVERLAYS ── */}

        {/* Scene 1 — Laser lines */}
        <div style={{ position: "absolute", inset: 0, zIndex: 8 }}>
          <LaserOverlay active={scene === 1} />
        </div>

        {/* Scene 3 — Intelligence labels */}
        <div style={{ position: "absolute", inset: 0, zIndex: 12 }}>
          <IntelLabels active={scene === 3} />
        </div>

        {/* Scene 4 — Material swatch bar */}
        <div style={{ position: "absolute", inset: 0, zIndex: 12 }}>
          <MaterialBar active={scene === 4} activeMat={activeMat} />
        </div>

        {/* ── CSS 3D WARDROBE ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
            opacity: wardrobeOpacity,
            transform: `scale(${wardrobeScale})`,
            transition: "opacity 1.2s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <WardrobeCanvas scene={scene} sceneProgress={sceneProgress} />
        </div>

        {/* ── SCENE HEADLINE ── */}
        <div
          className="scene-overlay"
          style={{
            zIndex: 20,
            paddingBottom: scene === 8 ? "8vh" : "10vh",
          }}
        >
          <div
            key={scene}
            style={{
              textAlign: "center",
              animation: "scene-headline-in 0.9s cubic-bezier(0.22,1,0.36,1) both",
              pointerEvents: scene === 8 ? "all" : "none",
              padding: "0 24px",
            }}
          >
            {/* Sub label */}
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "oklch(0.78 0.13 78)",
                marginBottom: "14px",
                opacity: 0.9,
              }}
            >
              {cfg.sub}
            </div>

            {/* Main headline */}
            <h2
              className={cfg.size}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                color: "oklch(0.96 0.015 80)",
                textShadow: "0 2px 40px oklch(0 0 0 / 0.8), 0 0 80px oklch(0 0 0 / 0.4)",
                margin: 0,
              }}
            >
              {cfg.headline}
            </h2>

            {/* Scene 8 — CTA buttons */}
            {scene === 8 && (
              <div
                style={{
                  marginTop: "36px",
                  display: "flex",
                  gap: "14px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "15px 36px",
                    borderRadius: "999px",
                    background: "oklch(0.78 0.13 78)",
                    color: "oklch(0.10 0.012 60)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    boxShadow: "0 0 50px oklch(0.78 0.13 78 / 0.45), 0 4px 20px oklch(0 0 0 / 0.4)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 70px oklch(0.78 0.13 78 / 0.6), 0 4px 30px oklch(0 0 0 / 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 50px oklch(0.78 0.13 78 / 0.45), 0 4px 20px oklch(0 0 0 / 0.4)";
                  }}
                >
                  Start Designing
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#pricing"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "15px 32px",
                    borderRadius: "999px",
                    border: "1px solid oklch(0.78 0.13 78 / 0.4)",
                    color: "oklch(0.88 0.08 82)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    textDecoration: "none",
                    background: "oklch(0.10 0.012 60 / 0.6)",
                    backdropFilter: "blur(16px)",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.78 0.13 78 / 0.8)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.92 0.10 82)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.78 0.13 78 / 0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.88 0.08 82)";
                  }}
                >
                  See Pricing
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── SCROLL INDICATOR (Scene 1 only) ── */}
        {scene === 1 && (
          <div className="scroll-indicator" style={{ zIndex: 25 }}>
            <div className="scroll-mouse" />
            <span>Scroll to explore</span>
          </div>
        )}

        {/* ── SKIP BUTTON ── */}
        <button
          className="skip-btn"
          onClick={skipIntro}
          style={{ zIndex: 50 }}
        >
          Skip intro ↓
        </button>

        {/* ── SCENE COUNTER ── */}
        <div
          style={{
            position: "absolute",
            top: "28px",
            right: "28px",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "oklch(0.50 0.01 80)",
            zIndex: 40,
            textTransform: "uppercase",
          }}
        >
          {String(scene).padStart(2, "0")} / 08
        </div>

        {/* ── PROGRESS LINE (bottom) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "1.5px",
            width: `${((scene - 1) / 7) * 100}%`,
            background: "linear-gradient(90deg, oklch(0.65 0.10 78 / 0.5), oklch(0.82 0.14 82))",
            zIndex: 40,
            transition: "width 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        />
      </div>
    </div>
  );
}
