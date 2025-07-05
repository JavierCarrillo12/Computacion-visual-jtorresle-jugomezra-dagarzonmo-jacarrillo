# 📦 Modelos 3D

Esta carpeta está destinada para almacenar modelos 3D personalizados que se pueden cargar en la experiencia inmersiva.

## Formatos Soportados

- **GLTF/GLB**: Formato recomendado para WebXR
- **OBJ**: Formato estándar de geometría
- **FBX**: Formato de Autodesk (requiere conversión)
- **DAE**: Collada (formato abierto)

## Cómo Agregar Modelos

1. **Coloca tu modelo** en esta carpeta
2. **Modifica main.js** para cargar el modelo:

```javascript
// Cargar modelo GLTF
const loader = new THREE.GLTFLoader();
loader.load('models/tu-modelo.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
});
```

## Modelos Recomendados

- **Esculturas abstractas**: Para arte digital
- **Muebles virtuales**: Para espacios inmersivos
- **Elementos arquitectónicos**: Para entornos urbanos
- **Objetos interactivos**: Con animaciones

## Optimización

- **Reducir polígonos**: Para mejor rendimiento
- **Comprimir texturas**: Usar formatos WebP
- **LOD (Level of Detail)**: Diferentes resoluciones
- **Atlas de texturas**: Combinar múltiples texturas

## Ejemplos de Uso

```javascript
// Cargar múltiples modelos
const modelUrls = [
    'models/escultura.glb',
    'models/mueble.glb',
    'models/decoracion.glb'
];

modelUrls.forEach(url => {
    loader.load(url, (gltf) => {
        const model = gltf.scene;
        model.position.set(
            Math.random() * 40 - 20,
            0,
            Math.random() * 40 - 20
        );
        scene.add(model);
    });
});
``` 