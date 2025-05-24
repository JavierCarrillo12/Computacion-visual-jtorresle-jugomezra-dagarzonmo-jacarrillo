import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import './App.css'

function Scene({ roughness, metalness }) {
  const boxRef = useRef()
  const sphereRef = useRef()

  // Cargar texturas PBR
  const textures = useTexture({
    map: '/textures/Ground085_1K-JPG_Color.jpg',        // Textura de color/difusa
    roughnessMap: '/textures/Ground085_1K-JPG_Roughness.jpg', // Textura de rugosidad
    // metalnessMap: '/textures/Ground085_1K-JPG_Metalness.jpg', // No hay mapa de metalicidad en este conjunto, se usa el control de la UI
    normalMap: '/textures/Ground085_1K-JPG_NormalGL.jpg',    // Textura normal (OpenGL)
    // ambientOcclusionMap: '/textures/Ground085_1K-JPG_AmbientOcclusion.jpg', // Mapa de Ambient Occlusion (opcional)
    // displacementMap: '/textures/Ground085_1K-JPG_Displacement.jpg', // Mapa de Displacement (requiere geometría con subdivisiones)
  })

  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#808080" />
      </mesh>

      {/* Objeto con material PBR */}
      <mesh ref={boxRef} position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          {...textures}
          roughness={roughness}
          metalness={metalness}
          envMapIntensity={1}
        />
      </mesh>

      {/* Objeto con material básico para comparación */}
      <mesh ref={sphereRef} position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>

      {/* Controles de órbita */}
      <OrbitControls />
    </>
  )
}

function App() {
  const [roughness, setRoughness] = useState(0.5)
  const [metalness, setMetalness] = useState(0.5)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <Scene roughness={roughness} metalness={metalness} />
      </Canvas>
      
      {/* Panel de control simple */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h3 style={{ marginBottom: '10px' }}>Controles de Material</h3>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Rugosidad: {roughness.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={roughness}
            onChange={(e) => setRoughness(parseFloat(e.target.value))}
            style={{ width: '200px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Metalicidad: {metalness.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={metalness}
            onChange={(e) => setMetalness(parseFloat(e.target.value))}
            style={{ width: '200px' }}
          />
        </div>
      </div>
    </div>
  )
}

export default App

