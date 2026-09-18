// ScanFlowDemoPhone.tsx
// High-resolution CTAS Phone Mockup matching Mobileillustration design.

import ProductBox from './Productbox';
import styles from './Scanflowdemoscene.module.css';

type PhoneState = 'idle' | 'scanning' | 'result';

export default function ScanFlowDemoPhone({
    state,
    onStartScan,
    onReset,
    showThumb = true,
}: {
    state: PhoneState;
    onStartScan: () => void;
    onReset: () => void;
    showThumb?: boolean;
}) {
    return (
        <div className={styles.phoneMock}>
            {/* Side Hardware Buttons */}
            <div className={styles.phoneSidePower} />
            <div className={styles.phoneSideVolUp} />
            <div className={styles.phoneSideVolDown} />

            {/* Phone Screen Container */}
            <div className={styles.phoneInnerScreen}>
                {/* Dynamic Island Notch */}
                <div className={styles.phoneNotch}>
                    <div className={styles.notchCam} />
                    <div className={styles.notchSensor} />
                </div>

                {/* Status Bar */}
                <div className={styles.phoneStatusRow}>
                    <span className={styles.statusTime}>9:41</span>
                    <div className={styles.statusIcons}>
                        <span className={styles.signalIcon}>●●●</span>
                        <span className={styles.wifiIcon}>▲</span>
                        <div className={styles.batteryPill}>
                            <div className={styles.batteryLevel} />
                        </div>
                    </div>
                </div>

                {/* CTAS ScanFlow App Header */}
                <div className={styles.phoneHeader}>
                    <div className={styles.brandTitle}>
                        <div className={styles.brandIcon}>
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#6BC1E0" strokeWidth="2.5">
                                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                            </svg>
                        </div>
                        <span className={styles.brandText}>CTAS <strong className={styles.brandAccent}>ScanFlow</strong></span>
                    </div>
                    <div className={styles.fpsBadge}>
                        <span className={styles.fpsDot} />
                        <span>60 FPS</span>
                    </div>
                </div>

                {/* Live Camera Viewfinder Card */}
                <div className={styles.viewfinderCard}>
                    <div className={styles.viewfinderFeed}>
                        {/* Background camera feed box */}
                        <div className={styles.viewfinderBoxWrapper}>
                            <ProductBox />
                        </div>

                        {/* Glowing Cyan Target Frame Reticle */}
                        <div className={styles.reticleFrame}>
                            <div className={`${styles.corner} ${styles.cTL}`} />
                            <div className={`${styles.corner} ${styles.cTR}`} />
                            <div className={`${styles.corner} ${styles.cBL}`} />
                            <div className={`${styles.corner} ${styles.cBR}`} />

                            {/* Barcode specific target highlight box */}
                            <div className={styles.barcodeHighlightBox}>
                                <div className={`${styles.innerCorner} ${styles.iTL}`} />
                                <div className={`${styles.innerCorner} ${styles.iTR}`} />
                                <div className={`${styles.innerCorner} ${styles.iBL}`} />
                                <div className={`${styles.innerCorner} ${styles.iBR}`} />
                            </div>
                        </div>

                        {/* Active Laser Sweep */}
                        <div className={`${styles.scanSweep} ${state === 'scanning' ? styles.sweepActive : ''}`} />
                    </div>
                </div>

                {/* Clean Result Card Overlay */}
                <div className={styles.resultCard}>
                    {/* Status Badge & Title */}
                    <div className={styles.resultHead}>
                        <div className={styles.resultCheck}>✓</div>
                        <span className={styles.resultTitle}>Barcode Detected</span>
                    </div>

                    {/* GTIN Number */}
                    <div className={styles.gtinRow}>
                        <span className={styles.gtinLabel}>GTIN</span>
                        <strong className={styles.gtinValue}>123456789012</strong>
                    </div>

                    {/* Clean 3 metadata lines (Product, Status, Type) */}
                    <div className={styles.detailsList}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Product</span>
                            <span className={styles.detailColon}>:</span>
                            <span className={styles.detailValue}>Wireless Headphones</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Status</span>
                            <span className={styles.detailColon}>:</span>
                            <span className={styles.detailStatusValid}>Valid</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Type</span>
                            <span className={styles.detailColon}>:</span>
                            <span className={styles.detailValue}>Standard</span>
                        </div>
                    </div>

                    {/* Action CTA Button */}
                    <div className={styles.actionBtnWrapper}>
                        <button
                            className={styles.actionBtn}
                            onClick={state === 'result' ? onReset : onStartScan}
                            disabled={state === 'scanning'}
                        >
                            <span>{state === 'result' ? 'Scan Next Item' : state === 'scanning' ? 'Processing...' : 'Continue →'}</span>
                        </button>

                        {/* Animated Tap Hand Pointer Cursor (Matching Reference Image) */}
                        {showThumb && state !== 'scanning' && (
                            <div className={styles.thumbPointer}>
                                <svg viewBox="0 0 60 60" width="46" height="46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <filter id="handClickShadow" x="-30%" y="-30%" width="160%" height="160%">
                                            <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0F172A" floodOpacity="0.25" />
                                        </filter>
                                    </defs>
                                    <g filter="url(#handClickShadow)">
                                        {/* Click Sparkle Rays radiating from index fingertip */}
                                        <g stroke="#13355A" strokeWidth="2.4" strokeLinecap="round" className={styles.clickRays}>
                                            <line x1="24" y1="10" x2="24" y2="4" />
                                            <line x1="16" y1="12" x2="11" y2="8" />
                                            <line x1="12" y1="20" x2="6" y2="21" />
                                            <line x1="32" y1="12" x2="37" y2="8" />
                                            <line x1="36" y1="20" x2="42" y2="21" />
                                        </g>

                                        {/* White Hand Pointer with Black/Navy Outline */}
                                        <path
                                            d="M 24 16
                                               C 21.5 16, 20 18, 20 21
                                               L 20 33
                                               L 18.5 32
                                               C 16.5 30, 13.5 30.5, 12.5 33
                                               C 11.5 35.5, 12.5 38.5, 15.5 41
                                               L 23 48
                                               C 26 51, 30 53, 35 53
                                               L 41 53
                                               C 47 53, 50 49, 50 43
                                               L 50 35
                                               C 50 32.5, 48 31, 46 31
                                               C 44.5 31, 43.5 31.8, 43 32.8
                                               C 42.5 30.8, 40.5 29.5, 38.5 29.5
                                               C 37 29.5, 36 30.2, 35.5 31.2
                                               C 34.8 29.5, 33 28.5, 31 28.5
                                               C 29.5 28.5, 28.5 29.2, 28 30.2
                                               L 28 21
                                               C 28 18, 26.5 16, 24 16
                                               Z"
                                            fill="#FFFFFF"
                                            stroke="#13355A"
                                            strokeWidth="2.8"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />

                                        {/* Finger Crease Dividers */}
                                        <g stroke="#13355A" strokeWidth="2.2" strokeLinecap="round">
                                            <line x1="35.5" y1="36" x2="35.5" y2="42" />
                                            <line x1="43" y1="38" x2="43" y2="44" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}