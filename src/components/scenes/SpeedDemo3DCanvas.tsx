import { useEffect, useRef, useState } from "react";

/* ─── 3D Materials (matching WardrobeCanvas) ─── */
const MATERIALS = [
  { name: "Oak", bg: "oklch(0.62 0.07 58)", border: "oklch(0.72 0.07 70 / 0.45)", side: "oklch(0.52 0.06 52)" },
  { name: "Walnut", bg: "oklch(0.36 0.055 42)", border: "oklch(0.50 0.05 55 / 0.45)", side: "oklch(0.28 0.04 38)" },
  { name: "Greige", bg: "oklch(0.74 0.025 75)", border: "oklch(0.82 0.02 80 / 0.45)", side: "oklch(0.64 0.02 70)" },
  { name: "White", bg: "oklch(0.93 0.008 85)", border: "oklch(0.82 0.02 80 / 0.35)", side: "oklch(0.84 0.01 80)" },
  { name: "Black", bg: "oklch(0.16 0.01 55)", border: "oklch(0.40 0.02 60 / 0.45)", side: "oklch(0.11 0.01 50)" },
  { name: "Glass", bg: "oklch(0.62 0.025 200 / 0.22)", border: "oklch(0.75 0.04 200 / 0.55)", side: "oklch(0.55 0.03 200 / 0.3)" },
];

interface Props {
  step: number;
  progress: number;
  interactive?: boolean;
  colorIdx?: number;
  frameStyle?: number;
  interiorStyle?: number;
  height?: string;
}

