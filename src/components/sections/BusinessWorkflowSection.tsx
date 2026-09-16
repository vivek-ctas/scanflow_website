"use client";

import { Building2, Smartphone, Camera, CheckCircle2, ArrowRightCircle, ArrowDown } from "lucide-react";

const workflowSteps = [
  {
    stepNumber: "01",
    label: "YOUR BUSINESS",
    title: "Your Business",
    description: "Existing enterprise operations & inventory systems",
    icon: Building2,
  },
  {
    stepNumber: "02",
    label: "APP ACCESS",
    title: "Employee opens ScanFlow",
    description: "Instant access directly on employee's smartphone",
    icon: Smartphone,
  },
  {
    stepNumber: "03",
    label: "CAMERA CAPTURE",
    title: "Phone camera scans barcode",
    description: "Reads damaged, blurry, or angled barcodes fast",
    icon: Camera,
  },
  {
    stepNumber: "04",
    label: "DECODE DATA",
    title: "Barcode result",
    description: "Sub-frame decode output with 99.02% accuracy",
    icon: CheckCircle2,
  },
  {
    stepNumber: "05",
    label: "INTEGRATION",
    title: "Your workflow continues",
    description: "Data automatically flows into your ERP/WMS",
    icon: ArrowRightCircle,
  },
];

export default function BusinessWorkflowSection() {
  return (
    <section
      id="business-workflow"
      className="py-20 lg:py-28 px-5 sm:px-8 lg:px-[70px] relative bg-[#F7F9FC] border-t border-[#EAECF3] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl animate-drift" />
        <div className="absolute bottom-0 left-10 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-drift [animation-delay:2.5s]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-secondary ring-1 ring-secondary/20 mb-6">
            04. Business Workflow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
            Turn every employee phone into a <span className="text-gradient">scanning tool.</span>
          </h2>
          <p className="mt-6 text-slate-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Connect ScanFlow to your business workflow and give your team a simple way to scan wherever work happens.
          </p>
        </div>

        {/* Workflow Diagram Pipeline */}
        <div className="relative">
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden xl:block absolute top-1/2 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-secondary/20 via-secondary/60 to-secondary/20 -translate-y-6 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
            {workflowSteps.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === workflowSteps.length - 1;

              return (
                <div key={item.title} className="flex flex-col items-center">
                  <article className="w-full group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/95 backdrop-blur-sm p-6 shadow-[0_16px_44px_rgba(19,53,90,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(19,53,90,0.12)] hover:border-secondary/30 flex flex-col justify-between min-h-[220px]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                        {item.stepNumber}
                      </span>
                      <div className="h-10 w-10 rounded-2xl bg-secondary/12 text-secondary flex items-center justify-center transition-colors group-hover:bg-secondary group-hover:text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{item.label}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    </div>
                  </article>

                  {/* Connector Arrow for mobile/tablet */}
                  {!isLast && (
                    <div className="my-3 xl:hidden flex items-center justify-center text-secondary/60">
                      <ArrowDown className="w-6 h-6 animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selling Point Callout Box */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-secondary/20 bg-white/95 backdrop-blur-sm p-8 md:p-10 shadow-[0_20px_60px_rgba(19,53,90,0.08)] flex flex-col md:flex-row items-center gap-6">
          <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-secondary to-[#1B4A75] text-white flex items-center justify-center shadow-lg shadow-secondary/20">
            <Smartphone className="w-8 h-8" />
          </div>
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-secondary mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Key Business Differentiator
            </div>
            <p className="text-slate-800 text-base md:text-lg font-medium leading-relaxed">
              No need to provide every employee with a separate barcode scanner. ScanFlow lets your existing phones become part of the scanning workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

