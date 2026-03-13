'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// GPU-instanced bubble system — single draw call for all bubbles
export default function CarbonationSystem({ count = 1200, scrollProgress = 0 }) {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Pre-compute random attributes once
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 12,
      z: (Math.random() - 0.5) * 4,
      speed: 0.003 + Math.random() * 0.008,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.5 + Math.random() * 1.5,
      size: 0.012 + Math.random() * 0.025,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const clock = useRef(0);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    clock.current += delta;

    particles.forEach((p, i) => {
      // Upward drift — faster as scroll increases
      p.y += p.speed * (1 + scrollProgress * 2);
      if (p.y > 8) p.y = -8;

      // Sine sway
      const swayX = Math.sin(clock.current * p.swaySpeed + p.sway) * 0.08;
      // Mouse parallax push
      const mx = mouse.current.x * 0.3;
      const my = mouse.current.y * 0.3;

      dummy.position.set(
        p.x + swayX + mx * (1 - Math.abs(p.y / 8)),
        p.y + my * 0.1,
        p.z
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={0.92}
        roughness={0.0}
        metalness={0.0}
        thickness={0.05}
        transparent
        opacity={0.55}
        side={THREE.FrontSide}
      />
    </instancedMesh>
  );
}
