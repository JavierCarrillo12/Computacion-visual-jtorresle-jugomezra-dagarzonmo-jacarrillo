# 📚 Referencia de API - AR.js Taller

## 🎯 Componentes A-Frame Utilizados

### `<a-scene>`
Configuración principal de la escena AR.

```html
<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
```

**Propiedades:**
- `embedded`: Integra la escena en el documento
- `arjs`: Configuración específica de AR.js
  - `sourceType: webcam`: Usa la cámara web
  - `debugUIEnabled: false`: Desactiva la UI de debug

### `<a-marker>`
Define un marcador para detección AR.

```html
<a-marker preset="hiro" 
          id="hiro-marker"
          emitevents="true"
          cursor="rayOrigin: mouse"
          raycaster="objects: .clickable">
```

**Propiedades:**
- `preset="hiro"`: Usa el marcador HIRO estándar
- `preset="custom"`: Usa marcador personalizado
- `type="pattern"`: Tipo de marcador (para custom)
- `url="path/to/marker.patt"`: Ruta al archivo de marcador
- `emitevents="true"`: Emite eventos de detección
- `cursor="rayOrigin: mouse"`: Configura el cursor
- `raycaster="objects: .clickable"`: Define objetos clickeables

### `<a-box>`, `<a-sphere>`, `<a-cylinder>`
Geometrías 3D básicas.

```html
<a-box position="0 0.5 0" 
       material="color: #ff6b6b; metalness: 0.8; roughness: 0.2"
       scale="1 1 1"
       animation="property: rotation; to: 0 360 0; loop: true; dur: 3000">
</a-box>
```

**Propiedades comunes:**
- `position="x y z"`: Posición en el espacio 3D
- `rotation="x y z"`: Rotación en grados
- `scale="x y z"`: Escala del objeto
- `material`: Propiedades del material
- `animation`: Configuración de animación

### `<a-entity>`
Entidad genérica para objetos 3D complejos.

```html
<a-entity gltf-model="models/robot.glb"
          position="0 0 0"
          scale="0.5 0.5 0.5"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 4000">
</a-entity>
```

**Propiedades:**
- `gltf-model`: Carga modelo GLB/GLTF
- `position`, `rotation`, `scale`: Transformaciones
- `animation`: Animaciones
- `sound`: Configuración de audio

### `<a-light>`
Configuración de iluminación.

```html
<a-light type="directional" 
         position="0 5 5" 
         target="#main-model"
         intensity="0.8"
         color="#ffffff">
</a-light>
```

**Tipos:**
- `ambient`: Iluminación ambiental
- `directional`: Luz direccional
- `point`: Luz puntual
- `spot`: Luz focal

### `<a-text>`
Texto 3D.

```html
<a-text value="AR.js\nTaller" 
        position="0 1.5 0" 
        align="center" 
        color="#ffffff"
        font="kelsonsans"
        scale="0.5 0.5 0.5">
</a-text>
```

## 🎨 Propiedades de Materiales

### Material Básico
```javascript
material="color: #ff0000"
```

### Material PBR (Physically Based Rendering)
```javascript
material="color: #ff6b6b; metalness: 0.8; roughness: 0.2"
```

### Material con Textura
```javascript
material="src: textures/textura.jpg"
```

### Material Transparente
```javascript
material="color: #ffffff; transparent: true; opacity: 0.5"
```

## 🎬 Sistema de Animaciones

### Animación de Rotación
```javascript
animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
```

### Animación de Posición
```javascript
animation="property: position; to: 0 2 0; loop: true; dir: alternate; dur: 2000"
```

### Animación de Escala
```javascript
animation="property: scale; to: 2 2 2; loop: true; dir: alternate; dur: 1000"
```

### Animación de Opacidad
```javascript
animation="property: material.opacity; to: 0; dur: 1000"
```

**Propiedades de animación:**
- `property`: Propiedad a animar
- `to`: Valor objetivo
- `from`: Valor inicial (opcional)
- `loop`: true/false para repetición
- `dur`: Duración en milisegundos
- `dir`: Dirección (normal, reverse, alternate)
- `easing`: Función de interpolación

## 🔊 Sistema de Audio

### Sonido Básico
```html
<a-entity sound="src: #mi-sonido"></a-entity>
```

