"use client";

import {
  Sparkles, Star, Heart, Leaf, CheckCircle2,
  Menu, X, ArrowRight, Phone, Mail, MapPin, Clock,
  ChevronRight, ChevronLeft, Calendar as CalIcon,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

/* ════════════════════════════════════════════════════════════════════
   TEMPLATE: AESTHETIC  (Luna Wellness & MedSpa)
   Color system: Noir & Gold — High-End Luxury
════════════════════════════════════════════════════════════════════ */

type AestheticTab  = "home" | "treatments" | "results" | "about" | "book";
type TreatCategory = "face" | "body" | "wellness";

/* ─── Keyframes ──────────────────────────────────────────────────── */
const AE_STYLES = `
@keyframes aeFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.ae-fade-up { animation: aeFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
.afu-1 { animation-delay: 0.05s; }
.afu-2 { animation-delay: 0.16s; }
.afu-3 { animation-delay: 0.28s; }
.afu-4 { animation-delay: 0.42s; }
.afu-5 { animation-delay: 0.56s; }

@keyframes aeTabEnter {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.ae-tab-enter { animation: aeTabEnter 0.38s cubic-bezier(0.22,1,0.36,1) both; }

@keyframes aeTreatEnter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.ae-treat-enter { animation: aeTreatEnter 0.30s ease-out both; }

@keyframes aeCalEnter {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}
.ae-cal-enter { animation: aeCalEnter 0.22s ease-out both; }
`;

/* ─── Calendar constants ─────────────────────────────────────────── */
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_ABBR = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const TIME_SLOTS = [
  "9:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "2:00 PM","3:00 PM","4:00 PM","5:00 PM",
];

/* ─── Treatment data ─────────────────────────────────────────────── */
const TREAT_DATA: Record<
  TreatCategory,
  { title: string; desc: string; price: string; duration: string }[]
> = {
  face: [
    { title: "Botox & Injectables", desc: "Precision neurotoxin and dermal filler treatments tailored to your unique anatomy — smoothing, lifting, and restoring volume with artful restraint.", price: "From $350", duration: "30–45 min" },
    { title: "HydraFacial", desc: "A multi-step vortex treatment that deeply cleanses, extracts, and infuses antioxidants for skin that's instantly radiant, plumped, and visibly refined.", price: "From $175", duration: "60 min" },
    { title: "Chemical Peels", desc: "Medical-grade resurfacing that addresses pigmentation, uneven texture, and dullness — revealing brighter, smoother, more luminous skin beneath.", price: "From $125", duration: "45 min" },
    { title: "Microneedling", desc: "Controlled micro-channels stimulate your body's natural collagen and elastin response to refine pores, reduce scarring, and firm skin over time.", price: "From $295", duration: "75 min" },
  ],
  body: [
    { title: "CoolSculpting Elite", desc: "FDA-cleared non-invasive fat reduction using precisely controlled cooling to permanently eliminate stubborn fat cells — no surgery, no downtime.", price: "From $750", duration: "35–60 min" },
    { title: "Body Contouring", desc: "Advanced radiofrequency and ultrasound technology to tighten loose skin, reduce cellulite, and sculpt your natural silhouette with clinical precision.", price: "From $450", duration: "60 min" },
    { title: "Laser Hair Removal", desc: "Achieve permanent hair-free smoothness with our medical-grade laser platform — safe and effective for all skin tones and treatment areas.", price: "From $150", duration: "20–60 min" },
  ],
  wellness: [
    { title: "IV Nutrient Therapy", desc: "Custom-blended intravenous nutrient infusions to boost energy, strengthen immunity, accelerate recovery, and produce an unmistakable inner glow.", price: "From $180", duration: "45–60 min" },
    { title: "Hormone Balancing", desc: "Comprehensive hormone panel assessment and bioidentical therapy to restore vitality, mental clarity, mood stability, and metabolic function.", price: "Consultation", duration: "60 min" },
    { title: "Stress & Recovery", desc: "Targeted mind-body restoration protocols combining red light therapy, compression massage, and peptide treatments for deep systemic recovery.", price: "From $220", duration: "60 min" },
  ],
};

/* ─── Sub-components ─────────────────────────────────────────────── */
function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < count ? "text-amber-400 fill-amber-400" : "text-neutral-700 fill-neutral-700"}
        />
      ))}
    </div>
  );
}

