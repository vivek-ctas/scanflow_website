"use client";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import AccuracyDonut from "@/components/ui/AccuracyDonut";
import SpeedChart from "@/components/ui/SpeedChart";

const stats = [
  { value: 18, suffix: "ms", label: "Avg. decode time", decimals: 0 },
  { value: 99.02, suffix: "%", label: "Scan reliability", decimals: 2 },
  { value: 2, suffix: "+", label: "Barcode types", decimals: 0 },
  { value: 10000, suffix: "+", label: "Scans tested" },
  { value: 24, suffix: "/7", label: "Scanner availability", decimals: 0, },
  { value: 500, suffix: "+", label: "Images processed", decimals: 0, },

];

export default function PerformanceSection() {
  return (
    <section id="performance" className="py-28 relative overflow-hidden">
      {/* Animated barcode BG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none">
        <div className="flex items-end gap-[3px] h-64 w-full max-w-5xl">
          {Array.from({ length: 80 }).map((_, i) => {
            const h = [4, 2, 5, 1, 3, 5, 2, 4, 1, 3, 5][i % 11];
            return (
              <div
                key={i}
                className="flex-1 bg-accent rounded-sm"
                style={{ height: `${h * 18 + 10}%` }}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />

      <div className="relative container-wide">
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
          <p className="text-muted-light text-lg max-w-lg mx-auto">
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
            <p className="mt-4 text-sm text-muted text-center max-w-xs">
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
              <span className="text-xs font-mono text-muted uppercase tracking-widest">Decode latency</span>
              <span className="text-xs font-mono text-accent">live</span>
            </div>
            <div className="font-display text-5xl text-ink mb-1">
              18<span className="text-2xl text-muted ml-1">ms</span>
            </div>
            <p className="text-sm text-muted mb-4">Median end-to-end response time per scan.</p>
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
              className="glass rounded-2xl p-7 text-center group hover:border-accent/20 transition-all duration-300"
            >
              <div className="font-display text-5xl font-bold text-gradient mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2200}
                />
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
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
              <h3 className="font-display text-lg font-bold text-surface mb-1">
                Scanning Performance
              </h3>
              <p className="text-sm text-muted">Performance across different barcode conditions</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-accent inline-block" />
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
                <span className="text-muted-light">{row.label}</span>
                <span className="font-mono text-xs text-accent">{row.scanpro}ms avg</span>
              </div>
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.scanpro}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                  className="absolute inset-y-0 left-0 bg-accent rounded-full"
                  style={{ boxShadow: "0 0 8px rgba(0,229,160,0.6)" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
      
    </section>
  );
}
