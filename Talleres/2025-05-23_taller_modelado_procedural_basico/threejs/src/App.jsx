import { Canvas } from '@react-three/fiber';

function Fractal({ depth = 0, maxDepth = 3, position = [0, 0, 0], scale = 1 }) {
  if (depth > maxDepth) return null;

  const size = 2 * scale;

  return (
    <group position={position} scale={scale}>
      {/* Cubo actual */}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={`hsl(${depth * 60}, 70%, 50%)`} />
      </mesh>

      {/* Rama derecha */}
      <Fractal
        depth={depth + 1}
        maxDepth={maxDepth}
        position={[size, size, 0]}
        scale={scale * 0.5}
      />

      {/* Rama izquierda */}
      <Fractal
        depth={depth + 1}
        maxDepth={maxDepth}
        position={[-size, size, 0]}
        scale={scale * 0.5}
      />

      {/* Rama superior */}
      <Fractal
        depth={depth + 1}
        maxDepth={maxDepth}
        position={[0, size, size]}
        scale={scale * 0.5}
      />
    </group>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 10, 30], fov: 50 }} style={{ width: '100vw', height: '100vh', display: 'block' }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 20, 10]} intensity={1} />
      <Fractal maxDepth={3} />
    </Canvas>
  );
}
