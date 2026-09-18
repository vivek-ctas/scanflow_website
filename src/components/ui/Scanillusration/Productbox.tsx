// ProductBox.tsx
// High-fidelity 3D Cardboard box with barcode label and cyan reticle matching reference design.

export default function ProductBox() {
    return (
        <svg viewBox="0 0 240 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="pb-top" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F9D7AC" />
                    <stop offset="100%" stopColor="#EBBE88" />
                </linearGradient>
                <linearGradient id="pb-front" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E9B983" />
                    <stop offset="100%" stopColor="#D49E64" />
                </linearGradient>
                <linearGradient id="pb-side" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DEAA72" />
                    <stop offset="100%" stopColor="#C48E52" />
                </linearGradient>
                <filter id="pb-cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Top face */}
            <polygon points="30,60 120,24 210,60 120,96" fill="url(#pb-top)" stroke="#C7945A" strokeWidth="1.2" />

            {/* Left face */}
            <polygon points="30,60 120,96 120,192 30,154" fill="url(#pb-side)" stroke="#B88347" strokeWidth="1.2" />

            {/* Front-Right face */}
            <polygon points="120,96 210,60 210,154 120,192" fill="url(#pb-front)" stroke="#C7945A" strokeWidth="1.2" />

            {/* Packaging Tape */}
            <polygon points="110,28 130,28 130,190 110,190" fill="#F8E3C5" opacity="0.65" />
            <polygon points="30,60 45,54 135,90 120,96" fill="#F8E3C5" opacity="0.4" />

            {/* Barcode Label on front face */}
            <g transform="translate(40, 100) rotate(2)">
                {/* White background card */}
                <rect x="0" y="0" width="66" height="42" rx="3" fill="#FFFFFF" stroke="#E2DEC9" strokeWidth="1" />

                {/* Barcode lines */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <rect
                        key={i}
                        x={4 + i * 3.8}
                        y={6}
                        width={i % 4 === 0 ? 2 : i % 2 === 0 ? 1 : 1.5}
                        height={23}
                        fill="#18181B"
                    />
                ))}

                {/* Digits under barcode */}
                <text x="33" y="37" textAnchor="middle" fontFamily="monospace" fontSize="6" fontWeight="700" fill="#27272A" letterSpacing="0.8">
                    123456789012
                </text>

                {/* Glowing Cyan Reticle Corners around Barcode */}
                <g stroke="#3C9AC4" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#pb-cyan-glow)">
                    <path d="M-3,5 L-3,-3 L5,-3" />
                    <path d="M61,-3 L69,-3 L69,5" />
                    <path d="M-3,37 L-3,45 L5,45" />
                    <path d="M61,45 L69,45 L69,37" />
                </g>
            </g>

            {/* Handling / Shipping icons */}
            <g stroke="#6E5033" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                {/* This way up */}
                <path d="M142 162 v12 M149 162 v12 M142 162 h8 M142 173 h8" />
                {/* Umbrella */}
                <path d="M160 167 a6 6 0 0 1 12 0" />
                <line x1="166" y1="161" x2="166" y2="167" stroke="#6E5033" />
                {/* Fragile Glass */}
                <path d="M181 153 h8 l-2 7 h-4 z" />
                <line x1="185" y1="160" x2="185" y2="165" />
            </g>
        </svg>
    );
}