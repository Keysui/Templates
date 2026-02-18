"use client";

import React, { useState, useEffect } from "react";
import {
  Bot, Zap, BarChart2, Shield, Check, ArrowRight,
  Search, Play, Menu, X, Mail, Eye, EyeOff,
  BookOpen, Code2, GitBranch, ChevronRight, Sparkles, Lock,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════
   TEMPLATE: MODERNIST  (Vault — Secure Cloud Data Storage)
   Design system: Slate-950 + Cyan Glow — Enterprise Tech
════════════════════════════════════════════════════════════════════ */

type NavSection = "product" | "pricing" | "docs" | "company" | "login";

/* ─── Keyframes ──────────────────────────────────────────────────── */
const NB_STYLES = `
@keyframes nbFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.nb-fade-up { animation: nbFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.nf-1 { animation-delay: 0.04s; }
.nf-2 { animation-delay: 0.14s; }
.nf-3 { animation-delay: 0.26s; }
.nf-4 { animation-delay: 0.40s; }
.nf-5 { animation-delay: 0.56s; }

@keyframes nbTabIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.nb-tab-in { animation: nbTabIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes nbFloat {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
.nb-float { animation: nbFloat 7s ease-in-out infinite; }

@keyframes nbDot {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.4); }
}
.nb-dot   { animation: nbDot 2s ease-in-out infinite; }
.nb-dot-2 { animation: nbDot 2s ease-in-out 0.5s infinite; }

@keyframes nbScan {
  0%   { top: 0%;   opacity: 0.8; }
  100% { top: 100%; opacity: 0;   }
}
.nb-scan {
  position: absolute; left: 0; right: 0; height: 1px; pointer-events: none;
  background: linear-gradient(90deg, transparent 0%, rgba(0,191,255,0.7) 50%, transparent 100%);
  animation: nbScan 3.5s linear infinite;
}
`;

/* ─── Feature data ───────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon: Shield,
    title: "Encrypted Vaults",
    badge: "Core",
    desc: "Every byte encrypted at rest and in transit with AES-256. Isolated vault namespaces with role-based access, versioning, and immutable audit trails.",
  },
  {
    Icon: Zap,
    title: "Instant Retrieval",
    badge: "Pro",
    desc: "Sub-100ms data access from any region via our global edge network. Retrieve a single record or stream petabytes — latency never scales with volume.",
  },
  {
    Icon: BarChart2,
    title: "Storage Analytics",
    badge: "Analytics",
    desc: "Monitor vault growth, access patterns, bandwidth consumption, and cost allocation in real time across all your buckets, teams, and regions.",
  },
];

/* ─── Pricing tiers ──────────────────────────────────────────────── */
const TIERS = [
  {
    name: "Starter",
    monthly: 29,
    annual: 23,
    desc: "For small teams getting started with secure cloud storage.",
    highlight: false,
    cta: "Start Free Trial",
    features: ["5 Storage Vaults", "1 TB storage", "Basic integrations", "Email support", "99.9% uptime SLA"],
  },
  {
    name: "Pro",
    monthly: 99,
    annual: 79,
    desc: "For growing teams with serious data management needs.",
    highlight: true,
    cta: "Start Free Trial",
    features: [
      "Unlimited Vaults", "50 TB storage", "All integrations",
      "Priority support", "99.99% uptime SLA", "Versioning & snapshots", "Analytics dashboard",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    desc: "For orgs with advanced compliance and scale requirements.",
    highlight: false,
    cta: "Contact Sales",
    features: [
      "Petabyte-scale storage", "Dedicated infrastructure", "Private cloud option",
      "24/7 SLA support", "Custom contracts", "WORM compliance", "SOC 2 + HIPAA + GDPR",
    ],
  },
];

/* ─── Docs data ──────────────────────────────────────────────────── */
const DOCS = [
  { Icon: BookOpen, title: "Getting Started",      desc: "Create your first vault and upload data in under 5 minutes.",      meta: "10 guides"      },
  { Icon: Code2,    title: "API Reference",         desc: "Complete REST, S3-compatible, and gRPC API documentation.",        meta: "API v4.1"       },
  { Icon: GitBranch,title: "Integrations",          desc: "Connect Vault to your existing stack — databases, CDNs, and more.", meta: "150+ connectors"},
  { Icon: Shield,   title: "Security & Compliance", desc: "SOC 2 Type II, GDPR, HIPAA, and WORM compliance documentation.",  meta: "Enterprise"     },
];

/* ─── GlowCard wrapper ───────────────────────────────────────────── */
function GlowCard({
  children,
  highlight = false,
  className = "",
}: {
  children: React.ReactNode;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`p-px rounded-2xl transition-all duration-300 group/card
        ${highlight
          ? "bg-gradient-to-br from-cyan-400/60 via-cyan-400/20 to-transparent"
          : "bg-gradient-to-br from-slate-600/40 via-slate-700/20 to-transparent hover:from-cyan-500/30 hover:via-slate-600/20"
        } ${className}`}
    >
      <div className="rounded-2xl h-full bg-slate-900">
        {children}
      </div>
    </div>
  );
}

/* ─── CheckItem ──────────────────────────────────────────────────── */
function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full bg-cyan-400/15 border border-cyan-400/30
                      flex items-center justify-center flex-shrink-0">
        <Check size={8} className="text-cyan-400" strokeWidth={3} />
      </div>
      <span className="text-sm text-slate-300">{text}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════════ */
export default function TemplateModernist() {
  const [section, setSection]     = useState<NavSection>("product");
  const [sectionKey, setSectionKey] = useState(0);
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [annual, setAnnual]       = useState(false);
  const [showPwd, setShowPwd]     = useState(false);

  const NAV: { id: NavSection; label: string }[] = [
    { id: "product", label: "Product" },
    { id: "pricing", label: "Pricing" },
    { id: "docs",    label: "Docs"    },
    { id: "company", label: "Company" },
    { id: "login",   label: "Login"   },
  ];

  const switchSection = (id: NavSection) => {
    setSection(id);
    setSectionKey((k) => k + 1);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ══════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{NB_STYLES}</style>
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">

        {/* ══ HEADER ══════════════════════════════════════════════════ */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
            ${scrolled
              ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80"
              : "bg-transparent"
            }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-8">

            {/* Logo */}
            <button
              onClick={() => switchSection("product")}
              className="flex items-center gap-2.5 focus:outline-none flex-shrink-0"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600
                              flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Sparkles size={13} className="text-slate-950" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">Vault</span>
            </button>

            {/* Desktop center nav */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {NAV.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => switchSection(id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none
                    ${section === id
                      ? "text-white bg-slate-800"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                    }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Desktop right CTA */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => switchSection("login")}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                Sign in
              </button>
              <button
                onClick={() => switchSection("pricing")}
                className="px-4 py-2 rounded-full text-sm font-bold text-slate-950 bg-cyan-400
                           hover:bg-cyan-300 transition-all duration-200
                           hover:shadow-[0_0_20px_rgba(0,191,255,0.5)] focus:outline-none"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                         text-slate-400 hover:text-white hover:bg-slate-800
                         transition-all duration-200 focus:outline-none"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile panel */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300
              ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="border-t border-slate-800 bg-slate-950 px-6 py-4 flex flex-col gap-1">
              {NAV.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => switchSection(id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200
                    ${section === id
                      ? "text-cyan-400 bg-slate-800"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                >
                  {label}
                </button>
              ))}
              <div className="pt-3 mt-1 border-t border-slate-800">
                <button
                  onClick={() => switchSection("pricing")}
                  className="w-full py-3 rounded-full text-sm font-bold text-slate-950
                             bg-cyan-400 hover:bg-cyan-300 transition-colors duration-200"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ══ SECTIONS ════════════════════════════════════════════════ */}
        <main key={sectionKey} className="nb-tab-in pt-16">

          {/* ── PRODUCT ─────────────────────────────────────────────── */}
          {section === "product" && (
            <>
              {/* Hero */}
              <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
                {/* Background glows */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse 80% 70% at 65% 50%, rgba(0,191,255,0.07) 0%, transparent 65%)",
                }} />
                {/* Dot grid */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }} />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full
                                grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                  {/* Left: copy */}
                  <div>
                    <div className="nb-fade-up nf-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                    bg-cyan-400/10 border border-cyan-400/25
                                    text-xs font-semibold text-cyan-400 mb-8 tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 nb-dot" />
                      Vault 4.0 — Instant Retrieval now in GA
                      <ChevronRight size={11} strokeWidth={2.5} />
                    </div>

                    <h1 className="nb-fade-up nf-2 text-5xl lg:text-6xl xl:text-7xl font-black
                                   text-white leading-[1.05] tracking-tight mb-6">
                      Store, secure,<br />
                      and access your data{" "}
                      <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: "linear-gradient(135deg, #00bfff 0%, #7dd3fc 100%)" }}
                      >
                        at any scale.
                      </span>
                    </h1>

                    <p className="nb-fade-up nf-3 text-lg text-slate-400 max-w-xl leading-relaxed mb-10">
                      Vault gives every team enterprise-grade data storage without the
                      enterprise complexity. Encrypt, organize, and retrieve your data
                      instantly — from a single file to petabyte-scale archives.
                    </p>

                    <div className="nb-fade-up nf-4 flex flex-col sm:flex-row gap-4 mb-12">
                      <button
                        onClick={() => switchSection("pricing")}
                        className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5
                                   rounded-full text-sm font-bold text-slate-950 bg-cyan-400
                                   hover:bg-cyan-300 transition-all duration-200
                                   hover:shadow-[0_0_30px_rgba(0,191,255,0.55),0_0_60px_rgba(0,191,255,0.2)]
                                   focus:outline-none"
                      >
                        Start Free Trial
                        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                      <button
                        className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5
                                   rounded-full text-sm font-semibold text-slate-300
                                   border border-slate-700 hover:border-slate-500 hover:text-white
                                   hover:bg-slate-800/60 transition-all duration-200 focus:outline-none"
                      >
                        <Play size={13} className="text-cyan-400" />
                        View Demo
                      </button>
                    </div>

                    {/* Social proof */}
                    <div className="nb-fade-up nf-5 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {["bg-cyan-500","bg-blue-500","bg-violet-500","bg-emerald-500"].map((bg, i) => (
                          <div
                            key={i}
                            className={`w-7 h-7 rounded-full border-2 border-slate-950 ${bg}
                                        flex items-center justify-center text-[9px] font-bold text-white`}
                          >
                            {["A","B","C","D"][i]}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-slate-500">
                        Trusted by{" "}
                        <span className="text-slate-200 font-semibold">10,000+ businesses worldwide</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Dashboard mockup */}
                  <div className="relative hidden lg:block nb-float">
                    {/* Ambient glow behind card */}
                    <div
                      className="absolute inset-8 rounded-3xl pointer-events-none"
                      style={{
                        background: "radial-gradient(circle, rgba(0,191,255,0.15) 0%, transparent 70%)",
                        filter: "blur(24px)",
                      }}
                    />

                    <div className="relative p-px rounded-2xl bg-gradient-to-br from-cyan-500/30 via-slate-700/20 to-transparent">
                      <div className="relative bg-slate-900/95 rounded-2xl p-7 overflow-hidden">
                        {/* Animated scan line */}
                        <div className="nb-scan" />

                        {/* Dashboard header */}
                        <div className="flex items-start justify-between mb-7">
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1.5">
                              Storage Dashboard
                            </p>
                            <p className="text-3xl font-black text-white tabular-nums">
                              847 TB{" "}
                              <span className="text-slate-500 text-lg font-normal">stored</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                          bg-cyan-400/10 border border-cyan-400/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 nb-dot" />
                            <span className="text-[10px] font-bold text-cyan-400 tracking-wider">
                              FULLY ENCRYPTED
                            </span>
                          </div>
                        </div>

                        {/* Agent rows */}
                        <div className="mb-6 space-y-px">
                          {[
                            { name: "User Records Vault",   uptime: "99.99%", color: "bg-cyan-400"    },
                            { name: "Financial Data",       uptime: "100%",   color: "bg-emerald-400" },
                            { name: "Media Assets",         uptime: "99.9%",  color: "bg-cyan-400"    },
                            { name: "Audit Logs",           uptime: "100%",   color: "bg-emerald-400" },
                            { name: "Dev Backups",          uptime: "99.7%",  color: "bg-cyan-400"    },
                          ].map(({ name, uptime, color }) => (
                            <div
                              key={name}
                              className="flex items-center justify-between py-2.5 px-3 rounded-lg
                                         hover:bg-slate-800/50 transition-colors duration-150 group/row"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color}`} />
                                <span className="text-sm text-slate-300 group-hover/row:text-white transition-colors">
                                  {name}
                                </span>
                              </div>
                              <span className="text-xs font-mono text-slate-500 group-hover/row:text-slate-300 transition-colors">
                                {uptime}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Mini metric cards */}
                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            { label: "Files",    value: "2.4M"  },
                            { label: "Uptime",   value: "99.99%"},
                            { label: "Savings",  value: "$43K"  },
                          ].map(({ label, value }) => (
                            <div
                              key={label}
                              className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3.5 text-center"
                            >
                              <p className="text-sm font-black text-white tabular-nums">{value}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="py-28 relative">
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,191,255,0.04) 0%, transparent 60%)",
                }} />
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-400 mb-4">
                      Platform Capabilities
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
                      Built for scale.{" "}
                      <span className="text-slate-500">Designed for speed.</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                      Everything you need to store, protect, and access your most critical
                      data — with the security and reliability your business demands.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {FEATURES.map(({ Icon, title, badge, desc }) => (
                      <GlowCard key={title}>
                        <div className="p-7 group cursor-default">
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20
                                            flex items-center justify-center
                                            group-hover:bg-cyan-400/20 group-hover:border-cyan-400/40
                                            group-hover:shadow-[0_0_20px_rgba(0,191,255,0.2)]
                                            transition-all duration-300">
                              <Icon size={18} className="text-cyan-400" />
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider
                                             bg-slate-800 border border-slate-700/80 text-slate-400">
                              {badge}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{title}</h3>
                          <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                          <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-400
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Learn more <ChevronRight size={12} />
                          </div>
                        </div>
                      </GlowCard>
                    ))}
                  </div>
                </div>
              </section>

              {/* Metrics */}
              <section className="border-y border-slate-800/60 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/60">
                    {[
                      { value: "60%",     label: "Cost Savings",      sub: "vs. on-premise data infrastructure" },
                      { value: "10×",     label: "Faster Retrieval",   sub: "vs. traditional cold storage tiers" },
                      { value: "99.999%", label: "Data Durability",    sub: "eleven nines, guaranteed by SLA"    },
                    ].map(({ value, label, sub }) => (
                      <div key={label} className="py-10 md:py-0 md:px-12 text-center first:md:pl-0 last:md:pr-0">
                        <p
                          className="text-5xl lg:text-6xl font-black mb-2 tabular-nums bg-clip-text text-transparent"
                          style={{ backgroundImage: "linear-gradient(135deg, #ffffff 30%, #00bfff 100%)" }}
                        >
                          {value}
                        </p>
                        <p className="text-base font-bold text-white mb-1">{label}</p>
                        <p className="text-sm text-slate-500">{sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Final CTA */}
              <section className="py-36 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,191,255,0.07) 0%, transparent 65%)",
                }} />
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }} />
                <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                  bg-cyan-400/10 border border-cyan-400/25
                                  text-xs font-semibold text-cyan-400 mb-8">
                    <Sparkles size={11} />
                    Enterprise-ready. First vault live in minutes.
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.05]">
                    Ready to secure your<br />
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(135deg, #00bfff 0%, #7dd3fc 100%)" }}
                    >
                      data at scale?
                    </span>
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto">
                    Join 10,000+ businesses that trust Vault to protect their most critical
                    data. Start free. Scale when you&apos;re ready.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => switchSection("pricing")}
                      className="group inline-flex items-center justify-center gap-2.5 px-8 py-4
                                 rounded-full text-sm font-bold text-slate-950 bg-cyan-400
                                 hover:bg-cyan-300 transition-all duration-200
                                 hover:shadow-[0_0_40px_rgba(0,191,255,0.6),0_0_80px_rgba(0,191,255,0.2)]
                                 focus:outline-none"
                    >
                      Start Free Trial
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 px-8 py-4
                                 rounded-full text-sm font-semibold text-slate-300
                                 border border-slate-700 hover:border-slate-500 hover:text-white
                                 hover:bg-slate-800/60 transition-all duration-200 focus:outline-none"
                    >
                      Talk to Sales
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ── PRICING ─────────────────────────────────────────────── */}
          {section === "pricing" && (
            <section className="min-h-[calc(100vh-4rem)] py-24">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-14">
                  <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-400 mb-4">Pricing</p>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
                    Simple, transparent pricing.
                  </h2>
                  <p className="text-slate-400 text-lg max-w-lg mx-auto mb-8">
                    No hidden fees. No per-GB surprises. Just enterprise-grade secure storage
                    at a price that scales with you.
                  </p>

                  {/* Monthly / Annual toggle */}
                  <div className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-full p-1">
                    <button
                      onClick={() => setAnnual(false)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
                        ${!annual ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setAnnual(true)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
                                  flex items-center gap-2
                        ${annual ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}
                    >
                      Annual
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold
                                       bg-cyan-400/20 text-cyan-400 border border-cyan-400/30">
                        SAVE 20%
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                  {TIERS.map(({ name, monthly, annual: annualPrice, desc, highlight, cta, features }) => (
                    <GlowCard key={name} highlight={highlight}>
                      <div className="p-8 h-full flex flex-col">
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-base font-bold text-white">{name}</p>
                            {highlight && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold
                                               text-slate-950 bg-cyan-400 tracking-wide">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm mb-6">{desc}</p>
                          <div className="flex items-end gap-1.5">
                            {monthly ? (
                              <>
                                <span className="text-4xl font-black text-white tabular-nums">
                                  ${annual ? annualPrice : monthly}
                                </span>
                                <span className="text-slate-500 pb-1">/mo</span>
                              </>
                            ) : (
                              <span className="text-4xl font-black text-white">Custom</span>
                            )}
                          </div>
                          {monthly && annual && (
                            <p className="text-xs text-cyan-400 font-medium mt-1">Billed annually</p>
                          )}
                        </div>

                        <div className="space-y-3 mb-8 flex-1">
                          {features.map((f) => <CheckItem key={f} text={f} />)}
                        </div>

                        <button
                          className={`w-full py-3 rounded-full text-sm font-bold transition-all duration-200 focus:outline-none
                            ${highlight
                              ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,191,255,0.4)]"
                              : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white hover:bg-slate-800/60"
                            }`}
                        >
                          {cta}
                        </button>
                      </div>
                    </GlowCard>
                  ))}
                </div>

                {/* Enterprise note */}
                <div className="p-6 rounded-2xl border border-slate-800/60 bg-slate-900/40
                                flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold mb-1">Need a custom solution?</p>
                    <p className="text-slate-400 text-sm">
                      Our team will build a plan around your specific needs, volume, and compliance requirements.
                    </p>
                  </div>
                  <button className="flex-shrink-0 px-6 py-3 rounded-full text-sm font-bold
                                     text-slate-950 bg-cyan-400 hover:bg-cyan-300
                                     transition-colors duration-200 focus:outline-none">
                    Talk to Sales
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── DOCS ────────────────────────────────────────────────── */}
          {section === "docs" && (
            <section className="min-h-[calc(100vh-4rem)] py-24">
              <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <div className="mb-14">
                  <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-400 mb-4">
                    Documentation
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
                    Everything you need to build.
                  </h2>
                  <p className="text-slate-400 text-lg max-w-lg mb-8">
                    Comprehensive guides, API references, and integration docs for every
                    part of the Vault platform.
                  </p>

                  {/* Search */}
                  <div className="relative max-w-xl">
                    <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search documentation..."
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-700/80 rounded-xl
                                 text-sm text-slate-200 placeholder:text-slate-600
                                 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30
                                 hover:border-slate-600 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Doc sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {DOCS.map(({ Icon, title, desc, meta }) => (
                    <GlowCard key={title}>
                      <div className="p-6 flex items-start gap-5 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20
                                        flex items-center justify-center flex-shrink-0
                                        group-hover:bg-cyan-400/20 group-hover:border-cyan-400/40
                                        transition-all duration-200">
                          <Icon size={16} className="text-cyan-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-sm font-bold text-white">{title}</p>
                            <span className="text-[10px] font-semibold text-slate-500
                                             bg-slate-800 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                              {meta}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    </GlowCard>
                  ))}
                </div>

                {/* Popular articles */}
                <div className="p-7 rounded-2xl border border-slate-800/60 bg-slate-900/40">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-5">
                    Popular Articles
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8">
                    {[
                      "Quickstart: Upload to your first vault",
                      "Connecting your database and S3-compatible buckets",
                      "Understanding encryption and key management",
                      "Setting up automated backup schedules",
                      "Authentication & API keys",
                      "Storage limits and quotas explained",
                    ].map((item) => (
                      <button
                        key={item}
                        className="flex items-center gap-2 text-sm text-slate-400
                                   hover:text-cyan-400 transition-colors duration-150 text-left"
                      >
                        <ChevronRight size={12} className="text-slate-700 flex-shrink-0" />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── LOGIN ───────────────────────────────────────────────── */}
          {section === "login" && (
            <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24">
              <div className="w-full max-w-sm mx-auto px-6">

                {/* Logo / heading */}
                <div className="text-center mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600
                                  flex items-center justify-center mx-auto mb-5
                                  shadow-lg shadow-cyan-500/30">
                    <Sparkles size={20} className="text-slate-950" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Welcome back</h2>
                  <p className="text-slate-500 text-sm">Sign in to your Vault account</p>
                </div>

                <GlowCard>
                  <form className="p-7 space-y-5" onSubmit={(e) => e.preventDefault()}>

                    {/* Google */}
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
                                 border border-slate-700 text-sm font-semibold text-slate-300
                                 hover:bg-slate-800 hover:text-white hover:border-slate-600
                                 transition-all duration-200 focus:outline-none"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" className="flex-shrink-0">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-slate-800" />
                      <span className="text-xs text-slate-600">or continue with email</span>
                      <div className="flex-1 h-px bg-slate-800" />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="you@company.com"
                          className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl
                                     text-sm text-slate-200 placeholder:text-slate-600
                                     focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30
                                     hover:border-slate-600 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          Password
                        </label>
                        <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors duration-150">
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                        <input
                          type={showPwd ? "text" : "password"}
                          placeholder="••••••••••"
                          className="w-full pl-10 pr-11 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl
                                     text-sm text-slate-200 placeholder:text-slate-600
                                     focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30
                                     hover:border-slate-600 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwd((v) => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2
                                     text-slate-600 hover:text-slate-300 transition-colors duration-150 focus:outline-none"
                        >
                          {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400
                                 hover:bg-cyan-300 transition-all duration-200
                                 hover:shadow-[0_0_20px_rgba(0,191,255,0.4)] focus:outline-none"
                    >
                      Sign In
                    </button>

                    <p className="text-center text-xs text-slate-600">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchSection("pricing")}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-150"
                      >
                        Start free trial
                      </button>
                    </p>
                  </form>
                </GlowCard>
              </div>
            </section>
          )}

          {/* ── COMPANY ─────────────────────────────────────────────── */}
          {section === "company" && (
            <section className="min-h-[calc(100vh-4rem)] py-24">
              <div className="max-w-5xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="mb-20">
                  <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-400 mb-4">Company</p>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
                    Your data should be safe,{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(135deg, #00bfff 0%, #7dd3fc 100%)" }}
                    >
                      fast, and always yours.
                    </span>
                  </h2>
                  <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                    Vault was founded in 2021 to make enterprise-grade secure cloud storage
                    accessible to every team — not just the Fortune 500.
                  </p>
                </div>

                {/* Mission + Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
                  {[
                    {
                      label: "Our Mission",
                      body: "Give every team a single, trustworthy place to store, protect, and retrieve their data — without the complexity of managing infrastructure.",
                    },
                    {
                      label: "Our Approach",
                      body: "We build deliberate, focused tooling — not feature-bloated platforms. Every capability ships because it genuinely moves the needle for the teams we serve.",
                    },
                    {
                      label: "Our Commitment",
                      body: "99.99% uptime, transparent pricing, no vendor lock-in, and a support team that actually picks up the phone.",
                    },
                  ].map(({ label, body }) => (
                    <GlowCard key={label}>
                      <div className="p-7">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-4">{label}</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{body}</p>
                      </div>
                    </GlowCard>
                  ))}
                </div>

                {/* Team */}
                <div className="mb-16">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8">Leadership</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Arjun Mehta",    role: "Co-founder & CEO",  color: "from-cyan-500 to-blue-600"    },
                      { name: "Sofia Reyes",    role: "Co-founder & CTO",  color: "from-violet-500 to-purple-600" },
                      { name: "Daniel Park",    role: "VP Engineering",    color: "from-emerald-500 to-teal-600"  },
                      { name: "Priya Nair",     role: "VP Product",        color: "from-amber-500 to-orange-600"  },
                    ].map(({ name, role, color }) => (
                      <GlowCard key={name}>
                        <div className="p-5 text-center">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color}
                                           flex items-center justify-center mx-auto mb-4 text-lg font-black text-white`}>
                            {name.charAt(0)}
                          </div>
                          <p className="text-sm font-bold text-white mb-1">{name}</p>
                          <p className="text-xs text-slate-500">{role}</p>
                        </div>
                      </GlowCard>
                    ))}
                  </div>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
                  {[
                    { value: "2021",   label: "Founded"         },
                    { value: "64",     label: "Team members"    },
                    { value: "$42M",   label: "Series B raised" },
                    { value: "18",     label: "Countries served"},
                  ].map(({ value, label }) => (
                    <div key={label} className="p-5 rounded-2xl border border-slate-800/60 bg-slate-900/40 text-center">
                      <p
                        className="text-3xl font-black tabular-nums bg-clip-text text-transparent mb-1"
                        style={{ backgroundImage: "linear-gradient(135deg, #ffffff 30%, #00bfff 100%)" }}
                      >
                        {value}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Careers CTA */}
                <div className="p-8 rounded-2xl border border-slate-800/60 bg-slate-900/40
                                flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-white font-bold text-lg mb-2">We&apos;re hiring.</p>
                    <p className="text-slate-400 text-sm max-w-sm">
                      Join a remote-first team building the future of secure cloud storage.
                      Open roles in engineering, design, and go-to-market.
                    </p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => switchSection("docs")}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-300
                                 border border-slate-700 hover:border-slate-500 hover:text-white
                                 hover:bg-slate-800/60 transition-all duration-200 focus:outline-none"
                    >
                      Read the Blog
                    </button>
                    <button
                      className="px-5 py-2.5 rounded-full text-sm font-bold text-slate-950 bg-cyan-400
                                 hover:bg-cyan-300 transition-all duration-200
                                 hover:shadow-[0_0_20px_rgba(0,191,255,0.4)] focus:outline-none"
                    >
                      View Open Roles
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* ══ FOOTER ══════════════════════════════════════════════════ */}
        <footer className="border-t border-slate-800/60 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-14">

              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600
                                  flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Sparkles size={13} className="text-slate-950" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold text-white">Vault</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                  Enterprise-grade secure cloud data storage for teams of any size.
                  Trusted by 10,000+ businesses worldwide.
                </p>
              </div>

              {/* Product */}
              <div>
                <button
                  onClick={() => switchSection("product")}
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-500
                             hover:text-cyan-400 transition-colors duration-150 mb-5 block"
                >
                  Product
                </button>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Features",     dest: "product" as NavSection },
                    { label: "Integrations", dest: "docs"    as NavSection },
                    { label: "Changelog",    dest: "product" as NavSection },
                    { label: "Roadmap",      dest: "product" as NavSection },
                  ].map(({ label, dest }) => (
                    <li key={label}>
                      <button
                        onClick={() => switchSection(dest)}
                        className="text-slate-500 hover:text-slate-100 transition-colors duration-150"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <button
                  onClick={() => switchSection("company")}
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-500
                             hover:text-cyan-400 transition-colors duration-150 mb-5 block"
                >
                  Company
                </button>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "About",    dest: "company" as NavSection },
                    { label: "Blog",     dest: "docs"    as NavSection },
                    { label: "Careers",  dest: "company" as NavSection },
                    { label: "Press",    dest: "company" as NavSection },
                  ].map(({ label, dest }) => (
                    <li key={label}>
                      <button
                        onClick={() => switchSection(dest)}
                        className="text-slate-500 hover:text-slate-100 transition-colors duration-150"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <button
                  onClick={() => switchSection("docs")}
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-500
                             hover:text-cyan-400 transition-colors duration-150 mb-5 block"
                >
                  Legal
                </button>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Privacy",  dest: "docs" as NavSection },
                    { label: "Terms",    dest: "docs" as NavSection },
                    { label: "Security", dest: "docs" as NavSection },
                    { label: "Cookies",  dest: "docs" as NavSection },
                  ].map(({ label, dest }) => (
                    <li key={label}>
                      <button
                        onClick={() => switchSection(dest)}
                        className="text-slate-500 hover:text-slate-100 transition-colors duration-150"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row
                            items-center justify-between gap-4">
              <p className="text-xs text-slate-600">
                &copy; {new Date().getFullYear()} Vault, Inc. All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 nb-dot" />
                <span className="text-xs text-slate-500">All systems operational</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
