import { SVGProps } from "react";

export const BarcodeReliabilityMockup = (props: SVGProps<SVGSVGElement>) => {
    const FEATURES = [
        {
            corner: "tl",
            title: "Blurry Barcodes",
            lines: ["Scan labels that aren't", "perfectly clear."],
            col: "#3C9AC4",
            icon: "search",
        },
        {
            corner: "tr",
            title: "Difficult Angles",
            lines: ["Scan without needing to", "position every barcode", "perfectly."],
            col: "#1B4A75",
            icon: "angle",
        },
        {
            corner: "bl",
            title: "Damaged Labels",
            lines: ["Keep scanning even when", "part of a barcode is difficult", "to read."],
            col: "#3C9AC4",
            icon: "doc",
        },
        {
            corner: "br",
            title: "Everyday Conditions",
            lines: ["Built for the way employees", "actually work."],
            col: "#6BC1E0",
            icon: "sun",
        },
    ] as const;

    // Card geometry
    const CARD_W = 176;
    const CARD_H = 68;
    const CARDS: Record<string, { x: number; y: number }> = {
        tl: { x: 18, y: 26 },
        tr: { x: 616 - 18 - CARD_W, y: 26 },
        bl: { x: 18, y: 300 - 26 - CARD_H },
        br: { x: 616 - 18 - CARD_W, y: 300 - 26 - CARD_H },
    };

    const CENTER = { x: 308, y: 150, r: 52 };

    // Anchor point on the dashed ring nearest each corner, and the icon-badge
    // anchor on each card, used to draw the connecting elbow line.
    const RING_R = 70;
    const ANCHORS: Record<string, { fromX: number; fromY: number; toX: number; toY: number }> = {
        tl: { fromX: CARDS.tl.x + CARD_W, fromY: CARDS.tl.y + 34, toX: CENTER.x - RING_R * 0.62, toY: CENTER.y - RING_R * 0.62 },
        tr: { fromX: CARDS.tr.x, fromY: CARDS.tr.y + 34, toX: CENTER.x + RING_R * 0.62, toY: CENTER.y - RING_R * 0.62 },
        bl: { fromX: CARDS.bl.x + CARD_W, fromY: CARDS.bl.y + 34, toX: CENTER.x - RING_R * 0.62, toY: CENTER.y + RING_R * 0.62 },
        br: { fromX: CARDS.br.x, fromY: CARDS.br.y + 34, toX: CENTER.x + RING_R * 0.62, toY: CENTER.y + RING_R * 0.62 },
    };

    function elbow(a: { fromX: number; fromY: number; toX: number; toY: number }, corner: string) {
        const midX = corner === "tl" || corner === "bl" ? a.fromX + (a.toX - a.fromX) * 0.55 : a.fromX + (a.toX - a.fromX) * 0.45;
        return `M ${a.fromX} ${a.fromY} L ${midX} ${a.fromY} L ${midX} ${a.toY} L ${a.toX} ${a.toY}`;
    }

    function iconGlyph(kind: string, cx: number, cy: number, col: string) {
        switch (kind) {
            case "search":
                return (
                    <g fill="none" stroke={col} strokeWidth="1.8" strokeLinecap="round" >
                        <circle cx={cx - 2} cy={cy - 2} r="7" />
                        <line x1={cx + 3} y1={cy + 3} x2={cx + 8} y2={cy + 8} />
                    </g>
                );
            case "angle":
                return (
                    <g fill="none" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" >
                        <path d={`M ${cx - 7} ${cy - 2} L ${cx - 7} ${cy - 8} L ${cx - 1} ${cy - 8}`} />
                        <path d={`M ${cx + 1} ${cy + 8} L ${cx + 7} ${cy + 8} L ${cx + 7} ${cy + 2}`} />
                    </g>
                );
            case "doc":
                return (
                    <g fill="none" stroke={col} strokeWidth="1.8" strokeLinejoin="round" >
                        <path d={`M ${cx - 6} ${cy - 9} h 9 l 4 4 v 14 h -13 z`} />
                        <line x1={cx - 3} y1={cy - 1} x2={cx + 4} y2={cy - 1} strokeLinecap="round" />
                        <line x1={cx - 3} y1={cy + 4} x2={cx + 4} y2={cy + 4} strokeLinecap="round" />
                    </g>
                );
            case "sun":
                return (
                    <g stroke={col} strokeWidth="1.6" strokeLinecap="round" >
                        <circle cx={cx} cy={cy} r="5" fill={col} fillOpacity="0.15" />
                        {
                            [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                                const rad = (deg * Math.PI) / 180;
                                const x1 = cx + Math.cos(rad) * 8;
                                const y1 = cy + Math.sin(rad) * 8;
                                const x2 = cx + Math.cos(rad) * 11;
                                const y2 = cy + Math.sin(rad) * 11;
                                return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} />;
                            })
                        }
                    </g>
                );
            default:
                return null;
        }
    }

    return (
        <svg
            viewBox="0 0 616 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient id="bc-ring" x1="0" x2="1" y1="0" y2="1" >
                    <stop offset="0%" stopColor="#6BC1E0" />
                    <stop offset="100%" stopColor="#3C9AC4" />
                </linearGradient>

                <linearGradient id="bc-scan-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3C9AC4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3C9AC4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#3C9AC4" stopOpacity="0" />
                </linearGradient>

                <filter id="bc-shadow" x="-20%" y="-20%" width="140%" height="140%" >
                    <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#13355A" floodOpacity="0.08" />
                </filter>

                <style>{`
                    @keyframes bcSpin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes bcSpinRev {
                        from { transform: rotate(360deg); }
                        to { transform: rotate(0deg); }
                    }
                    @keyframes bcDashFlow {
                        from { stroke-dashoffset: 20; }
                        to { stroke-dashoffset: 0; }
                    }
                    @keyframes bcDotPulse {
                        0%, 100% { r: 3.5px; opacity: 0.6; }
                        50% { r: 5px; opacity: 1; }
                    }
                    @keyframes bcScanBeam {
                        0%, 100% { transform: translateY(-13px); opacity: 0.2; }
                        50% { transform: translateY(13px); opacity: 1; }
                    }
                    .bc-rotate-ring {
                        transform-origin: 308px 150px;
                        animation: bcSpin 18s linear infinite;
                    }
                    .bc-rotate-arc {
                        transform-origin: 308px 150px;
                        animation: bcSpinRev 10s linear infinite;
                    }
                    .bc-line-flow {
                        stroke-dasharray: 5 5;
                        animation: bcDashFlow 1.2s linear infinite;
                    }
                    .bc-dot-pulse-1 { animation: bcDotPulse 2s ease-in-out infinite; }
                    .bc-dot-pulse-2 { animation: bcDotPulse 2s ease-in-out infinite 0.5s; }
                    .bc-dot-pulse-3 { animation: bcDotPulse 2s ease-in-out infinite 1.0s; }
                    .bc-dot-pulse-4 { animation: bcDotPulse 2s ease-in-out infinite 1.5s; }
                    .bc-scan-line {
                        transform-origin: 308px 150px;
                        animation: bcScanBeam 2.2s ease-in-out infinite;
                    }
                `}</style>
            </defs>

            {/* ── Connecting lines (Solid base + Animated flow) ── */}
            {
                FEATURES.map((f) => (
                    <g key={`line-group-${f.corner}`}>
                        <path
                            d={elbow(ANCHORS[f.corner], f.corner)}
                            stroke="#3C9AC4"
                            strokeWidth="1.5"
                            strokeOpacity="0.25"
                            fill="none"
                        />
                        <path
                            d={elbow(ANCHORS[f.corner], f.corner)}
                            stroke="#3C9AC4"
                            strokeWidth="1.5"
                            strokeOpacity="0.75"
                            fill="none"
                            className="bc-line-flow"
                        />
                    </g>
                ))}

            {/* Anchor dots on central ring */}
            {
                FEATURES.map((f, index) => (
                    <circle
                        key={`dot-${f.corner}`}
                        cx={ANCHORS[f.corner].toX}
                        cy={ANCHORS[f.corner].toY}
                        r="4"
                        fill="#3C9AC4"
                        className={`bc-dot-pulse-${index + 1}`}
                    />
                ))}

            {/* ── Center scan badge ── */}
            <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={RING_R}
                fill="none"
                stroke="#3C9AC4"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.5"
                className="bc-rotate-ring"
            />
            <path
                d={`M ${CENTER.x} ${CENTER.y - RING_R} A ${RING_R} ${RING_R} 0 0 1 ${CENTER.x + RING_R * Math.cos(-Math.PI / 6)} ${CENTER.y + RING_R * Math.sin(-Math.PI / 6)}`}
                stroke="url(#bc-ring)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                className="bc-rotate-arc"
            />
            <circle cx={CENTER.x} cy={CENTER.y} r={CENTER.r} fill="white" stroke="#3C9AC4" strokeWidth="1.5" strokeOpacity="0.3" filter="url(#bc-shadow)" />

            {/* Scan-frame corner brackets */}
            {
                [
                    [CENTER.x - 30, CENTER.y - 24, 1, 1],
                    [CENTER.x + 30, CENTER.y - 24, -1, 1],
                    [CENTER.x - 30, CENTER.y + 24, 1, -1],
                    [CENTER.x + 30, CENTER.y + 24, -1, -1],
                ].map(([x, y, sx, sy], i) => (
                    <path
                        key={i}
                        d={`M ${Number(x) + 8 * Number(sx) * -1} ${y} h ${8 * Number(sx)} v ${8 * Number(sy)}`}
                        stroke="#3C9AC4"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                    />
                ))}

            {/* Barcode bars */}
            {
                [3, 1, 2, 1, 3, 1, 2, 2, 1, 3].map((w, i, arr) => {
                    const totalW = arr.reduce((s, v) => s + v * 2.2 + 2, 0);
                    const startX = CENTER.x - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 2.2 + 2, 0);
                    return (
                        <rect
                            key={i}
                            x={startX}
                            y={CENTER.y - 16}
                            width={w * 2.2}
                            height={32}
                            fill="#13355A"
                        />
                    );
                })}

            {/* Animated Laser Scan Line */}
            <line
                x1={CENTER.x - 26}
                y1={CENTER.y}
                x2={CENTER.x + 26}
                y2={CENTER.y}
                stroke="url(#bc-scan-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="bc-scan-line"
            />

            {/* ── Feature cards ── */}
            {
                FEATURES.map((f) => {
                    const { x, y } = CARDS[f.corner];
                    const badgeCx = f.corner === "tl" || f.corner === "bl" ? x + 27 : x + CARD_W - 27;
                    const badgeCy = y + 34;
                    const textX = f.corner === "tl" || f.corner === "bl" ? x + 50 : x + 14;
                    const textAnchor = f.corner === "tl" || f.corner === "bl" ? "start" : "start";
                    return (
                        <g key={f.corner} >
                            <rect
                                x={x}
                                y={y}
                                width={CARD_W}
                                height={CARD_H}
                                rx="14"
                                fill="white"
                                stroke="#3C9AC4"
                                strokeWidth="1"
                                strokeOpacity="0.2"
                                filter="url(#bc-shadow)"
                            />
                            <circle cx={badgeCx} cy={badgeCy} r="15" fill={f.col} fillOpacity="0.12" />
                            {iconGlyph(f.icon, badgeCx, badgeCy, f.col)}
                            <text
                                x={textX}
                                y={y + 26}
                                textAnchor={textAnchor}
                                fontFamily="'Montserrat', sans-serif"
                                fontSize="12"
                                fontWeight="700"
                                fill="#13355A"
                            >
                                {f.title}
                            </text>
                            {
                                f.lines.map((line, i) => (
                                    <text
                                        key={i}
                                        x={textX}
                                        y={y + 40 + i * 12}
                                        textAnchor={textAnchor}
                                        fontFamily="'Inter', sans-serif"
                                        fontSize="10"
                                        fill="#64748B"
                                    >
                                        {line}
                                    </text>
                                ))}
                        </g>
                    );
                })}
        </svg>
    );
};

