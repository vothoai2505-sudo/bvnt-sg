'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function CoreGlobe() { 
  const globeRef = useRef<THREE.Group>(null); 
  
  useFrame((state, delta) => { 
    if (globeRef.current) { 
      globeRef.current.rotation.y += delta * 0.2; 
    } 
  }); 
  
  return ( 
    <group ref={globeRef}>
      {/* Cầu vàng nền */}
      <Sphere args={[1, 64, 64]}> 
        <meshStandardMaterial 
          color='#eab308' 
          roughness={0.2} 
          metalness={0.8} 
          emissive='#eab308' 
          emissiveIntensity={0.2} 
        /> 
      </Sphere>
      {/* Quả cầu lưới mạng bên ngoài (làm đơn giản hiệu ứng mạng) */}
      <Sphere args={[1.02, 32, 32]}>
        <meshStandardMaterial 
          color='#ffffff' 
          wireframe={true} 
          transparent={true} 
          opacity={0.8}
        />
      </Sphere>
    </group>
  ); 
}  

export default function HeroGlobe() { 
  return ( 
    <div className='w-full h-full absolute inset-0 z-0 pointer-events-auto'> 
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}> 
        <ambientLight intensity={0.5} /> 
        <directionalLight position={[10, 10, 5]} intensity={1.5} color='#ffffff' /> 
        <directionalLight position={[-10, -10, -5]} intensity={1} color='#ffffff' /> 
        <CoreGlobe /> 
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={1} /> 
      </Canvas> 
    </div> 
  ); 
} 
