import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Animated SVG donut chart for the 99.02% accuracy stat.
 * Stroke-dashoffset animates on enter, with a counter inside.
 */
export default function AccuracyDonut({
  value = 99.02,
  size = 220,
}: {
  value?: number;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (count / 100) * c;

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(parseFloat((value * ease(p)).toFixed(2)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#13355A" />
            <stop offset="55%" stopColor="#3C9AC4" />
            <stop offset="100%" stopColor="#6BC1E0" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EDF2F7" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#donutGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ filter: "drop-shadow(0 4px 14px rgba(60,154,196,0.35))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl text-gradient font-bold">{count.toFixed(2)}%</span>
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest mt-1">Read accuracy</span>
      </div>
    </div>
  );
}
