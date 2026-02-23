"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 1500;
const INFLUENCE_RADIUS = 0.6;
const PULL_STRENGTH = 0.04;
const RETURN_STRENGTH = 0.02;

function MagneticDots() {
  const ref = useRef<any>(null);
  const mouse = useRef(new THREE.Vector2(9999, 9999));
  const { viewport } = useThree();

  // Store base positions so particles drift back
  const base = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  const positions = useMemo(() => new Float32Array(base), [base]);

  const onPointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      // Convert screen coords to Three.js world coords (at z=0)
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  // Attach window listener once
  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("pointermove", onPointerMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("pointermove", onPointerMove);
      }
    };
  }, [onPointerMove]);

  useFrame(() => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    // Mouse in world space
    const mx = (mouse.current.x * viewport.width) / 2;
    const my = (mouse.current.y * viewport.height) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      const dx = mx - posArr[ix];
      const dy = my - posArr[iy];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < INFLUENCE_RADIUS && dist > 0.001) {
        // Pull towards cursor
        const force = (1 - dist / INFLUENCE_RADIUS) * PULL_STRENGTH;
        posArr[ix] += dx * force;
        posArr[iy] += dy * force;
      }

      // Drift back to base
      posArr[ix] += (base[ix] - posArr[ix]) * RETURN_STRENGTH;
      posArr[iy] += (base[iy] - posArr[iy]) * RETURN_STRENGTH;
      posArr[iz] += (base[iz] - posArr[iz]) * RETURN_STRENGTH;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f97316"
        size={0.006}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 2] }} dpr={[1, 1.5]}>
        <MagneticDots />
      </Canvas>
    </div>
  );
}
