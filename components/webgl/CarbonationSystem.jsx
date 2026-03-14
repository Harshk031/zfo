'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// GPU-instanced bubble system — single draw call, no per-frame JS allocation
export default function CarbonationSystem({ count = 600, scrollProgress = 0 }) {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const clock = useRef(0);

  // Clamp count to reasonable mobile-safe value
  const safeCount = Math.min(count, 600);

  // Pre-compute random attributes ONCE
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < safeCount; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 3,
        speed: 0.004 + Math.random() * 0.007,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.4 + Math.random() * 1.2,
        size: 0.014 + Math.random() * 0.022,
      });
    }
    return arr;
  }, [safeCount]);

  // Shared dummy object — reused every frame, no allocation
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Clamp delta to avoid spiral of death on tab-switch
    const dt = Math.min(delta, 0.05);
    clock.current += dt;

    const mx = mouse.current.x * 0.25;
    const my = mouse.current.y * 0.25;
    const speedMult = 1 + scrollProgress * 1.5;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speed * speedMult;
      if (p.y > 8) p.y = -8;

      const swayX = Math.sin(clock.current * p.swaySpeed + p.sway) * 0.07;

      dummy.position.x = p.x + swayX + mx;
      dummy.position.y = p.y + my * 0.08;
      dummy.position.z = p.z;
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    // meshBasicMaterial instead of meshPhysicalMaterial = 10x cheaper GPU cost per bubble
    <instancedMesh ref={meshRef} args={[null, null, safeCount]} frustumCulled={false}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#aaddff"
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
