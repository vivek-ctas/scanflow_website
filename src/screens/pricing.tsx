"use client";

import Layout from "@/components/layout";
import PageHero from "@/components/pageHero";
import { WarehouseIllustration } from "@/components/ui/illustration";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Loader2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import CheckoutModal from "@/components/checkoutModal";
import {
  formatPlanPrice,
  planAllowanceLabel,
  planPriceForCycle,
  shortPeriodLabel,
} from "@/lib/plans";
import { usePlans } from "@/hooks/use-plans";
import { useCheckout } from "@/hooks/use-checkout";
import { MaintenanceState } from "@/components/ui/maintenanceState";
import type { BillingCycle, Plan } from "@/types";

const pricingFaqs = (trialDays: number) => {
  const trialCopy =
    trialDays > 0
      ? `Yes. You can start with a ${trialDays}-day free trial to evaluate ScanFlow's speed, accuracy, and real-world performance before choosing a subscription.`
      : "Yes. You can evaluate ScanFlow's speed, accuracy, and real-world performance before choosing a subscription.";

  const upgradeCopy =
    trialDays > 0
      ? `Absolutely. You can upgrade or change your subscription whenever your business needs grow${trialDays > 0 ? ", with or without a trial" : ""}.`
      : "Absolutely. You can upgrade or change your subscription whenever your business needs grow.";

  return [
    {
      question: "Can I try ScanFlow before purchasing?",
      answer: trialCopy,
    },
    {
      question: "Can I upgrade my plan later?",
      answer: upgradeCopy,
    },
    {
      question: "What's included with every plan?",
      answer:
        "Every plan provides access to the complete ScanFlow barcode scanning engine, regular improvements, documentation, and customer support. Higher-tier plans include increased usage limits and additional business features.",
    },
    {
      question: "Do you provide technical support?",
      answer:
        "Yes. All paid plans include technical support. Enterprise customers receive priority assistance and dedicated onboarding to ensure a smooth deployment.",
    },
    {
      question: "Do you offer custom plans for businesses?",
      answer:
        "Yes. If your organization requires custom licensing, higher usage limits, or enterprise-level support, our team can create a plan tailored to your requirements.",
    },
  ];
};

