"use client";

import Layout from "@/components/layout";
import { conditions } from "@/components/sections/BarcodeConditions";
import { ArrowRight, Zap, ChevronDown } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import AccuracyDonut from "@/components/ui/AccuracyDonut";
import SpeedChart from "@/components/ui/SpeedChart";
import { useState } from "react";
import { useCases, problemCards } from "@/components/sections/landingData";
import WaveDivider from "@/components/sections/WaveDivider";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyUseScanflowSection from "@/components/sections/WhyUseScanflowSection";
import { BarcodeReliabilityMockup } from "@/components/ui/illustration";
import dynamic from 'next/dynamic';

const ScanFlowHero = dynamic(() => import('@/components/ui/Mobileillustration/Scanflowhero'), { ssr: false });

const faqs = [
  {
    question: "What is ScanFlow?",
    answer:
      "ScanFlow is a high-performance barcode scanning solution that quickly and accurately reads 1D barcodes using a device's camera. It's designed to deliver reliable results even in challenging real-world conditions.",
  },
  {
    question: "Can ScanFlow scan damaged or blurry barcodes?",
    answer:
      "Yes. ScanFlow accurately reads blurry, damaged, scratched, faded, tilted, partially covered, and low-light 1D barcodes. Its advanced scanning engine is optimized for situations where traditional barcode scanners often fail.",
  },
  {
    question: "Which barcode types does ScanFlow support?",
    answer:
      "ScanFlow supports widely used 1D barcode formats, including EAN-13, EAN-8, UPC-A, UPC-E, Code 39, Code 128, ITF, Codabar, and GS1. Additional barcode formats will continue to be introduced as ScanFlow evolves.",
  },
  {
    question: "Does ScanFlow require an internet connection?",
    answer:
      "No. ScanFlow performs barcode recognition directly on the device, allowing reliable scanning even when an internet connection is unavailable.",
  },
  {
    question: "Where can ScanFlow be used?",
    answer:
      "ScanFlow is designed for any business that relies on fast and accurate barcode scanning, including retail, logistics, warehouses, manufacturing, inventory management, healthcare, and point-of-sale systems.",
  },
];

