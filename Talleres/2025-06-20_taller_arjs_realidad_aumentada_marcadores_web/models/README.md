# 📦 Modelos 3D para AR.js

Esta carpeta contiene modelos 3D que pueden ser utilizados en la experiencia de realidad aumentada.

## 🎯 Modelos Incluidos

### robot.glb (Opcional)
- Modelo de robot 3D en formato GLB
- Utilizado con marcadores personalizados
- Escala recomendada: 0.5 0.5 0.5

## 📋 Formatos Soportados

AR.js y A-Frame soportan los siguientes formatos 3D:

- **GLB/GLTF**: Formato recomendado (binario, eficiente)
- **OBJ**: Formato estándar (texto, más pesado)
- **FBX**: Formato de Autodesk
- **DAE**: Formato Collada
- **PLY**: Formato Stanford

## 🛠️ Cómo Añadir Modelos Personalizados

### 1. Preparar el Modelo
```bash
# Convertir formatos (si es necesario)
# Usar herramientas como Blender, MeshLab, o convertidores online
```

### 2. Optimizar el Modelo
- **Tamaño**: Mantener archivos < 5MB para carga rápida
- **Texturas**: Usar formatos WebP o JPEG comprimidos
- **Geometría**: Reducir polígonos innecesarios
- **Escala**: Ajustar a unidades apropiadas (metros)

### 3. Integrar en el Código
```html
<!-- Modelo básico -->
<a-entity gltf-model="models/tu-modelo.glb"></a-entity>

<!-- Modelo con propiedades -->
<a-entity gltf-model="models/tu-modelo.glb"
          position="0 0 0"
          scale="1 1 1"
          rotation="0 0 0">
</a-entity>

<!-- Modelo con animaciones -->
<a-entity gltf-model="models/tu-modelo.glb"
          animation-mixer="clip: *; loop: repeat">
</a-entity>
```

## 🎨 Propiedades de Modelos

### Posicionamiento
```javascript
position="x y z"    // Posición en el espacio 3D
rotation="x y z"    // Rotación en grados
scale="x y z"       // Escala del modelo
```

### Materiales
```javascript
// Material básico
material="color: #ff0000"

// Material PBR
material="color: #ff0000; metalness: 0.8; roughness: 0.2"

// Material con textura
material="src: textures/textura.jpg"
```

### Animaciones
```javascript
// Animación de rotación
animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"

// Animación de posición
animation="property: position; to: 0 2 0; loop: true; dir: alternate; dur: 2000"

// Animación de escala
animation="property: scale; to: 2 2 2; loop: true; dir: alternate; dur: 1000"
```

## 🔧 Herramientas Recomendadas

### Software de Modelado
- **Blender**: Gratuito, potente, soporte GLB nativo
- **Maya**: Profesional, amplio soporte de formatos
- **3ds Max**: Profesional, bueno para arquitectura
- **SketchUp**: Fácil de usar, bueno para principiantes

### Convertidores Online
- **Online 3D Converter**: https://www.online-convert.com/3d
- **Convertio**: https://convertio.co/3d-converter/
- **AnyConv**: https://anyconv.com/3d-converter/

### Optimizadores
- **Draco**: Compresión de geometría
- **Basis Universal**: Compresión de texturas
- **gltf-pipeline**: Herramienta de línea de comandos

## 📊 Mejores Prácticas

### Rendimiento
- ✅ Usar formatos GLB/GLTF
- ✅ Comprimir texturas
- ✅ Optimizar geometría
- ✅ Lazy loading para modelos grandes

### Compatibilidad
- ✅ Probar en múltiples dispositivos
- ✅ Verificar soporte de formatos
- ✅ Considerar fallbacks para navegadores antiguos

### Experiencia de Usuario
- ✅ Escala apropiada para el contexto
- ✅ Materiales realistas
- ✅ Animaciones suaves
- ✅ Feedback visual claro

## 🎯 Ejemplos de Uso

### Modelo Estático
```html
<a-entity gltf-model="models/escultura.glb"
          position="0 0 0"
          scale="0.5 0.5 0.5">
</a-entity>
```

### Modelo Animado
```html
<a-entity gltf-model="models/robot.glb"
          position="0 0 0"
          scale="0.5 0.5 0.5"
          animation-mixer="clip: *; loop: repeat"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000">
</a-entity>
```

### Modelo Interactivo
```html
<a-entity gltf-model="models/coche.glb"
          position="0 0 0"
          scale="0.5 0.5 0.5"
          class="clickable"
          sound="src: #engine-sound; on: click"
          animation="property: position; to: 0 0 5; loop: false; dur: 2000">
</a-entity>
```

## 🚀 Recursos Adicionales

- [A-Frame GLTF Model Component](https://aframe.io/docs/1.3.0/components/gltf-model.html)
- [Three.js GLTF Loader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [glTF Tools](https://github.com/AnalyticalGraphicsInc/gltf-pipeline)
- [Model Optimization Guide](https://developers.google.com/ar/develop/augmented-images/optimization)

---

*Recuerda que los modelos 3D pueden mejorar significativamente la experiencia de realidad aumentada, pero deben estar optimizados para funcionar bien en dispositivos móviles.* 