import type { BillingCycle, Plan } from "@/types";

/**
 * Display helpers for a plan.
 *
 * Kept out of the modal so both the pricing page and the checkout modal read
 * prices the same way.
 */

const PERIOD_LABEL: Record<BillingCycle, string> = {
  month: "/month",
  quarterly: "/quarterly",
};

/** Short period label for a plan card, e.g. `/month`, `/quarter`. */
export function shortPeriodLabel(cycle: BillingCycle): string {
  return cycle === "quarterly" ? "/quarter" : "/month";
}

/** Long period label, e.g. `/month`, `/quarterly`. */
export function periodLabel(cycle: BillingCycle): string {
  return PERIOD_LABEL[cycle] ?? "";
}

/**
 * The amount actually charged for a plan, mirroring the backend's
 * `resolvePlanPrice` / `priceForCycle`.
 *
 * A plan is sold on exactly one cycle: a `quarterly` plan is charged
 * `price_quarterly` and its `price` field is only a base for deriving that
 * amount, so displaying `price` for a quarterly plan would quote the wrong
 * number. Falls back to `price` when no quarterly amount exists.
 */
export function planPriceForCycle(plan: Plan): number {
  if (plan.billing_cycle === "quarterly") {
    const quarterly = Number(plan.price_quarterly);
    if (Number.isFinite(quarterly) && quarterly > 0) return quarterly;
  }
  return Number(plan.price) || 0;
}

/**
 * Prices arrive from the API in major currency units (29 = 29 USD), unlike the
 * SellerBuz reference which stores cents.
 */
export function formatPlanPrice(amount: number, currency?: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: (currency || "usd").toUpperCase(),
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${(currency || "USD").toUpperCase()} ${amount.toFixed(2)}`;
  }
}

export function billingCycleLabel(cycle: BillingCycle): string {
  return cycle === "quarterly" ? "Quarterly" : "Monthly";
}

/** Readable scan allowance, derived from the plan's `scan` feature row. */
export function scanAllowanceLabel(plan: Plan): string | null {
  const scan = plan.features?.find((f) => f.features_name === "scan");
  if (!scan) return null;
  const limit = Number(scan.scan_limit) || 0;
  if (limit === 0) return "Unlimited scans";
  const formatted =
    limit >= 1000 ? `${Math.round(limit / 1000)}K` : String(limit);
  return `${formatted} scans / ${plan.billing_cycle === "quarterly" ? "quarter" : "month"}`;
}

/**
 * Scan allowance to render above the feature list.
 *
 * `marketing_features` is curated marketing copy owned by the backend, so when
 * a plan supplies it that copy wins; deriving a second allowance line from the
 * numeric `scan` row can contradict it (a quarterly plan whose marketing copy
 * still says "per month"). The derived value is only a fallback for plans that
 * ship no marketing copy.
 */
export function planAllowanceLabel(plan: Plan): string | null {
  if (plan.marketing_features?.length) return null;
  return scanAllowanceLabel(plan);
}
