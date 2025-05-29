# 🌍 Proyecto Mundo Voxel en React + Three.js

Este proyecto simula un mundo estilo Minecraft utilizando `@react-three/fiber` y `three.js`. El terreno, los árboles, animales y decoraciones se generan proceduralmente con funciones personalizadas. La cámara y controles permiten explorar el entorno en 3D.

---
## Mundo creado

![Vídeo sin título ‐ Hecho con Clipchamp](https://github.com/user-attachments/assets/893d831d-ffb0-4c37-b48a-7218a3070b3f)

![Captura de pantalla 2025-05-29 165252](https://github.com/user-attachments/assets/119b2d77-18d3-4dbe-92e6-4d9efa634ef5)

![Captura de pantalla 2025-05-29 165346](https://github.com/user-attachments/assets/461073fb-38ec-4030-b00f-af7ebd132b20)


---

## 📦 Estructura del Proyecto

```

src/
├── App.jsx             # Configuración principal de cámara, luces y escena
├── components/
│   └── VoxelWorld.jsx  # Contiene el terreno, árboles, animales, decoraciones
├── textures/
│   ├── grass.jpg       # Textura de pasto
│   ├── dirt.jpg        # Textura de tierra
│   └── rock.jpg        # Textura de piedra
└── App.css

````

---

## 📘 Ejemplos de Funciones Usadas

```js
// Generar altura pseudoaleatoria
function generateHeight(x, z) {
  const scale = 0.1;
  return Math.floor(Math.sin(x * scale) * Math.cos(z * scale) * 3 + 4);
}

// Crear árbol
function Arbol({ position }) {
  return (
    <group position={position}>
      <mesh><cylinderGeometry /></mesh>
      <mesh><sphereGeometry /></mesh>
    </group>
  );
}
````

---

## 🌱 Elementos del Mundo

* **Terreno voxel** generado con altura basada en ruido matemático.
* **Árboles** compuestos por tronco cilíndrico y copa esférica.
* **Animales simples** formados por cajas (boxGeometry).
* **Plantas y rocas** decorativas generadas aleatoriamente.
* Todo está agrupado en componentes reutilizables usando `<group />`.

---

## 🎨 Material PBR Ejemplo

Se aplica un material físico realista (PBR) para simular superficies naturales:

```js
new THREE.MeshStandardMaterial({ map: grassTexture })
```

En `VoxelWorld.jsx`, las texturas se cargan con `useTexture()` y se aplican según la altura de cada bloque para simular pasto, tierra o piedra.

---

## 💡 Reflexión

Este proyecto muestra cómo se puede personalizar un entorno 3D a partir de formas primitivas (`Box`, `Sphere`, `Cylinder`, `Cone`). Las formas simples, al agruparse correctamente, permiten crear representaciones efectivas y visualmente agradables sin necesidad de modelos complejos.

El uso de funciones aleatorias permite que el mundo se vea único cada vez que se carga, fomentando la exploración y creatividad.

---

## 🚀 Requisitos

* React
* @react-three/fiber
* three
* @react-three/drei

Instalar dependencias:

```bash
npm install three @react-three/fiber @react-three/drei
```

---

## 🕹️ Controles

* **Clic y arrastra**: Rotar cámara
* **Scroll**: Zoom in/out
* **Clic derecho + mover**: Paneo

---

## 🧪 Ejecutar el proyecto

```bash
npm run dev
```

---

