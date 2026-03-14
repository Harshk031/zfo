'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// GPU shader masala spice system — same approach as CarbonationSystem
const vertexShader = /* glsl */`
  attribute float aRadius;
  attribute float aAngle;
  attribute float aAngularSpeed;
  attribute float aY;
  attribute float aYSpeed;
  attribute float aPhase;
  attribute float aSize;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uScrollProgress;

  void main() {
    if (uIntensity < 0.01) {
      gl_Position = vec4(0.0, 0.0, -999.0, 1.0);
      gl_PointSize = 0.0;
      return;
    }

    float angle = aAngle + uTime * aAngularSpeed * (1.0 + uScrollProgress * 0.5);
    float x = cos(angle) * aRadius;
    float z = sin(angle) * aRadius;
    float y = mod(aY + uTime * aYSpeed + aPhase * 6.0, 6.0) - 3.0;

    vec4 mvPosition = modelViewMatrix * vec4(x, y, z, 1.0);
    gl_PointSize = aSize * uIntensity * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */`
  uniform float uIntensity;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = (1.0 - smoothstep(0.3, 0.5, d)) * uIntensity * 0.7;
    gl_FragColor = vec4(1.0, 0.42, 0.0, alpha);
  }
`;

export default function MasalaSystem({ count = 300, intensity = 0, scrollProgress = 0 }) {
  const pointsRef = useRef();

  const { geometry, material } = useMemo(() => {
    const n = Math.min(count, 300);

    const positions     = new Float32Array(n * 3);
    const radii         = new Float32Array(n);
    const angles        = new Float32Array(n);
    const angularSpeeds = new Float32Array(n);
    const ys            = new Float32Array(n);
    const ySpeeds       = new Float32Array(n);
    const phases        = new Float32Array(n);
    const sizes         = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      positions[i * 3] = 0; positions[i * 3 + 1] = 0; positions[i * 3 + 2] = 0;
      radii[i]         = 1.2 + Math.random() * 2.2;
      angles[i]        = (i / n) * Math.PI * 2;
      angularSpeeds[i] = 0.002 + Math.random() * 0.005;
      ys[i]            = (Math.random() - 0.5) * 5;
      ySpeeds[i]       = (Math.random() - 0.5) * 0.003;
      phases[i]        = Math.random();
      sizes[i]         = 3 + Math.random() * 5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',     new THREE.BufferAttribute(positions,     3));
    geo.setAttribute('aRadius',      new THREE.BufferAttribute(radii,         1));
    geo.setAttribute('aAngle',       new THREE.BufferAttribute(angles,        1));
    geo.setAttribute('aAngularSpeed',new THREE.BufferAttribute(angularSpeeds, 1));
    geo.setAttribute('aY',           new THREE.BufferAttribute(ys,            1));
    geo.setAttribute('aYSpeed',      new THREE.BufferAttribute(ySpeeds,       1));
    geo.setAttribute('aPhase',       new THREE.BufferAttribute(phases,        1));
    geo.setAttribute('aSize',        new THREE.BufferAttribute(sizes,         1));

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:           { value: 0 },
        uIntensity:      { value: 0 },
        uScrollProgress: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  useFrame((_, delta) => {
    if (!material) return;
    material.uniforms.uTime.value           += Math.min(delta, 0.05);
    material.uniforms.uIntensity.value       = intensity;
    material.uniforms.uScrollProgress.value  = scrollProgress;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}
