# 🧪 Taller - Introducción a Realidad Aumentada Web: Marcadores con AR.js

## 📋 Descripción

Este taller implementa una experiencia básica de **realidad aumentada basada en marcadores** directamente desde el navegador web, utilizando **AR.js** y **Three.js**. Permite visualizar modelos 3D interactivos sobre un marcador físico (HIRO) y activar animaciones e interacciones cuando el marcador es detectado por la cámara.

## 🎯 Objetivos

- ✅ Implementar AR basada en marcadores usando AR.js
- ✅ Crear modelos 3D interactivos con Three.js
- ✅ Añadir animaciones y efectos visuales
- ✅ Implementar controles de usuario
- ✅ Manejar eventos de detección de marcadores
- ✅ Incluir elementos multimedia (sonidos)

## 🛠️ Tecnologías Utilizadas

- **AR.js** (v2.3.1): Framework de realidad aumentada para web
- **A-Frame** (v1.3.0): Framework de VR/AR basado en entidades
- **Three.js**: Librería 3D para renderizado
- **HTML5/CSS3/JavaScript**: Tecnologías web estándar

## 🚀 Cómo Funciona AR.js

AR.js utiliza **detección de marcadores** para superponer contenido digital en el mundo real:

1. **Captura de Video**: Accede a la cámara del dispositivo
2. **Detección de Marcadores**: Analiza cada frame buscando patrones específicos
3. **Tracking en Tiempo Real**: Sigue la posición y orientación del marcador
4. **Renderizado 3D**: Proyecta modelos 3D sobre el marcador detectado
5. **Interacción**: Permite interacciones con los objetos virtuales

### Ventajas de AR.js:
- ✅ No requiere instalación de apps
- ✅ Funciona en navegadores modernos
- ✅ Bajo consumo de recursos
- ✅ Compatible con múltiples dispositivos
- ✅ Código abierto y bien documentado

## 📁 Estructura del Proyecto

```
2025-01-15_taller_arjs_realidad_aumentada_marcadores_web/
├── index.html              # Archivo principal con la experiencia AR
├── models/                 # Modelos 3D (opcional)
│   └── robot.glb
├── markers/                # Marcadores personalizados (opcional)
│   └── custom-marker.patt
├── sounds/                 # Archivos de audio (opcional)
│   ├── hover.mp3
│   └── detection.mp3
└── README.md              # Este archivo
```

## 🎮 Funcionalidades Implementadas

### 1. **Detección de Marcador HIRO**
- Utiliza el marcador HIRO estándar (ampliamente reconocido)
- Interfaz visual que indica el estado de detección
- Efectos visuales al detectar/perder el marcador

### 2. **Modelos 3D Interactivos**
- Cubo principal con materiales PBR
- Esfera decorativa con animación de posición
- Texto 3D flotante
- Múltiples geometrías intercambiables

### 3. **Animaciones y Efectos**
- Rotación continua del modelo principal
- Animación de escala al detectar marcador
- Efectos de clic con rotación rápida
- Transiciones suaves entre estados

### 4. **Controles de Usuario**
- **Toggle Animación**: Activa/desactiva la rotación
- **Cambiar Modelo**: Cicla entre diferentes geometrías
- **Sonido**: Reproduce audio de interacción

### 5. **Elementos Multimedia**
- Sonidos de detección y hover
- Efectos visuales de feedback
- Interfaz de usuario overlay

## 🎯 Instrucciones de Uso

### Requisitos Previos:
- Navegador moderno (Chrome, Firefox, Safari)
- Cámara web funcional
- Conexión a internet (para cargar librerías)

### Pasos para Ejecutar:

1. **Abrir el proyecto**:
   ```bash
   # Navegar al directorio del proyecto
   cd 2025-01-15_taller_arjs_realidad_aumentada_marcadores_web
   
   # Servir archivos (opcional, pero recomendado)
   python -m http.server 8000
   # o
   npx serve .
   ```

2. **Acceder desde el navegador**:
   - Abrir `http://localhost:8000` (si usas servidor)
   - O abrir directamente `index.html`

3. **Permitir acceso a la cámara**:
   - El navegador solicitará permisos de cámara
   - Hacer clic en "Permitir"

4. **Usar el marcador HIRO**:
   - Mostrar el marcador HIRO en pantalla o imprimirlo
   - Apuntar la cámara hacia el marcador
   - ¡Observar la magia de la realidad aumentada!

### Controles Disponibles:
- **🔄 Toggle Animación**: Pausa/reanuda la rotación del modelo
- **🎲 Cambiar Modelo**: Cambia entre cubo, esfera, cilindro y toro
- **🔊 Sonido**: Reproduce sonido de interacción
- **👆 Clic en modelo**: Efecto de rotación rápida

