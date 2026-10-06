"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useWebSettings } from "./web-settings/WebSettingsProvider";
import {
  FALLBACK_SETTINGS,
  presentSocials,
} from "@/services/web-settings.service";

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

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Use Cases", href: "/#use-cases" },
    { label: "Reliability", href: "/#reliability" },
    { label: "Pricing", href: "/pricing" },
    { label: "Guide", href: "/guide" },
  ],
  Developers: [
    { label: "Documentation", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Support", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Company: [
    { label: "About", href: "https://www.ctasis.com/about-us" },
    { label: "Blog", href: "https://www.ctasis.com/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security & SOC 2", href: "/privacy#security" },
  ],
};

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
} as const;

interface ContactEntry {
  icon: typeof Mail;
  label: string;
  href: string;
  display: string;
}

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

  const contactEntries: ContactEntry[] = [];
  if (s.footer.show_contact !== false && s.contact.email) {
    contactEntries.push({
      icon: Mail,
      label: "Email",
      href: `mailto:${s.contact.email}`,
      display: s.contact.email,
    });
  }
  if (s.footer.show_contact !== false && s.contact.phone) {
    contactEntries.push({
      icon: Phone,
      label: "Phone",
      href: `tel:${s.contact.phone.replace(/\s+/g, "")}`,
      display: s.contact.phone,
    });
  }
  if (s.footer.show_address !== false && s.contact.address) {
    const query = encodeURIComponent(s.contact.address);
    contactEntries.push({
      icon: MapPin,
      label: "Address",
      href: `https://maps.google.com/?q=${query}`,
      display: s.contact.address,
    });
  }
  if (s.footer.show_working_hours !== false && s.contact.working_hours) {
    contactEntries.push({
      icon: Clock,
      label: "Working hours",
      href: "",
      display: s.contact.working_hours,
    });
  }

  return (
    <footer className="relative bg-slate-900 text-white pt-16 pb-10 overflow-hidden">
      <div className="px-5 sm:px-8 lg:px-[70px]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <Image
                src="/ctasis-logo_white.svg"
                alt={companyName}
                width={150}
                height={56}
                className="h-14 w-auto object-contain"
              />
              <span className="text-[1.8rem] font-bold tracking-tight font-outfit bg-gradient-to-r from-white via-[#8FE7FF] to-[#3C9AC4] bg-clip-text text-transparent break-words">
                {companyName}
              </span>
            </Link>

            {tagline && (
              <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
                {tagline}
              </p>
            )}

            {about && (
              <p className="text-sm text-slate-400 leading-relaxed max-w-[220px] mt-3">
                {about}
              </p>
            )}

            {showSocials && (
              <div className="mt-5 flex items-center gap-3">
                {socials.map((social) => {
                  const SocialIcon = SOCIAL_ICONS[social.id];
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.id}
                      className="flex size-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 transition-colors hover:border-[#3C9AC4] hover:text-[#3C9AC4]"
                    >
                      <SocialIcon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}

            <div className="mt-5 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#3C9AC4] animate-pulse" />
              <span className="text-xs text-[#3C9AC4] font-mono">
                99.9% uptime SLA
              </span>
            </div>

            {contactEntries.length > 0 && (
              <div className="mt-6 flex flex-col gap-2.5 border-t border-slate-800 pt-5">
                {contactEntries.map((entry) => {
                  const EntryIcon = entry.icon;
                  const inner = (
                    <>
                      <EntryIcon className="h-3.5 w-3.5 shrink-0 text-[#3C9AC4] mt-0.5" />
                      <span className="text-xs text-slate-400 leading-relaxed">
                        {entry.display}
                      </span>
                    </>
                  );
                  return entry.href ? (
                    <a
                      key={entry.label}
                      href={entry.href}
                      className="flex items-start gap-2 transition-colors hover:text-[#3C9AC4]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span
                      key={entry.label}
                      className="flex items-start gap-2 text-slate-400"
                    >
                      {inner}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white text-base">
                {category}
                <span className="mt-2 block h-0.5 w-6 rounded-full bg-gradient-to-r from-[#3C9AC4] to-[#6BC1E0]" />
              </h4>
              <ul className="space-y-3 mt-4">
                {links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center text-slate-400 hover:text-[#3C9AC4] transition-colors text-sm"
                        >
                          <span className="text-[#3C9AC4] mr-1.5 transition-transform group-hover:translate-x-0.5">
                            ›
                          </span>
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="group flex items-center text-slate-400 hover:text-[#3C9AC4] transition-colors text-sm"
                        >
                          <span className="text-[#3C9AC4] mr-1.5 transition-transform group-hover:translate-x-0.5">
                            ›
                          </span>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">{copyright}</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-400">
              Made for warehouse-scale reliability
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3C9AC4]" />
              <span className="text-xs text-slate-400">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
