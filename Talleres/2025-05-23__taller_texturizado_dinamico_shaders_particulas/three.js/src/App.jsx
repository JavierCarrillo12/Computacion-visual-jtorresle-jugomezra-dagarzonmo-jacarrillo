import React, { useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { useEffect } from 'react'

// Shader personalizado
const MyShaderMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.2, 0.5, 1.0) },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float brightness = sin(uTime + vUv.x * 10.0) * 0.5 + 0.5;
      gl_FragColor = vec4(uColor * brightness, 1.0);
    }
  `
)
extend({ MyShaderMaterial })

function AnimatedShaderSphere() {
  const meshRef = useRef()
  const materialRef = useRef()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    materialRef.current.uTime = t
    materialRef.current.uColor = new THREE.Color(mousePos.x, mousePos.y, 1 - mousePos.x)
    meshRef.current.rotation.y = t * 0.2
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <myShaderMaterial ref={materialRef} />
    </mesh>
  )
}

function ParticleSystem({ count = 500 }) {
  const pointsRef = useRef()
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  // Inicializamos posiciones y tamaños
  for (let i = 0; i < count; i++) {
    const radius = 1.5 + Math.random() * 0.5
    const angle = Math.random() * Math.PI * 2
    const y = (Math.random() - 0.5) * 1.5
    positions.set([
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ], i * 3)
    sizes[i] = Math.random() * 5 + 1
  }

  useFrame(() => {
    pointsRef.current.rotation.y += 0.001
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="white"
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <AnimatedShaderSphere />
      <ParticleSystem />
      <OrbitControls />
    </Canvas>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene />
    </div>
  )
}
