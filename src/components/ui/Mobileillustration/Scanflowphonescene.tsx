'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSvgTexture } from './Usesvgtexture';

// Speed in rad/sec for continuous idle rotation
const AUTO_SPEED = 0.12;

type PhoneProps = {
    screenSvg: string;
    backSvg?: string;
};

function Phone({ screenSvg, backSvg }: PhoneProps) {
    const group = useRef<THREE.Group>(null!);
    const drag = useRef({ dragging: false, lastX: 0, velY: 0 });
    const [hovering, setHovering] = useState(false);

    const screenTexture = useSvgTexture(screenSvg, 768, 1536);
    const backTexture = useSvgTexture(backSvg, 768, 1536);

    useFrame((state, delta) => {
        if (!group.current) return;

        if (drag.current.dragging) {
            // While dragging, damp velocity
            drag.current.velY *= 0.8;
        } else {
            // Decay throw inertia smoothly after release
            drag.current.velY *= 0.92;
            // CONTINUOUSLY ROTATE FORWARD FROM EXACT DROPPED ANGLE! NEVER RESET!
            group.current.rotation.y += (AUTO_SPEED + drag.current.velY) * delta;
        }

        // Slight hover tilt pitch on X axis
        const targetX = hovering ? state.pointer.y * -0.15 : 0;
        group.current.rotation.x += (targetX - group.current.rotation.x) * 0.1;
    });

    const onPointerDown = (e: React.PointerEvent) => {
        drag.current.dragging = true;
        drag.current.lastX = e.clientX;
        drag.current.velY = 0;
        try {
            (e.target as Element).setPointerCapture?.(e.pointerId);
        } catch {}
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!drag.current.dragging || !group.current) return;
        const dx = e.clientX - drag.current.lastX;
        drag.current.lastX = e.clientX;

        // Directly rotate Y by mouse movement
        const deltaRotY = dx * 0.008;
        group.current.rotation.y += deltaRotY;
        drag.current.velY = deltaRotY / 0.016;
    };

    const endDrag = (e: React.PointerEvent) => {
        if (drag.current.dragging) {
            drag.current.dragging = false;
            try {
                (e.target as Element).releasePointerCapture?.(e.pointerId);
            } catch {}
        }
    };

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
            {/* Metallic Titanium Phone Body (Proportioned to fit without vertical clipping) */}
            <RoundedBox args={[1.22, 2.48, 0.14]} radius={0.12} smoothness={8}>
                <meshStandardMaterial color="#13355A" metalness={0.85} roughness={0.2} />
            </RoundedBox>

            {/* Inner Dark Bezel Frame */}
            <mesh position={[0, 0, 0.071]}>
                <planeGeometry args={[1.12, 2.36]} />
                <meshStandardMaterial color="#3C9AC4" metalness={0.9} roughness={0.15} />
            </mesh>

            {/* Screen (front) */}
            {screenTexture && (
                <mesh position={[0, 0, 0.074]}>
                    <planeGeometry args={[1.08, 2.32]} />
                    <meshBasicMaterial map={screenTexture} toneMapped={false} />
                </mesh>
            )}

            {/* Back panel artwork */}
            {backTexture && (
                <mesh position={[0, 0, -0.074]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[1.08, 2.32]} />
                    <meshBasicMaterial map={backTexture} toneMapped={false} />
                </mesh>
            )}

            {/* Side Power Button (Right Side) */}
            <mesh position={[0.615, 0.3, 0]}>
                <boxGeometry args={[0.02, 0.24, 0.04]} />
                <meshStandardMaterial color="#3C9AC4" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Side Volume Buttons (Left Side) */}
            <mesh position={[-0.615, 0.4, 0]}>
                <boxGeometry args={[0.02, 0.18, 0.04]} />
                <meshStandardMaterial color="#3C9AC4" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[-0.615, 0.18, 0]}>
                <boxGeometry args={[0.02, 0.18, 0.04]} />
                <meshStandardMaterial color="#3C9AC4" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Pro Camera Bump Island */}
            <mesh position={[0.32, 0.74, -0.082]}>
                <boxGeometry args={[0.46, 0.46, 0.035]} />
                <meshStandardMaterial color="#0A1B2E" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Triple Lens Cameras */}
            {/* Lens 1 (Top Inner) */}
            <mesh position={[0.23, 0.84, -0.10]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.075, 0.075, 0.018, 24]} />
                <meshStandardMaterial color="#3C9AC4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.23, 0.84, -0.11]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.055, 0.055, 0.01, 24]} />
                <meshStandardMaterial color="#050B14" metalness={0.3} roughness={0.05} />
            </mesh>

            {/* Lens 2 (Top Outer) */}
            <mesh position={[0.41, 0.84, -0.10]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.075, 0.075, 0.018, 24]} />
                <meshStandardMaterial color="#3C9AC4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.41, 0.84, -0.11]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.055, 0.055, 0.01, 24]} />
                <meshStandardMaterial color="#050B14" metalness={0.3} roughness={0.05} />
            </mesh>

            {/* Lens 3 (Bottom Center) */}
            <mesh position={[0.32, 0.65, -0.10]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.075, 0.075, 0.018, 24]} />
                <meshStandardMaterial color="#3C9AC4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.32, 0.65, -0.11]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.055, 0.055, 0.01, 24]} />
                <meshStandardMaterial color="#050B14" metalness={0.3} roughness={0.05} />
            </mesh>
        </group>
    );
}

export default function ScanFlowPhoneScene({ screenSvg, backSvg }: PhoneProps) {
    return (
        <div style={{ width: '100%', height: '100%', touchAction: 'none', cursor: 'grab' }}>
            <Canvas camera={{ position: [0, 0, 4.8], fov: 32 }} dpr={[1, 2]}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[4, 5, 5]} intensity={1.3} />
                <directionalLight position={[-3, -2, -4]} intensity={0.5} />
                <Suspense fallback={null}>
                    <Phone screenSvg={screenSvg} backSvg={backSvg} />
                    <Environment preset="city" />
                    <ContactShadows position={[0, -1.4, 0]} opacity={0.45} blur={2.5} far={3} />
                </Suspense>
            </Canvas>
        </div>
    );
}