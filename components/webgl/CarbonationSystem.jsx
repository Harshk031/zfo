'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────
// GPU SHADER BUBBLE SYSTEM — fixes:
//   - Point sizes now tiny (3-8px screen), not 200-500px
//   - Opacity 0.18 to prevent additive pile-up blinding
//   - NormalBlending fallback to avoid white-out
// ─────────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */`
  attribute float aSpeed;
  attribute float aSway;
  attribute float aSwaySpeed;
  attribute float aSize;
  attribute float aPhase;

  uniform float uTime;
  uniform float uScrollProgress;

  void main() {
    float speedMult = 1.0 + uScrollProgress * 1.2;
    // Upward loop: mod over 16 units, offset by phase so they spread out
    float y = mod(position.y + uTime * aSpeed * speedMult + aPhase * 16.0, 16.0) - 8.0;
    float swayX = sin(uTime * aSwaySpeed + aSway) * 0.06;

    vec4 mvPosition = modelViewMatrix * vec4(position.x + swayX, y, position.z, 1.0);

    // aSize is already in raw pixels (3-8). Scale slightly with depth but keep small.
    gl_PointSize = aSize * (120.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */`
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    // Very soft circle, very low alpha to prevent blinding accumulation
    float alpha = (1.0 - smoothstep(0.25, 0.5, d)) * 0.18;
    gl_FragColor = vec4(0.75, 0.9, 1.0, alpha);
  }
`;

export default function CarbonationSystem({ count = 400, scrollProgress = 0 }) {
  const pointsRef = useRef();

  const { geometry, material } = useMemo(() => {
    const n = Math.min(count, 400);

    const positions  = new Float32Array(n * 3);
    const speeds     = new Float32Array(n);
    const sways      = new Float32Array(n);
    const swaySpeeds = new Float32Array(n);
    const sizes      = new Float32Array(n);
    const phases     = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speeds[i]     = 0.3 + Math.random() * 0.7;
      sways[i]      = Math.random() * Math.PI * 2;
      swaySpeeds[i] = 0.3 + Math.random() * 1.0;
      sizes[i]      = 1.5 + Math.random() * 2.5;  // Very small: 1.5–4 raw px
      phases[i]     = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',   new THREE.BufferAttribute(positions,  3));
    geo.setAttribute('aSpeed',     new THREE.BufferAttribute(speeds,     1));
    geo.setAttribute('aSway',      new THREE.BufferAttribute(sways,      1));
    geo.setAttribute('aSwaySpeed', new THREE.BufferAttribute(swaySpeeds, 1));
    geo.setAttribute('aSize',      new THREE.BufferAttribute(sizes,      1));
    geo.setAttribute('aPhase',     new THREE.BufferAttribute(phases,     1));

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:           { value: 0 },
        uScrollProgress: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      // Normal blending avoids additive white-out while still looking nice
      blending: THREE.NormalBlending,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  useFrame((_, delta) => {
    if (!material) return;
    material.uniforms.uTime.value          += Math.min(delta, 0.05);
    material.uniforms.uScrollProgress.value = scrollProgress;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}
