# 🧪 Taller - UV Mapping: Texturas que Encajan.

## 📅 Fecha
`2025-05-23` – Fecha de realización

---

## 🎯 Objetivo del Taller

El objetivo es explorar el mapeo UV como técnica fundamental para aplicar correctamente texturas 2D sobre modelos 3D sin distorsión. El objetivo es entender cómo se proyectan las texturas y cómo se pueden ajustar las coordenadas UV para mejorar el resultado visual.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Proyectar una imagen 2D sobre un modelo 3D para texturizarlo.
- [x] Sistema de coordenadas para mapear una textura a la superficie de un objeto 3D.
- [x] Aplicar textura 2D a un modelo 3D.
- [x] Técnica de dividir la geometría 3d en un "mapa plano" para aplicar textura.

---

## 🔧 Herramientas y Entornos

- Three.js / React Three Fiber (`TextureLoader`, `MeshStandardMaterial`)

---

## 📁 Estructura del Proyecto

```
2025-05-24_taller_uv_mapping_texturas
├── threejs/
├── README.md
```
---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Preparación de la escena y entorno.
2. Cargar y preparar el modelo 3D.
3. Aplicar la textura 2D al modelo.
4. Ajustar la proyección de la textura.

### 🔹 Código relevante

```python
# Textura 2D sobre un modelo 3D
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
  const availableAnimations = ['nombre1', 'nombre2', 'nombre3']; // Reemplaza con los nombres reales

  return (
    <Canvas style={{ width: '100vw', height: '100vh', display: 'block' }} camera={{ position: [0, 5, 15], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <TexturedBox />
      <OrbitControls />
    </Canvas>
  );
}
```

## 📊 Resultados Visuales

![Modelo 3D cargado usando react-three-drei](https://github.com/user-attachments/assets/5763bddf-1946-4edb-babc-494d11be6e21)
![Aplicación de Textura 2D](https://github.com/user-attachments/assets/9aceb8c6-62d7-4af4-987b-4932ed28f7da)


```

## 🧩 Comentario final

```
"Si fue necesario ajustar las coordenadas UV en algunos casos para asegurar que las texturas se aplicaran de manera correcta. En modelos con coordenadas mal ajustadas, las texturas se veían distorsionadas, mientras que con coordenadas correctamente ajustadas, la textura se aplicaba de forma más precisa y natural sobre la geometría del modelo."

```

## ✅ Checklist de Entrega

- [x] Carpeta `2025_05_24_uv_mapping_texturas`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones.
- [x] README completo y claro
---
