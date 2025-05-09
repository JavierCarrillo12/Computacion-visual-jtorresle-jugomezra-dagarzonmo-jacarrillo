import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Sphere } from '@react-three/drei'
import { useControls } from 'leva'

// Datos iniciales para los objetos 3D
const initialObjects = [
  { id: 1, position: [0, 0, 0], scale: 1, color: '#ff0000', rotation: 0, type: 'box' },
  { id: 2, position: [2, 1, -1], scale: 0.8, color: '#00ff00', rotation: Math.PI/4, type: 'sphere' },
  { id: 3, position: [-2, -1, 1], scale: 1.2, color: '#0000ff', rotation: Math.PI/2, type: 'box' }
]

function SceneObjects() {
  // Controles dinámicos con Leva
  const config = useControls({
    globalScale: { value: 1, min: 0.5, max: 2 },
    globalColor: '#ffffff'
  })

  return initialObjects.map(obj => (
    <mesh 
      key={obj.id}
      position={obj.position}
      scale={obj.scale * config.globalScale}
      rotation={[0, obj.rotation * config.globalScale, 0]}
    >
      {obj.type === 'box' ? (
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color={obj.color ?? config.globalColor} />
        </Box>
      ) : (
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial color={obj.color ?? config.globalColor} />
        </Sphere>
      )}
    </mesh>
  ))
}

export default function App() {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SceneObjects />
      <OrbitControls />
    </Canvas>
  )
}
