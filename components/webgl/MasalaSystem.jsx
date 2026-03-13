'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Masala spice dust — warm amber/red particles that swirl around center
export default function MasalaSystem({ count = 800, intensity = 0, scrollProgress = 0 }) {
  const meshRef = useRef();
  const clock = useRef(0);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 1.2 + Math.random() * 2.5,
      y: (Math.random() - 0.5) * 5,
      ySpeed: (Math.random() - 0.5) * 0.003,
      angularSpeed: 0.002 + Math.random() * 0.006,
      size: 0.008 + Math.random() * 0.018,
      colorT: Math.random(), // 0=amber, 1=deep red
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Warm color palette: amber to deep red
  const colorA = useMemo(() => new THREE.Color('#ff6b00'), []);
  const colorB = useMemo(() => new THREE.Color('#8b1a00'), []);
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c = new THREE.Color();
    particles.forEach((p, i) => {
      c.lerpColors(colorA, colorB, p.colorT);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    });
    return arr;
  }, [particles, count, colorA, colorB]);

  useFrame((_, delta) => {
    if (!meshRef.current || intensity < 0.01) return;
    clock.current += delta;

    particles.forEach((p, i) => {
      p.angle += p.angularSpeed * (1 + scrollProgress);
      p.y += p.ySpeed;
      if (p.y > 3) p.y = -3;
      if (p.y < -3) p.y = 3;

      const x = Math.cos(p.angle) * p.radius;
      const z = Math.sin(p.angle) * p.radius;
      dummy.position.set(x, p.y, z);
      const scale = p.size * intensity;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (intensity < 0.01) return null;

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        vertexColors={false}
        color="#ff6b00"
        transparent
        opacity={0.7 * intensity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
