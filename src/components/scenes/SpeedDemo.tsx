import { useEffect, useRef, useState, useCallback } from "react";
import SpeedDemo3DCanvas from "./SpeedDemo3DCanvas";

/* ─── Design tokens (matching Khizana palette) ─── */
const G = {
  gold: "oklch(0.82 0.14 82)",
  goldDim: "oklch(0.78 0.13 78)",
  goldGlow: "oklch(0.78 0.13 78 / 0.35)",
  bg: "oklch(0.08 0.010 55)",
  bgCard: "oklch(0.14 0.018 57)",
  text: "oklch(0.96 0.015 80)",
  textMuted: "oklch(0.55 0.015 80)",
  border: "oklch(0.26 0.018 60 / 0.5)",
};

const TOTAL = 9;

const STEPS = [
  { label: "Add a Room",           ms: 2000 },
  { label: "Canvas Generated",     ms: 2200 },
  { label: "Start Smart Design",   ms: 2400 },
  { label: "Choose Frame",         ms: 2000 },
  { label: "Choose Interiors",     ms: 2000 },
  { label: "Choose Color",         ms: 2000 },
  { label: "Done!",                ms: 2500 },
  { label: "Share via WhatsApp",   ms: 2500 },
  { label: "Client Approves",      ms: 3200 },
];

