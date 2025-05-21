import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { CameraSwitcher, Objects } from './Scene'

function App() {
  const [mode, setMode] = useState('perspective')

  return (
    <>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        color: 'white',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '0.9em'
      }}>
        <button onClick={() => setMode(mode === 'perspective' ? 'orthographic' : 'perspective')}>
          Switch to {mode === 'perspective' ? 'Orthographic' : 'Perspective'}
        </button>
        <p>Current camera: {mode}</p>
        {mode === 'perspective' ? (
          <>
            <p><b>fov</b>: 45</p>
            <p><b>aspect</b>: auto</p>
            <p><b>near</b>: 0.1</p>
            <p><b>far</b>: 100</p>
          </>
        ) : (
          <>
            <p><b>zoom</b>: 80</p>
            <p><b>left/right/top/bottom</b>: auto</p>
            <p><b>near</b>: 0.1</p>
            <p><b>far</b>: 100</p>
          </>
        )}
      </div>

      {/* Escena principal */}
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CameraSwitcher mode={mode} />
        <Objects />
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
