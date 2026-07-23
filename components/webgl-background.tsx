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
        speed: 0.1 + rand() * 0.3,
        offset: rand() * Math.PI * 2,
        scale: 0.02 + rand() * 0.04,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particles.forEach((particle, i) => {
      const { position, speed, offset, scale } = particle;
      dummy.position.set(
        position[0] + Math.sin(t * speed + offset) * 0.5,
        position[1] + Math.cos(t * speed * 0.7 + offset) * 0.3,
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
      <circleGeometry args={[1, 16]} />
      <meshBasicMaterial
        transparent
        opacity={0.15}
        color="currentColor"
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
      group.current.rotation.z = t * 0.02;
    }
  });

  return (
    <group ref={group}>
      {[
        { pos: [-3, 2, -5] as [number, number, number], color: "#6366f1", scale: 4, speed: 0.3 },
        { pos: [4, -1, -6] as [number, number, number], color: "#8b5cf6", scale: 3.5, speed: 0.2 },
        { pos: [-1, -3, -4] as [number, number, number], color: "#a855f7", scale: 3, speed: 0.25 },
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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.position.x = pos[0] + Math.sin(t * speed) * 2;
      mesh.current.position.y = pos[1] + Math.cos(t * speed * 0.7) * 1.5;
    }
  });

  return (
    <mesh ref={mesh} position={pos}>
      <circleGeometry args={[scale, 64]} />
      <meshBasicMaterial
        transparent
        opacity={0.03}
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
    <div className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <FloatingParticles count={60} />
        <GradientOrbs />
      </Canvas>
    </div>
  );
}
