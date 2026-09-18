// WorkerIllustration.tsx
// High-polish warehouse operator illustration matching the exact art style of WarehouseIllustration.

export default function WorkerIllustration({
    scanning = false,
    armAngle = 0,
}: {
    scanning?: boolean;
    armAngle?: number;
}) {
    return (
        <svg viewBox="0 0 320 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="w-shirt" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="w-skin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F6C49E" />
                    <stop offset="100%" stopColor="#E5A67A" />
                </linearGradient>
                <linearGradient id="w-phone-screen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B132B" />
                    <stop offset="100%" stopColor="#1C2541" />
                </linearGradient>
            </defs>

            {/* ── Soft shadow on ground ── */}
            <ellipse cx="110" cy="385" rx="90" ry="12" fill="#13355A" opacity="0.1" />

            {/* ── Legs / Trousers ── */}
            <path d="M 50 310 L 45 385 L 85 385 L 95 320 Z" fill="#1E2A44" />
            <path d="M 98 320 L 115 385 L 155 385 L 140 310 Z" fill="#16213A" />

            {/* ── Torso (Shirt with natural curves) ── */}
            <path d="M 35 190 Q 30 155 65 140 L 145 140 Q 170 160 170 195 L 165 330 L 35 330 Z" fill="url(#w-shirt)" />

            {/* Hi-Vis Reflective Safety Stripe */}
            <path d="M 80 140 L 105 140 L 125 330 L 100 330 Z" fill="#BFDBFE" opacity="0.85" />
            <path d="M 40 250 L 165 250 L 163 268 L 38 268 Z" fill="#BFDBFE" opacity="0.85" />

            {/* ── Back arm resting ── */}
            <path d="M 50 170 Q 25 200 35 240" stroke="#2563EB" strokeWidth="22" strokeLinecap="round" fill="none" />

            {/* ── Neck & Head ── */}
            <rect x="85" y="105" width="22" height="25" rx="3" fill="url(#w-skin)" />
            <circle cx="95" cy="80" r="34" fill="url(#w-skin)" />

            {/* Cap & Visor */}
            <path d="M 62 60 Q 65 22 102 20 Q 138 20 142 60 Z" fill="#2563EB" />
            <path d="M 130 55 Q 165 52 172 65 Q 165 74 130 68 Z" fill="#1D4ED8" />
            <path d="M 64 62 Q 62 82 72 94" stroke="#1E2A44" strokeWidth="5" strokeLinecap="round" fill="none" />

            {/* ── Shoulder & Upper Arm ── */}
            <path d="M 155 170 Q 185 185 205 195" stroke="#3B82F6" strokeWidth="26" strokeLinecap="round" fill="none" />

            {/* ── Forearm + Hand + Phone (Rotating naturally at elbow 205, 195) ── */}
            <g
                transform={`rotate(${armAngle} 205 195)`}
                style={{ transition: 'transform 0.08s ease-out' }}
            >
                {/* Forearm reaching forward and up */}
                <path d="M 205 195 Q 235 195 258 175" stroke="#3B82F6" strokeWidth="22" strokeLinecap="round" fill="none" />

                {/* Hand gripping phone */}
                <ellipse cx="264" cy="168" rx="14" ry="12" fill="url(#w-skin)" />

                {/* Smartphone in hand */}
                <g transform="translate(252, 116) rotate(16)">
                    {/* Titanium Chassis */}
                    <rect x="0" y="0" width="44" height="84" rx="9" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />

                    {/* Phone Screen */}
                    <rect x="3" y="4" width="38" height="76" rx="6" fill="url(#w-phone-screen)" />

                    {/* Live Viewfinder on mini phone */}
                    <g transform="translate(6, 16)">
                        <rect x="0" y="0" width="30" height="30" rx="2" fill="#D97706" opacity="0.85" />
                        <rect x="4" y="5" width="22" height="20" rx="1" fill="#FFFFFF" />
                        {/* Barcode lines */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <rect key={i} x={6 + i * 2.4} y={7} width={1} height={14} fill="#111827" />
                        ))}
                        {/* Cyan reticle */}
                        <rect x="3" y="4" width="22" height="20" fill="none" stroke="#38BDF8" strokeWidth="1" />
                        <g stroke="white" strokeWidth="1.6" fill="none">
                            <rect x="0" y="50" width="5" height="2" rx="1" />
                            <circle cx="16" cy="50" r="3" fill="white" stroke="none" />
                            <path d="M 32 45 l -5 5 h 3 l -5 5" />
                        </g>
                    </g>

                    {/* Laser sweep animation on mini phone */}
                    {scanning && (
                        <line x1="4" y1="27" x2="36" y2="27" stroke="#38BDF8" strokeWidth="2">
                            <animate attributeName="y1" values="15;45;15" dur="1s" repeatCount="indefinite" />
                            <animate attributeName="y2" values="15;45;15" dur="1s" repeatCount="indefinite" />
                        </line>

                    )}
                </g>


                {/* Thumb in front of phone */}
                <path d="M 242 190 Q 246 180 254 184 Q 258 192 250 198 Z" fill="url(#w-skin)" />
            </g>
        </svg>
    );
}