import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import { useControls } from 'leva'

function SceneHierarchy() {
  // Controles para el grupo padre con Leva
  const parentControls = useControls('Padre', {
    rotation: { value: 0, min: 0, max: Math.PI * 2 },
    positionX: { value: 0, min: -3, max: 3 },
    positionY: { value: 0, min: -3, max: 3 }
  })

  return (
    <group
      rotation={[0, parentControls.rotation, 0]}
      position={[parentControls.positionX, parentControls.positionY, 0]}
    >
      {/* Primer nivel (Padre) */}
      <Box position={[-1, 0, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>

      {/* Segundo nivel (Hijo) */}
      <group position={[1, 0, 0]} rotation={[0, Math.PI/4, 0]}>
        <Box scale={0.6}>
          <meshStandardMaterial color="hotpink" />
        </Box>

        {/* Tercer nivel (Nieto - Bonus) */}
        <group position={[0, 1, 0]} rotation={[0, 0, Math.PI/4]}>
          <Box scale={0.4}>
            <meshStandardMaterial color="cyan" />
          </Box>
        </group>
      </group>
    </group>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SceneHierarchy />
      <OrbitControls />
    </Canvas>
  )
}
