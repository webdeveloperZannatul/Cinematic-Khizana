import { useEffect, useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Clock,
  Users,
  ShieldCheck,
  Zap,
  MessageCircle,
  FileText,
  Layers,
  Palette,
  Sparkles,
  Check,
  Star,
  Ruler,
  Send,
} from "lucide-react";
import CinematicExperience from "@/components/scenes/CinematicExperience";
import textureWarm from "@/assets/texture-warm.jpg";
import stepMeasure from "@/assets/step-measure.jpg";
import stepGenerate from "@/assets/step-generate.jpg";
import stepCustomize from "@/assets/step-customize.jpg";
import stepPresent from "@/assets/step-present.jpg";

/* ─────────────────────────────────────────────────────────
   Logo
───────────────────────────────────────────────────────── */
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden>
      <defs>
        <linearGradient id="kg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.88 0.14 85)" />
          <stop offset="100%" stopColor="oklch(0.65 0.16 60)" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="34" height="34" rx="9" fill="url(#kg)" />
      <path
        d="M13 11 L13 29 M13 20 L22 11 M13 20 L22 29 M26 11 L26 29"
        stroke="oklch(0.14 0.015 60)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
    <span className="font-display text-xl tracking-tight text-foreground">
      Khizana
    </span>
  </div>
);

/* ─────────────────────────────────────────────────────────
   Nav
───────────────────────────────────────────────────────── */
const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#trust", label: "Why Khizana" },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
            Sign in
          </a>
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Start Designing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <button
          className="md:hidden rounded-md p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-foreground/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#cta"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Start Designing <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

