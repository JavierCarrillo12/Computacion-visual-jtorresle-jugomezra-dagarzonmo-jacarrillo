import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Edges } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'

function Bunny() {
  const obj = useLoader(OBJLoader, '/bunny.obj')

  // Centrar la geometría sin cambiar el material original
  obj.traverse((child) => {
    if (child.isMesh) {
      child.geometry.center()
    }
  })

  return (
    <group>
      {/* Conejo */}
      <primitive object={obj} />

      {/* Aristas en rojo */}
      <Edges geometry={obj.children[0].geometry} scale={1.01}>
        <meshBasicMaterial color="red" />
      </Edges>

      {/* Vértices en naranja */}
      <points geometry={obj.children[0].geometry}>
        <pointsMaterial size={0.01} color="orange" />
      </points>
    </group>
  )
}

export default function ModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 3], near: 0.1, far: 1000 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <Suspense fallback={null}>
        <Bunny />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