### Sonido con Evento
```html
<a-entity sound="src: #mi-sonido; on: click"></a-entity>
```

### Sonido con Volumen
```html
<a-entity sound="src: #mi-sonido; volume: 0.5"></a-entity>
```

### Sonido Posicional
```html
<a-entity sound="src: #mi-sonido; positional: true; distanceModel: linear; refDistance: 1; maxDistance: 10"></a-entity>
```

**Eventos disponibles:**
- `click`: Al hacer clic
- `mouseenter`: Al entrar el mouse
- `mouseleave`: Al salir el mouse
- `markerFound`: Al detectar marcador
- `markerLost`: Al perder marcador

## 🎯 Componentes Personalizados

### `particle-system`
Crea sistemas de partículas.

```javascript
AFRAME.registerComponent('particle-system', {
    init: function() {
        this.createParticles();
    },
    
    createParticles: function() {
        // Implementación de partículas
    }
});
```

### `complex-animation`
Animaciones complejas con JavaScript.

```javascript
AFRAME.registerComponent('complex-animation', {
    init: function() {
        this.animationState = 0;
        this.animationSpeed = 0.02;
    },
    
    tick: function(time) {
        // Lógica de animación por frame
    }
});
```

### `advanced-interaction`
Interacciones avanzadas con objetos.

```javascript
AFRAME.registerComponent('advanced-interaction', {
    init: function() {
        this.setupEventListeners();
    },
    
    setupEventListeners: function() {
        // Configuración de eventos
    }
});
```

## 🎮 Eventos de Marcadores

### Detección de Marcador
```javascript
marker.addEventListener('markerFound', function() {
    console.log('Marcador detectado!');
    // Lógica cuando se detecta el marcador
});
```

### Pérdida de Marcador
```javascript
marker.addEventListener('markerLost', function() {
    console.log('Marcador perdido!');
    // Lógica cuando se pierde el marcador
});
```

## 🛠️ Configuración de AR.js

### Opciones Básicas
```javascript
arjs="sourceType: webcam; debugUIEnabled: false"
```

### Opciones Avanzadas
```javascript
arjs="sourceType: webcam; 
      debugUIEnabled: false; 
      detectionMode: mono_and_matrix;
      matrixCodeType: 3x3;
      sourceWidth: 1280;
      sourceHeight: 960;
      displayWidth: 1280;
      displayHeight: 960"
```

**Opciones disponibles:**
- `sourceType`: Tipo de fuente (webcam, image, video)
- `debugUIEnabled`: Mostrar UI de debug
- `detectionMode`: Modo de detección
- `matrixCodeType`: Tipo de código de matriz
- `sourceWidth/Height`: Resolución de la fuente
- `displayWidth/Height`: Resolución de visualización

## 📱 Compatibilidad de Navegadores

### Navegadores Soportados
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

### Funcionalidades Requeridas
- WebGL
- WebRTC (para cámara)
- Web Audio API (para sonidos)
- Device Motion API (opcional)

### Dispositivos Soportados
- Desktop (Windows, macOS, Linux)
- Mobile (iOS 11+, Android 7+)
- Tablet (iPad, Android tablets)

## 🔧 Optimización

### Rendimiento
- Usar modelos GLB/GLTF optimizados
- Comprimir texturas
- Limitar número de objetos
- Usar LOD (Level of Detail)

### Memoria
- Preload assets importantes
- Lazy loading para modelos grandes
- Limpiar recursos no utilizados
- Optimizar geometrías

### Batería
- Reducir frecuencia de actualización
- Optimizar detección de marcadores
- Usar animaciones eficientes
- Minimizar cálculos por frame

## 🚀 Mejores Prácticas

### Código
- Usar componentes reutilizables
- Separar lógica de presentación
- Manejar errores apropiadamente
- Documentar código complejo

### UX/UI
- Proporcionar feedback visual
- Incluir instrucciones claras
- Manejar estados de carga
- Considerar accesibilidad

### Testing
- Probar en múltiples dispositivos
- Verificar diferentes condiciones de luz
- Comprobar rendimiento
- Validar interacciones

## 📚 Recursos Adicionales

- [A-Frame Documentation](https://aframe.io/docs/)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)

---

*Esta documentación cubre los componentes y APIs principales utilizados en el taller de AR.js. Para información más detallada, consulta la documentación oficial de cada librería.* 