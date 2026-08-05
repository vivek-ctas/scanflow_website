"use client";

import Layout from "@/components/layout";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import BarcodeConditions from "@/components/sections/BarcodeConditions";
import PerformanceSection from "@/components/sections/PerformanceSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <Layout>
      <div className="pt-26 relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-45" />
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl animate-drift" />
        <div className="pointer-events-none absolute top-[28rem] -right-20 -z-10 h-80 w-80 rounded-full bg-primary/12 blur-3xl animate-drift [animation-delay:1.4s]" />
        <div className="pointer-events-none absolute bottom-10 left-1/3 -z-10 h-64 w-64 rounded-full bg-accent-2/20 blur-3xl animate-drift [animation-delay:2.2s]" />

        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <BarcodeConditions />
        <PerformanceSection />
        <CTASection />
      </div>
    </Layout>
  );
}
