import { apiFetch } from "@/lib/api";
import type {
  ContactFormState,
  ContactInquiryType,
  ContactSubmissionApiResponse,
  ContactSubmissionData,
  SubmitContactPayload,
} from "@/types";

// ── Contact Us form submission ───────────────────────────────────────────────
//
// POST /contact/public/submit  (public, no auth)
// Wired to scanFlow_api's contact module so marketing inquiries land in the
// admin panel instead of disappearing into a local setTimeout.

/**
 * UI labels → API inquiry slugs. The marketing form's own labels are kept for
 * display; the API stores the slug (sales/demo/support/sdk/partnership/general).
 */
export const INQUIRY_SLUG: Record<string, ContactInquiryType> = {
  "Sales & Pricing": "sales",
  "Request a Demo": "demo",
  "Technical Support": "support",
  "SDK Integration": "sdk",
  "Partnership & Reseller": "partnership",
  "General Inquiry": "general",
};

export async function submitContactForm(
  form: ContactFormState,
): Promise<{ data: ContactSubmissionData | null; error: string | null }> {
  const payload: SubmitContactPayload = {
    name: form.name.trim(),
    email: form.email.trim(),
    inquiry_type: INQUIRY_SLUG[form.inquiryType] ?? "general",
    message: form.message.trim(),
  };
  if (form.company.trim()) payload.company = form.company.trim();
  if (form.phone.trim()) payload.phone = form.phone.trim();

  const { data, error } = await apiFetch<ContactSubmissionApiResponse>(
    "/contact/public/submit",
    { method: "POST", body: JSON.stringify(payload) },
  );
  if (error || !data) {
    return {
      data: null,
      error: error ?? "Could not send your message. Please try again.",
    };
  }
  return { data: data.data, error: null };
}
