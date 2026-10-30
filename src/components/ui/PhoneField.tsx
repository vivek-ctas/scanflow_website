"use client";

import { useId, useMemo, useState } from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import "./phoneField.css";
import { getBrowserCountry, validatePhoneLive } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";
import type { CountryCode } from "libphonenumber-js";

export type PhoneFieldProps = {
  id?: string;
  name?: string;
  value?: string;
  onChange: (value?: string) => void;
  onBlur?: () => void;
  defaultCountry?: Country;
  country?: Country;
  onCountryChange?: (country?: Country) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  hint?: string;
  error?: string;
  invalid?: boolean;
  className?: string;
  inputWrapperClassName?: string;
  liveValidation?: boolean;
};

/**
 * ScanFlow Website Standard E.164 Phone Field.
 *
 * Implements react-phone-number-input with local bundled SVG flags (no external CDN calls),
 * live format validation as user types, full keyboard navigation, country selection,
 * automatic E.164 formatting, and design system tokens matching Scanflow website styling.
 */
export default function PhoneField({
  id,
  name,
  value,
  onChange,
  onBlur,
  defaultCountry,
  country,
  onCountryChange,
  placeholder = "Enter phone number",
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  hint,
  error,
  invalid,
  className = "",
  inputWrapperClassName = "",
  liveValidation = true,
}: PhoneFieldProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [isTouched, setIsTouched] = useState(false);

  // Check if incoming value is legacy unparsable
  const isLegacyUnparsable = Boolean(value && !value.startsWith("+"));
  const effectiveValue = isLegacyUnparsable ? undefined : value;
  const fallbackCountry = defaultCountry || getBrowserCountry();
  const currentCountry = (country || fallbackCountry) as CountryCode;

  // Live real-time format validation
  const liveResult = useMemo(() => {
    if (!liveValidation || !effectiveValue) return null;
    return validatePhoneLive(effectiveValue, currentCountry);
  }, [liveValidation, effectiveValue, currentCountry]);

  const isValid = Boolean(liveResult?.isValid);
  const isTooShort = Boolean(liveResult && liveResult.status === "too_short");
  const isTooLong = Boolean(liveResult && liveResult.status === "too_long");
  const isMalformed = Boolean(liveResult && liveResult.status === "invalid");

  const hasLiveError = Boolean(
    isTooLong || isMalformed || (isTouched && isTooShort),
  );
  const isInvalid = Boolean(invalid || error || hasLiveError);

  const displayedHelper = useMemo(() => {
    if (error) return { type: "error", text: error };
    if (isLegacyUnparsable)
      return {
        type: "warning",
        text: "The saved number could not be read — please re-enter",
      };
    if (liveValidation && effectiveValue) {
      if (isValid) {
        return { type: "valid", text: "Valid phone number format" };
      }
      if (isTooLong || isMalformed) {
        return { type: "error", text: liveResult?.message || "Invalid format" };
      }
      if (isTooShort) {
        return {
          type: isTouched ? "error" : "hint",
          text: isTouched
            ? "Phone number is too short for selected country"
            : "Enter full phone number with country code",
        };
      }
    }
    if (hint) return { type: "hint", text: hint };
    return null;
  }, [
    error,
    isLegacyUnparsable,
    liveValidation,
    effectiveValue,
    isValid,
    isTooLong,
    isMalformed,
    isTooShort,
    isTouched,
    liveResult,
    hint,
  ]);

  const handleInputBlur = () => {
    setIsTouched(true);
    onBlur?.();
  };

  return (
    <div className={cn("scanflow-phone-container w-full", className)}>
      <div
        className={cn(
          "relative flex items-center transition-all duration-150",
          inputWrapperClassName ||
            cn(
              "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm transition-colors duration-150",
              isInvalid
                ? "border-red-400 bg-red-50/40 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-400/10"
                : isValid
                  ? "border-emerald-500/50 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10"
                  : "border-primary/15 focus-within:border-secondary focus-within:ring-4 focus-within:ring-secondary/10",
              disabled &&
                "cursor-not-allowed bg-slate-50 text-slate-400 opacity-60",
            ),
        )}
      >
        <PhoneInput
          id={inputId}
          name={name}
          flags={flags}
          international
          countryCallingCodeEditable={false}
          defaultCountry={fallbackCountry}
          country={country}
          onCountryChange={onCountryChange}
          value={effectiveValue}
          onChange={onChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          disabled={disabled || readOnly}
          autoFocus={autoFocus}
          aria-invalid={isInvalid || undefined}
          aria-required={required || undefined}
          className="flex w-full items-center"
        />

        {/* Live validation status indicator icon inside input */}
        {isValid && (
          <div className="pointer-events-none flex items-center pl-2 text-emerald-600">
            <Check className="h-4 w-4" />
          </div>
        )}
        {isInvalid && (
          <div className="pointer-events-none flex items-center pl-2 text-red-500">
            <AlertCircle className="h-4 w-4" />
          </div>
        )}
      </div>

      {displayedHelper && (
        <p
          className={cn(
            "mt-1.5 text-xs flex items-center gap-1.5 transition-colors duration-150",
            displayedHelper.type === "error"
              ? "text-red-600 font-medium"
              : displayedHelper.type === "valid"
                ? "text-emerald-600 font-medium"
                : displayedHelper.type === "warning"
                  ? "text-amber-600 font-medium"
                  : "text-slate-500",
          )}
        >
          {displayedHelper.type === "valid" && (
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          )}
          {displayedHelper.type === "error" && (
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
          )}
          <span>{displayedHelper.text}</span>
        </p>
      )}
    </div>
  );
}
