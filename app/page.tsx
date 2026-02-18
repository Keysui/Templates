"use client";

import TemplateAesthetic from "./TemplateAesthetic";
import TemplateModernist from "./TemplateModernist";
import {
  Scale, ShieldCheck, Gavel, Menu, X, ArrowRight,
  Building2, Lock, Globe, CheckCircle2, MapPin, Phone, Mail, Clock,
  Thermometer, Wind, Wrench, Star, Zap, AlertTriangle, Settings, Home as HomeIcon,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

/* ════════════════════════════════════════════════════════════════════
   TEMPLATE: PROFESSIONAL  (Law Firm / B2B)
════════════════════════════════════════════════════════════════════ */

/* ─── Types ──────────────────────────────────────────────────────── */
type Tab = "home" | "about" | "services" | "contact";

/* ─── Keyframes (no external CSS) ───────────────────────────────── */
const STYLES = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up   { animation: fadeUp 0.6s ease-out both; }
.fu-1 { animation-delay: 0.04s; }
.fu-2 { animation-delay: 0.14s; }
.fu-3 { animation-delay: 0.24s; }
.fu-4 { animation-delay: 0.34s; }

@keyframes tabEnter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tab-enter { animation: tabEnter 0.28s ease-out both; }

@keyframes statPop {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
}
.stat-pop   { animation: statPop 0.45s ease-out both; }
.sp-1 { animation-delay: 0.05s; }
.sp-2 { animation-delay: 0.15s; }
.sp-3 { animation-delay: 0.25s; }
`;

/* ─── Palette constants ──────────────────────────────────────────── */
const EM7  = "#047857";
const EM7A = "rgba(4,120,87,0.08)";
const EM7B = "rgba(4,120,87,0.22)";

/* ─── useInView ──────────────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── IconTray ───────────────────────────────────────────────────── */
function IconTray({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 flex-shrink-0 bg-emerald-50">
      {children}
    </div>
  );
}

/* ─── PrimaryBtn ─────────────────────────────────────────────────── */
function PrimaryBtn({
  children,
  onClick,
  type = "button",
  full = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  full?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full
                  text-sm font-semibold text-white shadow-sm
                  bg-emerald-700 hover:bg-emerald-600
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600
                  ${full ? "w-full py-3.5 text-base" : ""}`}
    >
      {children}
      <ArrowRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </button>
  );
}

