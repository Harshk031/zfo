'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// ZfO 275ml Breezer-style bottle
// - Wide & squat shape (breezer not beer)
// - ZfO label in yellow
// - Crown cap
// - Scroll drives rotation 0→360°
// - Liquid level drops as scrollProgress goes 0.45→0.9
export default function BottleGlass({ scrollProgress = 0, visible = true }) {
  const groupRef   = useRef();
  const liquidRef  = useRef();
  const liquidMatRef = useRef();

  // Breezer bottle profile — wide and squat
  const bottleGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.00, 0.00),
      new THREE.Vector2(0.32, 0.02),
      new THREE.Vector2(0.50, 0.10),
      new THREE.Vector2(0.56, 0.22),
      new THREE.Vector2(0.58, 0.45),
      new THREE.Vector2(0.58, 0.80),
      new THREE.Vector2(0.57, 1.10),
      new THREE.Vector2(0.52, 1.32),
      new THREE.Vector2(0.40, 1.46),
      new THREE.Vector2(0.26, 1.54),
      new THREE.Vector2(0.22, 1.60),
      new THREE.Vector2(0.21, 1.76),
      new THREE.Vector2(0.23, 1.86),
      new THREE.Vector2(0.24, 1.90),
    ];
    return new THREE.LatheGeometry(pts, 24);
  }, []);

  // Liquid fill — slightly smaller radius
  const liquidGeos = useMemo(() => {
    return [0.0, 0.2, 0.4, 0.6, 0.8, 1.0].map((fillLevel) => {
      const topY = 0.04 + fillLevel * 1.05;
      const pts = [
        new THREE.Vector2(0.00, 0.04),
        new THREE.Vector2(0.30, 0.06),
        new THREE.Vector2(0.48, 0.13),
        new THREE.Vector2(0.53, 0.24),
        new THREE.Vector2(0.54, 0.46),
        new THREE.Vector2(0.54, Math.min(topY, 1.08)),
      ];
      return new THREE.LatheGeometry(pts, 18);
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // 360° rotation on scroll
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2;

    // Liquid fill level: full at 0.45 scroll → empty at 0.9 scroll
    if (liquidRef.current && liquidMatRef.current) {
      const t = Math.max(0, Math.min(1, (scrollProgress - 0.45) / 0.45));
      // Scale Y of liquid mesh down as it drains
      liquidRef.current.scale.y = Math.max(0.02, 1 - t);
      liquidMatRef.current.opacity = t > 0.97 ? 0 : 0.88;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={1.0} rotationIntensity={0.03} floatIntensity={0.10}>
      <group ref={groupRef} position={[0, -1.0, 0]}>

        {/* Glass shell */}
        <mesh geometry={bottleGeo}>
          <meshStandardMaterial
            color="#c8e8ff"
            roughness={0.04}
            metalness={0.08}
            transparent
            opacity={0.60}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Liquid — uses liquidGeos[5] (full) and we scale Y to drain */}
        <mesh ref={liquidRef} geometry={liquidGeos[5]}>
          <meshStandardMaterial
            ref={liquidMatRef}
            color="#b84000"
            roughness={0.18}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Dark label band */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.568, 0.568, 0.72, 22, 1, true]} />
          <meshStandardMaterial
            color="#0d0d0d"
            roughness={0.7}
            transparent
            opacity={0.95}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* ZfO label text */}
        <Text
          position={[0, 0.72, 0.572]}
          fontSize={0.18}
          color="#ffcc00"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          ZfO
        </Text>

        <Text
          position={[0, 0.54, 0.572]}
          fontSize={0.058}
          color="rgba(255,255,255,0.8)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.07}
        >
          MASALA SODA
        </Text>

        {/* Crown cap */}
        <mesh position={[0, 1.92, 0]}>
          <cylinderGeometry args={[0.25, 0.27, 0.05, 18]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 1.895, 0]}>
          <torusGeometry args={[0.24, 0.022, 6, 18]} />
          <meshStandardMaterial color="#333" roughness={0.5} metalness={0.4} />
        </mesh>

      </group>
    </Float>
  );
}
