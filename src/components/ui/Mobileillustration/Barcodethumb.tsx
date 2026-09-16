// BarcodeThumb.tsx
// Small barcode illustration used inside each condition badge.
// One component, six visual variants driven by a single `variant` prop.

type Variant = 'blurry' | 'damaged' | 'tilted' | 'covered' | 'lowlight' | 'dirty';

const BARS = Array.from({ length: 22 }).map((_, i) => ({
    x: 4 + i * 4.2,
    w: i % 3 === 0 ? 2.4 : i % 2 === 0 ? 1.1 : 1.7,
}));

export default function BarcodeThumb({ variant }: { variant: Variant }) {
    const filterId = `thumb-${variant}`;
    const isDark = variant === 'lowlight';

    return (
        <svg viewBox="0 0 100 56" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {variant === 'blurry' && (
                    <filter id={filterId}>
                        <feGaussianBlur stdDeviation="1.6" />
                    </filter>
                )}
                {variant === 'dirty' && (
                    <filter id={filterId}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
                        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
                    </filter>
                )}
            </defs>

            <rect width="100" height="56" fill={isDark ? '#0c0c0c' : '#f2f0e9'} />

            <g
                filter={variant === 'blurry' ? `url(#${filterId})` : undefined}
                transform={variant === 'tilted' ? 'rotate(-16 50 28)' : undefined}
                opacity={isDark ? 0.55 : 1}
            >
                {BARS.map((b, i) => (
                    <rect key={i} x={b.x} y={8} width={b.w} height={40} fill={isDark ? '#9aa8a2' : '#1a1a1a'} />
                ))}
            </g>

            {variant === 'damaged' && (
                <g stroke="#f2f0e9" strokeWidth="2">
                    <path d="M20 8 L26 48" />
                    <path d="M55 8 L48 48" />
                    <path d="M70 8 L76 30 L68 48" fill="none" />
                </g>
            )}

            {variant === 'covered' && (
                <path d="M0 56 L0 30 Q50 10 100 30 L100 56 Z" fill="#1a1a1a" opacity="0.75" />
            )}

            {variant === 'dirty' && <rect width="100" height="56" filter={`url(#${filterId})`} opacity="0.5" />}

            {variant === 'lowlight' && (
                <path d="M86 12 A9 9 0 1 0 88 26 A7 7 0 0 1 86 12 Z" fill="#cbd5d1" opacity="0.9" />
            )}
        </svg>
    );
}