/* ─── Card ───────────────────────────────────────────────────────── */
function Card({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div
      className="group p-7 border border-neutral-200 rounded-2xl bg-white cursor-default
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-md hover:border-neutral-300"
    >
      <IconTray>{icon}</IconTray>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2.5 tracking-tight">
        {title}
      </h3>
      <p className="text-neutral-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

/* ─── FormField ──────────────────────────────────────────────────── */
function FormField({
  label,
  type = "text",
  placeholder,
  rows,
}: {
  label: string;
  type?: string;
  placeholder: string;
  rows?: number;
}) {
  const cls =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-white " +
    "placeholder:text-neutral-400 transition-all duration-300 hover:border-neutral-300 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent";

  return (
    <div>
      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {rows ? (
        <textarea rows={rows} placeholder={placeholder} className={`${cls} resize-none`} />
      ) : (
        <input type={type} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

/* ─── TrustStats ─────────────────────────────────────────────────── */
function TrustStats() {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          {[
            { value: "25+",    label: "Years Experience",  cls: "sp-1" },
            { value: "1,200+", label: "Clients Served",    cls: "sp-2" },
            { value: "98%",    label: "Case Success Rate", cls: "sp-3" },
          ].map(({ value, label, cls }) => (
            <div key={label} className={inView ? `stat-pop ${cls}` : "opacity-0"}>
              <p className="text-5xl md:text-6xl font-bold mb-3 tabular-nums text-emerald-700">
                {value}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TemplateProfessional ───────────────────────────────────────── */
function TemplateProfessional() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [tabKey, setTabKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement>>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const TABS: { id: Tab; label: string }[] = [
    { id: "home",     label: "Home" },
    { id: "about",    label: "About" },
    { id: "services", label: "Services" },
    { id: "contact",  label: "Contact" },
  ];

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current[activeTab];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - navRect.left, width: btnRect.width });
  }, [activeTab]);

  useEffect(() => { updateIndicator(); }, [updateIndicator]);
  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setTabKey((k) => k + 1);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <style>{STYLES}</style>
      <div className="min-h-screen bg-white text-neutral-800 antialiased">

        {/* ══ HEADER ════════════════════════════════════════════════ */}
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ease-out
            ${scrolled
              ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-200/70"
              : "bg-white border-b border-neutral-200"
            }`}
        >
          <div
            className={`max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between transition-all duration-300
              ${scrolled ? "h-16" : "h-20"}`}
          >
            <button
              onClick={() => switchTab("home")}
              className="text-xl font-semibold tracking-tight text-neutral-900 hover:opacity-70
                         transition-opacity duration-200 select-none focus:outline-none"
            >
              Vanguard Legal
            </button>

            <div ref={navRef} className="hidden md:flex items-center relative">
              <span
                className="absolute bottom-0 h-[2px] rounded-full transition-all duration-300 ease-out pointer-events-none bg-emerald-700"
                style={{ left: indicator.left, width: indicator.width }}
              />
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  ref={(el) => { if (el) tabRefs.current[id] = el; }}
                  onClick={() => switchTab(id)}
                  className={`relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                    focus:outline-none
                    ${activeTab === id
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => switchTab("contact")}
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                           text-sm font-semibold text-white shadow-sm
                           bg-emerald-700 hover:bg-emerald-600
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                Request Consultation
                <ArrowRight size={14} />
              </button>

              <button
                className="md:hidden relative flex items-center justify-center w-9 h-9 rounded-lg
                           text-neutral-700 hover:bg-neutral-100 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-neutral-200"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className={`absolute transition-all duration-200 ${mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                  <X size={20} />
                </span>
                <span className={`absolute transition-all duration-200 ${mobileMenuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
                  <Menu size={20} />
                </span>
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-out
              ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="border-t border-neutral-100 bg-white/95 backdrop-blur-sm px-4 py-4 flex flex-col gap-1">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => switchTab(id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-150
                    ${activeTab === id
                      ? "font-semibold"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                  style={activeTab === id ? { color: EM7, backgroundColor: EM7A } : {}}
                >
                  {label}
                </button>
              ))}
              <div className="pt-3 mt-1 border-t border-neutral-100">
                <button
                  onClick={() => switchTab("contact")}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full
                             text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600
                             transition-colors duration-300"
                >
                  Request Consultation <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ══ TAB PANELS ════════════════════════════════════════════ */}
        <main key={tabKey} className="tab-enter">

          {/* ── HOME ──────────────────────────────────────────────── */}
          {activeTab === "home" && (
            <>
              <section className="pt-28 pb-32 md:pt-36 md:pb-40 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                  <p
                    className="fade-up fu-1 inline-flex items-center gap-2 text-xs font-bold
                               tracking-widest uppercase mb-7 px-3.5 py-1.5 rounded-full border"
                    style={{ color: EM7, borderColor: EM7B, backgroundColor: EM7A }}
                  >
                    Trusted Counsel — Since 1998
                  </p>

                  <h1
                    className="fade-up fu-2 font-serif text-5xl md:text-6xl lg:text-7xl font-bold
                               text-neutral-900 leading-[1.07] tracking-tight mb-7 max-w-3xl mx-auto"
                  >
                    Modern Defense for a Digital Age.
                  </h1>

                  <p className="fade-up fu-3 text-lg md:text-xl text-neutral-600 max-w-xl mx-auto leading-relaxed mb-12">
                    Vanguard Legal Group delivers senior-level legal strategy to
                    businesses and individuals navigating complex corporate, privacy,
                    and litigation challenges. When the stakes are high, experience
                    matters.
                  </p>

                  <div className="fade-up fu-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <PrimaryBtn onClick={() => switchTab("contact")}>
                      Schedule a Consultation
                    </PrimaryBtn>
                    <button
                      onClick={() => switchTab("services")}
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-full
                                 text-base font-semibold text-emerald-700 border border-emerald-700 bg-white
                                 hover:bg-emerald-50 transition-all duration-300
                                 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                    >
                      View Practice Areas
                    </button>
                  </div>
                </div>
              </section>

              <section className="py-24 bg-white border-t border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <p className="text-xs font-bold tracking-widest uppercase mb-3 text-emerald-700">
                      What We Do
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                      Practice Areas
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <Card
                      icon={<Scale size={20} className="text-emerald-700" />}
                      title="Corporate Law"
                      body="From entity formation and M&A transactions to board governance and regulatory compliance, we guide companies through every stage of their corporate lifecycle with precision and discretion."
                    />
                    <Card
                      icon={<ShieldCheck size={20} className="text-emerald-700" />}
                      title="Digital Privacy"
                      body="In an era of evolving data regulations, we protect your business and personal data interests — advising on GDPR, CCPA, breach response, and the legal architecture of digital products."
                    />
                    <Card
                      icon={<Gavel size={20} className="text-emerald-700" />}
                      title="Litigation Strategy"
                      body="Our seasoned trial attorneys bring meticulous preparation and courtroom authority to disputes involving contracts, IP, employment, and high-value commercial claims."
                    />
                  </div>
                </div>
              </section>

              <TrustStats />
            </>
          )}

          {/* ── ABOUT ─────────────────────────────────────────────── */}
          {activeTab === "about" && (
            <section className="py-24 bg-white">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="mb-16">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-emerald-700">
                    Our Story
                  </p>
                  <h2
                    className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900
                               leading-[1.1] tracking-tight max-w-2xl"
                  >
                    Built on integrity. Sustained by results.
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-6">
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      Vanguard Legal Group was founded in 1998 with a singular
                      conviction: that every client deserves the same level of
                      rigorous, senior-led counsel once reserved only for the
                      largest corporations.
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                      Over 25 years, we have grown into one of New York's most
                      respected boutique firms — trusted by Fortune 500 companies,
                      fast-growth startups, and high-profile individuals who demand
                      discretion and results in equal measure.
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                      We don't believe in large teams diluting attention. Every
                      matter at Vanguard is handled by a named partner who remains
                      directly accountable from intake to resolution.
                    </p>
                    <div className="pt-4">
                      <PrimaryBtn onClick={() => switchTab("contact")}>
                        Speak with a Partner
                      </PrimaryBtn>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Partner-Led Engagements",
                        body: "Every client works directly with a named senior partner — not associates or paralegals acting as intermediaries.",
                      },
                      {
                        title: "Cross-Disciplinary Teams",
                        body: "Our attorneys hold dual expertise in law and technology, giving us a decisive edge in digital-era disputes and transactions.",
                      },
                      {
                        title: "Global Reach, Local Precision",
                        body: "With partner relationships across 30 jurisdictions, we extend our clients' legal coverage without sacrificing ground-level responsiveness.",
                      },
                    ].map(({ title, body }) => (
                      <div
                        key={title}
                        className="flex gap-4 p-6 border border-neutral-200 rounded-2xl
                                   hover:border-neutral-300 hover:shadow-md transition-all duration-300"
                      >
                        <CheckCircle2
                          size={20}
                          className="flex-shrink-0 mt-0.5 text-emerald-700"
                        />
                        <div>
                          <p className="font-semibold text-neutral-900 mb-1 tracking-tight">
                            {title}
                          </p>
                          <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── SERVICES ──────────────────────────────────────────── */}
          {activeTab === "services" && (
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-emerald-700">
                    What We Offer
                  </p>
                  <h2
                    className="font-serif text-4xl md:text-5xl font-bold text-neutral-900
                               tracking-tight mb-4"
                  >
                    Full-Spectrum Legal Services
                  </h2>
                  <p className="text-neutral-600 text-lg max-w-xl mx-auto leading-relaxed">
                    End-to-end coverage for every legal challenge your business
                    may face — from corporate formation to courtroom defense.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card
                    icon={<Scale size={20} className="text-emerald-700" />}
                    title="Corporate Law"
                    body="Entity formation, M&A advisory, board governance, shareholder agreements, and regulatory compliance across multiple jurisdictions."
                  />
                  <Card
                    icon={<ShieldCheck size={20} className="text-emerald-700" />}
                    title="Digital Privacy & Data"
                    body="GDPR, CCPA, and global privacy framework compliance. Data breach response, DPO advisory, and privacy-by-design architecture."
                  />
                  <Card
                    icon={<Gavel size={20} className="text-emerald-700" />}
                    title="Commercial Litigation"
                    body="High-stakes dispute resolution in contract, IP, employment, and fraud matters. Trial-tested attorneys with consistent track records."
                  />
                  <Card
                    icon={<Building2 size={20} className="text-emerald-700" />}
                    title="Real Estate & Finance"
                    body="Commercial real estate transactions, financing structures, REIT compliance, and development agreements from term sheet to closing."
                  />
                  <Card
                    icon={<Lock size={20} className="text-emerald-700" />}
                    title="Cybersecurity Law"
                    body="Legal frameworks for incident response, regulatory reporting obligations, vendor risk management, and cyber insurance coverage disputes."
                  />
                  <Card
                    icon={<Globe size={20} className="text-emerald-700" />}
                    title="International Counsel"
                    body="Cross-border transaction structuring, foreign investment review, trade compliance, and multi-jurisdictional dispute coordination."
                  />
                </div>

                <div className="mt-16 text-center">
                  <PrimaryBtn onClick={() => switchTab("contact")}>
                    Schedule a Consultation
                  </PrimaryBtn>
                </div>
              </div>
            </section>
          )}

          {/* ── CONTACT ───────────────────────────────────────────── */}
          {activeTab === "contact" && (
            <section className="py-24 bg-white">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="mb-14">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-emerald-700">
                    Get in Touch
                  </p>
                  <h2
                    className="font-serif text-4xl md:text-5xl font-bold text-neutral-900
                               tracking-tight"
                  >
                    Let's discuss your matter.
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                  <div className="lg:col-span-2 space-y-8">
                    <p className="text-neutral-600 leading-relaxed text-base">
                      All initial consultations are conducted by a senior partner.
                      We respond to every inquiry within one business day.
                    </p>

                    <div className="space-y-5">
                      {[
                        {
                          icon: <MapPin size={15} className="text-emerald-700" />,
                          label: "Office",
                          value: "1200 Avenue of the Americas\nNew York, NY 10036",
                        },
                        {
                          icon: <Phone size={15} className="text-emerald-700" />,
                          label: "Phone",
                          value: "+1 (212) 555-0191",
                        },
                        {
                          icon: <Mail size={15} className="text-emerald-700" />,
                          label: "Email",
                          value: "counsel@vanguardlegal.com",
                        },
                        {
                          icon: <Clock size={15} className="text-emerald-700" />,
                          label: "Hours",
                          value: "Mon–Fri, 8:00 AM – 7:00 PM ET",
                        },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 bg-emerald-50">
                            {icon}
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
                              {label}
                            </p>
                            <p className="text-sm text-neutral-700 whitespace-pre-line leading-relaxed">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form
                    className="lg:col-span-3 space-y-5"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="First Name" placeholder="Jane" />
                      <FormField label="Last Name" placeholder="Smith" />
                    </div>
                    <FormField
                      label="Email Address"
                      type="email"
                      placeholder="jane@company.com"
                    />
                    <FormField
                      label="Phone (Optional)"
                      type="tel"
                      placeholder="+1 (212) 000-0000"
                    />

                    <div>
                      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                        Matter Type
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm
                                   text-neutral-900 bg-white transition-all duration-300
                                   hover:border-neutral-300 appearance-none
                                   focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      >
                        <option value="">Select a practice area...</option>
                        <option>Corporate Law</option>
                        <option>Digital Privacy &amp; Data</option>
                        <option>Commercial Litigation</option>
                        <option>Real Estate &amp; Finance</option>
                        <option>Cybersecurity Law</option>
                        <option>International Counsel</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <FormField
                      label="Brief Description"
                      placeholder="Please describe your legal matter in a few sentences..."
                      rows={5}
                    />

                    <div className="pt-1">
                      <PrimaryBtn type="submit" full>
                        Submit Inquiry
                      </PrimaryBtn>
                      <p className="text-center text-xs text-neutral-400 mt-3">
                        Confidential. Protected by attorney-client privilege.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* ══ FOOTER ════════════════════════════════════════════════ */}
        <footer className="bg-neutral-900 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
              <div>
                <p className="text-base font-semibold mb-4 tracking-tight text-neutral-100">
                  Vanguard Legal Group
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                  A premier legal advisory firm delivering rigorous counsel across
                  corporate, privacy, and litigation matters since 1998.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-5">
                  Practice Areas
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    "Corporate Law",
                    "Digital Privacy",
                    "Litigation Strategy",
                    "Regulatory Compliance",
                  ].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => switchTab("services")}
                        className="text-neutral-400 hover:text-neutral-100
                                   transition-colors duration-200 inline-block"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-5">
                  Contact
                </p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li>1200 Avenue of the Americas</li>
                  <li>New York, NY 10036</li>
                  <li>
                    <a
                      href="tel:+12125550191"
                      className="hover:text-neutral-100 transition-colors duration-200"
                    >
                      +1 (212) 555-0191
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:counsel@vanguardlegal.com"
                      className="hover:text-neutral-100 transition-colors duration-200"
                    >
                      counsel@vanguardlegal.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
              <p>
                &copy; {new Date().getFullYear()} Vanguard Legal Group. All rights reserved.
              </p>
              <div className="flex gap-6">
                <button className="hover:text-neutral-400 transition-colors duration-200">
                  Privacy Policy
                </button>
                <button className="hover:text-neutral-400 transition-colors duration-200">
                  Terms of Use
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TEMPLATE: ARTISAN  (HVAC / Home Services — Elite Air & Heat)
   Color system: Black + Red — Bold, dominant, high-authority
════════════════════════════════════════════════════════════════════ */

/* ─── Types ──────────────────────────────────────────────────────── */
type HvacTab = "home" | "services" | "reviews" | "contact";
type ServiceCategory = "ac-install" | "heating-repair" | "emergency" | "air-quality";

/* ─── Keyframes ──────────────────────────────────────────────────── */
const HVAC_STYLES = `
@keyframes hvacFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hvac-fade-up { animation: hvacFadeUp 0.6s ease-out both; }
.hfu-1 { animation-delay: 0.04s; }
.hfu-2 { animation-delay: 0.16s; }
.hfu-3 { animation-delay: 0.28s; }
.hfu-4 { animation-delay: 0.40s; }

@keyframes hvacTabEnter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hvac-tab-enter { animation: hvacTabEnter 0.3s ease-out both; }

@keyframes hvacPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(220,38,38,0); }
}
.a-emergency-pulse { animation: hvacPulse 2.2s ease-in-out infinite; }

@keyframes svcEnter {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.svc-enter { animation: svcEnter 0.3s ease-out both; }
`;

/* ─── Dark Service Card ──────────────────────────────────────────── */
function HvacCard({
  icon,
  title,
  body,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  badge?: string;
}) {
  return (
    <div
      className="relative group p-7 border border-neutral-800 rounded-2xl bg-neutral-900
                 cursor-default transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-red-600 hover:shadow-lg hover:shadow-red-950/30"
    >
      {badge && (
        <span
          className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest
                     px-2.5 py-1 rounded-full bg-red-600 text-white"
        >
          {badge}
        </span>
      )}
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5
                   bg-neutral-800 group-hover:bg-red-600/10 transition-colors duration-300"
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-100 mb-2.5 tracking-tight">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

/* ─── Dark Review Card ───────────────────────────────────────────── */
function ReviewCard({
  name,
  location,
  rating,
  date,
  body,
}: {
  name: string;
  location: string;
  rating: number;
  date: string;
  body: string;
}) {
  return (
    <div
      className="p-7 border border-neutral-800 rounded-2xl bg-neutral-900
                 hover:border-red-600 hover:shadow-lg hover:shadow-red-950/20
                 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-neutral-100 tracking-tight">{name}</p>
          <p className="text-xs text-neutral-500 mt-0.5">{location}</p>
        </div>
        <span className="text-xs text-neutral-600">{date}</span>
      </div>
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? "text-red-500 fill-red-500" : "text-neutral-700 fill-neutral-700"}
          />
        ))}
      </div>
      <p className="text-sm text-neutral-400 leading-relaxed">{body}</p>
    </div>
  );
}

/* ─── Partner Logos Strip ────────────────────────────────────────── */
function PartnerLogos({ onContact }: { onContact: () => void }) {
  const brands = ["Carrier", "Trane", "Lennox", "Rheem"];
  return (
    <section className="py-14 border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral-600 mb-10">
          Authorized Dealer & Service Partner
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="group flex items-center justify-center px-6 py-5 border border-neutral-800
                         rounded-xl bg-neutral-900 cursor-default
                         hover:border-red-600 hover:bg-neutral-800
                         transition-all duration-300"
            >
              <span
                className="text-lg font-bold tracking-tight text-neutral-500
                           group-hover:text-neutral-200 transition-colors duration-300"
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TemplateArtisan ────────────────────────────────────────────── */
function TemplateArtisan() {
  const [activeTab, setActiveTab] = useState<HvacTab>("home");
  const [tabKey, setTabKey]       = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  /* ── Nested service sub-tabs ── */
  const [serviceTab, setServiceTab] = useState<ServiceCategory>("ac-install");
  const [serviceKey, setServiceKey] = useState(0);
  const switchServiceTab = (cat: ServiceCategory) => {
    setServiceTab(cat);
    setServiceKey((k) => k + 1);
  };

  type SvcItem = {
    heading: string;
    description: string;
    bullets: { icon: React.ReactNode; text: string }[];
    pricing: { label: string; value: string }[];
    cta: string;
    emergency?: boolean;
  };

  const SVC_CATS: { id: ServiceCategory; label: string; icon: React.ReactNode }[] = [
    { id: "ac-install",     label: "AC Installation",   icon: <Wind size={15} />          },
    { id: "heating-repair", label: "Heating Repair",    icon: <Thermometer size={15} />   },
    { id: "emergency",      label: "Emergency Service", icon: <AlertTriangle size={15} /> },
    { id: "air-quality",    label: "Air Quality",       icon: <HomeIcon size={15} />      },
  ];

  const SVC_DATA: Record<ServiceCategory, SvcItem> = {
    "ac-install": {
      heading: "AC System Installation",
      description: "Complete central air, mini-split, and ductless system design and installation by NATE-certified technicians. Properly sized for your space — right the first time, every time.",
      bullets: [
        { icon: <Zap size={15} className="text-red-600" />,           text: "Free in-home load calculation and system sizing assessment" },
        { icon: <ShieldCheck size={15} className="text-red-600" />,    text: "All major brands: Carrier, Trane, Lennox, and Rheem" },
        { icon: <Star size={15} className="text-red-600 fill-red-600" />, text: "10-year parts warranty + 2-year labor guarantee included" },
      ],
      pricing: [
        { label: "Systems Starting At", value: "$2,800" },
        { label: "Financing From",      value: "$89/mo" },
      ],
      cta: "Get Free Installation Quote",
    },
    "heating-repair": {
      heading: "Heating System Repair",
      description: "Fast diagnosis and repair for all heating systems — furnaces, heat pumps, and boilers. Our trucks carry 95% of common parts for same-day fixes across all major brands.",
      bullets: [
        { icon: <Zap size={15} className="text-red-600" />,        text: "Same-day repair available 7 days a week, including weekends" },
        { icon: <Wrench size={15} className="text-red-600" />,     text: "All brands serviced with genuine OEM manufacturer parts" },
        { icon: <ShieldCheck size={15} className="text-red-600" />, text: "90-day labor guarantee on every repair we complete" },
      ],
      pricing: [
        { label: "Diagnostic Fee", value: "$89"       },
        { label: "Most Repairs",   value: "$150–$650" },
      ],
      cta: "Book a Heating Repair",
    },
    "emergency": {
      heading: "24/7 Emergency Service",
      description: "When your system fails at the worst possible moment, we're on call. Live dispatchers, NATE-certified technicians, and fully stocked trucks — ready around the clock, 365 days a year.",
      bullets: [
        { icon: <Clock size={15} className="text-red-600" />,       text: "Average on-site response time under 90 minutes" },
        { icon: <ShieldCheck size={15} className="text-red-600" />, text: "No holiday or after-hours surcharges — ever" },
        { icon: <Phone size={15} className="text-red-600" />,       text: "Live dispatch available 24 hours, 7 days, 365 days" },
      ],
      pricing: [
        { label: "Emergency Call Fee",    value: "$149"         },
        { label: "Applied Toward Repair", value: "If Work Done" },
      ],
      cta: "Call Emergency Line Now",
      emergency: true,
    },
    "air-quality": {
      heading: "Indoor Air Quality",
      description: "Indoor air can be 5× more polluted than outdoors. Our IAQ solutions eliminate allergens, mold, odors, and humidity problems for whole-home wellness and cleaner air every day.",
      bullets: [
        { icon: <Wind size={15} className="text-red-600" />,          text: "HEPA filtration and UV germicidal air purification" },
        { icon: <Settings size={15} className="text-red-600" />,      text: "Professional duct cleaning, sealing, and inspection" },
        { icon: <Star size={15} className="text-red-600 fill-red-600" />, text: "Comprehensive allergen, mold, and humidity testing" },
      ],
      pricing: [
        { label: "Air Quality Audit", value: "Free" },
        { label: "Systems From",      value: "$399" },
      ],
      cta: "Schedule Air Quality Audit",
    },
  };

  const navRef  = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<HvacTab, HTMLButtonElement>>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const TABS: { id: HvacTab; label: string }[] = [
    { id: "home",     label: "Home"     },
    { id: "services", label: "Services" },
    { id: "reviews",  label: "Reviews"  },
    { id: "contact",  label: "Contact"  },
  ];

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current[activeTab];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const nr = nav.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    setIndicator({ left: br.left - nr.left, width: br.width });
  }, [activeTab]);

  useEffect(() => { updateIndicator(); }, [updateIndicator]);
  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const switchTab = (tab: HvacTab) => {
    setActiveTab(tab);
    setTabKey((k) => k + 1);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{HVAC_STYLES}</style>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">

        {/* ══ HEADER ════════════════════════════════════════════════ */}
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ease-out border-b
            ${scrolled
              ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/50 border-neutral-800"
              : "bg-black border-neutral-800"
            }`}
        >
          <div
            className={`max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between
                        transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
          >
            {/* ── Logo ── */}
            <button
              onClick={() => switchTab("home")}
              className="flex items-center gap-3 focus:outline-none select-none group"
            >
              <div
                className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center
                           group-hover:bg-red-500 transition-colors duration-300"
              >
                <Thermometer size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold leading-none tracking-tight">
                  <span className="text-white">Elite </span>
                  <span className="text-red-600">Air &amp; Heat</span>
                </p>
                <p className="text-[10px] font-medium text-neutral-600 tracking-widest uppercase leading-none mt-1">
                  HVAC Specialists
                </p>
              </div>
            </button>

            {/* ── Desktop nav tabs ── */}
            <div ref={navRef} className="hidden md:flex items-center relative">
              {/* Sliding red underline indicator */}
              <span
                className="absolute bottom-0 h-[2px] rounded-full bg-red-600
                           transition-all duration-300 ease-out pointer-events-none"
                style={{ left: indicator.left, width: indicator.width }}
              />
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  ref={(el) => { if (el) tabRefs.current[id] = el; }}
                  onClick={() => switchTab(id)}
                  className={`relative px-4 py-3 text-sm font-medium rounded-lg
                              transition-all duration-200 focus:outline-none
                              ${activeTab === id
                                ? "text-white"
                                : "text-neutral-500 hover:text-neutral-200 hover:bg-neutral-900"
                              }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Right CTAs ── */}
            <div className="flex items-center gap-3">
              {/* Phone number (desktop) */}
              <a
                href="tel:+18005550100"
                className="hidden lg:flex items-center gap-1.5 text-sm font-bold text-neutral-300
                           hover:text-white transition-colors duration-200"
              >
                <Phone size={13} className="text-red-600" />
                (800) 555-0100
              </a>

              {/* Emergency call button */}
              <a
                href="tel:+18005550100"
                className="a-emergency-pulse hidden md:inline-flex items-center gap-2 px-5 py-2.5
                           rounded-full text-sm font-bold text-white
                           bg-red-600 hover:bg-red-500
                           transition-all duration-300 hover:scale-105 shadow-md shadow-red-900/40
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                <Phone size={14} />
                Emergency Call
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                className="md:hidden relative flex items-center justify-center w-9 h-9 rounded-lg
                           text-neutral-400 hover:bg-neutral-800 hover:text-white
                           transition-colors duration-200 focus:outline-none"
              >
                <span className={`absolute transition-all duration-200 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                  <X size={20} />
                </span>
                <span className={`absolute transition-all duration-200 ${mobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
                  <Menu size={20} />
                </span>
              </button>
            </div>
          </div>

          {/* ── Mobile nav panel ── */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-out
              ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="border-t border-neutral-800 bg-black px-4 py-4 flex flex-col gap-1">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => switchTab(id)}
                  className={`px-4 py-3.5 rounded-xl text-sm font-medium text-left
                              transition-all duration-200
                              ${activeTab === id
                                ? "bg-neutral-900 text-white font-semibold border border-red-600/50"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                              }`}
                >
                  {label}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-neutral-800 flex flex-col gap-2">
                <a
                  href="tel:+18005550100"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full
                             text-sm font-bold text-white bg-red-600 hover:bg-red-500
                             transition-colors duration-300"
                >
                  <Phone size={14} /> Emergency: (800) 555-0100
                </a>
                <button
                  onClick={() => switchTab("contact")}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full
                             text-sm font-semibold text-red-500 border border-red-600/60
                             hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ══ TAB PANELS ════════════════════════════════════════════ */}
        <main key={tabKey} className="hvac-tab-enter">

          {/* ── HOME ──────────────────────────────────────────────── */}
          {activeTab === "home" && (
            <>
              {/* Hero */}
              <section
                className="pt-28 pb-32 md:pt-36 md:pb-44"
                style={{ background: "radial-gradient(ellipse at 50% -20%, #1c0606 0%, #0a0a0a 60%, #000000 100%)" }}
              >
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                  <div className="hvac-fade-up hfu-1 inline-flex items-center gap-2 text-xs font-bold
                                  tracking-widest uppercase mb-8 px-4 py-2 rounded-full
                                  border border-red-600/40 bg-red-600/10 text-red-500">
                    <Star size={11} className="fill-red-500" />
                    4.9 Star Rated &nbsp;·&nbsp; Licensed & Insured &nbsp;·&nbsp; Since 2004
                  </div>

                  <h1
                    className="hvac-fade-up hfu-2 text-5xl md:text-6xl lg:text-7xl font-black
                               text-white leading-[1.05] tracking-tight mb-4 max-w-3xl mx-auto"
                  >
                    Comfort in your home,{" "}
                    <span className="relative inline-block text-red-600">
                      guaranteed.
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[3px] bg-red-600 rounded-full opacity-60"
                      />
                    </span>
                  </h1>

                  <p className="hvac-fade-up hfu-3 text-lg md:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed mt-8 mb-12">
                    Elite Air &amp; Heat delivers expert HVAC installation, repair, and
                    maintenance with same-day service and a satisfaction guarantee
                    on every single job.
                  </p>

                  <div className="hvac-fade-up hfu-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => switchTab("contact")}
                      className="group inline-flex items-center justify-center gap-2.5 px-9 py-4
                                 rounded-full text-base font-bold text-white shadow-lg shadow-red-900/40
                                 bg-red-600 hover:bg-red-500 transition-all duration-300 hover:scale-105
                                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                    >
                      Get a Free Estimate
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                    <a
                      href="tel:+18005550100"
                      className="inline-flex items-center justify-center gap-2.5 px-9 py-4
                                 rounded-full text-base font-bold text-red-500
                                 border border-red-600 hover:bg-red-600 hover:text-white
                                 transition-all duration-300 hover:scale-105
                                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                    >
                      <Phone size={16} />
                      Call (800) 555-0100
                    </a>
                  </div>
                </div>
              </section>

              {/* Trust badges */}
              <section className="py-12 border-y border-neutral-800 bg-neutral-900">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                      { icon: <Zap size={20} className="text-red-600" />,      label: "Same-Day Service"  },
                      { icon: <ShieldCheck size={20} className="text-red-600" />, label: "Licensed & Insured" },
                      { icon: <Clock size={20} className="text-red-600" />,    label: "24/7 Emergency"    },
                      { icon: <Star size={20} className="text-red-600 fill-red-600" />, label: "4.9 Star Rated" },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex flex-col items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700
                                     flex items-center justify-center"
                        >
                          {icon}
                        </div>
                        <p className="text-xs font-bold text-neutral-400 tracking-wide">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Why Us */}
              <section className="py-24 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <p className="text-xs font-bold tracking-widest uppercase mb-3 text-red-600">
                      Why Elite Air &amp; Heat
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                      Built Around Your Comfort
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <HvacCard
                      icon={<Wind size={22} className="text-red-600" />}
                      title="Expert Technicians"
                      body="Every technician is NATE-certified with 10+ years of field experience. We diagnose right the first time — no return visits, no runaround."
                    />
                    <HvacCard
                      icon={<Thermometer size={22} className="text-red-600" />}
                      title="All Brands Serviced"
                      body="Carrier, Trane, Lennox, Rheem, Goodman, and more. We service, repair, and install every major brand with genuine OEM parts."
                    />
                    <HvacCard
                      icon={<Wrench size={22} className="text-red-600" />}
                      title="Satisfaction Guarantee"
                      body="If you're not 100% satisfied within 30 days, we come back and make it right — at no additional cost to you. Zero risk."
                    />
                  </div>
                </div>
              </section>

              {/* Partner logos */}
              <PartnerLogos onContact={() => switchTab("contact")} />

              {/* CTA strip */}
              <section className="bg-red-600 py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-200 mb-4">
                    Ready to Get Started?
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                    Same-day service, every time.
                  </h2>
                  <p className="text-red-100 text-lg max-w-lg mx-auto leading-relaxed mb-10">
                    Don't wait for a breakdown. Schedule preventive maintenance today
                    or call us now for immediate assistance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => switchTab("contact")}
                      className="inline-flex items-center justify-center gap-2.5 px-9 py-4
                                 rounded-full text-base font-bold text-red-600 bg-white
                                 hover:bg-neutral-100 transition-all duration-300 hover:scale-105
                                 shadow-lg shadow-red-900/30"
                    >
                      Schedule Online
                      <ArrowRight size={16} />
                    </button>
                    <a
                      href="tel:+18005550100"
                      className="inline-flex items-center justify-center gap-2.5 px-9 py-4
                                 rounded-full text-base font-bold text-white
                                 border-2 border-white/50 hover:border-white hover:bg-white/10
                                 transition-all duration-300 hover:scale-105"
                    >
                      <Phone size={16} />
                      (800) 555-0100
                    </a>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ── SERVICES ──────────────────────────────────────────── */}
          {activeTab === "services" && (
            <section className="py-20 bg-neutral-950">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section header */}
                <div className="mb-10">
                  <p className="text-xs font-bold tracking-widest uppercase text-red-600 mb-3">
                    Our Services
                  </p>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                      Full-Service HVAC Solutions
                    </h2>
                    <p className="text-neutral-500 text-sm max-w-xs leading-relaxed md:text-right">
                      Select a category to explore pricing, process, and booking options.
                    </p>
                  </div>
                  <div className="mt-6 h-px bg-neutral-800" />
                </div>

                {/* Mobile: horizontal scrollable pill tabs */}
                <div className="flex md:hidden overflow-x-auto gap-2 pb-3 mb-8 -mx-2 px-2">
                  {SVC_CATS.map(({ id, label, icon }) => (
                    <button
                      key={id}
                      onClick={() => switchServiceTab(id)}
                      className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5
                                  rounded-full text-sm font-semibold transition-all duration-300
                                  ${serviceTab === id
                                    ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                                    : "bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-red-600 hover:text-white"
                                  }`}
                    >
                      <span className="flex-shrink-0">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Desktop: sidebar + content panel */}
                <div className="flex gap-8 lg:gap-10 items-start">

                  {/* LEFT: vertical category sidebar */}
                  <div className="hidden md:flex flex-col gap-2 w-52 lg:w-60 flex-shrink-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1 px-1">
                      Categories
                    </p>

                    {SVC_CATS.map(({ id, label, icon }) => (
                      <button
                        key={id}
                        onClick={() => switchServiceTab(id)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold
                                    text-left transition-all duration-300
                                    ${serviceTab === id
                                      ? "bg-red-600 text-white shadow-lg shadow-red-900/30 scale-[1.02]"
                                      : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-red-600/60 hover:text-white"
                                    }`}
                      >
                        <span className="flex-shrink-0">{icon}</span>
                        {label}
                      </button>
                    ))}

                    {/* Sidebar emergency shortcut */}
                    <div className="mt-6 p-5 border border-red-600/25 rounded-xl bg-red-600/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2">
                        Emergency Line
                      </p>
                      <a
                        href="tel:+18005550100"
                        className="block text-xl font-black text-white hover:text-red-400 transition-colors duration-200"
                      >
                        (800) 555-0100
                      </a>
                      <p className="text-[11px] text-neutral-600 mt-1.5 leading-snug">
                        24/7 · Avg. 90 min response
                      </p>
                    </div>
                  </div>

                  {/* RIGHT: animated content panel */}
                  <div key={serviceKey} className="svc-enter flex-1 min-w-0">
                    {/* Red top accent bar */}
                    <div className="h-[3px] bg-red-600 rounded-t-xl" />
                    <div className="border border-neutral-800 border-t-0 rounded-b-2xl rounded-tr-2xl bg-neutral-900 p-7 lg:p-10">

                      {/* Panel heading */}
                      <div className="mb-7">
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold
                                         uppercase tracking-widest text-red-600 mb-3">
                          {SVC_CATS.find((c) => c.id === serviceTab)?.icon}
                          {SVC_CATS.find((c) => c.id === serviceTab)?.label}
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                          {SVC_DATA[serviceTab].heading}
                        </h3>
                      </div>

                      <p className="text-neutral-400 leading-relaxed text-base mb-8">
                        {SVC_DATA[serviceTab].description}
                      </p>

                      <div className="h-px bg-neutral-800 mb-8" />

                      {/* Bullet highlights */}
                      <div className="space-y-3 mb-8">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-4">
                          What's Included
                        </p>
                        {SVC_DATA[serviceTab].bullets.map((b, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3.5 p-4 rounded-xl
                                       bg-neutral-950 border border-neutral-800
                                       hover:border-neutral-700 hover:-translate-y-0.5
                                       transition-all duration-200"
                          >
                            <span className="flex-shrink-0 mt-0.5">{b.icon}</span>
                            <p className="text-neutral-300 text-sm leading-relaxed">{b.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Pricing card */}
                      <div className="p-6 border border-red-600/25 rounded-xl bg-neutral-950 mb-8">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-5">
                          Pricing Overview
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                          {SVC_DATA[serviceTab].pricing.map(({ label, value }) => (
                            <div key={label}>
                              <p className="text-xs text-neutral-500 font-medium mb-1.5">{label}</p>
                              <p className="text-2xl font-black text-white tabular-nums">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center gap-2">
                          <ShieldCheck size={13} className="text-red-600 flex-shrink-0" />
                          <p className="text-xs text-neutral-600">
                            Free estimate always included — absolutely no obligation
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      {SVC_DATA[serviceTab].emergency ? (
                        <a
                          href="tel:+18005550100"
                          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                                     px-8 py-4 rounded-full text-base font-bold text-white
                                     bg-red-600 hover:bg-red-500 transition-all duration-300 hover:scale-105
                                     shadow-lg shadow-red-900/40"
                        >
                          <Phone size={16} />
                          {SVC_DATA[serviceTab].cta}
                        </a>
                      ) : (
                        <button
                          onClick={() => switchTab("contact")}
                          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                                     px-8 py-4 rounded-full text-base font-bold text-white
                                     bg-red-600 hover:bg-red-500 transition-all duration-300 hover:scale-105
                                     shadow-lg shadow-red-900/40
                                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                        >
                          {SVC_DATA[serviceTab].cta}
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Service Process Strip ───────────────────────── */}
                <div className="mt-16 pt-12 border-t border-neutral-800">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 text-center mb-12">
                    Our Service Process
                  </p>
                  <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                    {/* Desktop connecting line */}
                    <div
                      className="hidden md:block absolute top-5 h-px bg-neutral-800 z-0"
                      style={{ left: "calc(12.5% + 20px)", right: "calc(12.5% + 20px)" }}
                    />
                    {[
                      { num: "01", title: "Diagnose",         desc: "Thorough on-site system assessment by a certified technician." },
                      { num: "02", title: "Recommend",        desc: "Transparent options with clear, upfront pricing — no surprises." },
                      { num: "03", title: "Install / Repair", desc: "Expert certified work using OEM parts, completed on schedule."   },
                      { num: "04", title: "Guarantee",        desc: "30-day satisfaction guarantee on every job we perform."          },
                    ].map(({ num, title, desc }) => (
                      <div key={num} className="relative z-10 flex flex-col items-center text-center">
                        {/* Step dot */}
                        <div
                          className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800
                                     flex items-center justify-center mb-4 flex-shrink-0"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        </div>
                        <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1.5">
                          Step {num}
                        </p>
                        <p className="font-bold text-white text-sm mb-2 tracking-tight">{title}</p>
                        <p className="text-xs text-neutral-500 leading-relaxed max-w-[150px]">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* ── REVIEWS ───────────────────────────────────────────── */}
          {activeTab === "reviews" && (
            <section className="py-24 bg-neutral-950">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Overall rating hero */}
                <div className="text-center mb-16">
                  <p className="text-xs font-bold tracking-widest uppercase mb-6 text-red-600">
                    Customer Reviews
                  </p>
                  <div className="flex items-center justify-center gap-5 mb-6">
                    <p className="text-8xl font-black text-white tabular-nums leading-none">4.9</p>
                    <div className="text-left">
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={24} className="text-red-600 fill-red-600" />
                        ))}
                      </div>
                      <p className="text-sm text-neutral-500 font-medium">Based on 847 reviews</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {["Google", "Yelp", "HomeAdvisor", "Angi"].map((src) => (
                      <span
                        key={src}
                        className="text-xs font-bold px-4 py-2 rounded-full
                                   border border-neutral-700 text-neutral-500 bg-neutral-900
                                   tracking-wide"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ReviewCard
                    name="Michael T."
                    location="Atlanta, GA"
                    rating={5}
                    date="Jan 2025"
                    body="AC went out on a Saturday night in July. Called Elite at 10pm and they had a tech at my house by midnight. Fixed the capacitor on the spot. Absolute lifesavers."
                  />
                  <ReviewCard
                    name="Sandra R."
                    location="Marietta, GA"
                    rating={5}
                    date="Nov 2024"
                    body="Replaced our 20-year-old furnace with a new Carrier system. The crew was professional, clean, and finished in one day. Our bill dropped 30%."
                  />
                  <ReviewCard
                    name="David & Linda K."
                    location="Roswell, GA"
                    rating={5}
                    date="Sep 2024"
                    body="We've been on their annual maintenance plan for 3 years. Zero breakdowns since we started. The technician is always on time and never tries to upsell us."
                  />
                  <ReviewCard
                    name="James F."
                    location="Alpharetta, GA"
                    rating={5}
                    date="Aug 2024"
                    body="Competitive quote, fast installation of a new mini-split, and the job site was spotless afterward. My home office went from miserable to perfect."
                  />
                  <ReviewCard
                    name="Patricia M."
                    location="Smyrna, GA"
                    rating={4}
                    date="Jun 2024"
                    body="Very responsive and honest. They told me my unit was still fixable rather than pushing a full replacement like another company had. Saved me thousands."
                  />
                  <ReviewCard
                    name="Carlos V."
                    location="Dunwoody, GA"
                    rating={5}
                    date="Mar 2024"
                    body="Had them install a whole-home air purifier. The technician was incredibly knowledgeable and helped us pick the right system for our family's needs."
                  />
                </div>

                <div className="mt-14 text-center">
                  <button
                    onClick={() => switchTab("contact")}
                    className="group inline-flex items-center justify-center gap-2.5 px-9 py-4
                               rounded-full text-sm font-bold text-white shadow-lg shadow-red-900/40
                               bg-red-600 hover:bg-red-500 transition-all duration-300 hover:scale-105
                               focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  >
                    Join Our Happy Customers
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── CONTACT ───────────────────────────────────────────── */}
          {activeTab === "contact" && (
            <section className="py-24 bg-neutral-950">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="mb-12">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-red-600">
                    Get in Touch
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Schedule Your Service.
                  </h2>
                </div>

                {/* Emergency banner */}
                <div
                  className="mb-10 p-5 border border-red-600/40 rounded-2xl bg-red-600/8
                              flex items-center gap-4"
                >
                  <div
                    className="w-11 h-11 rounded-xl bg-red-600/15 border border-red-600/30
                               flex items-center justify-center flex-shrink-0"
                  >
                    <Phone size={18} className="text-red-500" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">HVAC Emergency?</p>
                    <p className="text-sm text-neutral-400 mt-0.5">
                      Skip the form — call us directly at{" "}
                      <a href="tel:+18005550100" className="font-bold text-red-500 hover:text-red-400 transition-colors">
                        (800) 555-0100
                      </a>{" "}
                      for 24/7 emergency dispatch.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                  {/* ── Contact info ── */}
                  <div className="lg:col-span-2 space-y-8">
                    <p className="text-neutral-400 leading-relaxed">
                      Fill out the form and we'll reach out within 2 hours to confirm
                      your appointment. All estimates are free with no obligation.
                    </p>

                    <div className="space-y-5">
                      {[
                        {
                          icon: <Phone size={15} className="text-red-600" />,
                          label: "Phone",
                          value: "(800) 555-0100",
                        },
                        {
                          icon: <Mail size={15} className="text-red-600" />,
                          label: "Email",
                          value: "service@eliteairheat.com",
                        },
                        {
                          icon: <MapPin size={15} className="text-red-600" />,
                          label: "Service Area",
                          value: "Metro Atlanta & Surrounding Counties",
                        },
                        {
                          icon: <Clock size={15} className="text-red-600" />,
                          label: "Office Hours",
                          value: "Mon–Fri 7 AM – 8 PM\nSat–Sun 8 AM – 6 PM",
                        },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex gap-4 items-start">
                          <div
                            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5
                                       bg-neutral-900 border border-neutral-800"
                          >
                            {icon}
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-0.5">
                              {label}
                            </p>
                            <p className="text-sm text-neutral-300 whitespace-pre-line leading-relaxed">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Service areas */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
                        Service Areas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Atlanta", "Marietta", "Roswell", "Alpharetta", "Smyrna", "Dunwoody", "Sandy Springs", "Decatur"].map((city) => (
                          <span
                            key={city}
                            className="text-xs px-3 py-1.5 rounded-full border border-neutral-800
                                       text-neutral-500 bg-neutral-900"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Form ── */}
                  <form
                    className="lg:col-span-3 space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Dark form fields */}
                      {[
                        { label: "First Name", placeholder: "Jane",  type: "text" },
                        { label: "Last Name",  placeholder: "Smith", type: "text" },
                      ].map(({ label, placeholder, type }) => (
                        <div key={label}>
                          <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                            {label}
                          </label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-700 text-sm
                                       text-neutral-100 bg-neutral-900 placeholder:text-neutral-600
                                       transition-all duration-300 hover:border-neutral-600
                                       focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>

                    {[
                      { label: "Email Address", placeholder: "jane@email.com",  type: "email" },
                      { label: "Phone Number",  placeholder: "(404) 000-0000", type: "tel"   },
                    ].map(({ label, placeholder, type }) => (
                      <div key={label}>
                        <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                          {label}
                        </label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-700 text-sm
                                     text-neutral-100 bg-neutral-900 placeholder:text-neutral-600
                                     transition-all duration-300 hover:border-neutral-600
                                     focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                        Service Type
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-lg border border-neutral-700 text-sm
                                   text-neutral-100 bg-neutral-900 appearance-none
                                   transition-all duration-300 hover:border-neutral-600
                                   focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      >
                        <option value="" className="text-neutral-600">Select a service...</option>
                        <option>AC Repair</option>
                        <option>AC Installation</option>
                        <option>Heating Repair</option>
                        <option>Heating Installation</option>
                        <option>Preventive Maintenance</option>
                        <option>Indoor Air Quality</option>
                        <option>Emergency Service</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                        Describe the Issue
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us what's happening with your system..."
                        className="w-full px-4 py-3 rounded-lg border border-neutral-700 text-sm
                                   text-neutral-100 bg-neutral-900 placeholder:text-neutral-600 resize-none
                                   transition-all duration-300 hover:border-neutral-600
                                   focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="group w-full inline-flex items-center justify-center gap-2.5
                                   px-7 py-4 rounded-full text-base font-bold text-white
                                   bg-red-600 hover:bg-red-500 transition-all duration-300 hover:scale-[1.02]
                                   shadow-lg shadow-red-900/40
                                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                      >
                        Request Free Estimate
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                      <p className="text-center text-xs text-neutral-600 mt-3">
                        We'll respond within 2 hours during business hours.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* ══ FOOTER ════════════════════════════════════════════════ */}
        <footer className="bg-black border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center">
                    <Thermometer size={17} className="text-white" />
                  </div>
                  <p className="font-bold text-base leading-none">
                    <span className="text-white">Elite </span>
                    <span className="text-red-600">Air &amp; Heat</span>
                  </p>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                  Metro Atlanta's most trusted HVAC company since 2004.
                  Licensed, insured, and committed to your total comfort.
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                  <span className="text-xs text-neutral-500 font-medium">24/7 Emergency Available</span>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">
                  Services
                </p>
                <ul className="space-y-4 text-sm">
                  {["AC Installation", "AC Repair", "Heating Systems", "Preventive Maintenance", "Emergency Service"].map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => switchTab("services")}
                        className="text-neutral-500 hover:text-red-500 transition-colors duration-200"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">
                  Contact
                </p>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href="tel:+18005550100"
                      className="text-xl font-black text-white hover:text-red-500 transition-colors duration-200"
                    >
                      (800) 555-0100
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:service@eliteairheat.com"
                      className="text-neutral-500 hover:text-red-500 transition-colors duration-200"
                    >
                      service@eliteairheat.com
                    </a>
                  </li>
                  <li className="text-neutral-500">Metro Atlanta, GA &amp; Surrounding Areas</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-700">
              <p>&copy; {new Date().getFullYear()} Elite Air &amp; Heat. All rights reserved.</p>
              <div className="flex gap-6">
                <button className="hover:text-red-500 transition-colors duration-200">Privacy Policy</button>
                <button className="hover:text-red-500 transition-colors duration-200">Terms of Service</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PAGE ENTRY POINT — swap the component here to switch templates
════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return <TemplateModernist />;
}
