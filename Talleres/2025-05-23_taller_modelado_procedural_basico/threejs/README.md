# 🧪 Taller - Modelado Procedural Básico: Geometría desde Código.

## 📅 Fecha
`2025-05-24` – Fecha de entrega o realización

---

## 🎯 Objetivo del Taller

El objetivo es entender cómo se genera y manipula la geometría directamente desde código para crear estructuras dinámicas y reutilizables.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Creación de estructuras repetitivas con mapeo de arrays
- [x] Modificación dinámica de vértices
- [x] Actualizar propiedades de objetos 3D
- [x] Patrón factral con recursividad.

---

## 🔧 Herramientas y Entornos

- Python (`boxGeometry`, `sphereGeometry`, `bufferGeometry`, `userFrame`, etc.)
- Three.js / React Three Fiber

---

## 📁 Estructura del Proyecto

```
2025-05-24_taller_modelado_procedural_basico/
├── threejs/
├── README.md
```
---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Preparación de la escena y entorno
2. Generación y manipulación de geometrías básicas
3. Implementación de animaciones y deformaciones
4. Construcción de patrones fractales recursivos

### 🔹 Código relevante

```python
# Modificacion dinámica de los vértices de una geometría en cada frame
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function AnimatedGeometry() {
  const meshRef = useRef();

  useFrame(() => {
    const position = meshRef.current.geometry.attributes.position.array;
    for(let i = 0; i < position.length; i += 3) {
      position[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01; // movimiento en Y de los vértices
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

```

---

## 📊 Resultados Visuales
![Creación de objetos con geometría básica](https://github.com/user-attachments/assets/c59bfa45-46f6-4d57-aa76-30d2d002b99a)
![Mapeo de arrays para generar estructuras repetitivas](https://github.com/user-attachments/assets/48c71f3e-173a-448f-a22b-16498f32adc3)
![uso de useFrame para aplicar transformación animada](https://github.com/user-attachments/assets/fd8d19da-c895-4045-95ba-7e1564bdb2b0)

```

## 🧩 Comentario final

```text
"Modelar con código crea formas automáticamente y permite animaciones dinámicas, ideal para patrones repetitivos. Modelar a mano es manual y preciso, útil para detalles específicos. Código es eficiente y flexible; a mano, más artístico y controlado."
```

## ✅ Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
---
