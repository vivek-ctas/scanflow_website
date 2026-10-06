"use client";

import { useCallback, useState } from "react";
import { createGuestLead } from "@/services/checkout.service";
import type {
  BillingCycle,
  CheckoutFormState,
  CheckoutStep,
  CreateLeadData,
  Gateway,
  Plan,
} from "@/types";

const EMPTY_FORM: CheckoutFormState = {
  first_name: "",
  last_name: "",
  email: "",
  company_name: "",
  contact_number: "",
  country_name: "",
};

interface UseCheckoutResult {
  step: CheckoutStep;
  form: CheckoutFormState;
  gateway: Gateway;
  billingCycle: BillingCycle;
  leadData: CreateLeadData | null;
  error: string | null;
  loading: boolean;

  setForm: (field: keyof CheckoutFormState, value: string) => void;
  setGateway: (g: Gateway) => void;
  setBillingCycle: (c: BillingCycle) => void;
  /** Step 1 → 2: persist the lead, then reveal the summary. */
  submitForm: (plan: Plan) => Promise<void>;
  /** Step 2 → 3: open the gateway. No UI calls this while gateways are off. */
  startPayment: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export function useCheckout(): UseCheckoutResult {
  const [step, setStep] = useState<CheckoutStep>("form");
  const [form, setFormState] = useState<CheckoutFormState>(EMPTY_FORM);
  const [gateway, setGateway] = useState<Gateway>("stripe");
  // Overwritten from the selected plan's own cycle before the modal opens.
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("month");
  const [leadData, setLeadData] = useState<CreateLeadData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setForm = useCallback(
    (field: keyof CheckoutFormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  const submitForm = useCallback(
    async (plan: Plan) => {
      setLoading(true);
      setError(null);

      const { data, error: apiErr } = await createGuestLead({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        company_name: form.company_name.trim(),
        contact_number: form.contact_number.trim(),
        country_name: form.country_name,
        plan_id: plan.id,
        billing_cycle: billingCycle,
      });

      setLoading(false);

      if (apiErr || !data) {
        setError(apiErr ?? "Could not save your details. Please try again.");
        return;
      }

      setLeadData(data);
      setStep("summary");
    },
    [form, billingCycle],
  );

  const startPayment = useCallback(async () => {
    if (!leadData) {
      setError("Lead data missing. Please go back and re-submit.");
      return;
    }

    setLoading(true);
    setError(null);
    setStep("processing");

    // Gateways are intentionally disabled: `checkout.service.ts` keeps the
    // Stripe/Razorpay handlers commented out. When one goes live, this branch
    // calls it here, then hands off to the gateway or redirects to the hosted
    // checkout page, returning to 'summary' if the gateway is dismissed.
    setError("Online payment is not available yet.");
    setStep("summary");
    setLoading(false);
  }, [leadData]);

  const reset = useCallback(() => {
    setStep("form");
    setFormState(EMPTY_FORM);
    setLeadData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    step,
    form,
    gateway,
    billingCycle,
    leadData,
    error,
    loading,
    setForm,
    setGateway,
    setBillingCycle,
    submitForm,
    startPayment,
    clearError,
    reset,
  };
}
