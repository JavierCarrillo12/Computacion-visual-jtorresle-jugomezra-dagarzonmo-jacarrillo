import { PerspectiveCamera, OrthographicCamera, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export function CameraSwitcher({ mode }) {
    const { aspect } = useThree()
  
    return mode === 'perspective' ? (
      <PerspectiveCamera
        makeDefault
        fov={45}                // más cerrado que 75
        aspect={aspect}
        near={0.1}
        far={100}
        position={[0, 1.5, 8]}  // un poco más cerca
      />
    ) : (
      <OrthographicCamera
        makeDefault
        near={0.1}
        far={100}
        position={[0, 1.5, 8]}
        zoom={80}               // más zoom (antes tenías 50)
      />
    )
  }
  

export function Objects() {
  return (
    <>
      <mesh position={[0, 0, -5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[2, 0, -10]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  )
}
