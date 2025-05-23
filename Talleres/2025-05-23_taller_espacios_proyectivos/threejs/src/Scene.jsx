import React, { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei'

export default function Scene() {
  const [useOrtho, setUseOrtho] = useState(false)

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <button
        onClick={() => setUseOrtho(!useOrtho)}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 10,
          left: 10,
          padding: '0.5rem 1rem'
        }}
      >
        Cambiar a {useOrtho ? 'Perspectiva' : 'Ortográfica'}
      </button>

      <Canvas>
        {useOrtho ? (
          <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={40} />
        ) : (
          <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={90} />
        )}
        <OrbitControls />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Cubos a diferentes profundidades */}
        <mesh position={[-2, 0, -10]}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="green" />
        </mesh>
        <mesh position={[2, 0, 10]}>
          <boxGeometry />
          <meshStandardMaterial color="blue" />
        </mesh>
      </Canvas>
    </div>
  )
}