function TreatCard({
  title, desc, price, duration, onBook,
}: { title: string; desc: string; price: string; duration: string; onBook: () => void }) {
  return (
    <div className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-7 cursor-default
                    hover:border-amber-400/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50
                    transition-all duration-300">
      <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/20
                      flex items-center justify-center mb-5
                      group-hover:bg-amber-400/20 transition-colors duration-300">
        <Sparkles size={14} className="text-amber-400" />
      </div>
      <h3 className="text-base font-semibold text-white mb-2.5 tracking-tight">{title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed mb-6 font-light">{desc}</p>
      <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
        <span className="text-sm font-semibold text-amber-400">{price}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-600 font-medium tracking-wide">{duration}</span>
          <button
            onClick={onBook}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300
                       transition-colors duration-200 flex items-center gap-1"
          >
            Book <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════════ */
export default function TemplateAesthetic() {
  const [activeTab, setActiveTab]   = useState<AestheticTab>("home");
  const [tabKey, setTabKey]         = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [treatCat, setTreatCat]     = useState<TreatCategory>("face");
  const [treatKey, setTreatKey]     = useState(0);

  /* ── Calendar state ── */
  const [calMonth, setCalMonth]         = useState(() => { const d = new Date(); d.setDate(1); d.setHours(0,0,0,0); return d; });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calKey, setCalKey]             = useState(0);

  /* ── Nav indicator ── */
  const navRef  = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<AestheticTab, HTMLButtonElement>>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const TABS: { id: AestheticTab; label: string }[] = [
    { id: "home",       label: "Home"       },
    { id: "treatments", label: "Treatments" },
    { id: "results",    label: "Results"    },
    { id: "about",      label: "About"      },
    { id: "book",       label: "Book"       },
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

  const switchTab = (tab: AestheticTab) => {
    setActiveTab(tab);
    setTabKey((k) => k + 1);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switchTreat = (cat: TreatCategory) => {
    setTreatCat(cat);
    setTreatKey((k) => k + 1);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Calendar helpers ── */
  const todayMidnight = (() => { const d = new Date(); d.setHours(0,0,0,0); return d; })();
  const calYear     = calMonth.getFullYear();
  const calMonthIdx = calMonth.getMonth();
  const daysInMonth    = new Date(calYear, calMonthIdx + 1, 0).getDate();
  const firstDayOffset = new Date(calYear, calMonthIdx, 1).getDay();

  /* Last day of previous month < today → can't go back */
  const isPrevDisabled = new Date(calYear, calMonthIdx, 0) < todayMidnight;

  const isDayDisabled = (day: number) => {
    const d = new Date(calYear, calMonthIdx, day);
    return d < todayMidnight || d.getDay() === 0; // past days or Sunday (closed)
  };
  const isDayToday = (day: number) =>
    calYear    === todayMidnight.getFullYear() &&
    calMonthIdx === todayMidnight.getMonth()  &&
    day         === todayMidnight.getDate();
  const isDaySelected = (day: number) =>
    !!selectedDate &&
    selectedDate.getFullYear() === calYear &&
    selectedDate.getMonth()    === calMonthIdx &&
    selectedDate.getDate()     === day;

  /* Deterministic mock "booked" slots based on date */
  const getUnavailableSlots = (date: Date) => {
    const seed = date.getDate() + date.getMonth() * 7;
    return TIME_SLOTS.filter((_, i) => (seed + i * 2) % 5 === 0);
  };
  const unavailableSlots = selectedDate ? getUnavailableSlots(selectedDate) : [];

  const goToPrevMonth = () => {
    if (isPrevDisabled) return;
    setCalMonth(new Date(calYear, calMonthIdx - 1, 1));
    setCalKey((k) => k + 1);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  const goToNextMonth = () => {
    setCalMonth(new Date(calYear, calMonthIdx + 1, 1));
    setCalKey((k) => k + 1);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  /* ── Input / select shared class ── */
  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-neutral-700/60 text-sm font-light " +
    "text-neutral-200 bg-neutral-800/80 placeholder:text-neutral-600 " +
    "transition-all duration-300 hover:border-amber-400/30 " +
    "focus:outline-none focus:ring-1 focus:ring-amber-400/40 focus:border-amber-400/30";

  /* ══════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{AE_STYLES}</style>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">

        {/* ══ HEADER ══════════════════════════════════════════════════ */}
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ease-out
            ${scrolled
              ? "bg-neutral-950/95 backdrop-blur-xl border-b border-amber-400/10 shadow-lg shadow-black/50"
              : "bg-neutral-950 border-b border-neutral-900"
            }`}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">

            {/* Mobile row */}
            <div className="flex items-center justify-between py-5 md:hidden">
              <button onClick={() => switchTab("home")} className="focus:outline-none select-none">
                <p className="text-lg font-bold tracking-[0.22em] text-white leading-none">LUNA</p>
                <p className="text-[9px] font-light tracking-[0.35em] text-amber-400 uppercase leading-none mt-0.5">
                  Wellness &amp; MedSpa
                </p>
              </button>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="w-9 h-9 flex items-center justify-center rounded-lg
                           text-neutral-400 hover:text-amber-400 hover:bg-neutral-900
                           transition-colors duration-200 focus:outline-none"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            {/* Desktop: centered stacked logo + tab nav */}
            <div className="hidden md:flex flex-col items-center pt-8 pb-0">
              <button
                onClick={() => switchTab("home")}
                className="focus:outline-none select-none group mb-7"
              >
                <p className="text-2xl font-bold tracking-[0.32em] text-white leading-none text-center
                               group-hover:text-amber-400 transition-colors duration-300">
                  LUNA
                </p>
                <p className="text-[10px] font-light tracking-[0.48em] text-amber-400 uppercase leading-none mt-1.5 text-center">
                  Wellness &amp; MedSpa
                </p>
              </button>

              {/* Gold sliding underline nav */}
              <div ref={navRef} className="relative flex items-center">
                <span
                  className="absolute bottom-0 h-[1px] rounded-full bg-amber-400
                             transition-all duration-300 ease-out pointer-events-none"
                  style={{ left: indicator.left, width: indicator.width }}
                />
                {TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    ref={(el) => { if (el) tabRefs.current[id] = el; }}
                    onClick={() => switchTab(id)}
                    className={`px-5 py-3.5 text-xs font-medium tracking-[0.18em] uppercase
                                transition-colors duration-200 focus:outline-none
                                ${activeTab === id
                                  ? "text-amber-400"
                                  : "text-neutral-400 hover:text-white"
                                }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile nav panel */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-out
              ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="border-t border-neutral-800 bg-neutral-900 px-5 py-5 flex flex-col gap-1">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => switchTab(id)}
                  className={`px-4 py-3 rounded-xl text-sm tracking-wide text-left transition-all duration-200
                              ${activeTab === id
                                ? "text-amber-400 bg-amber-400/10 font-semibold"
                                : "text-neutral-200 hover:text-white hover:bg-neutral-800"
                              }`}
                >
                  {label}
                </button>
              ))}
              <div className="pt-3 mt-1 border-t border-neutral-800">
                <button
                  onClick={() => switchTab("book")}
                  className="w-full py-3 rounded-full text-sm font-bold text-neutral-950
                             bg-amber-400 hover:bg-amber-300 transition-colors duration-300"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ══ TAB PANELS ══════════════════════════════════════════════ */}
        <main key={tabKey} className="ae-tab-enter">

          {/* ── HOME ──────────────────────────────────────────────── */}
          {activeTab === "home" && (
            <>
              {/* Hero */}
              <section className="relative pt-28 pb-36 overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 65% 55% at 50% 25%, rgba(251,191,36,0.07) 0%, transparent 70%)" }}
                />
                <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
                  <p className="ae-fade-up afu-1 inline-flex items-center gap-3 text-xs font-medium
                                 tracking-[0.22em] uppercase text-amber-400 mb-10">
                    <span className="block w-8 h-px bg-amber-400/40" />
                    Award-Winning Wellness Since 2016
                    <span className="block w-8 h-px bg-amber-400/40" />
                  </p>

                  <h1 className="ae-fade-up afu-2 text-5xl md:text-6xl lg:text-7xl font-light
                                  text-white leading-[1.08] tracking-tight mb-8">
                    Rejuvenate your{" "}
                    <em className="not-italic text-amber-400 font-normal">natural radiance.</em>
                  </h1>

                  <p className="ae-fade-up afu-3 text-lg md:text-xl text-neutral-300 font-light
                                 max-w-xl mx-auto leading-relaxed mb-14">
                    Luna Wellness &amp; MedSpa offers curated, results-driven treatments
                    in a serene sanctuary — designed to restore, refine, and reveal
                    the most luminous version of you.
                  </p>

                  <div className="ae-fade-up afu-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => switchTab("treatments")}
                      className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5
                                 rounded-full text-sm font-bold text-neutral-950 tracking-wide
                                 bg-amber-400 hover:bg-amber-300 transition-all duration-300 hover:scale-105
                                 shadow-lg shadow-amber-400/15 focus:outline-none"
                    >
                      Explore Treatments
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                    <button
                      onClick={() => switchTab("book")}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5
                                 rounded-full text-sm font-semibold text-amber-400 tracking-wide
                                 border border-amber-400/40 hover:bg-amber-400/10 hover:border-amber-400/70
                                 transition-all duration-300 hover:scale-105 focus:outline-none"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </section>

              <div className="h-px w-full bg-amber-400/10" />

              {/* Featured treatments */}
              <section className="py-24 bg-neutral-950">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <p className="text-xs font-medium tracking-[0.22em] uppercase text-amber-400 mb-4">
                      Signature Services
                    </p>
                    <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                      Our Most Loved Treatments
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      { icon: <Sparkles size={15} className="text-amber-400" />, title: "Botox & Injectables", desc: "Precision neurotoxin and filler treatments tailored to your unique anatomy and aesthetic vision.", price: "From $350" },
                      { icon: <Leaf     size={15} className="text-amber-400" />, title: "HydraFacial",         desc: "Deep cleanse, extract, and infuse — leaving skin instantly glowing, plumped, and refreshed.", price: "From $175" },
                      { icon: <Heart    size={15} className="text-amber-400" />, title: "IV Wellness Therapy", desc: "Custom nutrient infusions to boost energy, immunity, and radiance from the inside out.", price: "From $180" },
                    ].map(({ icon, title, desc, price }) => (
                      <div
                        key={title}
                        className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-7 cursor-pointer
                                   hover:border-amber-400/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50
                                   transition-all duration-300"
                        onClick={() => switchTab("treatments")}
                      >
                        <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/20
                                        flex items-center justify-center mb-5
                                        group-hover:bg-amber-400/20 transition-colors duration-300">
                          {icon}
                        </div>
                        <h3 className="text-base font-semibold text-white mb-2.5 tracking-tight">{title}</h3>
                        <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">{desc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                          <span className="text-sm font-semibold text-amber-400">{price}</span>
                          <ChevronRight size={14} className="text-neutral-700 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all duration-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div className="h-px w-full bg-amber-400/10" />

              {/* Partner logos */}
              <section className="py-16 bg-neutral-950">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                  <p className="text-center text-[10px] font-medium tracking-[0.28em] uppercase text-neutral-500 mb-10">
                    Authorized Partner &amp; Certified Provider
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Allergan","HydraFacial","SkinMedica","CoolSculpting"].map((brand) => (
                      <div
                        key={brand}
                        className="group flex items-center justify-center px-5 py-5
                                   border border-neutral-800 rounded-xl bg-neutral-900 cursor-default
                                   hover:border-amber-400/30 transition-all duration-300"
                      >
                        <span className="text-sm font-semibold tracking-wide text-neutral-400
                                         group-hover:text-amber-400 transition-colors duration-300">
                          {brand}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div className="h-px w-full bg-amber-400/10" />

              {/* Stats */}
              <section className="py-20 bg-neutral-950">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                    {[
                      { value: "2,400+", label: "Clients Served"      },
                      { value: "98%",    label: "Satisfaction Rate"   },
                      { value: "8+",     label: "Years of Excellence" },
                      { value: "12",     label: "Expert Providers"    },
                    ].map(({ value, label }) => (
                      <div key={label}>
                        <p className="text-4xl md:text-5xl font-light text-amber-400 mb-2.5 tabular-nums">{value}</p>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Gold CTA strip */}
              <section className="py-20 bg-amber-400">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-900/50 mb-5">
                    Begin Your Journey
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light text-neutral-950 tracking-tight mb-5">
                    Your most radiant self awaits.
                  </h2>
                  <p className="text-neutral-800/60 font-light leading-relaxed mb-10 text-lg max-w-xl mx-auto">
                    Complimentary consultations with our board-certified practitioners.
                    No commitment required.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => switchTab("book")}
                      className="inline-flex items-center justify-center gap-2.5 px-9 py-4
                                 rounded-full text-sm font-bold text-amber-400 bg-neutral-950
                                 hover:bg-neutral-900 transition-all duration-300 hover:scale-105
                                 shadow-xl shadow-neutral-950/30"
                    >
                      Book Free Consultation
                      <ArrowRight size={14} />
                    </button>
                    <button
                      onClick={() => switchTab("treatments")}
                      className="inline-flex items-center justify-center gap-2 px-9 py-4
                                 rounded-full text-sm font-semibold text-neutral-950
                                 border border-neutral-950/20 hover:bg-neutral-950/10 hover:border-neutral-950/40
                                 transition-all duration-300 hover:scale-105"
                    >
                      View All Treatments
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ── TREATMENTS ──────────────────────────────────────────── */}
          {activeTab === "treatments" && (
            <section className="py-24 bg-neutral-950">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-14">
                  <p className="text-xs font-medium tracking-[0.22em] uppercase text-amber-400 mb-4">
                    Our Services
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-5">
                    Curated Treatments
                  </h2>
                  <p className="text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
                    Every treatment is performed by board-certified practitioners using the most
                    advanced techniques and medical-grade products available.
                  </p>
                </div>

                {/* Category pills */}
                <div className="flex justify-center gap-3 mb-12">
                  {(["face","body","wellness"] as TreatCategory[]).map((id) => (
                    <button
                      key={id}
                      onClick={() => switchTreat(id)}
                      className={`px-7 py-2.5 rounded-full text-sm font-medium tracking-wide capitalize
                                  transition-all duration-300
                                  ${treatCat === id
                                    ? "bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-400/20"
                                    : "border border-neutral-700 text-neutral-200 hover:border-amber-400/40 hover:text-amber-400"
                                  }`}
                    >
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Treatment grid */}
                <div key={treatKey} className="ae-treat-enter grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {TREAT_DATA[treatCat].map((t) => (
                    <TreatCard key={t.title} {...t} onBook={() => switchTab("book")} />
                  ))}
                </div>

                {/* Soft CTA card */}
                <div className="mt-16 p-10 border border-amber-400/15 rounded-2xl bg-neutral-900 text-center">
                  <p className="text-xs font-medium tracking-[0.22em] uppercase text-amber-400 mb-3">
                    Personalized Care
                  </p>
                  <h3 className="text-2xl font-light text-white mb-3">Not sure where to start?</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-7 max-w-sm mx-auto font-light">
                    Our practitioners will guide you to the treatments best suited for your
                    unique skin type, goals, and lifestyle.
                  </p>
                  <button
                    onClick={() => switchTab("book")}
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3
                               rounded-full text-sm font-bold text-neutral-950
                               bg-amber-400 hover:bg-amber-300 transition-all duration-300 hover:scale-105
                               shadow-lg shadow-amber-400/15"
                  >
                    Book a Free Consultation
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── RESULTS ─────────────────────────────────────────────── */}
          {activeTab === "results" && (
            <section className="py-24 bg-neutral-950">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                  <p className="text-xs font-medium tracking-[0.22em] uppercase text-amber-400 mb-4">
                    Client Transformations
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                    Real Results, Real People
                  </h2>
                </div>

                {/* Before/After placeholders */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                  {[
                    { label: "Botox & Filler",      sub: "12-week result"     },
                    { label: "HydraFacial Series",  sub: "6-treatment result" },
                    { label: "CoolSculpting Elite", sub: "16-week result"     },
                  ].map(({ label, sub }) => (
                    <div key={label} className="group">
                      <div className="aspect-[4/5] rounded-2xl border border-neutral-800 overflow-hidden mb-4
                                      bg-gradient-to-b from-neutral-900 to-neutral-800
                                      flex items-center justify-center
                                      hover:border-amber-400/30 hover:shadow-xl hover:shadow-black/60
                                      transition-all duration-300">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20
                                          flex items-center justify-center mx-auto mb-3">
                            <Sparkles size={18} className="text-amber-400" />
                          </div>
                          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-700">
                            Before / After
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-neutral-200 text-center tracking-tight">{label}</p>
                      <p className="text-xs text-neutral-400 text-center mt-0.5 font-light">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Gold divider */}
                <div className="flex items-center gap-6 mb-20">
                  <div className="flex-1 h-px bg-amber-400/15" />
                  <Sparkles size={13} className="text-amber-400/40 flex-shrink-0" />
                  <div className="flex-1 h-px bg-amber-400/15" />
                </div>

                {/* Testimonials */}
                <div className="text-center mb-14">
                  <p className="text-xs font-medium tracking-[0.22em] uppercase text-amber-400 mb-4">
                    Client Stories
                  </p>
                  <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                    What Our Clients Say
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { name: "Camille R.", location: "New York, NY",    rating: 5, body: "Luna has completely transformed how I see myself. The results are extraordinary and the experience is unlike anywhere else — pure luxury at every visit." },
                    { name: "Sophia K.",  location: "Greenwich, CT",   rating: 5, body: "I've been to many medspas but Luna is on another level entirely. The practitioners genuinely listen and the results speak for themselves. Absolutely worth every penny." },
                    { name: "Natalie M.", location: "Westchester, NY", rating: 5, body: "The HydraFacial series changed my skin completely. After years of struggling with texture and dullness, I finally have the radiant complexion I always dreamed of." },
                  ].map(({ name, location, rating, body }) => (
                    <div
                      key={name}
                      className="p-7 border border-neutral-800 rounded-2xl bg-neutral-900
                                 hover:border-amber-400/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40
                                 transition-all duration-300"
                    >
                      <StarRow count={rating} />
                      <p className="text-neutral-300 text-sm leading-relaxed mt-5 mb-6 font-light italic">
                        &ldquo;{body}&rdquo;
                      </p>
                      <div className="pt-4 border-t border-neutral-800">
                        <p className="text-sm font-semibold text-white tracking-tight">{name}</p>
                        <p className="text-xs text-neutral-400 mt-0.5 font-light">{location}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-14 text-center">
                  <button
                    onClick={() => switchTab("book")}
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5
                               rounded-full text-sm font-bold text-neutral-950
                               bg-amber-400 hover:bg-amber-300 transition-all duration-300 hover:scale-105
                               shadow-lg shadow-amber-400/15 focus:outline-none"
                  >
                    Start Your Transformation
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── ABOUT ───────────────────────────────────────────────── */}
          {activeTab === "about" && (
            <section className="py-24 bg-neutral-950">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                  {/* Image placeholder */}
                  <div className="aspect-[4/5] bg-gradient-to-b from-neutral-900 to-neutral-800
                                  rounded-2xl border border-neutral-800 flex items-center justify-center
                                  shadow-2xl shadow-black/60 overflow-hidden">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20
                                      flex items-center justify-center mx-auto mb-4">
                        <Heart size={26} className="text-amber-400" />
                      </div>
                      <p className="text-xs font-light tracking-[0.3em] uppercase text-neutral-700">
                        Luna Wellness
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-xs font-medium tracking-[0.22em] uppercase text-amber-400 mb-5">
                      Our Story
                    </p>
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6 leading-[1.08]">
                      Beauty meets{" "}
                      <em className="not-italic text-amber-400">science.</em>
                    </h2>
                    <p className="text-neutral-200 leading-relaxed mb-4 font-light">
                      Founded in 2016, Luna Wellness &amp; MedSpa was built with a singular
                      vision: to offer medical-grade results within an environment that feels
                      like a private sanctuary rather than a clinical office.
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-10 font-light text-sm">
                      Every provider at Luna is board-certified and specializes in aesthetic
                      medicine and integrative wellness. We believe that true beauty is an
                      expression of health — and we treat the whole person, not just the surface.
                    </p>

                    <div className="space-y-3 mb-10">
                      {[
                        { title: "Board-Certified Practitioners", body: "Every treatment is performed or directly supervised by licensed medical professionals with aesthetic specialization." },
                        { title: "Personalized Treatment Plans",  body: "We build custom protocols around your unique anatomy, skin concerns, goals, and lifestyle — never one-size-fits-all." },
                        { title: "Results You Can Trust",         body: "Our 98% satisfaction rate reflects our commitment to natural, harmonious outcomes that enhance without altering." },
                      ].map(({ title, body }) => (
                        <div
                          key={title}
                          className="flex gap-4 p-5 border border-neutral-800 rounded-xl bg-neutral-900
                                     hover:border-amber-400/25 hover:shadow-lg hover:shadow-black/30
                                     transition-all duration-300"
                        >
                          <CheckCircle2 size={15} className="flex-shrink-0 text-amber-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-white mb-1 tracking-tight">{title}</p>
                            <p className="text-xs text-neutral-300 leading-relaxed font-light">{body}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => switchTab("book")}
                      className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5
                                 rounded-full text-sm font-bold text-neutral-950
                                 bg-amber-400 hover:bg-amber-300 transition-all duration-300 hover:scale-105
                                 shadow-lg shadow-amber-400/15"
                    >
                      Book a Consultation
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── BOOK ────────────────────────────────────────────────── */}
          {activeTab === "book" && (
            <section className="py-24 bg-neutral-950">
              <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-14">
                  <p className="text-xs font-medium tracking-[0.22em] uppercase text-amber-400 mb-4">
                    Begin Your Journey
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-5">
                    Book a Consultation
                  </h2>
                  <p className="text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                    Your first consultation is always complimentary. A dedicated practitioner
                    will assess your goals and design a personalized treatment plan.
                  </p>
                </div>

                {/* ── Steps 1 & 2: Calendar + Time Slots ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

                  {/* Calendar */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-5
                                  flex items-center gap-2">
                      <CalIcon size={11} /> Step 1 — Select a Date
                    </p>

                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={goToPrevMonth}
                        disabled={isPrevDisabled}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                          ${isPrevDisabled
                            ? "text-neutral-800 cursor-not-allowed"
                            : "text-neutral-400 hover:text-amber-400 hover:bg-neutral-800"
                          }`}
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <span key={`hdr-${calKey}`} className="ae-cal-enter text-sm font-semibold text-white tracking-wide">
                        {MONTH_NAMES[calMonthIdx]} {calYear}
                      </span>
                      <button
                        onClick={goToNextMonth}
                        className="w-8 h-8 rounded-lg flex items-center justify-center
                                   text-neutral-400 hover:text-amber-400 hover:bg-neutral-800
                                   transition-all duration-200"
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>

                    {/* Day-of-week headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAY_ABBR.map((d) => (
                        <div
                          key={d}
                          className={`text-center text-[10px] font-bold uppercase tracking-wider py-1.5
                            ${d === "Su" ? "text-neutral-700" : "text-neutral-400"}`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Day grid */}
                    <div key={`grid-${calKey}`} className="ae-cal-enter grid grid-cols-7 gap-y-0.5">
                      {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`off-${i}`} />)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day      = i + 1;
                        const disabled = isDayDisabled(day);
                        const today_c  = isDayToday(day);
                        const selected = isDaySelected(day);
                        const isSun    = new Date(calYear, calMonthIdx, day).getDay() === 0;
                        return (
                          <button
                            key={day}
                            disabled={disabled}
                            onClick={() => {
                              if (!disabled) {
                                setSelectedDate(new Date(calYear, calMonthIdx, day));
                                setSelectedTime(null);
                              }
                            }}
                            className={`
                              aspect-square rounded-lg text-xs font-medium flex items-center justify-center
                              transition-all duration-150 focus:outline-none
                              ${selected
                                ? "bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/30"
                                : disabled
                                  ? isSun
                                    ? "text-neutral-800 cursor-not-allowed line-through decoration-neutral-800"
                                    : "text-neutral-800 cursor-not-allowed"
                                  : today_c
                                    ? "ring-1 ring-amber-400/60 text-amber-400 hover:bg-amber-400 hover:text-neutral-950 cursor-pointer"
                                    : "text-neutral-200 hover:bg-neutral-800 hover:text-amber-400 cursor-pointer"
                              }
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-5 mt-5 pt-5 border-t border-neutral-800">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-amber-400" />
                        <span className="text-[10px] text-neutral-400">Selected</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded ring-1 ring-amber-400/60" />
                        <span className="text-[10px] text-neutral-400">Today</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-neutral-800 flex items-center justify-center">
                          <span className="text-[8px] text-neutral-600 line-through">S</span>
                        </div>
                        <span className="text-[10px] text-neutral-400">Closed</span>
                      </div>
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-5
                                  flex items-center gap-2">
                      <Clock size={11} /> Step 2 — Select a Time
                    </p>

                    {!selectedDate ? (
                      <div className="flex flex-col items-center justify-center h-52 text-center">
                        <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/15
                                        flex items-center justify-center mb-4">
                          <CalIcon size={17} className="text-amber-400/40" />
                        </div>
                        <p className="text-sm text-neutral-400 font-light">
                          Please select a date first
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-neutral-300 mb-5 font-light">
                          Available times for{" "}
                          <span className="text-amber-400 font-medium">
                            {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()},{" "}
                            {selectedDate.getFullYear()}
                          </span>
                        </p>
                        <div className="grid grid-cols-2 gap-2.5">
                          {TIME_SLOTS.map((time) => {
                            const booked = unavailableSlots.includes(time);
                            const active = selectedTime === time;
                            return (
                              <button
                                key={time}
                                disabled={booked}
                                onClick={() => setSelectedTime(active ? null : time)}
                                className={`
                                  py-2.5 px-3 rounded-xl text-xs font-medium text-center
                                  border transition-all duration-200 focus:outline-none
                                  ${active
                                    ? "bg-amber-400 border-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/25"
                                    : booked
                                      ? "border-neutral-800 text-neutral-600 cursor-not-allowed opacity-40"
                                      : "border-neutral-700 text-neutral-200 hover:border-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 cursor-pointer"
                                  }
                                `}
                              >
                                {time}
                                {booked && <span className="block text-[9px] text-neutral-500 font-normal">Booked</span>}
                              </button>
                            );
                          })}
                        </div>

                        {selectedTime && (
                          <div className="mt-5 p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20">
                            <p className="text-xs text-amber-400 text-center font-medium">
                              ✓ &nbsp;{MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()} at {selectedTime} — reserved for you
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* ── Step 3: Details form ── */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 lg:p-12">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-8">
                    Step 3 — Your Details
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
                    {/* Contact info */}
                    <div className="space-y-5">
                      {[
                        { icon: <Phone  size={12} className="text-amber-400" />, label: "Phone",    value: "(212) 555-0183"                    },
                        { icon: <Mail   size={12} className="text-amber-400" />, label: "Email",    value: "hello@lunawellness.com"            },
                        { icon: <MapPin size={12} className="text-amber-400" />, label: "Location", value: "980 Fifth Avenue\nNew York, NY 10021" },
                        { icon: <Clock  size={12} className="text-amber-400" />, label: "Hours",    value: "Mon–Sat  9 AM – 7 PM"             },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex gap-3 items-start">
                          <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/15
                                          flex items-center justify-center flex-shrink-0 mt-0.5">
                            {icon}
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">
                              {label}
                            </p>
                            <p className="text-sm text-neutral-100 whitespace-pre-line leading-snug font-light">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <form className="lg:col-span-2 space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: "First Name", placeholder: "Camille", type: "text" },
                          { label: "Last Name",  placeholder: "Roberts", type: "text" },
                        ].map(({ label, placeholder, type }) => (
                          <div key={label}>
                            <label className="block text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5">
                              {label}
                            </label>
                            <input type={type} placeholder={placeholder} className={inputCls} />
                          </div>
                        ))}
                      </div>

                      {[
                        { label: "Email Address", placeholder: "camille@email.com", type: "email" },
                        { label: "Phone Number",  placeholder: "(212) 000-0000",    type: "tel"   },
                      ].map(({ label, placeholder, type }) => (
                        <div key={label}>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5">
                            {label}
                          </label>
                          <input type={type} placeholder={placeholder} className={inputCls} />
                        </div>
                      ))}

                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                          Area of Interest
                        </label>
                        <select className={inputCls}>
                          <option value="">Select a treatment area...</option>
                          <option>Botox &amp; Injectables</option>
                          <option>HydraFacial</option>
                          <option>Chemical Peels</option>
                          <option>Microneedling</option>
                          <option>CoolSculpting Elite</option>
                          <option>IV Wellness Therapy</option>
                          <option>Hormone Balancing</option>
                          <option>Not sure — need guidance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-neutral-600 mb-1.5">
                          Your Goals
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us about your skin concerns and aesthetic goals..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="group w-full inline-flex items-center justify-center gap-2.5
                                     px-8 py-4 rounded-full text-sm font-bold text-neutral-950 tracking-wide
                                     bg-amber-400 hover:bg-amber-300 transition-all duration-300 hover:scale-[1.01]
                                     shadow-lg shadow-amber-400/15 focus:outline-none"
                        >
                          {selectedDate && selectedTime
                            ? `Confirm — ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()} at ${selectedTime}`
                            : "Request My Consultation"
                          }
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                        </button>
                        <p className="text-center text-xs text-neutral-500 mt-3 font-light tracking-wide">
                          Complimentary · Confidential · No Obligation
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* ══ FOOTER ══════════════════════════════════════════════════ */}
        <footer className="bg-black border-t border-amber-400/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">
              {/* Brand */}
              <div>
                <p className="text-xl font-bold tracking-[0.32em] text-white leading-none mb-1">LUNA</p>
                <p className="text-[10px] font-light tracking-[0.48em] text-amber-400 uppercase leading-none mb-6">
                  Wellness &amp; MedSpa
                </p>
                <p className="text-neutral-300 text-sm leading-relaxed font-light max-w-xs">
                  A sanctuary for aesthetic medicine and integrative wellness — dedicated
                  to revealing your natural radiance through science and care.
                </p>
              </div>

              {/* Treatments */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-6">
                  Treatments
                </p>
                <ul className="space-y-3.5 text-sm">
                  {["Botox & Injectables","HydraFacial","Chemical Peels","CoolSculpting","IV Therapy"].map((t) => (
                    <li key={t}>
                      <button
                        onClick={() => switchTab("treatments")}
                        className="text-neutral-300 hover:text-amber-400 transition-colors duration-200 font-light"
                      >
                        {t}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-6">
                  Visit Us
                </p>
                <ul className="space-y-3.5 text-sm font-light">
                  <li>
                    <a href="tel:+12125550183"
                       className="text-white text-base font-semibold tracking-wide hover:text-amber-400 transition-colors duration-200">
                      (212) 555-0183
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@lunawellness.com"
                       className="text-neutral-300 hover:text-amber-400 transition-colors duration-200">
                      hello@lunawellness.com
                    </a>
                  </li>
                  <li className="text-neutral-300">980 Fifth Avenue, New York, NY 10021</li>
                  <li className="text-neutral-300">Mon–Sat &nbsp;9 AM – 7 PM</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center
                            justify-between gap-4 text-xs font-light">
              <p className="text-neutral-400">&copy; {new Date().getFullYear()} Luna Wellness &amp; MedSpa. All rights reserved.</p>
              <div className="flex gap-6">
                <button className="text-neutral-400 hover:text-amber-400 transition-colors duration-200">Privacy Policy</button>
                <button className="text-neutral-400 hover:text-amber-400 transition-colors duration-200">Terms of Service</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
