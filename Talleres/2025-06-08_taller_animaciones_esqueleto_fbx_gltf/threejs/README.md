# Implementación Three.js - Animaciones por Esqueleto

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
threejs/
├── src/
│   ├── App.jsx        # Componente principal
│   └── main.jsx       # Punto de entrada
├── public/
│   └── models/        # Modelos 3D (.glb)
├── index.html
├── package.json
└── vite.config.js
```

## 🎮 Características

- Carga de modelos GLTF/GLB con animaciones
- Control de animaciones mediante interfaz de usuario
- Transiciones suaves entre animaciones
- Controles de cámara orbitales

## 📝 Notas de Implementación

1. **Carga de Modelos**
   - Utilizamos `useGLTF` de @react-three/drei para cargar modelos
   - Los modelos deben estar en formato .glb o .gltf
   - Colocar los modelos en la carpeta `public/models/`

2. **Control de Animaciones**
   - Implementado con `useAnimations` de @react-three/drei
   - Transiciones suaves usando fadeIn/fadeOut
   - Interfaz de usuario para seleccionar animaciones

3. **Optimizaciones**
   - Uso de Suspense para carga asíncrona
   - Transiciones suaves entre animaciones
   - Controles de cámara optimizados

## 🎯 Uso

1. Coloca tu modelo .glb o .gltf en la carpeta `public/models/`
2. Actualiza la ruta del modelo en `App.jsx`
3. Ejecuta `npm run dev`
4. Usa el selector de animaciones en la interfaz

## 🔧 Personalización

- Ajusta la posición de la cámara en `App.jsx`
- Modifica las luces según necesites
- Personaliza la interfaz de usuario en el componente `Controls` 