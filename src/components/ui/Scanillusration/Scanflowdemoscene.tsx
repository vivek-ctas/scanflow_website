// ScanFlowDemoScene.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import ProductBox from './Productbox';
import WorkerIllustration from './Workerillustration';
import ScanFlowDemoPhone from './Scanflowdemophone';
import styles from './Scanflowdemoscene.module.css';

type PhoneState = 'idle' | 'scanning' | 'result';

// Drag bounds for cardboard box
const BOUNDS = { minX: -65, maxX: 65, minY: -40, maxY: 40 };
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function ScanFlowDemoScene() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [boxDrag, setBoxDrag] = useState({ x: 0, y: 0 });
    const [ambientOffset, setAmbientOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const dragState = useRef<{ startX: number; startY: number; origin: { x: number; y: number } }>({
        startX: 0,
        startY: 0,
        origin: { x: 0, y: 0 },
    });

    const [phoneState, setPhoneState] = useState<PhoneState>('result');
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const userTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Continuous gentle floating movement for the box in its designated area
    useEffect(() => {
        let animationFrameId: number;
        const startTime = Date.now();

        const animateIdle = () => {
            if (!isDragging) {
                const elapsed = (Date.now() - startTime) / 1000;
                // Gentle floating orbit (X: ±5px, Y: ±4px)
                setAmbientOffset({
                    x: Math.sin(elapsed * 1.2) * 5,
                    y: Math.cos(elapsed * 1.5) * 4,
                });
            }
            animationFrameId = requestAnimationFrame(animateIdle);
        };

        animationFrameId = requestAnimationFrame(animateIdle);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isDragging]);

    // Total box position = User drag offset + ambient idle motion
    const currentBoxPos = {
        x: isDragging ? boxDrag.x : boxDrag.x + ambientOffset.x,
        y: isDragging ? boxDrag.y : boxDrag.y + ambientOffset.y,
    };

    // Natural arm tracking angle for worker
    const armAngle = clamp(currentBoxPos.x * 0.14 - currentBoxPos.y * 0.1, -12, 12);

    // Continuous auto-scan demonstration cycle
    useEffect(() => {
        if (isUserInteracting) return;

        const cycleTimer = setInterval(() => {
            setPhoneState((prev) => (prev === 'result' ? 'scanning' : 'result'));
        }, 3400);

        return () => clearInterval(cycleTimer);
    }, [isUserInteracting]);

    const markUserActive = () => {
        setIsUserInteracting(true);
        if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
        userTimeoutRef.current = setTimeout(() => {
            setIsUserInteracting(false);
        }, 10000);
    };

    const onPointerDown = (e: React.PointerEvent) => {
        markUserActive();
        setIsDragging(true);
        dragState.current = {
            startX: e.clientX,
            startY: e.clientY,
            origin: boxDrag,
        };
        try {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        } catch { }
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - dragState.current.startX;
        const dy = e.clientY - dragState.current.startY;
        setBoxDrag({
            x: clamp(dragState.current.origin.x + dx, BOUNDS.minX, BOUNDS.maxX),
            y: clamp(dragState.current.origin.y + dy, BOUNDS.minY, BOUNDS.maxY),
        });
    };

    const onPointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        try {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch { }
    };

    const handleStartScan = () => {
        markUserActive();
        setPhoneState('scanning');
        setTimeout(() => setPhoneState('result'), 1100);
    };

    const handleReset = () => {
        markUserActive();
        setPhoneState('idle');
    };

    // Exact beam origin (from worker phone screen) and target (directly on cardboard barcode label)
    const beamOrigin = { x: 295, y: 350 };
    const beamTarget = {
        top: 418 + currentBoxPos.y,
        bottom: 480 + currentBoxPos.y,
        center: 450 + currentBoxPos.y,
        x: 350 + currentBoxPos.x,
    };

    return (
        <div ref={sceneRef} className={styles.sceneContainer}>
            {/* ── Background Warehouse Shelf & Boxes ── */}
            <div className={styles.warehouseBackground}>
                <div className={styles.shelfFrame}>
                    <div className={styles.shelfPillarLeft} />
                    <div className={styles.shelfPillarRight} />
                    <div className={styles.shelfLevel1} />
                    <div className={styles.shelfLevel2} />

                    {/* Top shelf boxes */}
                    <div className={styles.shelfBoxesRowTop}>
                        <div className={styles.bgBox1} />
                        <div className={styles.bgBox2} />
                        <div className={styles.bgBox3} />
                    </div>

                    {/* Bottom shelf boxes */}
                    <div className={styles.shelfBoxesRowBottom}>
                        <div className={styles.bgBox4} />
                        <div className={styles.bgBox5} />
                    </div>
                </div>
            </div>

            {/* ── Foreground Desk Surface ── */}
            <div className={styles.deskSurface}>
                <div className={styles.deskFrontEdge} />
            </div>

            {/* ── Potted Plant with Green Leaves on Desk ── */}
            <div className={styles.plantContainer}>
                <svg viewBox="0 0 100 130" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="40" cy="120" rx="35" ry="8" fill="#13355A" opacity="0.08" />

                    <path d="M20 90 Q12 105 22 120 Q40 126 58 120 Q68 105 60 90 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

                    <g fill="#10B981" stroke="#059669" strokeWidth="1.2">
                        <path d="M40 90 C25 70 10 40 28 18 C38 40 40 65 40 90 Z" />

                        <path d="M40 90 C55 70 70 40 52 18 C42 40 40 65 40 90 Z" />

                        <path d="M40 90 C35 60 40 30 40 10 C48 35 46 65 40 90 Z" />

                        <path d="M40 90 C20 80 0 65 4 45 C20 55 35 75 40 90 Z" />

                        <path d="M40 90 C60 80 80 65 76 45 C60 55 45 75 40 90 Z" />
                    </g>
                </svg>

            </div>

            {/* ── Left Side: Worker Operator Holding Phone ── */}
            <div className={styles.workerContainer}>
                <WorkerIllustration scanning={phoneState === 'scanning'} armAngle={armAngle} />
            </div>

            {/* ── Precise Dynamic Scan Light Cone connecting Phone Screen to Barcode Label ── */}
            <svg className={styles.beamOverlaySvg}>
                <defs>
                    <linearGradient id="scanBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity={phoneState === 'scanning' ? 0.9 : 0.5} />
                        <stop offset="60%" stopColor="#38BDF8" stopOpacity={phoneState === 'scanning' ? 0.4 : 0.18} />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
                    </linearGradient>
                    <filter id="beamLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Volumetric Scan Cone projecting precisely onto the barcode */}
                <polygon
                    points={`${beamOrigin.x},${beamOrigin.y - 14} ${beamOrigin.x},${beamOrigin.y + 14} ${beamTarget.x},${beamTarget.bottom} ${beamTarget.x},${beamTarget.top}`}
                    fill="url(#scanBeamGrad)"
                    className={phoneState === 'scanning' ? styles.pulseBeam : ''}
                />

                {/* Laser scan line landed directly on barcode */}
                <line
                    x1={beamOrigin.x}
                    y1={beamOrigin.y}
                    x2={beamTarget.x}
                    y2={beamTarget.center}
                    stroke="#38BDF8"
                    strokeWidth={phoneState === 'scanning' ? 3 : 1.5}
                    strokeDasharray={phoneState === 'scanning' ? 'none' : '4,4'}
                    filter="url(#beamLaserGlow)"
                    opacity={phoneState === 'scanning' ? 1 : 0.75}
                />
            </svg>

            {/* ── Draggable Cardboard Product Box with Smooth Continuous Floating ── */}
            <div
                className={styles.boxContainer}
                style={{
                    transform: `translate3d(${currentBoxPos.x}px, ${currentBoxPos.y}px, 0)`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                title="Drag to test scanner movement"
            >
                <ProductBox />
            </div>

            {/* ── Right Side: Large Phone Mockup ── */}
            <div className={styles.phoneContainer}>
                <ScanFlowDemoPhone
                    state={phoneState}
                    onStartScan={handleStartScan}
                    onReset={handleReset}
                    showThumb={!isUserInteracting}
                />
            </div>
        </div>
    );
}