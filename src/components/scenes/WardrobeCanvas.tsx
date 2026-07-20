import { useEffect, useRef } from "react";
import type { SceneId } from "@/hooks/useScrollProgress";

/* ─────────────────────────────────────────────────────────
   Material definitions (CSS background + label)
───────────────────────────────────────────────────────── */
const MATERIALS = [
  {
    cls: "mat-oak",
    bg: "oklch(0.62 0.07 58)",
    grain: `repeating-linear-gradient(
      94deg,
      oklch(0.58 0.08 56 / 0.5) 0px, transparent 1px, transparent 6px,
      oklch(0.66 0.06 62 / 0.3) 7px, transparent 8px, transparent 14px
    )`,
    border: "oklch(0.72 0.07 70 / 0.4)",
  },
  {
    cls: "mat-walnut",
    bg: "oklch(0.36 0.055 42)",
    grain: `repeating-linear-gradient(
      91deg,
      oklch(0.30 0.06 38 / 0.5) 0px, transparent 1px, transparent 5px,
      oklch(0.42 0.05 46 / 0.3) 6px, transparent 7px, transparent 12px
    )`,
    border: "oklch(0.50 0.05 55 / 0.4)",
  },
  {
    cls: "mat-greige",
    bg: "oklch(0.74 0.025 75)",
    grain: "none",
    border: "oklch(0.80 0.02 80 / 0.4)",
  },
  {
    cls: "mat-white",
    bg: "oklch(0.93 0.008 85)",
    grain: "none",
    border: "oklch(0.80 0.02 80 / 0.3)",
  },
  {
    cls: "mat-black",
    bg: "oklch(0.16 0.01 55)",
    grain: `repeating-linear-gradient(
      180deg,
      oklch(0.22 0.01 55 / 0.3) 0px, transparent 1px, transparent 4px
    )`,
    border: "oklch(0.40 0.02 60 / 0.4)",
  },
  {
    cls: "mat-glass",
    bg: "oklch(0.62 0.025 200 / 0.18)",
    grain: "none",
    border: "oklch(0.75 0.04 200 / 0.5)",
  },
];

const MAT_LABELS = ["Natural Oak", "Walnut", "Warm Greige", "Matte White", "Black", "Glass"];

interface Props {
  scene: SceneId;
  sceneProgress: number;
}

