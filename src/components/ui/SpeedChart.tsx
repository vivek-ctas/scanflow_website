import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated SVG sparkline showing decode latency converging to 18ms.
 * Path draws on scroll-in, dot pulses at the final 18ms point.
 */
const points = [
  { x: 0, y: 60 },
  { x: 40, y: 45 },
  { x: 80, y: 52 },
  { x: 120, y: 30 },
  { x: 160, y: 38 },
  { x: 200, y: 22 },
  { x: 240, y: 26 },
  { x: 280, y: 14 },
  { x: 320, y: 18 },
];

export default function SpeedChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const path = points.reduce(
    (acc, p, i) => acc + (i === 0 ? `M${p.x},${p.y}` : ` L${p.x},${p.y}`),
    ""
  );
  const area = path + ` L320,90 L0,90 Z`;
  const last = points[points.length - 1];

  return (
    <div ref={ref} className="relative w-full">
      <svg viewBox="0 0 320 100" className="w-full h-32">
        <defs>
          <linearGradient id="speedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3C9AC4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3C9AC4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* gridlines */}
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#13355A" strokeOpacity="0.06" strokeDasharray="2 4" />
        ))}
        <motion.path
          d={area}
          fill="url(#speedFill)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="#3C9AC4"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* end marker */}
        <motion.circle
          cx={last.x}
          cy={last.y}
          r="6"
          fill="#fff"
          stroke="#3C9AC4"
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 1.4, type: "spring" }}
        />
        <circle cx={last.x} cy={last.y} r="10" fill="#3C9AC4" opacity="0.25">
          <animate attributeName="r" values="6;14;6" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-muted uppercase tracking-widest">
        <span>t-200ms</span>
        <span className="text-accent font-semibold">18ms response</span>
      </div>
    </div>
  );
}
