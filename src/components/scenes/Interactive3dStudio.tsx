import { useState } from "react";
import SpeedDemo3DCanvas from "./SpeedDemo3DCanvas";

/* ─── Design Tokens ─── */
const G = {
  gold: "oklch(0.82 0.14 82)",
  goldDim: "oklch(0.78 0.13 78)",
  goldGlow: "oklch(0.78 0.13 78 / 0.35)",
  bg: "oklch(0.08 0.010 55)",
  bgCard: "oklch(0.14 0.018 57)",
  text: "oklch(0.96 0.015 80)",
  textMuted: "oklch(0.58 0.018 80)",
  border: "oklch(0.26 0.018 60 / 0.5)",
};

const STEPS = [
  { n: 1, title: "Add Room", desc: "Select room type" },
  { n: 2, title: "Dimensions", desc: "Set wall width & height" },
  { n: 3, title: "Smart Design", desc: "AI layout generation" },
  { n: 4, title: "Door Frame", desc: "Select frame style" },
  { n: 5, title: "Interiors", desc: "Select interior storage" },
  { n: 6, title: "Materials", desc: "Choose finish & color" },
  { n: 7, title: "Instant Quote", desc: "View price calculation" },
  { n: 8, title: "Share Quote", desc: "Send via WhatsApp" },
  { n: 9, title: "Approval", desc: "Client sign-off" },
];

const ROOM_TYPES = [
  { name: "Master Bedroom", icon: "🛏️", defaultW: 2800, defaultH: 2600 },
  { name: "Dressing Room", icon: "👗", defaultW: 3200, defaultH: 2700 },
  { name: "Guest Room", icon: "🛋️", defaultW: 2400, defaultH: 2500 },
  { name: "Kids Bedroom", icon: "🧸", defaultW: 2000, defaultH: 2400 },
];

const MATERIALS = [
  { id: 0, name: "Natural Oak", color: "oklch(0.62 0.07 58)", multiplier: 1.0 },
  { id: 1, name: "American Walnut", color: "oklch(0.36 0.055 42)", multiplier: 1.2 },
  { id: 2, name: "Warm Greige", color: "oklch(0.74 0.025 75)", multiplier: 1.05 },
  { id: 3, name: "Matte White", color: "oklch(0.93 0.008 85)", multiplier: 0.95 },
  { id: 4, name: "Matte Black", color: "oklch(0.16 0.01 55)", multiplier: 1.1 },
  { id: 5, name: "Smoked Glass", color: "oklch(0.62 0.025 200)", multiplier: 1.35 },
];

const FRAMES = [
  { id: 0, name: "Classic Hinged", desc: "Traditional doors with handles" },
  { id: 1, name: "Modern Frameless", desc: "Push-to-open flush doors" },
  { id: 2, name: "Sliding Track", desc: "Space-saving sliding doors" },
];

const INTERIORS = [
  { id: 0, name: "Mixed Storage", desc: "Hanging rails + shelves + drawers" },
  { id: 1, name: "Double Hanging", desc: "Maximized rail space for suits/dresses" },
  { id: 2, name: "Max Shelving", desc: "Folded clothes & accessory organizer" },
];

