// ScanFlowScreen.tsx
// High-resolution CTAS ScanFlow App Screen UI with bright camera preview & brand color accents.

export default function ScanFlowScreen() {
    return (
        <svg
            viewBox="0 0 300 640"
            xmlns="http://www.w3.org/2000/svg"
            fontFamily="system-ui, -apple-system, sans-serif"
        >
            <defs>
                {/* Gradients */}
                <linearGradient id="scanBeamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3C9AC4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#6BC1E0" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#3C9AC4" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#13355A" />
                    <stop offset="50%" stopColor="#1B4A75" />
                    <stop offset="100%" stopColor="#13355A" />
                </linearGradient>
                <linearGradient id="hudGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#13355A" stopOpacity="0.96" />
                    <stop offset="100%" stopColor="#0A1B2E" stopOpacity="0.98" />
                </linearGradient>
                <linearGradient id="bgScreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EBF4F9" />
                    <stop offset="40%" stopColor="#F4F8FA" />
                    <stop offset="100%" stopColor="#E2EEF5" />
                </linearGradient>
                <linearGradient id="laserGlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3C9AC4" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#6BC1E0" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3C9AC4" stopOpacity="0.1" />
                </linearGradient>
                
                {/* Filters */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#13355A" floodOpacity="0.15" />
                </filter>
            </defs>

            {/* Camera Viewfinder Screen Background */}
            <rect width="300" height="640" fill="url(#bgScreenGrad)" />

            {/* Subtle Brand Grid Stripes */}
            <g opacity="0.08" stroke="#13355A" strokeWidth="0.6">
                {Array.from({ length: 16 }).map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 40} x2="300" y2={i * 40} />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                    <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="640" />
                ))}
            </g>

            {/* Top Header App Bar (CTAS Navy Gradient) */}
            <rect x="0" y="0" width="300" height="88" fill="url(#headerGrad)" />

            {/* Dynamic Island / Top Notch */}
            <rect x="95" y="8" width="110" height="22" rx="11" fill="#071526" />
            <circle cx="116" cy="19" r="4" fill="#13355A" />
            <circle cx="184" cy="19" r="3" fill="#1B4A75" />

            {/* Status Bar */}
            <text x="24" y="24" fill="#FFFFFF" fontSize="12" fontWeight="700" letterSpacing="-0.3">9:41</text>
            <g transform="translate(232,14)" fill="#FFFFFF">
                <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
                <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
                <rect x="8" y="3" width="2.5" height="8" rx="0.5" />
                <rect x="12" y="1" width="2.5" height="10" rx="0.5" />
                <rect x="22" y="2" width="18" height="9" rx="2.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
                <rect x="24.5" y="4.5" width="12" height="4" rx="1" fill="#6BC1E0" />
            </g>

            {/* App Brand Header */}
            <g transform="translate(18, 48)">
                <rect x="0" y="0" width="30" height="30" rx="8" fill="#1B4A75" stroke="#3C9AC4" strokeWidth="1" />
                <path d="M16 7 L10 17 L15 17 L14 23 L20 13 L15 13 Z" fill="#6BC1E0" />
                <text x="38" y="20" fill="#FFFFFF" fontSize="17" fontWeight="800" letterSpacing="0.2">CTAS <tspan fill="#6BC1E0">ScanFlow</tspan></text>
                
                {/* Live FPS Badge */}
                <rect x="202" y="5" width="62" height="20" rx="10" fill="#0A1B2E" stroke="#3C9AC4" strokeWidth="1" />
                <circle cx="212" cy="15" r="3.5" fill="#6BC1E0">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <text x="220" y="19" fill="#6BC1E0" fontSize="9" fontWeight="800">60 FPS</text>
            </g>

            {/* Target Camera Reticle Corner Brackets (Vibrant Cyan #3C9AC4) */}
            <g stroke="#3C9AC4" strokeWidth="4" strokeLinecap="round" fill="none" filter="url(#glow)">
                <path d="M32 108 L32 130 M32 108 L54 108" />
                <path d="M268 108 L268 130 M268 108 L246 108" />
                <path d="M32 376 L32 354 M32 376 L54 376" />
                <path d="M268 376 L268 354 M268 376 L246 376" />
            </g>

            {/* Package Cargo Barcode Label (White Card with CTAS Navy Details) */}
            <g transform="translate(38, 122)" filter="url(#shadow)">
                <rect x="0" y="0" width="224" height="236" rx="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                
                {/* Label Header Bar */}
                <rect x="0" y="0" width="224" height="36" rx="14" fill="#13355A" />
                <rect x="0" y="20" width="224" height="16" fill="#13355A" />
                <text x="14" y="22" fill="#FFFFFF" fontSize="10" fontWeight="800" letterSpacing="0.5">CTAS LOGISTICS • EXPRESS</text>
                <rect x="165" y="9" width="46" height="18" rx="4" fill="#3C9AC4" />
                <text x="188" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800">PRIORITY</text>
                
                {/* Cargo Product Info */}
                <text x="14" y="54" fill="#64748B" fontSize="9" fontWeight="600">SHIPMENT TRACKING: #CTAS-9824</text>
                <text x="14" y="68" fill="#13355A" fontSize="11" fontWeight="800">ScanFlow AI Barcode Engine</text>

                {/* Barcode Inner Container */}
                <rect x="12" y="80" width="200" height="110" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                
                {/* High Contrast CTAS Navy Barcode Bars */}
                <g>
                    {Array.from({ length: 40 }).map((_, i) => {
                        const x = 20 + i * 4.4;
                        const w = i % 4 === 0 ? 3 : i % 2 === 0 ? 1.4 : 2;
                        return <rect key={i} x={x} y={92} width={w} height={66} fill="#13355A" />;
                    })}
                    <text x="112" y="177" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="2.5" fill="#13355A">
                        5 012345 678900
                    </text>
                </g>
                
                {/* Label Footer details */}
                <text x="14" y="212" fill="#64748B" fontSize="8" fontWeight="600">DEST: SAN FRANCISCO HUB • BAY 4</text>
                <text x="14" y="224" fill="#1B4A75" fontSize="8" fontWeight="800">STATUS: READY FOR DECODE</text>
            </g>

            {/* AI Barcode Bounding Detection Box (Cyan #3C9AC4) */}
            <rect x="48" y="196" width="204" height="98" rx="8" fill="none" stroke="#3C9AC4" strokeWidth="2.2" strokeDasharray="6,4" filter="url(#glow)" />
            <circle cx="48" cy="196" r="3.5" fill="#6BC1E0" />
            <circle cx="252" cy="196" r="3.5" fill="#6BC1E0" />
            <circle cx="48" cy="294" r="3.5" fill="#6BC1E0" />
            <circle cx="252" cy="294" r="3.5" fill="#6BC1E0" />
            
            {/* Detection Tag Badge */}
            <g transform="translate(150, 184)">
                <rect x="-48" y="0" width="96" height="18" rx="9" fill="#13355A" stroke="#3C9AC4" strokeWidth="1" />
                <text x="0" y="12" textAnchor="middle" fill="#6BC1E0" fontSize="8" fontWeight="800">✓ BARCODE DETECTED</text>
            </g>

            {/* Glowing Scan Laser Sweep Line */}
            <g filter="url(#glow)">
                <line x1="20" y1="245" x2="280" y2="245" stroke="url(#laserGlow)" strokeWidth="3.5" />
                <rect x="20" y="235" width="260" height="20" fill="url(#scanBeamGrad)" />
            </g>

            {/* Bottom Scanned Result Card (CTAS Navy Glassmorphism HUD) */}
            <g transform="translate(16, 396)" filter="url(#shadow)">
                <rect x="0" y="0" width="268" height="110" rx="16" fill="url(#hudGrad)" stroke="#3C9AC4" strokeWidth="1.5" />
                
                {/* Status Checkmark Icon */}
                <circle cx="36" cy="38" r="17" fill="#1B4A75" stroke="#6BC1E0" strokeWidth="2" />
                <path d="M28 38 L33 43 L44 32" stroke="#6BC1E0" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* Scanned Info Header */}
                <text x="62" y="28" fill="#94A3B8" fontSize="10" fontWeight="800" letterSpacing="0.8">SUCCESSFULLY DECODED</text>
                <rect x="178" y="15" width="76" height="20" rx="10" fill="#1B4A75" stroke="#3C9AC4" strokeWidth="0.8" />
                <text x="216" y="28" textAnchor="middle" fill="#6BC1E0" fontSize="9" fontWeight="800">⚡ 18 ms</text>

                {/* Decoded Value */}
                <text x="62" y="53" fill="#FFFFFF" fontSize="19" fontWeight="800" letterSpacing="1">5012345678900</text>
                
                {/* Format & Reliability Badges */}
                <g transform="translate(18, 72)">
                    <rect x="0" y="0" width="58" height="20" rx="5" fill="#0A1B2E" stroke="#1B4A75" strokeWidth="1" />
                    <text x="29" y="13" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontWeight="800">EAN-13</text>

                    <rect x="64" y="0" width="98" height="20" rx="5" fill="#0A1B2E" stroke="#1B4A75" strokeWidth="1" />
                    <text x="113" y="13" textAnchor="middle" fill="#3C9AC4" fontSize="9" fontWeight="800">99.8% Reliability</text>

                    <rect x="168" y="0" width="64" height="20" rx="5" fill="#3C9AC4" />
                    <text x="200" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">VERIFIED</text>
                </g>
            </g>

            {/* Bottom Controls Bar (CTAS Navy Footer) */}
            <rect x="0" y="532" width="300" height="108" fill="url(#headerGrad)" />
            <g transform="translate(0, 532)">
                {/* Flashlight Button */}
                <circle cx="60" cy="50" r="22" fill="#1B4A75" stroke="#3C9AC4" strokeWidth="1.2" />
                <path d="M62 38 L53 52 L59 52 L57 62 L67 47 L61 47 Z" fill="#6BC1E0" />

                {/* Shutter Button with Pulse Ring */}
                <circle cx="150" cy="50" r="32" fill="none" stroke="#3C9AC4" strokeWidth="2.5" opacity="0.6">
                    <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="50" r="28" fill="#13355A" stroke="#6BC1E0" strokeWidth="2.5" />
                <circle cx="150" cy="50" r="21" fill="#FFFFFF" />

                {/* History / Gallery Button */}
                <circle cx="240" cy="50" r="22" fill="#1B4A75" stroke="#3C9AC4" strokeWidth="1.2" />
                <rect x="228" y="40" width="24" height="20" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
                <circle cx="235" cy="46" r="2" fill="#FFFFFF" />
                <path d="M228 56 L236 48 L242 53 L252 43 L252 58 L228 58 Z" fill="#FFFFFF" />
            </g>
        </svg>
    );
}