'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────
// GPU SHADER PARTICLE SYSTEM
// All animation runs 100% on the GPU — zero per-frame JS computation.
// JavaScript only updates ONE uniform (time) per frame regardless of count.
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
    // Upward drift — driven by time + scroll speed on GPU
    float speedMult = 1.0 + uScrollProgress * 1.5;
    float y = position.y + mod(uTime * aSpeed * speedMult + aPhase * 16.0, 16.0) - 8.0;
    
    // Sine sway — pure GPU math, free
    float swayX = sin(uTime * aSwaySpeed + aSway) * 0.07;

    vec3 pos = vec3(position.x + swayX, y, position.z);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */`
  uniform float uOpacity;

  void main() {
    // Circular point — discard square corners
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    // Soft edge
    float alpha = 1.0 - smoothstep(0.3, 0.5, d);
    gl_FragColor = vec4(0.7, 0.87, 1.0, alpha * uOpacity);
  }
`;

export default function CarbonationSystem({ count = 500, scrollProgress = 0 }) {
  const pointsRef = useRef();
  
  // uploadonce: build all particle attribute arrays ONCE, never modify on CPU
  const { geometry, material } = useMemo(() => {
    const n = Math.min(count, 500);

    // Position (initial random x, y, z)
    const positions  = new Float32Array(n * 3);
    const speeds     = new Float32Array(n);
    const sways      = new Float32Array(n);
    const swaySpeeds = new Float32Array(n);
    const sizes      = new Float32Array(n);
    const phases     = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 6;   // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;  // y — full range
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;   // z
      speeds[i]     = 0.4 + Math.random() * 0.8;
      sways[i]      = Math.random() * Math.PI * 2;
      swaySpeeds[i] = 0.4 + Math.random() * 1.2;
      sizes[i]      = 4 + Math.random() * 7;   // point size in GPU pixels
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
        uOpacity:        { value: 0.5 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  // Per frame: update exactly 2 uniform values — O(1) regardless of particle count
  useFrame((_, delta) => {
    if (!material) return;
    material.uniforms.uTime.value           += Math.min(delta, 0.05);
    material.uniforms.uScrollProgress.value  = scrollProgress;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}
