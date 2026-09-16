'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * Rasterizes an SVG markup string onto a canvas and returns it as a
 * THREE.CanvasTexture. Lets you keep authoring phone-screen content as SVG
 * (or React components rendered to a string via renderToStaticMarkup) and
 * reuse it directly as a material map in React Three Fiber.
 *
 * Pass '' / undefined to skip — returns null until a real markup string
 * is provided, so it's safe to call unconditionally (Rules of Hooks).
 */
export function useSvgTexture(svgMarkup: string | undefined, width = 512, height = 1024) {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

    useEffect(() => {
        if (!svgMarkup) {
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();

        let cancelled = false;

        img.onload = () => {
            if (cancelled) return;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            const tex = new THREE.CanvasTexture(canvas);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = 4;
            tex.needsUpdate = true;
            setTexture(tex);
            URL.revokeObjectURL(url);
        };
        img.onerror = () => URL.revokeObjectURL(url);
        img.src = url;

        return () => {
            cancelled = true;
            URL.revokeObjectURL(url);
        };
    }, [svgMarkup, width, height]);

    return texture;
}