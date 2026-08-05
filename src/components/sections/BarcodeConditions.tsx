import { motion } from "framer-motion";
import { Droplet, Scissors, EyeOff, Camera } from "lucide-react";

/**
 * Visual showcase of barcode resilience: damaged, missing-line, blurry.
 * Each card renders a stylized SVG barcode in the named condition.
 */

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
                    <rect x="40" y="0" width="22" height="50" fill="black" />
                    <rect x="78" y="0" width="10" height="50" fill="black" />
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

const conditions = [
    {
        title: "Damaged",
        desc: "Scratched, torn, partially occluded labels.",
        icon: Scissors,
        render: () => (
            <div className="relative h-40 flex items-center justify-center overflow-hidden">
                <div className="relative w-full transform scale-150">
                    <CleanBars />
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-4 left-[30%] w-14 h-4 bg-white rotate-[-8deg] rounded-sm shadow-sm" />
                        <div className="absolute bottom-3 right-[35%] w-10 h-5 bg-white rotate-[12deg] rounded-sm shadow-sm" />
                    </div>
                </div>
            </div>
        ),
    },
    // {
    //     title: "Code 128 Fast Detect",
    //     desc: "Instant decoding from camera captures and shipping labels.",
    //     icon: Camera,
    //     render: () => (
    //         <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">

    //             {/* label paper */}
    //             <div className="absolute inset-3 rounded-xl bg-white shadow-md p-3">

    //                 {/* top barcode */}
    //                 <div className="flex justify-between items-start">
    //                     <div className="flex gap-[2px] h-10">
    //                         {[...Array(28)].map((_, i) => (
    //                             <div
    //                                 key={i}
    //                                 className={`bg-black ${i % 3 === 0
    //                                     ? "w-[3px]"
    //                                     : "w-[2px]"
    //                                     }`}
    //                             />
    //                         ))}
    //                     </div>

    //                     <div className="text-[9px] text-slate-600 font-semibold">
    //                         CODE-128
    //                     </div>
    //                 </div>

    //                 {/* shipping blocks */}
    //                 <div className="mt-3 grid grid-cols-3 gap-2">
    //                     <div className="h-8 rounded bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
    //                         S-05
    //                     </div>

    //                     <div className="h-8 rounded border border-slate-300 flex items-center justify-center text-[10px] font-semibold">
    //                         DELN
    //                     </div>

    //                     <div className="h-8 rounded border border-slate-300 flex items-center justify-center text-[10px]">
    //                         0.98 kg
    //                     </div>
    //                 </div>

    //                 {/* qr area */}
    //                 <div className="mt-3 flex items-center justify-between">
    //                     <div className="grid grid-cols-6 gap-[2px]">
    //                         {[...Array(36)].map((_, i) => (
    //                             <div
    //                                 key={i}
    //                                 className={`w-[4px] h-[4px] ${Math.random() > 0.5
    //                                     ? "bg-black"
    //                                     : "bg-white border border-slate-300"
    //                                     }`}
    //                             />
    //                         ))}
    //                     </div>

    //                     <div className="text-[10px] font-bold text-emerald-600">
    //                         DETECTED
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* animated scanner */}
    //             <div className="absolute inset-x-0 top-1/2 h-[2px] bg-cyan-400 shadow-[0_0_14px_#3C9AC4] animate-pulse" />

    //             {/* camera corners */}
    //             <div className="absolute inset-0">
    //                 <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-accent-2 rounded-tl-lg" />
    //                 <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent-2 rounded-tr-lg" />
    //                 <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-accent-2 rounded-bl-lg" />
    //                 <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-accent-2 rounded-br-lg" />
    //             </div>
    //         </div>
    //     ),
    // },

    {
        title: "Code 128 Fast Detect",
        desc: "Instant decoding from camera captures and complex shipping labels.",
        icon: Camera,
        render: () => (
            <div className="relative h-40 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">

                {/* ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,154,196,0.12),transparent_70%)]" />

                {/* shipping label */}
                <div className="absolute inset-3 rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-3 overflow-hidden">

                    {/* paper texture */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

                    {/* top section */}
                    <div className="flex justify-between items-start relative z-10">

                        {/* barcode */}
                        <div className="max-w-[75%] overflow-hidden">
                            <div className="flex gap-[2px] h-10 overflow-hidden">
                                {[...Array(36)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`bg-black rounded-sm shrink-0 ${i % 4 === 0
                                            ? "w-[3px]"
                                            : i % 2 === 0
                                                ? "w-[2px]"
                                                : "w-[1.5px]"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* barcode number */}
                            <div className="mt-1 text-[8px] tracking-[2px] text-slate-500 font-medium truncate">
                                1289 4472 9921 5548
                            </div>

                            {/* added sentence */}
                            <div className="mt-[2px] text-[7px] text-slate-400 tracking-wide truncate">
                                AMAZON HUB - DELHI NCR EXPRESS DELIVERY
                            </div>
                            <div className="mt-[2px] text-[7px] text-slate-400 tracking-wide truncate">
                                WEIGHT: 0.98 KG • SIZE: 12x10x5 CM
                            </div>
                            <div className="mt-[2px] text-[7px] text-slate-400 tracking-wide truncate">
                                SHIP DATE: 2024-08-15 • ORDER ID: #55489921
                            </div>
                            <div className="mt-[2px] text-[7px] text-slate-400 tracking-wide truncate">
                                NOTE: FRAGILE - HANDLE WITH CARE
                            </div>
                        </div>

                        {/* badge */}
                        <div className="shrink-0 px-2 py-[2px] rounded-full bg-[#E8F4FA] border border-[#3C9AC4]/25 text-[9px] font-bold tracking-wide text-[#1B4A75]">
                            CODE-128
                        </div>
                    </div>

                    {/* address block */}
                    <div className="mt-2 space-y-1 relative z-10">
                        <div className="h-2 w-[70%] rounded " />
                        <div className="h-2 w-[50%] rounded " />
                        <div className="h-2 w-[60%] rounded " />
                    </div>

                    {/* bottom area */}
                    <div className="mt-3 flex items-center justify-between gap-3 relative z-10">

                        {/* qr-like pattern */}
                        <div className="grid grid-cols-8 gap-[2px] shrink-0">
                            {/* {[...Array(64)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-[4px] h-[4px] rounded-[1px] ${Math.random() > 0.45
                                        ? "bg-black"
                                        : "bg-white border border-slate-300"
                                        }`}
                                />
                            ))} */}
                            {[...Array(64)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-[4px] h-[4px] rounded-[1px] ${i % 3 === 0 || i % 5 === 0
                                        ? "bg-black"
                                        : "bg-white border border-slate-300"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* side content */}
                        <div className="flex flex-col items-end gap-1 min-w-0">

                            <div className="text-[8px] font-medium text-slate-400 tracking-wide truncate">
                                AI SCAN ENGINE
                            </div>

                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />

                                <span className="text-[9px] font-bold tracking-wide text-emerald-700">
                                    DETECTED
                                </span>
                            </div>

                            <div className="text-[8px] text-slate-500 truncate">
                                99.2% confidence
                            </div>
                        </div>
                    </div>
                </div>

                {/* animated scanner */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                    <div className="h-[2px] bg-accent-2 shadow-[0_0_18px_#3C9AC4]" />
                    <div className="h-10 bg-accent-2/10 blur-xl" />
                </div>

                {/* camera corners */}
                <div className="absolute inset-0 pointer-events-none">

                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-accent-2 rounded-tl-lg" />

                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent-2 rounded-tr-lg" />

                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-accent-2 rounded-bl-lg" />

                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-accent-2 rounded-br-lg" />
                </div>
            </div>
        ),
    },
    {
        title: "Blurry",
        desc: "Low-focus captures decoded reliably.",
        icon: Droplet,

        render: () => (
            <div className="relative h-40 flex items-center justify-center overflow-hidden">
                <div className="transform scale-150">
                    <CleanBars blur={0.6} opacity={0.85} />
                </div>
            </div>
        ),
    },
];

