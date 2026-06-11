"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;
const FIELD_HEIGHT = 60;
// How far the camera descends through the field over a full page scroll.
const CAMERA_TRAVEL = 18;

function ParticleField() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Cylindrical distribution so the camera always sits inside the field
      const radius = 4 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_HEIGHT;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
      sizes[i] = Math.random();
    }
    return { positions, sizes };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.045;
    }

    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - doc.clientHeight);
    const target = doc.scrollTop / maxScroll;
    // Smooth the camera toward the scroll position for a weighty, kinetic feel
    scrollProgress.current += (target - scrollProgress.current) * Math.min(1, delta * 5);

    const camY = -scrollProgress.current * CAMERA_TRAVEL;
    state.camera.position.y = camY;
    state.camera.position.z = 14 - scrollProgress.current * 3;
    state.camera.lookAt(0, camY - 1.5, 0);
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#4b9cd3"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points rotation={[0, Math.PI / 3, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#ffffff"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function ParticleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <fog attach="fog" args={["#050507", 12, 32]} />
      <ParticleField />
    </Canvas>
  );
}
