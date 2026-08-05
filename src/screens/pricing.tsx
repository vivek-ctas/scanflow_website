"use client";

import Layout from "@/components/layout";
import PageHero from "@/components/pageHero";
import PricingSection from "@/components/sections/PricingSection";

export default function Pricing() {
  return (
    <Layout>
      <div className="pt-26">
        <PageHero
          badgeText="Pricing"
          title={<>Simple, transparent <span className="text-gradient">pricing</span></>}
          subtitle="Start free, scale as you grow. No hidden fees. Cancel anytime."
        />
        <PricingSection />
      </div>
    </Layout>
  );
}
