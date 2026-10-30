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

/**
 * Map country name or ISO to CountryCode if possible.
 */
export function countryNameToCountryCode(
  countryName?: string | null,
): CountryCode | undefined {
  if (!countryName) return undefined;
  const normalized = countryName.trim().toLowerCase();
  if (normalized === "india" || normalized === "in") return "IN";
  if (
    normalized === "united states" ||
    normalized === "usa" ||
    normalized === "us"
  )
    return "US";
  if (
    normalized === "united kingdom" ||
    normalized === "uk" ||
    normalized === "gb"
  )
    return "GB";
  if (normalized === "canada" || normalized === "ca") return "CA";
  if (normalized === "australia" || normalized === "au") return "AU";
  if (
    normalized === "united arab emirates" ||
    normalized === "uae" ||
    normalized === "ae"
  )
    return "AE";
  if (normalized === "singapore" || normalized === "sg") return "SG";
  if (normalized === "germany" || normalized === "de") return "DE";
  if (normalized === "france" || normalized === "fr") return "FR";
  if (normalized === "japan" || normalized === "jp") return "JP";
  if (normalized === "brazil" || normalized === "br") return "BR";
  if (normalized === "netherlands" || normalized === "nl") return "NL";
  if (normalized === "italy" || normalized === "it") return "IT";
  if (normalized === "spain" || normalized === "es") return "ES";
  if (normalized === "china" || normalized === "cn") return "CN";
  if (normalized === "russia" || normalized === "ru") return "RU";
  if (normalized === "south africa" || normalized === "za") return "ZA";
  if (normalized.length === 2) return normalized.toUpperCase() as CountryCode;
  return undefined;
}
