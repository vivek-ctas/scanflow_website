"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { features } from "@/components/sections/landingData";

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="features" ref={ref} className="relative isolate container-wide py-24 overflow-hidden">
      < div className="pointer-events-none absolute -left-10 top-8 -z-10 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
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
          <h2 className="mt-8 text-4xl font-display tracking-tight text-primary sm:text-5xl">
            A smarter way to present barcode scanning advantages.
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed text-lg">
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
  );
}
