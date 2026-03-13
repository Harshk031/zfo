'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

import CarbonationSystem from './CarbonationSystem';
import MasalaSystem from './MasalaSystem';
import CitrusBurst from './CitrusBurst';
import BottleGlass from './BottleGlass';

// Detect device capability for adaptive quality
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
  const bubbleCount = tier === 'high' ? 1800 : tier === 'mid' ? 900 : 400;
  const masalaCount = tier === 'high' ? 1000 : tier === 'mid' ? 500 : 200;

  // Chapter thresholds
  const masalaIntensity = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.2));
  const showBottle = scrollProgress > 0.45;
  const bottleOpacity = Math.min(1, (scrollProgress - 0.45) / 0.2);

  return (
    <>
      {/* Ambient + point lights */}
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 4, 3]} intensity={2.5} color="#ffcc88" />
      <pointLight position={[-3, -2, 4]} intensity={1.5} color="#88aaff" />
      <spotLight position={[0, 8, 2]} intensity={3} angle={0.4} penumbra={0.5} castShadow />

      {/* Camera moves forward through scene via scroll */}
      {/* Handled in parent via perspectiveCamera props */}

      <Suspense fallback={null}>
        {/* Always visible — carbonation rising */}
        <CarbonationSystem count={bubbleCount} scrollProgress={scrollProgress} />

        {/* Chapter 2+ — masala spices */}
        <MasalaSystem count={masalaCount} intensity={masalaIntensity} scrollProgress={scrollProgress} />

        {/* Chapter 4+ — glass bottle */}
        {showBottle && (
          <BottleGlass scrollProgress={scrollProgress} visible={showBottle} />
        )}

        {/* On-demand citrus burst (chapter 3 or click) */}
        <CitrusBurst active={burstActive || (scrollProgress > 0.35 && scrollProgress < 0.5)} />
      </Suspense>
    </>
  );
}

export default function WebGLScene({ scrollProgress = 0, burstActive = false, style = {} }) {
  return (
    <Canvas
      dpr={[1, 1.5]}   // cap at 1.5x — performance budget
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      camera={{ position: [0, 0, 7], fov: 55, near: 0.1, far: 50 }}
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
      <AdaptiveEvents />
      <Scene scrollProgress={scrollProgress} burstActive={burstActive} />
    </Canvas>
  );
}
