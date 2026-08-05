"use client";

import Layout from "@/components/layout";
import PageHero from "@/components/pageHero";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { plans } from "@/components/sections/landingData";

export default function Pricing() {
  return (
    <Layout>
      <div className="pt-26">
        <PageHero
          badgeText="Pricing"
          title={<>Simple, transparent <span className="text-gradient">pricing</span></>}
          subtitle="Start free, scale as you grow. No hidden fees. Cancel anytime."
        />
        <section id="pricing" className="py-20 relative overflow-hidden bg-white border-t border-[#EAECF3]">
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/4 blur-[150px] rounded-full" />
          </div>

          <div className="relative px-5 sm:px-8 lg:px-[70px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative rounded-2xl p-7 flex flex-col ${plan.highlight
                    ? "bg-secondary/5 border-2 border-secondary/40 glow-accent"
                    : "glass"
                    }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-secondary text-primary text-xs font-bold px-4 py-1.5 rounded-full">
                      <Zap className="w-3 h-3" />
                      {plan.badge}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-display text-xl font-bold text-primary mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-primary mb-5">{plan.description}</p>
                    <div className="flex items-end gap-1">
                      {plan.price === "Custom" ? (
                        <span className="font-display text-4xl font-bold text-primary">
                          Custom
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-4xl font-bold text-primary">
                            ${plan.price}
                          </span>
                          <span className="text-muted-foreground mb-1.5">{plan.period}</span>
                        </>
                      )}
                    </div>
                    <div className="mt-1">
                      <span className="font-mono text-xs text-secondary border border-secondary/20 rounded-full px-2.5 py-1">
                        {plan.scans}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-primary">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#cta"
                    className={`text-center font-semibold text-sm py-3 rounded-full transition-all duration-200 ${plan.highlight
                      ? "bg-gradient-to-r from-[#13355A] via-[#1B4A75] to-[#3C9AC4] text-white glow-sm"
                      : "bg-primary text-white hover:bg-primary/90"
                      }`}
                  >
                    {plan.cta}
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-muted-foreground mt-8"
            >
              All plans include a 14-day free trial. No credit card required.
            </motion.p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
