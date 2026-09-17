"use client";

import { Smartphone, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { ScanFlowOrbitMockup } from "@/components/ui/illustration";

const benefits = [
  {
    number: "01",
    title: "Use Existing Phones",
    description: "Let employees scan using phones they already know how to use.",
    icon: Smartphone,
    highlight: "BYOD READY",
    theme: {
      bg: "bg-white",
      border: "border-slate-200/80 hover:border-[#3C9AC4]/40",
      iconBg: "bg-[#EBF4FA]",
      iconColor: "text-[#3C9AC4]",
      numBg: "bg-[#EBF4FA]",
      numColor: "text-[#3C9AC4]",
      tagColor: "text-[#3C9AC4]",
      dotColor: "bg-[#3C9AC4]",
    },
  },
  {
    number: "02",
    title: "Easy to Adopt",
    description: "Minimal learning curve for everyday barcode scanning.",
    icon: Sparkles,
    highlight: "ZERO TRAINING",
    theme: {
      bg: "bg-white",
      border: "border-slate-200/80 hover:border-[#10B981]/40",
      iconBg: "bg-[#E6F8F3]",
      iconColor: "text-[#10B981]",
      numBg: "bg-[#E6F8F3]",
      numColor: "text-[#10B981]",
      tagColor: "text-[#10B981]",
      dotColor: "bg-[#10B981]",
    },
  },
  {
    number: "03",
    title: "Fast Workflow",
    description: "Move from barcode to result without unnecessary steps.",
    icon: Zap,
    highlight: "SUB-FRAME DECODE",
    theme: {
      bg: "bg-white",
      border: "border-slate-200/80 hover:border-[#6E44FF]/40",
      iconBg: "bg-[#F0EDFA]",
      iconColor: "text-[#6E44FF]",
      numBg: "bg-[#F0EDFA]",
      numColor: "text-[#6E44FF]",
      tagColor: "text-[#6E44FF]",
      dotColor: "bg-[#6E44FF]",
    },
  },
  {
    number: "04",
    title: "Built for Real Conditions",
    description: "Designed around the imperfect barcodes teams encounter every day.",
    icon: ShieldCheck,
    highlight: "RESILIENT SCAN",
    theme: {
      bg: "bg-white",
      border: "border-slate-200/80 hover:border-[#F59E0B]/40",
      iconBg: "bg-[#FEF5E7]",
      iconColor: "text-[#F59E0B]",
      numBg: "bg-[#FEF5E7]",
      numColor: "text-[#F59E0B]",
      tagColor: "text-[#F59E0B]",
      dotColor: "bg-[#F59E0B]",
    },
  },
];

export default function WhyUseScanflowSection() {
  return (
    <section
      id="why-scanflow"
      className="relative bg-white border-t border-[#EAECF3] py-16 lg:py-24 overflow-hidden"
    >
      <div className="px-5 sm:px-8 lg:px-[70px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ── LEFT COLUMN: ScanFlow Orbit Mockup SVG Illustration ── */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative animate-float-slow">
              <ScanFlowOrbitMockup className="w-full h-auto" />
            </div>
          </div>

          {/* ── RIGHT COLUMN: Section Header, Subtext & 4 Cards Grid ── */}
          <div className="lg:col-span-7 text-left order-1 lg:order-2">
            {/* Badge */}
            <span className="inline-flex items-center rounded-full bg-[#EBF4FA] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#3C9AC4] border border-[#3C9AC4]/20 shadow-xs mb-6">
              WHY BUSINESSES USE SCANFLOW
            </span>

            {/* Main Heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#13355A] leading-tight">
              Less equipment. Less friction.{" "}
              <span className="bg-gradient-to-r from-[#3C9AC4] via-[#1B4A75] to-[#13355A] bg-clip-text text-transparent">
                Easier scanning.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              Instead of exposing complicated tech, ScanFlow focuses on practical benefits that streamline daily scanning operations.
            </p>

            {/* 4 Cards Horizontal Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {benefits.map((item) => {
                const Icon = item.icon;
                const { theme } = item;
                return (
                  <article
                    key={item.title}
                    className={`group relative rounded-2xl border ${theme.border} ${theme.bg} p-5 shadow-[0_8px_24px_rgba(19,53,90,0.04)] hover:shadow-[0_16px_36px_rgba(19,53,90,0.09)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
                  >
                    <div>
                      {/* Top Row: Icon + Number Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`h-11 w-11 rounded-xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center shadow-xs`}>
                          <Icon className="h-5.5 w-5.5" />
                        </div>
                        <span className={`text-xs font-mono font-bold ${theme.numBg} ${theme.numColor} px-2.5 py-0.5 rounded-full border border-current/15`}>
                          {item.number}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-display text-base font-bold text-[#13355A] mb-2 group-hover:text-[#3C9AC4] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Tag & Pulsing Dot */}
                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider">
                      <span className={theme.tagColor}>{item.highlight}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor} animate-pulse`} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
