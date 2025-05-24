import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { OrbitControls } from '@react-three/drei';

function TexturedBox() {
  const texture = useLoader(TextureLoader, '/brick_crosswalk_diff_4k.jpg');

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', display: 'block' }} camera={{ position: [0, 5, 15], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <TexturedBox />
      <OrbitControls />
    </Canvas>
  );
}
