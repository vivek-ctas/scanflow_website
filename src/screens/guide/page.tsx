"use client";

import Layout from "@/components/layout";
import PageHero from "@/components/pageHero";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import { DashboardIllustration, ScanFlowStepsIllustration } from "@/components/ui/illustration";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function Guide() {
  return (
    <Layout>
      <div className="pt-26">
        <PageHero
          badgeIcon={Zap}
          badgeText="Getting Started Guide"
          title={
            <>
              The fastest way to{" "}
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                start scanning
              </span>{" "}
              with CTAS ScanFlow.
            </>
          }
          subtitle="Follow our simple setup guide to add barcode scanning to your web or mobile app in minutes - blurry, damaged, tilted, or low-light labels are read in milliseconds."
          badgeClassName="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-primary border border-primary/15 shadow-sm"
          titleClassName="text-5xl sm:text-6xl lg:text-[4.25rem] font-bold text-primary mb-6 leading-[1.05] tracking-tight"
          subtitleClassName="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl"
          visual={
            <div className="relative animate-float-slow w-full max-w-2xl lg:max-w-3xl lg:scale-105">
              <DashboardIllustration className="w-full h-auto drop-shadow-xl" />
            </div>
          }
        />

        {/* Full-width ScanFlow Steps Illustration */}
        <section className="relative py-14 lg:py-20 px-4 sm:px-6 lg:px-10 bg-white border-t border-[#EAECF3] overflow-hidden">
          <div className="max-w-[1440px] mx-auto">
            <div className="relative animate-float-slow lg:scale-105">
              <ScanFlowStepsIllustration className="w-full h-auto drop-shadow-xl" />
            </div>
          </div>
        </section>

        <HowItWorksSection />
        {/* <LiveScanDemo /> */}

        {/* cta section */}
        <section id="cta" className="py-28 relative overflow-hidden bg-gradient-to-br from-primary to-[#1a4a7a]">
          {/* Big glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[700px] h-[400px] bg-accent-2/20 blur-[120px] rounded-full" />
          </div>

          {/* Decorative barcode bars */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
            <div className="flex items-end gap-[4px] h-full w-full">
              {Array.from({ length: 60 }).map((_, i) => {
                const heights = [60, 30, 80, 50, 90, 40, 70, 20, 85, 55, 75, 35];
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
                <Zap className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-xs font-semibold text-accent-2">Ready in 10 minutes</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
                Start scanning{" "}
                <span className="text-accent-2">in minutes</span>.
              </h2>

              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-12">
                Integrate ScanFlow&apos;s barcode scanning engine into your web or mobile workflow today. Fast to set up, built to scale.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                <a
                  href="/contact"
                  className="group flex items-center gap-2 bg-white text-primary font-semibold px-9 py-4 rounded-full hover:bg-secondary transition-all duration-200 shadow-lg text-base"
                >
                  contact sales
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/pricing"
                  className="flex items-center gap-2 bg-white/10 border border-white/25 text-white font-medium px-9 py-4 rounded-full hover:bg-white/20 transition-all duration-200 text-base"
                >
                  quick start
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
                {[
                  "✓ No credit card required",
                  "✓ Fast setup",
                  "✓ Web & mobile support",
                  "✓ Free 14-day trial",
                  "✓ Cancel anytime",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