export default function WardrobeCanvas({ scene, sceneProgress }: Props) {
  /* DOM refs */
  const bodyRef    = useRef<HTMLDivElement>(null);
  const doorLRef   = useRef<HTMLDivElement>(null);
  const doorRRef   = useRef<HTMLDivElement>(null);
  const ledTopRef  = useRef<HTMLDivElement>(null);
  const ledMidRef  = useRef<HTMLDivElement>(null);
  const shelvesRef = useRef<(HTMLDivElement | null)[]>([]);
  const railRef    = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const matLblRef  = useRef<HTMLDivElement>(null);
  const wTopRef    = useRef<HTMLDivElement>(null);
  const wBotRef    = useRef<HTMLDivElement>(null);
  const wLRef      = useRef<HTMLDivElement>(null);
  const wRRef      = useRef<HTMLDivElement>(null);
  const prevScene  = useRef<SceneId>(1);
  const matIdxRef  = useRef(0);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentMatRef = useRef(MATERIALS[0]);

  /* ─── Apply a material to all visible door/frame surfaces ─── */
  const applyMaterial = (idx: number) => {
    const m = MATERIALS[idx];
    currentMatRef.current = m;
    const surfaces = [
      doorLRef.current,
      doorRRef.current,
      wTopRef.current,
      wBotRef.current,
      wLRef.current,
      wRRef.current,
    ];
    surfaces.forEach((el) => {
      if (!el) return;
      el.style.background = m.bg;
      el.style.borderColor = m.border;
    });

    /* grain overlays on doors */
    [doorLRef.current, doorRRef.current].forEach((door) => {
      if (!door) return;
      const grain = door.querySelector<HTMLDivElement>(".door-grain-layer");
      if (grain) grain.style.background = m.grain;
    });

    /* material label fade */
    if (matLblRef.current) {
      matLblRef.current.style.opacity = "0";
      matLblRef.current.style.transform = "translateY(6px)";
      setTimeout(() => {
        if (matLblRef.current) {
          matLblRef.current.textContent = MAT_LABELS[idx];
          matLblRef.current.style.opacity = "1";
          matLblRef.current.style.transform = "translateY(0)";
        }
      }, 160);
    }
  };

  /* ─── Show / hide shelves ─── */
  const showShelves = (show: boolean) => {
    shelvesRef.current.forEach((s, i) => {
      if (!s) return;
      s.style.transitionDelay = `${i * 90}ms`;
      s.style.opacity = show ? "1" : "0";
      s.style.transform = show ? "translateX(0)" : "translateX(-50px)";
    });
    if (railRef.current) {
      railRef.current.style.transitionDelay = "320ms";
      railRef.current.style.opacity = show ? "1" : "0";
      railRef.current.style.transform = show ? "scaleX(1)" : "scaleX(0)";
    }
  };

  /* ─── Open / close doors ─── */
  const setDoors = (open: boolean) => {
    if (doorLRef.current)
      doorLRef.current.style.transform = open
        ? "perspective(800px) rotateY(-82deg)"
        : "perspective(800px) rotateY(0deg)";
    if (doorRRef.current)
      doorRRef.current.style.transform = open
        ? "perspective(800px) rotateY(82deg)"
        : "perspective(800px) rotateY(0deg)";
  };

  /* ─── LED strips ─── */
  const setLED = (on: boolean) => {
    [ledTopRef.current, ledMidRef.current].forEach((el) => {
      if (!el) return;
      el.style.opacity = on ? "1" : "0";
      el.style.boxShadow = on
        ? "0 0 18px 5px oklch(0.92 0.10 78 / 0.65), 0 0 40px 10px oklch(0.82 0.10 75 / 0.3)"
        : "none";
    });
    if (glowRef.current) {
      glowRef.current.style.opacity = on ? "1" : "0";
    }
  };

  /* ─── Explode panels ─── */
  const explode = (on: boolean) => {
    const map: [React.RefObject<HTMLDivElement | null>, string][] = [
      [wLRef,   on ? "translateX(-100px) translateZ(55px)" : ""],
      [wRRef,   on ? "translateX(100px)  translateZ(55px)" : ""],
      [wTopRef, on ? "translateY(-80px)  translateZ(35px)" : ""],
      [wBotRef, on ? "translateY(80px)   translateZ(35px)" : ""],
    ];
    map.forEach(([ref, val]) => {
      if (ref.current) ref.current.style.transform = val;
    });
    if (doorLRef.current) {
      doorLRef.current.style.transform = on
        ? "perspective(800px) translateX(-110px) translateZ(60px) rotateY(-35deg)"
        : "perspective(800px) rotateY(0deg)";
    }
    if (doorRRef.current) {
      doorRRef.current.style.transform = on
        ? "perspective(800px) translateX(110px) translateZ(60px) rotateY(35deg)"
        : "perspective(800px) rotateY(0deg)";
    }
  };

  /* ─── Camera angle ─── */
  const setCam = (rotY: string, rotX: string) => {
    if (bodyRef.current) {
      bodyRef.current.style.transform = `rotateY(${rotY}) rotateX(${rotX})`;
    }
  };

  useEffect(() => {
    const s = scene;
    const prev = prevScene.current;

    /* Transition duration on panels */
    const speed = "1.3s";
    [doorLRef, doorRRef, wTopRef, wBotRef, wLRef, wRRef].forEach((r) => {
      if (r.current) r.current.style.transition = `transform ${speed} cubic-bezier(0.25,0.1,0.25,1), background 1.2s ease, border-color 1.2s ease, opacity 0.8s ease, box-shadow 0.8s ease`;
    });

    if (s === 1) {
      setCam("-14deg", "5deg");
      setDoors(false);
      showShelves(false);
      setLED(false);
      explode(false);
      if (timerRef.current) clearInterval(timerRef.current);
      applyMaterial(0);
    }

    if (s === 2) {
      setCam("-20deg", "3deg");
      setDoors(false);
      showShelves(false);
      setLED(false);
      explode(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    if (s === 3) {
      setCam("-9deg", "4deg");
      showShelves(true);
    }

    if (s === 4) {
      setCam("10deg", "2deg");
      showShelves(true);
      setDoors(false);
      if (prev !== 4) {
        matIdxRef.current = 0;
        applyMaterial(0);
        timerRef.current = setInterval(() => {
          matIdxRef.current = (matIdxRef.current + 1) % MATERIALS.length;
          applyMaterial(matIdxRef.current);
        }, 1400);
      }
    } else {
      if (prev === 4 && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    if (s === 5) {
      setCam("-4deg", "1deg");
      applyMaterial(1); // walnut
      setTimeout(() => setDoors(true), 300);
      setTimeout(() => setLED(true), 900);
    } else if (prev === 5) {
      setDoors(false);
      setLED(false);
    }

    if (s === 6) {
      setCam("-22deg", "12deg");
      setDoors(false);
      setLED(false);
      setTimeout(() => explode(true), 350);
    } else if (prev === 6) {
      explode(false);
    }

    if (s === 7) {
      explode(false);
      setCam("-10deg", "3deg");
      applyMaterial(1); // walnut
      showShelves(true);
    }

    if (s === 8) {
      setCam("0deg", "0deg");
      setDoors(false);
      setLED(false);
      explode(false);
    }

    prevScene.current = s;
  }, [scene]);

  /* Unused sceneProgress to avoid lint warning */
  void sceneProgress;

  /* ─── Current material style (for initial render) ─── */
  const m = MATERIALS[0];

  const panelBase: React.CSSProperties = {
    position: "absolute",
    background: m.bg,
    border: `1px solid ${m.border}`,
    borderRadius: "1px",
    transition: "transform 1.3s cubic-bezier(0.25,0.1,0.25,1), background 1.2s ease",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      style={{ position: "relative", width: "300px", height: "460px" }}
      aria-hidden="true"
    >
      {/* Ambient wardrobe glow (scene 5) */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: "-50px",
          background: "radial-gradient(ellipse at center, oklch(0.82 0.12 75 / 0.14) 0%, transparent 70%)",
          opacity: 0,
          transition: "opacity 1.2s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── 3D WARDROBE ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          perspective: "1000px",
          perspectiveOrigin: "50% 38%",
          zIndex: 1,
        }}
      >
        <div
          ref={bodyRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: "rotateY(-14deg) rotateX(5deg)",
            transition: "transform 1.4s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          {/* ── Structural panels ── */}

          {/* Top cap */}
          <div
            ref={wTopRef}
            style={{
              ...panelBase,
              top: 0, left: 0, right: 0,
              height: "12px",
              transform: "rotateX(90deg)",
              transformOrigin: "top center",
              boxShadow: "inset 0 -2px 4px oklch(0 0 0 / 0.4)",
            }}
          />

          {/* Bottom plinth */}
          <div
            ref={wBotRef}
            style={{
              ...panelBase,
              bottom: 0, left: 0, right: 0,
              height: "12px",
              transform: "rotateX(-90deg)",
              transformOrigin: "bottom center",
            }}
          />

          {/* Left side */}
          <div
            ref={wLRef}
            style={{
              ...panelBase,
              top: 0, bottom: 0, left: 0,
              width: "12px",
              transform: "rotateY(-90deg)",
              transformOrigin: "left center",
              background: "oklch(0.52 0.06 52)", // slightly darker side
            }}
          />

          {/* Right side */}
          <div
            ref={wRRef}
            style={{
              ...panelBase,
              top: 0, bottom: 0, right: 0,
              width: "12px",
              transform: "rotateY(90deg)",
              transformOrigin: "right center",
              background: "oklch(0.52 0.06 52)",
            }}
          />

          {/* Back panel */}
          <div
            style={{
              ...panelBase,
              top: "12px", bottom: "12px",
              left: "12px", right: "12px",
              transform: "translateZ(-12px)",
              background: "oklch(0.28 0.04 50)",
              border: "none",
            }}
          />

          {/* ── Interior ── */}
          <div
            style={{
              position: "absolute",
              top: "12px", bottom: "12px",
              left: "12px", right: "12px",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            {/* LED top strip */}
            <div
              ref={ledTopRef}
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "2px",
                background: "oklch(0.96 0.08 80)",
                opacity: 0,
                transition: "opacity 0.9s ease, box-shadow 0.9s ease",
                borderRadius: "1px",
              }}
            />
            {/* LED mid strip (under hanging section) */}
            <div
              ref={ledMidRef}
              style={{
                position: "absolute",
                top: "38%",
                left: 0, right: 0,
                height: "1.5px",
                background: "oklch(0.96 0.08 80)",
                opacity: 0,
                transition: "opacity 0.9s ease, box-shadow 0.9s ease",
                borderRadius: "1px",
              }}
            />

            {/* Hanging rail */}
            <div
              ref={railRef}
              style={{
                position: "absolute",
                top: "18%",
                left: "8px", right: "8px",
                height: "3px",
                background: "oklch(0.82 0.14 82 / 0.75)",
                borderRadius: "2px",
                opacity: 0,
                transform: "scaleX(0)",
                transformOrigin: "left center",
                transition: "opacity 0.6s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                boxShadow: "0 0 6px oklch(0.82 0.14 82 / 0.4)",
              }}
            />

            {/* Shelves */}
            {[40, 53, 65, 77, 90].map((pct, i) => (
              <div
                key={pct}
                ref={(el) => { shelvesRef.current[i] = el; }}
                style={{
                  position: "absolute",
                  top: `${pct}%`,
                  left: 0, right: 0,
                  height: "5px",
                  background: "oklch(0.58 0.065 56)",
                  borderTop: "1px solid oklch(0.78 0.13 78 / 0.25)",
                  borderRadius: "1px",
                  opacity: 0,
                  transform: "translateX(-50px)",
                  transition: "opacity 0.55s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            ))}

            {/* Interior back wall gradient (warm glow when LED on) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, oklch(0.22 0.04 70 / 0.0) 0%, oklch(0.15 0.03 60 / 0.5) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* ── Door panels ── */}

          {/* Left door */}
          <div
            ref={doorLRef}
            style={{
              ...panelBase,
              top: "12px", bottom: "12px",
              left: "12px",
              width: "calc(50% - 13px)",
              transformOrigin: "left center",
              transform: "perspective(800px) rotateY(0deg)",
              zIndex: 4,
              overflow: "hidden",
            }}
          >
            {/* Wood grain overlay */}
            <div
              className="door-grain-layer"
              style={{
                position: "absolute", inset: 0,
                background: m.grain,
                pointerEvents: "none",
                transition: "background 1.2s ease",
              }}
            />
            {/* Door frame inset */}
            <div
              style={{
                position: "absolute",
                inset: "10px",
                border: "1px solid oklch(0.78 0.13 78 / 0.12)",
                borderRadius: "1px",
                pointerEvents: "none",
              }}
            />
            {/* Handle */}
            <div
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "2.5px",
                height: "28px",
                background: "linear-gradient(180deg, oklch(0.88 0.14 82), oklch(0.72 0.12 70))",
                borderRadius: "2px",
                boxShadow: "0 0 6px oklch(0.82 0.14 82 / 0.5)",
              }}
            />
          </div>

          {/* Right door */}
          <div
            ref={doorRRef}
            style={{
              ...panelBase,
              top: "12px", bottom: "12px",
              right: "12px",
              width: "calc(50% - 13px)",
              transformOrigin: "right center",
              transform: "perspective(800px) rotateY(0deg)",
              zIndex: 4,
              overflow: "hidden",
            }}
          >
            <div
              className="door-grain-layer"
              style={{
                position: "absolute", inset: 0,
                background: m.grain,
                pointerEvents: "none",
                transition: "background 1.2s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "10px",
                border: "1px solid oklch(0.78 0.13 78 / 0.12)",
                borderRadius: "1px",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "2.5px",
                height: "28px",
                background: "linear-gradient(180deg, oklch(0.88 0.14 82), oklch(0.72 0.12 70))",
                borderRadius: "2px",
                boxShadow: "0 0 6px oklch(0.82 0.14 82 / 0.5)",
              }}
            />
          </div>

          {/* ── Drop shadow beneath wardrobe ── */}
          <div
            style={{
              position: "absolute",
              bottom: "-18px",
              left: "10%",
              right: "10%",
              height: "18px",
              background: "radial-gradient(ellipse at center, oklch(0 0 0 / 0.5) 0%, transparent 70%)",
              transform: "rotateX(90deg)",
              transformOrigin: "top center",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* ── Material label (Scene 4) ── */}
      <div
        ref={matLblRef}
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "50%",
          transform: "translateX(-50%) translateY(0)",
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "oklch(0.82 0.14 82)",
          fontFamily: "var(--font-sans)",
          whiteSpace: "nowrap",
          opacity: scene === 4 ? 1 : 0,
          transition: "opacity 0.5s ease, transform 0.4s ease",
        }}
      >
        Natural Oak
      </div>
    </div>
  );
}
