"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;
const RADIUS = 2;

function ConnectionSphere() {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate points on a sphere
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const x = RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = RADIUS * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Rotate the sphere
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#fb923c" // Orange-400
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingParticles() {
    const ref = useRef<THREE.Points>(null!);
    const count = 500;
    
    const [positions, speeds] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
            spd[i] = Math.random() * 0.02 + 0.005;
        }
        return [pos, spd];
    }, []);

    useFrame(() => {
        if (!ref.current) return;
        ref.current.rotation.y -= 0.001;
        ref.current.rotation.x += 0.0005;
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#fdba74" // Orange-300
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.3}
            />
        </Points>
    );
}

function ResponsiveContent() {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const isDesktop = aspect > 1;

  // Animate position slightly for smoothness could be nice, but direct prop is fine
  const targetPos: [number, number, number] = isDesktop ? [2.2, 0, 0] : [0, 0.5, 0];

  return (
    <group position={targetPos}>
       <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
           <ConnectionSphere />
       </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-black/90 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} dpr={[1, 2]} gl={{ antialias: false }}>
        <fog attach="fog" args={['black', 5, 15]} />
        <ambientLight intensity={0.5} />
        
        <ResponsiveContent />
        <FloatingParticles />
        
      </Canvas>
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}
