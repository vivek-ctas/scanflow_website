"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  ScanLine,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import WaveDivider from "@/components/sections/WaveDivider";

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

function HeroScanVisual() {
  return (
    <div className="relative h-[460px] md:h-[520px] w-full flex items-center justify-center">
      {/* Constellation SVG */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" aria-hidden>
          {[
            [10, 5], [30, 15], [50, 10], [70, 12], [95, 8],
            [5, 95], [50, 100], [80, 85], [90, 90], [20, 60],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="0.6" fill="#3C9AC4" />
          ))}
          {[
            [10, 5, 30, 15], [10, 5, 50, 10], [30, 15, 70, 12],
            [50, 10, 95, 8], [80, 85, 90, 90], [50, 100, 80, 85],
            [20, 60, 80, 85], [20, 60, 30, 15],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3C9AC4" strokeWidth="0.1" />
          ))}
        </svg>
      </div>

      {/* Browser-like scanner window */}
      <div className="relative w-full max-w-[560px] aspect-[16/11] bg-white rounded-[22px] shadow-[0_50px_100px_-25px_rgba(19,53,90,0.25)] border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/70">
          <div className="flex gap-1.5 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-[1px]">
            scanpro / live
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">LIVE</span>
          </div>
        </div>

        <div className="relative h-[calc(100%-46px)] bg-white/80 p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] bg-[size:25px_25px] bg-[linear-gradient(to_right,#13355A_1px,transparent_1px),linear-gradient(to_bottom,#13355A_1px,transparent_1px)]" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <div className="flex items-end gap-[3px] opacity-90 mb-4">
              {[6, 3, 10, 2, 7, 3, 5, 2, 12, 3, 8, 4, 10, 7, 9, 1, 5, 7, 3, 7, 6, 3, 2, 5, 5, 6, 7, 2, 9, 1].map((w, i) => (
                <div key={i} className="bg-ink rounded-sm" style={{ width: `${w}px`, height: 90 }} />
              ))}
            </div>

            <div className="absolute w-[78%] h-[58%] border border-ink/30 rounded-2xl">
              <div className="absolute inset-x-2 h-[2px] bg-accent-2 shadow-[0_0_22px_#3C9AC4,0_0_8px_#3C9AC4] animate-scan-premium" />
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent-2 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent-2 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent-2 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent-2 rounded-br-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 border border-accent-2/80 rounded-full flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-accent-2/60 animate-pulse-ring" />
                <span className="w-1.5 h-1.5 bg-accent-2 rounded-full shadow-[0_0_10px_#3C9AC4]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="hidden sm:block absolute left-[2%] top-[18%] z-30 bg-white/95 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(19,53,90,0.12)] w-48 -rotate-2 animate-float-gentle"
      >
        <div className="text-[9px] text-ink/50 font-bold mb-1 uppercase tracking-widest">Detected</div>
        <div className="text-ink font-semibold text-sm">Code 128</div>
        <div className="text-emerald-600 text-[10px] font-mono mt-1">99.02% confidence</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="hidden sm:block absolute right-[2%] top-[24%] z-30 bg-white/95 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(19,53,90,0.12)] w-44 rotate-2 animate-float-down"
      >
        <div className="text-[9px] text-ink/50 font-bold mb-1 uppercase tracking-widest">Decode time</div>
        <div className="text-ink text-2xl font-light">
          18.0<span className="text-ink/60 text-xs ml-1 font-normal">ms</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="hidden md:block absolute left-[6%] bottom-[6%] z-30 bg-white/95 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(19,53,90,0.12)] w-56 -rotate-1 animate-float-up"
      >
        <div className="text-[10px] text-ink/60 font-bold mb-1 uppercase tracking-widest">Blur Recovery</div>
        <div className="text-ink font-semibold text-sm leading-snug">AI-enhanced detection engine</div>
      </motion.div>
    </div>
  );


}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <>
      <section className="relative overflow-hidden bg-grid-stripes" ref={heroRef}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(107,193,224,0.22),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(19,53,90,0.14),transparent_44%)]" />
        <div className="container-wide py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="lg:col-span-6">
              <motion.p variants={item} className="section-label mb-5">
                Enterprise Barcode Intelligence
              </motion.p>
              <motion.h1 variants={item} className="font-display text-4xl md:text-6xl leading-tight text-ink max-w-3xl">
                Scan any barcode in <span className="text-gradient">real-world conditions</span> with CTAS ScanPro.
              </motion.h1>
              <motion.p variants={item} className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
                Purpose-built for logistics, warehouse, and retail workflows where speed, readability, and reliability drive business outcomes.
              </motion.p>
              <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
                <motion.a
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ink to-accent px-7 py-3.5 text-white font-semibold transition-all glow-accent"
                >
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#reliability"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-ink font-semibold hover:border-accent/40 transition-colors"
                >
                  Watch Live Demo
                </motion.a>
              </motion.div>
              <motion.div variants={item} className="mt-10 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-ink/10 bg-white/90 p-3 text-sm">
                  <p className="font-display text-xl text-ink"><AnimatedCounter target={99.02} suffix="%" decimals={2} /></p>
                  <p className="text-muted text-xs">Decode accuracy</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/90 p-3 text-sm">
                  <p className="font-display text-xl text-ink"><AnimatedCounter target={18} suffix="ms" decimals={1} /></p>
                  <p className="text-muted text-xs">Response time</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/90 p-3 text-sm">
                  <p className="font-display text-xl text-ink"><AnimatedCounter target={10000} suffix="+" /></p>
                  <p className="text-muted text-xs">Scans processed</p>
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
    </>
  );
}
