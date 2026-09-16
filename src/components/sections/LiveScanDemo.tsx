"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScanResult {
  id: number;
  type: string;
  value: string;
  x: number;
  y: number;
  time: number;
}

const BARCODE_TYPES = ["EAN-13", "QR Code", "Code 128"];
const BARCODE_VALUES = [
  "4007817015865",
  "https://scanpro.io/verify",
  "SHP-20391-XB",
  "LOT-4481-B12",
  "INV-203948-SKU",
  "041331179235",
  "WHS-ZONE-A3",
  "4891234567890",
];

function generateBars(seed: number) {
  const bars: number[] = [];
  let s = seed;
  for (let i = 0; i < 28; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    bars.push((s % 4) + 1);
  }
  return bars;
}

export default function LiveBarcodeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanLine, setScanLine] = useState(0);
  const [scanning] = useState(true);
  const resultIdRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  // Canvas animation — sweeping scan beam
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;

    // Barcode columns to draw
    const seeds = [42, 137, 251, 88, 314];
    const barGroups = seeds.map((s) => generateBars(s));

    let scanY = 0;
    let direction = 1;

    function draw(ts: number) {
      if (!startRef.current) startRef.current = ts;
      ctx.clearRect(0, 0, W, H);

      // Draw barcode groups
      barGroups.forEach((bars, gi) => {
        const gx = 20 + gi * (W / 5.2);
        const gy = 20 + (gi % 2) * 40;
        const gh = H - 60 - (gi % 2) * 20;
        let bx = gx;
        bars.forEach((b) => {
          const bw = b * 3.5;
          ctx.fillStyle = `rgba(245,244,240,${0.18 + (gi % 3) * 0.06})`;
          ctx.fillRect(bx, gy, bw, gh);
          bx += bw + 2;
        });
      });

      // Scan line
      const speed = 0.6;
      scanY += speed * direction;
      if (scanY >= H - 20) direction = -1;
      if (scanY <= 20) direction = 1;

      // Beam glow
      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      grad.addColorStop(0, "rgba(0,229,160,0)");
      grad.addColorStop(0.5, "rgba(0,229,160,0.35)");
      grad.addColorStop(1, "rgba(0,229,160,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 30, W, 60);

      // Bright scan line
      ctx.strokeStyle = "rgba(0,229,160,0.9)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(0,229,160,0.8)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(W, scanY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      setScanLine(Math.round(scanY));
      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Emit scan results periodically
  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      const H = canvas?.height ?? 300;
      const id = ++resultIdRef.current;
      const typeIdx = id % BARCODE_TYPES.length;
      const valIdx = id % BARCODE_VALUES.length;

      setResults((prev) => [
        ...prev.slice(-8),
        {
          id,
          type: BARCODE_TYPES[typeIdx],
          value: BARCODE_VALUES[valIdx],
          x: Math.random() * 60 + 10,
          y: (scanLine / H) * 100,
          time: 12 + (id % 8),
        },
      ]);

      // Remove after 3s
      // setTimeout(() => {
      //   setResults((prev) => prev.filter((r) => r.id !== id));
      // }, 3000);
    }, 1400);

    return () => clearInterval(interval);
  }, [scanning, scanLine]);

  return (
    <section className="py-24 relative overflow-hidden bg-[#F7F9FC] bg-grid-stripes border-t border-[#EAECF3]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/2 to-transparent" />

      <div className="relative px-5 sm:px-8 lg:px-[70px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">Live Demo</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Watch it scan{" "}
            <span className="text-gradient">in real time</span>
          </h2>
          <p className="text-slate-700 text-lg max-w-lg mx-auto">
            ScanFlow&apos;s engine processes every frame continuously — detecting and decoding barcodes as fast as they appear.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Scanner viewport */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 glass rounded-3xl overflow-hidden relative min-h-[340px]"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">Live Scanner Session</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="font-mono text-[11px] text-secondary">LIVE</span>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={320}
                className="w-full"
                style={{ background: "linear-gradient(135deg, #0D0E14 0%, #111318 100%)" }}
              />

              {/* Corner brackets */}
              {[
                "top-2 left-2 border-t-2 border-l-2 rounded-tl",
                "top-2 right-2 border-t-2 border-r-2 rounded-tr",
                "bottom-2 left-2 border-b-2 border-l-2 rounded-bl",
                "bottom-2 right-2 border-b-2 border-r-2 rounded-br",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-6 h-6 border-secondary/70 ${cls}`}
                />
              ))}

              {/* Scan result pop-ups on canvas */}
              <AnimatePresence>
                {results.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, scale: 0.8, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute pointer-events-none"
                    style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translate(-50%, -110%)" }}
                  >
                    <div className="bg-secondary text-primary font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg">
                      ✓ {r.type}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Live result feed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-72 glass rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <span className="font-display font-bold text-sm text-white">Decode Feed</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="font-mono text-[10px] text-secondary">LIVE</span>
              </div>
            </div>

            {/* Result list */}
            <div className="flex-1 overflow-hidden px-4 py-3 flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {[...results].reverse().map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-light rounded-xl px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-secondary">{r.type}</span>
                      <span className="font-mono text-[9px] text-muted-foreground">{r.time}ms</span>
                    </div>
                    <div className="font-mono text-xs text-white/80 truncate">{r.value}</div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {results.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                    <div className="w-4 h-4 border-2 border-secondary/40 border-t-accent rounded-full animate-spin" />
                  </div>
                  <p className="text-xs text-muted-foreground">Waiting for barcodes...</p>
                </div>
              )}
            </div>

            {/* Stats bar */}
            <div className="px-5 py-3 border-t border-white/5 grid grid-cols-2 gap-3">
              <div>
                <div className="font-display text-lg font-bold text-blue-400">
                  {results.length > 0 ? `${results[results.length - 1].time}ms` : "—"}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">Last scan</div>
              </div>
              <div>
                <div className="font-display text-lg font-bold text-secondary">99.02%</div>
                <div className="text-[10px] text-muted-foreground font-mono">Read rate</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Supported format chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {BARCODE_TYPES.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] text-muted-foreground border border-white/6 rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
