"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCases } from "@/components/sections/landingData";

export default function UseCasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="use-cases" ref={ref} className="py-32 relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl animate-drift" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-drift [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-2/8 blur-3xl animate-float-gentle" />
      </div>

      <div className="relative container-wide">
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
          <p className="text-muted-foreground-foreground text-xl max-w-2xl mx-auto leading-relaxed">
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
  );
}
