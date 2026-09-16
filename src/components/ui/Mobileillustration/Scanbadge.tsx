import React from 'react';
import BarcodeThumb from './Barcodethumb';
import styles from './Scanflowhero.module.css';

type IconKind = 'check' | 'chevron' | 'diamond' | 'lock' | 'moon' | 'sparkle';

const ICONS: Record<IconKind, React.ReactNode> = {
    check: (
        <path d="M4 8.5 L7 11.5 L13 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
    chevron: <path d="M5 2 L11 8 L5 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
    diamond: <path d="M8 1 L15 8 L8 15 L1 8 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />,
    lock: (
        <>
            <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 7 V4.5 a3 3 0 0 1 6 0 V7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </>
    ),
    moon: <path d="M13 8.5 A6 6 0 1 1 7.5 2 A4.6 4.6 0 0 0 13 8.5 Z" fill="currentColor" />,
    sparkle: <path d="M8 1 L9.4 6.6 L15 8 L9.4 9.4 L8 15 L6.6 9.4 L1 8 L6.6 6.6 Z" fill="currentColor" />,
};

export default function ScanBadge({
    icon,
    label,
    variant,
}: {
    icon: IconKind;
    label: string;
    variant: 'blurry' | 'damaged' | 'tilted' | 'covered' | 'lowlight' | 'dirty';
}) {
    return (
        <div className={styles.badge}>
            <div className={styles.badgeHeader}>
                <svg width="16" height="16" viewBox="0 0 16 16" className={styles.badgeIcon}>
                    {ICONS[icon]}
                </svg>
                <span>{label}</span>
            </div>
            <div className={styles.badgeThumb}>
                <BarcodeThumb variant={variant} />
            </div>
        </div>
    );
}