"use client";

import TemplateProfessional from "./TemplateProfessional";
import TemplateArtisan      from "./TemplateArtisan";
import TemplateAesthetic    from "./TemplateAesthetic";
import TemplateModernist    from "./TemplateModernist";

/*
  ┌─────────────────────────────────────────────────────────────────┐
  │  TEMPLATE SWITCHER                                              │
  │  Change the component below to preview a different template.    │
  │                                                                 │
  │  TemplateProfessional  — Vanguard Legal Group  (Law Firm)       │
  │  TemplateArtisan       — Elite Air & Heat      (HVAC)           │
  │  TemplateAesthetic     — Luna Wellness & MedSpa (Luxury Spa)    │
  │  TemplateModernist     — Vault                 (SaaS / Storage) │
  └─────────────────────────────────────────────────────────────────┘
*/
export default function Home() {
  return <TemplateModernist />;
}
