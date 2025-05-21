import React, { useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

// 1. Definir el material shader personalizado
const MyShaderMaterial = shaderMaterial(
  { uTime: 0 },
  // Vertex Shader
  `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    varying vec3 vPosition;
    void main() {
      // Gradiente en Y y animación en azul
      vec3 color = vec3(
        vPosition.y * 0.5 + 0.5,
        vPosition.x * 0.5 + 0.5,
        0.5 + 0.5 * sin(uTime)
      );
      gl_FragColor = vec4(color, 1.0);
    }
  `
);
extend({ MyShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      myShaderMaterial: any;
    }
  }
}

function ShaderBox() {
  const matRef = useRef<any>(null);
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uTime = clock.getElapsedTime();
  });
  return (
    <mesh rotation={[0, 0.5, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <myShaderMaterial ref={matRef} wireframe={false} />
    </mesh>
  );
}

export default function ThreeShaderExample() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <ShaderBox />
    </Canvas>
  );
} 