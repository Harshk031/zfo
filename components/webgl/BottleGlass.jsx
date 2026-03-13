'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// PBR glass bottle built from procedural geometry — no external model needed
export default function BottleGlass({ scrollProgress = 0, visible = true }) {
  const groupRef = useRef();
  const liquidRef = useRef();

  // Procedural bottle shape using lathe geometry
  const bottleGeometry = useMemo(() => {
    const points = [
      // Bottom curve
      new THREE.Vector2(0.00, 0.00),
      new THREE.Vector2(0.28, 0.04),
      new THREE.Vector2(0.42, 0.14),
      new THREE.Vector2(0.46, 0.30),
      // Body
      new THREE.Vector2(0.46, 0.50),
      new THREE.Vector2(0.45, 0.90),
      new THREE.Vector2(0.44, 1.30),
      // Shoulder taper
      new THREE.Vector2(0.42, 1.55),
      new THREE.Vector2(0.36, 1.72),
      new THREE.Vector2(0.26, 1.82),
      // Neck
      new THREE.Vector2(0.20, 1.90),
      new THREE.Vector2(0.19, 2.10),
      new THREE.Vector2(0.20, 2.20),
      // Lip
      new THREE.Vector2(0.22, 2.28),
      new THREE.Vector2(0.22, 2.32),
    ];
    return new THREE.LatheGeometry(points, 32);
  }, []);

  // Liquid inside — slightly smaller cylinder
  const liquidGeometry = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.00, 0.02),
      new THREE.Vector2(0.26, 0.06),
      new THREE.Vector2(0.40, 0.16),
      new THREE.Vector2(0.42, 0.32),
      new THREE.Vector2(0.42, 0.50),
      new THREE.Vector2(0.41, 0.90),
    ];
    return new THREE.LatheGeometry(pts, 24);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Scroll drives Y rotation
    groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
    // Liquid sloshing
    if (liquidRef.current) {
      liquidRef.current.rotation.y = -scrollProgress * Math.PI * 2;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.15}>
      <group ref={groupRef} position={[0, -1.1, 0]}>
        {/* Glass bottle shell */}
        <mesh geometry={bottleGeometry} castShadow>
          <meshPhysicalMaterial
            color="#e8f4ff"
            transmission={0.95}
            roughness={0.04}
            metalness={0.0}
            thickness={0.4}
            ior={1.5}
            reflectivity={0.5}
            envMapIntensity={2.0}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Liquid fill — dark amber masala soda colour */}
        <mesh ref={liquidRef} geometry={liquidGeometry}>
          <meshPhysicalMaterial
            color="#8b3a00"
            roughness={0.1}
            metalness={0.0}
            transmission={0.6}
            thickness={0.5}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Label band */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.455, 0.455, 0.6, 32, 1, true]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.8}
            metalness={0.0}
            transparent
            opacity={0.92}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Cap */}
        <mesh position={[0, 2.30, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.10, 16]} />
          <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>

      <Environment preset="city" />
    </Float>
  );
}
