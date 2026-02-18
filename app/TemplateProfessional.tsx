"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Scale, ShieldCheck, Gavel, Menu, X, ArrowRight,
  Building2, Lock, Globe, CheckCircle2, MapPin, Phone, Mail, Clock,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════
   TEMPLATE: PROFESSIONAL  (Vanguard Legal Group — Law Firm / B2B)
   Color system: White + Emerald-700 — Clean, authoritative
════════════════════════════════════════════════════════════════════ */

type Tab = "home" | "about" | "services" | "contact";

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

const EM7  = "#047857";
const EM7A = "rgba(4,120,87,0.08)";
const EM7B = "rgba(4,120,87,0.22)";

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

function IconTray({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 flex-shrink-0 bg-emerald-50">
      {children}
    </div>
  );
}

function PrimaryBtn({
  children, onClick, type = "button", full = false,
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
      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  );
}

function Card({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="group p-7 border border-neutral-200 rounded-2xl bg-white cursor-default
                   transition-all duration-300 ease-out
                   hover:-translate-y-1 hover:shadow-md hover:border-neutral-300">
      <IconTray>{icon}</IconTray>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2.5 tracking-tight">{title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function FormField({
  label, type = "text", placeholder, rows,
}: {
  label: string; type?: string; placeholder: string; rows?: number;
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
              <p className="text-5xl md:text-6xl font-bold mb-3 tabular-nums text-emerald-700">{value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TemplateProfessional() {
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
          <div className={`max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between transition-all duration-300
            ${scrolled ? "h-16" : "h-20"}`}>
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
                  className={`relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none
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

          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out
            ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="border-t border-neutral-100 bg-white/95 backdrop-blur-sm px-4 py-4 flex flex-col gap-1">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => switchTab(id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-150
                    ${activeTab === id ? "font-semibold" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"}`}
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

                  <h1 className="fade-up fu-2 font-serif text-5xl md:text-6xl lg:text-7xl font-bold
                                 text-neutral-900 leading-[1.07] tracking-tight mb-7 max-w-3xl mx-auto">
                    Modern Defense for a Digital Age.
                  </h1>

                  <p className="fade-up fu-3 text-lg md:text-xl text-neutral-600 max-w-xl mx-auto leading-relaxed mb-12">
                    Vanguard Legal Group delivers senior-level legal strategy to businesses and individuals
                    navigating complex corporate, privacy, and litigation challenges. When the stakes are
                    high, experience matters.
                  </p>

                  <div className="fade-up fu-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <PrimaryBtn onClick={() => switchTab("contact")}>Schedule a Consultation</PrimaryBtn>
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
                    <p className="text-xs font-bold tracking-widest uppercase mb-3 text-emerald-700">What We Do</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">Practice Areas</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <Card icon={<Scale size={20} className="text-emerald-700" />} title="Corporate Law"
                      body="From entity formation and M&A transactions to board governance and regulatory compliance, we guide companies through every stage of their corporate lifecycle with precision and discretion." />
                    <Card icon={<ShieldCheck size={20} className="text-emerald-700" />} title="Digital Privacy"
                      body="In an era of evolving data regulations, we protect your business and personal data interests — advising on GDPR, CCPA, breach response, and the legal architecture of digital products." />
                    <Card icon={<Gavel size={20} className="text-emerald-700" />} title="Litigation Strategy"
                      body="Our seasoned trial attorneys bring meticulous preparation and courtroom authority to disputes involving contracts, IP, employment, and high-value commercial claims." />
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
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-emerald-700">Our Story</p>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900
                                 leading-[1.1] tracking-tight max-w-2xl">
                    Built on integrity. Sustained by results.
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-6">
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      Vanguard Legal Group was founded in 1998 with a singular conviction: that every client
                      deserves the same level of rigorous, senior-led counsel once reserved only for the
                      largest corporations.
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                      Over 25 years, we have grown into one of New York's most respected boutique firms —
                      trusted by Fortune 500 companies, fast-growth startups, and high-profile individuals
                      who demand discretion and results in equal measure.
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                      We don't believe in large teams diluting attention. Every matter at Vanguard is handled
                      by a named partner who remains directly accountable from intake to resolution.
                    </p>
                    <div className="pt-4">
                      <PrimaryBtn onClick={() => switchTab("contact")}>Speak with a Partner</PrimaryBtn>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Partner-Led Engagements", body: "Every client works directly with a named senior partner — not associates or paralegals acting as intermediaries." },
                      { title: "Cross-Disciplinary Teams", body: "Our attorneys hold dual expertise in law and technology, giving us a decisive edge in digital-era disputes and transactions." },
                      { title: "Global Reach, Local Precision", body: "With partner relationships across 30 jurisdictions, we extend our clients' legal coverage without sacrificing ground-level responsiveness." },
                    ].map(({ title, body }) => (
                      <div key={title} className="flex gap-4 p-6 border border-neutral-200 rounded-2xl
                                                   hover:border-neutral-300 hover:shadow-md transition-all duration-300">
                        <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5 text-emerald-700" />
                        <div>
                          <p className="font-semibold text-neutral-900 mb-1 tracking-tight">{title}</p>
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
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-emerald-700">What We Offer</p>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
                    Full-Spectrum Legal Services
                  </h2>
                  <p className="text-neutral-600 text-lg max-w-xl mx-auto leading-relaxed">
                    End-to-end coverage for every legal challenge your business may face — from corporate
                    formation to courtroom defense.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card icon={<Scale size={20} className="text-emerald-700" />} title="Corporate Law"
                    body="Entity formation, M&A advisory, board governance, shareholder agreements, and regulatory compliance across multiple jurisdictions." />
                  <Card icon={<ShieldCheck size={20} className="text-emerald-700" />} title="Digital Privacy & Data"
                    body="GDPR, CCPA, and global privacy framework compliance. Data breach response, DPO advisory, and privacy-by-design architecture." />
                  <Card icon={<Gavel size={20} className="text-emerald-700" />} title="Commercial Litigation"
                    body="High-stakes dispute resolution in contract, IP, employment, and fraud matters. Trial-tested attorneys with consistent track records." />
                  <Card icon={<Building2 size={20} className="text-emerald-700" />} title="Real Estate & Finance"
                    body="Commercial real estate transactions, financing structures, REIT compliance, and development agreements from term sheet to closing." />
                  <Card icon={<Lock size={20} className="text-emerald-700" />} title="Cybersecurity Law"
                    body="Legal frameworks for incident response, regulatory reporting obligations, vendor risk management, and cyber insurance coverage disputes." />
                  <Card icon={<Globe size={20} className="text-emerald-700" />} title="International Counsel"
                    body="Cross-border transaction structuring, foreign investment review, trade compliance, and multi-jurisdictional dispute coordination." />
                </div>

                <div className="mt-16 text-center">
                  <PrimaryBtn onClick={() => switchTab("contact")}>Schedule a Consultation</PrimaryBtn>
                </div>
              </div>
            </section>
          )}

          {/* ── CONTACT ───────────────────────────────────────────── */}
          {activeTab === "contact" && (
            <section className="py-24 bg-white">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="mb-14">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-emerald-700">Get in Touch</p>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
                    Let's discuss your matter.
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                  <div className="lg:col-span-2 space-y-8">
                    <p className="text-neutral-600 leading-relaxed text-base">
                      All initial consultations are conducted by a senior partner. We respond to every
                      inquiry within one business day.
                    </p>

                    <div className="space-y-5">
                      {[
                        { icon: <MapPin size={15} className="text-emerald-700" />, label: "Office",  value: "1200 Avenue of the Americas\nNew York, NY 10036" },
                        { icon: <Phone size={15} className="text-emerald-700" />,  label: "Phone",   value: "+1 (212) 555-0191" },
                        { icon: <Mail size={15} className="text-emerald-700" />,   label: "Email",   value: "counsel@vanguardlegal.com" },
                        { icon: <Clock size={15} className="text-emerald-700" />,  label: "Hours",   value: "Mon–Fri, 8:00 AM – 7:00 PM ET" },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 bg-emerald-50">
                            {icon}
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-0.5">{label}</p>
                            <p className="text-sm text-neutral-700 whitespace-pre-line leading-relaxed">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form className="lg:col-span-3 space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="First Name" placeholder="Jane" />
                      <FormField label="Last Name" placeholder="Smith" />
                    </div>
                    <FormField label="Email Address" type="email" placeholder="jane@company.com" />
                    <FormField label="Phone (Optional)" type="tel" placeholder="+1 (212) 000-0000" />

                    <div>
                      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                        Matter Type
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm
                                         text-neutral-900 bg-white transition-all duration-300
                                         hover:border-neutral-300 appearance-none
                                         focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent">
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

                    <FormField label="Brief Description"
                      placeholder="Please describe your legal matter in a few sentences..." rows={5} />

                    <div className="pt-1">
                      <PrimaryBtn type="submit" full>Submit Inquiry</PrimaryBtn>
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
                <p className="text-base font-semibold mb-4 tracking-tight text-neutral-100">Vanguard Legal Group</p>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                  A premier legal advisory firm delivering rigorous counsel across corporate, privacy,
                  and litigation matters since 1998.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-5">Practice Areas</p>
                <ul className="space-y-3 text-sm">
                  {["Corporate Law", "Digital Privacy", "Litigation Strategy", "Regulatory Compliance"].map((item) => (
                    <li key={item}>
                      <button onClick={() => switchTab("services")}
                        className="text-neutral-400 hover:text-neutral-100 transition-colors duration-200 inline-block">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-5">Contact</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li>1200 Avenue of the Americas</li>
                  <li>New York, NY 10036</li>
                  <li><a href="tel:+12125550191" className="hover:text-neutral-100 transition-colors duration-200">+1 (212) 555-0191</a></li>
                  <li><a href="mailto:counsel@vanguardlegal.com" className="hover:text-neutral-100 transition-colors duration-200">counsel@vanguardlegal.com</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
              <p>&copy; {new Date().getFullYear()} Vanguard Legal Group. All rights reserved.</p>
              <div className="flex gap-6">
                <button className="hover:text-neutral-400 transition-colors duration-200">Privacy Policy</button>
                <button className="hover:text-neutral-400 transition-colors duration-200">Terms of Use</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
