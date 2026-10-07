// =============================================================================
// Public API types — single source of truth, aligned with scanFlow_api
// (services/admin/plans.service.ts, services/public-checkout.service.ts,
//  models/plan.model.ts, models/country.model.ts)
// =============================================================================

/** Envelope returned by GET /plans/public/plans. */
export interface PublicPlansApiResponse {
  status: number;
  message: string;
  data: { plans: Plan[] };
}

/**
 * A purchasable plan.
 *
 * `billing_cycle` is the single cycle the plan is sold on — unlike the SellerBuz
 * reference there is no `interval: 'both'`, so the pricing page's Monthly/Quarterly
 * tabs narrow the cards to the plans sold on the selected cycle.
 *
 * `price` is in major currency units (29 = 29 USD), not cents.
 *
 * The identifier is `id`, not `_id`: the API's toJSON plugin renames it.
 */
export interface Plan {
  id: string;
  name: string;
  desc?: string;
  price: number;
  price_quarterly?: number | null;
  billing_cycle: BillingCycle;
  currency: string;
  trial_days: number;
  features: { features_name: string; scan_limit: number }[];
  marketing_features: string[];
  is_popular: boolean;
  discount: number;
}

/** Plan billing cycles. `monthly` is the API's `month`. */
export type BillingCycle = "month" | "quarterly";

export type Gateway = "stripe" | "razorpay";

/** Country row from GET /countries, used for the checkout country dropdown. */
export interface CountryOption {
  id: string;
  country_code: string;
  country_name: string;
  currency_code: string;
}

export interface CountriesApiResponse {
  status: number;
  message: string;
  data: {
    results: CountryOption[];
    page: number;
    limit: number;
    total_pages: number;
    total_results: number;
  };
}

/** Step 1 of checkout: collect the buyer's details. */
export interface CheckoutFormState {
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  contact_number: string;
  country_name: string;
}

export type CheckoutStep =
  /** Step 1: basic information form. */
  | "form"
  /** Step 2: order summary, reached after a lead is created. */
  | "summary"
  /** Step 3: gateway handoff. Unreachable while gateways are disabled. */
  | "processing";

export interface CreateLeadPayload {
  first_name: string;
  last_name: string;
  email: string;
  company_name?: string;
  contact_number?: string;
  country_name?: string;
  plan_id: string;
  billing_cycle?: BillingCycle;
}

/** Plan quote echoed by the backend so the summary shows server truth. */
export interface LeadPlanQuote {
  name: string;
  billing_cycle: BillingCycle;
  price: number;
  currency: string;
  trial_days: number;
}

export interface CreateLeadData {
  lead_id: string;
  status: string;
  plan: LeadPlanQuote;
}

export interface CreateLeadApiResponse {
  status: number;
  message: string;
  data: CreateLeadData;
}

// =============================================================================
// Contact Us — POST /contact/public/submit (public), aligned with
// scanFlow_api models/contact.model.ts + validations/admin/contact.validations.ts
// =============================================================================

/** Inquiry slugs stored by the API's Contact model. */
export type ContactInquiryType =
  "sales" | "demo" | "support" | "sdk" | "partnership" | "general";

/** Contact inquiry steps the form pipeline can be in. */
export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

export interface ContactFormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  inquiryType: string;
  message: string;
}

export interface SubmitContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiry_type: ContactInquiryType;
  message: string;
}

/** Contact row echoed back by the API (toJSON plugin renames _id → id). */
export interface ContactSubmissionData {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiry_type: ContactInquiryType;
  message: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmissionApiResponse {
  status: number;
  message: string;
  data: ContactSubmissionData;
}

// =============================================================================
// Web Settings — GET /web-settings (public) + PUT /web-settings (admin),
// aligned with scanFlow_api models/web-settings.model.ts
// =============================================================================

export interface WebCompanyInfo {
  name: string;
  website?: string;
  tagline?: string;
  about?: string;
}

export interface WebContactInfo {
  email: string;
  phone: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code: string;
  working_hours?: string;
  timezone?: string;
}

export interface WebSocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
}

export interface WebFooterSettings {
  about?: string;
  copyright_text?: string;
  show_social?: boolean;
  show_contact?: boolean;
  show_address?: boolean;
  show_working_hours?: boolean;
}

export interface WebSettings {
  company: WebCompanyInfo;
  contact: WebContactInfo;
  social: WebSocialLinks;
  footer: WebFooterSettings;
}

export interface WebSettingsApiResponse {
  status: number;
  message: string;
  data: { webSettings: WebSettings };
}
