'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// ZfO 275ml Craft Soda Bottle — upgraded with premium materials:
//   • MeshPhysicalMaterial grass with transmission + IOR for real refraction
//   • Emissive warm amber liquid that glows from within
//   • Bright metallic gold label stripes
//   • Shinier crown cap with gold rim accent
// ─────────────────────────────────────────────────────────────────────────────

export default function BottleGlass({ scrollProgress = 0, visible = true }) {
  const groupRef     = useRef();
  const liquidRef    = useRef();
  const liquidMatRef = useRef();

  // ── Real ZfO bottle profile ─────────────────────────────────────────────
  const bottleGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.000, 0.000),
      new THREE.Vector2(0.200, 0.010),
      new THREE.Vector2(0.320, 0.040),
      new THREE.Vector2(0.360, 0.100),
      new THREE.Vector2(0.375, 0.220),
      new THREE.Vector2(0.380, 0.500),
      new THREE.Vector2(0.378, 0.850),
      new THREE.Vector2(0.375, 1.100),
      new THREE.Vector2(0.370, 1.250),
      new THREE.Vector2(0.350, 1.380),
      new THREE.Vector2(0.310, 1.480),
      new THREE.Vector2(0.250, 1.570),
      new THREE.Vector2(0.180, 1.630),
      new THREE.Vector2(0.140, 1.680),
      new THREE.Vector2(0.130, 1.800),
      new THREE.Vector2(0.128, 1.950),
      new THREE.Vector2(0.130, 2.100),
      new THREE.Vector2(0.132, 2.220),
      new THREE.Vector2(0.148, 2.270),
      new THREE.Vector2(0.150, 2.300),
    ];
    return new THREE.LatheGeometry(pts, 32);
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
    return new THREE.LatheGeometry(pts, 26);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Full 360° rotation tied to scroll
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2;

    // Liquid drains from full (scroll 0.45) to empty (scroll 0.90)
    if (liquidRef.current && liquidMatRef.current) {
      const fillT = Math.max(0, Math.min(1, (scrollProgress - 0.45) / 0.45));
      liquidRef.current.scale.y = Math.max(0.01, 1 - fillT * 0.98);
      liquidRef.current.position.y = 0;
      liquidMatRef.current.opacity = fillT > 0.97 ? 0 : 0.92;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={1.0} rotationIntensity={0.03} floatIntensity={0.14}>
      <group ref={groupRef} position={[0, -1.15, 0]}>

        {/* ── Glass bottle shell — MeshPhysicalMaterial for real refraction */}
        <mesh geometry={bottleGeo}>
          <meshPhysicalMaterial
            color="#c8e8ff"
            roughness={0.02}
            metalness={0.0}
            transmission={0.90}
            thickness={0.4}
            ior={1.52}
            reflectivity={0.55}
            transparent
            opacity={0.88}
            side={THREE.DoubleSide}
            envMapIntensity={1.8}
          />
        </mesh>

        {/* ── Glowing warm amber liquid (masala soda) */}
        <mesh ref={liquidRef} geometry={liquidGeo}>
          <meshStandardMaterial
            ref={liquidMatRef}
            color="#d4730a"
            emissive="#b84500"
            emissiveIntensity={0.35}
            roughness={0.08}
            metalness={0.03}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* ── Black label band */}
        <mesh position={[0, 0.76, 0]}>
          <cylinderGeometry args={[0.382, 0.375, 0.95, 32, 1, true]} />
          <meshStandardMaterial
            color="#080808"
            roughness={0.55}
            transparent
            opacity={0.97}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Bright gold top border stripe */}
        <mesh position={[0, 1.24, 0]}>
          <cylinderGeometry args={[0.384, 0.384, 0.022, 32, 1, true]} />
          <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={0.95} envMapIntensity={2} side={THREE.FrontSide} />
        </mesh>

        {/* Bright gold bottom border stripe */}
        <mesh position={[0, 0.285, 0]}>
          <cylinderGeometry args={[0.378, 0.378, 0.022, 32, 1, true]} />
          <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={0.95} envMapIntensity={2} side={THREE.FrontSide} />
        </mesh>

        {/* ── "ZfO" gold text on label */}
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
          color="rgba(255,200,20,0.95)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.09}
        >
          CRAFTED MASALA SODA
        </Text>

        {/* ── Premium black crown cap */}
        <mesh position={[0, 2.315, 0]}>
          <cylinderGeometry args={[0.152, 0.162, 0.055, 24]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.85} />
        </mesh>
        {/* Serrated crown ring */}
        <mesh position={[0, 2.29, 0]}>
          <torusGeometry args={[0.148, 0.018, 6, 24]} />
          <meshStandardMaterial color="#333" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Gold crown rim accent */}
        <mesh position={[0, 2.345, 0]}>
          <cylinderGeometry args={[0.155, 0.155, 0.008, 24, 1, true]} />
          <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
        </mesh>

        {/* ── Base glass thickening (kick-up detail) */}
        <mesh position={[0, 0.012, 0]}>
          <cylinderGeometry args={[0.195, 0.195, 0.022, 20]} />
          <meshStandardMaterial color="#aaccee" roughness={0.08} transparent opacity={0.55} />
        </mesh>

      </group>
    </Float>
  );
}
