// ScanFlowHero.tsx
'use client';

import dynamic from 'next/dynamic';
import { renderToStaticMarkup } from 'react-dom/server';
import ScanFlowScreen from './Scanflowscreen';
import ScanFlowBackMark from './Scanflowbackmark';
import ScanBadge from './Scanbadge';
import styles from './Scanflowhero.module.css';

const ScanFlowPhoneScene = dynamic(() => import('./Scanflowphonescene'), { ssr: false });

// Six badges placed evenly around a circle (60° apart) so the whole ring can
// orbit smoothly. Angles chosen to flank the phone left/right rather than
// land exactly top/bottom-center, matching the reference layout's spirit.
const BADGES = [
    { angle: -120, icon: 'check' as const, label: 'Blurry', variant: 'blurry' as const },
    { angle: -60, icon: 'chevron' as const, label: 'Damaged', variant: 'damaged' as const },
    { angle: 180, icon: 'diamond' as const, label: 'Tilted', variant: 'tilted' as const },
    { angle: 0, icon: 'lock' as const, label: 'Covered', variant: 'covered' as const },
    { angle: 120, icon: 'moon' as const, label: 'Low Light', variant: 'lowlight' as const },
    { angle: 60, icon: 'sparkle' as const, label: 'Dirty', variant: 'dirty' as const },
];

const STARS = [
    { top: '8%', left: '20%' }, { top: '15%', left: '78%' }, { top: '40%', left: '5%' },
    { top: '60%', left: '92%' }, { top: '85%', left: '30%' }, { top: '75%', left: '15%' },
    { top: '25%', left: '55%' }, { top: '90%', left: '70%' },
];

export default function ScanFlowHero() {
    const screenSvg = renderToStaticMarkup(<ScanFlowScreen />);
    const backSvg = renderToStaticMarkup(<ScanFlowBackMark />);

    return (
        <div className={styles.stage} style={{ ['--radius' as string]: '360px' }}>
            {/* radar rings + sweep */}
            <div className={styles.sweep} />
            {[180, 260, 340].map((r) => (
                <div key={r} className={styles.radarRing} style={{ width: r * 2, height: r * 2 }} />
            ))}
            {STARS.map((s, i) => (
                <div key={i} className={styles.star} style={{ top: s.top, left: s.left, animationDelay: `${i * 0.4}s` }} />
            ))}

            {/* orbiting badges + connector lines */}
            <div className={styles.orbitRing}>
                {BADGES.map((b) => (
                    <div key={b.label} className={styles.spoke} style={{ transform: `rotate(${b.angle}deg)` }}>
                        <div className={styles.spokeLine} />
                        <div className={styles.badgeAnchor}>
                            <div style={{ transform: `rotate(${-b.angle}deg)` }}>
                                <div className={styles.badgeCounter}>
                                    <ScanBadge icon={b.icon} label={b.label} variant={b.variant} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* center phone */}
            <div className={styles.phoneWrap}>
                <ScanFlowPhoneScene screenSvg={screenSvg} backSvg={backSvg} />
            </div>
        </div>
    );
}