import { apiFetch } from "@/lib/api";
import type {
  WebSettings,
  WebSettingsApiResponse,
  WebSocialLinks,
} from "@/types";

// ── Web Settings ─────────────────────────────────────────────────────────────
//
// GET /web-settings (public, no auth). The API serves the persisted settings or
// its own defaults until the admin panel saves, so this content is the single
// source of truth for the site's company/contact/social/footer data.

/**
 * Copy shown everywhere on the site until the API answers. Kept identical to the
 * API's seed defaults so there is no flash of different content while loading
 * and the site still renders if the API is unreachable.
 */
export const FALLBACK_SETTINGS: WebSettings = {
  company: {
    name: "scanflow",
    website: "",
    tagline: "The world's fastest and most accurate barcode scanning engine.",
    about: "High-throughput barcode scanning for warehouse-scale operations.",
  },
  contact: {
    email: "info@ctasis.com",
    phone: "+91 7948993409",
    address:
      "A-865/866, Money Plant High Street, Jagatpur Rd, near BSNL Office, Gota, Gujarat 382470",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    postal_code: "382470",
    working_hours: "Mon – Fri, 10:00 AM – 8:00 PM IST",
    timezone: "Asia/Kolkata",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    twitter: "",
  },
  footer: {
    about: "",
    copyright_text: "© 2026 ScanFlow Technologies, Inc. All rights reserved.",
    show_social: true,
    show_contact: true,
    show_address: true,
    show_working_hours: true,
  },
};

/** Coerce every optional field to a string so the site never reads undefined. */
const normalize = (s: WebSettings): WebSettings => ({
  company: {
    name: s.company.name ?? "",
    website: s.company.website ?? "",
    tagline: s.company.tagline ?? "",
    about: s.company.about ?? "",
  },
  contact: {
    email: s.contact.email ?? "",
    phone: s.contact.phone ?? "",
    address: s.contact.address ?? "",
    city: s.contact.city ?? "",
    state: s.contact.state ?? "",
    country: s.contact.country ?? "",
    postal_code: s.contact.postal_code ?? "",
    working_hours: s.contact.working_hours ?? "",
    timezone: s.contact.timezone ?? "Asia/Kolkata",
  },
  social: {
    facebook: s.social.facebook ?? "",
    instagram: s.social.instagram ?? "",
    linkedin: s.social.linkedin ?? "",
    youtube: s.social.youtube ?? "",
    twitter: s.social.twitter ?? "",
  },
  footer: {
    about: s.footer.about ?? "",
    copyright_text: s.footer.copyright_text ?? "",
    show_social: s.footer.show_social ?? true,
    show_contact: s.footer.show_contact ?? true,
    show_address: s.footer.show_address ?? true,
    show_working_hours: s.footer.show_working_hours ?? true,
  },
});

// In-flight promise shared across nav, footer and contact page so the public
// settings endpoint is only hit once per page load.
let settingsPromise: Promise<WebSettings> | null = null;

export async function fetchWebSettings(): Promise<WebSettings> {
  if (!settingsPromise) {
    settingsPromise = apiFetch<WebSettingsApiResponse>("/web-settings", {
      method: "GET",
    }).then(({ data, error }) => {
      if (error || !data?.data?.webSettings) {
        return FALLBACK_SETTINGS;
      }
      return normalize(data.data.webSettings);
    });
  }
  return settingsPromise;
}

/** Resets the shared cache; used by the admin or tests after a save. */
export function resetWebSettingsCache(): void {
  settingsPromise = null;
}

/** Convenience typed accessor for the social profiles that actually have a URL. */
export type SocialLinkId =
  "linkedin" | "youtube" | "facebook" | "instagram" | "twitter";

export function presentSocials(
  social: WebSocialLinks,
): { id: SocialLinkId; href: string }[] {
  const entries: { id: SocialLinkId; href: string }[] = [];
  const links: [SocialLinkId, string][] = [
    ["linkedin", social.linkedin ?? ""],
    ["youtube", social.youtube ?? ""],
    ["facebook", social.facebook ?? ""],
    ["instagram", social.instagram ?? ""],
    ["twitter", social.twitter ?? ""],
  ];
  for (const [id, href] of links) {
    if (href.trim()) {
      entries.push({ id, href: href.trim() });
    }
  }
  return entries;
}