/**
 * ScanFlowOrbitMockup — barcode-scanning hub illustration.
 *
 * Self-contained SVG (no external design-kit imports), same authoring format as
 * BarcodeReliabilityMockup: data arrays drive the layout, all colors/gradients/
 * filters live in <defs>, and motion is CSS keyframes scoped to bc- classes.
 *
 * Scene: a tilted analytics dashboard at the centre of a dashed orbit, four
 * floating barcode label cards (Product / Inventory / Order / Shipment), a cloud
 * node at the top of the ring and a verified-shield node at the bottom.
 */

const INK = "#13355A";
const DEEP = "#1B4A75";
const BLUE = "#3C9AC4";
const SKY = "#6BC1E0";
const MUTED = "#64748B";
const HAIR = "#E2E8F0";

type TagKind = "box" | "doc" | "cart" | "truck";

export const ScanFlowOrbitMockup = (props: SVGProps<SVGSVGElement>) => {
    const W = 616;
    const H = 520;

    /* ── orbit ── */
    const ORBIT = { cx: 300, cy: 262, rx: 212, ry: 182 };
    const onOrbit = (deg: number) => {
        const a = (deg * Math.PI) / 180;
        return { x: ORBIT.cx + ORBIT.rx * Math.cos(a), y: ORBIT.cy + ORBIT.ry * Math.sin(a) };
    };

    /* ── floating label cards ── */
    const CARD_W = 122;
    const CARD_H = 64;

    const TAGS = [
        { label: "Product", kind: "box", x: 44, y: 86, rot: -7, seed: 3, anchor: 196, float: 0 },
        { label: "Inventory", kind: "doc", x: 428, y: 74, rot: 4, seed: 11, anchor: 338, float: 0.6 },
        { label: "Order", kind: "cart", x: 30, y: 336, rot: -5, seed: 19, anchor: 146, float: 1.2 },
        { label: "Shipment", kind: "truck", x: 466, y: 378, rot: 1, seed: 27, anchor: 38, float: 1.8 },
    ] as const;

    /* ── dashboard frame ── */
    const D = { x: 90, y: 158, w: 336, h: 208 };
    const RAIL = 35;
    const BODY = D.x + RAIL;

    const KPIS = [
        { label: "Total Scans", value: "8,642" },
        { label: "Today", value: "2,573" },
        { label: "Avg. Time", value: "2.4s" },
        { label: "Accuracy", value: "99.02%" },
    ];

    /* ── chart ── */
    const CH = { x: BODY + 10, y: D.y + 86, w: D.w - RAIL - 26, h: 104 };
    const PLOT = { x: CH.x + 34, y: CH.y + 26, w: CH.w - 48, h: 56 };
    const SERIES = [30, 44, 40, 46, 52, 48, 44, 56, 78, 62, 58, 74, 80, 92];
    const GHOST = [26, 40, 44, 42, 48, 50, 46, 52, 66, 60, 56, 68, 72, 84];
    const MAX = Math.max(...SERIES, ...GHOST) * 1.14;
    const px = (i: number, n: number) => PLOT.x + (i * PLOT.w) / (n - 1);
    const py = (v: number) => PLOT.y + PLOT.h - (v / MAX) * PLOT.h;
    const poly = (arr: number[]) => arr.map((v, i) => `${px(i, arr.length)},${py(v)}`).join(" ");
    const X_LABELS = ["May 12", "May 20", "May 28", "Jun 01", "Jun 09"];

    /** Deterministic barcode — same seed always yields the same bar pattern. */
    function barcode(x: number, y: number, w: number, h: number, seed: number) {
        const bars = [];
        let s = seed * 9301 + 49297;
        let cursor = x;
        let i = 0;
        const rand = () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
        while (cursor < x + w - 1) {
            const bw = 0.9 + Math.round(rand() * 2) * 0.9;
            const gap = 0.9 + Math.round(rand() * 2) * 0.7;
            if (cursor + bw > x + w) break;
            bars.push(<rect key={i++} x={cursor} y={y} width={bw} height={h} fill={INK} />);
            cursor += bw + gap;
        }
        return <g>{bars}</g>;
    }

    /** Line-art glyphs used on the cards and in the dashboard rail. */
    function glyph(kind: string, cx: number, cy: number, col: string, k = 1) {
        const p = {
            fill: "none",
            stroke: col,
            strokeWidth: 1.5,
            strokeLinecap: "round" as const,
            strokeLinejoin: "round" as const,
        };
        switch (kind) {
            case "box":
                return (
                    <g {...p}>
                        <path d={`M ${cx - 7 * k} ${cy - 3 * k} L ${cx} ${cy - 7 * k} L ${cx + 7 * k} ${cy - 3 * k} V ${cy + 4 * k} L ${cx} ${cy + 8 * k} L ${cx - 7 * k} ${cy + 4 * k} Z`} />
                        <path d={`M ${cx - 7 * k} ${cy - 3 * k} L ${cx} ${cy + 1 * k} L ${cx + 7 * k} ${cy - 3 * k} M ${cx} ${cy + 1 * k} V ${cy + 8 * k}`} />
                    </g>
                );
            case "doc":
                return (
                    <g {...p}>
                        <path d={`M ${cx - 5 * k} ${cy - 8 * k} h ${7 * k} l ${3.5 * k} ${3.5 * k} v ${11 * k} h ${-10.5 * k} z`} />
                        <path d={`M ${cx - 2.5 * k} ${cy - 1 * k} h ${5 * k} M ${cx - 2.5 * k} ${cy + 2.5 * k} h ${5 * k}`} />
                    </g>
                );
            case "cart":
                return (
                    <g {...p}>
                        <path d={`M ${cx - 9 * k} ${cy - 6 * k} h ${3 * k} l ${2.2 * k} ${10 * k} h ${8.5 * k}`} />
                        <path d={`M ${cx - 4 * k} ${cy - 2.5 * k} h ${12 * k} l ${-1.6 * k} ${5 * k} h ${-9.4 * k} z`} />
                        <circle cx={cx + 0.5 * k} cy={cy + 6.5 * k} r={1.3 * k} fill={col} stroke="none" />
                        <circle cx={cx + 6.5 * k} cy={cy + 6.5 * k} r={1.3 * k} fill={col} stroke="none" />
                    </g>
                );
            case "truck":
                return (
                    <g {...p}>
                        <rect x={cx - 9 * k} y={cy - 5.5 * k} width={10.5 * k} height={9 * k} rx={1.4 * k} />
                        <path d={`M ${cx + 1.5 * k} ${cy - 1.5 * k} h ${3.5 * k} l ${3.5 * k} ${3.5 * k} v ${1.5 * k} h ${-7 * k} z`} />
                        <circle cx={cx - 4.5 * k} cy={cy + 5.5 * k} r={1.9 * k} />
                        <circle cx={cx + 5 * k} cy={cy + 5.5 * k} r={1.9 * k} />
                    </g>
                );
            case "home":
                return <path {...p} d={`M ${cx - 6} ${cy + 6} v -7 l 6 -5 l 6 5 v 7 z`} />;
            case "grid":
                return (
                    <g {...p}>
                        <rect x={cx - 6} y={cy - 6} width="4.8" height="4.8" rx="1" />
                        <rect x={cx + 1.2} y={cy - 6} width="4.8" height="4.8" rx="1" />
                        <rect x={cx - 6} y={cy + 1.2} width="4.8" height="4.8" rx="1" />
                        <rect x={cx + 1.2} y={cy + 1.2} width="4.8" height="4.8" rx="1" />
                    </g>
                );
            case "bars":
                return <path {...p} d={`M ${cx - 5} ${cy + 5} v -4 M ${cx} ${cy + 5} v -9 M ${cx + 5} ${cy + 5} v -6`} />;
            case "gear":
                return (
                    <g {...p}>
                        <circle cx={cx} cy={cy} r="2.6" />
                        <circle cx={cx} cy={cy} r="6" />
                    </g>
                );
            default:
                return null;
        }
    }

    return (
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <defs>
                <linearGradient id="sf-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F7FBFF" />
                    <stop offset="100%" stopColor="#E3F0FB" />
                </linearGradient>

                <linearGradient id="sf-rail" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={DEEP} />
                    <stop offset="100%" stopColor="#0B2F6B" />
                </linearGradient>

                <linearGradient id="sf-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SKY} stopOpacity="0.45" />
                    <stop offset="100%" stopColor={SKY} stopOpacity="0.02" />
                </linearGradient>

                <linearGradient id="sf-beam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={BLUE} stopOpacity="0" />
                    <stop offset="50%" stopColor={BLUE} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
                </linearGradient>

                <filter id="sf-shadow" x="-25%" y="-25%" width="150%" height="160%">
                    <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor={INK} floodOpacity="0.1" />
                </filter>

                <filter id="sf-shadow-sm" x="-30%" y="-30%" width="160%" height="170%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={INK} floodOpacity="0.09" />
                </filter>

                <style>{`
                    @keyframes sfOrbitFlow {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -280; }
                    }
                    @keyframes sfDotPulse {
                        0%, 100% { r: 3.2px; opacity: 0.65; }
                        50% { r: 4.6px; opacity: 1; }
                    }
                    @keyframes sfFloat {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-5px); }
                    }
                    @keyframes sfFloatSoft {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-3px); }
                    }
                    @keyframes sfScanBeam {
                        0%, 100% { transform: translateY(-1px); opacity: 0.25; }
                        50% { transform: translateY(23px); opacity: 1; }
                    }
                    @keyframes sfDraw {
                        from { stroke-dashoffset: 460; }
                        to { stroke-dashoffset: 0; }
                    }
                    .sf-orbit {
                        stroke-dasharray: 7 9;
                        animation: sfOrbitFlow 22s linear infinite;
                    }
                    .sf-node-dot { animation: sfDotPulse 2.4s ease-in-out infinite; }
                    .sf-card { animation: sfFloat 5.5s ease-in-out infinite; }
                    .sf-hub { animation: sfFloatSoft 6s ease-in-out infinite; }
                    .sf-beam { animation: sfScanBeam 2.6s ease-in-out infinite; }
                    .sf-trend {
                        stroke-dasharray: 460;
                        animation: sfDraw 3.6s ease-out forwards;
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .sf-orbit, .sf-node-dot, .sf-card, .sf-hub, .sf-beam, .sf-trend {
                            animation: none;
                        }
                        .sf-trend { stroke-dashoffset: 0; }
                    }
                `}</style>
            </defs>

            {/* ── Backdrop ── */}
            <rect x="0" y="0" width={W} height={H} rx="18" fill="url(#sf-bg)" />
            <circle cx="72" cy="24" r="108" fill="#DBEAFE" opacity="0.5" />
            <ellipse cx={ORBIT.cx} cy={ORBIT.cy - 12} rx="180" ry="162" fill="#DBEAFE" opacity="0.34" />

            {/* Ambient specks */}
            {[
                [194, 126, 4.2, "#CFE3F5"], [548, 124, 5.4, "#DBEAFE"], [58, 208, 4.2, "#8FC6E8"],
                [44, 312, 6.6, "#DBEAFE"], [60, 292, 3.6, "#CFE3F5"], [566, 344, 4.2, "#CFE3F5"],
                [516, 282, 3, "#8FC6E8"], [442, 468, 3.6, "#DBEAFE"],
            ].map(([x, y, r, fill], i) => (
                <circle key={`speck-${i}`} cx={x as number} cy={y as number} r={r as number} fill={fill as string} />
            ))}
            {[28, 41, 54, 67, 80].map((x, i) => (
                <circle key={`tick-${i}`} cx={x} cy={506} r="3" fill={i < 3 ? SKY : "#CFE3F5"} />
            ))}

            {/* ── Dashed orbit + node dots ── */}
            <ellipse
                cx={ORBIT.cx} cy={ORBIT.cy} rx={ORBIT.rx} ry={ORBIT.ry}
                fill="none" stroke="#A9CFE0" strokeWidth="1.4" className="sf-orbit"
            />
            {[8, 74, 106, 172, 214, 286].map((deg, i) => {
                const p = onOrbit(deg);
                return (
                    <circle
                        key={`node-${i}`} cx={p.x} cy={p.y} r="4"
                        fill={i % 2 ? BLUE : SKY}
                        className="sf-node-dot"
                        style={{ animationDelay: `${i * 0.35}s` }}
                    />
                );
            })}

            {/* ── Orbit hubs: cloud (top) and verified shield (bottom) ── */}
            <g className="sf-hub" style={{ transformOrigin: "300px 94px" }}>
                <circle cx="300" cy="94" r="29" fill="white" fillOpacity="0.7" />
                <circle cx="300" cy="94" r="23" fill="white" stroke={BLUE} strokeWidth="1.4" strokeOpacity="0.35" filter="url(#sf-shadow-sm)" />
                <path
                    d="M 292 100 a 5.2 5.2 0 0 1 1 -10.2 a 6.4 6.4 0 0 1 12.2 1.8 a 4.6 4.6 0 0 1 -1.1 8.4 z"
                    fill={BLUE}
                />
            </g>
            <g className="sf-hub" style={{ transformOrigin: "292px 424px", animationDelay: "1.4s" }}>
                <circle cx="292" cy="424" r="28" fill="white" fillOpacity="0.7" />
                <circle cx="292" cy="424" r="22" fill="white" stroke={BLUE} strokeWidth="1.4" strokeOpacity="0.35" filter="url(#sf-shadow-sm)" />
                <path d="M 292 412 l 9 3.6 v 6.6 c 0 6.2 -3.8 10 -9 11.4 c -5.2 -1.4 -9 -5.2 -9 -11.4 v -6.6 z" fill={BLUE} />
                <path d="M 288 424 l 3 3 l 5.6 -6.6" stroke="white" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* ── Dashboard ── */}
            <g transform={`rotate(-1 ${D.x + D.w / 2} ${D.y + D.h / 2})`} filter="url(#sf-shadow)">
                <rect x={D.x} y={D.y} width={D.w} height={D.h} rx="14" fill="white" />

                {/* navy rail */}
                <path
                    d={`M ${D.x + 14} ${D.y} h ${RAIL - 14} v ${D.h} h ${-(RAIL - 14)} a 14 14 0 0 1 -14 -14 V ${D.y + 14} a 14 14 0 0 1 14 -14 z`}
                    fill="url(#sf-rail)"
                />
                {["home", "home", "grid", "box", "bars", "gear"].map((k, i) => (
                    <g key={`rail-${i}`} opacity={i === 0 ? 1 : 0.6}>
                        {glyph(k, D.x + RAIL / 2, D.y + 30 + i * 28, "white", 0.85)}
                    </g>
                ))}

                {/* brand row */}
                <rect x={BODY + 10} y={D.y + 14} width="17" height="17" rx="5" fill={BLUE} />
                <circle cx={BODY + 18.5} cy={D.y + 22.5} r="3.6" fill="none" stroke="white" strokeWidth="1.5" />
                <text x={BODY + 33} y={D.y + 27} fontFamily="'Montserrat', sans-serif" fontSize="13" fontWeight="700" fill={INK}>
                    ScanFlow
                </text>
                {[0, 1].map((r) =>
                    [0, 1].map((c) => (
                        <rect key={`dots-${r}${c}`} x={D.x + D.w - 26 + c * 6} y={D.y + 14 + r * 6} width="4" height="4" rx="1" fill={MUTED} opacity="0.35" />
                    ))
                )}

                {/* KPI tiles */}
                {KPIS.map((k, i) => {
                    const tx = BODY + 10 + i * 67;
                    const ty = D.y + 40 - (i === 3 ? 5 : i === 2 ? 3 : 0);
                    return (
                        <g key={`kpi-${i}`}>
                            <rect x={tx} y={ty} width="61" height="38" rx="8" fill="white" stroke={HAIR} />
                            <text x={tx + 9} y={ty + 15} fontFamily="'Inter', sans-serif" fontSize="7" fill={MUTED}>{k.label}</text>
                            <text x={tx + 9} y={ty + 30} fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="700" fill={INK}>{k.value}</text>
                        </g>
                    );
                })}

                {/* chart panel */}
                <rect x={CH.x} y={CH.y} width={CH.w} height={CH.h} rx="10" fill="white" stroke={HAIR} />
                <rect x={CH.x + CH.w - 70} y={CH.y + 8} width="60" height="17" rx="5" fill="white" stroke={HAIR} />
                <text x={CH.x + CH.w - 63} y={CH.y + 20} fontFamily="'Inter', sans-serif" fontSize="7.5" fill={MUTED}>Last 7 days</text>
                <path d={`M ${CH.x + CH.w - 20} ${CH.y + 15} l 2.6 2.6 l 2.6 -2.6`} stroke={MUTED} strokeWidth="1.2" fill="none" strokeLinecap="round" />

                {["10K", "10K", "5K", "0"].map((t, i) => (
                    <text
                        key={`yl-${i}`} x={PLOT.x - 8} y={PLOT.y + 4 + (i * PLOT.h) / 3}
                        textAnchor="end" fontFamily="'Inter', sans-serif" fontSize="7" fill={MUTED}
                    >
                        {t}
                    </text>
                ))}

                <polyline points={poly(GHOST)} fill="none" stroke="#CBD5E1" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points={`${PLOT.x},${PLOT.y + PLOT.h} ${poly(SERIES)} ${PLOT.x + PLOT.w},${PLOT.y + PLOT.h}`} fill="url(#sf-area)" />
                <polyline
                    points={poly(SERIES)}
                    fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="sf-trend"
                />
                {[0, 2, 4, 6, 8, 10, 12, 13].map((i) => (
                    <circle key={`pt-${i}`} cx={px(i, SERIES.length)} cy={py(SERIES[i])} r="2.8" fill={BLUE} />
                ))}

                <line x1={PLOT.x} y1={PLOT.y + PLOT.h} x2={PLOT.x + PLOT.w} y2={PLOT.y + PLOT.h} stroke={HAIR} />
                {X_LABELS.map((t, i) => (
                    <text
                        key={`xl-${i}`} x={PLOT.x + (i * PLOT.w) / (X_LABELS.length - 1)} y={PLOT.y + PLOT.h + 14}
                        textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="7.5" fill={MUTED}
                    >
                        {t}
                    </text>
                ))}
            </g>

            {/* ── Floating barcode label cards ── */}
            {TAGS.map((t) => {
                const a = onOrbit(t.anchor);
                const cardCx = t.x + CARD_W / 2;
                const cardCy = t.y + CARD_H / 2;
                return (
                    <g key={t.label}>
                        {/* short dashed tether from the ring to the card */}
                        <line
                            x1={a.x} y1={a.y} x2={cardCx} y2={cardCy}
                            stroke={BLUE} strokeWidth="1.2" strokeOpacity="0.22" strokeDasharray="3 5"
                        />
                        <g
                            className="sf-card"
                            style={{ transformOrigin: `${cardCx}px ${cardCy}px`, animationDelay: `${t.float}s` }}
                        >
                            <g transform={`rotate(${t.rot} ${cardCx} ${cardCy})`} filter="url(#sf-shadow)">
                                <rect
                                    x={t.x} y={t.y} width={CARD_W} height={CARD_H} rx="12"
                                    fill="white" stroke={BLUE} strokeWidth="1" strokeOpacity="0.2"
                                />
                                {/* printed-label spine */}
                                <rect x={t.x + 9} y={t.y + 16} width="12" height={CARD_H - 32} rx="6" fill="#F1F5F9" />
                                {glyph(t.kind as TagKind, t.x + 15, t.y + 11, BLUE, 0.85)}
                                <text
                                    x={t.x + 28} y={t.y + 16}
                                    fontFamily="'Montserrat', sans-serif" fontSize="10.5" fontWeight="700" fill={INK}
                                >
                                    {t.label}
                                </text>
                                {barcode(t.x + 28, t.y + 25, CARD_W - 40, 28, t.seed)}
                                {/* scan beam sweeping the barcode */}
                                <line
                                    x1={t.x + 28} y1={t.y + 26} x2={t.x + CARD_W - 12} y2={t.y + 26}
                                    stroke="url(#sf-beam)" strokeWidth="1.8" strokeLinecap="round"
                                    className="sf-beam"
                                    style={{ animationDelay: `${t.float * 0.5}s` }}
                                />
                            </g>
                        </g>
                    </g>
                );
            })}
        </svg>
    );
};

