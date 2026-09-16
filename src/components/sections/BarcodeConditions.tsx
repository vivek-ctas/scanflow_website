"use client";

import { Droplet, Scissors, RotateCcw, Camera } from "lucide-react";

function CleanBars({
  opacity = 1,
  blur = 0,
  mask = false,
}: {
  opacity?: number;
  blur?: number;
  mask?: boolean;
}) {
  const widths = [3, 1, 4, 2, 1, 3, 5, 1, 2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2];
  return (
    <svg viewBox="0 0 120 50" className="w-full h-20" style={{ filter: blur ? `blur(${blur}px)` : undefined, opacity }}>
      <defs>
        <mask id="missingMask">
          <rect width="120" height="50" fill="white" />
          <rect x="35" y="0" width="25" height="50" fill="black" />
          <rect x="75" y="0" width="12" height="50" fill="black" />
        </mask>
      </defs>
      <g mask={mask ? "url(#missingMask)" : undefined}>
        {widths.reduce<{ x: number; els: React.ReactNode[] }>((acc, w, i) => {
          const gap = 1.2;
          acc.els.push(<rect key={i} x={acc.x} y="4" width={w} height="42" fill="#13355A" rx="0.5" />);
          acc.x += w + gap;
          return acc;
        }, { x: 4, els: [] }).els}
      </g>
    </svg>
  );
}

