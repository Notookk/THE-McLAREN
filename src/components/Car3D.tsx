"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera, useGLTF, Float, Html, useProgress, Center, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#ff6600] transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-rajdhani text-[10px] tracking-[0.3em] text-[#ff6600] uppercase">
          Loading Model {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

function McLarenModel({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/ferrari.glb");
  const ref = useRef<THREE.Group>(null!);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        const matName = child.material.name.toLowerCase();
        if (matName.includes("body") || matName.includes("paint") || matName.includes("car_body")) {
          child.material = child.material.clone();
          child.material.color.set("#ff6600");
          child.material.metalness = 1.0;
          child.material.roughness = 0.1;
          child.material.envMapIntensity = 2;
        }
      }
    });
  }, [clonedScene]);

  useFrame((state) => {
    if (!ref.current) return;
    const targetRotation = scrollProgress * Math.PI * 2;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotation + Math.PI * 0.25, 0.05);
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <Center top>
      <primitive ref={ref} object={clonedScene} scale={1.2} />
    </Center>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.8, 7]} fov={35} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={3} 
        castShadow 
      />
      <pointLight position={[-10, 5, -10]} intensity={2} color="#ff6600" />
      <directionalLight position={[0, 5, 5]} intensity={2} />
      
      <Suspense fallback={<Loader />}>
        <McLarenModel scrollProgress={scrollProgress} />
        <Environment preset="night" />
      </Suspense>

      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.7}
        scale={15}
        blur={2}
        far={5}
      />
    </>
  );
}

export function Car3D({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full min-h-[600px] md:min-h-[850px] relative pointer-events-none lg:pointer-events-auto">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ReinhardToneMapping }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