function FaqItem({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
      className="group"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-4 rounded-[1.5rem] border px-7 py-6 text-left transition-all duration-300 shadow-[0_8px_30px_rgba(19,53,90,0.07)] hover:shadow-[0_16px_44px_rgba(19,53,90,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
          open
            ? "bg-gradient-to-br from-white via-muted to-white/90 border-secondary/25"
            : "bg-white/95 border-primary/10 hover:border-secondary/20"
        }`}
      >
        <div className="flex items-center gap-5 min-w-0">
          <span
            className={`shrink-0 flex items-center justify-center h-9 w-9 rounded-xl text-xs font-semibold transition-colors duration-300 ${
              open
                ? "bg-secondary text-white"
                : "bg-secondary/10 text-secondary border border-secondary/15"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-lg font-semibold text-primary leading-snug">
            {faq.question}
          </span>
        </div>
        <span
          className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-full border transition-all duration-300 ${
            open
              ? "bg-secondary border-secondary text-white rotate-180"
              : "bg-primary/5 border-primary/10 text-primary/60 group-hover:border-secondary/30 group-hover:text-secondary"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-7 pt-3 pb-5">
              <div className="ml-14 border-l-2 border-secondary/20 pl-5">
                <p className="text-slate-600 leading-relaxed text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Pricing() {
  const router = useRouter();
  const {
    plans,
    loading: plansLoading,
    error: plansError,
    refetch: refetchPlans,
  } = usePlans();
  const checkout = useCheckout();
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  // Defaults to Monthly, like the reference site's billing toggle.
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>("month");

  // Marketing copy is derived from backend data: the longest trial offered
  // across the live plans. 0 means no plan advertises a trial, so all
  // "free trial" language is dropped.
  const trialDays = useMemo(
    () => plans.reduce((max, p) => Math.max(max, p.trial_days || 0), 0),
    [plans],
  );

  // Each plan is sold on exactly one billing cycle, so the Monthly/Quarterly
  // tab narrows the cards to the plans sold on that cycle.
  const filteredPlans = useMemo(
    () => plans.filter((p) => p.billing_cycle === selectedCycle),
    [plans, selectedCycle],
  );

  // Mirror the reference site: fewer cards gets a narrower, centered grid so a
  // single plan in a tab doesn't stretch across the full width.
  const colClass =
    filteredPlans.length === 1
      ? "grid-cols-1 max-w-sm mx-auto"
      : filteredPlans.length === 2
        ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
        : "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto";

  const faqs = useMemo(() => pricingFaqs(trialDays), [trialDays]);

  function handlePlanClick(plan: Plan) {
    // The plan dictates its own billing cycle; the backend rejects a mismatch.
    checkout.setBillingCycle(plan.billing_cycle);
    checkout.clearError();
    setActivePlan(plan);
  }

  function handleCloseModal() {
    setActivePlan(null);
    checkout.reset();
  }

  function handleGoHome() {
    handleCloseModal();
    router.push("/");
  }

  const heroSubtitle =
    trialDays > 0
      ? `Start free with a ${trialDays}-day trial - no credit card required. Every plan includes the full ScanFlow engine for fast, accurate scanning that grows with your team's volume.`
      : "Every plan includes the full ScanFlow engine for fast, accurate scanning that grows with your team's volume. Upgrade, downgrade, or cancel anytime.";

  return (
    <Layout>
      <div className="pt-16">
        <PageHero
          badgeIcon={Zap}
          badgeText="Simple, Transparent Pricing"
          title={
            <>
              Choose a plan that{" "}
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                scales with you
              </span>{" "}
              - no hidden fees.
            </>
          }
          subtitle={heroSubtitle}
          badgeClassName="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-primary border border-primary/15 shadow-sm"
          titleClassName="text-5xl sm:text-6xl lg:text-[4.25rem] font-bold text-primary mb-6 leading-[1.05] tracking-tight"
          subtitleClassName="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl"
          visual={
            <div className="relative animate-float-slow w-full max-w-2xl lg:max-w-3xl lg:scale-105">
              <WarehouseIllustration className="w-full h-auto drop-shadow-xl" />
            </div>
          }
        />

        <section
          id="pricing"
          className="py-20 relative overflow-hidden bg-white border-t border-[#EAECF3]"
        >
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/4 blur-[150px] rounded-full" />
          </div>

          <div className="relative px-5 sm:px-8 lg:px-[70px]">
            {/* Loading */}
            {plansLoading && (
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-secondary" />
                <p className="text-sm text-slate-500">Loading plans…</p>
              </div>
            )}

            {/* Error — server down / plans API unreachable */}
            {!plansLoading && plansError && (
              <MaintenanceState onRetry={refetchPlans} detail={plansError} />
            )}

            {/* Empty */}
            {!plansLoading && !plansError && plans.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <Zap className="w-10 h-10 text-secondary/50" />
                <p className="text-primary font-medium">
                  No plans are available right now.
                </p>
                <p className="text-sm text-slate-400">
                  Please check back soon or get in touch with our sales team.
                </p>
              </div>
            )}

            {/* Plans */}
            {!plansLoading && !plansError && plans.length > 0 && (
              <div>
                {/* Billing toggle — copied from the reference site */}
                <div className="mb-10 flex items-center justify-center">
                  <div className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 border border-slate-200 shadow-md">
                    <button
                      onClick={() => setSelectedCycle("month")}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        selectedCycle === "month"
                          ? "bg-primary text-white shadow-sm"
                          : "text-slate-600 hover:text-secondary"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setSelectedCycle("quarterly")}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        selectedCycle === "quarterly"
                          ? "bg-primary text-white shadow-sm"
                          : "text-slate-600 hover:text-secondary"
                      }`}
                    >
                      Quarterly
                    </button>
                  </div>
                </div>

                {filteredPlans.length > 0 ? (
                  <div className={`grid gap-5 items-stretch ${colClass}`}>
                    {filteredPlans.map((plan, i) => {
                      const allowance = planAllowanceLabel(plan);
                      const popular = plan.is_popular;
                      return (
                        <motion.div
                          key={plan.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className={`relative rounded-2xl p-7 flex flex-col ${
                            popular
                              ? "bg-secondary/5 border-2 border-secondary/40 glow-accent"
                              : "glass"
                          }`}
                        >
                          {popular && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full">
                              <Zap className="w-3 h-3" />
                              Most Popular
                            </div>
                          )}

                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-primary mb-1">
                              {plan.name}
                            </h3>
                            <p className="text-sm text-primary/70 mb-5">
                              {plan.desc}
                            </p>
                            <div className="flex items-end gap-1">
                              <span className="font-bold text-4xl text-primary tracking-tight">
                                {formatPlanPrice(
                                  planPriceForCycle(plan),
                                  plan.currency,
                                )}
                              </span>
                              <span className="text-slate-600 mb-1.5">
                                {shortPeriodLabel(plan.billing_cycle)}
                              </span>
                            </div>
                            {allowance && (
                              <div className="mt-1">
                                <span className="text-xs font-semibold text-secondary border border-secondary/20 rounded-full px-2.5 py-1">
                                  {allowance}
                                </span>
                              </div>
                            )}
                          </div>

                          <ul className="space-y-3 mb-8 flex-1">
                            {plan.marketing_features?.map((feat) => (
                              <li
                                key={feat}
                                className="flex items-start gap-2.5 text-sm"
                              >
                                <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                                <span className="text-primary">{feat}</span>
                              </li>
                            ))}
                          </ul>

                          <button
                            onClick={() => handlePlanClick(plan)}
                            className={`text-center font-semibold text-sm py-3 rounded-full transition-all duration-200 ${
                              popular
                                ? "bg-gradient-to-r from-[#13355A] via-[#1B4A75] to-[#3C9AC4] text-white glow-sm hover:opacity-95"
                                : "bg-primary text-white hover:bg-primary/90"
                            }`}
                          >
                            {plan.trial_days > 0
                              ? "Start Free Trial"
                              : "Get Started"}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-center py-10">
                    <p className="text-primary font-medium">
                      {selectedCycle === "month"
                        ? "No monthly plans available yet."
                        : "No quarterly plans available yet - check back soon."}
                    </p>
                    <p className="text-sm text-slate-400">
                      Get in touch with our sales team to be notified.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Trial note — only when a live plan advertises a trial. */}
            {!plansLoading && !plansError && trialDays > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center text-sm text-slate-600 mt-8"
              >
                {trialDays === 1
                  ? "Eligible plans include a 1-day free trial."
                  : `Eligible plans include a ${trialDays}-day free trial.`}{" "}
                No credit card required.
              </motion.p>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-28 relative isolate bg-[#F7F9FC] border-t border-[#EAECF3] overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl animate-drift" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-drift [animation-delay:2s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-2/8 blur-3xl animate-float-gentle" />
          </div>

          <div className="relative px-5 sm:px-8 lg:px-[70px]">
            {/* Two-column grid */}
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 xl:gap-20 items-start">
              {/* ── Left: sticky title panel ── */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="lg:sticky lg:top-28 h-fit"
              >
                {/* Pill badge */}
                <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary ring-1 ring-secondary/20 mb-6">
                  FAQ
                </span>

                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-primary mb-5">
                  Frequently <br className="hidden sm:block" />
                  asked{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    questions
                  </span>
                </h2>

                {/* Sub-copy */}
                <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-sm">
                  Everything you need to know about ScanFlow pricing before you
                  get started.
                </p>

                {/* CTA */}
                <motion.a
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-primary font-semibold text-sm hover:border-secondary/40 hover:text-secondary transition-all duration-200 shadow-[0_4px_16px_rgba(19,53,90,0.08)]"
                >
                  Contact us <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>

              {/* ── Right: accordion ── */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                {faqs.map((faq, i) => (
                  <FaqItem key={faq.question} faq={faq} index={i} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* cta section */}
        <section
          id="cta"
          className="py-28 relative overflow-hidden bg-gradient-to-br from-primary to-[#1a4a7a]"
        >
          {/* Big glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[700px] h-[400px] bg-accent-2/20 blur-[120px] rounded-full" />
          </div>

          {/* Decorative barcode bars */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
            <div className="flex items-end gap-[4px] h-full w-full">
              {Array.from({ length: 60 }).map((_, i) => {
                const heights = [
                  60, 30, 80, 50, 90, 40, 70, 20, 85, 55, 75, 35,
                ];
                return (
                  <div
                    key={i}
                    className="flex-1 bg-white"
                    style={{ height: `${heights[i % heights.length]}%` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            {/* Badge */}
            {trialDays > 0 && (
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
                <Zap className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-xs font-semibold text-accent-2">
                  {trialDays}-day free trial
                </span>
              </div>
            )}

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
              Ready to choose <span className="text-accent-2">your plan</span>?
            </h2>

            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-12">
              {trialDays > 0
                ? `Start with a free ${trialDays}-day trial on any eligible plan — no credit card required. Upgrade, downgrade, or cancel anytime.`
                : "Upgrade, downgrade, or cancel anytime — pick the plan that matches how your team scans."}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <a
                href="#pricing"
                className="group flex items-center gap-2 bg-white text-primary font-semibold px-9 py-4 rounded-full hover:bg-secondary transition-all duration-200 shadow-lg text-base"
              >
                {trialDays > 0 ? "Start Free Trial" : "See Plans"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 bg-white/10 border border-white/25 text-white font-medium px-9 py-4 rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-200 text-base"
              >
                Contact Sales
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              {[
                "✓ No credit card required",
                "✓ Cancel anytime",
                "✓ All features included",
                ...(trialDays > 0 ? [`✓ Free ${trialDays}-day trial`] : []),
                "✓ Instant setup",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {activePlan && (
        <CheckoutModal
          plan={activePlan}
          step={checkout.step}
          form={checkout.form}
          quote={checkout.leadData?.plan ?? null}
          loading={checkout.loading}
          error={checkout.error}
          onClose={handleCloseModal}
          onFormChange={checkout.setForm}
          onSubmitForm={() => checkout.submitForm(activePlan)}
          onGoHome={handleGoHome}
          onClearError={checkout.clearError}
        />
      )}
    </Layout>
  );
}
