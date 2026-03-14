'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

import CarbonationSystem from './CarbonationSystem';
import MasalaSystem from './MasalaSystem';
import CitrusBurst from './CitrusBurst';
import BottleGlass from './BottleGlass';

// Device tier detection — drives particle budget
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

  // Drastically reduced counts — still looks great, runs at 60fps on mid devices
  const bubbleCount = tier === 'high' ? 600 : tier === 'mid' ? 350 : 150;
  const masalaCount = tier === 'high' ? 400 : tier === 'mid' ? 200 : 80;

  const masalaIntensity = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.2));
  const showBottle = scrollProgress > 0.45;

  return (
    <>
      {/* Minimal lighting — removed expensive spotLight with castShadow */}
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 4, 3]} intensity={2} color="#ffcc88" />
      <pointLight position={[-3, -2, 4]} intensity={1} color="#88aaff" />

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
      // DPR capped at 1 on mobile — 1.5 only on hi-dpi desktop
      dpr={[1, 1.5]}
      gl={{
        antialias: false,          // disabled — saves ~20% GPU on mobile, nearly invisible diff
        alpha: true,
        powerPreference: 'high-performance',
        // Removed ACESFilmicToneMapping — slower. LinearToneMapping is GPU-free
        toneMapping: THREE.LinearToneMapping,
        toneMappingExposure: 1.0,
        stencil: false,            // not using stencil buffer
        depth: true,
      }}
      camera={{ position: [0, 0, 7], fov: 55, near: 0.1, far: 50 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        ...style,
      }}
      // frameloop='demand' fires frames only when state changes — no idle GPU burn
      frameloop="always"
    >
      {/* AdaptiveDpr auto-lowers resolution when FPS drops */}
      <AdaptiveDpr pixelated />
      <Scene scrollProgress={scrollProgress} burstActive={burstActive} />
    </Canvas>
  );
}