export default function Home() {
  const stats = [
    { value: 18, suffix: "ms", label: "Average scan time", decimals: 0 },
    { value: 99.02, suffix: "%", label: "Scan reliability", decimals: 2 },
    { value: 2, suffix: "+", label: "Barcode types", decimals: 0 },
    { value: 10000, suffix: "+", label: "Scans tested" },
    { value: 24, suffix: "/7", label: "Scanner availability", decimals: 0, },
    { value: 500, suffix: "+", label: "Images processed", decimals: 0, },
  ];
  return (
    <Layout>
      <div className="pt-26 relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-45" />
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl animate-drift" />
        <div className="pointer-events-none absolute top-[28rem] -right-20 -z-10 h-80 w-80 rounded-full bg-primary/12 blur-3xl animate-drift [animation-delay:1.4s]" />
        <div className="pointer-events-none absolute bottom-10 left-1/3 -z-10 h-64 w-64 rounded-full bg-accent-2/20 blur-3xl animate-drift [animation-delay:2.2s]" />

        {/* HeroSection */}
        <section className="relative overflow-hidden bg-grid-stripes">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(107,193,224,0.22),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(19,53,90,0.14),transparent_44%)]" />
          <div className="px-5 sm:px-8 lg:px-[70px] py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <p className="section-label mb-5">
                  Enterprise Barcode Intelligence
                </p>
                <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-primary max-w-3xl">
                  Scan any barcode in <span className="text-gradient">real-world conditions</span> with CTAS ScanFlow.
                </h1>
                <p className="mt-6 text-lg text-slate-700 max-w-2xl leading-relaxed">
                  ScanFlow helps businesses scan barcodes quickly using a mobile phone camera - even when labels are blurry, damaged, tilted, or difficult to read.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#13355A] via-[#1B4A75] to-[#3C9AC4] px-7 py-3.5 text-white font-semibold transition-all hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98] glow-accent"
                  >
                    Start Free Trial <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#reliability"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-7 py-3.5 text-primary font-semibold hover:border-secondary/40 hover:-translate-y-0.5 transition-all"
                  >
                    See How It Works
                  </a>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-primary/10 bg-white/90 p-3 text-sm">
                    <p className="font-display text-xl text-primary"><AnimatedCounter target={99.02} suffix="%" decimals={2} /></p>
                    <p className="text-muted-foreground text-xs">Scan reliability</p>
                  </div>
                  <div className="rounded-xl border border-primary/10 bg-white/90 p-3 text-sm">
                    <p className="font-display text-xl text-primary"><AnimatedCounter target={18} suffix="ms" decimals={1} /></p>
                    <p className="text-muted-foreground text-xs">Average scan time</p>
                  </div>
                  <div className="rounded-xl border border-primary/10 bg-white/90 p-3 text-sm">
                    <p className="font-display text-xl text-primary"><AnimatedCounter target={10000} suffix="+" /></p>
                    <p className="text-muted-foreground text-xs">Scans tested</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <ScanFlowHero
                />
              </div>
            </div>
          </div>
          <WaveDivider />
        </section>

        {/* Problem / Value Section */}
        <section id="problem-value" className="relative bg-white border-t border-[#EAECF3] py-16 lg:py-24 overflow-hidden">

          <div className="px-5 sm:px-8 lg:px-[70px]">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Heading & Description */}
              <div className="lg:col-span-5 text-left">
                <span className="inline-flex items-center rounded-full bg-[#EBF4FA] px-5 py-2 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#3C9AC4] border border-[#3C9AC4]/20 uppercase mb-6 shadow-xs">
                  PROBLEM &amp; VALUE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#13355A] leading-tight">
                  Barcode scanning shouldn&apos;t <span className="bg-gradient-to-r from-[#3C9AC4] via-[#1B4A75] to-[#13355A] bg-clip-text text-transparent">slow your team down.</span>
                </h2>
                <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
                  Real-world barcodes aren&apos;t always perfect. Labels get damaged, printed poorly, become blurry, or appear at difficult angles.
                </p>
              </div>

              {/* Right Column: BarcodeReliabilityMockup SVG Illustration */}
              <div className="lg:col-span-7">
                <div className="relative animate-float-slow">
                  <BarcodeReliabilityMockup className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. How ScanFlow Works Section */}
        <HowItWorksSection />

        {/* 4. Real-World Scanning Section */}
        <section
          id="reliability"
          className="py-20 lg:py-28 px-5 sm:px-8 lg:px-[70px] bg-white border-t border-[#EAECF3] relative overflow-hidden"
        >
          {/* Background ambient lighting */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#3C9AC4]/8 blur-3xl animate-drift" />
            <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-[#6BC1E0]/8 blur-3xl animate-drift [animation-delay:2s]" />
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF4FA] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#3C9AC4] border border-[#3C9AC4]/20 shadow-xs mb-6">
              <Zap className="w-3.5 h-3.5" /> REAL-WORLD SCANNING
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#13355A] leading-tight">
              Built for <span className="bg-gradient-to-r from-[#3C9AC4] via-[#1B4A75] to-[#13355A] bg-clip-text text-transparent">real-world barcodes.</span>
            </h2>
            <p className="mt-6 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your team doesn&apos;t always get a perfect barcode. ScanFlow is designed for everyday scanning situations where labels may be difficult to read.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conditions.map((c) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.title}
                  className="group rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-sm p-6 shadow-[0_12px_36px_rgba(19,53,90,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(19,53,90,0.12)] hover:border-[#3C9AC4]/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#EBF4FA] text-[#3C9AC4] flex items-center justify-center transition-colors group-hover:bg-[#13355A] group-hover:text-white shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#13355A] group-hover:text-[#3C9AC4] transition-colors">{c.title}</h3>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#3C9AC4] bg-[#EBF4FA] border border-[#3C9AC4]/20 rounded-full px-2.5 py-0.5 shadow-xs">
                        READY
                      </span>
                    </div>

                    <div className="rounded-2xl bg-slate-900 p-2 relative overflow-hidden mb-4 shadow-inner border border-slate-800">
                      {c.render()}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                        <span className="text-[#13355A] font-semibold">99.02% accuracy</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#3C9AC4] tracking-wide">LIVE DEMO</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Small Line Banner */}
          <div className="mt-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3C9AC4]/30 bg-[#EBF4FA] px-7 py-3 text-sm sm:text-base font-semibold text-[#13355A] shadow-xs hover:border-[#3C9AC4]/50 transition-colors">
              <Zap className="w-4 h-4 text-[#3C9AC4]" /> Just point. Scan. Continue.
            </span>
          </div>
        </section>

        {/*6. WHERE IT FITS*/}
        <section id="use-cases" className="py-32 relative isolate bg-[#F7F9FC] border-t border-[#EAECF3] overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl animate-drift" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-drift [animation-delay:2s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-2/8 blur-3xl animate-float-gentle" />
          </div>

          <div className="relative px-5 sm:px-8 lg:px-[70px]">
            <div className="text-center mb-24">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-primary ring-1 ring-primary/20 mb-6">
                Real-world applications
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Works wherever <span className="text-gradient">your team scans.</span>
              </h2>
              <p className="text-slate-700 text-xl max-w-2xl mx-auto leading-relaxed">
                From warehouse operations to retail workflows, ScanFlow fits into everyday barcode-based work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {useCases.map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <article
                    key={uc.title}
                    className="group relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-white/95 via-muted/80 to-white/90 backdrop-blur-sm p-8 shadow-[0_24px_60px_rgba(19,53,90,0.1)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_32px_80px_rgba(19,53,90,0.15)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-secondary/10 blur-2xl group-hover:bg-secondary/20 transition-colors duration-500" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/15 to-secondary/5 text-secondary flex items-center justify-center shadow-lg group-hover:shadow-secondary/25 transition-shadow duration-300">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                        {uc.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed text-base">
                        {uc.description}
                      </p>

                      <div className="mt-auto pt-6 border-t border-primary/10">
                        <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                          Optimized for {uc.title.toLowerCase()}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>


        {/* 7. Why Businesses Use ScanFlow Section */}
        <WhyUseScanflowSection />


        {/* 8. PERFORMANCE  */}
        <section id="performance" className="py-28 relative bg-[#F1F3FC] border-t border-[#EAECF3] overflow-hidden">
          {/* Animated barcode BG */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none">
            <div className="flex items-end gap-[3px] h-64 w-full max-w-5xl">
              {Array.from({ length: 80 }).map((_, i) => {
                const h = [4, 2, 5, 1, 3, 5, 2, 4, 1, 3, 5][i % 11];
                return (
                  <div
                    key={i}
                    className="flex-1 bg-secondary rounded-sm"
                    style={{ height: `${h * 18 + 10}%` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-secondary/5 blur-[120px] rounded-full" />

          <div className="relative px-5 sm:px-8 lg:px-[70px]">
            <div className="text-center mb-20">
              <p className="section-label mb-4">Performance</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-5">
                Scanning that{" "}
                <span className="text-gradient">keeps up with your workflow.</span>
              </h2>
              <p className="text-slate-700 text-lg max-w-lg mx-auto">
                Designed for fast and reliable barcode scanning in everyday working conditions.
              </p>
            </div>

            {/* Donut + Speed chart hero row */}
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center">
                <AccuracyDonut value={99.02} />
                <p className="mt-4 text-sm text-muted-foreground text-center max-w-xs">
                  Tested across 10,000+ real-world barcode samples in production environments.
                </p>
              </div>
              <div className="glass rounded-3xl p-8 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Decode latency</span>
                  <span className="text-xs font-mono text-secondary">live</span>
                </div>
                <div className="font-display text-5xl font-bold text-primary mb-1">
                  18<span className="text-2xl text-muted-foreground ml-1">ms</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Median end-to-end response time per scan.</p>
                <SpeedChart />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-16">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-7 text-center group hover:border-secondary/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="font-display text-5xl font-bold text-primary mb-2">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      duration={2200}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {(() => {
          function FaqItem({
            faq,
            index,
          }: {
            faq: { question: string; answer: string };
            index: number;
          }) {
            const [open, setOpen] = useState(false);
            return (
              <div className="group">
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  aria-expanded={open}
                  className={`w-full flex items-center justify-between gap-4 rounded-[1.5rem] border px-7 py-6 text-left transition-all duration-300 shadow-[0_8px_30px_rgba(19,53,90,0.07)] hover:shadow-[0_16px_44px_rgba(19,53,90,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${open
                    ? "bg-gradient-to-br from-white via-muted to-white/90 border-secondary/25"
                    : "bg-white/95 border-primary/10 hover:border-secondary/20"
                    }`}
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <span
                      className={`shrink-0 flex items-center justify-center h-9 w-9 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${open
                        ? "bg-secondary text-white"
                        : "bg-secondary/10 text-secondary border border-secondary/15"
                        }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-semibold text-primary leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-full border transition-all duration-300 ${open
                      ? "bg-secondary border-secondary text-white rotate-180"
                      : "bg-primary/5 border-primary/10 text-primary/60 group-hover:border-secondary/30 group-hover:text-secondary"
                      }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {open && (
                  <div className="px-7 pt-3 pb-5">
                    <div className="ml-14 border-l-2 border-secondary/20 pl-5">
                      <p className="text-slate-700 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
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
                  <div className="lg:sticky lg:top-28 h-fit">
                    {/* Pill badge */}
                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-secondary ring-1 ring-secondary/20 mb-6">
                      FAQ
                    </span>

                    {/* Heading */}
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-primary mb-5">
                      Frequently{" "}
                      <br className="hidden sm:block" />
                      asked{" "}
                      <span className="text-gradient">questions</span>
                    </h2>

                    {/* Sub-copy */}
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-sm">
                      Everything you need to know about ScanFlow before you get
                      started.
                    </p>

                    {/* CTA */}
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-primary font-semibold text-sm hover:border-secondary/40 hover:text-secondary hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-200 shadow-[0_4px_16px_rgba(19,53,90,0.08)]"
                    >
                      Contact us <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* ── Right: accordion ── */}
                  <div className="flex flex-col gap-4">
                    {faqs.map((faq, i) => (
                      <FaqItem key={faq.question} faq={faq} index={i} />
                    ))}
                  </div>

                </div>
              </div>
            </section>
          );
        })()}

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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
              <Zap className="w-3.5 h-3.5 text-accent-2" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-accent-2 font-mono">Ready in 10 minutes</span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05] text-white">
              Built for modern{" "}
              <span className="text-accent-2">barcode</span>{" "}
              workflows.
            </h2>

            <p className="text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-12">
              Built for fast and reliable barcode scanning across web and mobile workflows. Start testing ScanFlow in minutes with a free trial.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <a
                href="#contact"
                className="group flex items-center gap-2 bg-white text-primary font-bold px-9 py-4 rounded-full hover:bg-secondary transition-all duration-200 shadow-lg text-base"
              >
                Start Free 14-Day Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#reliability"
                className="flex items-center gap-2 bg-white/10 border border-white/25 text-white font-medium px-9 py-4 rounded-full hover:bg-white/20 transition-all duration-200 text-base"
              >
                Watch Live Demo
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/75">
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
          </div>
        </section>

      </div>
    </Layout>
  );
}
