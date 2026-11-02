import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js";

export const E164_REGEX = /^\+[1-9]\d{1,14}$/;
export const E164_MAX_LENGTH = 16;

/**
 * Checks if a string is a valid E.164 phone number.
 */
export function isValidE164(value?: string | null): boolean {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!E164_REGEX.test(trimmed)) return false;
  return isValidPhoneNumber(trimmed);
}

export type LivePhoneStatus =
  "empty" | "valid" | "too_short" | "too_long" | "invalid";

export interface LivePhoneValidation {
  isValid: boolean;
  status: LivePhoneStatus;
  message?: string;
}

/**
 * Validates a phone number in real-time as user types.
 * Returns exact status and helpful format guidance message.
 */
export function validatePhoneLive(
  value?: string | null,
  country?: CountryCode,
): LivePhoneValidation {
  if (!value || !value.trim()) {
    return { isValid: false, status: "empty" };
  }
  const trimmed = value.trim();
  if (!trimmed.startsWith("+")) {
    return {
      isValid: false,
      status: "invalid",
      message: "Phone number must start with country code (+)",
    };
  }

  const digitsOnly = trimmed.replace(/\D/g, "");
  // If only country dial code entered (e.g. +91, +1, +44)
  if (digitsOnly.length <= 3) {
    return {
      isValid: false,
      status: "too_short",
      message: "Please enter phone number digits",
    };
  }

  const lengthError = validatePhoneNumberLength(trimmed, country);
  if (lengthError === "TOO_SHORT") {
    return {
      isValid: false,
      status: "too_short",
      message: "Phone number is too short for selected country",
    };
  }
  if (lengthError === "TOO_LONG") {
    return {
      isValid: false,
      status: "too_long",
      message: "Phone number is too long for selected country",
    };
  }

  const valid = isValidPhoneNumber(trimmed, country);
  if (valid) {
    return {
      isValid: true,
      status: "valid",
      message: "Valid phone number format",
    };
  }

  return {
    isValid: false,
    status: "invalid",
    message: "Invalid phone number format for selected country",
  };
}

/**
 * Formats an E.164 phone number into an international readable string.
 * Example: `+919876543210` -> `+91 98765 43210`
 * If null, undefined, or empty -> `—`
 * If legacy/unparsable -> returns raw string
 */
export function formatPhone(e164?: string | null): string {
  if (!e164 || typeof e164 !== "string" || !e164.trim()) {
    return "—";
  }
  const trimmed = e164.trim();
  try {
    const parsed = parsePhoneNumberFromString(trimmed);
    if (parsed && parsed.isValid()) {
      return parsed.formatInternational();
    }
  } catch {
    // fallback to raw
  }
  return trimmed;
}

/**
 * Click-to-call href target.
 * Returns `tel:${canonical}` or empty string.
 */
export function phoneHref(e164?: string | null): string {
  if (!e164 || typeof e164 !== "string" || !e164.trim()) {
    return "";
  }
  const trimmed = e164.trim();
  return `tel:${trimmed.replace(/\s+/g, "")}`;
}

/**
 * Strips formatting characters (spaces, hyphens, brackets, dots) for searching numbers.
 */
export function phoneSearchTerm(input?: string | null): string {
  if (!input) return "";
  return input.replace(/[\s\-().]/g, "");
}

/**
 * Returns the default CountryCode based on user browser locale or fallback to "IN".
 */
export function getBrowserCountry(): CountryCode {
  try {
    if (typeof navigator !== "undefined" && navigator.language) {
      const parts = navigator.language.split("-");
      if (parts.length > 1 && parts[1].length === 2) {
        return parts[1].toUpperCase() as CountryCode;
      }
    }
  } catch {
    // ignore
  }
  return "IN";
}

export interface CountryLike {
  country_code: string;
  country_name: string;
  iso_2?: string;
  aliases?: string[];
}

export function countryNameToCountryCode(
  countryNameOrCode?: string | null,
  countries?: CountryLike[],
): CountryCode | undefined {
  if (!countryNameOrCode || typeof countryNameOrCode !== "string")
    return undefined;
  const trimmed = countryNameOrCode.trim();
  if (!trimmed) return undefined;

  // If already a valid 2-letter ISO country code (e.g. "IN", "US", "GB")
  if (trimmed.length === 2 && /^[A-Za-z]{2}$/.test(trimmed)) {
    return trimmed.toUpperCase() as CountryCode;
  }

  // Dynamic match against backend-provided countries list
  if (countries && countries.length > 0) {
    const normalized = trimmed.toLowerCase();
    const match = countries.find(
      (c) =>
        c.country_name?.trim().toLowerCase() === normalized ||
        c.country_code?.trim().toLowerCase() === normalized ||
        c.iso_2?.trim().toLowerCase() === normalized ||
        (c.aliases &&
          c.aliases.some((a) => a?.trim().toLowerCase() === normalized)),
    );

    if (match?.iso_2 && match.iso_2.trim().length === 2) {
      return match.iso_2.trim().toUpperCase() as CountryCode;
    }

    if (match?.country_code && match.country_code.trim().length === 2) {
      return match.country_code.trim().toUpperCase() as CountryCode;
    }
  }

  return undefined;
}
