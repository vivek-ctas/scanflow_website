"use client";

import Layout from "@/components/layout";
import { HeroScanVisual } from "@/components/sections/HeroSection";
import { conditions } from "@/components/sections/BarcodeConditions";
import { ArrowRight, Zap } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import AccuracyDonut from "@/components/ui/AccuracyDonut";
import SpeedChart from "@/components/ui/SpeedChart";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCases } from "@/components/sections/landingData";
import { features } from "@/components/sections/landingData";
import WaveDivider from "@/components/sections/WaveDivider";
export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "-120px" });
  const stats = [
    { value: 18, suffix: "ms", label: "Avg. decode time", decimals: 0 },
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
        <section className="relative overflow-hidden bg-grid-stripes" ref={heroRef}>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(107,193,224,0.22),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(19,53,90,0.14),transparent_44%)]" />
          <div className="px-5 sm:px-8 lg:px-[70px] py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="lg:col-span-6">
                <motion.p variants={item} className="section-label mb-5">
                  Enterprise Barcode Intelligence
                </motion.p>
                <motion.h1 variants={item} className="font-display text-4xl md:text-6xl font-bold leading-tight text-primary max-w-3xl">
                  Scan any barcode in <span className="text-gradient">real-world conditions</span> with CTAS ScanPro.
                </motion.h1>
                <motion.p variants={item} className="mt-6 text-lg text-slate-700 max-w-2xl leading-relaxed">
                  Purpose-built for logistics, warehouse, and retail workflows where speed, readability, and reliability drive business outcomes.
                </motion.p>
                <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
                  <motion.a
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#13355A] via-[#1B4A75] to-[#3C9AC4] px-7 py-3.5 text-white font-semibold transition-all glow-accent"
                  >
                    Start Free Trial <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -2 }}
                    href="#reliability"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-7 py-3.5 text-primary font-semibold hover:border-secondary/40 transition-colors"
                  >
                    Watch Live Demo
                  </motion.a>
                </motion.div>
                <motion.div variants={item} className="mt-10 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-primary/10 bg-white/90 p-3 text-sm">
                    <p className="font-display text-xl text-primary"><AnimatedCounter target={99.02} suffix="%" decimals={2} /></p>
                    <p className="text-muted-foreground text-xs">Decode accuracy</p>
                  </div>
                  <div className="rounded-xl border border-primary/10 bg-white/90 p-3 text-sm">
                    <p className="font-display text-xl text-primary"><AnimatedCounter target={18} suffix="ms" decimals={1} /></p>
                    <p className="text-muted-foreground text-xs">Response time</p>
                  </div>
                  <div className="rounded-xl border border-primary/10 bg-white/90 p-3 text-sm">
                    <p className="font-display text-xl text-primary"><AnimatedCounter target={10000} suffix="+" /></p>
                    <p className="text-muted-foreground text-xs">Scans processed</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div style={{ y: yParallax }} className="lg:col-span-6">
                <HeroScanVisual />
              </motion.div>
            </div>
          </div>
          <WaveDivider />
        </section>

        {/* FeaturesSection  */}
        <section id="features" ref={ref} className="relative isolate bg-white border-t border-[#EAECF3] py-24 overflow-hidden">
          <div className="pointer-events-none absolute -left-10 top-8 -z-10 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="px-5 sm:px-8 lg:px-[70px] grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-br from-white via-muted to-white/90 p-10 shadow-[0_28px_80px_rgba(19,53,90,0.08)] lg:sticky lg:top-24 h-fit"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="pointer-events-none absolute -right-10 top-10 h-28 w-28 rounded-full bg-secondary/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-8 bottom-8 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
              <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-secondary ring-1 ring-secondary/20">
                Feature spotlight
              </span>
              <h2 className="mt-8 text-4xl font-display font-bold tracking-tight text-primary sm:text-5xl">
                A smarter way to present barcode scanning advantages.
              </h2>
              <p className="mt-6 max-w-xl text-slate-700 leading-relaxed text-lg">
                ScanPro combines speed, damage recovery, angle tolerance, and flexible input modes into a unified scanning experience built for real-world operations.
              </p>
              <div className="mt-10 grid gap-4">
                <div className="rounded-3xl border border-secondary/10 bg-secondary/5 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-secondary/90">Why this matters</p>
                  <p className="mt-3 text-primary/80 leading-relaxed">
                    When every scan can mean fewer delays and cleaner inventory, a polished feature set becomes a competitive advantage for teams handling damaged or moving labels.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={feature.title}
                    whileHover={{ y: -10, scale: 1.01 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/95 p-7 shadow-[0_20px_50px_rgba(19,53,90,0.09)] transition duration-300"
                  >
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-secondary/15 via-transparent to-primary/5" />
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary/12 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
                        {index + 1}
                      </div>
                    </div>
                    <div className="relative z-10 mt-6">
                      <h3 className="text-xl font-display text-primary">{feature.title}</h3>
                      <p className="mt-4 text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                    <div className="pointer-events-none absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-secondary/10 blur-2xl" />
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* UseCasesSection  */}
        <section id="use-cases" ref={ref} className="py-32 relative isolate bg-[#F7F9FC] border-t border-[#EAECF3] overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl animate-drift" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-drift [animation-delay:2s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-2/8 blur-3xl animate-float-gentle" />
          </div>

          <div className="relative px-5 sm:px-8 lg:px-[70px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-24"
            >
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-primary ring-1 ring-primary/20 mb-6">
                Real-world applications
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Works everywhere <span className="text-gradient">you do</span>
              </h2>
              <p className="text-slate-700 text-xl max-w-2xl mx-auto leading-relaxed">
                From warehouse floors to retail checkouts — ScanPro is built for every environment where barcodes matter, delivering consistent performance across diverse operational contexts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {useCases.map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <motion.article
                    key={uc.title}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-white/95 via-muted/80 to-white/90 backdrop-blur-sm p-8 shadow-[0_24px_60px_rgba(19,53,90,0.1)] transition-all duration-500 hover:shadow-[0_32px_80px_rgba(19,53,90,0.15)]"
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
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section >

        {/* BarcodeConditions */}
        <section
          id="reliability"
          className="py-20 px-5 sm:px-8 lg:px-[70px] bg-white border-t border-[#EAECF3]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-2xl"
          >
            <p className="section-label mb-4">Real-world resilience</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight">
              Decodes barcodes that <span className="text-gradient">others give up on</span>.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {conditions.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.article
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-3xl border border-primary/10 bg-white/95 backdrop-blur-sm p-6 shadow-[0_16px_44px_rgba(19,53,90,0.08)] overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-secondary/12 text-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-xl text-primary">{c.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-secondary border border-secondary/25 rounded-full px-2 py-0.5">DECODED</span>
                  </div>

                  <div className="rounded-2xl bg-muted p-5 relative overflow-hidden">
                    {c.render()}
                    {/* scanning beam overlay */}
                    <div className="absolute inset-x-4 h-[2px] bg-accent-2 shadow-[0_0_18px_#3C9AC4] animate-scan-premium" />
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    Confidence <span className="text-primary font-semibold">99.02%</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* PerformanceSection  */}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="section-label mb-4">Performance</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-5">
                Numbers that{" "}
                <span className="text-gradient">speak for themselves</span>
              </h2>
              <p className="text-slate-700 text-lg max-w-lg mx-auto">
                Optimized through extensive real-world barcode and image scanning tests.
              </p>
            </motion.div>

            {/* Donut + Speed chart hero row */}
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-3xl p-8 flex flex-col items-center justify-center"
              >
                <AccuracyDonut value={99.02} />
                <p className="mt-4 text-sm text-muted-foreground text-center max-w-xs">
                  Tested across 10,000+ real-world barcode samples in production environments.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass rounded-3xl p-8 flex flex-col justify-center"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Decode latency</span>
                  <span className="text-xs font-mono text-secondary">live</span>
                </div>
                <div className="font-display text-5xl font-bold text-primary mb-1">
                  18<span className="text-2xl text-muted-foreground ml-1">ms</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Median end-to-end response time per scan.</p>
                <SpeedChart />
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-16">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass rounded-2xl p-7 text-center group hover:border-secondary/20 transition-all duration-300"
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
                </motion.div>
              ))}
            </div>

            {/* Performance bar chart */}
            {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-1">
                Scanning Performance
              </h3>
              <p className="text-sm text-muted-foreground">Performance across different barcode conditions</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-secondary inline-block" />
                ScanPro
              </span>
            </div>
          </div>

          {[
            { label: "Clear barcode", scanpro: 18 },
            { label: "Blurred barcode", scanpro: 32 },
            { label: "Damaged barcode", scanpro: 40 },
            { label: "Low light", scanpro: 28 },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="mb-5 last:mb-0"
            >
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-mono text-xs text-secondary">{row.scanpro}ms avg</span>
              </div>
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.scanpro}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                  className="absolute inset-y-0 left-0 bg-secondary rounded-full"
                  style={{ boxShadow: "0 0 8px rgba(0,229,160,0.6)" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div> */}
          </div>

        </section>

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
                <span className="text-[11px] uppercase tracking-[0.2em] text-accent-2 font-mono">Ready in 10 minutes</span>
              </div>

              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05] text-white">
                Built for modern{" "}
                <span className="text-accent-2">barcode</span>{" "}
                workflows.
              </h2>

              <p className="text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-12">
                Built for fast and reliable barcode scanning across web and mobile workflows. Start testing ScanPro in minutes with a free trial.
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
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