export default function SpeedDemo3DCanvas({
  step,
  progress,
  interactive = true,
  colorIdx = 0,
  frameStyle = 1,
  interiorStyle = 0,
  height = "100%",
}: Props) {
  const [rotY, setRotY] = useState(-15);
  const [rotX, setRotX] = useState(6);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Auto-camera movement based on step
  useEffect(() => {
    if (isDragging.current) return;
    switch (step) {
      case 1:
        setRotY(-18);
        setRotX(12);
        break;
      case 2:
        setRotY(-24);
        setRotX(8);
        break;
      case 3:
        setRotY(-12);
        setRotX(5);
        break;
      case 4:
        setRotY(15);
        setRotX(4);
        break;
      case 5:
        setRotY(-6);
        setRotX(3);
        break;
      case 6:
        setRotY(-22);
        setRotX(10);
        break;
      case 7:
        setRotY(-10);
        setRotX(4);
        break;
      case 8:
        setRotY(-5);
        setRotX(2);
        break;
      case 9:
        setRotY(0);
        setRotX(0);
        break;
    }
  }, [step]);

  // Mouse drag orbit controls
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !interactive) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setRotY((r) => Math.max(-60, Math.min(60, r + dx * 0.45)));
    setRotX((r) => Math.max(-20, Math.min(30, r - dy * 0.3)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const mat = MATERIALS[colorIdx % MATERIALS.length];

  // 3D Wardrobe element state based on step & progress
  const hasRoom = step >= 1;
  const hasGrid = step >= 2;
  const hasStructure = step >= 3;
  const hasFrame = step >= 4;
  const doorOpen = step === 5 || step === 7 || step === 9;
  const ledOn = step >= 7;

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: "relative",
        width: "100%",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: interactive ? (isDragging.current ? "grabbing" : "grab") : "default",
        userSelect: "none",
        background: "radial-gradient(ellipse at 50% 40%, oklch(0.14 0.020 60) 0%, oklch(0.08 0.010 55) 100%)",
      }}
    >
      {/* 3D Orbit hint badge */}
      {interactive && (
        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "4px 10px",
          borderRadius: "999px",
          background: "oklch(0.12 0.012 60 / 0.8)",
          border: "1px solid oklch(0.78 0.13 78 / 0.3)",
          backdropFilter: "blur(8px)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "9px",
          color: "oklch(0.82 0.14 82)",
          letterSpacing: "0.08em",
          zIndex: 30,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Drag to Orbit 3D
        </div>
      )}

      {/* 3D PERSPECTIVE STAGE */}
      <div style={{
        perspective: "800px",
        perspectiveOrigin: "50% 40%",
        width: "220px",
        height: "320px",
        position: "relative",
      }}>
        {/* 3D ROTATING CONTAINER */}
        <div style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          transition: isDragging.current ? "none" : "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          position: "relative",
        }}>

          {/* Step 1 & 2: 3D Grid Floor & Wall Laser lines */}
          {hasRoom && (
            <div style={{
              position: "absolute",
              bottom: "-40px",
              left: "-80px",
              width: "380px",
              height: "200px",
              transform: "rotateX(90deg) translateZ(-40px)",
              background: `radial-gradient(ellipse, oklch(0.78 0.13 78 / 0.12) 0%, transparent 70%),
                repeating-linear-gradient(0deg, oklch(0.78 0.13 78 / 0.15) 0px, transparent 1px, transparent 20px),
                repeating-linear-gradient(90deg, oklch(0.78 0.13 78 / 0.15) 0px, transparent 1px, transparent 20px)`,
              opacity: step === 1 ? progress : 0.6,
              transition: "opacity 0.6s ease",
            }}/>
          )}

          {/* Step 2: 3D Laser Dimension Box */}
          {hasGrid && step <= 3 && (
            <div style={{
              position: "absolute",
              inset: "0",
              border: "1.5px dashed oklch(0.82 0.14 82 / 0.85)",
              borderRadius: "2px",
              boxShadow: "0 0 24px oklch(0.78 0.13 78 / 0.3)",
              animation: "sd-fade-up 0.5s ease both",
              pointerEvents: "none",
            }}>
              {/* Width label */}
              <div style={{
                position: "absolute",
                top: "-22px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "oklch(0.82 0.14 82)",
                color: "oklch(0.10 0.012 60)",
                padding: "2px 8px",
                borderRadius: "4px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}>
                2400 mm
              </div>
              {/* Height label */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "-38px",
                transform: "translateY(-50%) rotate(-90deg)",
                background: "oklch(0.82 0.14 82)",
                color: "oklch(0.10 0.012 60)",
                padding: "2px 8px",
                borderRadius: "4px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}>
                2600 mm
              </div>
            </div>
          )}

          {/* 3D WARDROBE STRUCTURE (Step 3+) */}
          {hasStructure && (
            <div style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transition: "transform 0.6s ease",
            }}>
              {/* Back panel */}
              <div style={{
                position: "absolute",
                inset: "4px",
                background: mat.bg,
                border: `1px solid ${mat.border}`,
                transform: "translateZ(-20px)",
                transition: "background 0.5s ease, border-color 0.5s ease",
              }}/>

              {/* Left side panel */}
              <div style={{
                position: "absolute",
                top: 0, bottom: 0, left: 0,
                width: "40px",
                background: mat.side,
                border: `1px solid ${mat.border}`,
                transform: "rotateY(-90deg)",
                transformOrigin: "left center",
                transition: "background 0.5s ease",
              }}/>

              {/* Right side panel */}
              <div style={{
                position: "absolute",
                top: 0, bottom: 0, right: 0,
                width: "40px",
                background: mat.side,
                border: `1px solid ${mat.border}`,
                transform: "rotateY(90deg)",
                transformOrigin: "right center",
                transition: "background 0.5s ease",
              }}/>

              {/* Top cap */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "40px",
                background: mat.bg,
                border: `1px solid ${mat.border}`,
                transform: "rotateX(90deg)",
                transformOrigin: "top center",
                transition: "background 0.5s ease",
              }}/>

              {/* Bottom cap */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "40px",
                background: mat.bg,
                border: `1px solid ${mat.border}`,
                transform: "rotateX(-90deg)",
                transformOrigin: "bottom center",
                transition: "background 0.5s ease",
              }}/>

              {/* Center divider */}
              <div style={{
                position: "absolute",
                top: "6px", bottom: "6px", left: "50%",
                width: "36px",
                marginLeft: "-18px",
                background: mat.side,
                border: `1px solid ${mat.border}`,
                transform: "rotateY(90deg)",
                transition: "background 0.5s ease",
              }}/>

              {/* Interior Shelves (Step 5+) */}
              {step >= 3 && (
                <div style={{ position: "absolute", inset: "6px", transformStyle: "preserve-3d" }}>
                  {/* Left column shelves */}
                  <div style={{
                    position: "absolute",
                    top: "35%", left: "4px", width: "48%", height: "4px",
                    background: mat.border,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  }}/>
                  <div style={{
                    position: "absolute",
                    top: "65%", left: "4px", width: "48%", height: "4px",
                    background: mat.border,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  }}/>

                  {/* Hanging Rail on right column */}
                  <div style={{
                    position: "absolute",
                    top: "22%", right: "8px", width: "45%", height: "3px",
                    background: "oklch(0.85 0.08 85)",
                    borderRadius: "2px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
                  }}/>

                  {/* Drawers bottom right */}
                  {interiorStyle !== 1 && (
                    <>
                      <div style={{
                        position: "absolute",
                        bottom: "35px", right: "6px", width: "45%", height: "26px",
                        background: mat.bg, border: `1px solid ${mat.border}`, borderRadius: "2px",
                      }}/>
                      <div style={{
                        position: "absolute",
                        bottom: "6px", right: "6px", width: "45%", height: "26px",
                        background: mat.bg, border: `1px solid ${mat.border}`, borderRadius: "2px",
                      }}/>
                    </>
                  )}
                </div>
              )}

              {/* LED Strip Lighting (Step 7+) */}
              {ledOn && (
                <div style={{
                  position: "absolute",
                  top: "10px", left: "10px", right: "10px",
                  height: "2px",
                  background: "oklch(0.96 0.12 85)",
                  boxShadow: "0 0 16px 4px oklch(0.90 0.14 85 / 0.8), 0 0 32px 8px oklch(0.80 0.12 75 / 0.5)",
                }}/>
              )}

              {/* 3D DOORS (Step 4+) */}
              {hasFrame && (
                <>
                  {/* Left Door */}
                  <div style={{
                    position: "absolute",
                    top: 0, bottom: 0, left: 0, width: "50%",
                    background: frameStyle === 2 ? "oklch(0.65 0.03 200 / 0.3)" : mat.bg,
                    border: `1.5px solid ${mat.border}`,
                    transformOrigin: "left center",
                    transform: doorOpen ? "perspective(600px) rotateY(-80deg)" : "rotateY(0deg)",
                    transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), background 0.5s ease",
                    boxShadow: doorOpen ? "none" : "inset -2px 0 6px rgba(0,0,0,0.3)",
                    backfaceVisibility: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "8px",
                  }}>
                    {/* Handle */}
                    {frameStyle === 0 && (
                      <div style={{ width: "3px", height: "40px", background: "oklch(0.82 0.14 82)", borderRadius: "2px" }}/>
                    )}
                  </div>

                  {/* Right Door */}
                  <div style={{
                    position: "absolute",
                    top: 0, bottom: 0, right: 0, width: "50%",
                    background: frameStyle === 2 ? "oklch(0.65 0.03 200 / 0.3)" : mat.bg,
                    border: `1.5px solid ${mat.border}`,
                    transformOrigin: "right center",
                    transform: doorOpen ? "perspective(600px) rotateY(80deg)" : "rotateY(0deg)",
                    transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), background 0.5s ease",
                    boxShadow: doorOpen ? "none" : "inset 2px 0 6px rgba(0,0,0,0.3)",
                    backfaceVisibility: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: "8px",
                  }}>
                    {/* Handle */}
                    {frameStyle === 0 && (
                      <div style={{ width: "3px", height: "40px", background: "oklch(0.82 0.14 82)", borderRadius: "2px" }}/>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