/**
 * ScanflowDocMockup — barcode document hero illustration.
 *
 * Self-contained SVG (no external design-kit imports), same authoring format as
 * BarcodeReliabilityMockup / ScanFlowOrbitMockup: data arrays drive the layout,
 * every color/gradient/filter lives in <defs>, and motion is CSS keyframes
 * scoped to sd- classes with prefers-reduced-motion respected.
 *
 * Scene: a scanned document card (logo + barcode + text lines) at the centre,
 * a cloud node above, a PDF tile and a verified badge flanking it, and three
 * trait chips (Fast / Secure / Reliable) stacked on the right.
 */


export const ScanflowDocMockup = (props: SVGProps<SVGSVGElement>) => {
    const INK = "#13355A";
    const NAVY = "#1B4A75";
    const BLUE = "#3C9AC4";
    const SKY = "#6BC1E0";
    const GREEN = "#22C55E";
    const MUTED = "#64748B";
    const HAIR = "#E2E8F0";

    const W = 616;
    const H = 444;

    /* ── document card ── */
    const DOC = { x: 178, y: 104, w: 232, h: 268, r: 22 };

    /** Grey placeholder copy lines under the barcode. */
    const LINES = [
        { w: 170, y: 268 },
        { w: 170, y: 292 },
        { w: 140, y: 316 },
        { w: 108, y: 340 },
    ];

    /** Trait chips on the right rail. */
    const CHIPS = [
        { label: "Fast", y: 138, delay: 0 },
        { label: "Secure", y: 196, delay: 0.25 },
        { label: "Reliable", y: 254, delay: 0.5 },
    ];
    const CHIP = { x: 474, w: 118, h: 36 };

    /** Four-point sparkles: [cx, cy, size, color, delay]. */
    const SPARKS: [number, number, number, string, number][] = [
        [438, 148, 13, BLUE, 0],
        [452, 106, 7, SKY, 0.7],
        [468, 330, 11, BLUE, 1.1],
        [296, 44, 8, SKY, 1.6],
        [118, 348, 7, SKY, 0.4],
    ];

    /** Deterministic barcode — same seed always yields the same bar pattern. */
    function barcode(x: number, y: number, w: number, h: number, seed: number) {
        const bars = [];
        let s = seed * 9301 + 49297;
        let cursor = x;
        let i = 0;
        const rand = () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
        while (cursor < x + w - 1) {
            const bw = 1 + Math.round(rand() * 2) * 1.1;
            const gap = 1 + Math.round(rand() * 2) * 0.8;
            if (cursor + bw > x + w) break;
            bars.push(<rect key={i++} x={cursor} y={y} width={bw} height={h} fill={INK} />);
            cursor += bw + gap;
        }
        return <g>{bars}</g>;
    }

    /** Four-point star. */
    function spark(cx: number, cy: number, s: number, col: string) {
        return (
            <path
                d={`M ${cx} ${cy - s} Q ${cx + s * 0.18} ${cy - s * 0.18} ${cx + s} ${cy}
                    Q ${cx + s * 0.18} ${cy + s * 0.18} ${cx} ${cy + s}
                    Q ${cx - s * 0.18} ${cy + s * 0.18} ${cx - s} ${cy}
                    Q ${cx - s * 0.18} ${cy - s * 0.18} ${cx} ${cy - s} Z`}
                fill={col}
            />
        );
    }

    return (
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <defs>
                <linearGradient id="sd-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F4FAFF" />
                    <stop offset="100%" stopColor="#E2F0FB" />
                </linearGradient>

                <linearGradient id="sd-doc" x1="0" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="70%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E8F4FD" />
                </linearGradient>

                <linearGradient id="sd-edge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={SKY} />
                    <stop offset="100%" stopColor={BLUE} />
                </linearGradient>

                <linearGradient id="sd-mark" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5BB6E8" />
                    <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>

                <linearGradient id="sd-green" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4ADE80" />
                    <stop offset="100%" stopColor="#12B981" />
                </linearGradient>

                <linearGradient id="sd-beam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={BLUE} stopOpacity="0" />
                    <stop offset="50%" stopColor="#2563EB" stopOpacity="0.85" />
                    <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
                </linearGradient>

                <filter id="sd-shadow" x="-30%" y="-25%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor={INK} floodOpacity="0.12" />
                </filter>

                <filter id="sd-shadow-sm" x="-40%" y="-40%" width="180%" height="190%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={INK} floodOpacity="0.1" />
                </filter>

                <clipPath id="sd-doc-clip">
                    <rect x={DOC.x} y={DOC.y} width={DOC.w} height={DOC.h} rx={DOC.r} />
                </clipPath>

                <style>{`
                    @keyframes sdFloat {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-6px); }
                    }
                    @keyframes sdFloatSoft {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-4px); }
                    }
                    @keyframes sdScan {
                        0%, 100% { transform: translateY(0px); opacity: 0.15; }
                        50% { transform: translateY(54px); opacity: 1; }
                    }
                    @keyframes sdTwinkle {
                        0%, 100% { opacity: 0.35; transform: scale(0.82); }
                        50% { opacity: 1; transform: scale(1); }
                    }
                    @keyframes sdPop {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.06); }
                    }
                    .sd-doc { transform-origin: 294px 238px; animation: sdFloat 6s ease-in-out infinite; }
                    .sd-float { animation: sdFloatSoft 5s ease-in-out infinite; }
                    .sd-beam { animation: sdScan 2.8s ease-in-out infinite; }
                    .sd-spark { animation: sdTwinkle 3s ease-in-out infinite; }
                    .sd-pop { animation: sdPop 3.2s ease-in-out infinite; }
                    @media (prefers-reduced-motion: reduce) {
                        .sd-doc, .sd-float, .sd-beam, .sd-spark, .sd-pop { animation: none; }
                    }
                `}</style>
            </defs>

            {/* ── Dotted grid ── */}
            {Array.from({ length: 6 }).map((_, r) =>
                Array.from({ length: 6 }).map((_, c) => (
                    <circle
                        key={`g-${r}-${c}`}
                        cx={44 + c * 14}
                        cy={112 + r * 14}
                        r="2.6"
                        fill={SKY}
                        opacity={0.75 - c * 0.07}
                    />
                ))
            )}

            {/* Speed ticks near the cloud */}
            {[[318, 44, 14], [330, 66, 9]].map(([x, y, len], i) => (
                <line
                    key={`tick-${i}`}
                    x1={x as number} y1={y as number}
                    x2={(x as number) + (len as number)} y2={(y as number) - (len as number) * 0.5}
                    stroke={SKY} strokeWidth="3.5" strokeLinecap="round" opacity="0.7"
                />
            ))}

            {/* Sparkles */}
            {SPARKS.map(([cx, cy, s, col, d], i) => (
                <g key={`spark-${i}`} className="sd-spark" style={{ transformOrigin: `${cx}px ${cy}px`, animationDelay: `${d}s` }}>
                    {spark(cx, cy, s, col)}
                </g>
            ))}

            {/* Soft arc behind the document */}
            <path
                d={`M 150 180 A 150 150 0 0 0 176 348`}
                stroke={BLUE} strokeWidth="1.4" strokeDasharray="4 7" opacity="0.4" fill="none"
            />
            <path
                d={`M 424 160 A 150 150 0 0 1 430 320`}
                stroke={BLUE} strokeWidth="1.4" strokeDasharray="4 7" opacity="0.4" fill="none"
            />

            {/* ── Document card ── */}
            <g className="sd-doc">
                <g filter="url(#sd-shadow)">
                    <rect x={DOC.x} y={DOC.y} width={DOC.w} height={DOC.h} rx={DOC.r} fill="url(#sd-doc)" />
                </g>
                {/* blue page edge sweeping the bottom-left corner */}
                <g clipPath="url(#sd-doc-clip)" opacity="0.95">
                    <path
                        d={`M ${DOC.x} ${DOC.y + DOC.h - 96} Q ${DOC.x + 56} ${DOC.y + DOC.h - 40} ${DOC.x + 150} ${DOC.y + DOC.h}
                            L ${DOC.x} ${DOC.y + DOC.h} Z`}
                        fill="url(#sd-edge)"
                        opacity="0.22"
                    />
                    <path
                        d={`M ${DOC.x} ${DOC.y + DOC.h - 54} Q ${DOC.x + 40} ${DOC.y + DOC.h - 18} ${DOC.x + 86} ${DOC.y + DOC.h}
                            L ${DOC.x} ${DOC.y + DOC.h} Z`}
                        fill="url(#sd-edge)"
                    />
                </g>
                <rect
                    x={DOC.x} y={DOC.y} width={DOC.w} height={DOC.h} rx={DOC.r}
                    fill="none" stroke="white" strokeWidth="1.2" strokeOpacity="0.9"
                />

                {/* brand lockup */}
                <circle cx={DOC.x + 40} cy={DOC.y + 46} r="18" fill="url(#sd-mark)" />
                <path
                    d="M 0 -8 C 6 -8 8 -4 5 -1 C 2 2 -6 2 -4 5 C -2 8 4 8 7 6"
                    transform={`translate(${DOC.x + 40} ${DOC.y + 46})`}
                    stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round"
                />
                <text
                    x={DOC.x + 66} y={DOC.y + 54}
                    fontFamily="'Montserrat', sans-serif" fontSize="22" fontWeight="700" fill={INK}
                >
                    scanflow
                </text>

                {/* barcode block */}
                {barcode(DOC.x + 22, DOC.y + 84, DOC.w - 44, 58, 7)}
                <line
                    x1={DOC.x + 18} y1={DOC.y + 86} x2={DOC.x + DOC.w - 18} y2={DOC.y + 86}
                    stroke="url(#sd-beam)" strokeWidth="2.4" strokeLinecap="round"
                    className="sd-beam"
                />

                {/* copy lines */}
                {LINES.map((l, i) => (
                    <rect
                        key={`line-${i}`}
                        x={DOC.x + (DOC.w - l.w) / 2}
                        y={l.y}
                        width={l.w} height="11" rx="5.5"
                        fill={i > 1 ? "#E8EFF6" : "#E2EAF3"}
                    />
                ))}
            </g>

            {/* ── Cloud node ── */}
            <g className="sd-float" style={{ transformOrigin: "252px 68px" }}>
                <circle cx="252" cy="68" r="27" fill="white" filter="url(#sd-shadow-sm)" />
                <path
                    d="M 243 76 a 6 6 0 0 1 1.2 -11.8 a 7.4 7.4 0 0 1 14 2.1 a 5.3 5.3 0 0 1 -1.3 9.7 z"
                    fill="url(#sd-mark)"
                />
            </g>

            {/* ── PDF tile ── */}
            <g className="sd-float" style={{ transformOrigin: "100px 292px", animationDelay: "1.2s" }}>
                <rect x="66" y="258" width="68" height="68" rx="18" fill="white" filter="url(#sd-shadow-sm)" />
                <path d="M 88 274 h 16 l 10 10 v 26 a 4 4 0 0 1 -4 4 H 88 a 4 4 0 0 1 -4 -4 v -32 a 4 4 0 0 1 4 -4 z" fill="url(#sd-mark)" />
                <path d="M 104 274 v 10 h 10" fill="#BFE0F5" />
                <rect x="86" y="296" width="28" height="14" rx="4" fill="#1D4ED8" />
                <text x="100" y="306" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontSize="8" fontWeight="700" fill="white">
                    PDF
                </text>
            </g>

            {/* ── Verified badge ── */}
            <g className="sd-pop" style={{ transformOrigin: "414px 326px" }}>
                <circle cx="414" cy="326" r="30" fill="white" fillOpacity="0.85" />
                <circle cx="414" cy="326" r="24" fill="url(#sd-green)" filter="url(#sd-shadow-sm)" />
                <path d="M 405 326 l 6 6 l 12 -13" stroke="white" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* ── Trait chips ── */}
            {CHIPS.map((c) => (
                <g key={c.label} className="sd-float" style={{ transformOrigin: `${CHIP.x + CHIP.w / 2}px ${c.y + CHIP.h / 2}px`, animationDelay: `${c.delay}s` }}>
                    <rect x={CHIP.x} y={c.y} width={CHIP.w} height={CHIP.h} rx={CHIP.h / 2} fill="white" filter="url(#sd-shadow-sm)" />
                    <circle cx={CHIP.x + 22} cy={c.y + CHIP.h / 2} r="10" fill="url(#sd-green)" />
                    <path
                        d={`M ${CHIP.x + 18} ${c.y + CHIP.h / 2} l 2.8 2.8 l 5.4 -5.8`}
                        stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <text
                        x={CHIP.x + 40} y={c.y + CHIP.h / 2 + 4}
                        fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="600" fill={NAVY}
                    >
                        {c.label}
                    </text>
                </g>
            ))}

            {/* ── Upload control ── */}
            <g opacity="0.55">
                <rect x="548" y="382" width="44" height="44" rx="14" fill="#DDE7EF" />
                <path
                    d="M 570 414 v -18 M 563 402 l 7 -7 l 7 7 M 560 416 h 20"
                    stroke="#7C93A8" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};
