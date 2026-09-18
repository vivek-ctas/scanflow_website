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
            lines: ["Keep scanning even when", "part of a barcode is", "difficult to read."],
            col: "#3C9AC4",
            icon: "doc",
        },
        {
            corner: "br",
            title: "Everyday Conditions",
            lines: ["Built for the way ", "employees actually work."],
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


export const ScanFlowOrbitMockup = (props: SVGProps<SVGSVGElement>) => {
    const INK = "#13355A";
    const DEEP = "#1B4A75";
    const BLUE = "#3C9AC4";
    const SKY = "#6BC1E0";
    const MUTED = "#64748B";
    const HAIR = "#E2E8F0";

    type TagKind = "box" | "doc" | "cart" | "truck";

    const W = 616;
    const H = 520;

    /* ── orbit ── */
    const ORBIT = { cx: 300, cy: 262, rx: 212, ry: 182 };
    const onOrbit = (deg: number) => {
        const a = (deg * Math.PI) / 180;
        return { x: ORBIT.cx + ORBIT.rx * Math.cos(a), y: ORBIT.cy + ORBIT.ry * Math.sin(a) };
    };

    /* ── floating label cards ── */
    const CARD_W = 144;
    const CARD_H = 74;

    const TAGS = [
        { label: "Product", kind: "box", x: 4, y: 15, rot: -15, seed: 3, anchor: 196, float: 0 },
        { label: "Inventory", kind: "doc", x: 460, y: 20, rot: 15, seed: 11, anchor: 338, float: 0.6 },
        { label: "Order", kind: "cart", x: 4, y: 430, rot: 15, seed: 19, anchor: 146, float: 1.2 },
        { label: "Shipment", kind: "truck", x: 425, y: 420, rot: -25, seed: 27, anchor: 38, float: 1.8 },
    ] as const;

    /* ── dashboard frame ── */
    const D = { x: 110, y: 140, w: 380, h: 240 };
    const RAIL = 35;
    const BODY = D.x + RAIL;

    const KPIS = [
        { label: "Total Scans", value: "8,642" },
        { label: "Today", value: "2,573" },
        { label: "Avg. Time", value: "2.4s" },
        { label: "Accuracy", value: "99.02%" },
    ];

    /* ── chart ── */
    const CH = { x: BODY + 10, y: D.y + 100, w: D.w - RAIL - 26, h: 125 };
    const PLOT = { x: CH.x + 28, y: CH.y + 26, w: CH.w - 48, h: 56 };
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
                <circle cx="300" cy="84" r="23" fill="white" stroke={BLUE} strokeWidth="1.4" strokeOpacity="0.35" />
                <path
                    d="M 294 90 a 5.2 5.2 0 0 1 1 -10.2 a 6.4 6.4 0 0 1 12.2 1.8 a 4.6 4.6 0 0 1 -1.1 8.4 z"
                    fill={BLUE}
                />
            </g>
            <g className="sf-hub" style={{ transformOrigin: "292px 424px", animationDelay: "1.4s" }}>
                <circle cx="292" cy="444" r="22" fill="white" stroke={BLUE} strokeWidth="1.4" strokeOpacity="0.35" />
                <path d="M 292 434 l 9 3.6 v 6.6 c 0 6.2 -3.8 10 -9 11.4 c -5.2 -1.4 -9 -5.2 -9 -11.4 v -6.6 z" fill={BLUE} />
                <path d="M 288 444 l 3 3 l 5.6 -6.6" stroke="white" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* ── Dashboard ── */}
            <g transform={`rotate(-1 ${D.x + D.w / 2} ${D.y + D.h / 2})`}>
                <rect x={D.x} y={D.y} width={D.w} height={D.h} rx="14" fill="white" stroke={HAIR} strokeWidth="1.5" />

                {/* navy rail */}
                <path
                    d={`M ${D.x + 14} ${D.y} h ${RAIL - 14} v ${D.h} h ${-(RAIL - 14)} a 14 14 0 0 1 -14 -14 V ${D.y + 14} a 14 14 0 0 1 14 -14 z`}
                    fill="url(#sf-rail)"
                />
                {["home", "home", "grid", "box", "bars", "gear"].map((k, i) => (
                    <g key={`rail-${i}`} opacity={i === 0 ? 1 : 0.6}>
                        {glyph(k, D.x + RAIL / 2, D.y + 30 + i * 30, "white", 0.85)}
                    </g>
                ))}

                {/* brand row */}
                <rect x={BODY + 10} y={D.y + 14} width="17" height="17" rx="5" fill={BLUE} />
                <circle cx={BODY + 18.5} cy={D.y + 22.5} r="3.6" fill="none" stroke="white" strokeWidth="1.5" />
                <text x={BODY + 33} y={D.y + 27} fontFamily="'Montserrat', sans-serif" fontSize="15" fontWeight="700" fill={INK}>
                    ScanFlow
                </text>
                {[0, 1].map((r) =>
                    [0, 1].map((c) => (
                        <rect key={`dots-${r}${c}`} x={D.x + D.w - 26 + c * 6} y={D.y + 14 + r * 6} width="4" height="4" rx="1" fill={MUTED} opacity="0.35" />
                    ))
                )}

                {/* KPI tiles */}
                {KPIS.map((k, i) => {
                    const tx = BODY + 10 + i * 78;
                    const ty = D.y + 40;
                    return (
                        <g key={`kpi-${i}`}>
                            <rect x={tx} y={ty} width="70" height="45" rx="8" fill="white" stroke={HAIR} />
                            <text x={tx + 9} y={ty + 15} fontFamily="'Inter', sans-serif" fontSize="9" fill={MUTED}>{k.label}</text>
                            <text x={tx + 9} y={ty + 35} fontFamily="'Montserrat', sans-serif" fontSize="15" fontWeight="600" fill={INK}>{k.value}</text>
                        </g>
                    );
                })}

                {/* chart panel */}
                <rect x={CH.x} y={CH.y} width={CH.w} height={CH.h} rx="10" fill="white" stroke={HAIR} />
                <rect x={CH.x + CH.w - 75} y={CH.y + 10} width="70" height="19" rx="5" fill="white" stroke={HAIR} />
                <text x={CH.x + CH.w - 70} y={CH.y + 23} fontFamily="'Inter', sans-serif" fontSize="9.5" fill={MUTED}>Last 7 days</text>
                <path d={`M ${CH.x + CH.w - 15} ${CH.y + 20} l 2.6 2.6 l 2.6 -2.6`} stroke={MUTED} strokeWidth="1.2" fill="none" strokeLinecap="round" />

                {["10K", "10K", "5K", "0"].map((t, i) => (
                    <text
                        key={`yl-${i}`} x={PLOT.x - 8} y={PLOT.y + 16 + (i * PLOT.h) / 3}
                        textAnchor="end" fontFamily="'Inter', sans-serif" fontSize="9" fill={MUTED}
                    >
                        {t}
                    </text>
                ))}

                <polyline points={poly(GHOST)} fill="none" stroke="#CBD5E1" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points={`${PLOT.x},${PLOT.y + PLOT.h + 15} ${poly(SERIES)} ${PLOT.x + PLOT.w},${PLOT.y + PLOT.h + 15}`} fill="url(#sf-area)" />
                <polyline
                    points={poly(SERIES)}
                    fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="sf-trend"
                />
                {[0, 2, 4, 6, 8, 10, 12, 13].map((i) => (
                    <circle key={`pt-${i}`} cx={px(i, SERIES.length)} cy={py(SERIES[i])} r="2.8" fill={BLUE} />
                ))}

                <line x1={PLOT.x} y1={PLOT.y + PLOT.h + 15} x2={PLOT.x + PLOT.w} y2={PLOT.y + PLOT.h + 15} stroke={HAIR} />
                {X_LABELS.map((t, i) => (
                    <text
                        key={`xl-${i}`} x={PLOT.x + (i * PLOT.w) / (X_LABELS.length - 1)} y={PLOT.y + PLOT.h + 30}
                        textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="9.5" fill={MUTED}
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
                            stroke={BLUE} strokeWidth="1.6" strokeOpacity="0.44" strokeDasharray="3 5"
                        />
                        <g
                            className="sf-card"
                            style={{ transformOrigin: `${cardCx}px ${cardCy}px`, animationDelay: `${t.float}s` }}
                        >
                            <g transform={`rotate(${t.rot} ${cardCx} ${cardCy})`} >
                                <rect
                                    x={t.x} y={t.y} width={CARD_W} height={CARD_H} rx="12"
                                    fill="white" stroke={BLUE} strokeWidth="1" strokeOpacity="0.2"
                                />
                                {/* printed-label spine */}
                                {/* <rect x={t.x + 9} y={t.y + 16} width="12" height={CARD_H - 32} rx="6" fill="#F1F5F9" /> */}
                                {glyph(t.kind as TagKind, t.x + 15, t.y + 16, BLUE, 0.85)}
                                <text
                                    x={t.x + 28} y={t.y + 20}
                                    fontFamily="'Montserrat', sans-serif" fontSize="12.5" fontWeight="700" fill={INK}
                                >
                                    {t.label}
                                </text>
                                {barcode(t.x + 20, t.y + 30, CARD_W - 40, 28, t.seed)}
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



export const DashboardIllustration = (props: SVGProps<SVGSVGElement>) => {
    const SIDEBAR_ITEMS = [
        { label: "Dashboard", active: true },
        { label: "Scans", active: false },
        { label: "Products", active: false },
        { label: "Reports", active: false },
        { label: "Settings", active: false },
    ];

    const STAT_CARDS = [
        { label: "Total Scans", value: "12,843", delta: "+24%", up: true },
        { label: "Success Rate", value: "99.8%", delta: "+2%", up: true },
        { label: "Avg Scan Time", value: "0.3s", delta: "-45%", up: false },
    ];

    const SCAN_TYPES = [
        { label: "Product", pct: "62%", col: "#22d3ee" },
        { label: "Inventory", pct: "18%", col: "#0e7490" },
        { label: "Shipping", pct: "12%", col: "#a5f3fc" },
        { label: "Others", pct: "0%", col: "#e2e8f0" },
    ];

    const CALLOUTS = [
        {
            num: "1",
            title: "Scan",
            lines: ["Point your camera", "at the barcode."],
            x: 190,
            y: 165,
            w: 220,
            arrow: "M 300 250 C 260 285, 250 305, 275 335",
        },
        {
            num: "2",
            title: "View Details",
            lines: ["Get product info,", "stock & history."],
            x: 540,
            y: 100,
            w: 220,
            arrow: "M 760 195 C 810 215, 850 220, 875 245",
        },
        {
            num: "3",
            title: "Track & Manage",
            lines: ["Keep your operations", "in sync."],
            x: 705,
            y: 625,
            w: 235,
            arrow: "M 940 660 C 1010 570, 1000 545, 985 550",
        },
    ] as const;

    return (
        <svg
            viewBox="10 70 1200 655"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <radialGradient id="sf-cloud" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="sf-box" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f0c39a" />
                    <stop offset="100%" stopColor="#dba873" />
                </linearGradient>
                <linearGradient id="sf-phone-glow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
                </linearGradient>
                <filter id="sf-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000000" floodOpacity="0.35" />
                </filter>
                <filter id="sf-soft-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="18" />
                </filter>
                <style>{`
                    @keyframes diDashFlow {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -10; }
                    }
                    @keyframes diScanBeam {
                        0%, 100% { transform: translateY(-28px); opacity: 0.25; }
                        50% { transform: translateY(28px); opacity: 0.9; }
                    }
                    @keyframes diDotPulse {
                        0%, 100% { opacity: 0.45; }
                        50% { opacity: 1; }
                    }
                    @keyframes diRaySpin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes diFloat {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }
                    @keyframes diBracketPulse {
                        0%, 100% { opacity: 0.45; }
                        50% { opacity: 1; }
                    }
                    @keyframes diDonutPulse {
                        0%, 100% { opacity: 0.55; }
                        50% { opacity: 1; }
                    }
                    .di-arrow-flow {
                        animation: diDashFlow 0.9s linear infinite;
                    }
                    .di-scan-beam {
                        animation: diScanBeam 2.2s ease-in-out infinite;
                    }
                    .di-dot-pulse { animation: diDotPulse 2.4s ease-in-out infinite; }
                    .di-dot-pulse-1 { animation: diDotPulse 2.4s ease-in-out infinite 0.3s; }
                    .di-dot-pulse-2 { animation: diDotPulse 2.4s ease-in-out infinite 0.7s; }
                    .di-dot-pulse-3 { animation: diDotPulse 2.4s ease-in-out infinite 1.1s; }
                    .di-dot-pulse-4 { animation: diDotPulse 2.4s ease-in-out infinite 1.5s; }
                    .di-dot-pulse-5 { animation: diDotPulse 2.4s ease-in-out infinite 1.9s; }
                    .di-dot-pulse-6 { animation: diDotPulse 2.4s ease-in-out infinite 0.5s; }
                    .di-dot-pulse-7 { animation: diDotPulse 2.4s ease-in-out infinite 0.9s; }
                    .di-dot-pulse-8 { animation: diDotPulse 2.4s ease-in-out infinite 1.3s; }
                    .di-dot-pulse-9 { animation: diDotPulse 2.4s ease-in-out infinite 1.7s; }
                    .di-status-pulse { animation: diDotPulse 1.8s ease-in-out infinite; }
                    .di-ray-spin {
                        transform-origin: 1090px 168px;
                        animation: diRaySpin 24s linear infinite;
                    }
                    .di-float { animation: diFloat 6s ease-in-out infinite; }
                    .di-float-1 { animation: diFloat 7s ease-in-out infinite 1.2s; }
                    .di-bracket-pulse { animation: diBracketPulse 2.2s ease-in-out infinite; }
                    .di-donut-pulse { animation: diDonutPulse 3s ease-in-out infinite; }
                    @media (prefers-reduced-motion: reduce) {
                        .di-arrow-flow, .di-scan-beam, .di-dot-pulse, .di-dot-pulse-1,
                        .di-dot-pulse-2, .di-dot-pulse-3, .di-dot-pulse-4, .di-dot-pulse-5,
                        .di-dot-pulse-6, .di-dot-pulse-7, .di-dot-pulse-8, .di-dot-pulse-9,
                        .di-status-pulse, .di-ray-spin, .di-float, .di-float-1,
                        .di-bracket-pulse, .di-donut-pulse { animation: none; }
                    }
                `}</style>
            </defs>

            {/* ── Cloud backdrop ── */}
            <ellipse cx="600" cy="430" rx="560" ry="290" fill="url(#sf-cloud)" filter="url(#sf-soft-blur)" />
            <ellipse cx="180" cy="440" rx="220" ry="150" fill="#cbd5e1" opacity="0.18" filter="url(#sf-soft-blur)" />

            {/* Decorative floating badges */}
            <circle cx="175" cy="308" r="17" fill="rgba(142, 186, 244, 1)" opacity="0.85" className="di-float" />
            <circle cx="1090" cy="168" r="46" fill="#dbeafe" />
            <g stroke="#2563eb" strokeWidth="2.4" fill="none" strokeLinecap="round" className="di-ray-spin">
                <circle cx="1090" cy="168" r="11" />
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line
                            key={deg}
                            x1={1090 + Math.cos(rad) * 15}
                            y1={168 + Math.sin(rad) * 15}
                            x2={1090 + Math.cos(rad) * 20}
                            y2={168 + Math.sin(rad) * 20}
                        />
                    );
                })}
            </g>
            <circle cx="1160" cy="470" r="42" fill="#dbeafe" className="di-float" />
            <path
                d="M 1135 478 q -8 -20 12 -22 q 4 -14 20 -8 q 14 -4 16 12 q 12 2 8 16 q -2 8 -12 8 h -34 q -12 0 -10 -6 z"
                fill="#93c5fd"
                className="di-float"
            />
            <circle cx="1156" cy="592" r="12" fill="#cbd5e1" opacity="0.7" className="di-float-1" />

            {/* ── Package with barcode label ── */}
            <g filter="url(#sf-shadow)">
                <rect x="10" y="392" width="325" height="205" rx="14" fill="url(#sf-box)" />
                <path d="M 10 392 L 172 392 L 190 415 L 335 415" stroke="#c4915f" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M 172 392 L 172 597" stroke="#c4915f" strokeWidth="2" opacity="0.4" />
            </g>
            <g transform="translate(178, 435) rotate(-8)">
                <rect x="0" y="0" width="150" height="100" rx="4" fill="white" filter="url(#sf-shadow)" />
                <g stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" fill="none" className="di-bracket-pulse">
                    <path d="M 8 22 V 8 H 22" />
                    <path d="M 128 8 H 142 V 22" />
                    <path d="M 8 78 V 92 H 22" />
                    <path d="M 142 78 V 92 H 128" />
                </g>
                {[3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3].map((w, i, arr) => {
                    const totalW = arr.reduce((s, v) => s + v * 3.2 + 2, 0);
                    const startX = 75 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 3.2 + 2, 0);
                    return <rect key={i} x={startX} y="32" width={w * 3.2} height="36" fill="#1e293b" />;
                })}
                <rect x="20" y="82" width="60" height="4" rx="2" fill="#cbd5e1" />
            </g>

            {/* ── Phone ── */}
            <g filter="url(#sf-shadow)">
                <rect x="305" y="270" width="248" height="392" rx="38" fill="#0f172a" />
                <rect x="318" y="292" width="222" height="348" rx="26" fill="#0b1220" />
            </g>
            <text x="330" y="316" fontFamily="'DM Sans',sans-serif" fontSize="15" fontWeight="700" fill="white">9:41</text>
            <g fill="white">
                <circle cx="515" cy="312" r="1.6" />
                <circle cx="510" cy="312" r="1.6" />
                <circle cx="520" cy="312" r="1.6" />
                <rect x="502" y="307" width="25" height="11" rx="2" fill="none" stroke="white" strokeWidth="1" />
            </g>
            <text x="330" y="342" fontFamily="'DM Sans',sans-serif" fontSize="12" fontWeight="700" fill="white">☰</text>
            <circle cx="390" cy="338" r="8" fill="#22d3ee" />
            <text x="400" y="345" fontFamily="'DM Sans',sans-serif" fontSize="18" fontWeight="300" fill="white">scanflow</text>

            {/* Viewfinder */}
            <g stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" fill="none">
                <path d="M 355 372 V 356 H 366" />
                <path d="M 490 356 H 506 V 372" />
                <path d="M 350 500 V 516 H 366" />
                <path d="M 506 500 V 516 H 490" />
            </g>
            <g transform="translate(430, 430)">
                <g className="di-scan-beam">
                    <rect x="-80" y="0" width="160" height="6" rx="2" fill="url(#sf-phone-glow)" opacity="1" />
                </g>
            </g>
            {[3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 2, 1].map((w, i, arr) => {
                const totalW = arr.reduce((s, v) => s + v * 3.4 + 2, 0);
                const startX = 429 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 3.4 + 2, 0);
                return <rect key={i} x={startX} y="410" width={w * 3.4} height="56" fill="white" />;
            })}
            <rect x="360" y="546" width="140" height="30" rx="13" fill="#0e3a2f" />
            <circle cx="372" cy="560" r="7" fill="#22c55e" className="di-status-pulse" />
            <text x="425" y="509 " fontFamily="'DM Sans',sans-serif" fontSize="0" fill="transparent">spacer</text>
            <text x="386" y="566" fontFamily="'DM Sans',sans-serif" fontSize="15" fontWeight="400" fill="#4ade80">Scan Successful</text>

            <g stroke="white" strokeWidth="1.6" fill="none">
                <rect x="330" y="600" width="20" height="16" rx="3" />
                <circle cx="421" cy="608" r="15" fill="white" stroke="none" />
                <path d="M 500 600 l -7 10 h 6 l -7 10" />
            </g>

            {/* ── Laptop ── */}
            <path d="M 590 700 L 1190 700 Q 1200 720 1190 722 L 600 722 Q 580 720 590 700 Z" fill="#cbd5e1" />

            <g filter="url(#sf-shadow)">
                <rect x="600" y="228" width="600" height="432" rx="18" fill="#bfdbfe" />
                <rect x="611" y="239" width="578" height="400" rx="8" fill="white" />
            </g>

            {/* Laptop top nav */}
            <line x1="611" y1="280" x2="1190" y2="280" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="627" cy="260" r="7" fill="#2563eb" />
            <text x="640" y="266" fontFamily="'DM Sans',sans-serif" fontSize="22" fontWeight="660" fill="#0f172a">scanflow</text>
            <circle cx="1065" cy="260" r="10" fill="#e2e8f0" />

            {/* Sidebar */}
            <rect x="611" y="280" width="100" height="360" fill="#0f172a" />
            {SIDEBAR_ITEMS.map((item, i) => (
                <g key={item.label}>
                    {item.active && <rect x="611" y={290 + i * 40} width="100" height="26" fill="#2563eb" opacity="0.9" />}
                    <text
                        x="626"
                        y={306 + i * 40}
                        fontFamily="'DM Sans',sans-serif"
                        fontSize="15"
                        fontWeight="600"
                        fill={item.active ? "white" : "#94a3b8"}
                    >
                        {item.label}
                    </text>
                </g>
            ))}

            {/* Main content */}
            <text x="716" y="300" fontFamily="'DM Sans',sans-serif" fontSize="18" fontWeight="700" fill="#0f172a">
                Scanning Guide
            </text>

            {STAT_CARDS.map((s, i) => {
                const cx = 716 + i * 160;
                return (
                    <g key={s.label}>
                        <rect x={cx} y="310" width="140" height="90" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                        <text x={cx + 10} y="330" fontFamily="'DM Sans',sans-serif" fontSize="18" fill="#94a3b8">{s.label}</text>
                        <text x={cx + 10} y="360" fontFamily="'DM Sans',sans-serif" fontSize="20" fontWeight="700" fill="#0f172a">{s.value}</text>
                        <text x={cx + 15} y="390" fontFamily="'DM Sans',sans-serif" fontSize="15" fontWeight="700" fill={s.up ? "#16a34a" : "#dc2626"}>
                            {s.up ? "↑" : "↓"} {s.delta}
                        </text>
                    </g>
                );
            })}

            {/* Scan activity chart */}
            <rect x="716" y="425" width="200" height="190" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <text x="726" y="450" fontFamily="'DM Sans',sans-serif" fontSize="18" fontWeight="700" fill="#0f172a">Scan Activity</text>
            <polyline
                points="726,555 748,545 770,530 792,535 814,515 836,508 858,490 880,498 902,480"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
            />
            {
                ["726,555", "748,545", "770,530", "792,535", "814,515", "836,508", "858,490", "880,498", "902,480"].map(
                    (p, i) => {
                        const [x, y] = p.split(",").map(Number);
                        return <circle key={i} cx={x} cy={y} r="2.5" fill="#2563eb" className={`di-dot-pulse-${i + 1}`} />;
                    }
                )
            }
            <circle cx="726" cy="555" r="4" fill="#22d3ee" className="di-dot-pulse-6">
                <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    path="M726,555 L748,545 L770,530 L792,535 L814,515 L836,508 L858,490 L880,498 L902,480"
                />
            </circle>
            <text x="726" y="600" fontFamily="'DM Sans',sans-serif" fontSize="15" fill="#94a3b8">Apr 20</text>
            <text x="870" y="600" fontFamily="'DM Sans',sans-serif" fontSize="15" fill="#94a3b8">Apr 26</text>

            {/* Scan types donut */}
            <rect x="928" y="425" width="250" height="190" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <text x="938" y="450" fontFamily="'DM Sans',sans-serif" fontSize="15" fontWeight="700" fill="#0f172a">Scan Types</text>
            <circle cx="980" cy="510" r="36" fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle
                cx="980"
                cy="510"
                r="36"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="10"
                strokeDasharray="94 150"
                transform="rotate(-90 980 510)"
                className="di-donut-pulse"
            />
            {
                SCAN_TYPES.map((t, i) => (
                    <g key={t.label}>
                        <circle cx="1050" cy={460 + i * 40} r="6" fill={t.col} />
                        <text x="1060" y={466 + i * 40} fontFamily="'DM Sans',sans-serif" fontSize="18" fill="#475569">
                            {t.label} {t.pct}
                        </text>
                    </g>
                ))
            }

            {/* ── Numbered workflow callouts ── */}
            {
                CALLOUTS.map((c) => (
                    <g key={c.num}>
                        <path d={c.arrow} stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" fill="none" className="di-arrow-flow" />
                        <g filter="url(#sf-shadow)">
                            <rect x={c.x} y={c.y} width={c.w} height="74" rx="14" fill="white" />
                        </g>
                        <circle cx={c.x + 18} cy={c.y - 2} r="18" fill="#38bdf8" />
                        <text x={c.x + 18} y={c.y + 3} textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="18" fontWeight="700" fill="white">
                            {c.num}
                        </text>
                        <text x={c.x + 42} y={c.y + 26} fontFamily="'DM Sans',sans-serif" fontSize="18" fontWeight="700" fill="#0f172a">
                            {c.title}
                        </text>
                        {c.lines.map((line, i) => (
                            <text
                                key={i}
                                x={c.x + 42}
                                y={c.y + 41 + i * 13}
                                fontFamily="'DM Sans',sans-serif"
                                fontSize="15"
                                fill="#94a3b8"
                            >
                                {line}
                            </text>
                        ))}
                    </g>
                ))
            }
        </svg >
    );
};

