'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// ZfO 275ml Craft Soda Bottle — modeled from the real product photo:
//   • Tall & slender glass bottle (like a Breezer / craft soda bottle)
//   • Long tapering neck into a wide body, squared base
//   • Golden amber liquid inside
//   • Black label band with "ZfO" gold text + "The Art of fizz"
//   • Black crown cap
//   • Scroll drives: 360° rotation + liquid drain/refill
// ─────────────────────────────────────────────────────────────────────────────

export default function BottleGlass({ scrollProgress = 0, visible = true }) {
  const groupRef     = useRef();
  const liquidRef    = useRef();
  const liquidMatRef = useRef();

  // ── Real ZfO bottle profile ─────────────────────────────────────────────
  // Based strictly on the actual product photo: tall elegant bottle,
  // wide-ish body (not a beer bottle, not a fat breezer), long neck.
  const bottleGeo = useMemo(() => {
    const pts = [
      // Flat base
      new THREE.Vector2(0.000, 0.000),
      new THREE.Vector2(0.200, 0.010),
      new THREE.Vector2(0.320, 0.040),
      // Body — straight-ish sides, slightly wider at bottom
      new THREE.Vector2(0.360, 0.100),
      new THREE.Vector2(0.375, 0.220),
      new THREE.Vector2(0.380, 0.500),
      new THREE.Vector2(0.378, 0.850),
      new THREE.Vector2(0.375, 1.100),
      new THREE.Vector2(0.370, 1.250),
      // Shoulder — gradual taper up to neck
      new THREE.Vector2(0.350, 1.380),
      new THREE.Vector2(0.310, 1.480),
      new THREE.Vector2(0.250, 1.570),
      new THREE.Vector2(0.180, 1.630),
      // Neck — long and slender (classic craft soda)
      new THREE.Vector2(0.140, 1.680),
      new THREE.Vector2(0.130, 1.800),
      new THREE.Vector2(0.128, 1.950),
      new THREE.Vector2(0.130, 2.100),
      new THREE.Vector2(0.132, 2.220),
      // Crown lip
      new THREE.Vector2(0.148, 2.270),
      new THREE.Vector2(0.150, 2.300),
    ];
    return new THREE.LatheGeometry(pts, 26);
  }, []);

  // ── Liquid inside ────────────────────────────────────────────────────────
  const liquidGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.000, 0.012),
      new THREE.Vector2(0.190, 0.020),
      new THREE.Vector2(0.305, 0.050),
      new THREE.Vector2(0.342, 0.105),
      new THREE.Vector2(0.356, 0.230),
      new THREE.Vector2(0.360, 0.520),
      new THREE.Vector2(0.356, 0.880),
      new THREE.Vector2(0.352, 1.120),
      new THREE.Vector2(0.340, 1.260),
      new THREE.Vector2(0.290, 1.470),
      new THREE.Vector2(0.220, 1.555),
      new THREE.Vector2(0.162, 1.610),
      new THREE.Vector2(0.122, 1.660),
    ];
    return new THREE.LatheGeometry(pts, 22);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Full 360° rotation tied to scroll  
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2;

    // Liquid drains from full (scroll 0.45) to empty (scroll 0.90)
    if (liquidRef.current && liquidMatRef.current) {
      const fillT = Math.max(0, Math.min(1, (scrollProgress - 0.45) / 0.45));
      liquidRef.current.scale.y = Math.max(0.01, 1 - fillT * 0.98);
      liquidRef.current.position.y = 0; // anchored at base
      liquidMatRef.current.opacity = fillT > 0.97 ? 0 : 0.90;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={1.0} rotationIntensity={0.03} floatIntensity={0.12}>
      <group ref={groupRef} position={[0, -1.15, 0]}>

        {/* ── Glass bottle shell ──────────────────────────────────── */}
        <mesh geometry={bottleGeo}>
          <meshStandardMaterial
            color="#d8eeff"
            roughness={0.04}
            metalness={0.10}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ── Golden amber liquid (masala soda) ───────────────────── */}
        <mesh ref={liquidRef} geometry={liquidGeo}>
          <meshStandardMaterial
            ref={liquidMatRef}
            color="#c47a00"
            roughness={0.12}
            metalness={0.05}
            transparent
            opacity={0.90}
          />
        </mesh>

        {/* ── Black label band ─────────────────────────────────────── */}
        {/* Bottom of label at y=0.30, top at y=1.22 — covers body */}
        <mesh position={[0, 0.76, 0]}>
          <cylinderGeometry args={[0.382, 0.375, 0.95, 24, 1, true]} />
          <meshStandardMaterial
            color="#080808"
            roughness={0.6}
            transparent
            opacity={0.96}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Gold top border stripe on label */}
        <mesh position={[0, 1.24, 0]}>
          <cylinderGeometry args={[0.384, 0.384, 0.018, 24, 1, true]} />
          <meshStandardMaterial color="#c8960c" roughness={0.3} metalness={0.6} side={THREE.FrontSide} />
        </mesh>

        {/* Gold bottom border stripe on label */}
        <mesh position={[0, 0.285, 0]}>
          <cylinderGeometry args={[0.378, 0.378, 0.018, 24, 1, true]} />
          <meshStandardMaterial color="#c8960c" roughness={0.3} metalness={0.6} side={THREE.FrontSide} />
        </mesh>

        {/* ── "ZfO" gold text on label ─────────────────────────────── */}
        <Text
          position={[0, 0.72, 0.385]}
          fontSize={0.195}
          color="#f0c030"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          ZfO
        </Text>

        {/* "The Art of fizz" italic tagline */}
        <Text
          position={[0, 0.50, 0.384]}
          fontSize={0.062}
          color="#e8b020"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.02}
        >
          The Art of fizz
        </Text>

        {/* "CRAFTED MASALA SODA" top of label */}
        <Text
          position={[0, 1.15, 0.384]}
          fontSize={0.044}
          color="rgba(200,150,12,0.9)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.09}
        >
          CRAFTED MASALA SODA
        </Text>

        {/* ── Black crown cap ──────────────────────────────────────── */}
        <mesh position={[0, 2.315, 0]}>
          <cylinderGeometry args={[0.152, 0.162, 0.055, 18]} />
          <meshStandardMaterial color="#111" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Serrated crown ring */}
        <mesh position={[0, 2.29, 0]}>
          <torusGeometry args={[0.148, 0.018, 6, 18]} />
          <meshStandardMaterial color="#222" roughness={0.5} metalness={0.45} />
        </mesh>

        {/* ── Base glass thickening (kick-up detail) ───────────────── */}
        <mesh position={[0, 0.012, 0]}>
          <cylinderGeometry args={[0.195, 0.195, 0.022, 20]} />
          <meshStandardMaterial color="#aaccee" roughness={0.1} transparent opacity={0.5} />
        </mesh>

      </group>
    </Float>
  );
}