export default function BarcodeConditions() {
    return (
        <section
            id="reliability"
            className="container-wide py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 max-w-2xl"
            >
                <p className="section-label mb-4">Real-world resilience</p>
                <h2 className="font-display text-3xl md:text-5xl text-ink leading-tight">
                    Decodes barcodes that <span className="text-gradient">others give up on</span>.
                </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
                {conditions.map((c, i) => {
                    const Icon = c.icon;
                    return (
                        <motion.article
                            key={c.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.5 }}
                            whileHover={{ y: -6 }}
                            className="group rounded-3xl border border-ink/10 bg-white/95 backdrop-blur-sm p-6 shadow-[0_16px_44px_rgba(19,53,90,0.08)] overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-accent/12 text-accent flex items-center justify-center">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-display text-xl text-ink">{c.title}</h3>
                                </div>
                                <span className="text-[10px] font-mono text-accent border border-accent/25 rounded-full px-2 py-0.5">DECODED</span>
                            </div>

                            <div className="rounded-2xl bg-surface-2 p-5 relative overflow-hidden">
                                {c.render()}
                                {/* scanning beam overlay */}
                                <div className="absolute inset-x-4 h-[2px] bg-accent-2 shadow-[0_0_18px_#3C9AC4] animate-scan-premium" />
                            </div>

                            <p className="mt-4 text-sm text-muted leading-relaxed">{c.desc}</p>

                            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                Confidence <span className="text-ink font-semibold">99.02%</span>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}