export const BoxWithPhoneIllustration = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            viewBox="130 150 1410 645"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient id="sfl-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#eef4fc" />
                    <stop offset="100%" stopColor="#e4eefb" />
                </linearGradient>
                <linearGradient id="sfl-box-front" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f3c393" />
                    <stop offset="100%" stopColor="#e2a86d" />
                </linearGradient>
                <linearGradient id="sfl-box-top" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f8dcb8" />
                    <stop offset="100%" stopColor="#eec190" />
                </linearGradient>
                <linearGradient id="sfl-beam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="sfl-scanline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                    <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
                </linearGradient>
                <filter id="sfl-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#94a3b8" floodOpacity="0.3" />
                </filter>
                <filter id="sfl-blur" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="16" />
                </filter>
                <style>{`
                    @keyframes bwpFloat {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }
                    @keyframes bwpDashFlow {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -12; }
                    }
                    @keyframes bwpBracketPulse {
                        0%, 100% { opacity: 0.45; }
                        50% { opacity: 1; }
                    }
                    @keyframes bwpScanSweep {
                        0%, 100% { transform: translateY(-18px); opacity: 0.25; }
                        50% { transform: translateY(18px); opacity: 1; }
                    }
                    @keyframes bwpPulse {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 1; }
                    }
                    .bwp-float { animation: bwpFloat 6s ease-in-out infinite; }
                    .bwp-float-1 { animation: bwpFloat 7s ease-in-out infinite 1.2s; }
                    .bwp-dash-flow {
                        animation: bwpDashFlow 1.2s linear infinite;
                    }
                    .bwp-bracket-pulse { animation: bwpBracketPulse 2.2s ease-in-out infinite; }
                    .bwp-scan-sweep { animation: bwpScanSweep 2.4s ease-in-out infinite; }
                    .bwp-scan-sweep-b { animation: bwpScanSweep 2.8s ease-in-out infinite 0.6s; }
                    .bwp-pulse { animation: bwpPulse 2.4s ease-in-out infinite; }
                    .bwp-pulse-1 { animation: bwpPulse 2s ease-in-out infinite 0.4s; }
                    @media (prefers-reduced-motion: reduce) {
                        .bwp-float, .bwp-float-1, .bwp-dash-flow, .bwp-bracket-pulse,
                        .bwp-scan-sweep, .bwp-scan-sweep-b, .bwp-pulse, .bwp-pulse-1 { animation: none; }
                    }
                `}</style>
            </defs>

            {/* Decorative circles */}
            <circle cx="275" cy="285" r="30" fill="#c9d9ee" opacity="0.7" className="bwp-float" />
            <circle cx="1475" cy="472" r="32" fill="#c9d9ee" opacity="0.6" className="bwp-float-1" />

            {/* Ground shadows */}
            <ellipse cx="605" cy="740" rx="270" ry="20" fill="#94a3b8" opacity="0.18" />
            <ellipse cx="1040" cy="765" rx="190" ry="18" fill="#94a3b8" opacity="0.18" />

            {/* ── Plant ── */}
            <g>
                <path d="M 148 690 L 300 690 L 285 610 L 163 610 Z" fill="white" />
                <ellipse cx="224" cy="610" rx="61" ry="10" fill="#dbe6f5" />
                <g fill="#bcdcf2" stroke="#8fc3e8" strokeWidth="1.5">
                    <path d="M 224 610 C 210 540 175 500 148 445 C 200 470 224 540 224 610 Z" />
                    <path d="M 224 610 C 238 540 273 500 300 445 C 248 470 224 540 224 610 Z" />
                    <path d="M 224 610 C 214 520 200 470 190 430 C 225 455 228 540 224 610 Z" />
                    <path d="M 224 610 C 234 520 248 470 258 430 C 223 455 220 540 224 610 Z" />
                    <path d="M 224 610 C 224 500 224 460 224 415 C 250 445 235 550 224 610 Z" />
                </g>
            </g>


            {/* ── Box (isometric) ── */}
            <g filter="url(#sfl-shadow)">
                <path d="M 365 460 L 605 400 L 850 460 L 850 715 L 605 720 L 365 715 Z" fill="url(#sfl-box-front)" />
                <path d="M 365 460 L 605 400 L 850 460 L 605 505 Z" fill="url(#sfl-box-top)" />
            </g>
            {/* Flap seams */}
            <path d="M 365 460 L 605 505 L 850 460" stroke="#c98f56" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 605 505 L 605 720" stroke="#c98f56" strokeWidth="2" opacity="0.4" />
            <path d="M 440 435 L 440 480" stroke="#c98f56" strokeWidth="6" opacity="0.5" />
            <path d="M 690 420 L 690 465" stroke="#c98f56" strokeWidth="6" opacity="0.5" />

            {/* Barcode label on box front */}
            <rect x="610" y="555" width="150" height="105" rx="6" fill="white" transform="rotate(2 685 607)" />
            <g stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" fill="none" transform="rotate(2 685 607)" className="bwp-bracket-pulse">
                <path d="M 618 578 V 562 H 634" />
                <path d="M 736 562 H 752 V 578" />
                <path d="M 618 638 V 654 H 634" />
                <path d="M 752 638 V 654 H 736" />
            </g>
            <g transform="rotate(2 685 607)">
                {[2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1].map((w, i, arr) => {
                    const totalW = arr.reduce((s, v) => s + v * 3 + 2, 0);
                    const startX = 685 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 3 + 2, 0);
                    return <rect key={i} x={startX} y="588" width={w * 3} height="38" fill="#1e293b" />;
                })}
                <rect x="635" y="607" width="100" height="5" rx="2.5" fill="url(#sfl-scanline)" className="bwp-scan-sweep-b" />
            </g>

            {/* Warning icons on box front */}
            <g stroke="#8a5a30" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="380" y="640" width="46" height="46" rx="4" opacity="0.7" />
                <path d="M 396 675 V 651 M 390 657 L 396 651 L 402 657" />
                <path d="M 412 675 V 651 M 406 669 L 412 675 L 418 669" />
                <rect x="436" y="640" width="46" height="46" rx="4" opacity="0.7" />
                <path d="M 459 649 L 449 668 H 469 Z" />
            </g>

            {/* Scan target badge above box */}
            <circle cx="552" cy="298" r="46" fill="white" filter="url(#sfl-shadow)" />
            <g stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" fill="none" className="bwp-bracket-pulse">
                <path d="M 532 288 V 278 H 542" />
                <path d="M 562 278 H 572 V 288" />
                <path d="M 532 308 V 318 H 542" />
                <path d="M 572 308 V 318 H 562" />
            </g>
            <path d="M 538 288 L 566 298 L 552 312 Z" fill="#22d3ee" opacity="0.85" className="bwp-pulse" />
            <path d="M 505 340 Q 480 370 500 400" stroke="#7dd3fc" strokeWidth="3" strokeDasharray="6 6" fill="none" className="bwp-dash-flow" />

            {/* ── Scan beam ── */}
            <path d="M 760 570 L 1075 430 L 1075 610 L 760 650 Z" fill="url(#sfl-beam)" className="bwp-pulse" />

            {/* ── Phone (tilted) ── */}
            <g transform="rotate(8 1030 495)" filter="url(#sfl-shadow)">
                <rect x="955" y="285" width="250" height="460" rx="42" fill="#0f172a" />
                <rect x="969" y="308" width="222" height="414" rx="30" fill="#0b1220" />
            </g>
            <g transform="rotate(8 1030 495)">
                <text x="983" y="336" fontFamily="'DM Sans',sans-serif" fontSize="18" fontWeight="700" fill="white">9:41</text>
                <g fill="white">
                    <circle cx="1134" cy="334" r="2" />
                    <circle cx="1140" cy="334" r="2" />
                    <circle cx="1146" cy="334" r="2" />
                    <rect x="1152" y="327" width="22" height="12" rx="2" fill="none" stroke="white" strokeWidth="1" />
                </g>
                <circle cx="986" cy="372" r="15" fill="#1e293b" />
                <path d="M 990 366 L 983 372 L 990 378" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* Viewfinder + barcode */}
                <g stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" fill="none" className="bwp-bracket-pulse">
                    <path d="M 1015 480 V 460 H 1035" />
                    <path d="M 1125 460 H 1145 V 480" />
                    <path d="M 1015 600 V 620 H 1035" />
                    <path d="M 1145 600 V 620 H 1125" />
                </g>
                <rect x="1025" y="500" width="104" height="80" rx="6" fill="white" />
                {[2, 1, 3, 1, 2, 3, 1, 2, 1, 3].map((w, i, arr) => {
                    const totalW = arr.reduce((s, v) => s + v * 2.4 + 1.6, 0);
                    const startX = 1080 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 2.4 + 1.6, 0);
                    return <rect key={i} x={startX} y="514" width={w * 2.4} height="52" fill="#1e293b" />;
                })}
                <rect x="1010" y="535" width="140" height="6" fill="url(#sfl-scanline)" className="bwp-scan-sweep" />

                {/* Scan successful pill */}
                <rect x="990" y="655" width="200" height="38" rx="19" fill="#1e3a5f" opacity="0.9" />
                <circle cx="1010" cy="674" r="11" fill="#38bdf8" className="bwp-pulse" />
                <path d="M 1005 674 L 1009 678 L 1016 670" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="1025" y="682" fontFamily="'DM Sans',sans-serif" fontSize="20" fontWeight="500" fill="white">Scan Successful</text>

                <rect x="1060" y="712" width="40" height="4" rx="2" fill="#334155" />
            </g>

            {/* ── Product ID result card ── */}
            <path d="M 1075 450 Q 1105 370 1140 300" stroke="#7dd3fc" strokeWidth="3" strokeDasharray="6 6" fill="none" className="bwp-dash-flow" />
            <g filter="url(#sfl-shadow)">
                <rect x="1140" y="160" width="375" height="150" rx="16" fill="white" />
            </g>
            <rect x="1165" y="185" width="60" height="52" rx="6" fill="#eef4fc" />
            {[2, 1, 2, 1, 2, 1, 2].map((w, i, arr) => {
                const totalW = arr.reduce((s, v) => s + v * 1.8 + 1.6, 0);
                const startX = 1195 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 1.8 + 1.6, 0);
                return <rect key={i} x={startX} y="198" width={w * 1.8} height="28" fill="#1e293b" />;
            })}
            <text x="1245" y="200" fontFamily="'DM Sans',sans-serif" fontSize="21" fill="#94a3b8">Product ID</text>
            <text x="1245" y="243" fontFamily="'DM Sans',sans-serif" fontSize="28" fontWeight="700" fill="#0f172a">GTIN 123456789012</text>
            <circle cx="1257" cy="280" r="18" fill="#10b981" className="bwp-pulse-1" />
            <path d="M 1251 280 L 1255 284 L 1263 274" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="1280" y="285" fontFamily="'DM Sans',sans-serif" fontSize="22" fontWeight="700" fill="#10b981">Scan Successful</text>
        </svg>
    );
};

