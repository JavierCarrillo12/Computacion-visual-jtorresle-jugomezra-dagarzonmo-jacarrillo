import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'

function InterpolatedObject() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [t, setT] = useState(0)
  
  // Puntos de inicio y fin
  const startPoint = new THREE.Vector3(-2, 0, 0)
  const endPoint = new THREE.Vector3(2, 0, 0)
  
  // Punto de control para la curva Bézier
  const controlPoint = new THREE.Vector3(0, 2, 0)
  
  // Configuración de controles
  const { interpolationType, speed } = useControls({
    interpolationType: {
      value: 'lerp',
      options: ['lerp', 'bezier']
    },
    speed: {
      value: 0.5,
      min: 0.1,
      max: 2,
      step: 0.1
    }
  })

  // Función para calcular punto en curva Bézier
  const getBezierPoint = (t: number) => {
    const x = Math.pow(1 - t, 2) * startPoint.x + 
              2 * (1 - t) * t * controlPoint.x + 
              Math.pow(t, 2) * endPoint.x
    const y = Math.pow(1 - t, 2) * startPoint.y + 
              2 * (1 - t) * t * controlPoint.y + 
              Math.pow(t, 2) * endPoint.y
    const z = Math.pow(1 - t, 2) * startPoint.z + 
              2 * (1 - t) * t * controlPoint.z + 
              Math.pow(t, 2) * endPoint.z
    return new THREE.Vector3(x, y, z)
  }

  useFrame(() => {
    if (!meshRef.current) return

    // Actualizar t
    setT((prevT) => {
      const newT = (prevT + 0.01 * speed) % 1
      return newT
    })

    // Aplicar interpolación según el tipo seleccionado
    if (interpolationType === 'lerp') {
      meshRef.current.position.lerpVectors(startPoint, endPoint, t)
    } else {
      const newPosition = getBezierPoint(t)
      meshRef.current.position.copy(newPosition)
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      {/* Puntos de inicio y fin */}
      <mesh position={startPoint}>
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={endPoint}>
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color="blue" />
      </mesh>

      {/* Línea de trayectoria */}
      {interpolationType === 'bezier' && (
        <Line
          points={Array.from({ length: 50 }, (_, i) => 
            getBezierPoint(i / 49)
          )}
          color="white"
          lineWidth={2}
        />
      )}
    </>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <InterpolatedObject />
      <OrbitControls />
    </Canvas>
  )
} 