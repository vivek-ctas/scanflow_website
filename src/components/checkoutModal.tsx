"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  Lock,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  billingCycleLabel,
  formatPlanPrice,
  periodLabel,
  planAllowanceLabel,
  planPriceForCycle,
} from "@/lib/plans";
import { fetchCountries } from "@/services/plan.service";
import type {
  CheckoutFormState,
  CheckoutStep,
  CountryOption,
  LeadPlanQuote,
  Plan,
} from "@/types";

// ── Field validation ──────────────────────────────────────────────────────────

type FormErrors = Partial<Record<keyof CheckoutFormState, string>>;

function validateField(
  field: keyof CheckoutFormState,
  value: string,
): string | null {
  const trimmed = value.trim();
  switch (field) {
    case "first_name":
      return trimmed ? null : "First name is required.";
    case "last_name":
      return trimmed ? null : "Last name is required.";
    case "email": {
      if (!trimmed) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        return "Enter a valid email address.";
      return null;
    }
    case "company_name":
      return trimmed ? null : "Company name is required.";
    case "contact_number": {
      if (!trimmed) return "Contact number is required.";
      // 7–15 digits once separators and a leading + are stripped.
      const digits = trimmed.replace(/[^\d]/g, "");
      if (digits.length < 7 || digits.length > 15)
        return "Enter a valid phone number.";
      return null;
    }
    case "country_name":
      return trimmed ? null : "Please select your country.";
    default:
      return null;
  }
}

const FORM_FIELDS: (keyof CheckoutFormState)[] = [
  "first_name",
  "last_name",
  "email",
  "company_name",
  "contact_number",
  "country_name",
];

// ── Shared primitives ─────────────────────────────────────────────────────────

function FieldError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600"
    >
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: keyof CheckoutFormState;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const invalid = Boolean(error);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
        {required && <span className="text-secondary"> *</span>}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-primary placeholder:text-slate-400 transition-colors duration-150 focus:outline-none focus:ring-4",
            invalid
              ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-400/10"
              : "border-primary/15 focus:border-secondary focus:ring-secondary/10",
          )}
        />
        {invalid && (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <AlertCircle className="w-4 h-4 text-red-400" />
          </div>
        )}
      </div>
      {invalid && (
        <span id={`${id}-error`}>
          <FieldError message={error!} />
        </span>
      )}
    </div>
  );
}

function ApiErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
      <span className="flex-1">{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface CheckoutModalProps {
  plan: Plan;
  step: CheckoutStep;
  form: CheckoutFormState;
  /**
   * Plan quote returned by the backend when the lead was created. Preferred over
   * the locally fetched plan on the summary step so the displayed amount is the
   * server's, not a client re-derivation. Null until the lead exists.
   */
  quote: LeadPlanQuote | null;
  loading: boolean;
  error: string | null;

  onClose: () => void;
  onFormChange: (field: keyof CheckoutFormState, value: string) => void;
  onSubmitForm: () => void;
  onGoHome: () => void;
  onClearError: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CheckoutModal({
  plan,
  step,
  form,
  quote,
  loading,
  error,
  onClose,
  onFormChange,
  onSubmitForm,
  onGoHome,
  onClearError,
}: CheckoutModalProps) {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof CheckoutFormState, boolean>>
  >({});

  useEffect(() => {
    let cancelled = false;
    fetchCountries().then(({ countries: list, error: err }) => {
      if (cancelled) return;
      setCountries(list);
      setCountriesError(err);
      setCountriesLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Close on Escape.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const selectedCountry = useMemo(
    () => countries.find((c) => c.country_name === form.country_name),
    [countries, form.country_name],
  );

  // Summary numbers come from the backend's quote once the lead exists, so the
  // buyer is never shown a client-computed amount.
  const quoteData = useMemo<LeadPlanQuote>(
    () =>
      quote ?? {
        name: plan.name,
        billing_cycle: plan.billing_cycle,
        price: plan.price,
        currency: (plan.currency || "usd").toUpperCase(),
        trial_days: plan.trial_days || 0,
      },
    [quote, plan],
  );

  const allowance = useMemo(() => planAllowanceLabel(plan), [plan]);
  const price = formatPlanPrice(planPriceForCycle(plan), plan.currency);
  const period = periodLabel(plan.billing_cycle);
  // Trial length belongs to the selected plan, never to the page-wide maximum.
  const trialDays = plan.trial_days || 0;

  function handleBlur(field: keyof CheckoutFormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, form[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: err ?? undefined }));
  }

  function handleChange(field: keyof CheckoutFormState, value: string) {
    onFormChange(field, value);
    if (touched[field]) {
      const err = validateField(field, value);
      setFieldErrors((prev) => ({ ...prev, [field]: err ?? undefined }));
    }
  }

  function handleSubmit() {
    const errors: FormErrors = {};
    const allTouched: Partial<Record<keyof CheckoutFormState, boolean>> = {};
    for (const f of FORM_FIELDS) {
      allTouched[f] = true;
      const err = validateField(f, form[f]);
      if (err) errors[f] = err;
    }
    setTouched(allTouched);
    setFieldErrors(errors);
    // Stop on client-side errors so the buyer fixes the form before we call the API.
    if (Object.keys(errors).length > 0) return;
    onSubmitForm();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 px-7 pt-6 pb-4 border-b border-primary/10 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-primary leading-tight">
              {step === "form" && "Get Started"}
              {step === "summary" && "Payment Summary"}
              {step === "processing" && "Processing…"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {step === "form" && `${plan.name} plan selected`}
              {step === "summary" &&
                `${plan.name} · ${billingCycleLabel(plan.billing_cycle)}`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden>
              {(["form", "summary"] as const).map((s, i) => (
                <div
                  key={s}
                  className={cn(
                    "rounded-full transition-all",
                    step === s
                      ? "w-6 h-2 bg-primary"
                      : step === "summary" && i === 0
                        ? "w-2 h-2 bg-primary/40"
                        : "w-2 h-2 bg-primary/15",
                  )}
                />
              ))}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-7 py-5">
          <AnimatePresence mode="wait">
            {/* ══ STEP 1: BASIC INFORMATION ══ */}
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                {/* Selected plan mini-card */}
                <div className="rounded-2xl bg-secondary/5 border border-secondary/20 px-5 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-semibold text-primary">
                      {plan.name} Plan
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 truncate">
                      {plan.desc}
                    </div>
                    {allowance && (
                      <div className="mt-1.5 inline-flex items-center rounded-full border border-secondary/20 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
                        {allowance}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-bold text-primary">
                      {price}
                    </div>
                    <div className="text-xs text-slate-500">{period}</div>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <TextField
                      id="first_name"
                      label="First Name"
                      required
                      autoComplete="given-name"
                      placeholder="John"
                      value={form.first_name}
                      onChange={(v) => handleChange("first_name", v)}
                      onBlur={() => handleBlur("first_name")}
                      error={fieldErrors.first_name}
                    />
                    <TextField
                      id="last_name"
                      label="Last Name"
                      required
                      autoComplete="family-name"
                      placeholder="Smith"
                      value={form.last_name}
                      onChange={(v) => handleChange("last_name", v)}
                      onBlur={() => handleBlur("last_name")}
                      error={fieldErrors.last_name}
                    />
                  </div>

                  <TextField
                    id="email"
                    label="Work Email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(v) => handleChange("email", v)}
                    onBlur={() => handleBlur("email")}
                    error={fieldErrors.email}
                  />

                  <TextField
                    id="company_name"
                    label="Company Name"
                    required
                    autoComplete="organization"
                    placeholder="Acme Inc."
                    value={form.company_name}
                    onChange={(v) => handleChange("company_name", v)}
                    onBlur={() => handleBlur("company_name")}
                    error={fieldErrors.company_name}
                  />

                  <TextField
                    id="contact_number"
                    label="Contact Number"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+1 555 123 4567"
                    value={form.contact_number}
                    onChange={(v) => handleChange("contact_number", v)}
                    onBlur={() => handleBlur("contact_number")}
                    error={fieldErrors.contact_number}
                  />

                  {/* Country dropdown */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-primary"
                    >
                      Country
                      <span className="text-secondary"> *</span>
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="country"
                        value={form.country_name}
                        disabled={countriesLoading || countries.length === 0}
                        onChange={(e) => {
                          handleChange("country_name", e.target.value);
                          setTouched((prev) => ({
                            ...prev,
                            country_name: true,
                          }));
                          const err = validateField(
                            "country_name",
                            e.target.value,
                          );
                          setFieldErrors((prev) => ({
                            ...prev,
                            country_name: err ?? undefined,
                          }));
                        }}
                        aria-invalid={Boolean(fieldErrors.country_name)}
                        className={cn(
                          "w-full appearance-none rounded-xl border bg-white pl-4 pr-10 py-2.5 text-sm text-primary focus:outline-none focus:ring-4 disabled:opacity-60 transition-colors duration-150",
                          fieldErrors.country_name
                            ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-400/10"
                            : "border-primary/15 focus:border-secondary focus:ring-secondary/10",
                        )}
                      >
                        <option value="">
                          {countriesLoading
                            ? "Loading countries…"
                            : countries.length === 0
                              ? "No countries available"
                              : "Select your country"}
                        </option>
                        {countries.map((c) => (
                          <option key={c.id} value={c.country_name}>
                            {c.country_name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        {countriesLoading ? (
                          <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>
                    {countriesError && <FieldError message={countriesError} />}
                    {fieldErrors.country_name && (
                      <FieldError message={fieldErrors.country_name} />
                    )}
                  </div>
                </div>

                {error && (
                  <ApiErrorBanner message={error} onDismiss={onClearError} />
                )}

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-secondary" /> SSL secured
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-secondary" /> No card
                    needed
                  </span>
                  {trialDays > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-secondary" /> {trialDays}
                      -day trial
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* ══ STEP 2: SUMMARY ══ */}
            {step === "summary" && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-primary/10 overflow-hidden">
                  <div className="bg-primary/[0.03] px-5 py-3.5 border-b border-primary/10">
                    <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase">
                      Order Summary
                    </p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-600">Plan</span>
                      <span className="font-semibold text-primary text-right">
                        {quoteData.name}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-600">Billing</span>
                      <span className="font-semibold text-primary text-right">
                        {billingCycleLabel(quoteData.billing_cycle)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-600">Currency</span>
                      <span className="font-semibold text-primary text-right">
                        {quoteData.currency}
                      </span>
                    </div>
                    {form.country_name && (
                      <div className="flex justify-between gap-4 text-sm">
                        <span className="text-slate-600">Country</span>
                        <span className="font-semibold text-primary text-right">
                          {form.country_name}
                        </span>
                      </div>
                    )}
                    {selectedCountry?.currency_code && (
                      <div className="flex justify-between gap-4 text-sm">
                        <span className="text-slate-600">Country currency</span>
                        <span className="font-semibold text-primary text-right">
                          {selectedCountry.currency_code.toUpperCase()}
                        </span>
                      </div>
                    )}
                    {quoteData.trial_days > 0 && (
                      <div className="flex justify-between gap-4 text-sm">
                        <span className="text-slate-600">Trial</span>
                        <span className="font-semibold text-secondary text-right">
                          {quoteData.trial_days} days free
                        </span>
                      </div>
                    )}
                    <div className="border-t border-primary/10 pt-3 flex justify-between items-baseline gap-4">
                      <span className="text-primary font-semibold">
                        Total due today
                      </span>
                      <div className="text-2xl font-bold text-primary text-right">
                        {formatPlanPrice(quoteData.price, quoteData.currency)}
                        <span className="text-sm font-semibold text-slate-500">
                          {" "}
                          {quoteData.currency}
                        </span>
                        <div className="text-xs font-medium text-slate-400">
                          {periodLabel(quoteData.billing_cycle)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {plan.marketing_features?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-3">
                      What&apos;s included
                    </p>
                    <ul className="space-y-2">
                      {plan.marketing_features.slice(0, 5).map((feature, i) => (
                        <li
                          key={`${feature}-${i}`}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <div className="w-4 h-4 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-secondary" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* ── Payment gateway: DISABLED ──
                    Intentionally no gateway selector and no pay button while
                    online payment is offline. `useCheckout.startPayment` and the
                    Stripe/Razorpay handlers in `services/checkout.service.ts` are
                    kept (commented) so enabling a gateway only needs those
                    uncommented plus the backend lead → payment step. */}
                <div className="flex items-start gap-3 rounded-2xl border border-secondary/20 bg-secondary/5 px-5 py-4">
                  <Shield className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    Your details are saved and our team will contact you within
                    24 hours on the email or phone number you provided to
                    confirm your plan and walk you through activation.
                  </p>
                </div>

                {error && (
                  <ApiErrorBanner message={error} onDismiss={onClearError} />
                )}
              </motion.div>
            )}

            {/* ══ PROCESSING ══ */}
            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-14 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-secondary animate-spin" />
                </div>
                <p className="font-semibold text-primary">
                  Opening payment gateway…
                </p>
                <p className="text-sm text-slate-500 text-center">
                  Please don&apos;t close this tab.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer CTA ── */}
        {(step === "form" || step === "summary") && (
          <div className="flex-shrink-0 px-7 pb-6 pt-4 border-t border-primary/10 bg-white">
            {step === "form" ? (
              <button
                onClick={handleSubmit}
                disabled={loading || countriesLoading}
                className="w-full h-12 rounded-full font-semibold text-base text-white glow-sm bg-gradient-to-r from-primary via-[#1B4A75] to-secondary hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving
                    details…
                  </>
                ) : (
                  <>
                    Proceed
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            ) : (
              /* The Pay button is intentionally absent while gateways are
                 disabled. Restore it alongside the gateway selector when a
                 gateway goes live. */
              <button
                onClick={onGoHome}
                className="w-full h-12 rounded-full font-semibold text-base text-white glow-sm bg-gradient-to-r from-primary via-[#1B4A75] to-secondary hover:opacity-95 transition-opacity flex items-center justify-center"
              >
                Go to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}

            <p className="mt-3 text-center text-xs text-slate-400">
              By continuing you agree to our{" "}
              <a href="/terms" className="underline hover:text-slate-600">
                Terms
              </a>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