export const conditions = [
  {
    title: "Blurry",
    desc: "Read difficult-to-see barcode labels.",
    icon: Droplet,
    render: () => (
      <div className="relative h-40 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,154,196,0.12),transparent_70%)]" />
        <div className="relative w-full h-full rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-3 flex items-center justify-center overflow-hidden">
          <div className="transform scale-125">
            <CleanBars blur={2.2} opacity={0.8} />
          </div>
        </div>
        {/* animated scanner laser */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-20">
          <div className="h-[2px] bg-accent-2 shadow-[0_0_18px_#3C9AC4] animate-scan-premium" />
        </div>
        {/* camera frame corners */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-accent-2 rounded-tl-md" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-accent-2 rounded-tr-md" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-accent-2 rounded-bl-md" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-accent-2 rounded-br-md" />
        </div>
        <div className="absolute bottom-3 right-3 z-20 text-[9px] font-mono font-bold text-[#1B4A75] bg-[#E8F4FA] px-2 py-0.5 rounded-full border border-[#3C9AC4]/25">
          DECODED
        </div>
      </div>
    ),
  },
  {
    title: "Damaged",
    desc: "Handle partially damaged barcode labels.",
    icon: Scissors,
    render: () => (
      <div className="relative h-40 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,154,196,0.12),transparent_70%)]" />
        <div className="relative w-full h-full rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-3 flex items-center justify-center overflow-hidden">
          <div className="relative w-full transform scale-125">
            <CleanBars mask={true} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-3 left-[28%] w-14 h-4 bg-white rotate-[-12deg] rounded-sm shadow-sm" />
              <div className="absolute bottom-3 right-[32%] w-10 h-5 bg-white rotate-[15deg] rounded-sm shadow-sm" />
            </div>
          </div>
        </div>
        {/* animated scanner laser */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-20">
          <div className="h-[2px] bg-accent-2 shadow-[0_0_18px_#3C9AC4] animate-scan-premium" />
        </div>
        {/* camera frame corners */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-accent-2 rounded-tl-md" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-accent-2 rounded-tr-md" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-accent-2 rounded-bl-md" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-accent-2 rounded-br-md" />
        </div>
        <div className="absolute bottom-3 right-3 z-20 text-[9px] font-mono font-bold text-[#1B4A75] bg-[#E8F4FA] px-2 py-0.5 rounded-full border border-[#3C9AC4]/25">
          DECODED
        </div>
      </div>
    ),
  },
  {
    title: "Tilted",
    desc: "Scan barcodes from less-than-perfect angles.",
    icon: RotateCcw,
    render: () => (
      <div className="relative h-40 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,154,196,0.12),transparent_70%)]" />
        <div className="relative w-full h-full rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-3 flex items-center justify-center overflow-hidden">
          <div className="transform -rotate-12 skew-x-12 scale-110 transition-transform duration-500 group-hover:rotate-0 group-hover:skew-x-0">
            <CleanBars />
          </div>
        </div>
        {/* animated scanner laser */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-20">
          <div className="h-[2px] bg-accent-2 shadow-[0_0_18px_#3C9AC4] animate-scan-premium" />
        </div>
        {/* camera frame corners */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-accent-2 rounded-tl-md" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-accent-2 rounded-tr-md" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-accent-2 rounded-bl-md" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-accent-2 rounded-br-md" />
        </div>
        <div className="absolute bottom-3 right-3 z-20 text-[9px] font-mono font-bold text-[#1B4A75] bg-[#E8F4FA] px-2 py-0.5 rounded-full border border-[#3C9AC4]/25">
          DECODED
        </div>
      </div>
    ),
  },
  {
    title: "Fast-moving work",
    desc: "Keep scanning without unnecessary steps.",
    icon: Camera,
    render: () => (
      <div className="relative h-40 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-2">
        {/* ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,154,196,0.12),transparent_70%)]" />

        {/* shipping label card */}
        <div className="absolute inset-2 rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-2.5 overflow-hidden flex flex-col justify-between">
          {/* top section */}
          <div className="flex justify-between items-start relative z-10">
            {/* barcode & details */}
            <div className="max-w-[75%] overflow-hidden">
              <div className="flex gap-[2px] h-8 overflow-hidden">
                {[...Array(36)].map((_, i) => (
                  <div
                    key={i}
                    className={`bg-black rounded-sm shrink-0 ${i % 4 === 0 ? "w-[3px]" : i % 2 === 0 ? "w-[2px]" : "w-[1.5px]"
                      }`}
                  />
                ))}
              </div>

              {/* barcode number */}
              <div className="mt-1 text-[7px] tracking-[1.5px] text-slate-600 font-bold truncate">
                1289 4472 9921 5548
              </div>

              {/* details */}
              <div className="mt-[1px] text-[6px] text-slate-400 tracking-wide truncate">
                AMAZON HUB - DELHI NCR EXPRESS DELIVERY
              </div>
              <div className="mt-[1px] text-[6px] text-slate-400 tracking-wide truncate">
                WEIGHT: 0.98 KG • SIZE: 12x10x5 CM
              </div>
            </div>

            {/* badge */}
            <div className="shrink-0 px-2 py-[2px] rounded-full bg-[#E8F4FA] border border-[#3C9AC4]/25 text-[8px] font-bold tracking-wide text-[#1B4A75]">
              CODE-128
            </div>
          </div>

          {/* bottom section */}
          <div className="flex items-center justify-between gap-2 relative z-10">
            {/* qr-like pattern */}
            <div className="grid grid-cols-8 gap-[1.5px] shrink-0">
              {[...Array(32)].map((_, i) => (
                <div
                  key={i}
                  className={`w-[3px] h-[3px] rounded-[0.5px] ${i % 3 === 0 || i % 5 === 0 ? "bg-black" : "bg-white border border-slate-300"
                    }`}
                />
              ))}
            </div>

            {/* side status */}
            <div className="flex flex-col items-end gap-0.5 min-w-0">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-bold tracking-wide text-emerald-700">DETECTED</span>
              </div>
              <div className="text-[7px] text-slate-500 truncate">99.02% confidence</div>
            </div>
          </div>
        </div>

        {/* animated scanner laser */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-20">
          <div className="h-[2px] bg-accent-2 shadow-[0_0_18px_#3C9AC4] animate-scan-premium" />
        </div>

        {/* camera frame corners */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-accent-2 rounded-tl-md" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-accent-2 rounded-tr-md" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-accent-2 rounded-bl-md" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-accent-2 rounded-br-md" />
        </div>
      </div>
    ),
  },
];
