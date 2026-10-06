import { apiFetch } from "@/lib/api";
import type {
  CreateLeadApiResponse,
  CreateLeadData,
  CreateLeadPayload,
} from "@/types";

// ── STEP 1: Create Guest Lead ─────────────────────────────────────────────────
//
// POST /public-checkout/lead
// Stores WHO wants to buy WHICH plan. No payment session is created here, so the
// buyer reviews the summary before any gateway is involved.
// Returns lead_id, consumed by the payment step once gateways are enabled.

export async function createGuestLead(
  payload: CreateLeadPayload,
): Promise<{ data: CreateLeadData | null; error: string | null }> {
  const { data, error } = await apiFetch<CreateLeadApiResponse>(
    "/public-checkout/lead",
    { method: "POST", body: JSON.stringify(payload) },
  );
  if (error || !data) {
    return { data: null, error: error ?? "Could not save your details." };
  }
  return { data: data.data, error: null };
}

// ── STEP 2: Payment gateway — DISABLED ────────────────────────────────────────
//
// Payment capture is intentionally not wired up. When a gateway is chosen to go
// live, the backend needs a step that turns the `pending` lead from
// `createGuestLead` into an `initiated` lead plus a gateway session — the
// provisioning path in `payment.service.ts` only processes `initiated` leads.
//
// The backend already exposes the one-shot alternative
// `POST /public-checkout/subscribe`, which creates the lead AND the gateway
// session in a single request. The handlers below are left in place, commented,
// so enabling a gateway is a matter of uncommenting them and adding the backend
// step they call.
//
// ── Stripe ────────────────────────────────────────────────────────────────────
// export async function createStripeSession(
//   leadId: string,
// ): Promise<{ data: { checkout_url: string } | null; error: string | null }> {
//   const successUrl = `${window.location.origin}/checkout/success?gateway=stripe&lead_id=${encodeURIComponent(leadId)}`;
//   const cancelUrl = `${window.location.origin}/checkout/cancel?lead_id=${encodeURIComponent(leadId)}`;
//   const { data, error } = await apiFetch<
//     ApiEnvelope<{ checkout_url: string }>
//   >("/public-checkout/payment", {
//     method: "POST",
//     body: JSON.stringify({
//       lead_id: leadId,
//       gateway: "stripe",
//       success_url: successUrl,
//       cancel_url: cancelUrl,
//     }),
//   });
//   return { data: data?.data ?? null, error };
// }
//
// ── Razorpay ──────────────────────────────────────────────────────────────────
// export async function createRazorpayOrder(
//   leadId: string,
// ): Promise<
//   | {
//       data: {
//         order_id: string;
//         amount: number; // minor units, e.g. paise
//         currency: string;
//         key_id: string;
//       } | null;
//       error: string | null;
//     }
// > {
//   const { data, error } = await apiFetch<
//     ApiEnvelope<{
//       order_id: string;
//       amount: number;
//       currency: string;
//       key_id: string;
//     }>
//   >("/public-checkout/payment", {
//     method: "POST",
//     body: JSON.stringify({ lead_id: leadId, gateway: "razorpay" }),
//   });
//   return { data: data?.data ?? null, error };
// }
