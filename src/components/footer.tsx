"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Camera,
  Scan,
  Cpu,
  Database,
  Webhook,
} from "lucide-react";
import { useWebSettings } from "./web-settings/WebSettingsProvider";
import {
  FALLBACK_SETTINGS,
  presentSocials,
} from "@/services/web-settings.service";

/* ── Social icons ── */
interface BrandIconProps {
  className?: string;
}
const LinkedInIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);
const YoutubeIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const FacebookIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const TwitterIcon = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
} as const;

/* ── Nav data ── */
const productLinks = [
  { label: "Guide", href: "/guide" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Reliability", href: "/#reliability" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

const ctasLinks = [
  { label: "Official Website", href: "https://www.ctasis.com/" },
  { label: "About CTAS", href: "https://www.ctasis.com/about-us" },
  { label: "Services", href: "https://www.ctasis.com/services" },
  { label: "Careers", href: "https://www.ctasis.com/careers" },
  { label: "Contact Us", href: "https://www.ctasis.com/contact-us" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security & SOC 2", href: "/privacy#security" },
];

/* ── Scanner illustration bars ── */
const SCANNER_BARS: Array<{ w: string; d: string }> = [
  { w: "3px", d: "0ms" },
  { w: "5px", d: "40ms" },
  { w: "2px", d: "80ms" },
  { w: "6px", d: "120ms" },
  { w: "2px", d: "160ms" },
  { w: "4px", d: "200ms" },
  { w: "2px", d: "240ms" },
  { w: "3px", d: "280ms" },
  { w: "5px", d: "320ms" },
  { w: "2px", d: "360ms" },
  { w: "3px", d: "400ms" },
  { w: "6px", d: "440ms" },
  { w: "2px", d: "480ms" },
  { w: "4px", d: "520ms" },
  { w: "3px", d: "560ms" },
];

/* ── Product Pipeline Flow ── */
const PIPELINE_STEPS = [
  {
    step: "01",
    label: "Open Camera",
    desc: "HD Stream Capture",
    icon: Camera,
  },
  {
    step: "02",
    label: "Scan Barcode",
    desc: "Auto-Detect & Focus",
    icon: Scan,
  },
  {
    step: "03",
    label: "Decode (<20ms)",
    desc: "High-Speed WASM Engine",
    icon: Cpu,
  },
  {
    step: "04",
    label: "Store in DB",
    desc: "Encrypted Cloud Sync",
    icon: Database,
  },
  {
    step: "05",
    label: "Webhook Event",
    desc: "Real-Time Data Push",
    icon: Webhook,
  },
];

/* ── Social Platform Config ── */
const SOCIAL_CONFIG = [
  {
    id: "linkedin" as const,
    hoverStyle:
      "hover:border-[#0A66C2] hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:shadow-[0_0_14px_rgba(10,102,194,0.45)]",
  },
  {
    id: "youtube" as const,
    hoverStyle:
      "hover:border-[#FF0000] hover:bg-[#FF0000]/20 hover:text-[#FF0000] hover:shadow-[0_0_14px_rgba(255,0,0,0.45)]",
  },
  {
    id: "facebook" as const,
    hoverStyle:
      "hover:border-[#1877F2] hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:shadow-[0_0_14px_rgba(24,119,242,0.45)]",
  },
  {
    id: "instagram" as const,
    hoverStyle:
      "hover:border-[#E4405F] hover:bg-[#E4405F]/20 hover:text-[#E4405F] hover:shadow-[0_0_14px_rgba(228,64,95,0.45)]",
  },
  {
    id: "twitter" as const,
    hoverStyle:
      "hover:border-white hover:bg-white/20 hover:text-white hover:shadow-[0_0_14px_rgba(255,255,255,0.4)]",
  },
] as const;

/* ── Helpers ── */
function NavLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");
  const cls =
    "flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors duration-150 group";
  const inner = (
    <>
      <span className="text-[#3C9AC4]/60 group-hover:text-[#3C9AC4] transition-colors">
        ›
      </span>
      {label}
    </>
  );
  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ── Component ── */
export default function Footer() {
  const { settings } = useWebSettings();
  const s = settings ?? FALLBACK_SETTINGS;

  const companyName = s.company.name || FALLBACK_SETTINGS.company.name;
  const tagline = s.company.tagline || FALLBACK_SETTINGS.company.tagline;
  const about = s.company.about || s.footer.about || "";
  const socials = presentSocials(s.social);
  const showSocials = s.footer.show_social !== false && socials.length > 0;
  const copyright =
    s.footer.copyright_text || FALLBACK_SETTINGS.footer.copyright_text;
  const email = s.footer.show_contact !== false ? s.contact.email : "";
  const phone = s.footer.show_contact !== false ? s.contact.phone : "";
  const address = s.footer.show_address !== false ? s.contact.address : "";
  const workingHours =
    s.footer.show_working_hours !== false ? s.contact.working_hours : "";

  return (
    <footer className="bg-[#07111E] text-white">
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#3C9AC4]/40 to-transparent" />

      {/* ── MAIN GRID ── */}
      <div className="px-5 sm:px-8 lg:px-[70px] pt-12 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* COL 1 — Brand + Contact (4 cols) */}
          <div className="md:col-span-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 w-fit mb-3">
              <Image
                src="/ctasis-logo_white.svg"
                alt={companyName}
                width={30}
                height={30}
                className="h-8 w-auto object-contain"
              />
              <span className="text-4xl font-bold font-outfit bg-gradient-to-r from-white via-[#8FE7FF] to-[#3C9AC4] bg-clip-text text-transparent">
                {companyName}
              </span>
            </Link>

            {tagline && (
              <p className="text-sm text-slate-300 leading-relaxed mb-1">
                {tagline}
              </p>
            )}
            {about && (
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {about}
              </p>
            )}

            {/* Contact */}
            <div className="flex flex-col gap-3 mt-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 group"
                >
                  <Mail className="w-4 h-4 text-[#3C9AC4] flex-shrink-0" />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {email}
                  </span>
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 group"
                >
                  <Phone className="w-4 h-4 text-[#3C9AC4] flex-shrink-0" />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {phone}
                  </span>
                </a>
              )}
              {address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 group"
                >
                  <MapPin className="w-4 h-4 text-[#3C9AC4] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors leading-snug">
                    {address}
                  </span>
                </a>
              )}
              {workingHours && (
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#3C9AC4] flex-shrink-0" />
                  <span className="text-sm text-slate-400">{workingHours}</span>
                </div>
              )}
            </div>
          </div>

          {/* COL 2 — ScanFlow links (2 cols) */}
          <div className="md:col-span-2">
            <p className="text-sm font-bold uppercase tracking-widest text-white mb-1">
              ScanFlow
            </p>
            <span className="block h-0.5 w-8 rounded-full bg-[#3C9AC4] mb-4" />
            <ul className="flex flex-col gap-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <NavLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — CTAS links (2 cols) */}
          <div className="md:col-span-2">
            <p className="text-sm font-bold uppercase tracking-widest text-white mb-1">
              CTAS
            </p>
            <span className="block h-0.5 w-8 rounded-full bg-[#3C9AC4] mb-4" />
            <ul className="flex flex-col gap-3">
              {ctasLinks.map((l) => (
                <li key={l.label}>
                  <NavLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — Legal links (2 cols) */}
          <div className="md:col-span-2">
            <p className="text-sm font-bold uppercase tracking-widest text-white mb-1">
              Legal
            </p>
            <span className="block h-0.5 w-8 rounded-full bg-[#3C9AC4] mb-4" />
            <ul className="flex flex-col gap-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <NavLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* COL 5 — Inline Scanner Illustration (2 cols) */}
          <div className="md:col-span-2 flex flex-col items-center justify-start gap-4">
            {/* Animated barcode scanner */}
            <div className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#3C9AC4]/20 bg-gradient-to-b from-[#0F2644]/80 to-[#07111E] px-5 py-6 w-full">
              {/* Ambient glow */}
              <div className="absolute inset-0 rounded-2xl bg-[#3C9AC4]/5 blur-xl pointer-events-none" />

              {/* Barcode + scan frame */}
              <div
                className="relative flex items-center justify-center"
                style={{ width: "148px", height: "72px" }}
              >
                {/* Scan corners */}
                {[
                  ["top-0 left-0", "border-r-0 border-b-0 rounded-tl-md"],
                  ["top-0 right-0", "border-l-0 border-b-0 rounded-tr-md"],
                  ["bottom-0 left-0", "border-r-0 border-t-0 rounded-bl-md"],
                  ["bottom-0 right-0", "border-l-0 border-t-0 rounded-br-md"],
                ].map(([pos, borders], i) => (
                  <span
                    key={i}
                    className={`absolute w-4 h-4 border-2 border-[#3C9AC4]/80 ${pos} ${borders}`}
                  />
                ))}

                {/* Barcode bars */}
                <div className="flex items-center gap-[3px] h-[56px] z-10">
                  {SCANNER_BARS.map((bar, i) => (
                    <span
                      key={i}
                      style={{
                        width: bar.w,
                        height: "100%",
                        display: "block",
                        borderRadius: "1px",
                        background:
                          "linear-gradient(180deg,#13355A 0%,#3C9AC4 100%)",
                        transformOrigin: "center",
                        animation: `footerBarRise 2.2s cubic-bezier(0.65,0,0.35,1) ${bar.d} infinite`,
                      }}
                    />
                  ))}
                </div>

                {/* Scan line */}
                <span
                  style={{
                    position: "absolute",
                    left: "6%",
                    right: "6%",
                    height: "2px",
                    borderRadius: "2px",
                    background: "#0ea5e9",
                    boxShadow:
                      "0 0 8px 1.5px rgba(14,165,233,0.85), 0 0 18px 4px rgba(14,165,233,0.45)",
                    animation:
                      "footerScanSweep 2.2s cubic-bezier(0.65,0,0.35,1) infinite",
                  }}
                />
              </div>

              {/* Label */}
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3C9AC4]/70 text-center">
                Scanning...
              </p>

              {/* CTA */}
              <Link
                href="/guide"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-[#3C9AC4]/20 hover:bg-[#3C9AC4]/40 border border-[#3C9AC4]/30 rounded-lg px-3 py-1.5 transition-colors"
              >
                Get Started <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Keyframe styles */}
            <style>{`
              @keyframes footerBarRise {
                0%,100% { transform: scaleY(0.55); background: linear-gradient(180deg,#13355A 0%,#3C9AC4 100%); }
                45%      { transform: scaleY(0.55); }
                52%      { transform: scaleY(1);    background: linear-gradient(180deg,#0ea5e9 0%,#7dd3fc 100%); }
                60%      { transform: scaleY(0.55); background: linear-gradient(180deg,#13355A 0%,#3C9AC4 100%); }
              }
              @keyframes footerScanSweep {
                0%     { top: 8%;  opacity: 0; }
                8%     {           opacity: 1; }
                50%    { top: 88%; opacity: 1; }
                58%    {           opacity: 0; }
                58.01% { top: 8%;             }
                66%    {           opacity: 1; }
                100%   { top: 8%;  opacity: 1; }
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* ── ARCHITECTURE PIPELINE FLOW STRIP ── */}
      <div className="border-t border-slate-800/80 bg-[#050D18]/80 px-5 sm:px-8 lg:px-[70px] py-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3C9AC4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3C9AC4]"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8FE7FF]">
                ScanFlow End-to-End Pipeline
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
              Camera ➔ Scan ➔ Decode ➔ Storage ➔ Webhook
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="group relative flex items-center gap-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-[#3C9AC4]/50 p-2.5 sm:p-3 transition-all duration-200 shadow-sm"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#3C9AC4]/10 border border-[#3C9AC4]/30 text-[#3C9AC4] group-hover:bg-[#3C9AC4] group-hover:text-[#07111E] transition-all duration-200">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#3C9AC4]">
                        {step.step}
                      </span>
                      <p className="text-xs font-semibold text-white truncate">
                        {step.label}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {step.desc}
                    </p>
                  </div>
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center pointer-events-none">
                      <span className="h-3.5 w-3.5 flex items-center justify-center rounded-full bg-[#07111E] text-slate-500 border border-slate-800 text-[9px] font-bold">
                        ›
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-slate-700/50">
        <div className="px-5 sm:px-8 lg:px-[70px] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-sm text-slate-400">{copyright}</p>
            <span className="hidden sm:block text-slate-600">•</span>
            <p className="text-sm text-slate-500">
              Barcode Scanning Solutions&nbsp;
              <span className="text-slate-600">•</span>&nbsp; Operated by{" "}
              <a
                href="https://www.ctasis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3C9AC4] hover:text-white transition-colors font-medium"
              >
                CTAS Info Services LLP
              </a>
            </p>
          </div>

          {/* Right — stylish glowing social icons (server-driven, toggle-gated) */}
          {showSocials && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:inline">
                Follow us
              </span>
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                {SOCIAL_CONFIG.map(({ id, hoverStyle }) => {
                  const SocialIcon = SOCIAL_ICONS[id];
                  const href = socials.find((s) => s.id === id)?.href;

                  return href ? (
                    <a
                      key={id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={id}
                      className={`relative flex size-8 items-center justify-center rounded-lg border border-slate-800/80 bg-slate-900/60 text-slate-400 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 ${hoverStyle}`}
                    >
                      <SocialIcon className="h-4 w-4" />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
