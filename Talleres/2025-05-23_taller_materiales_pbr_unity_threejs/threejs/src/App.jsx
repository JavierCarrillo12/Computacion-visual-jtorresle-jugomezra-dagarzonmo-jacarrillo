import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { Leva, useControls } from 'leva'
import * as THREE from 'three'
import './App.css'

// Main interactive box component
function Box() {
  const meshRef = useRef()
  const [position, setPosition] = useState([0, 0, 0])
  const [active, setActive] = useState(false)

  // Minimal controls: color, speed, scale
  const { scale, color, speed } = useControls({
    scale: { value: 1, min: 0.5, max: 3, step: 0.1, label: 'Scale' },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1, label: 'Speed' },
    color: { value: '#4a90e2', label: 'Color' }
  })

  // Mouse movement tracking for box rotation
  useFrame(({ pointer }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = pointer.x * Math.PI * speed
      meshRef.current.rotation.x = pointer.y * Math.PI * speed
    }
  })

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key.toLowerCase()) {
        case 'r': // Reset position
          setPosition([0, 0, 0])
          break
        case 'arrowup': // Move up
          setPosition(prev => [prev[0], prev[1] + 0.5, prev[2]])
          break
        case 'arrowdown': // Move down
          setPosition(prev => [prev[0], prev[1] - 0.5, prev[2]])
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={() => setActive(!active)}
    >
      <boxGeometry />
      <meshStandardMaterial 
        color={active ? '#ff6b6b' : color}
        metalness={0.5}
        roughness={0.2}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="black" />
      </lineSegments>
      
      {/* Interactive UI elements */}
      <Html position={[0, 1.2, 0]} center>
        <div className="ui-container">
          <div className="ui-info">
            Click box to change color
          </div>
        </div>
      </Html>
    </mesh>
  )
}

// Main App component
export default function App() {
  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Box />
        <OrbitControls />
      </Canvas>
      
      {/* Side Menu */}
      <div className="side-menu minimal open">
        <h2 className="side-menu-title">Controls</h2>
        <Leva 
          collapsed={false}
          fill
          hideCopyButton
          hideResetButton
          theme={{
            colors: {
              accent1: '#4a90e2',
              accent2: '#357abd',
              accent3: '#2c3e50',
              elevation1: 'transparent',
              elevation2: 'transparent',
              elevation3: 'transparent',
              highlight1: '#fff',
              highlight2: '#fff',
              highlight3: '#fff',
              foreground: '#fff',
              toolTipBackground: '#222',
            },
            sizes: {
              titleBarHeight: '0px',
              controlWidth: '180px',
              rowHeight: '32px',
            },
            radii: {
              xs: '4px',
              sm: '6px',
              lg: '8px',
            },
            space: {
              sm: '8px',
              md: '14px',
              rowGap: '10px',
              colGap: '10px',
            },
          }}
        />
      </div>
    </div>
  )
}

