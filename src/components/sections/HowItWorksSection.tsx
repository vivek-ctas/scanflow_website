"use client";

import { Zap, Smartphone, ShieldCheck, Cloud, Camera, ScanLine, CheckCircle2, FileText, ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Open",
    description: "Open ScanFlow on your phone.",
    icon: Smartphone,
    iconBg: "bg-[#EBF4FA] text-[#3C9AC4]",
  },
  {
    num: "02",
    title: "Scan",
    description: "Point your camera at the barcode.",
    icon: ScanLine,
    iconBg: "bg-[#EBF4FA] text-[#3C9AC4]",
  },
  {
    num: "03",
    title: "Detect",
    description: "ScanFlow detects the barcode automatically.",
    icon: CheckCircle2,
    iconBg: "bg-[#F0EDFA] text-[#6E44FF]",
  },
  {
    num: "04",
    title: "Process",
    description: "Data is processed in real-time.",
    icon: FileText,
    iconBg: "bg-[#FEF5E7] text-[#F59E0B]",
  },
  {
    num: "05",
    title: "Continue",
    description: "Get the result and keep working.",
    icon: ArrowRight,
    iconBg: "bg-[#E6F8F3] text-[#10B981]",
  },
];

const PILLARS = [
  {
    title: "Fast & Accurate",
    desc: "Instant results with high precision.",
    icon: Zap,
    iconBg: "bg-[#EBF4FA] text-[#3C9AC4]",
  },
  {
    title: "Works Offline",
    desc: "Scan anytime, anywhere.",
    icon: Smartphone,
    iconBg: "bg-[#EBF8F7] text-[#0EA5E9]",
  },
  {
    title: "Secure & Reliable",
    desc: "Your data stays protected.",
    icon: ShieldCheck,
    iconBg: "bg-[#F0EDFA] text-[#6E44FF]",
  },
  {
    title: "Multi-format Support",
    desc: "Barcodes, QR codes and more.",
    icon: Cloud,
    iconBg: "bg-[#E6F8F3] text-[#10B981]",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative bg-gradient-to-b from-[#F7FAFC] via-white to-[#F4F8FC] border-t border-[#EAECF3] py-16 lg:py-24 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#3C9AC4]/8 blur-3xl animate-drift" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#6BC1E0]/8 blur-3xl animate-drift [animation-delay:2s]" />
      </div>

      <div className="px-5 sm:px-8 lg:px-[70px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ── LEFT COLUMN: Header Text & Bottom Pillar Cards ── */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-10">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF4FA] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#3C9AC4] border border-[#3C9AC4]/20 shadow-xs mb-6">
                <Zap className="w-3.5 h-3.5" /> HOW IT WORKS
              </span>

              {/* Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#13355A] leading-tight">
                Turn every employee phone into a{" "}
                <span className="bg-gradient-to-r from-[#3C9AC4] via-[#1B4A75] to-[#13355A] bg-clip-text text-transparent">
                  scanning tool.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                Connect ScanFlow to your business workflow and give your team a simple way to scan wherever work happens.
              </p>
            </div>

            {/* Bottom 4 Horizontal Pillars Box */}
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_12px_36px_rgba(19,53,90,0.05)] backdrop-blur-md">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {PILLARS.map((p, idx) => {
                  const IconComp = p.icon;
                  return (
                    <div key={idx} className="flex flex-col items-start text-left space-y-2">
                      <div className={`p-2.5 rounded-xl ${p.iconBg} shadow-xs`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#13355A]">{p.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{p.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── CENTER COLUMN: Animated Smartphone Viewfinder & Floating Orbits ── */}
          <div className="lg:col-span-4 flex justify-center items-center relative py-6">

            {/* Circular Orbit Dashed Lines */}
            <div className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border-2 border-dashed border-[#3C9AC4]/25 pointer-events-none animate-spin-slow" />

            {/* Orbit Floating Elements */}
            {/* Top Left: Camera Badge */}
            <div className="absolute top-4 left-4 sm:left-6 z-20 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 animate-float flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-[#EBF4FA] text-[#3C9AC4] flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            {/* Top Right: Lightning Badge */}
            <div className="absolute top-12 right-4 sm:right-6 z-20 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 animate-float [animation-delay:1.2s] flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-[#EBF4FA] text-[#3C9AC4] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
            </div>

            {/* Middle Left: Barcode Card Floating Snippet */}
            <div className="absolute top-1/2 -left-6 sm:-left-10 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-2xl border border-slate-200/80 animate-float [animation-delay:2s] flex items-center gap-2">
              <div className="flex items-end gap-[1.5px]">
                {[3, 1, 4, 1, 2, 5, 1, 3, 2, 4].map((w, i) => (
                  <div key={i} className="bg-[#13355A] rounded-xs h-6" style={{ width: `${w * 1.5}px` }} />
                ))}
              </div>
              <span className="font-mono text-[10px] font-bold text-[#13355A]">890123456789</span>
            </div>

            {/* Bottom Left: QR Code Badge */}
            <div className="absolute bottom-10 left-6 sm:left-8 z-20 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 animate-float [animation-delay:1.6s] flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-[#EBF8F7] text-[#0EA5E9] flex items-center justify-center">
                <ScanLine className="w-5 h-5" />
              </div>
            </div>

            {/* Smartphone Phone Frame */}
            <div className="relative z-10 w-[240px] sm:w-[270px] h-[480px] sm:h-[510px] bg-slate-950 rounded-[44px] border-[8px] border-slate-900 shadow-[0_25px_70px_rgba(19,53,90,0.22)] overflow-hidden flex flex-col justify-between">
              
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-slate-900 rounded-b-xl mx-auto flex items-center justify-center z-30">
                <div className="w-8 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Viewfinder Screen */}
              <div className="relative flex-1 bg-gradient-to-b from-slate-900 via-[#13355A]/90 to-slate-950 p-4 flex flex-col items-center justify-center overflow-hidden">
                
                {/* Viewfinder Scanning Box */}
                <div className="relative w-44 h-40 rounded-2xl border border-cyan-500/30 bg-slate-900/60 backdrop-blur-xs p-3 flex flex-col items-center justify-center shadow-inner">
                  {/* Glowing Corner Brackets */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#6BC1E0] rounded-tl" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#6BC1E0] rounded-tr" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#6BC1E0] rounded-bl" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#6BC1E0] rounded-br" />

                  {/* Barcode Graphic */}
                  <div className="flex items-end gap-[2px] opacity-90 my-auto">
                    {[3, 1, 4, 1, 2, 5, 2, 1, 4, 1, 3, 2, 5, 1, 3, 2].map((w, i) => (
                      <div key={i} className="bg-white rounded-xs h-14" style={{ width: `${w * 1.8}px` }} />
                    ))}
                  </div>

                  {/* Laser Beam Scanner */}
                  <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-[#6BC1E0] to-transparent shadow-[0_0_12px_#6BC1E0] animate-pulse" />
                </div>

                {/* Status Pill */}
                <div className="mt-8 flex items-center gap-2 bg-[#3C9AC4]/20 border border-[#3C9AC4]/40 px-4 py-1.5 rounded-full backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-[#6BC1E0] animate-ping" />
                  <span className="text-xs font-semibold text-white tracking-wide">Scanning...</span>
                </div>
              </div>

              {/* Bottom Home Indicator Line */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto my-2" />
            </div>

          </div>

          {/* ── RIGHT COLUMN: Vertical Step Timeline (01 to 05) ── */}
          <div className="lg:col-span-4 pl-0 lg:pl-4">
            <div className="relative space-y-4">
              
              {/* Vertical Dashed Connecting Line */}
              <div className="absolute top-6 bottom-6 left-6 w-0.5 border-l-2 border-dashed border-[#3C9AC4]/30 pointer-events-none" />

              {STEPS.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.num}
                    className="group relative flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs hover:shadow-md hover:border-[#3C9AC4]/40 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Number Badge with Dashed Line Node */}
                    <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full bg-white border-2 border-[#3C9AC4]/40 flex items-center justify-center font-mono text-xs font-bold text-[#13355A] shadow-xs group-hover:border-[#3C9AC4] group-hover:bg-[#EBF4FA] transition-colors">
                      {step.num}
                    </div>

                    {/* Icon */}
                    <div className={`flex-shrink-0 p-2.5 rounded-xl ${step.iconBg}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="font-display text-base font-bold text-[#13355A] group-hover:text-[#3C9AC4] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug truncate">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