/* ─────────────────────────────────────────────────────────
   Transition strip between cinematic + marketing
───────────────────────────────────────────────────────── */
const TransitionStrip = () => (
  <div className="relative py-20 md:py-24 overflow-hidden">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    <div className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
    <div className="mx-auto max-w-5xl px-6 text-center">
      <div
        className="text-xs uppercase tracking-[0.3em] text-primary mb-5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Design · Generate · Present · Manufacture · Approve
      </div>
      <h2 className="text-4xl md:text-6xl leading-[1.05]">
        Design Faster.{" "}
        <span className="text-gradient-gold italic">Sell Better.</span>
        <br />
        Manufacture Smarter.
      </h2>
      <p className="mt-6 mx-auto max-w-2xl text-muted-foreground text-base md:text-lg">
        From site measurement to 3D visualization, quotation, and client
        approval — one streamlined platform built for UAE &amp; GCC workshops.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 max-w-3xl mx-auto">
        {[
          { k: "10×", v: "Faster designs" },
          { k: "4 min", v: "To first quote" },
          { k: "3D", v: "Real-time render" },
          { k: "GCC", v: "Built for region" },
        ].map((s) => (
          <div
            key={s.v}
            className="rounded-xl border border-border/60 bg-card/30 p-5 text-center backdrop-blur"
          >
            <div className="font-display text-3xl text-gradient-gold">{s.k}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
  </div>
);

/* ─────────────────────────────────────────────────────────
   Workflow section
───────────────────────────────────────────────────────── */
const steps = [
  {
    n: "01",
    icon: Ruler,
    title: "Measure",
    body: "Capture client requirements and room dimensions in a structured, guided flow — no more paper sketches.",
    img: stepMeasure,
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Generate",
    body: "Khizana instantly proposes optimized wardrobe layouts tailored to the room and the client brief.",
    img: stepGenerate,
  },
  {
    n: "03",
    icon: Palette,
    title: "Customize",
    body: "Refine interiors, swap doors, materials, finishes and colours — see every change in true 3D.",
    img: stepCustomize,
  },
  {
    n: "04",
    icon: Send,
    title: "Present & Approve",
    body: "Send a stunning proposal with 3D views, quotation and a one-tap approval link over WhatsApp.",
    img: stepPresent,
  },
];

const Workflow = () => (
  <section id="workflow" className="relative py-24 md:py-32">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <div className="mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-sans)" }}>
          The workflow
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl">
          Measure. Generate. Present.
          <br />
          <span className="text-gradient-gold italic">Approved.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every step of the workshop journey, rebuilt into one connected canvas.
        </p>
      </div>

      <div className="mt-20 space-y-28">
        {steps.map((s, i) => {
          const reverse = i % 2 === 1;
          return (
            <div key={s.n} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className={reverse ? "md:order-2" : ""}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl text-gradient-gold">{s.n}</span>
                  <span className="h-px flex-1 bg-border" />
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 text-4xl md:text-5xl">{s.title}</h3>
                <p className="mt-4 max-w-md text-muted-foreground">{s.body}</p>
              </div>
              <div className={reverse ? "md:order-1" : ""}>
                <div className="group relative overflow-hidden rounded-2xl border border-gold shadow-card">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <img
                    src={s.img}
                    alt={`Khizana ${s.title} interface`}
                    width={1400}
                    height={1000}
                    loading="lazy"
                    className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   Features
───────────────────────────────────────────────────────── */
const features = [
  { icon: Layers, title: "3D Visualization", body: "Photoreal renders in seconds — no rendering queue." },
  { icon: FileText, title: "Auto Quotation", body: "Materials, hardware and labour priced automatically." },
  { icon: MessageCircle, title: "WhatsApp Share", body: "Send designs where your clients already live." },
  { icon: ShieldCheck, title: "Approval Workflow", body: "Digital sign-off. Stored. Legally defensible." },
  { icon: Palette, title: "Material Library", body: "Hundreds of doors, colours, and finishes ready." },
  { icon: Users, title: "Client Presentation", body: "Present like a premium studio. Close on the spot." },
];

const Features = () => (
  <section id="features" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-sans)" }}>
          Everything included
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl">
          One platform.{" "}
          <span className="italic text-gradient-gold">Every step.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-all hover:border-gold hover:bg-card/60"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   Trust / Testimonials
───────────────────────────────────────────────────────── */
const Trust = () => (
  <section id="trust" className="relative py-24 md:py-32">
    <div
      className="pointer-events-none absolute inset-0 opacity-10"
      style={{ backgroundImage: `url(${textureWarm})`, backgroundSize: "cover" }}
    />
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-sans)" }}>
            Built for the region
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl">
            Made for UAE &amp; GCC
            <br />
            <span className="italic text-gradient-gold">wardrobe workshops.</span>
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Real carpentry workflow. Real workshop documents. Real WhatsApp-first
            clients. Khizana is engineered around how you actually work.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { k: "500+", v: "Workshops onboard" },
              { k: "35k+", v: "Wardrobes designed" },
              { k: "4.9/5", v: "Client rating" },
              { k: "24/7", v: "Regional support" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-border bg-card/40 p-4">
                <div className="font-display text-2xl text-gradient-gold">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "We used to spend two days per client. Now we quote on the same site visit. Total game changer.",
              a: "Rashid A.",
              r: "Wardrobe workshop · Dubai",
            },
            {
              q: "Clients approve faster because they can actually see it. The 3D sells the project for us.",
              a: "Fatima K.",
              r: "Interior fabricator · Sharjah",
            },
            {
              q: "The workshop documents at the end save my team hours of manual work.",
              a: "Yousef M.",
              r: "Carpentry showroom · Riyadh",
            },
          ].map((t) => (
            <div
              key={t.a}
              className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur"
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-foreground/90">"{t.q}"</p>
              <div className="mt-4 text-sm">
                <span className="text-foreground">{t.a}</span>
                <span className="text-muted-foreground"> — {t.r}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   Before / After
───────────────────────────────────────────────────────── */
const Transformation = () => (
  <section className="relative py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-sans)" }}>
          The shift
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl">
          Days of back-and-forth,
          <br />
          <span className="text-gradient-gold italic">gone.</span>
        </h2>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive">
            <Clock className="h-3.5 w-3.5" /> The old way
          </div>
          <h3 className="text-2xl text-muted-foreground">Days. Sometimes weeks.</h3>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {[
              "Manual hand sketches",
              "Scattered WhatsApp messages",
              "Waiting for the designer",
              "Separate quotation preparation",
              "Endless client revisions",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1.5 h-1 w-6 bg-muted-foreground/40" />
                <span className="line-through decoration-muted-foreground/40">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-gold bg-warm p-8 shadow-glow">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: `url(${textureWarm})`, backgroundSize: "cover" }}
          />
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
              <Zap className="h-3.5 w-3.5" /> With Khizana
            </div>
            <h3 className="text-2xl text-foreground">Minutes. On the spot.</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Digital site measurements",
                "AI-generated wardrobe layouts",
                "Real-time 3D visualization",
                "Automatic quotation & materials",
                "One-click client approval link",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   Pricing
───────────────────────────────────────────────────────── */
const tiers = [
  {
    name: "Free",
    price: "0",
    tag: "Explore Khizana",
    features: ["1 project", "Basic layouts", "PDF export", "Community support"],
  },
  {
    name: "Starter",
    price: "49",
    tag: "For solo designers",
    features: ["10 projects / mo", "3D visualization", "Auto quotation", "Email support"],
  },
  {
    name: "Pro",
    highlight: true,
    price: "129",
    tag: "For growing workshops",
    features: [
      "Unlimited projects",
      "Client approval flow",
      "WhatsApp sharing",
      "Workshop documents",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    tag: "For teams & chains",
    features: ["Multi-branch", "Custom materials", "API access", "Dedicated manager"],
  },
];

const Pricing = () => (
  <section id="pricing" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: "var(--font-sans)" }}>
          Pricing
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl">
          Simple plans.{" "}
          <span className="italic text-gradient-gold">Serious results.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Start free. Upgrade the day you win your first client with Khizana.
        </p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col overflow-hidden rounded-2xl border p-6 ${
              t.highlight ? "border-gold bg-warm shadow-glow" : "border-border bg-card/40"
            }`}
          >
            {t.highlight && (
              <div className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary-foreground">
                Popular
              </div>
            )}
            <div className="text-sm text-muted-foreground">{t.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              {t.price === "Custom" ? (
                <span className="font-display text-4xl">Custom</span>
              ) : (
                <>
                  <span className="text-lg text-muted-foreground">$</span>
                  <span className="font-display text-5xl">{t.price}</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </>
              )}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{t.tag}</div>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                t.highlight
                  ? "bg-primary text-primary-foreground hover:scale-[1.02]"
                  : "border border-border text-foreground hover:bg-card/70"
              }`}
            >
              {t.name === "Enterprise" ? "Talk to sales" : "Get started"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   Final CTA
───────────────────────────────────────────────────────── */
const CTA = () => (
  <section id="cta" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-5xl px-6">
      <div className="relative overflow-hidden rounded-3xl border border-gold p-10 text-center md:p-16 shadow-glow">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${textureWarm})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-background/65 backdrop-blur-sm" />
        <div
          className="text-xs uppercase tracking-[0.3em] text-primary"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Start today
        </div>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl md:text-6xl">
          Start designing your
          <br />
          <span className="italic text-gradient-gold">first wardrobe.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
          Join the workshops already turning site visits into signed projects on the same day.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Start Designing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-8 py-4 text-sm backdrop-blur hover:bg-card/70"
          >
            Book a demo
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="relative border-t border-border/60 py-14">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Khizana is the smart design platform for wardrobe workshops, carpentry
            showrooms and fabricators across the UAE and GCC.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary" style={{ fontFamily: "var(--font-sans)" }}>
            Product
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#workflow" className="hover:text-foreground">Workflow</a></li>
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#cta" className="hover:text-foreground">Get started</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary" style={{ fontFamily: "var(--font-sans)" }}>
            Company
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Khizana. All rights reserved. Developed by Zannatul.</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
          Made in the UAE
        </div>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────────────────
   Root Landing Component
───────────────────────────────────────────────────────── */
const Landing = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />

    {/* ── CINEMATIC EXPERIENCE — 8 Scenes ── */}
    <CinematicExperience />

    {/* ── MARKETING CONTENT ── */}
    <main>
      <TransitionStrip />
      <Transformation />
      <Workflow />
      <Features />
      <Trust />
      <Pricing />
      <CTA />
    </main>

    <Footer />
  </div>
);

export default Landing;
