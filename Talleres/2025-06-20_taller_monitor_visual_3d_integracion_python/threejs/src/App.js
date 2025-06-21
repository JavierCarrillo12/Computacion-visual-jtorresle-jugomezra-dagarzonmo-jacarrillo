import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import BoxReactivo from './BoxReactivo'
import Overlay from './Overlay'

function App() {
  const [nPersonas, setNPersonas] = useState(0)

  return (
    <>
      <Canvas camera={{ position: [0, 20, 8], fov: 50 }}>
        <ambientLight />
        <BoxReactivo setNPersonas={setNPersonas} />
      </Canvas>
      <Overlay nPersonas={nPersonas} />
    </>
  )
}

export default App
