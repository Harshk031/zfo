'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Masala spice dust — warm amber particles swirling around center
// Performance: meshBasicMaterial + AdditiveBlending = no lighting cost, no shadow cost
export default function MasalaSystem({ count = 400, intensity = 0, scrollProgress = 0 }) {
  const meshRef = useRef();
  const clock = useRef(0);

  const safeCount = Math.min(count, 400);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < safeCount; i++) {
      arr.push({
        angle: (i / safeCount) * Math.PI * 2,
        radius: 1.2 + Math.random() * 2.2,
        y: (Math.random() - 0.5) * 5,
        ySpeed: (Math.random() - 0.5) * 0.003,
        angularSpeed: 0.002 + Math.random() * 0.005,
        size: 0.009 + Math.random() * 0.016,
      });
    }
    return arr;
  }, [safeCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current || intensity < 0.01) return;

    clock.current += Math.min(delta, 0.05);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.angle += p.angularSpeed * (1 + scrollProgress * 0.5);
      p.y += p.ySpeed;
      if (p.y > 3) p.y = -3;
      if (p.y < -3) p.y = 3;

      dummy.position.x = Math.cos(p.angle) * p.radius;
      dummy.position.y = p.y;
      dummy.position.z = Math.sin(p.angle) * p.radius;
      dummy.scale.setScalar(p.size * intensity);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (intensity < 0.01) return null;

  return (
    <instancedMesh ref={meshRef} args={[null, null, safeCount]} frustumCulled={false}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#ff6b00"
        transparent
        opacity={0.6 * intensity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
