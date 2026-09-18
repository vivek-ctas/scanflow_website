// BarcodeLabel.tsx
// A clean barcode label used inside the phone viewfinder for crisp readability.

const BARS = Array.from({ length: 28 }).map((_, i) => ({
    x: 6 + i * 4.6,
    w: i % 4 === 0 ? 3 : i % 2 === 0 ? 1.6 : 2.2,
}));

export default function BarcodeLabel() {
    return (
        <svg viewBox="0 0 140 90" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="138" height="88" rx="6" fill="#ffffff" stroke="#d8d3c4" strokeWidth="1.5" />
            {BARS.map((b, i) => (
                <rect key={i} x={b.x} y={12} width={b.w} height={52} fill="#111111" />
            ))}
            <text x="70" y="78" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="1.5" fill="#111111">
                1 234567 890128
            </text>
        </svg>
    );
}
