import { Canvas, useFrame } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function ArticulatedArm() {
  const baseRef = useRef<THREE.Group>(null)
  const joint1Ref = useRef<THREE.Group>(null)
  const joint2Ref = useRef<THREE.Group>(null)
  const tipRef = useRef<THREE.Mesh>(null)
  const lineRef = useRef<THREE.Line>(null)
  const trail = useRef<THREE.Vector3[]>([])

  const {
    autoAnimation,
    angle1,
    angle2,
    angle3,
    color1,
    color2,
    color3,
  } = useControls({
    autoAnimation: false,
    angle1: { value: 0, min: -Math.PI, max: Math.PI },
    angle2: { value: 0, min: -Math.PI, max: Math.PI },
    angle3: { value: 0, min: -Math.PI, max: Math.PI },
    color1: '#ff8800',
    color2: '#44cc44',
    color3: '#4488ff',
  })

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (baseRef.current && joint1Ref.current && joint2Ref.current && tipRef.current && lineRef.current) {
      if (autoAnimation) {
        baseRef.current.rotation.z = Math.sin(t)
        joint1Ref.current.rotation.z = Math.sin(t * 1.5)
        joint2Ref.current.rotation.z = Math.sin(t * 2)
      } else {
        baseRef.current.rotation.z = angle1
        joint1Ref.current.rotation.z = angle2
        joint2Ref.current.rotation.z = angle3
      }

      tipRef.current.updateWorldMatrix(true, false)
      const tipWorldPos = new THREE.Vector3()
      tipRef.current.getWorldPosition(tipWorldPos)

      trail.current.push(tipWorldPos.clone())
      if (trail.current.length > 100) trail.current.shift()

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(trail.current)
      lineRef.current.geometry.dispose()
      lineRef.current.geometry = lineGeometry
    }
  })

  return (
    <>
      <group ref={baseRef} position={[0, 0, 0]}>
        <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 4]} />
          <meshStandardMaterial color={color1} />
        </mesh>

        <group ref={joint1Ref} position={[4, 0, 0]}>
          <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 4]} />
            <meshStandardMaterial color={color2} />
          </mesh>

          <group ref={joint2Ref} position={[4, 0, 0]}>
            <mesh ref={tipRef} position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 4]} />
              <meshStandardMaterial color={color3} />
            </mesh>
          </group>
        </group>
      </group>

      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color="lime" />
      </line>
    </>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[-5, 5, 5]} intensity={0.6} />
        <ArticulatedArm />
        <OrbitControls />
      </Canvas>
      <Leva collapsed />
    </div>
  )
}
