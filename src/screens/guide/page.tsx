"use client";

import Layout from "@/components/layout";
import PageHero from "@/components/pageHero";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LiveScanDemo from "@/components/sections/LiveScanDemo";
import CTASection from "@/components/sections/CTASection";

export default function Guide() {
  return (
    <Layout>
      <div className="pt-26">
        <PageHero
          badgeText="Guide"
          title={<>Get started with <span className="text-gradient">ScanPro</span></>}
          subtitle="This is a guide section. Learn how to integrate ScanPro's barcode scanning engine into your workflows in minutes."
        />
        <HowItWorksSection />
        <LiveScanDemo />
        <CTASection />
      </div>
    </Layout>
  );
}