export default function Interactive3dStudio() {
  const [currentStep, setCurrentStep] = useState(1);
  const [roomType, setRoomType] = useState("Master Bedroom");
  const [width, setWidth] = useState(2600);
  const [height, setHeight] = useState(2600);
  const [frameStyle, setFrameStyle] = useState(1);
  const [interiorStyle, setInteriorStyle] = useState(0);
  const [materialIdx, setMaterialIdx] = useState(0);
  const [ledLighting, setLedLighting] = useState(true);
  const [clientName, setClientName] = useState("Ahmed Al-Rashidi");
  const [clientPhone, setClientPhone] = useState("+971 50 123 4567");
  const [isApproved, setIsApproved] = useState(false);

  // Price Calculation Logic
  const areaM2 = (width * height) / 1000000; // m²
  const baseRatePerM2 = 1150; // AED / m²
  const materialMult = MATERIALS[materialIdx].multiplier;
  const frameAddon = frameStyle === 2 ? 650 : frameStyle === 1 ? 400 : 0;
  const ledAddon = ledLighting ? 450 : 0;
  const rawTotal = (areaM2 * baseRatePerM2 * materialMult) + frameAddon + ledAddon;
  const totalPrice = Math.round(rawTotal / 50) * 50; // Round to nearest 50 AED

  // WhatsApp share link generator
  const waText = encodeURIComponent(
    `Hi ${clientName}!\n\nHere is your custom 3D Wardrobe proposal from Khizana:\n\n` +
    `📐 Dimensions: ${width}mm × ${height}mm (${areaM2.toFixed(2)} m²)\n` +
    `🪵 Material: ${MATERIALS[materialIdx].name}\n` +
    `🚪 Frame: ${FRAMES[frameStyle].name}\n` +
    `💡 LED Lighting: ${ledLighting ? "Included" : "None"}\n\n` +
    `💰 Instant Estimated Quote: AED ${totalPrice.toLocaleString()}\n\n` +
    `Tap here to approve design: https://khizana.io/approve?q=8500`
  );
  const waUrl = `https://wa.me/?text=${waText}`;

  return (
    <section
      id="studio"
      style={{
        position: "relative",
        padding: "96px 24px",
        background: "radial-gradient(ellipse at 50% 20%, oklch(0.13 0.025 65 / 0.6) 0%, transparent 65%), oklch(0.07 0.010 55)",
        borderTop: `1px solid ${G.border}`,
        overflow: "hidden",
      }}
    >
      {/* Background glow elements */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: "450px", height: "450px", borderRadius: "50%", background: "oklch(0.78 0.13 78 / 0.04)", filter: "blur(100px)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: G.gold, marginBottom: "12px" }}>
            Interactive 3D Studio
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, letterSpacing: "-0.02em", color: G.text, margin: 0 }}>
            Design Your 3D Wardrobe &amp; <em style={{ color: G.gold, fontStyle: "italic" }}>Get Instant Quote</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: G.textMuted, marginTop: "14px", maxWidth: "520px", margin: "14px auto 0", lineHeight: 1.6 }}>
            Customize dimensions, frames, interiors and materials in real-time 3D.
          </p>
        </div>

        {/* ── 9-Step Navigation Header ── */}
        <div style={{
          display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "16px", marginBottom: "32px",
          scrollbarWidth: "none", borderBottom: `1px solid ${G.border}`
        }}>
          {STEPS.map((s) => {
            const isActive = s.n === currentStep;
            const isDone = s.n < currentStep;
            return (
              <button
                key={s.n}
                onClick={() => setCurrentStep(s.n)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px",
                  borderRadius: "999px",
                  background: isActive ? G.gold : isDone ? "oklch(0.16 0.02 70)" : "oklch(0.12 0.01 60)",
                  border: `1px solid ${isActive ? G.gold : isDone ? "oklch(0.40 0.08 78 / 0.4)" : G.border}`,
                  color: isActive ? "oklch(0.10 0.012 60)" : isDone ? G.text : G.textMuted,
                  cursor: "pointer", transition: "all 0.25s ease", flexShrink: 0,
                  boxShadow: isActive ? `0 0 16px ${G.goldGlow}` : "none",
                }}
              >
                <span style={{
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: isActive ? "oklch(0.10 0.012 60)" : isDone ? G.gold : "oklch(0.20 0.01 60)",
                  color: isActive ? G.gold : isDone ? "oklch(0.10 0.012 60)" : G.textMuted,
                  fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {isDone ? "✓" : s.n}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: isActive ? 700 : 500 }}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Studio Layout: 3D Canvas (Left) + Controls Panel (Right) ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "start" }}>

          {/* LEFT: Live Interactive 3D Orbit Viewport */}
          <div style={{
            position: "relative", borderRadius: "24px",
            background: G.bgCard, border: `1px solid ${G.border}`,
            height: "540px", overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          }}>
            {/* Live 3D Canvas with drag orbit */}
            <SpeedDemo3DCanvas
              step={currentStep}
              progress={1}
              colorIdx={materialIdx}
              frameStyle={frameStyle}
              interiorStyle={interiorStyle}
              interactive={true}
              height="100%"
            />

            {/* Live Floating Quote Badge */}
            <div style={{
              position: "absolute", top: "20px", right: "20px",
              padding: "12px 20px", borderRadius: "16px",
              background: "oklch(0.10 0.012 60 / 0.88)",
              backdropFilter: "blur(16px)", border: `1.5px solid ${G.gold}`,
              boxShadow: `0 0 30px ${G.goldGlow}`,
              zIndex: 20, textAlign: "right"
            }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: G.textMuted }}>
                ESTIMATED QUOTE
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", fontWeight: 700, color: G.gold, marginTop: "2px" }}>
                AED {totalPrice.toLocaleString()}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: G.textMuted }}>
                {areaM2.toFixed(2)} m² · {MATERIALS[materialIdx].name}
              </div>
            </div>
          </div>

          {/* RIGHT: Step-by-Step Interactive Control Panel */}
          <div style={{
            borderRadius: "24px", background: G.bgCard, border: `1px solid ${G.border}`,
            padding: "32px", minHeight: "540px", display: "flex", flexDirection: "column", justifyContent: "space-between"
          }}>
            <div>
              {/* Step Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: G.gold }}>
                    STEP {currentStep} OF 9
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", color: G.text, margin: "4px 0 0 0" }}>
                    {STEPS[currentStep - 1].title}
                  </h3>
                </div>
                <div style={{ padding: "6px 14px", borderRadius: "999px", background: `${G.gold}15`, border: `1px solid ${G.goldDim}`, fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.gold }}>
                  {STEPS[currentStep - 1].desc}
                </div>
              </div>

              {/* ── STEP 1: Add Room ── */}
              {currentStep === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: G.textMuted, margin: 0 }}>
                    Select the space type to initiate 3D room measurement:
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {ROOM_TYPES.map((rt) => (
                      <button
                        key={rt.name}
                        onClick={() => {
                          setRoomType(rt.name);
                          setWidth(rt.defaultW);
                          setHeight(rt.defaultH);
                        }}
                        style={{
                          padding: "16px", borderRadius: "14px",
                          background: roomType === rt.name ? "oklch(0.20 0.04 72)" : "oklch(0.12 0.01 55)",
                          border: `1.5px solid ${roomType === rt.name ? G.gold : G.border}`,
                          textAlign: "left", cursor: "pointer", transition: "all 0.25s ease",
                        }}
                      >
                        <div style={{ fontSize: "24px" }}>{rt.icon}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: G.text, marginTop: "8px" }}>{rt.name}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted, marginTop: "2px" }}>{rt.defaultW} × {rt.defaultH} mm</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Dimensions ── */}
              {currentStep === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: G.text, marginBottom: "8px" }}>
                      <span>Wall Width (mm)</span>
                      <span style={{ color: G.gold, fontWeight: 700 }}>{width} mm</span>
                    </div>
                    <input
                      type="range" min="1800" max="3600" step="100" value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      style={{ width: "100%", accentColor: G.gold, cursor: "pointer" }}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: G.text, marginBottom: "8px" }}>
                      <span>Wall Height (mm)</span>
                      <span style={{ color: G.gold, fontWeight: 700 }}>{height} mm</span>
                    </div>
                    <input
                      type="range" min="2200" max="3000" step="50" value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      style={{ width: "100%", accentColor: G.gold, cursor: "pointer" }}
                    />
                  </div>

                  <div style={{ padding: "14px", borderRadius: "12px", background: "oklch(0.12 0.01 55)", border: `1px solid ${G.border}`, display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: G.textMuted }}>TOTAL AREA</div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: G.gold, fontWeight: 700 }}>{areaM2.toFixed(2)} m²</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: G.textMuted }}>MODULE COUNT</div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: G.text, fontWeight: 700 }}>{Math.ceil(width / 900)} Columns</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Smart Design ── */}
              {currentStep === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "center", padding: "20px 0" }}>
                  <div style={{
                    width: "72px", height: "72px", borderRadius: "50%", margin: "0 auto",
                    background: "linear-gradient(135deg, oklch(0.78 0.13 78), oklch(0.65 0.15 60))",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px",
                    boxShadow: `0 0 40px ${G.goldGlow}`,
                  }}>
                    ✨
                  </div>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: G.text, margin: 0 }}>AI Smart Layout Generated</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: G.textMuted, margin: 0, lineHeight: 1.5 }}>
                    Khizana AI analyzed {width}×{height}mm space and created an ergonomic 3D compartment configuration.
                  </p>
                </div>
              )}

              {/* ── STEP 4: Door Frame ── */}
              {currentStep === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {FRAMES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFrameStyle(f.id)}
                      style={{
                        padding: "16px", borderRadius: "14px",
                        background: frameStyle === f.id ? "oklch(0.20 0.04 72)" : "oklch(0.12 0.01 55)",
                        border: `1.5px solid ${frameStyle === f.id ? G.gold : G.border}`,
                        textAlign: "left", cursor: "pointer", transition: "all 0.25s ease",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: G.text }}>{f.name}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted, marginTop: "2px" }}>{f.desc}</div>
                      </div>
                      {frameStyle === f.id && <span style={{ color: G.gold, fontWeight: 700 }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* ── STEP 5: Interiors ── */}
              {currentStep === 5 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {INTERIORS.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => setInteriorStyle(it.id)}
                      style={{
                        padding: "16px", borderRadius: "14px",
                        background: interiorStyle === it.id ? "oklch(0.20 0.04 72)" : "oklch(0.12 0.01 55)",
                        border: `1.5px solid ${interiorStyle === it.id ? G.gold : G.border}`,
                        textAlign: "left", cursor: "pointer", transition: "all 0.25s ease",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: G.text }}>{it.name}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted, marginTop: "2px" }}>{it.desc}</div>
                      </div>
                      {interiorStyle === it.id && <span style={{ color: G.gold, fontWeight: 700 }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* ── STEP 6: Materials & Finish ── */}
              {currentStep === 6 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                    {MATERIALS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMaterialIdx(m.id)}
                        style={{
                          padding: "14px", borderRadius: "14px",
                          background: materialIdx === m.id ? "oklch(0.20 0.04 72)" : "oklch(0.12 0.01 55)",
                          border: `1.5px solid ${materialIdx === m.id ? G.gold : G.border}`,
                          textAlign: "center", cursor: "pointer", transition: "all 0.25s ease",
                          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
                        }}
                      >
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: m.color, border: `1px solid ${G.border}` }}/>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: G.text }}>{m.name}</span>
                      </button>
                    ))}
                  </div>

                  <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", borderRadius: "12px", background: "oklch(0.12 0.01 55)", cursor: "pointer" }}>
                    <input
                      type="checkbox" checked={ledLighting} onChange={(e) => setLedLighting(e.target.checked)}
                      style={{ accentColor: G.gold, width: "18px", height: "18px" }}
                    />
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: G.text }}>Add Smart LED Lighting</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted }}>Warm glow strip lights integrated in shelves (+AED 450)</div>
                    </div>
                  </label>
                </div>
              )}

              {/* ── STEP 7: Instant Quote ── */}
              {currentStep === 7 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ padding: "16px", borderRadius: "14px", background: "oklch(0.12 0.01 55)", border: `1px solid ${G.border}`, display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: G.textMuted }}>
                      <span>Base Cabinet Work ({areaM2.toFixed(2)} m²)</span>
                      <span style={{ color: G.text }}>AED {Math.round(areaM2 * baseRatePerM2).toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: G.textMuted }}>
                      <span>Finish ({MATERIALS[materialIdx].name})</span>
                      <span style={{ color: G.text }}>{materialMult > 1 ? `+${Math.round((materialMult - 1) * 100)}%` : "Standard"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: G.textMuted }}>
                      <span>Frame ({FRAMES[frameStyle].name})</span>
                      <span style={{ color: G.text }}>+AED {frameAddon}</span>
                    </div>
                    {ledLighting && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: G.textMuted }}>
                        <span>Smart LED Lighting</span>
                        <span style={{ color: G.text }}>+AED 450</span>
                      </div>
                    )}
                    <div style={{ borderTop: `1px solid ${G.border}`, paddingTop: "10px", display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 700, color: G.gold }}>
                      <span>Total Estimated Quote</span>
                      <span>AED {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 8: Share Quote ── */}
              {currentStep === 8 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: G.textMuted, display: "block", marginBottom: "6px" }}>Client Name</label>
                    <input
                      type="text" value={clientName} onChange={(e) => setClientName(e.target.value)}
                      style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "oklch(0.12 0.01 55)", border: `1px solid ${G.border}`, color: G.text, fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: G.textMuted, display: "block", marginBottom: "6px" }}>Client WhatsApp Phone</label>
                    <input
                      type="text" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)}
                      style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "oklch(0.12 0.01 55)", border: `1px solid ${G.border}`, color: G.text, fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  <a
                    href={waUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: "16px", borderRadius: "14px", background: "#25D366",
                      color: "white", textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px", fontWeight: 700, textAlign: "center", display: "flex",
                      alignItems: "center", justifyContent: "center", gap: "10px",
                      boxShadow: "0 4px 20px #25D36655", marginTop: "8px"
                    }}
                  >
                    📲 Send 3D Proposal via WhatsApp
                  </a>
                </div>
              )}

              {/* ── STEP 9: Approval ── */}
              {currentStep === 9 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "center", padding: "10px 0" }}>
                  {isApproved ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                      <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "oklch(0.55 0.15 145)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                        🎉
                      </div>
                      <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: "oklch(0.75 0.18 145)", margin: 0 }}>
                        Client Approved!
                      </h4>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: G.textMuted, margin: 0 }}>
                        Quote of AED {totalPrice.toLocaleString()} for {clientName} confirmed. Ready for manufacturing.
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: G.text, margin: 0 }}>
                        Simulate Client Approval
                      </h4>
                      <button
                        onClick={() => setIsApproved(true)}
                        style={{
                          padding: "16px", borderRadius: "14px", background: G.gold,
                          color: "oklch(0.10 0.012 60)", border: "none",
                          fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700,
                          cursor: "pointer", boxShadow: `0 0 30px ${G.goldGlow}`
                        }}
                      >
                        ✓ One-Tap Client Sign-Off
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Nav Controls ("← Back" / "Next Step →") */}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${G.border}`, paddingTop: "20px", marginTop: "24px" }}>
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                style={{
                  padding: "10px 22px", borderRadius: "999px",
                  background: "none", border: `1px solid ${G.border}`,
                  color: currentStep === 1 ? G.textMuted : G.text,
                  fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
                  cursor: currentStep === 1 ? "not-allowed" : "pointer", opacity: currentStep === 1 ? 0.4 : 1
                }}
              >
                ← Back
              </button>

              <button
                disabled={currentStep === 9}
                onClick={() => setCurrentStep((s) => Math.min(9, s + 1))}
                style={{
                  padding: "10px 26px", borderRadius: "999px",
                  background: G.gold, border: "none",
                  color: "oklch(0.10 0.012 60)",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700,
                  cursor: currentStep === 9 ? "not-allowed" : "pointer", opacity: currentStep === 9 ? 0.5 : 1,
                  boxShadow: `0 0 20px ${G.goldGlow}`
                }}
              >
                {currentStep === 9 ? "Finished ✓" : "Next Step →"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
