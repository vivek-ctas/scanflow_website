// ScanFlowBackMark.tsx
// Emblem and back-panel glass finish for the 3D phone model.

export default function ScanFlowBackMark() {
    return (
        <svg viewBox="0 0 300 640" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="backGlow" cx="50%" cy="40%" r="70%">
                    <stop offset="0%" stopColor="#1B4A75" />
                    <stop offset="50%" stopColor="#13355A" />
                    <stop offset="100%" stopColor="#081423" />
                </radialGradient>
                <filter id="markGlow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Backplate Background */}
            <rect width="300" height="640" fill="url(#backGlow)" />

            {/* Subtle Metallic Geometric Pattern */}
            <g opacity="0.08" stroke="#3C9AC4" strokeWidth="1">
                <circle cx="150" cy="320" r="120" fill="none" strokeDasharray="6,6" />
                <circle cx="150" cy="320" r="80" fill="none" />
                <line x1="0" y1="160" x2="300" y2="480" />
                <line x1="300" y1="160" x2="0" y2="480" />
            </g>

            {/* Center Glowing Logo Mark */}
            <g transform="translate(150,340)">
                {/* Outer Glow Ring */}
                <circle r="42" fill="#0E2847" stroke="#3C9AC4" strokeWidth="2.5" filter="url(#markGlow)" opacity="0.8" />
                <circle r="32" fill="none" stroke="#6BC1E0" strokeWidth="1.5" strokeDasharray="4,3" />
                
                {/* Emblem text / S icon */}
                <text
                    x="0"
                    y="13"
                    textAnchor="middle"
                    fontFamily="system-ui, sans-serif"
                    fontSize="38"
                    fontWeight="900"
                    fill="#6BC1E0"
                >
                    S
                </text>
            </g>

            {/* Bottom Brand Mark */}
            <text
                x="150"
                y="580"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize="11"
                fontWeight="800"
                letterSpacing="3"
                fill="#3C9AC4"
                opacity="0.85"
            >
                CTAS SCANFLOW
            </text>
        </svg>
    );
}