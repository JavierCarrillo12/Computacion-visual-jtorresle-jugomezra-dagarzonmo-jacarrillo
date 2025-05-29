import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

// Configuración
const CHUNK_SIZE = 16;
const MAX_HEIGHT = 8;

// Función de altura
function generateHeight(x, z) {
  const scale = 0.1;
  const height = Math.sin(x * scale) * Math.cos(z * scale) * 3;
  const pseudoRandom = (Math.sin(x * 12.9898 + z * 78.233) * 43758.5453) % 1;
  const noise = pseudoRandom * 2;
  return Math.max(0, Math.min(MAX_HEIGHT, Math.floor(height + noise + 4)));
}

// Árbol
function Arbol({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

// Animal
function Animal({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.6, 0.4, 1]} />
        <meshStandardMaterial color="#FFC0CB" />
      </mesh>
      <mesh position={[0, 0.4, 0.5]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#FFC0CB" />
      </mesh>
    </group>
  );
}

// Planta
function Planta({ position }) {
  return (
    <mesh position={position}>
      <coneGeometry args={[0.1, 0.3, 8]} />
      <meshStandardMaterial color="#00FF00" />
    </mesh>
  );
}

// Roca
function Roca({ position }) {
  return (
    <mesh position={position}>
      <dodecahedronGeometry args={[0.3]} />
      <meshStandardMaterial color="#808080" />
    </mesh>
  );
}

// Bosque
function Bosque({ cantidad, area }) {
  return (
    <group>
      {Array.from({ length: cantidad }).map((_, i) => {
        const x = Math.floor(Math.random() * area) - area / 2;
        const z = Math.floor(Math.random() * area) - area / 2;
        const y = 5;
        return <Arbol key={i} position={[x, y, z]} />;
      })}
    </group>
  );
}

// Animales
function Manada({ cantidad, area }) {
  return (
    <group>
      {Array.from({ length: cantidad }).map((_, i) => {
        const x = Math.floor(Math.random() * area) - area / 2;
        const z = Math.floor(Math.random() * area) - area / 2;
        const y = 5;
        return <Animal key={i} position={[x, y, z]} />;
      })}
    </group>
  );
}

// Decoraciones
function Decoraciones({ cantidad, area }) {
  return (
    <group>
      {Array.from({ length: cantidad }).map((_, i) => {
        const x = Math.floor(Math.random() * area) - area / 2;
        const z = Math.floor(Math.random() * area) - area / 2;
        const y = 5;
        return Math.random() > 0.5 ? (
          <Planta key={i} position={[x, y, z]} />
        ) : (
          <Roca key={i} position={[x, y, z]} />
        );
      })}
    </group>
  );
}

// Terreno
function Terreno({ textures }) {
  const blocks = useMemo(() => {
    const temp = [];
    const geom = new THREE.BoxGeometry(1, 1, 1);

    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        const height = generateHeight(x, z);
        for (let y = 0; y < height; y++) {
          let material =
            y === height - 1
              ? textures.grass
              : y > height - 3
              ? textures.dirt
              : textures.rock;

          temp.push(
            <mesh
              key={`${x}-${y}-${z}`}
              position={[x - CHUNK_SIZE / 2, y, z - CHUNK_SIZE / 2]}
              geometry={geom}
              material={material}
              castShadow
              receiveShadow
            />
          );
        }
      }
    }

    return temp;
  }, [textures]);

  return <group>{blocks}</group>;
}

// Mundo Voxel
export function VoxelWorld() {
  const grass = useTexture("textures/Grass/Grass005_1K-JPG_Color.jpg");
  const dirt = useTexture("textures/Asphalt/Asphalt031_1K-JPG_Color.jpg");
  const rock = useTexture("textures/Ground/Ground085_1K-JPG_Color.jpg");

  const textures = useMemo(
    () => ({
      grass: new THREE.MeshStandardMaterial({ map: grass }),
      dirt: new THREE.MeshStandardMaterial({ map: dirt }),
      rock: new THREE.MeshStandardMaterial({ map: rock }),
    }),
    [grass, dirt, rock]
  );

  return (
    <group>
      <Terreno textures={textures} />
      <Bosque cantidad={30} area={CHUNK_SIZE} />
      <Manada cantidad={10} area={CHUNK_SIZE} />
      <Decoraciones cantidad={20} area={CHUNK_SIZE} />
    </group>
  );
}
