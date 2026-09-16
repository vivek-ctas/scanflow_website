// ScanFlowBackMark.tsx
// Small emblem for the phone's back panel, matching the glowing "S" mark
// seen in the reference turntable render.

export default function ScanFlowBackMark() {
    return (
        <svg viewBox="0 0 300 640" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="backGlow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#12332a" />
                    <stop offset="100%" stopColor="#050f0c" />
                </radialGradient>
                <filter id="markGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <rect width="300" height="640" fill="url(#backGlow)" />
            <g transform="translate(150,320)" filter="url(#markGlow)">
                <circle r="34" fill="none" stroke="#17e08a" strokeWidth="2" opacity="0.6" />
                <text
                    x="0"
                    y="14"
                    textAnchor="middle"
                    fontFamily="Arial, Helvetica, sans-serif"
                    fontSize="40"
                    fontWeight="800"
                    fill="#17e08a"
                >
                    S
                </text>
            </g>
        </svg>
    );
}