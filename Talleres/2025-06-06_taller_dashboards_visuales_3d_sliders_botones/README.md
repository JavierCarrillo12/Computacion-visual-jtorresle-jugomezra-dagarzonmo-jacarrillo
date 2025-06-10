# 🧪 Taller - Dashboards Visuales 3D: Sliders y Botones para Controlar Escenas.

## 📅 Fecha
`2025-06-06`

---

## 🎯 Objetivo del Taller

El objetivo es desarrollar una escena 3D interactiva en la que el usuario pueda controlar visualmente propiedades de los objetos y las luces mediante una interfaz de panel compuesta por sliders, selectores y botones. El propósito es explorar la vinculación entre entradas gráficas (UI) y modificaciones visuales en tiempo real usando React Three Fiber y la librería Leva.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Transformaciones geométricas.
- [x] Shaders y efectos visuales.
- [x] Materiales PBR y control dinámico de escenas 3D.

---

## 🔧 Herramientas y Entornos

- Three.js / React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- Leva 

---

## 📁 Estructura del Proyecto
```
2025-05-24_taller_dashboards_visuales/
├── threejs/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── styles/
│   │   │   └── App.css
│   │   └── components/
│   ├── package.json
│   └── tsconfig.json
├── README.md
```

---

### 🔹 Etapas realizadas

1. Preparación de la escena y entorno.
2. Aplicación de modelo.
3. Visualización.
4. Resultados.

### 🔹 Código relevante

```tsx
const {
  scale,
  materialColor,
  textureOption,
  rotate,
} = useControls({
  scale: { value: 1, min: 0.1, max: 3, step: 0.1, label: 'Scale' },
  materialColor: { value: '#ff0000', label: 'Material Color' },
  textureOption: {
    value: 'basic',
    options: {
      Basic: 'basic',
      'Blue Metal Plate': 'blue_metal',
      'Metal Plate 02': 'metal_plate_02',
      'Metal Plate': 'metal_plate',
    },
    label: 'Texture',
  },
  rotate: { value: false, label: 'Auto Rotate' },
});

```

```tsx
useEffect(() => {
  if (!renderer) return;
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  new RGBELoader().load('/textures/environment.hdr', (texture) => {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    if (materialRef.current) {
      materialRef.current.envMap = envMap;
      materialRef.current.envMapIntensity = 1;
      materialRef.current.needsUpdate = true;
    }
    texture.dispose();
    pmremGenerator.dispose();
  });
}, [renderer]);

```

## 📊 GIF - Resultados Visuales
![Demostración del Dashboard 3D interactivo](https://github.com/user-attachments/assets/8ee665cb-d30b-4d10-80a3-2dce6063111a)
![Demostración controles Dashboard 3D interactivo](https://github.com/user-attachments/assets/13082499-e05f-41c1-989f-1f157201e3d5)



```

## 🧩 Comentario final

```

¿Cuál control fue más útil?
El slider de color del material (Material Color) fue uno de los controles más impactantes visualmente, ya que permite cambiar inmediatamente el color del objeto y entender cómo interactúa con las diferentes fuentes de luz. En la imagen, se eligió un color amarillo brillante (#fff900) que resalta muy bien sobre el fondo oscuro y responde claramente a los cambios en iluminación.

Además, los sliders de posición de la luz puntual (Point Light) fueron fundamentales para crear volumen y sombras en el objeto. Al mover las posiciones en los ejes X, Y y Z, se puede observar en tiempo real cómo cambian las sombras proyectadas y los brillos, lo que aporta una comprensión más intuitiva de cómo funciona la luz en 3D.

¿Qué mejorarías para el usuario?
Activar la rotación automática por defecto o con un preset inicial que muestre el objeto en movimiento desde el comienzo, lo que haría más evidente el volumen y relieve de la geometría."

```
```
## ✅ Checklist de Entrega

- [x] Carpeta `2025_05_24_dashboards_visuales_3D_sliders_botones`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo
- [x] Visualizaciones.
- [x] README completo y claro
---
