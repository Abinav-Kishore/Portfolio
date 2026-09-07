import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KineticArtifactProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
}

const KineticArtifact: React.FC<KineticArtifactProps> = ({ mouse, scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const planesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Gentle base rotation plus mouse tilt
    const targetRotX = mouse.y * 0.45 + scrollProgress * 1.8;
    const targetRotY = mouse.x * 0.55 + scrollProgress * 2.5;

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);

    // Dynamic scroll translation & scaling
    const targetScale = 1 - scrollProgress * 0.35;
    const targetPosX = scrollProgress * 1.2;
    const targetPosY = -scrollProgress * 0.8;

    groupRef.current.scale.setScalar(targetScale);
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetPosX, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetPosY, 4, delta);

    // Individual sub-assemblies rotating at harmonic speeds
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.2;
      coreRef.current.rotation.z += delta * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.y += delta * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.3;
      ring2Ref.current.rotation.z -= delta * 0.2;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.35;
    }

    if (planesRef.current) {
      // Explode plates slightly as scroll increases
      const expansion = 1 + scrollProgress * 1.2;
      planesRef.current.scale.set(expansion, expansion, expansion);
    }
  });

  return (
    <group ref={groupRef} position={[0.4, 0, 0]}>
      {/* Central Architectural Wireframe / Faceted Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.4}
          metalness={0.8}
          wireframe={false}
          flatShading={true}
        />
      </mesh>

      {/* Wireframe overlay on core */}
      <mesh>
        <octahedronGeometry args={[1.22, 0]} />
        <meshBasicMaterial color="#355CFF" wireframe={true} transparent opacity={0.7} />
      </mesh>

      {/* Ring 1: Outer Gimbal Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.0, 0.018, 16, 64]} />
          <meshStandardMaterial color="#2b2b2b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Ring markers */}
        {[-1.9, 1.9].map((pos, idx) => (
          <mesh key={idx} position={[pos, 0, 0]}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshBasicMaterial color="#111111" />
          </mesh>
        ))}
      </group>

      {/* Ring 2: Tilted Secondary Ring */}
      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.6, 0.015, 16, 64]} />
          <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Ring 3: Orthogonal Blueprint Ring */}
      <group ref={ring3Ref} rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[2.3, 0.012, 16, 64]} />
          <meshBasicMaterial color="#355CFF" wireframe={true} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Floating Architectural Slicing Planes */}
      <group ref={planesRef}>
        {/* Horizontal floor plate */}
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.4, 2.4]} />
          <meshBasicMaterial
            color="#C8C4B9"
            wireframe={true}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Vertical shear plate */}
        <mesh position={[0, 0, 0.6]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshBasicMaterial
            color="#111111"
            wireframe={true}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Small floating architectural coordinate cubes */}
        <mesh position={[1.4, 0.8, -0.5]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        <mesh position={[-1.2, -0.9, 0.7]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color="#355CFF" wireframe />
        </mesh>
      </group>

      {/* Thin 3D measurement axis rods */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -2.8, 0, 0,  2.8, 0, 0,
                0, -2.8, 0,  0, 2.8, 0,
                0, 0, -2.8,  0, 0, 2.8,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#99968e" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
};

export const HeroScene3D: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0 }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (hasError) {
    // Elegant SVG fallback for environments where WebGL is unsupported
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none opacity-40">
        <svg className="w-64 h-64 animate-spin-slow" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" stroke="#111111" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <polygon points="100,20 170,160 30,160" stroke="#355CFF" strokeWidth="1" fill="none" />
          <polygon points="100,180 30,40 170,40" stroke="#111111" strokeWidth="1" fill="none" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <pointLight position={[-4, -3, -2]} color="#355CFF" intensity={1.8} />
        <KineticArtifact mouse={mouse} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
