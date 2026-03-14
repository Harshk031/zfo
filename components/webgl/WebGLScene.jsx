'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

import CarbonationSystem from './CarbonationSystem';
import MasalaSystem from './MasalaSystem';
import CitrusBurst from './CitrusBurst';
import BottleGlass from './BottleGlass';

function getDeviceTier() {
  if (typeof window === 'undefined') return 'mid';
  const memory = navigator?.deviceMemory || 4;
  const cores = navigator?.hardwareConcurrency || 4;
  if (memory >= 8 && cores >= 8) return 'high';
  if (memory >= 4 && cores >= 4) return 'mid';
  return 'low';
}

function Scene({ scrollProgress, burstActive }) {
  const tier = getDeviceTier();
  const bubbleCount = tier === 'high' ? 600 : tier === 'mid' ? 350 : 150;
  const masalaCount = tier === 'high' ? 400 : tier === 'mid' ? 200 : 80;

  const masalaIntensity = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.2));
  // Show bottle earlier (0.38) so it's visible in the hero
  const showBottle = scrollProgress > 0.38;

  return (
    <>
      {/* Soft, premium lighting — not blinding */}
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 5, 3]}  intensity={1.2} color="#ffdd99" />
      <pointLight position={[-4, -2, 3]} intensity={0.8} color="#88aaff" />
      <pointLight position={[0, -2, -3]} intensity={0.6} color="#ff8844" />

      <Suspense fallback={null}>
        <CarbonationSystem count={bubbleCount} scrollProgress={scrollProgress} />
        <MasalaSystem count={masalaCount} intensity={masalaIntensity} scrollProgress={scrollProgress} />

        {showBottle && (
          <BottleGlass scrollProgress={scrollProgress} visible={showBottle} />
        )}

        <CitrusBurst active={burstActive || (scrollProgress > 0.35 && scrollProgress < 0.5)} />
      </Suspense>
    </>
  );
}

export default function WebGLScene({ scrollProgress = 0, burstActive = false, style = {} }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.LinearToneMapping,
        toneMappingExposure: 1.0,
        stencil: false,
        depth: true,
        // REQUIRED for THREE.Plane clipping to work on materials
        localClippingEnabled: true,
      }}
      camera={{ position: [0, 0, 6.5], fov: 52, near: 0.1, far: 50 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        ...style,
      }}
      frameloop="always"
    >
      <AdaptiveDpr pixelated />
      <Scene scrollProgress={scrollProgress} burstActive={burstActive} />
    </Canvas>
  );
}