export const WarehouseIllustration = (props: SVGProps<SVGSVGElement>) => {
    function miniBox(x: number, y: number, w: number, h: number) {
        return (
            <g key={`${x}-${y}`}>
                <rect x={x} y={y} width={w} height={h} rx="4" fill="#eec18e" stroke="#d9a86c" strokeWidth="1" />
                <rect x={x + w * 0.22} y={y + h * 0.3} width={w * 0.4} height={h * 0.34} rx="2" fill="white" />
                {[1, 2, 1, 2, 1].map((seg, i) => (
                    <rect
                        key={i}
                        x={x + w * 0.26 + i * (w * 0.06)}
                        y={y + h * 0.36}
                        width={seg * 1.4}
                        height={h * 0.22}
                        fill="#1e293b"
                    />
                ))}
                <rect x={x + w * 0.68} y={y + h * 0.62} width={w * 0.12} height={w * 0.12} rx="1" fill="none" stroke="#a9825a" strokeWidth="1" />
            </g>
        );
    }

    return (
        <svg
            viewBox="230 110 1470 710"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient id="wh-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#eef4fc" />
                    <stop offset="100%" stopColor="#e2ecf9" />
                </linearGradient>
                <linearGradient id="wh-beam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7dd3fc" stopOpacity="1" />
                    <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#7dd3fc" stopOpacity="1" />
                </linearGradient>
                <filter id="wh-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#94a3b8" floodOpacity="0.28" />
                </filter>
                <filter id="wh-blur" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="20" />
                </filter>
                <style>{`
                    @keyframes whDashFlow {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -10; }
                    }
                    @keyframes whScanSweep {
                        0%, 100% { transform: translateY(-16px); opacity: 0.2; }
                        50% { transform: translateY(16px); opacity: 1; }
                    }
                    @keyframes whScanSweepB {
                        0%, 100% { transform: translateY(-20px); opacity: 0.2; }
                        50% { transform: translateY(20px); opacity: 1; }
                    }
                    @keyframes whBracketPulse {
                        0%, 100% { opacity: 0.45; }
                        50% { opacity: 1; }
                    }
                    @keyframes whPulse {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 1; }
                    }
                    @keyframes whLampSwing {
                        0%, 100% { transform: rotate(-3deg); }
                        50% { transform: rotate(3deg); }
                    }
                    @keyframes whGlow {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 1; }
                    }
                    .wh-dash-flow {
                        animation: whDashFlow 1.1s linear infinite;
                    }
                    .wh-scan-sweep {
                        animation: whScanSweep 2.4s ease-in-out infinite;
                    }
                    .wh-scan-sweep-b {
                        animation: whScanSweepB 2.8s ease-in-out infinite 0.6s;
                    }
                    .wh-bracket-pulse { animation: whBracketPulse 2.2s ease-in-out infinite; }
                    .wh-pulse { animation: whPulse 2.4s ease-in-out infinite; }
                    .wh-pulse-1 { animation: whPulse 2s ease-in-out infinite 0.4s; }
                    .wh-lamp {
                        transform-origin: 920px 80px;
                        animation: whLampSwing 6s ease-in-out infinite;
                    }
                    .wh-glow { animation: whGlow 2.2s ease-in-out infinite; }
                    @media (prefers-reduced-motion: reduce) {
                        .wh-dash-flow, .wh-scan-sweep, .wh-scan-sweep-b, .wh-bracket-pulse,
                        .wh-pulse, .wh-pulse-1, .wh-lamp, .wh-glow { animation: none; }
                    }
                `}</style>
            </defs>

            {/* Back wall with window grid */}
            <rect x="700" y="220" width="440" height="330" fill="#e8f0fb" opacity="0.6" />
            {[0, 1, 2, 3].map((c) => (
                <line key={`v${c}`} x1={700 + c * 110} y1="220" x2={700 + c * 110} y2="550" stroke="#c7d7ee" strokeWidth="2" />
            ))}
            {[0, 1, 2].map((r) => (
                <line key={`h${r}`} x1="700" y1={220 + r * 110} x2="1140" y2={220 + r * 110} stroke="#c7d7ee" strokeWidth="2" />
            ))}

            {/* Hanging lamp */}
            <g className="wh-lamp">
                <line x1="920" y1="80" x2="920" y2="150" stroke="#a9c1e0" strokeWidth="3" />
                <path d="M 885 150 L 955 150 L 940 185 L 900 185 Z" fill="#c7d7ee" stroke="#a9c1e0" strokeWidth="2" />
                <circle cx="920" cy="195" r="9" fill="#eef4fc" stroke="#a9c1e0" strokeWidth="2" />
            </g>
            <circle cx="920" cy="195" r="26" fill="#93c5fd" opacity="0.4" filter="url(#wh-blur)" className="wh-glow" />

            {/* Shelving unit */}
            <g stroke="#aec4e3" strokeWidth="4" fill="none">
                <line x1="1180" y1="215" x2="1180" y2="660" />
                <line x1="1550" y1="200" x2="1550" y2="660" />
                <line x1="1180" y1="300" x2="1550" y2="290" />
                <line x1="1180" y1="440" x2="1550" y2="430" />
                <line x1="1180" y1="580" x2="1550" y2="570" />
            </g>
            <g stroke="#c3d5ee" strokeWidth="2" fill="none">
                <line x1="1180" y1="300" x2="1550" y2="430" />
                <line x1="1550" y1="290" x2="1180" y2="440" />
                <line x1="1180" y1="440" x2="1550" y2="570" />
                <line x1="1550" y1="430" x2="1180" y2="580" />
            </g>
            {miniBox(1195, 235, 100, 68)}
            {miniBox(1310, 240, 100, 62)}
            {miniBox(1425, 235, 100, 68)}
            {miniBox(1200, 355, 100, 64)}
            {miniBox(1330, 358, 100, 60)}
            {miniBox(1450, 350, 90, 66)}

            {/* Plant near shelf */}
            <path d="M 1560 660 L 1660 660 L 1648 600 L 1572 600 Z" fill="white" />
            <g fill="#bcdcf2" stroke="#8fc3e8" strokeWidth="1.5">
                <path d="M 1610 600 C 1595 540 1560 505 1535 465 C 1580 485 1610 540 1610 600 Z" />
                <path d="M 1610 600 C 1622 540 1655 505 1680 465 C 1638 485 1610 540 1610 600 Z" />
                <path d="M 1610 600 C 1605 520 1610 470 1610 425 C 1635 460 1622 540 1610 600 Z" />
            </g>

            {/* Platform / table */}
            <path d="M 870 655 L 1520 655 L 1660 705 L 1010 705 Z" fill="#c9d8ef" />
            <path d="M 870 655 L 1010 705 L 1010 730 L 870 680 Z" fill="#b7c9e6" />

            {/* Pallet jack + boxes */}
            <g stroke="#9bb6dd" strokeWidth="4" fill="none">
                <path d="M 260 660 L 260 480 L 310 460" strokeLinecap="round" />
                <path d="M 260 640 L 470 640" />
            </g>
            <circle cx="280" cy="672" r="16" fill="#c7d7ee" stroke="#9bb6dd" strokeWidth="3" />
            <circle cx="440" cy="672" r="16" fill="#c7d7ee" stroke="#9bb6dd" strokeWidth="3" />
            <rect x="270" y="628" width="210" height="14" rx="4" fill="#c7d7ee" />
            {miniBox(320, 500, 130, 90)}
            {miniBox(335, 560, 175, 78)}

            {/* ── Scan icon badge (top-left) ── */}
            <rect x="480" y="220" width="135" height="115" rx="16" fill="white" filter="url(#wh-shadow)" />
            <g stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" fill="none" className="wh-bracket-pulse">
                <path d="M 512 250 V 240 H 522" />
                <path d="M 572 240 H 582 V 250" />
                <path d="M 512 305 V 315 H 522" />
                <path d="M 582 305 V 315 H 572" />
            </g>
            {[2, 1, 3, 1, 2, 1, 3].map((w, i, arr) => {
                const totalW = arr.reduce((s, v) => s + v * 2.6 + 2, 0);
                const startX = 547 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 2.6 + 2, 0);
                return <rect key={i} x={startX} y="262" width={w * 2.6} height="30" fill="#1e293b" />;
            })}
            <rect x="518" y="277" width="58" height="6" rx="2" fill="url(#wh-beam)" className="wh-scan-sweep" />
            <path d="M 615 300 Q 660 320 700 320 Q 730 320 745 340" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="5 5" fill="none" className="wh-dash-flow" />

            {/* ── Worker (side profile) ── */}
            <g>
                {/* legs */}
                <path d="M 710 690 L 700 800 L 745 800 L 755 700 Z" fill="#1e2a44" />
                <path d="M 778 700 L 810 800 L 845 800 L 830 690 Z" fill="#16213a" />
                {/* torso */}
                <path d="M 690 460 Q 685 420 720 400 L 830 400 Q 855 420 855 460 L 855 700 L 690 700 Z" fill="#3b82f6" />
                {/* reflective stripe */}
                <path d="M 735 400 L 770 400 L 800 700 L 765 700 Z" fill="#bfdbfe" opacity="0.85" />
                {/* far arm (behind torso, resting) */}
                <path d="M 700 430 Q 675 470 685 520" stroke="#3b82f6" strokeWidth="26" strokeLinecap="round" fill="none" />
                {/* near arm to scanner */}
                <path d="M 845 430 Q 900 460 935 480" stroke="#3b82f6" strokeWidth="30" strokeLinecap="round" fill="none" />
                <ellipse cx="945" cy="490" rx="20" ry="16" fill="#f2b389" />
                {/* neck + head */}
                <rect x="755" y="360" width="26" height="30" fill="#f2b389" />
                <circle cx="770" cy="330" r="42" fill="#f2b389" />
                {/* cap */}
                <path d="M 728 305 Q 732 260 778 258 Q 822 258 828 305 Z" fill="#2563eb" />
                <path d="M 812 300 Q 855 296 865 312 Q 855 322 812 316 Z" fill="#1d4ed8" />
                {/* hair sliver */}
                <path d="M 730 310 Q 728 335 740 350" stroke="#1e2a44" strokeWidth="6" strokeLinecap="round" fill="none" />
            </g>

            {/* Scanner gun */}
            <g transform="translate(935, 470) rotate(18)">
                <rect x="0" y="-14" width="46" height="28" rx="8" fill="#0f172a" />
                <rect x="6" y="-8" width="18" height="16" rx="3" fill="#38bdf8" />
                <path d="M 46 0 L 66 -6 L 66 6 Z" fill="#0f172a" />
                <rect x="-6" y="10" width="16" height="26" rx="6" fill="#1e293b" />
            </g>

            {/* Scan beam to box */}
            <path d="M 995 482 L 1150 500 L 1150 600 L 995 495 Z" fill="url(#wh-beam)" className="wh-pulse" />

            {/* Green success badge */}
            <circle cx="1075" cy="405" r="26" fill="#10b981" filter="url(#wh-shadow)" className="wh-pulse-1" />
            <path d="M 1064 405 L 1071 412 L 1088 393" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <g stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" className="wh-bracket-pulse">
                <line x1="1075" y1="368" x2="1075" y2="358" />
                <line x1="1108" y1="380" x2="1116" y2="373" />
                <line x1="1040" y1="380" x2="1032" y2="373" />
            </g>

            {/* ── Box on platform ── */}
            <g filter="url(#wh-shadow)">
                <path d="M 1150 470 L 1290 445 L 1420 480 L 1420 640 L 1290 660 L 1150 630 Z" fill="#eec18e" />
                <path d="M 1150 470 L 1290 445 L 1420 480 L 1290 505 Z" fill="#f6d7ae" />
            </g>
            <path d="M 1220 458 L 1290 445 L 1355 462" stroke="#d9a86c" strokeWidth="2" fill="none" opacity="0.7" />

            <rect x="1170" y="510" width="140" height="95" rx="6" fill="white" transform="rotate(-3 1240 558)" />
            <g transform="rotate(-3 1240 558)">
                {[2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2].map((w, i, arr) => {
                    const totalW = arr.reduce((s, v) => s + v * 2.8 + 2, 0);
                    const startX = 1240 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 2.8 + 2, 0);
                    return <rect key={i} x={startX} y="535" width={w * 2.8} height="42" fill="#1e293b" />;
                })}
                <rect x="1190" y="554" width="98" height="5" rx="2.5" fill="url(#wh-beam)" className="wh-scan-sweep-b" />
            </g>

            {/* Warning icons on box */}
            <g stroke="#a9825a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1300" y="595" width="42" height="42" rx="3" opacity="0.7" />
                <path d="M 1314 628 V 606 M 1309 611 L 1314 606 L 1319 611" />
                <path d="M 1328 628 V 606 M 1323 623 L 1328 628 L 1333 623" />
                <rect x="1350" y="598" width="42" height="42" rx="3" opacity="0.7" />
                <path d="M 1371 606 L 1362 623 H 1380 Z" />
            </g>
        </svg>
    );
};

