'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// ─── ZfO 275ml Breezer-style Bottle ──────────────────────────────────────────
// Shape: wide stubby base, short shoulder, short neck — like Bacardi breezer
// Features:
//   - Scroll-driven 360° rotation
//   - Liquid fills/empties via clipping plane driven by scrollProgress
//   - ZfO text label rendered in 3D
//   - Crown cap & label band
// ─────────────────────────────────────────────────────────────────────────────

export default function BottleGlass({ scrollProgress = 0, visible = true }) {
  const groupRef  = useRef();
  const liquidRef = useRef();
  const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);

  // ── Breezer bottle profile (275ml breezer — wide & squat) ───────────────
  const bottleGeometry = useMemo(() => {
    const points = [
      // Flat base
      new THREE.Vector2(0.00, 0.00),
      new THREE.Vector2(0.35, 0.02),
      new THREE.Vector2(0.52, 0.10),  // wide curve at bottom
      // Body — noticeably wide (breezer bottles are chubby)
      new THREE.Vector2(0.56, 0.22),
      new THREE.Vector2(0.58, 0.40),
      new THREE.Vector2(0.58, 0.75),
      new THREE.Vector2(0.57, 1.00),
      new THREE.Vector2(0.56, 1.20),
      // Shoulder — quick taper
      new THREE.Vector2(0.52, 1.35),
      new THREE.Vector2(0.42, 1.48),
      new THREE.Vector2(0.30, 1.56),
      // Neck — short and thick
      new THREE.Vector2(0.22, 1.60),
      new THREE.Vector2(0.21, 1.78),
      new THREE.Vector2(0.22, 1.85),
      // Crown lip
      new THREE.Vector2(0.24, 1.90),
      new THREE.Vector2(0.24, 1.94),
    ];
    return new THREE.LatheGeometry(points, 24);
  }, []);

  // ── Liquid inside bottle ─────────────────────────────────────────────────
  const liquidGeometry = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.00, 0.02),
      new THREE.Vector2(0.34, 0.04),
      new THREE.Vector2(0.50, 0.12),
      new THREE.Vector2(0.54, 0.23),
      new THREE.Vector2(0.55, 0.40),
      new THREE.Vector2(0.55, 0.78),
      new THREE.Vector2(0.54, 1.00),
      new THREE.Vector2(0.53, 1.18),
      new THREE.Vector2(0.42, 1.34),
      new THREE.Vector2(0.30, 1.45),
      new THREE.Vector2(0.20, 1.55),
    ];
    return new THREE.LatheGeometry(pts, 20);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Full 360° rotation driven by scroll progress (0→1 = 0→2π)
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2;

    // Liquid fill: when scrollProgress 0.45→0.9, liquid drains from full to empty
    // Clipping plane Y controls the liquid top surface
    // liquid geometry top is at y≈1.55 (in local space), base at y=0.02
    const fillMin  = 0.45; // scroll pos where bottle appears
    const fillMax  = 0.88; // scroll pos where bottle is empty
    const fillT    = Math.max(0, Math.min(1, (scrollProgress - fillMin) / (fillMax - fillMin)));

    // Local top of liquid (before group offset)
    // Goes from 1.58 (full) down to 0.0 (empty) as fillT goes 0→1
    const liquidTop = 1.58 * (1 - fillT);
    // Clipping plane sits at liquidTop in group local space (group offset is applied via world matrix)
    // Three.js clips in WORLD space, so we need to account for our group's Y offset (-1.1)
    clipPlane.constant = liquidTop - 1.1;

    if (liquidRef.current) {
      liquidRef.current.material.opacity = fillT < 0.98 ? 0.85 : 0;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.12}>
      <group ref={groupRef} position={[0, -1.1, 0]}>

        {/* ── Glass bottle shell ─────────────────────────────────── */}
        <mesh geometry={bottleGeometry}>
          <meshStandardMaterial
            color="#d4eeFF"
            roughness={0.03}
            metalness={0.12}
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ── Liquid (masala amber soda) ─────────────────────────── */}
        {/* Clipping plane cuts liquid at its current fill level */}
        <mesh ref={liquidRef} geometry={liquidGeometry}>
          <meshStandardMaterial
            color="#c44a00"
            roughness={0.15}
            metalness={0}
            transparent
            opacity={0.85}
            clippingPlanes={[clipPlane]}
            clipShadows={false}
          />
        </mesh>

        {/* ── Label band (dark band in bottle midsection) ──────── */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.565, 0.565, 0.7, 22, 1, true]} />
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.7}
            transparent
            opacity={0.94}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* ── "ZfO" text on label ────────────────────────────────── */}
        <Text
          position={[0, 0.76, 0.57]}
          fontSize={0.16}
          color="#ffcc00"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
          font="/fonts/inter-black.woff"
        >
          ZfO
        </Text>

        {/* Subtitle on label */}
        <Text
          position={[0, 0.58, 0.565]}
          fontSize={0.055}
          color="rgba(255,255,255,0.7)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          MASALA SODA
        </Text>

        {/* ── Crown cap (metal bottle cap) ──────────────────────── */}
        {/* Cap top disc */}
        <mesh position={[0, 1.96, 0]}>
          <cylinderGeometry args={[0.245, 0.26, 0.04, 18]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Crown ridges ring */}
        <mesh position={[0, 1.94, 0]}>
          <torusGeometry args={[0.23, 0.025, 6, 18]} />
          <meshStandardMaterial color="#333" roughness={0.5} metalness={0.4} />
        </mesh>

        {/* ── Bottle base kick-up (glass base detail) ───────────── */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.02, 20]} />
          <meshStandardMaterial color="#88bbdd" roughness={0.1} transparent opacity={0.5} />
        </mesh>

      </group>
    </Float>
  );
}
