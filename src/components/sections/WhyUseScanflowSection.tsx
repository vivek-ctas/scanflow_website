"use client";

import { Smartphone, Sparkles, Zap, ShieldCheck } from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Use Existing Phones",
    description: "Let employees scan using phones they already know how to use.",
    icon: Smartphone,
    highlight: "BYOD Ready",
  },
  {
    number: "02",
    title: "Easy to Adopt",
    description: "Minimal learning curve for everyday barcode scanning.",
    icon: Sparkles,
    highlight: "Zero Training",
  },
  {
    number: "03",
    title: "Fast Workflow",
    description: "Move from barcode to result without unnecessary steps.",
    icon: Zap,
    highlight: "Sub-Frame Decode",
  },
  {
    number: "04",
    title: "Built for Real Conditions",
    description: "Designed around the imperfect barcodes teams encounter every day.",
    icon: ShieldCheck,
    highlight: "Resilient Scan",
  },
];

export default function WhyUseScanflowSection() {
  return (
    <section
      id="why-scanflow"
      className="py-20 lg:py-28 px-5 sm:px-8 lg:px-[70px] relative bg-white border-t border-[#EAECF3] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl animate-drift" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-drift [animation-delay:2s]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-primary ring-1 ring-primary/20 mb-6">
            07. Why Businesses Use ScanFlow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
            Less equipment. Less friction. <span className="text-gradient">Easier scanning.</span>
          </h2>
          <p className="mt-6 text-slate-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Instead of exposing complicated tech, ScanFlow focuses on practical benefits that streamline daily scanning operations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-b from-slate-50/80 via-white to-white p-7 shadow-[0_16px_44px_rgba(19,53,90,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(19,53,90,0.12)] hover:border-secondary/30 flex flex-col justify-between"
              >
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-secondary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/12 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:scale-105 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="text-primary font-semibold">{item.highlight}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

