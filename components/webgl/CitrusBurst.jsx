'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// On-demand citrus explosion — triggers via prop or window event
export default function CitrusBurst({ active = false }) {
  const meshRef = useRef();
  const [bursting, setBursting] = useState(false);
  const clock = useRef(0);
  const COUNT = 250;

  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.04 + Math.random() * 0.1;
      return {
        vx: Math.sin(phi) * Math.cos(theta) * speed,
        vy: Math.sin(phi) * Math.sin(theta) * speed,
        vz: Math.cos(phi) * speed,
        x: 0, y: 0, z: 0,
        life: 1.0,
        decay: 0.008 + Math.random() * 0.012,
        size: 0.015 + Math.random() * 0.03,
      };
    });
  }, [COUNT]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Reset on trigger
  useEffect(() => {
    if (active) {
      particles.forEach((p) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const speed = 0.04 + Math.random() * 0.1;
        p.vx = Math.sin(phi) * Math.cos(theta) * speed;
        p.vy = Math.sin(phi) * Math.sin(theta) * speed;
        p.vz = Math.cos(phi) * speed;
        p.x = 0; p.y = 0; p.z = 0;
        p.life = 1.0;
      });
      clock.current = 0;
      setBursting(true);
    }
  }, [active, particles]);

  useFrame((_, delta) => {
    if (!meshRef.current || !bursting) return;
    clock.current += delta;

    let alive = false;
    particles.forEach((p, i) => {
      if (p.life <= 0) {
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        return;
      }
      alive = true;
      p.x += p.vx;
      p.y += p.vy - 0.002; // gravity
      p.z += p.vz;
      p.vy -= 0.0008;       // drag
      p.life -= p.decay;

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.size * p.life);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (!alive) setBursting(false);
  });

  if (!bursting && !active) return null;

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial
        color="#ffee00"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
