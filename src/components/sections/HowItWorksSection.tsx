"use client";

import { Smartphone, Camera, ScanLine, CheckCircle2, Copy } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 px-5 sm:px-8 lg:px-[70px] relative bg-white border-t border-[#EAECF3] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl animate-drift" />
        <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-drift [animation-delay:2s]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-primary ring-1 ring-primary/20 mb-6">
            03. How ScanFlow Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
            From phone to scan in <span className="text-gradient">seconds.</span>
          </h2>
          <p className="mt-6 text-slate-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            ScanFlow keeps barcode scanning simple. Your team can use their own phones and start scanning without dedicated scanning equipment.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Step 01: Open */}
          <article className="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-b from-slate-50/80 via-white to-white p-6 shadow-[0_16px_44px_rgba(19,53,90,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(19,53,90,0.12)] hover:border-secondary/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  Step 01
                </span>
                <div className="h-9 w-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>

              {/* Visual 1: Phone showing ScanFlow */}
              <div className="relative h-48 w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 p-3 overflow-hidden shadow-inner flex flex-col items-center justify-center mb-6">
                <div className="relative w-36 h-40 bg-slate-950 rounded-2xl border-2 border-slate-700/60 p-2 shadow-2xl flex flex-col items-center justify-between">
                  <div className="w-10 h-1.5 bg-slate-700 rounded-full mb-1" />

                  <div className="w-full flex-1 bg-gradient-to-b from-slate-900 to-[#13355A] rounded-lg p-2 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center mb-1 animate-pulse">
                      <Smartphone className="w-4 h-4 text-accent-2" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-wider">ScanFlow</span>
                    <span className="text-[8px] text-slate-300 mt-0.5">Ready on Phone</span>
                    <div className="mt-2 px-2 py-0.5 bg-secondary/30 rounded text-[7px] text-accent-2 font-mono border border-secondary/40">
                      BYOD Active
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-secondary/20 blur-xl pointer-events-none" />
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                Open
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Open ScanFlow on your phone.
              </p>
            </div>
          </article>

          {/* Step 02: Scan */}
          <article className="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-b from-slate-50/80 via-white to-white p-6 shadow-[0_16px_44px_rgba(19,53,90,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(19,53,90,0.12)] hover:border-secondary/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  Step 02
                </span>
                <div className="h-9 w-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
              </div>

              {/* Visual 2: Barcode inside camera frame */}
              <div className="relative h-48 w-full rounded-2xl bg-slate-900 p-3 overflow-hidden shadow-inner flex flex-col items-center justify-center mb-6">
                <div className="relative w-44 h-36 border border-slate-700 bg-slate-950/80 rounded-xl p-3 flex flex-col items-center justify-center">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent-2 rounded-tl" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent-2 rounded-tr" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accent-2 rounded-bl" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accent-2 rounded-br" />

                  <div className="flex items-end gap-[2px] opacity-80 mb-2">
                    {[4, 2, 6, 1, 5, 2, 4, 1, 7, 2, 3, 5, 2, 6, 1, 4, 2, 5].map((w, i) => (
                      <div key={i} className="bg-white rounded-sm h-12" style={{ width: `${w * 1.5}px` }} />
                    ))}
                  </div>

                  <div className="absolute inset-x-3 h-[2px] bg-accent-2 shadow-[0_0_12px_#3C9AC4] animate-scan-premium" />

                  <span className="text-[9px] font-mono text-slate-400 mt-1">Aligning barcode...</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                Scan
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Point your camera at the barcode.
              </p>
            </div>
          </article>

          {/* Step 03: Detect */}
          <article className="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-b from-slate-50/80 via-white to-white p-6 shadow-[0_16px_44px_rgba(19,53,90,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(19,53,90,0.12)] hover:border-secondary/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  Step 03
                </span>
                <div className="h-9 w-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <ScanLine className="w-5 h-5" />
                </div>
              </div>

              {/* Visual 3: Detection state */}
              <div className="relative h-48 w-full rounded-2xl bg-slate-900 p-3 overflow-hidden shadow-inner flex flex-col items-center justify-center mb-6">
                <div className="relative w-44 h-36 border-2 border-emerald-400 bg-emerald-950/20 rounded-xl p-3 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400 rounded-tl" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400 rounded-br" />

                  <div className="flex items-end gap-[2px] opacity-90 mb-2">
                    {[4, 2, 6, 1, 5, 2, 4, 1, 7, 2, 3, 5, 2, 6, 1, 4, 2, 5].map((w, i) => (
                      <div key={i} className="bg-emerald-300 rounded-sm h-12" style={{ width: `${w * 1.5}px` }} />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-500/90 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Code 128 Detected
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                Detect
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                ScanFlow detects the barcode automatically.
              </p>
            </div>
          </article>

          {/* Step 04: Continue */}
          <article className="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-b from-slate-50/80 via-white to-white p-6 shadow-[0_16px_44px_rgba(19,53,90,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(19,53,90,0.12)] hover:border-secondary/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  Step 04
                </span>
                <div className="h-9 w-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              {/* Visual 4: Result screen */}
              <div className="relative h-48 w-full rounded-2xl bg-slate-900 p-3 overflow-hidden shadow-inner flex flex-col items-center justify-center mb-6">
                <div className="w-44 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-slate-200 text-left">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span>SCANNED DATA</span>
                    <span className="text-emerald-600 font-bold">SUCCESS</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-primary bg-slate-100 p-2 rounded border border-slate-200 truncate mb-2">
                    SKU-88492019
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-slate-500">18ms decode</span>
                    <div className="flex items-center gap-1 bg-secondary text-white px-2 py-0.5 rounded text-[9px] font-medium">
                      <Copy className="w-2.5 h-2.5" /> Copied
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                Continue
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Use the scanned result in your workflow.
              </p>
            </div>
          </article>

        </div>

        {/* Bottom Statement (Employee's Own Phone Concept) */}
        <div className="mt-16 rounded-3xl border border-secondary/20 bg-gradient-to-r from-primary via-[#1B4A75] to-[#13355A] p-8 md:p-10 text-white shadow-xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-2/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-2 mb-4 border border-white/15">
              <Smartphone className="w-4 h-4" /> Employee Phone First (BYOD)
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold leading-snug">
              Simple enough for every employee. <br className="hidden sm:inline" />
              <span className="text-accent-2">Powerful enough for everyday business operations.</span>
            </h3>
            <p className="mt-4 text-white/80 text-base max-w-xl mx-auto">
              Empower your workforce with instant barcode scanning on the devices they already carry. No expensive dedicated hardware required.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