## 🎨 Características Técnicas

### Detección de Marcadores:
```javascript
// Evento cuando se detecta el marcador
hiroMarker.addEventListener('markerFound', function() {
    console.log('🎯 Marcador HIRO detectado!');
    // Efectos visuales y sonoros
});

// Evento cuando se pierde el marcador
hiroMarker.addEventListener('markerLost', function() {
    console.log('❌ Marcador HIRO perdido');
    // Actualizar interfaz
});
```

### Animaciones:
```javascript
// Rotación continua
animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"

// Animación de posición
animation="property: position; to: 1 1 0; loop: true; dir: alternate; dur: 2000"
```

### Materiales PBR:
```javascript
material="color: #ff6b6b; metalness: 0.8; roughness: 0.2"
```

## 🎬 Demostración Visual

### GIFs de Funcionamiento:

1. **Detección del Marcador**:
   - Mostrar marcador HIRO en pantalla
   - Cámara apuntando al marcador
   - Modelo 3D apareciendo sobre el marcador
   - Interfaz mostrando "✅ Marcador detectado"

2. **Interacciones**:
   - Clic en el modelo 3D
   - Cambio entre diferentes geometrías
   - Toggle de animación
   - Efectos visuales de feedback

3. **Animaciones**:
   - Rotación continua del cubo principal
   - Esfera flotante con movimiento
   - Efectos de escala al detectar marcador

## 🤔 Reflexiones y Limitaciones

### Limitaciones de AR Basada en Marcadores:

1. **Dependencia del Marcador**:
   - Requiere un marcador físico visible
   - No funciona sin el marcador presente
   - Limitado a un área específica

2. **Condiciones de Iluminación**:
   - Sensible a cambios de luz
   - Puede fallar en ambientes muy brillantes o muy oscuros
   - Requiere contraste adecuado

3. **Orientación del Marcador**:
   - Debe estar visible y no muy inclinado
   - Distancia óptima entre 20-80cm
   - Ángulo de visión limitado

4. **Rendimiento**:
   - Consumo de CPU para detección en tiempo real
   - Puede afectar la batería en dispositivos móviles
   - Requiere hardware mínimo para funcionar suavemente

### Aplicaciones en Educación:

1. **Libros Interactivos**:
   - Páginas con marcadores que activan contenido 3D
   - Explicaciones visuales de conceptos complejos
   - Experimentos virtuales seguros

2. **Museos y Exposiciones**:
   - Información adicional sobre artefactos
   - Reconstrucciones históricas
   - Guías interactivas personalizadas

3. **Ciencias y Matemáticas**:
   - Visualización de moléculas en química
   - Modelos anatómicos en biología
   - Geometría 3D en matemáticas

### Aplicaciones en Arte:

1. **Arte Interactivo**:
   - Obras que cambian según el marcador
   - Instalaciones que responden al movimiento
   - Galerías virtuales accesibles desde cualquier lugar

2. **Storytelling Inmersivo**:
   - Narrativas que se desarrollan en el mundo real
   - Personajes virtuales que interactúan con el entorno
   - Experiencias teatrales personalizadas

3. **Arte Público**:
   - Murales que cobran vida con AR
   - Esculturas virtuales en espacios públicos
   - Intervenciones artísticas temporales

## 🔮 Futuras Mejoras

1. **Marcadores Múltiples**:
   - Detectar varios marcadores simultáneamente
   - Interacciones entre objetos en diferentes marcadores
   - Escenas complejas con múltiples elementos

2. **Tracking Avanzado**:
   - Integración con ARCore/ARKit para tracking sin marcadores
   - Detección de superficies y planos
   - Oclusión realista de objetos

3. **Interacciones Avanzadas**:
   - Gestos de mano para control
   - Comandos de voz
   - Interacciones físicas con objetos virtuales

4. **Optimización**:
   - Lazy loading de modelos 3D
   - Compresión de texturas
   - Caché inteligente de marcadores

## 📚 Recursos Adicionales

- [AR.js Documentation](https://ar-js-org.github.io/AR.js/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [AR.js Marker Generator](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)

## 👥 Autores

- **Fecha**: 15 de Enero, 2025
- **Tecnologías**: AR.js, A-Frame, Three.js, HTML5, CSS3, JavaScript
- **Propósito**: Taller educativo de realidad aumentada web

---

*Este proyecto demuestra las capacidades básicas de AR.js para crear experiencias de realidad aumentada accesibles desde cualquier navegador web moderno, sin necesidad de aplicaciones móviles especializadas.* 