export const ScanFlowStepsIllustration = (props: SVGProps<SVGSVGElement>) => {
    const CONDITIONS = [
        { label: "Clear Barcode", col: "#10b981", icon: "check" },
        { label: "Blurred Barcode", col: "#7c3aed", icon: "refresh" },
        { label: "Damaged Barcode", col: "#ef4444", icon: "warn" },
        { label: "Dirty / Stained", label2: "Barcode", col: "#f59e0b", icon: "warn" },
    ];

    const STEPS = [
        {
            num: "1",
            x: 60,
            title: "Open Camera",
            lines: ["Open the ScanFlow app on your", "tablet and allow camera access."],
        },
        {
            num: "2",
            x: 445,
            title: "Scan Barcode",
            lines: ["Point your tablet camera", "at the barcode on the product."],
        },
        {
            num: "3",
            x: 830,
            title: "Detect & Read",
            lines: [
                "ScanFlow automatically detects the barcode,",
                "works even if it's blurry, damaged or dirty,",
                "and reads the product information.",
            ],
        },
        {
            num: "4",
            x: 1525,
            title: "Continue Workflow",
            lines: [
                "The detected data is processed and",
                "added to your workflow. Keep scanning",
                "or move to the next step.",
            ],
        },
    ];

    function statusIcon(kind: string, cx: number, cy: number, col: string) {
        if (kind === "check") {
            return (
                <>
                    <circle cx={cx} cy={cy} r="13" fill={col} />
                    <path d={`M ${cx - 5} ${cy} L ${cx - 1} ${cy + 4} L ${cx + 6} ${cy - 5}`} stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
        }
        if (kind === "refresh") {
            return (
                <>
                    <circle cx={cx} cy={cy} r="13" fill={col} />
                    <path d={`M ${cx - 5} ${cy - 4} A 6 6 0 1 1 ${cx - 5} ${cy + 4}`} stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    <path d={`M ${cx - 7} ${cy - 6} L ${cx - 5} ${cy - 4} L ${cx - 2} ${cy - 6}`} stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
        }
        return (
            <>
                <circle cx={cx} cy={cy} r="13" fill={col} />
                <path d={`M ${cx} ${cy - 6} L ${cx} ${cy + 1}`} stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx={cx} cy={cy + 5} r="1.2" fill="white" />
            </>
        );
    }

    function barcodeChip(x: number, y: number, w: number, h: number, tone: string) {
        return (
            <g>
                <rect x={x} y={y} width={w} height={h} rx="6" fill={tone} />
                {[2, 1, 3, 1, 2, 1, 3, 1, 2].map((wd, i, arr) => {
                    const totalW = arr.reduce((s, v) => s + v * 2.2 + 1.6, 0);
                    const startX = x + w / 2 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 2.2 + 1.6, 0);
                    return <rect key={i} x={startX} y={y + h * 0.22} width={wd * 2.2} height={h * 0.56} fill="#1e293b" />;
                })}
            </g>
        );
    }

    return (
        <svg
            viewBox="15 100 1915 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient id="sfs-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#eef4fc" />
                    <stop offset="100%" stopColor="#e6effa" />
                </linearGradient>
                <linearGradient id="sfs-scanline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="50%" stopColor="#7dd3fc" stopOpacity="1" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <filter id="sfs-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#94a3b8" floodOpacity="0.28" />
                </filter>
                <filter id="sfs-blur" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="22" />
                </filter>
                <marker id="sfs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
                <style>{`
                    @keyframes sfsDashFlow {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -12; }
                    }
                    @keyframes sfsScanSweep {
                        0%, 100% { transform: translateY(-18px); opacity: 0.25; }
                        50% { transform: translateY(18px); opacity: 1; }
                    }
                    @keyframes sfsBracketPulse {
                        0%, 100% { opacity: 0.45; }
                        50% { opacity: 1; }
                    }
                    @keyframes sfsPulse {
                        0%, 100% { opacity: 0.45; }
                        50% { opacity: 1; }
                    }
                    @keyframes sfsFloat {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }
                    @keyframes sfsRaySpin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes sfsBlob {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 0.42; }
                    }
                    .sfs-dash-flow {
                        animation: sfsDashFlow 1.2s linear infinite;
                    }
                    .sfs-scan-sweep {
                        animation: sfsScanSweep 2.4s ease-in-out infinite;
                    }
                    .sfs-scan-sweep-b {
                        animation: sfsScanSweep 2.8s ease-in-out infinite 0.6s;
                    }
                    .sfs-bracket-pulse { animation: sfsBracketPulse 2.2s ease-in-out infinite; }
                    .sfs-pulse { animation: sfsPulse 2.4s ease-in-out infinite; }
                    .sfs-pulse-1 { animation: sfsPulse 2.4s ease-in-out infinite 0.3s; }
                    .sfs-pulse-2 { animation: sfsPulse 2.4s ease-in-out infinite 0.7s; }
                    .sfs-pulse-3 { animation: sfsPulse 2.4s ease-in-out infinite 1.1s; }
                    .sfs-pulse-4 { animation: sfsPulse 2.4s ease-in-out infinite 1.5s; }
                    .sfs-float { animation: sfsFloat 6s ease-in-out infinite; }
                    .sfs-float-1 { animation: sfsFloat 7s ease-in-out infinite 1.2s; }
                    .sfs-step-1 { animation-delay: 0s; }
                    .sfs-step-2 { animation-delay: 0.5s; }
                    .sfs-step-3 { animation-delay: 1s; }
                    .sfs-step-4 { animation-delay: 1.5s; }
                    .sfs-ray-spin {
                        transform-origin: 1825px 335px;
                        animation: sfsRaySpin 24s linear infinite;
                    }
                    .sfs-blob { animation: sfsBlob 5s ease-in-out infinite; }
                    .sfs-blob-1 { animation: sfsBlob 6s ease-in-out infinite 1s; }
                    @media (prefers-reduced-motion: reduce) {
                        .sfs-dash-flow, .sfs-scan-sweep, .sfs-scan-sweep-b, .sfs-bracket-pulse,
                        .sfs-pulse, .sfs-pulse-1, .sfs-pulse-2, .sfs-pulse-3, .sfs-pulse-4,
                        .sfs-float, .sfs-float-1, .sfs-ray-spin, .sfs-blob, .sfs-blob-1 { animation: none; }
                    }
                `}</style>
            </defs>

            {/* Soft blobs behind each step */}
            <circle cx="200" cy="320" r="200" fill="#c9d9ee" opacity="0.35" filter="url(#sfs-blur)" className="sfs-blob" />
            <circle cx="590" cy="320" r="200" fill="#c9d9ee" opacity="0.3" filter="url(#sfs-blur)" className="sfs-blob-1" />

            {/* Connector arrows */}
            <line x1="380" y1="335" x2="440" y2="335" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#sfs-arrow)" className="sfs-dash-flow" />
            <line x1="765" y1="335" x2="825" y2="335" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#sfs-arrow)" className="sfs-dash-flow" />
            <line x1="1445" y1="335" x2="1505" y2="335" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#sfs-arrow)" className="sfs-dash-flow" />

            {/* ── Step 1: worker with tablet ── */}
            <g>
                <path d="M 65 400 L 65 545 L 95 545 L 100 460 Z" fill="#1e2a44" />
                <path d="M 125 460 L 130 545 L 155 545 L 160 455 Z" fill="#16213a" />
                <path d="M 45 300 Q 40 260 75 240 L 165 240 Q 190 260 190 300 L 190 470 L 45 470 Z" fill="#3b82f6" />
                <path d="M 90 240 L 120 240 L 145 470 L 110 470 Z" fill="#bfdbfe" opacity="0.85" />
                <path d="M 40 265 Q 15 300 25 345" stroke="#3b82f6" strokeWidth="20" strokeLinecap="round" fill="none" />
                <path d="M 175 265 Q 220 280 245 300" stroke="#3b82f6" strokeWidth="22" strokeLinecap="round" fill="none" />
                <ellipse cx="252" cy="308" rx="15" ry="12" fill="#f2b389" />
                <rect x="100" y="200" width="20" height="24" fill="#f2b389" />
                <circle cx="113" cy="175" r="32" fill="#f2b389" />
                <path d="M 88 155 Q 92 122 128 120 Q 164 120 170 155 Z" fill="#2563eb" />
                <path d="M 145 150 Q 188 147 196 160 Q 188 168 145 163 Z" fill="#1d4ed8" />
            </g>
            <g filter="url(#sfs-shadow)">
                <rect x="228" y="248" width="132" height="180" rx="14" fill="#0f172a" transform="rotate(-4 294 338)" />
            </g>
            <g transform="rotate(-4 294 338)">
                <rect x="234" y="256" width="120" height="26" fill="#0b1220" />
                <rect x="234" y="282" width="120" height="130" fill="#1a2b4a" />
                <circle cx="294" cy="345" r="17" fill="#2563eb" />
                <rect x="285" y="337" width="18" height="14" rx="2" fill="white" />
                <circle cx="294" cy="344" r="4" fill="#2563eb" />
            </g>

            {/* ── Step 2: tablet scanning box ── */}
            <g filter="url(#sfs-shadow)">
                <rect x="462" y="215" width="258" height="325" rx="26" fill="#0f172a" />
                <rect x="478" y="240" width="226" height="230" rx="10" fill="#1a2b4a" />
            </g>
            <path d="M 525 305 L 660 300 L 660 405 L 525 405 Z" fill="#eec18e" opacity="0.9" />
            <path d="M 525 305 L 660 300 L 645 315 L 540 320 Z" fill="#f6d7ae" opacity="0.9" />
            <rect x="560" y="330" width="90" height="55" rx="4" fill="white" />
            {[2, 1, 3, 1, 2, 1, 3].map((w, i, arr) => {
                const totalW = arr.reduce((s, v) => s + v * 2 + 1.6, 0);
                const startX = 605 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 2 + 1.6, 0);
                return <rect key={i} x={startX} y="340" width={w * 2} height="35" fill="#1e293b" />;
            })}
            <rect x="500" y="350" width="200" height="8" fill="url(#sfs-scanline)" className="sfs-scan-sweep" />
            <g stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" fill="none" className="sfs-bracket-pulse">
                <path d="M 505 300 V 285 H 520" />
                <path d="M 660 285 H 675 V 300" />
                <path d="M 505 415 V 430 H 520" />
                <path d="M 675 415 V 430 H 660" />
            </g>
            <line x1="478" y1="478" x2="704" y2="478" stroke="#334155" strokeWidth="1" />
            <circle cx="510" cy="500" r="12" fill="none" stroke="#94a3b8" strokeWidth="1.6" />
            <circle cx="591" cy="502" r="18" fill="white" />
            <circle cx="672" cy="500" r="12" fill="none" stroke="#94a3b8" strokeWidth="1.6" />

            {/* ── Step 3: condition list + detail tablet ── */}
            {CONDITIONS.map((c, i) => {
                const y = 220 + i * 78;
                return (
                    <g key={c.label}>
                        <rect x="830" y={y} width="278" height="66" rx="10" fill="white" filter="url(#sfs-shadow)" />
                        {barcodeChip(842, y + 11, 88, 44, c.col === "#7c3aed" ? "#f1ecfb" : "#f1f5f9")}
                        <text x="945" y={c.label2 ? y + 28 : y + 38} fontFamily="'DM Sans',sans-serif" fontSize="13" fontWeight="700" fill="#1e293b">
                            {c.label}
                        </text>
                        {c.label2 && (
                            <text x="945" y={y + 46} fontFamily="'DM Sans',sans-serif" fontSize="13" fontWeight="700" fill="#1e293b">
                                {c.label2}
                            </text>
                        )}
                        {statusIcon(c.icon, 1082, y + 33, c.col)}
                    </g>
                );
            })}

            <g filter="url(#sfs-shadow)">
                <rect x="1130" y="150" width="255" height="360" rx="26" fill="#0f172a" />
                <rect x="1146" y="176" width="223" height="150" rx="8" fill="#1a2b4a" />
            </g>
            <text x="1160" y="196" fontFamily="'DM Sans',sans-serif" fontSize="13" fill="white">←</text>
            <path d="M 1200 220 L 1300 216 L 1300 300 L 1200 300 Z" fill="#334155" opacity="0.6" />
            <rect x="1205" y="235" width="90" height="52" rx="4" fill="white" />
            {[2, 1, 3, 1, 2, 1, 3].map((w, i, arr) => {
                const totalW = arr.reduce((s, v) => s + v * 2 + 1.6, 0);
                const startX = 1250 - totalW / 2 + arr.slice(0, i).reduce((s, v) => s + v * 2 + 1.6, 0);
                return <rect key={i} x={startX} y="245" width={w * 2} height="32" fill="#1e293b" />;
            })}
            <rect x="1155" y="258" width="205" height="6" fill="url(#sfs-scanline)" className="sfs-scan-sweep-b" />
            <rect x="1146" y="330" width="223" height="182" rx="12" fill="white" />
            <circle cx="1167" cy="349" r="10" fill="#10b981" className="sfs-pulse" />
            <path d="M 1163 349 L 1166 352 L 1172 345" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="1183" y="353" fontFamily="'DM Sans',sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">Barcode Detected</text>
            <text x="1160" y="388" fontFamily="'DM Sans',sans-serif" fontSize="11" fill="#64748b">GTIN</text>
            <text x="1197" y="390" fontFamily="'DM Sans',sans-serif" fontSize="16" fontWeight="700" fill="#0f172a">123456789012</text>
            {[
                ["Blurred: No", 415],
                ["Damaged: No", 438],
                ["Dirty: No", 461],
                ["Product: Box", 484],
            ].map(([label, y]) => (
                <g key={label as string}>
                    <path d={`M 1158 ${Number(y) - 3} L 1162 ${Number(y) + 1} L 1170 ${Number(y) - 7}`} stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="1178" y={Number(y) + 2} fontFamily="'DM Sans',sans-serif" fontSize="12" fill="#334155">
                        {label}
                    </text>
                </g>
            ))}
            <rect x="1220" y="512" width="70" height="6" rx="3" fill="#334155" />

            {/* ── Step 4: sync loop + system card ── */}
            <g fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 6" className="sfs-dash-flow">
                <path d="M 1670 280 Q 1730 210 1820 280" markerEnd="url(#sfs-arrow)" />
                <path d="M 1830 320 Q 1830 380 1770 410" markerEnd="url(#sfs-arrow)" />
                <path d="M 1710 410 Q 1650 380 1650 320" markerEnd="url(#sfs-arrow)" />
            </g>
            <circle cx="1740" cy="240" r="30" fill="white" filter="url(#sfs-shadow)" />
            <path d="M 1725 250 q -12 -18 8 -20 q 3 -12 17 -6 q 12 -4 14 10 q 10 2 6 14 q -2 6 -10 6 h -28 q -10 0 -8 -6 z" fill="#3b82f6" className="sfs-float" />
            <circle cx="1650" cy="335" r="30" fill="white" filter="url(#sfs-shadow)" />
            <g fill="#2563eb" className="sfs-float-1">
                <ellipse cx="1650" cy="322" rx="12" ry="5" />
                <path d="M 1638 322 v 20 a 12 5 0 0 0 24 0 v -20" />
                <ellipse cx="1650" cy="335" rx="12" ry="5" fill="#1d4ed8" />
            </g>
            <circle cx="1740" cy="320" r="42" fill="#10b981" filter="url(#sfs-shadow)" className="sfs-pulse" />
            <path d="M 1723 326 L 1735 338 L 1760 310" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="1825" cy="335" r="30" fill="white" filter="url(#sfs-shadow)" />
            <g fill="none" stroke="#2563eb" strokeWidth="2.4" className="sfs-ray-spin">
                <circle cx="1825" cy="335" r="9" />
                <circle cx="1825" cy="335" r="3.4" fill="#2563eb" stroke="none" />
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <line
                            key={deg}
                            x1={1825 + Math.cos(rad) * 12}
                            y1={335 + Math.sin(rad) * 12}
                            x2={1825 + Math.cos(rad) * 17}
                            y2={335 + Math.sin(rad) * 17}
                        />
                    );
                })}
            </g>

            <rect x="1560" y="395" width="330" height="110" rx="16" fill="white" filter="url(#sfs-shadow)" />
            <circle cx="1605" cy="450" r="26" fill="#2563eb" />
            <g fill="white">
                <ellipse cx="1605" cy="438" rx="11" ry="4.5" />
                <path d="M 1594 438 v 16 a 11 4.5 0 0 0 22 0 v -16" />
            </g>
            <text x="1645" y="440" fontFamily="'DM Sans',sans-serif" fontSize="12" fill="#64748b">GTIN</text>
            <text x="1680" y="443" fontFamily="'DM Sans',sans-serif" fontSize="16" fontWeight="700" fill="#0f172a">123456789012</text>
            <rect x="1645" y="455" width="120" height="24" rx="12" fill="#10b981" className="sfs-pulse-2" />
            <text x="1657" y="471" fontFamily="'DM Sans',sans-serif" fontSize="10.5" fontWeight="700" fill="white">Added to System</text>

            {/* ── Bottom captions ── */}
            {STEPS.map((s, si) => (
                <g key={s.num}>
                    <circle cx={s.x + 25} cy="622" r="20" fill="#93c5fd" className={`sfs-pulse sfs-step-${si + 1}`} />
                    <text x={s.x + 25} y="628" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="21" fontWeight="700" fill="white">
                        {s.num}
                    </text>
                    <text x={s.x + 65} y="629" fontFamily="'DM Sans',sans-serif" fontSize="27" fontWeight="700" fill="#0f172a">
                        {s.title}
                    </text>
                    {s.lines.map((line, i) => (
                        <text
                            key={i}
                            x={s.x + 65}
                            y={666 + i * 24}
                            fontFamily="'DM Sans',sans-serif"
                            fontSize="21"
                            fill="#475569"
                        >
                            {line}
                        </text>
                    ))}
                </g>
            ))}
        </svg>
    );
};  