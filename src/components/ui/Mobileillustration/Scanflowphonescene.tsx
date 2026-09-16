'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSvgTexture } from './Usesvgtexture';

// Tune this: radians/sec for the idle "showcase" spin. 0.12 ≈ one full
// rotation every ~52s — matches a slow, ambient turntable feel.
const AUTO_SPEED = 0.12;

type PhoneProps = {
    screenSvg: string; // renderToStaticMarkup(<YourScanFlowScreen />)
    backSvg?: string; // optional back-panel artwork (logo etc.)
};

function Phone({ screenSvg, backSvg }: PhoneProps) {
    const group = useRef<THREE.Group>(null!);
    const drag = useRef({ dragging: false, lastX: 0, momentum: 0 });
    const [hovering, setHovering] = useState(false);

    const screenTexture = useSvgTexture(screenSvg, 512, 1024);
    const backTexture = useSvgTexture(backSvg, 512, 1024);

    useFrame((state) => {
        if (!group.current) return;

        // momentum from a drag decays once released, auto-rotate keeps going underneath
        if (!drag.current.dragging) drag.current.momentum *= 0.94;

        const auto = state.clock.elapsedTime * AUTO_SPEED;
        const pointerNudge = hovering ? state.pointer.x * 0.35 : 0;
        const targetY = auto + pointerNudge + drag.current.momentum;
        group.current.rotation.y += (targetY - group.current.rotation.y) * 0.08;

        const targetX = hovering ? state.pointer.y * -0.12 : 0;
        group.current.rotation.x += (targetX - group.current.rotation.x) * 0.08;
    });

    const onPointerDown = (e: React.PointerEvent) => {
        drag.current.dragging = true;
        drag.current.lastX = e.clientX;
        (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (!drag.current.dragging) return;
        const dx = e.clientX - drag.current.lastX;
        drag.current.lastX = e.clientX;
        drag.current.momentum += dx * 0.008;
    };
    const endDrag = () => (drag.current.dragging = false);

    return (
        <group
            ref={group}
            onPointerOver={() => setHovering(true)}
            onPointerOut={() => setHovering(false)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
        >
            {/* Body */}
            <RoundedBox args={[1.4, 2.9, 0.16]} radius={0.13} smoothness={6}>
                <meshStandardMaterial color="#0c1a15" metalness={0.5} roughness={0.4} />
            </RoundedBox>

            {/* Screen (front) */}
            {screenTexture && (
                <mesh position={[0, 0, 0.081]}>
                    <planeGeometry args={[1.26, 2.7]} />
                    <meshBasicMaterial map={screenTexture} toneMapped={false} />
                </mesh>
            )}

            {/* Back panel artwork (optional) */}
            {backTexture && (
                <mesh position={[0, 0, -0.081]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[1.26, 2.7]} />
                    <meshBasicMaterial map={backTexture} toneMapped={false} />
                </mesh>
            )}

            {/* Camera bump */}
            <mesh position={[-0.42, 0.92, -0.09]}>
                <boxGeometry args={[0.5, 0.5, 0.04]} />
                <meshStandardMaterial color="#151515" metalness={0.6} roughness={0.35} />
            </mesh>
        </group>
    );
}

export default function ScanFlowPhoneScene({ screenSvg, backSvg }: PhoneProps) {
    return (
        <div style={{ width: '100%', height: '100%', touchAction: 'none', cursor: 'grab' }}>
            <Canvas camera={{ position: [0, 0, 6.2], fov: 30 }} dpr={[1, 2]}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 4, 5]} intensity={1.1} />
                <Suspense fallback={null}>
                    <Phone screenSvg={screenSvg} backSvg={backSvg} />
                    <Environment preset="city" />
                    <ContactShadows position={[0, -1.6, 0]} opacity={0.4} blur={2.5} far={3} />
                </Suspense>
            </Canvas>
        </div>
    );
}