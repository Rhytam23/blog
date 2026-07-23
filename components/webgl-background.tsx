"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function FloatingParticles({ count = 80 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(() => {
    const rand = seededRandom(42);
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (rand() - 0.5) * 20,
          (rand() - 0.5) * 20,
          (rand() - 0.5) * 10,
        ] as [number, number, number],
        speed: 0.05 + rand() * 0.15, // Slower, more ambient floating speed
        offset: rand() * Math.PI * 2,
        scale: 0.01 + rand() * 0.03, // Smaller, more subtle particles
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    particles.forEach((particle, i) => {
      const { position, speed, offset, scale } = particle;
      
      // Add very subtle mouse responsiveness to particles as well
      const mouseInfluenceX = pointer.x * 0.2;
      const mouseInfluenceY = pointer.y * 0.2;

      dummy.position.set(
        position[0] + Math.sin(t * speed + offset) * 0.4 + mouseInfluenceX,
        position[1] + Math.cos(t * speed * 0.7 + offset) * 0.2 + mouseInfluenceY,
        position[2]
      );
      dummy.scale.setScalar(scale * (0.8 + Math.sin(t * speed * 2 + offset) * 0.2));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleGeometry args={[1, 8]} /> {/* Simpler geometries for performance */}
      <meshBasicMaterial
        transparent
        opacity={0.08} // Subtler particle contrast
        color="#ffffff"
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function GradientOrbs() {
  const group = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.z = t * 0.005; // Much slower ambient rotation
    }
  });

  return (
    <group ref={group}>
      {[
        { pos: [-3, 2, -5] as [number, number, number], color: "#6366f1", scale: 4.5, speed: 0.15 },
        { pos: [4, -1, -6] as [number, number, number], color: "#8b5cf6", scale: 4.0, speed: 0.1 },
        { pos: [-1, -3, -4] as [number, number, number], color: "#312e81", scale: 3.5, speed: 0.12 },
      ].map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}
    </group>
  );
}

function FloatingOrb({
  pos,
  color,
  scale,
  speed,
}: {
  pos: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const currentX = useRef(pos[0]);
  const currentY = useRef(pos[1]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      // Slow, laggy mouse follow effect (Lusion-style)
      const targetX = pos[0] + Math.sin(t * speed) * 1.5 + pointer.x * 2.5;
      const targetY = pos[1] + Math.cos(t * speed * 0.7) * 1.0 + pointer.y * 2.0;

      currentX.current += (targetX - currentX.current) * 0.02; // Heavy damping
      currentY.current += (targetY - currentY.current) * 0.02;

      mesh.current.position.x = currentX.current;
      mesh.current.position.y = currentY.current;
    }
  });

  return (
    <mesh ref={mesh} position={pos}>
      <circleGeometry args={[scale, 32]} />
      <meshBasicMaterial
        transparent
        opacity={0.03} // Extremely soft mesh background lighting
        color={color}
        depthWrite={false}
      />
    </mesh>
  );
}

export function WebGLBackground() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-55 dark:opacity-75">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.2]} // Low-power dpr for 60fps consistency
        style={{ background: "transparent" }}
      >
        <FloatingParticles count={40} />
        <GradientOrbs />
      </Canvas>
    </div>
  );
}
