// ScanFlowScreen.tsx
// Recreation of the ScanFlow app screen shown in the reference mockup.
// Pure SVG, no external assets — safe to rasterize via renderToStaticMarkup()
// and feed into useSvgTexture() for the 3D phone screen.

export default function ScanFlowScreen() {
    return (
        <svg
            viewBox="0 0 300 640"
            xmlns="http://www.w3.org/2000/svg"
            fontFamily="Arial, Helvetica, sans-serif"
        >
            <defs>
                <linearGradient id="scanLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#17e08a" stopOpacity="0" />
                    <stop offset="50%" stopColor="#17e08a" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#17e08a" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="bgGlow" cx="50%" cy="20%" r="70%">
                    <stop offset="0%" stopColor="#0b2b21" />
                    <stop offset="100%" stopColor="#04100c" />
                </radialGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background */}
            <rect width="300" height="640" fill="url(#bgGlow)" />

            {/* Status bar */}
            <text x="20" y="34" fill="#ffffff" fontSize="14" fontWeight="600">9:41</text>
            <g transform="translate(240,22)" fill="#ffffff">
                <path d="M0 10 L4 6 L8 10 L8 12 L0 12 Z" opacity="0.9" />
                <rect x="14" y="4" width="12" height="9" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                <rect x="15.5" y="5.5" width="7" height="6" fill="#ffffff" />
                <rect x="27" y="6" width="1.5" height="4" fill="#ffffff" />
            </g>

            {/* Header */}
            <text x="20" y="66" fill="#17e08a" fontSize="12" fontWeight="700">⚡</text>
            <text x="34" y="66" fill="#ffffff" fontSize="16" fontWeight="700">ScanFlow</text>
            <g transform="translate(258,58)" stroke="#8fa79e" strokeWidth="1.6" strokeLinecap="round">
                <line x1="0" y1="0" x2="16" y2="0" />
                <line x1="0" y1="5" x2="16" y2="5" />
                <line x1="0" y1="10" x2="16" y2="10" />
            </g>

            {/* Scan frame corners */}
            <g stroke="#17e08a" strokeWidth="5" strokeLinecap="round" fill="none">
                <path d="M28 100 L28 118 M28 100 L46 100" />
                <path d="M272 100 L272 118 M272 100 L254 100" />
                <path d="M28 380 L28 362 M28 380 L46 380" />
                <path d="M272 380 L272 362 M272 380 L254 380" />
            </g>

            {/* Torn paper with barcode */}
            <clipPath id="paperClip">
                <path d="M45 118 L235 118 L235 145 L255 165 L255 360 L45 360 Z" />
            </clipPath>
            <path
                d="M45 118 L235 118 L235 145 L255 165 L255 360 L45 360 Z"
                fill="#e9e5db"
            />
            <path d="M235 118 L235 145 L255 165 Z" fill="#c9c4b6" />
            {/* faint fold lines for texture */}
            <g stroke="#c9c4b6" strokeWidth="1" opacity="0.6" clipPath="url(#paperClip)">
                <line x1="45" y1="150" x2="255" y2="130" />
                <line x1="45" y1="220" x2="255" y2="205" />
                <line x1="90" y1="118" x2="60" y2="360" />
            </g>

            {/* Barcode bars */}
            <g clipPath="url(#paperClip)">
                {Array.from({ length: 42 }).map((_, i) => {
                    const x = 60 + i * 4.3;
                    const w = i % 3 === 0 ? 2.4 : i % 2 === 0 ? 1.2 : 1.8;
                    return <rect key={i} x={x} y={230} width={w} height={70} fill="#1a1a1a" />;
                })}
                <text x="150" y="322" textAnchor="middle" fontSize="13" letterSpacing="2" fill="#1a1a1a">
                    5 012345 678900
                </text>
            </g>

            {/* Scan line sweep */}
            <rect x="30" y="255" width="240" height="30" fill="url(#scanLine)" filter="url(#glow)" />

            {/* Decode result card */}
            <rect x="24" y="396" width="252" height="86" rx="14" fill="#0a1f18" stroke="#1c4a37" strokeWidth="1.5" />
            <circle cx="52" cy="426" r="12" fill="#0f3327" stroke="#17e08a" strokeWidth="1.5" />
            <path d="M46 426 L50 430 L58 421" stroke="#17e08a" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="72" y="418" fill="#8fa79e" fontSize="11">EAN-13</text>
            <text x="72" y="440" fill="#ffffff" fontSize="19" fontWeight="700">5012345678900</text>
            <text x="72" y="460" fill="#17e08a" fontSize="12">Successfully decoded</text>

            {/* Bottom controls */}
            <g>
                <circle cx="65" cy="558" r="24" fill="#0a1a15" stroke="#1c4a37" strokeWidth="1.5" />
                <path d="M67 546 L58 562 L64 562 L62 572 L72 555 L65 555 Z" fill="#8fa79e" />

                <circle cx="150" cy="558" r="30" fill="#0a1a15" stroke="#17e08a" strokeWidth="2.5" />
                <circle cx="150" cy="558" r="21" fill="#ffffff" />

                <circle cx="235" cy="558" r="24" fill="#0a1a15" stroke="#1c4a37" strokeWidth="1.5" />
                <rect x="223" y="548" width="24" height="20" rx="3" fill="none" stroke="#8fa79e" strokeWidth="1.6" />
                <circle cx="230" cy="554" r="2" fill="#8fa79e" />
                <path d="M223 566 L231 558 L237 563 L247 553 L247 568 L223 568 Z" fill="#8fa79e" />
            </g>
        </svg>
    );
}