/* ─────────────────────────────────────────────
   Shared sub-components
───────────────────────────────────────────── */
function StatusBar() {
  return (
    <div style={{ height: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", flexShrink: 0 }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, color: G.text }}>9:41</span>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="1" y="2" width="10" height="7" rx="1" stroke={G.text} strokeWidth="0.9"/>
          <rect x="12" y="3.5" width="1.5" height="3" rx="0.5" fill={G.text}/>
          <rect x="2" y="3" width="8" height="5" rx="0.5" fill={G.text}/>
        </svg>
      </div>
    </div>
  );
}

function AppBar({ title, showBack = true }: { title: string; showBack?: boolean }) {
  return (
    <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "8px", padding: "0 14px", borderBottom: `1px solid ${G.border}`, flexShrink: 0 }}>
      {showBack && (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9l5 5" stroke={G.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: G.text, flex: 1 }}>{title}</span>
    </div>
  );
}

function CheckBadge() {
  return (
    <div style={{
      width: "22px", height: "22px", borderRadius: "50%", background: G.gold,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      animation: "sd-pop-in 0.4s cubic-bezier(0.22,1,0.36,1) both",
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-6" stroke="oklch(0.10 0.012 60)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 1 — Add a Room
───────────────────────────────────────────── */
function Screen1({ progress }: { progress: number }) {
  const tapped = progress > 0.62;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <StatusBar/>
      <AppBar title="My Projects" showBack={false}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px", padding: "20px" }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <rect x="6" y="6" width="60" height="60" rx="6" stroke={G.goldDim} strokeWidth="1" strokeDasharray="5 3" opacity="0.5"/>
          <rect x="18" y="18" width="36" height="36" rx="3" fill={`${G.gold}08`} stroke={G.goldDim} strokeWidth="0.8" opacity="0.7"/>
          <path d="M36 26L36 46M26 36L46 36" stroke={G.gold} strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: G.text }}>No rooms yet</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted, marginTop: "4px" }}>Tap to add your first room</div>
        </div>
        <div style={{
          width: "60px", height: "60px", borderRadius: "50%",
          background: tapped ? "oklch(0.68 0.12 78)" : G.gold,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: tapped ? `0 0 0 14px ${G.goldGlow}, 0 0 40px ${G.goldGlow}` : `0 0 0 6px ${G.goldGlow}, 0 0 18px ${G.goldGlow}`,
          transition: "all 0.35s ease",
          animation: "sd-pulse-ring 1.8s ease-in-out infinite",
          transform: tapped ? "scale(0.9)" : "scale(1)",
          cursor: "pointer",
        }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M13 6v14M6 13h14" stroke="oklch(0.10 0.012 60)" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        {tapped && (
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.gold, letterSpacing: "0.12em", textTransform: "uppercase", animation: "sd-fade-up 0.4s ease both" }}>
            ✓ Room Added
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 2 — Canvas with Dimensions
───────────────────────────────────────────── */
function Screen2() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <StatusBar/>
      <AppBar title="Room Setup — Wall A"/>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
        <svg width="218" height="198" viewBox="0 0 218 198">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="198" stroke={G.border} strokeWidth="0.4"/>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="218" y2={i * 20} stroke={G.border} strokeWidth="0.4"/>
          ))}
          <rect x="28" y="28" width="162" height="142" rx="2" stroke={G.gold} strokeWidth="1.8" fill={`${G.gold}08`}/>
          {/* Width dimension */}
          <line x1="28" y1="14" x2="190" y2="14" stroke={G.gold} strokeWidth="0.8"/>
          <line x1="28" y1="9" x2="28" y2="19" stroke={G.gold} strokeWidth="0.8"/>
          <line x1="190" y1="9" x2="190" y2="19" stroke={G.gold} strokeWidth="0.8"/>
          <text x="109" y="11" fill={G.gold} fontSize="8" textAnchor="middle" fontFamily="'DM Sans', sans-serif" letterSpacing="0.05em">2400 mm</text>
          {/* Height dimension */}
          <line x1="8" y1="28" x2="8" y2="170" stroke={G.gold} strokeWidth="0.8"/>
          <line x1="3" y1="28" x2="13" y2="28" stroke={G.gold} strokeWidth="0.8"/>
          <line x1="3" y1="170" x2="13" y2="170" stroke={G.gold} strokeWidth="0.8"/>
          <text x="4" y="99" fill={G.gold} fontSize="8" textAnchor="middle" fontFamily="'DM Sans', sans-serif" letterSpacing="0.04em" transform="rotate(-90, 4, 99)">2600 mm</text>
          {/* Corner crosshairs */}
          {([[28, 28], [190, 28], [28, 170], [190, 170]] as [number, number][]).map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="4.5" fill="none" stroke={G.gold} strokeWidth="1"/>
              <circle cx={cx} cy={cy} r="1.8" fill={G.gold}/>
            </g>
          ))}
          <text x="109" y="97" fill={G.goldDim} fontSize="10" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" opacity="0.65">6.24 m²</text>
        </svg>
      </div>
      <div style={{ padding: "10px 14px", borderTop: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted }}>
          Wall: <span style={{ color: G.gold }}>240 × 260 cm</span>
        </div>
        <div style={{ padding: "6px 18px", background: G.gold, borderRadius: "999px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "oklch(0.10 0.012 60)" }}>
          Confirm →
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 3 — Start Smart Design
───────────────────────────────────────────── */
function Screen3({ progress }: { progress: number }) {
  const started = progress > 0.42;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <StatusBar/>
      <AppBar title="Smart Design (3D)"/>
      <div style={{ flex: 1, position: "relative" }}>
        {/* Live 3D Canvas rendering in background */}
        <SpeedDemo3DCanvas step={3} progress={progress} interactive={false} height="100%"/>

        <div style={{
          position: "absolute", bottom: "16px", left: "16px", right: "16px",
          padding: "12px 14px", borderRadius: "14px",
          background: "oklch(0.12 0.012 60 / 0.88)",
          backdropFilter: "blur(12px)", border: `1px solid ${G.border}`,
          display: "flex", flexDirection: "column", gap: "8px", zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: "13px", fontWeight: 600, color: G.text }}>✨ AI 3D Generation</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: G.gold, fontWeight: 700 }}>{started ? "GENERATING 3D" : "READY"}</span>
          </div>
          <div style={{ height: "3px", width: "100%", background: "oklch(0.18 0.01 60)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: started ? "100%" : "0%", background: G.gold, transition: "width 1.4s ease" }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 4 — Choose Frame
───────────────────────────────────────────── */
function Screen4({ progress }: { progress: number }) {
  const selected = progress > 0.52 ? 1 : 0;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <StatusBar/>
      <AppBar title="Choose 3D Frame"/>
      <div style={{ flex: 1, position: "relative" }}>
        {/* Live 3D Wardrobe Frame Canvas */}
        <SpeedDemo3DCanvas step={4} progress={progress} frameStyle={selected} interactive={false} height="65%"/>

        <div style={{
          position: "absolute", bottom: "12px", left: "12px", right: "12px",
          padding: "10px 12px", borderRadius: "12px",
          background: "oklch(0.12 0.012 60 / 0.92)",
          backdropFilter: "blur(12px)", border: `1px solid ${G.border}`,
          display: "flex", gap: "6px", zIndex: 10
        }}>
          {["Classic", "Modern", "Sliding"].map((f, i) => (
            <div key={f} style={{
              flex: 1, padding: "8px 4px", borderRadius: "8px",
              background: selected === i ? G.gold : "oklch(0.16 0.012 60)",
              color: selected === i ? "oklch(0.10 0.012 60)" : G.textMuted,
              textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700,
              transition: "all 0.3s ease",
            }}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 5 — Choose Interiors
───────────────────────────────────────────── */
function Screen5({ progress }: { progress: number }) {
  const selected = progress > 0.52 ? 0 : 1;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <StatusBar/>
      <AppBar title="Choose 3D Interiors"/>
      <div style={{ flex: 1, position: "relative" }}>
        {/* Live 3D Wardrobe Interiors */}
        <SpeedDemo3DCanvas step={5} progress={progress} interiorStyle={selected} interactive={false} height="65%"/>

        <div style={{
          position: "absolute", bottom: "12px", left: "12px", right: "12px",
          padding: "10px 12px", borderRadius: "12px",
          background: "oklch(0.12 0.012 60 / 0.92)",
          backdropFilter: "blur(12px)", border: `1px solid ${G.border}`,
          display: "flex", gap: "6px", zIndex: 10
        }}>
          {["Mixed", "Hanging", "Storage"].map((l, i) => (
            <div key={l} style={{
              flex: 1, padding: "8px 4px", borderRadius: "8px",
              background: selected === i ? G.gold : "oklch(0.16 0.012 60)",
              color: selected === i ? "oklch(0.10 0.012 60)" : G.textMuted,
              textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700,
              transition: "all 0.3s ease",
            }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 6 — Choose Color
───────────────────────────────────────────── */
function Screen6({ progress }: { progress: number }) {
  const selected = progress > 0.52 ? 0 : 1; // Oak
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <StatusBar/>
      <AppBar title="3D Color Swap"/>
      <div style={{ flex: 1, position: "relative" }}>
        {/* Live 3D Wardrobe Color Swap */}
        <SpeedDemo3DCanvas step={6} progress={progress} colorIdx={selected} interactive={false} height="65%"/>

        <div style={{
          position: "absolute", bottom: "12px", left: "12px", right: "12px",
          padding: "8px 10px", borderRadius: "12px",
          background: "oklch(0.12 0.012 60 / 0.92)",
          backdropFilter: "blur(12px)", border: `1px solid ${G.border}`,
          display: "flex", gap: "8px", justifyContent: "center", zIndex: 10
        }}>
          {["Oak", "Walnut", "Greige", "White", "Black"].map((c, i) => (
            <div key={c} style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: i === 0 ? "oklch(0.62 0.07 58)" : i === 1 ? "oklch(0.36 0.055 42)" : i === 2 ? "oklch(0.74 0.025 75)" : i === 3 ? "oklch(0.93 0.008 85)" : "oklch(0.16 0.01 55)",
              border: `2px solid ${selected === i ? G.gold : "transparent"}`,
              boxShadow: selected === i ? `0 0 10px ${G.gold}` : "none",
              transition: "transform 0.2s ease",
              transform: selected === i ? "scale(1.15)" : "scale(1)",
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 7 — Done!
───────────────────────────────────────────── */
function Screen7() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <StatusBar/>
      <AppBar title="3D Model Ready"/>
      <div style={{ flex: 1, position: "relative" }}>
        {/* Live 3D Wardrobe Final Model */}
        <SpeedDemo3DCanvas step={7} progress={1} colorIdx={0} interactive={false} height="65%"/>

        <div style={{
          position: "absolute", bottom: "14px", left: "14px", right: "14px",
          padding: "10px 16px", borderRadius: "14px",
          background: "oklch(0.12 0.012 60 / 0.92)",
          backdropFilter: "blur(12px)", border: `1px solid ${G.gold}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10
        }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: G.textMuted, letterSpacing: "0.08em" }}>INSTANT QUOTE</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 700, color: G.gold }}>AED 8,500</div>
          </div>
          <div style={{ padding: "6px 14px", background: G.gold, borderRadius: "999px", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, color: "oklch(0.10 0.012 60)" }}>
            Share 📲
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 8 — WhatsApp Share
───────────────────────────────────────────── */
function Screen8({ progress }: { progress: number }) {
  const sent = progress > 0.52;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <StatusBar/>
      <AppBar title="Share Quote"/>
      <div style={{ flex: 1, padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ padding: "12px", borderRadius: "12px", background: G.bgCard, border: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, oklch(0.32 0.10 250), oklch(0.24 0.07 250))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: "white", flexShrink: 0 }}>A</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: G.text }}>Ahmed Al-Rashidi</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted }}>+971 50 234 5678</div>
          </div>
          <div style={{ padding: "4px 10px", borderRadius: "999px", background: `${G.gold}14`, border: `1px solid ${G.goldDim}`, fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: G.gold, letterSpacing: "0.05em" }}>CLIENT</div>
        </div>
        <div style={{ padding: "12px", borderRadius: "12px", background: G.bgCard, border: `1px solid ${G.border}` }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: G.textMuted, letterSpacing: "0.08em", marginBottom: "8px" }}>SHARING QUOTE</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: G.text }}>Custom Wardrobe Design</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted, marginTop: "3px" }}>Oak · Modern · Mixed · AED 8,500</div>
          <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
            {["3D View", "Specs", "Quote"].map((t) => (
              <span key={t} style={{ padding: "3px 8px", borderRadius: "4px", background: `${G.gold}10`, border: `1px solid ${G.goldDim}35`, fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: G.gold }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "auto" }}>
          <div style={{
            padding: "16px", borderRadius: "14px",
            background: sent ? "linear-gradient(135deg, oklch(0.40 0.15 145), oklch(0.32 0.12 145))" : "linear-gradient(135deg, #25D366, #1aab56)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            boxShadow: sent ? "0 0 36px oklch(0.55 0.15 145 / 0.5)" : "0 4px 24px #25D36655",
            transition: "all 0.4s ease", cursor: "pointer",
          }}>
            {sent ? (
              <>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "white" }}>Sent! Quote delivered ✓</span>
              </>
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 32 32" fill="white"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.7c1.8 1 3.9 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm6.3 17.4c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.2.1-3.7-1.1-2.8-1.3-5-4.2-5.2-4.4-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.5.7c-.1.1-.2.3-.1.5.3.6 1.1 1.7 1.9 2.3 1 .8 1.9 1.1 2.2 1.2.2.1.4 0 .5-.1l.7-.8c.2-.2.4-.3.6-.2l2 .9c.2.1.4.2.4.5v1z"/></svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "white" }}>Send via WhatsApp</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 9 — Client Approves
───────────────────────────────────────────── */
function Screen9({ progress }: { progress: number }) {
  const showReply = progress > 0.48;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: G.bg }}>
      <StatusBar/>
      <div style={{ padding: "8px 14px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: "10px", background: G.bgCard, flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke={G.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, oklch(0.32 0.10 250), oklch(0.24 0.07 250))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "white" }}>A</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: G.text }}>Ahmed Al-Rashidi</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: showReply ? "oklch(0.65 0.14 145)" : G.textMuted, transition: "color 0.4s" }}>{showReply ? "✓ Replied" : "Delivered"}</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "10px", overflow: "hidden" }}>
        {/* Designer's sent message */}
        <div style={{ alignSelf: "flex-end", maxWidth: "82%" }}>
          <div style={{ padding: "10px 13px", borderRadius: "14px 14px 3px 14px", background: "oklch(0.25 0.06 72 / 0.8)", border: `1px solid ${G.border}` }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: G.gold, marginBottom: "4px" }}>🗂 Custom Wardrobe Quote</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: G.textMuted }}>Oak · Modern · AED 8,500</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.text, marginTop: "6px", lineHeight: 1.45 }}>Hi Ahmed! Your design is ready. Take a look 👀</div>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: G.textMuted, textAlign: "right", marginTop: "3px" }}>{showReply ? "✓✓ Read" : "✓ Sent"} · Now</div>
        </div>
        {/* Client approval reply */}
        {showReply && (
          <div style={{ alignSelf: "flex-start", maxWidth: "85%", animation: "sd-slide-left 0.45s cubic-bezier(0.22,1,0.36,1) both" }}>
            <div style={{ padding: "11px 14px", borderRadius: "14px 14px 14px 3px", background: G.bgCard, border: "1.5px solid oklch(0.55 0.15 145 / 0.6)", boxShadow: "0 0 24px oklch(0.55 0.15 145 / 0.25)" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: G.text, lineHeight: 1.45 }}>Exactly what I wanted! 🔥</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "oklch(0.75 0.18 145)", fontWeight: 700, marginTop: "5px" }}>Approved! Let's proceed 🎉</div>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "oklch(0.65 0.13 145)", marginTop: "4px" }}>✅ Deal Closed · Now</div>
          </div>
        )}
      </div>
      {/* Decorative input bar */}
      <div style={{ padding: "8px 12px", borderTop: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <div style={{ flex: 1, padding: "8px 12px", borderRadius: "999px", background: G.bgCard, border: `1px solid ${G.border}`, fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: G.textMuted }}>Message</div>
        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1.5 7.5h12M8 2l5.5 5.5L8 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Screen router
───────────────────────────────────────────── */
function PhoneScreen({ step, progress }: { step: number; progress: number }) {
  switch (step) {
    case 1: return <Screen1 progress={progress}/>;
    case 2: return <Screen2/>;
    case 3: return <Screen3 progress={progress}/>;
    case 4: return <Screen4 progress={progress}/>;
    case 5: return <Screen5 progress={progress}/>;
    case 6: return <Screen6 progress={progress}/>;
    case 7: return <Screen7/>;
    case 8: return <Screen8 progress={progress}/>;
    case 9: return <Screen9 progress={progress}/>;
    default: return null;
  }
}

/* ─────────────────────────────────────────────
   MAIN SpeedDemo
───────────────────────────────────────────── */
export default function SpeedDemo() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [viewMode, setViewMode] = useState<"app" | "3d">("app");

  const stepRef = useRef(1);
  const playingRef = useRef(false);
  const rafRef = useRef(0);
  const stepStartRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const goToStep = useCallback((n: number) => {
    setVisible(false);
    setTimeout(() => {
      stepRef.current = n;
      stepStartRef.current = performance.now();
      setStep(n);
      setProgress(0);
      setVisible(true);
    }, 280);
  }, []);

  const tick = useCallback((now: number) => {
    if (!playingRef.current) return;
    const elapsed = now - stepStartRef.current;
    const dur = STEPS[stepRef.current - 1].ms;
    const p = Math.min(elapsed / dur, 1);
    setProgress(p);

    if (p >= 1) {
      const next = stepRef.current + 1;
      if (next <= TOTAL) {
        setTimeout(() => goToStep(next), 80);
      } else {
        playingRef.current = false;
        setPlaying(false);
        setDone(true);
      }
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [goToStep]);

  useEffect(() => {
    if (!playing) return;
    stepStartRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, step, tick]);

  const startPlaying = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    stepRef.current = 1;
    stepStartRef.current = performance.now();
    setStep(1);
    setProgress(0);
    setVisible(true);
    setDone(false);
    playingRef.current = true;
    setPlaying(true);
  }, []);

  // Auto-start on scroll into view (once)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startPlaying();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startPlaying]);

  return (
    <section
      ref={sectionRef}
      id="demo"
      style={{
        position: "relative",
        padding: "96px 24px",
        background: "radial-gradient(ellipse at 50% 0%, oklch(0.14 0.025 65 / 0.55) 0%, transparent 58%), oklch(0.08 0.010 55)",
        overflow: "hidden",
      }}
    >
      {/* Border lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, oklch(0.78 0.13 78 / 0.4), transparent)" }}/>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "5%", left: "0%", width: "500px", height: "500px", borderRadius: "50%", background: "oklch(0.78 0.13 78 / 0.035)", filter: "blur(90px)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "0%", right: "0%", width: "400px", height: "400px", borderRadius: "50%", background: "oklch(0.55 0.10 250 / 0.035)", filter: "blur(70px)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "940px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "60px" }}>

        {/* ── Section headline ── */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "oklch(0.78 0.13 78)", marginBottom: "16px" }}>
            The 60-Second Sale
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.07, color: "oklch(0.96 0.015 80)", margin: 0 }}>
            9 steps.{" "}
            <em style={{ color: "oklch(0.82 0.14 82)", fontStyle: "italic" }}>One tap each.</em>
            <br/>Under 60 seconds.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "oklch(0.58 0.018 80)", marginTop: "16px", lineHeight: 1.6, maxWidth: "460px", margin: "16px auto 0" }}>
            From an empty wall to a client-approved quote — faster than any platform in the GCC.
          </p>
        </div>

        {/* ── Mode Switcher Pills ── */}
        <div style={{ display: "flex", gap: "8px", padding: "4px", background: "oklch(0.14 0.012 60)", borderRadius: "999px", border: `1px solid ${G.border}` }}>
          <button
            onClick={() => setViewMode("app")}
            style={{
              padding: "7px 18px", borderRadius: "999px", border: "none",
              background: viewMode === "app" ? G.gold : "transparent",
              color: viewMode === "app" ? "oklch(0.10 0.012 60)" : G.textMuted,
              fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700,
              cursor: "pointer", transition: "all 0.3s ease",
            }}
          >
            📱 Mobile UI Walkthrough
          </button>
          <button
            onClick={() => setViewMode("3d")}
            style={{
              padding: "7px 18px", borderRadius: "999px", border: "none",
              background: viewMode === "3d" ? G.gold : "transparent",
              color: viewMode === "3d" ? "oklch(0.10 0.012 60)" : G.textMuted,
              fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700,
              cursor: "pointer", transition: "all 0.3s ease",
              display: "flex", alignItems: "center", gap: "6px"
            }}
          >
            🧊 Full 3D Canvas Mode
          </button>
        </div>

        {/* ── Demo area: step list + view (Phone or 3D Canvas) ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(28px, 6vw, 80px)", width: "100%", justifyContent: "center", flexWrap: "wrap" }}>

          {/* Left — step list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "190px" }}>
            {STEPS.map((s, i) => {
              const n = i + 1;
              const isActive = n === step;
              const isPast = n < step || done;
              return (
                <div
                  key={n}
                  onClick={() => goToStep(n)}
                  style={{ display: "flex", alignItems: "center", gap: "10px", opacity: isActive ? 1 : isPast ? 0.55 : 0.28, transition: "opacity 0.5s ease", cursor: "pointer" }}
                >
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: isPast ? "oklch(0.52 0.14 145)" : isActive ? G.gold : "oklch(0.17 0.012 60)",
                    border: `1.5px solid ${isPast ? "oklch(0.52 0.14 145)" : isActive ? G.gold : "oklch(0.28 0.015 60)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.4s ease",
                    boxShadow: isActive ? `0 0 12px oklch(0.82 0.14 82 / 0.5)` : "none",
                  }}>
                    {isPast ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "8px", fontWeight: 700, color: isActive ? "oklch(0.10 0.012 60)" : "oklch(0.42 0.01 60)" }}>
                        {String(n).padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: isActive ? 600 : 400, color: isActive ? "oklch(0.92 0.012 80)" : "oklch(0.52 0.015 80)", transition: "all 0.4s ease", whiteSpace: "nowrap" }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center — Phone mockup OR Expanded 3D Canvas */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            {viewMode === "3d" ? (
              /* Full 3D Interactive Viewport */
              <div style={{
                width: "min(90vw, 420px)", height: "520px", borderRadius: "24px",
                background: "oklch(0.10 0.012 55)",
                border: "1.5px solid oklch(0.30 0.025 65)",
                position: "relative", overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
              }}>
                <SpeedDemo3DCanvas step={step} progress={progress} interactive={true} height="100%"/>
              </div>
            ) : (
              /* Phone Mockup with embedded 3D screens */
              <>
                {/* Glow behind phone */}
                <div style={{ position: "absolute", inset: "-40px", borderRadius: "50%", background: `radial-gradient(ellipse, oklch(0.78 0.13 78 / 0.10), transparent 70%)`, animation: "sd-glow-pulse 3s ease-in-out infinite", pointerEvents: "none" }}/>

                {/* Phone outer frame */}
                <div style={{
                  width: "258px", height: "520px", borderRadius: "46px",
                  background: "linear-gradient(145deg, oklch(0.18 0.016 62), oklch(0.11 0.010 55))",
                  border: "1.5px solid oklch(0.30 0.025 65)",
                  padding: "10px",
                  boxShadow: "0 0 0 1px oklch(0.20 0.012 60), 0 48px 96px oklch(0 0 0 / 0.75), inset 0 1px 0 oklch(0.40 0.020 70 / 0.25)",
                  position: "relative",
                }}>
                  {/* Dynamic island */}
                  <div style={{ position: "absolute", top: "18px", left: "50%", transform: "translateX(-50%)", width: "96px", height: "26px", borderRadius: "20px", background: "oklch(0.07 0.007 55)", border: "1px solid oklch(0.20 0.012 60)", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "oklch(0.17 0.010 55)", border: "1px solid oklch(0.26 0.012 60)" }}/>
                    <div style={{ width: "26px", height: "4px", borderRadius: "999px", background: "oklch(0.14 0.008 55)" }}/>
                  </div>

                  {/* Screen */}
                  <div style={{ width: "100%", height: "100%", borderRadius: "38px", background: "oklch(0.10 0.012 55)", overflow: "hidden", position: "relative" }}>
                    {/* Fading screen content */}
                    <div style={{ position: "absolute", inset: 0, opacity: visible ? 1 : 0, transition: "opacity 0.26s ease" }}>
                      <PhoneScreen step={step} progress={progress}/>
                    </div>
                    {/* Step counter overlay */}
                    <div style={{ position: "absolute", top: "36px", right: "14px", fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.15em", color: "oklch(0.35 0.008 80)", zIndex: 30, pointerEvents: "none" }}>
                      {String(step).padStart(2, "0")} / 09
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Progress bar */}
            <div style={{ marginTop: "20px", height: "2px", background: "oklch(0.18 0.012 60)", borderRadius: "999px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${((step - 1 + progress) / TOTAL) * 100}%`,
                background: `linear-gradient(90deg, oklch(0.60 0.10 78 / 0.7), oklch(0.82 0.14 82))`,
                borderRadius: "999px",
                transition: "width 0.1s linear",
              }}/>
            </div>

            {/* Replay button */}
            {done && (
              <button
                onClick={startPlaying}
                style={{
                  marginTop: "16px", width: "100%", padding: "12px",
                  borderRadius: "12px", background: "none",
                  border: "1.5px solid oklch(0.78 0.13 78 / 0.45)",
                  color: "oklch(0.82 0.14 82)",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "all 0.25s ease",
                  animation: "sd-fade-up 0.5s ease both",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.78 0.13 78 / 0.10)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
              >
                ↺ Replay demo
              </button>
            )}
          </div>
        </div>

        {/* ── Bottom stats ── */}
        <div style={{ display: "flex", gap: "clamp(24px, 5vw, 64px)", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { k: "9",        v: "Total steps" },
            { k: "1 tap",    v: "Per action" },
            { k: "< 60s",    v: "Full workflow" },
            { k: "WhatsApp", v: "Instant delivery" },
          ].map((s) => (
            <div key={s.v} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 600, color: "oklch(0.82 0.14 82)" }}>{s.k}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.48 0.015 80)", marginTop: "4px" }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, oklch(0.26 0.018 60 / 0.5), transparent)" }}/>
    </section>
  );
}
