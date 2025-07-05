import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { db } from "../firebase/firebaseConfig";
import { ref, set, get } from "firebase/database";

function CuboPersistente() {
  const meshRef = useRef();
  const [loaded, setLoaded] = useState(false);

  // Recuperar la posición desde Firebase al iniciar
  useEffect(() => {
    const dataRef = ref(db, "users/user1");
    get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        meshRef.current.position.set(data.pos.x, data.pos.y, data.pos.z);
        console.log("Posición cargada:", data.pos);
      } else {
        console.log("No se encontró posición previa");
      }
      setLoaded(true);
    });
  }, []);

  // Guardar la posición cada 3 segundos
  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      const pos = meshRef.current.position;
      set(ref(db, "users/user1"), {
        pos: { x: pos.x, y: pos.y, z: pos.z }
      });
      console.log("Posición guardada:", pos);
    }, 3000);

    return () => clearInterval(interval);
  }, [loaded]);

  // Permitir mover el cubo con las flechas
  useFrame(() => {
    const speed = 0.02;
    const mesh = meshRef.current;
    if (mesh) {
      if (window.isKeyPressed("ArrowLeft")) mesh.position.x -= speed;
      if (window.isKeyPressed("ArrowRight")) mesh.position.x += speed;
      if (window.isKeyPressed("ArrowUp")) mesh.position.z -= speed;
      if (window.isKeyPressed("ArrowDown")) mesh.position.z += speed;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Escena() {
  useEffect(() => {
    // Escuchar teclas
    const keys = new Set();
    const keyDown = (e) => keys.add(e.key);
    const keyUp = (e) => keys.delete(e.key);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.isKeyPressed = (key) => keys.has(key);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CuboPersistente />
      <OrbitControls />
    </Canvas>
  );
}
