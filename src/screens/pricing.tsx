"use client";

import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import PricingSection from "@/components/sections/PricingSection";

export default function Pricing() {
  return (
    <Layout>
      <div className="pt-26">
        <PageHeader
          badge="Pricing"
          title={<>Simple, transparent <span className="text-gradient">pricing</span></>}
          subtitle="Start free, scale as you grow. No hidden fees. Cancel anytime."
        />
        <PricingSection />
      </div>
    </Layout>
  );
}
